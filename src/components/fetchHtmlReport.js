/**
 * Fetches and parses an HTML report from the iDempiere REST API process endpoint.
 * @param {object} params
 * @param {object} params.axiosInstance - Axios instance with auth.
 * @param {string} params.urlPostfix - The process endpoint postfix (e.g. 'hsurvey_mothertongue').
 * @param {string|number} params.ward_no - The ward number to fetch for.
 * @param {string} [params.token] - Optional Bearer token (if needed for headers).
 * @returns {Promise<{ tableData: any[], tableHeaders: string[], htmlString: string, error: string|null }>}
 */
export async function fetchHtmlReport({ axiosInstance, urlPostfix, ward_no, token }) {
    let tableData = [];
    let tableHeaders = [];
    let htmlString = "";
    let error = null;

    try {
        const response = await axiosInstance.post(
            `/processes/${urlPostfix}`,
            {
                ward_no: String(ward_no),
                "report-type": "HTML",
            },
            {
                headers: {
                    id: 0,
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.data && typeof response.data === "string") {
            htmlString = response.data;
        } else if (response.data && response.data.exportFile) {
            const base64Html = response.data.exportFile;
            const binaryString = atob(base64Html);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i) & 0xff;
            }
            htmlString = new TextDecoder("utf-8").decode(bytes);
        } else {
            throw new Error("No HTML content found in response.");
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");

        // Check for the old format first
        if (doc.querySelector(".jrxtdatacell")) {
            const { headers, data } = parseCrossTabFormat(doc);
            tableHeaders = headers;
            tableData = data;
            if (data.length === 0) {
                error = "No data available for this report.";
            }
        } else if (doc.querySelector("table.jrPage")) {
            // Handle the new format
            const table = doc.querySelector("table.jrPage");
            const rows = Array.from(table.querySelectorAll("tr"));
            const borderedRows = rows.filter((row) =>
                row.querySelector('td[style*="border"]')
            );

            if (borderedRows.length > 0) {
                const headerRow = borderedRows[0];
                const newHeaders = Array.from(
                    headerRow.querySelectorAll('td[style*="border"]')
                ).map((td) => td.textContent.trim());
                tableHeaders = newHeaders;

                const newTableData = borderedRows.slice(1).map((dataRow) => {
                    const cells = Array.from(
                        dataRow.querySelectorAll('td[style*="border"]')
                    );
                    const rowData = {};
                    newHeaders.forEach((header, index) => {
                        rowData[header] = cells[index]
                            ? cells[index].textContent.trim()
                            : "";
                    });
                    return rowData;
                });
                if (newTableData.length === 0) {
                    error = "No data available for this report.";
                }
                tableData = newTableData;
            } else {
                error = "No data table found in the report.";
            }
        } else {
            error = "Unsupported HTML format or no data found.";
        }
    } catch (e) {
        error = e.response?.data?.error || e.message || "Failed to fetch or parse report data.";
    }

    return { tableData, tableHeaders, htmlString, error };
}

// Helper for old cross-tab format
function parseCrossTabFormat(doc) {
    const data = [];
    let headers = [];

    // Find the heading row: the <tr> that contains both jrxtcrossfloating and jrxtcolfloating
    const headingRow = Array.from(doc.querySelectorAll('tr')).find(tr =>
        tr.querySelector('.jrxtcrossfloating') && tr.querySelector('.jrxtcolfloating')
    );

    if (headingRow) {
        headers = Array.from(headingRow.querySelectorAll('td.jrxtcrossfloating, td.jrxtcolfloating'))
            .map(td => td.textContent.trim());
    }

    // Fallback if not found
    if (headers.length === 0) {
        headers = ["घरको अवस्था/ वडा नं", "२", "जम्मा"];
    }

    const dataCells = doc.querySelectorAll(".jrxtdatacell");
    const rowHeaders = doc.querySelectorAll(".jrxtrowfloating");

    rowHeaders.forEach((header, index) => {
        const rowLabel = header.textContent.trim();
        if (rowLabel && rowLabel !== "जम्मा") {
            const ward2Cell = dataCells[index * 2];
            const totalCell = dataCells[index * 2 + 1];

            if (ward2Cell && totalCell) {
                const rowData = {};
                rowData[headers[0]] = rowLabel;
                if (headers[1]) rowData[headers[1]] = ward2Cell.textContent.trim();
                if (headers[2]) rowData[headers[2]] = totalCell.textContent.trim();
                data.push(rowData);
            }
        }
    });

    // Add total row
    const totalRow = doc.querySelector(".jrxtrowfloating:last-child");
    const totalCellsLast = doc.querySelectorAll(".jrxtdatacell");
    if (totalRow && totalCellsLast.length >= 2) {
        const lastWard2Cell = totalCellsLast[totalCellsLast.length - 2];
        const lastTotalCell = totalCellsLast[totalCellsLast.length - 1];
        const totalRowData = {};
        totalRowData[headers[0]] = "जम्मा";
        if (headers[1]) totalRowData[headers[1]] = lastWard2Cell.textContent.trim();
        if (headers[2]) totalRowData[headers[2]] = lastTotalCell.textContent.trim();
        totalRowData.isTotal = true;
        data.push(totalRowData);
    }

    return { headers, data };
} 