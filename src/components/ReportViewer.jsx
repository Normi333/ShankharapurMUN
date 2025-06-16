import React, { useState, useEffect } from "react";

function ReportViewer({ reportId }) {
  const [reportHtml, setReportHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reportId) {
      setReportHtml(""); // Clear content if no report is selected
      return;
    }

    const fetchReport = async () => {
      setLoading(true);
      setReportHtml(""); // Clear previous report content
      setError(null);
      try {
        // Replace with your actual API endpoint and how it expects the reportId
        const response = await fetch(`YOUR_API_ENDPOINT/reports/${reportId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const htmlContent = await response.text(); // Get response as plain text (HTML)
        setReportHtml(htmlContent);
      } catch (e) {
        console.error("Failed to fetch report:", e);
        setError("Failed to load report. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]); // Re-run effect when reportId changes

  if (loading) {
    return <div className="p-4 text-center">Loading report...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">{error}</div>;
  }

  if (!reportHtml) {
    return (
      <div className="p-4 text-center text-gray-500">
        Select a report to view.
      </div>
    );
  }

  return (
    <div className="report-viewer p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-auto">
      {/*
        DANGER: Using dangerouslySetInnerHTML is a security risk if content is not sanitized.
        Ensure HTML content from API is trusted and free of malicious scripts.
      */}
      <div dangerouslySetInnerHTML={{ __html: reportHtml }} />
    </div>
  );
}

export default ReportViewer;
