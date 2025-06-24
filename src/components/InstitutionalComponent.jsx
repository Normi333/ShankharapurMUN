import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

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
  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-white text-red-600 text-[1.2rem]">
        <div className="flex flex-col items-center justify-center text-center py-10">
          <p className="text-red-600 text-sm sm:text-base">डाटा उपलब्ध छैन।</p>
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
    <div style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
      <div
        style={{ width: "100%", overflowX: "auto" }}
        dangerouslySetInnerHTML={{ __html: rawHtml }}
      />
    </div>
  );
}

export default MyDataComponentInstitution;
