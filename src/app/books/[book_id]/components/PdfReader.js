"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfReader({ fileUrl }) {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  console.log(fileUrl);

  function onDocumentLoadSuccess({ numPages }) {
    // setNumPages(numPages);
    console.log("PDF loaded, number of pages:", numPages);
    setNumPages(numPages);
    setPageNumber(1); // reset to first page
  }
  const onDocumentError = (error) => {
    console.error("Error loading PDF document:", error);
  };
  return (
    <div className="flex flex-col items-center">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentError}
      >
        <Page pageNumber={pageNumber} />
      </Document>

      {/* <div className="flex gap-4 mt-4">
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((p) => p - 1)}
        >
          Prev
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber((p) => p + 1)}
        >
          Next
        </button>
      </div> */}
      {numPages > 0 && (
        <div>
          <button
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
            disabled={pageNumber <= 1}
          >
            Prev
          </button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
            disabled={pageNumber >= numPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
