// src/components/ReportDisplay.jsx
import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify"; // Import DOMPurify for HTML sanitization

function ReportDisplay({ reportUrl }) {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      // If no reportUrl is provided, clear content and stop loading
      if (!reportUrl) {
        setHtmlContent("");
        setLoading(false);
        setError(null); // Clear any previous errors
        return;
      }

      try {
        setLoading(true);
        setError(null); // Clear previous errors on new fetch

        console.log(`Fetching report from: ${reportUrl}`); // For debugging purposes

        const response = await fetch(reportUrl);

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} - ${response.statusText}`
          );
        }

        const rawHtml = await response.text();

        // --- IMPORTANT: Sanitize the HTML content using DOMPurify ---
        // This step is CRUCIAL to prevent Cross-Site Scripting (XSS) attacks.
        // You can customize DOMPurify options here if you need to allow
        // specific tags, attributes, or CSS that might otherwise be stripped.
        const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
          USE_PROFILES: { html: true }, // Standard profile for HTML content
          // Example: If your report HTML contains iframes, you might need:
          // ADD_TAGS: ['iframe'],
          // ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
        });

        setHtmlContent(sanitizedHtml);
      } catch (err) {
        console.error("Error fetching or sanitizing report:", err); // Log the error for debugging
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport(); // Call the fetch function when reportUrl changes
  }, [reportUrl]); // Dependency array: re-run effect when reportUrl changes

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400 min-h-[200px] flex items-center justify-center">
        Loading report...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500 dark:text-red-400 min-h-[200px] flex items-center justify-center">
        Error loading report: {error}
        <br />
        Please check the network connection or report URL.
      </div>
    );
  }

  // Use dangerouslySetInnerHTML to render the sanitized HTML string.
  // Apply some basic styling for the container.
  return (
    <div className="report-container p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-auto max-h-[calc(100vh-160px)]">
      {/* The HTML content from your report will be injected here */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}

export default ReportDisplay;
