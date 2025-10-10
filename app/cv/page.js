"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const CVPage = () => {
  const [client, setClient] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState("iframe"); // iframe or embed

  useEffect(() => {
    setClient(true);
  }, []);

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Mohammed_Mesoud_Resume.pdf";
    link.download = "Mohammed_Mesoud_Resume.pdf";
    link.click();
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const switchPreviewMode = () => {
    setPreviewMode(previewMode === "iframe" ? "embed" : "iframe");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Professional Resume
          </h1>
          <p className="text-gray-600 mb-6 text-lg">View or download my CV in PDF format</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={togglePreview}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
            <button
              onClick={downloadCV}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Download PDF
            </button>
          </div>
          
          {showPreview && (
            <div className="mt-4">
              <button
                onClick={switchPreviewMode}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Switch to {previewMode === "iframe" ? "Embed" : "Iframe"} view
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          {showPreview && client ? (
            <div className="w-full flex flex-col">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-center md:text-left mb-2 md:mb-0">
                    Interactive CV Preview - Scroll to view all pages
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={downloadCV}
                      className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-1 rounded text-sm font-medium transition"
                    >
                      Download
                    </button>
                    <button
                      onClick={togglePreview}
                      className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-1 rounded text-sm font-medium transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-grow">
                {previewMode === "iframe" ? (
                  <iframe
                    src="/Mohammed_Mesoud_Resume.pdf"
                    className="w-full"
                    style={{ height: "70vh" }}
                    title="CV Preview"
                  />
                ) : (
                  <embed
                    src="/Mohammed_Mesoud_Resume.pdf"
                    type="application/pdf"
                    className="w-full"
                    style={{ height: "70vh" }}
                  />
                )}
              </div>
              <div className="p-4 bg-gray-50 text-center text-sm text-gray-500">
                Having trouble viewing? <button onClick={downloadCV} className="text-blue-600 hover:underline">Download the PDF</button>
              </div>
            </div>
          ) : !showPreview && client ? (
            <div className="w-full flex flex-col items-center justify-center p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Professional Resume
                </h2>
                <p className="text-gray-600 mb-8 max-w-2xl text-lg">
                  View an interactive preview of my CV or download the PDF version. 
                  The preview allows you to scroll through all pages without leaving the page.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={togglePreview}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-4 px-10 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                  >
                    View Interactive Preview
                  </button>
                  <button
                    onClick={downloadCV}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-4 px-10 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <div className="text-blue-500 text-3xl mb-3">🔍</div>
                  <h3 className="font-bold text-lg mb-2">Interactive Preview</h3>
                  <p className="text-gray-600 text-sm">View all pages of my CV directly in your browser without downloading.</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                  <div className="text-green-500 text-3xl mb-3">⚡</div>
                  <h3 className="font-bold text-lg mb-2">Fast Access</h3>
                  <p className="text-gray-600 text-sm">Quickly navigate through sections with our optimized PDF viewer.</p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                  <div className="text-purple-500 text-3xl mb-3">📥</div>
                  <h3 className="font-bold text-lg mb-2">Easy Download</h3>
                  <p className="text-gray-600 text-sm">Download the high-quality PDF version for offline viewing.</p>
                </div>
              </div>
              
              <div className="mt-12 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl w-full max-w-2xl h-80 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-6xl mb-4">📄</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">CV Preview</h3>
                  <p className="text-gray-500">
                    Click "View Interactive Preview" to see my complete resume
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-gray-500">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                Loading CV...
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Need help? Contact me at <a href="mailto:mesoudmohammed393@gmail.com" className="text-blue-600 hover:underline">mesoudmohammed393@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default CVPage;