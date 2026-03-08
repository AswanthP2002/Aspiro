import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url';
import { useEffect, useRef, useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;


interface ViewPDFDocumentProps {
  fileUrl: string;
  classes?: string;
  docWidth?: number;
  docHeight?: number;
}

export default function ViewPDFDocument({
  fileUrl,
  classes = '',
  docWidth,
  docHeight
}: ViewPDFDocumentProps) {
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumberOfPages(numPages);
  };

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries && entries.length > 0) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`w-full ${classes}`}>
      <Document 
        file={fileUrl} 
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className="flex justify-center p-4 text-gray-500 text-sm">Loading PDF...</div>}
        error={<div className="flex justify-center p-4 text-red-500 text-sm">Failed to load PDF</div>}
      >
        {Array.from(new Array(numberOfPages)).map((_, index) => (
          <div key={index} className="mb-4 flex justify-center shadow-sm">
            <Page 
              pageNumber={index + 1} 
              width={docWidth || (containerWidth > 0 ? containerWidth : undefined)} 
              height={docHeight}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
