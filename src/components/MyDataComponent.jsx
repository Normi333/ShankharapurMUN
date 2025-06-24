// import React, { useState, useEffect, useRef } from "react";
// import { useAuth } from "../context/AuthContext.jsx";
// import { FaPrint } from "react-icons/fa"; // Import the print icon

// // Add CSS for spinning animation
// const spinAnimation = `
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
// `;

// function MyDataComponent({
//   urlPostfix = "hsurvey_mothertongue",
//   title = "मातृभाषाको आधारमा वर्गिकरण",
// }) {
//   const { axiosInstance, authLoading, authError, token } = useAuth();
//   const [tableData, setTableData] = useState([]);
//   const [tableHeaders, setTableHeaders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // error will be a string message or null

//   // Ref for the content to be printed
//   const printableContentRef = useRef(null);

//   // Inject CSS animation
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.textContent = spinAnimation;
//     document.head.appendChild(style);

//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchHtml = async () => {
//       if (authLoading || authError || !token) {
//         // Only proceed if auth is loaded and successful
//         if (authError) {
//           setError(`API Initialization Error: ${authError}`);
//         }
//         setLoading(false); // Stop loading if auth is not ready
//         return; // Exit early
//       }

//       setLoading(true);
//       setError(null); // Reset error state at the start of every new fetch attempt
//       setTableData([]); // Clear previous data
//       setTableHeaders([]); // Clear previous headers

//       try {
//         // Make the POST request to the process endpoint for HTML
//         const response = await axiosInstance.post(
//           `/processes/${urlPostfix}`,
//           {
//             ward_no: "2",
//             "report-type": "HTML",
//           },
//           {
//             headers: {
//               id: 0,
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         console.log("API Response:", response.data); // Debug the response

//         let htmlString = "";
//         if (response.data && typeof response.data === "string") {
//           htmlString = response.data;
//         } else if (response.data && response.data.exportFile) {
//           const base64Html = response.data.exportFile;
//           const binaryString = atob(base64Html);
//           const bytes = new Uint8Array(binaryString.length);
//           for (let i = 0; i < binaryString.length; i++) {
//             bytes[i] = binaryString.charCodeAt(i) & 0xff;
//           }
//           htmlString = new TextDecoder("utf-8").decode(bytes);
//         } else {
//           // If response.data is null, undefined, or empty object, consider it an error
//           throw new Error("No HTML content found in response.");
//         }

//         const parser = new DOMParser();
//         const doc = parser.parseFromString(htmlString, "text/html");

//         // Check for the old format first
//         if (doc.querySelector(".jrxtdatacell")) {
//           const headers = ["मातृभाषा", "वडा नं २", "जम्मा"];
//           setTableHeaders(headers);
//           const dataRows = [];
//           const rowHeaders = doc.querySelectorAll(".jrxtrowfloating");
//           const dataCells = doc.querySelectorAll(".jrxtdatacell");

//           rowHeaders.forEach((header, index) => {
//             const motherTongue = header.textContent.trim();
//             if (motherTongue && motherTongue !== "जम्मा") {
//               const ward2Cell = dataCells[index * 2];
//               const totalCell = dataCells[index * 2 + 1];

//               if (ward2Cell && totalCell) {
//                 dataRows.push({
//                   [headers[0]]: motherTongue,
//                   [headers[1]]: ward2Cell.textContent.trim(),
//                   [headers[2]]: totalCell.textContent.trim(),
//                 });
//               }
//             }
//           });

//           const totalRow = doc.querySelector(".jrxtrowfloating:last-child");
//           const totalCellsLast = doc.querySelectorAll(".jrxtdatacell");
//           if (totalRow && totalCellsLast.length >= 2) {
//             const lastWard2Cell = totalCellsLast[totalCellsLast.length - 2];
//             const lastTotalCell = totalCellsLast[totalCellsLast.length - 1];
//             dataRows.push({
//               [headers[0]]: "जम्मा",
//               [headers[1]]: lastWard2Cell.textContent.trim(),
//               [headers[2]]: lastTotalCell.textContent.trim(),
//               isTotal: true,
//             });
//           }
//           if (dataRows.length === 0) {
//             setError("No data available for this report.");
//           }
//           setTableData(dataRows);
//         } else if (doc.querySelector("table.jrPage")) {
//           // Handle the new format
//           const table = doc.querySelector("table.jrPage");
//           const rows = Array.from(table.querySelectorAll("tr"));
//           const borderedRows = rows.filter((row) =>
//             row.querySelector('td[style*="border"]')
//           );

//           if (borderedRows.length > 0) {
//             const headerRow = borderedRows[0];
//             const newHeaders = Array.from(
//               headerRow.querySelectorAll('td[style*="border"]')
//             ).map((td) => td.textContent.trim());
//             setTableHeaders(newHeaders);

//             const newTableData = borderedRows.slice(1).map((dataRow) => {
//               const cells = Array.from(
//                 dataRow.querySelectorAll('td[style*="border"]')
//               );
//               const rowData = {};
//               newHeaders.forEach((header, index) => {
//                 rowData[header] = cells[index]
//                   ? cells[index].textContent.trim()
//                   : "";
//               });
//               return rowData;
//             });
//             if (newTableData.length === 0) {
//               setError("No data available for this report.");
//             }
//             setTableData(newTableData);
//           } else {
//             setError("No data table found in the report.");
//           }
//         } else {
//           setError("Unsupported HTML format or no data found.");
//         }
//       } catch (e) {
//         setError(
//           e.response?.data?.error ||
//             e.message ||
//             "Failed to fetch or parse report data."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHtml();
//   }, [axiosInstance, authLoading, authError, token, urlPostfix]);

//   // Function to handle printing
//   const handlePrint = () => {
//     const content = printableContentRef.current;
//     if (content) {
//       const printWindow = window.open("", "_blank");
//       if (!printWindow) {
//         // Fallback for pop-up blockers or if window.open fails
//         console.error("Could not open print window. Please allow pop-ups.");
//         return;
//       }

//       const originalStyles = `
//         <style>
//           body { font-family: Arial, sans-serif; margin: 20px; }
//           h2 {
//             text-align: center;
//             color: #000000;
//             margin-bottom: 20px;
//             font-size: 1.5em;
//             text-decoration: underline;
//           }
//           table {
//             width: 100%;
//             border-collapse: collapse;
//             border: 1px solid #444;
//             font-family: Arial, sans-serif;
//             background-color: #f2f2f2;
//             table-layout: fixed;
//           }
//           th, td {
//             border: 1px solid #444;
//             padding: 8px;
//             text-align: center;
//             color: black;
//           }
//           th {
//             background-color: #DC143C;
//             font-weight: bold;
//             color: white;
//           }
//           tr:nth-child(even) td {
//             background-color: #f2f2f2;
//           }
//           tr:nth-child(odd) td {
//             background-color: #ffffff;
//           }
//           tr.isTotal td {
//             font-weight: bold;
//           }
//         </style>
//       `;

//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>${title}</title>
//             ${originalStyles}
//           </head>
//           <body>
//             ${content.innerHTML}
//           </body>
//         </html>
//       `);
//       printWindow.document.close();
//       printWindow.focus();
//       printWindow.print();
//     }
//   };

//   // --- Render Logic ---
//   if (authLoading) return null;
//   if (authError) return null;
//   if (loading) {
//     return (
//       <div className="w-full h-full flex justify-center items-center bg-white text-gray-800 text-[1.2rem]">
//         <div className="flex flex-col items-center justify-center text-center py-10">
//           <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
//           <p className="text-gray-800 text-sm sm:text-base">
//             डाटा लोड हुँदैछ...
//           </p>
//         </div>
//       </div>
//     );
//   }
//   // Check for error AFTER loading is complete
//   if (error) {
//     return (
//       <div className="w-full h-full flex justify-center items-center bg-white text-red-600 text-[1.2rem]">
//         <div className="flex flex-col items-center justify-center text-center py-10">
//           <p className="text-red-600 text-sm sm:text-base">
//             डाटा उपलब्ध छैन। {/* Nepali for "Data is not available." */}
//           </p>
//           {/* Optionally display the specific error message for debugging if needed: {error} */}
//         </div>
//       </div>
//     );
//   }

//   // Finally, render the table only if there is data
//   if (tableData.length === 0) {
//     // This catch-all handles cases where error was not set, but data is truly empty
//     return (
//       <div className="w-full h-full flex justify-center items-center bg-white text-red-600 text-[1.2rem]">
//         <div className="flex flex-col items-center justify-center text-center py-10">
//           <p className="text-red-600 text-sm sm:text-base">
//             डाटा उपलब्ध छैन। {/* Nepali for "Data is not available." */}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         margin: 0,
//         padding: 0,
//       }}
//     >
//       <div className="flex justify-end mb-4">
//         {" "}
//         {/* Container for the print button */}
//         <button
//           onClick={handlePrint}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2" // Added flex and space for icon
//         >
//           <FaPrint /> {/* Print icon */}
//           <span>प्रिन्ट</span> {/* Print text */}
//         </button>
//       </div>
//       <div ref={printableContentRef}>
//         {" "}
//         {/* Content to be printed */}
//         <h2
//           style={{
//             textAlign: "center",
//             color: "#000000", // Changed font color to black
//             marginBottom: "20px",
//             fontFamily: "Arial, sans-serif",
//             marginTop: "20px",
//             fontSize: "1.5em",
//             textDecoration: "underline",
//           }}
//         >
//           {title}
//         </h2>
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             border: "1px solid #444",
//             fontFamily: "Arial, sans-serif",
//             backgroundColor: "#f2f2f2",
//             tableLayout: "fixed",
//           }}
//         >
//           <thead>
//             <tr>
//               {tableHeaders.map((header, index) => (
//                 <th
//                   key={index}
//                   style={{
//                     border: "1px solid #444",
//                     padding: "8px",
//                     backgroundColor: "#DC143C",
//                     textAlign: "center",
//                     fontWeight: "bold",
//                     color: "white",
//                   }}
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((row, index) => (
//               <tr key={index} className={row.isTotal ? "isTotal" : ""}>
//                 {tableHeaders.map((header, cellIndex) => (
//                   <td
//                     key={cellIndex}
//                     style={{
//                       border: "1px solid #444",
//                       padding: "8px",
//                       textAlign: "center",
//                       backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2",
//                       fontWeight: row.isTotal ? "bold" : "normal",
//                       color: "black",
//                     }}
//                   >
//                     {row[header]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default MyDataComponent;

// src/components/MyDataComponent.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { FaPrint } from "react-icons/fa"; // Import the print icon

// Add CSS for spinning animation
const spinAnimation = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Helper function to derive the first header from the report title
const deriveFirstHeader = (reportTitle) => {
  if (!reportTitle) return "";
  if (reportTitle.includes("मातृभाषा")) return "मातृभाषा";
  if (reportTitle.includes("धर्म")) return "धर्म";
  if (reportTitle.includes("जाति")) return "जाति";
  if (reportTitle.includes("कामको विभाजन")) return "कामको विभाजन";
  if (reportTitle.includes("खाना पकाउने इन्धन")) return "खाना पकाउने इन्धन";
  if (reportTitle.includes("निको नहुने रोग")) return "निको नहुने रोग";
  if (reportTitle.includes("लगानीको स्रोत")) return "लगानीको स्रोत";
  if (reportTitle.includes("घरको स्थिति")) return "घरको स्थिति";
  if (reportTitle.includes("बहाल विवरण")) return "बहाल विवरण";
  if (reportTitle.includes("ऋणको स्रोत")) return "ऋणको स्रोत";
  if (reportTitle.includes("बचतको स्रोत")) return "बचतको स्रोत";
  if (reportTitle.includes("आम्दानी र खर्च")) return "आम्दानी र खर्च";
  if (reportTitle.includes("विदेशी")) return "विदेशी";
  if (reportTitle.includes("सेवाको विवरण")) return "सेवाको विवरण";
  if (reportTitle.includes("मृत्युको संख्या")) return "मृत्युको संख्या";
  if (reportTitle.includes("जग्गाको विवरण")) return "जग्गाको विवरण";
  if (reportTitle.includes("भवनको विवरण")) return "भवनको विवरण";
  if (reportTitle.includes("प्रकोपको विवरण")) return "प्रकोपको विवरण";
  if (reportTitle.includes("बिजुलीको स्रोत")) return "बिजुलीको स्रोत";
  if (reportTitle.includes("शौचालयको स्थिति")) return "शौचालयको स्थिति";
  if (reportTitle.includes("पानीको स्रोत")) return "पानीको स्रोत";
  if (reportTitle.includes("उमेर समूह")) return "उमेर समूह";

  // Fallback for cases not explicitly listed: try to extract based on common patterns
  let extracted = reportTitle.split("को आधारमा वर्गिकरण")[0]?.trim();
  if (extracted && extracted !== reportTitle) return extracted;

  extracted = reportTitle.split("को रिपोर्ट")[0]?.trim();
  if (extracted && extracted !== reportTitle) return extracted;

  return reportTitle; // Return original title if no specific pattern matched
};

function MyDataComponent({
  urlPostfix = "hsurvey_mothertongue",
  title = "मातृभाषाको आधारमा वर्गिकरण",
}) {
  const { axiosInstance, authLoading, authError, token } = useAuth();
  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // error will be a string message or null

  // Ref for the content to be printed
  const printableContentRef = useRef(null);

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
      if (authLoading || authError || !token) {
        if (authError) {
          setError(`API Initialization Error: ${authError}`);
        }
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setTableData([]);
      setTableHeaders([]);

      try {
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

        console.log("API Response:", response.data);

        let htmlString = "";
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

        // Prioritize parsing the new format (table.jrPage)
        const newFormatTable = doc.querySelector("table.jrPage");
        const oldFormatDataCells = doc.querySelector(".jrxtdatacell");

        if (newFormatTable) {
          // Handle the new format
          const rows = Array.from(newFormatTable.querySelectorAll("tr"));
          const borderedRows = rows.filter((row) =>
            row.querySelector('td[style*="border"]')
          );

          if (borderedRows.length > 0) {
            const headerRow = borderedRows[0];
            const newHeaders = Array.from(
              headerRow.querySelectorAll('td[style*="border"]')
            ).map((td) => td.textContent.trim());
            setTableHeaders(newHeaders);

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
              setError("No data available for this report.");
            }
            setTableData(newTableData);
          } else {
            setError("No data table found in the report.");
          }
        } else if (oldFormatDataCells) {
          // Handle the old format as a fallback
          // Dynamically derive the first header based on the title prop
          const firstHeader = deriveFirstHeader(title);
          const headers = [firstHeader, "वडा नं २", "जम्मा"];
          setTableHeaders(headers);

          const dataRows = [];
          const rowHeaders = doc.querySelectorAll(".jrxtrowfloating");
          const totalCellsLast = doc.querySelectorAll(".jrxtdatacell"); // Re-query total cells for consistency

          rowHeaders.forEach((header, index) => {
            const firstColumnData = header.textContent.trim();
            if (firstColumnData && firstColumnData !== "जम्मा") {
              const ward2Cell = totalCellsLast[index * 2];
              const totalCell = totalCellsLast[index * 2 + 1];

              if (ward2Cell && totalCell) {
                dataRows.push({
                  [headers[0]]: firstColumnData,
                  [headers[1]]: ward2Cell.textContent.trim(),
                  [headers[2]]: totalCell.textContent.trim(),
                });
              }
            }
          });

          const totalRow = doc.querySelector(".jrxtrowfloating:last-child");
          if (totalRow && totalCellsLast.length >= 2) {
            const lastWard2Cell = totalCellsLast[totalCellsLast.length - 2];
            const lastTotalCell = totalCellsLast[totalCellsLast.length - 1];
            dataRows.push({
              [headers[0]]: "जम्मा",
              [headers[1]]: lastWard2Cell.textContent.trim(),
              [headers[2]]: lastTotalCell.textContent.trim(),
              isTotal: true,
            });
          }
          if (dataRows.length === 0) {
            setError("No data available for this report.");
          }
          setTableData(dataRows);
        } else {
          setError("Unsupported HTML format or no data found.");
        }
      } catch (e) {
        setError(
          e.response?.data?.error ||
            e.message ||
            "Failed to fetch or parse report data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHtml();
  }, [axiosInstance, authLoading, authError, token, urlPostfix, title]); // Add 'title' to dependencies

  // Function to handle printing
  const handlePrint = () => {
    const content = printableContentRef.current;
    if (content) {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        console.error("Could not open print window. Please allow pop-ups.");
        return;
      }

      const originalStyles = `
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h2 {
            text-align: center;
            color: #000000;
            margin-bottom: 20px;
            font-size: 1.5em;
            text-decoration: underline;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #444;
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            table-layout: fixed;
          }
          th, td {
            border: 1px solid #444;
            padding: 8px;
            text-align: center;
            color: black;
          }
          th {
            background-color: #DC143C;
            font-weight: bold;
            color: white;
          }
          tr:nth-child(even) td {
            background-color: #f2f2f2;
          }
          tr:nth-child(odd) td {
            background-color: #ffffff;
          }
          tr.isTotal td {
            font-weight: bold;
          }
        </style>
      `;

      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            ${originalStyles}
          </head>
          <body>
            ${content.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  // --- Render Logic ---
  if (authLoading) return null;
  if (authError) return null;
  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-white text-gray-800 text-[1.2rem]">
        <div className="flex flex-col items-center justify-center text-center py-10">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-800 text-sm sm:text-base">
            डाटा लोड हुँदैछ...
          </p>
        </div>
      </div>
    );
  }
  // Check for error AFTER loading is complete
  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-white text-red-600 text-[1.2rem]">
        <div className="flex flex-col items-center justify-center text-center py-10">
          <p className="text-red-600 text-sm sm:text-base">
            डाटा उपलब्ध छैन। {/* Nepali for "Data is not available." */}
          </p>
          {/* Optionally display the specific error message for debugging if needed: {error} */}
        </div>
      </div>
    );
  }

  // Finally, render the table only if there is data
  if (tableData.length === 0) {
    // This catch-all handles cases where error was not set, but data is truly empty
    return (
      <div className="w-full h-full flex justify-center items-center bg-white text-red-600 text-[1.2rem]">
        <div className="flex flex-col items-center justify-center text-center py-10">
          <p className="text-red-600 text-sm sm:text-base">
            डाटा उपलब्ध छैन। {/* Nepali for "Data is not available." */}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2"
        >
          <FaPrint />
          <span>प्रिन्ट</span>
        </button>
      </div>
      <div ref={printableContentRef}>
        <h2
          style={{
            textAlign: "center",
            color: "#000000",
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
            borderCollapse: "collapse",
            border: "1px solid #444",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f2f2f2",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  style={{
                    border: "1px solid #444",
                    padding: "8px",
                    backgroundColor: "#DC143C",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className={row.isTotal ? "isTotal" : ""}>
                {tableHeaders.map((header, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      border: "1px solid #444",
                      padding: "8px",
                      textAlign: "center",
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2",
                      fontWeight: row.isTotal ? "bold" : "normal",
                      color: "black",
                    }}
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyDataComponent;
