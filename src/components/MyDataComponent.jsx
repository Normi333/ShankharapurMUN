// src/components/MyDataComponent.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

// Add CSS for spinning animation
const spinAnimation = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function MyDataComponent({
  urlPostfix = "hsurvey_mothertongue",
  title = "मातृभाषाको आधारमा वर्गिकरण",
}) {
  const { axiosInstance, authLoading, authError, token } = useAuth();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inject CSS animation
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = spinAnimation;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const fetchHtml = async () => {
      if (!authLoading && !authError && token) {
        try {
          setLoading(true);

          // Make the POST request to the process endpoint for HTML
          const response = await axiosInstance.post(
            `/processes/${urlPostfix}`,
            {
              ward_no: "2",
              "report-type": "HTML",
            },
            {
              headers: {
                id: 0,
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("API Response:", response.data); // Debug the response

          // Parse the HTML and extract table data
          let htmlString = "";
          if (response.data && typeof response.data === "string") {
            htmlString = response.data;
          } else if (response.data && response.data.exportFile) {
            // If it's still base64 encoded, decode it properly
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

          // Parse the HTML and extract table data
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlString, "text/html");

          // Extract data from the table
          const dataRows = [];
          const dataCells = doc.querySelectorAll(".jrxtdatacell");
          const rowHeaders = doc.querySelectorAll(".jrxtrowfloating");

          rowHeaders.forEach((header, index) => {
            const motherTongue = header.textContent.trim();
            if (motherTongue && motherTongue !== "जम्मा") {
              const ward2Cell = dataCells[index * 2];
              const totalCell = dataCells[index * 2 + 1];

              if (ward2Cell && totalCell) {
                dataRows.push({
                  motherTongue: motherTongue,
                  ward2: ward2Cell.textContent.trim(),
                  total: totalCell.textContent.trim(),
                });
              }
            }
          });

          // Add total row
          const totalRow = doc.querySelector(".jrxtrowfloating:last-child");
          const totalCells = doc.querySelectorAll(".jrxtdatacell");
          if (totalRow && totalCells.length >= 2) {
            const lastWard2Cell = totalCells[totalCells.length - 2];
            const lastTotalCell = totalCells[totalCells.length - 1];
            dataRows.push({
              motherTongue: "जम्मा",
              ward2: lastWard2Cell.textContent.trim(),
              total: lastTotalCell.textContent.trim(),
              isTotal: true,
            });
          }

          setTableData(dataRows);
        } catch (e) {
          setError(
            e.response?.data?.error || e.message || "Failed to fetch HTML."
          );
        } finally {
          setLoading(false);
        }
      } else if (authError) {
        setError(`API Initialization Error: ${authError}`);
        setLoading(false);
      }
    };

    fetchHtml();
  }, [axiosInstance, authLoading, authError, token, urlPostfix]);

  if (authLoading) return null;
  if (authError) return null;
  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#1a1a1a",
          color: "#fff",
          fontSize: "1.2rem",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              border: "4px solid #444",
              borderTop: "4px solid #1e3a8a",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px auto",
            }}
          ></div>
          <p>डाटा लोड हुँदैछ...</p>
        </div>
      </div>
    );
  }
  if (error) return null;

  //   return (
  //     <div
  //       style={{
  //         width: "100%",
  //         height: "100%",
  //         margin: 0,
  //         padding: 0,
  //         background: "#1a1a1a",
  //       }}
  //     >
  //       <h2
  //         style={{
  //           textAlign: "center",
  //           color: "#fff",
  //           marginBottom: "20px",
  //           fontFamily: "Arial, sans-serif",
  //           marginTop: "20px",
  //           background: "red",
  //         }}
  //       >
  //         {title}
  //       </h2>

  //       <table
  //         style={{
  //           width: "100%",
  //           height: "calc(100vh - 200px)",
  //           borderCollapse: "collapse",
  //           border: "1px solid #444",
  //           fontFamily: "Arial, sans-serif",
  //           backgroundColor: "#2d2d2d",
  //           tableLayout: "fixed",
  //         }}
  //       >
  //         <thead>
  //           <tr>
  //             <th
  //               style={{
  //                 border: "1px solid #444",
  //                 padding: "8px",
  //                 // backgroundColor: "#3a3a3a",
  //                 backgroundColor: "red",
  //                 textAlign: "center",
  //                 fontWeight: "bold",
  //                 color: "#fff",
  //                 width: "50%",
  //               }}
  //             >
  //               मातृभाषा/ वडा नं
  //             </th>
  //             <th
  //               style={{
  //                 border: "1px solid #444",
  //                 padding: "8px",
  //                 backgroundColor: "#3a3a3a",
  //                 textAlign: "center",
  //                 fontWeight: "bold",
  //                 color: "#fff",
  //                 width: "25%",
  //               }}
  //             >
  //               २
  //             </th>
  //             <th
  //               style={{
  //                 border: "1px solid #444",
  //                 padding: "8px",
  //                 backgroundColor: "#1e3a8a",
  //                 color: "#fff",
  //                 textAlign: "center",
  //                 fontWeight: "bold",
  //                 width: "25%",
  //               }}
  //             >
  //               जम्मा
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {tableData.map((row, index) => (
  //             <tr key={index}>
  //               <td
  //                 style={{
  //                   border: "1px solid #444",
  //                   padding: "8px",
  //                   //   backgroundColor: row.isTotal ? "#4a5568" : "#3a3a3a",
  //                   backgroundColor: "red",
  //                   textAlign: "center",
  //                   fontWeight: row.isTotal ? "bold" : "normal",
  //                   color: "#fff",
  //                 }}
  //               >
  //                 {row.motherTongue}
  //               </td>
  //               <td
  //                 style={{
  //                   border: "1px solid #444",
  //                   padding: "8px",
  //                   textAlign: "center",
  //                   backgroundColor: row.isTotal ? "#E2E8F0" : "#FFFFFF",
  //                   fontWeight: row.isTotal ? "bold" : "normal",
  //                   color: "#000000",
  //                 }}
  //               >
  //                 {row.ward2}
  //               </td>
  //               <td
  //                 style={{
  //                   border: "1px solid #444",
  //                   padding: "8px",
  //                   backgroundColor: "#1e3a8a",
  //                   color: "#fff",
  //                   textAlign: "center",
  //                   fontWeight: row.isTotal ? "bold" : "normal",
  //                 }}
  //               >
  //                 {row.total}
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        // background: "#1a1a1a",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#000000", // Changed font color to black
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
          marginTop: "20px",
          fontSize: "1.5em",
          textDecoration: "underline",
        }}
      >
        {title}
      </h2>
      <table
        style={{
          width: "100%",
          height: "calc(100vh - 200px)",
          borderCollapse: "collapse",
          border: "1px solid #444",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#2d2d2d",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #444",
                padding: "8px",
                backgroundColor: "#DC143C", // Red for the first header
                textAlign: "center",
                fontWeight: "bold",
                color: "#000000", // Changed font color to black
                width: "50%",
              }}
            >
              मातृभाषा/ वडा नं
            </th>
            <th
              style={{
                border: "1px solid #444",
                padding: "8px",
                backgroundColor: "#DC143C", // White for the second header
                textAlign: "center",
                fontWeight: "bold",
                color: "#000000", // Changed font color to black
                width: "25%",
              }}
            >
              २
            </th>
            <th
              style={{
                border: "1px solid #444",
                padding: "8px",
                backgroundColor: "#DC143C", // Dark blue for the third header
                color: "#000000", // Changed font color to black
                textAlign: "center",
                fontWeight: "bold",
                width: "25%",
              }}
            >
              जम्मा
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td
                style={{
                  border: "1px solid #444",
                  padding: "8px",
                  backgroundColor: "#003893", // Red for the first column's data cells
                  textAlign: "center",
                  fontWeight: row.isTotal ? "bold" : "normal",
                  color: "white", // Changed font color to black
                }}
              >
                {row.motherTongue}
              </td>
              <td
                style={{
                  border: "1px solid #444",
                  padding: "8px",
                  textAlign: "center",
                  backgroundColor: "#FFFFFF", // White for the second column's data cells
                  fontWeight: row.isTotal ? "bold" : "normal",
                  color: "#000000", // Changed font color to black
                }}
              >
                {row.ward2}
              </td>
              <td
                style={{
                  border: "1px solid #444",
                  padding: "8px",
                  backgroundColor: "white", // Dark blue for the third column's data cells
                  color: "black", // Changed font color to black
                  textAlign: "center",
                  //   fontWeight: row.isTotal ? "bold" : "normal",
                  fontWeight: "bold",
                }}
              >
                {row.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyDataComponent;
