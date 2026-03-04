import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFReader({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="pdf-reader">
      <div className="pdf-controls">
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage <= 1}>← Prev</button>
        <span>{currentPage} / {numPages || "—"}</span>
        <button onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))} disabled={currentPage >= numPages}>Next →</button>
      </div>

      <div className="pdf-progress">
        <div style={{ width: `${(currentPage / numPages) * 100}%` }} />
      </div>

      <Document
        file={`${import.meta.env.VITE_API_URL.replace("/api", "")}${url}`}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<div className="pdf-loading">Loading PDF…</div>}
        error={<div className="pdf-error">Failed to load PDF</div>}
      >
        <Page pageNumber={currentPage} width={Math.min(window.innerWidth - 80, 760)} />
      </Document>
    </div>
  );
}