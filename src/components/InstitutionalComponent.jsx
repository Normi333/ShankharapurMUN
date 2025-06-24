// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext.jsx";

// // Add CSS for spinning animation
// const spinAnimation = `
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
// `;

// function MyDataComponentInstitution({
//   urlPostfix = "co_org_details",
//   title = "सामुदायिक संस्था विवरण",
// }) {
//   const { axiosInstance, authLoading, authError, token } = useAuth();
//   const [rawHtml, setRawHtml] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

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
//         if (authError) {
//           setError(`API Initialization Error: ${authError}`);
//         }
//         setLoading(false);
//         return;
//       }
//       setLoading(true);
//       setError(null);
//       setRawHtml("");
//       try {
//         console.log("Fetching data for:", urlPostfix);
//         console.log("title:", title);
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
//           throw new Error("No HTML content found in response.");
//         }

//         setRawHtml(htmlString);
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
//   if (error) {
//     return (
//       <div className="w-full h-full flex justify-center items-center bg-white text-red-600 text-[1.2rem]">
//         <div className="flex flex-col items-center justify-center text-center py-10">
//           <p className="text-red-600 text-sm sm:text-base">डाटा उपलब्ध छैन।</p>
//         </div>
//       </div>
//     );
//   }
//   if (!rawHtml) {
//     return (
//       <div className="w-full h-full flex justify-center items-center bg-white text-red-600 text-[1.2rem]">
//         <div className="flex flex-col items-center justify-center text-center py-10">
//           <p className="text-red-600 text-sm sm:text-base">डाटा उपलब्ध छैन।</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
//       <div
//         style={{ width: "100%", overflowX: "auto" }}
//         dangerouslySetInnerHTML={{ __html: rawHtml }}
//       />
//     </div>
//   );
// }

// export default MyDataComponentInstitution;

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

function MyDataComponentInstitution({
  urlPostfix = "co_org_details",
  title = "सामुदायिक संस्था विवरण",
}) {
  const { axiosInstance, authLoading, authError, token } = useAuth();
  const [rawHtml, setRawHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref for the content to be printed (the div containing rawHtml)
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
      setRawHtml("");
      try {
        console.log("Fetching data for:", urlPostfix);
        console.log("title:", title);
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

        setRawHtml(htmlString);
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
  }, [axiosInstance, authLoading, authError, token, urlPostfix]);

  // Function to handle printing
  const handlePrint = () => {
    const content = printableContentRef.current;
    if (content) {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        // Fallback for pop-up blockers or if window.open fails
        console.error("Could not open print window. Please allow pop-ups.");
        return;
      }

      // Styles specifically for the print version of the table
      // These styles try to mimic common table styles and should make the printed output readable.
      // Use !important to override any inline styles that might be present in rawHtml.
      const printStyles = `
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1, h2, h3, h4, h5, h6 {
            text-align: center;
            color: #000000;
            margin-bottom: 20px;
            font-family: "Arial", sans-serif;
            margin-top: 20px;
            text-decoration: underline;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #444;
            font-family: "Arial", sans-serif;
            background-color: #f2f2f2;
            table-layout: auto; /* Use auto for print to allow content to dictate width */
            margin-bottom: 1rem;
          }
          th, td {
            border: 1px solid #444;
            padding: 8px;
            text-align: center;
            color: black;
            font-size: 0.9em;
          }
          /* Apply header styles if the first row contains <th> or if first-row <td>s are headers */
          table thead th, table thead td {
            background-color: #DC143C !important; /* Force red header background */
            font-weight: bold;
            color: white;
            padding: 12px 8px; /* More padding for headers */
          }
          /* This targets <td> elements in the first row, if they are used as headers */
          table tbody tr:first-child td {
            background-color: #DC143C !important;
            font-weight: bold;
            color: white;
          }
          /* Alternating row colors for data rows */
          table tbody tr:nth-child(odd) td {
            background-color: #ffffff !important; /* Force white for odd rows */
          }
          table tbody tr:nth-child(even) td {
            background-color: #f2f2f2 !important; /* Force light grey for even rows */
          }
          /* Attempt to bold the "जम्मा" row or similar total rows */
          table tbody tr.isTotal td, /* If rawHtml includes a class like isTotal */
          table tbody tr:last-child td { /* Often the last row is the total */
            font-weight: bold;
          }
        </style>
      `;

      // The rawHtml likely already contains the title as an <h2> or similar.
      // We pass the rawHtml directly to printWindow.document.write
      // and let the printStyles handle its appearance.
      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            ${printStyles}
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
  if (authError) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-white text-red-600 text-[1.2rem]">
        <div className="flex flex-col items-center justify-center text-center py-10">
          <p className="text-red-600 text-sm sm:text-base">
            API Initialization Error: {authError}
          </p>
        </div>
      </div>
    );
  }
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
  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-white text-red-600 text-[1.2rem]">
        <div className="flex flex-col items-center justify-center text-center py-10">
          <p className="text-red-600 text-sm sm:text-base">डाटा उपलब्ध छैन।</p>
          {/* Optionally display the specific error message for debugging if needed: {error} */}
        </div>
      </div>
    );
  }
  if (!rawHtml) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-white text-red-600 text-[1.2rem]">
        <div className="flex flex-col items-center justify-center text-center py-10">
          <p className="text-red-600 text-sm sm:text-base">डाटा उपलब्ध छैन।</p>
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex justify-end mb-4 pr-4 pt-4">
        {" "}
        {/* Added padding for button */}
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2 shadow-md"
        >
          <FaPrint />
          <span>प्रिन्ट</span>
        </button>
      </div>
      <div
        ref={printableContentRef} // Assign the ref here
        style={{ width: "100%", overflowX: "auto", padding: "16px" }} // Added padding for better visual spacing
        dangerouslySetInnerHTML={{ __html: rawHtml }}
      />
    </div>
  );
}

export default MyDataComponentInstitution;
