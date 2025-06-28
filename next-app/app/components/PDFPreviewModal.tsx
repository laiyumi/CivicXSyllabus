import React, { useState, useEffect } from "react";

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  fileName: string;
  onDownload: () => void;
}

const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  fileName,
  onDownload,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pdfUrl) {
      setLoading(true);
    }
  }, [pdfUrl]);

  if (!isOpen || !pdfUrl) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-11/12 max-w-6xl h-5/6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">PDF Preview: {fileName}</h3>
          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={onDownload}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download PDF
            </button>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
          {loading && (
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <span className="loading loading-spinner loading-lg"></span>
                <p className="mt-4 text-gray-600">Loading PDF preview...</p>
              </div>
            </div>
          )}

          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full border-0"
            onLoad={() => setLoading(false)}
            style={{ minHeight: "500px" }}
            title="PDF Preview"
          />
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default PDFPreviewModal;
