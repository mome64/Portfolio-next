"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const CVPage = () => {
  const [client, setClient] = useState(false);

  useState(() => {
    setClient(true);
  }, []);

  const downloadCV = () => {

    const link = document.createElement("a");
    link.href = "/Mohammed_Mesoud_Resume.pdf";
    link.download = "Mohammed_Mesoud_Resume.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Professional Resume
          </h1>
          <p className="text-gray-600 mb-6">Download my CV in PDF format</p>
          <button
            onClick={downloadCV}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
          >
            Download PDF
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {client ? (
            <div className="w-full h-screen flex flex-col items-center justify-center p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Preview Unavailable
                </h2>
                <p className="text-gray-600 mb-6">
                  The PDF preview is not available in this view. Please download
                  the CV to view the complete document.
                </p>
                <button
                  onClick={downloadCV}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                >
                  Download PDF
                </button>
              </div>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-3/4 flex items-center justify-center">
                <p className="text-gray-500 text-lg">
                  PDF Preview Area - Download to view
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-gray-500">Loading...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVPage;
