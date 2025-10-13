import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function ViewPDFDocument({
  fileUrl,
  classes = 'border w-[600px]',
  docWidth = 600,
  docHeight = 600
}: {
  fileUrl: string;
  classes: string;
  docWidth: number;
  docHeight: number
}) {
  const [numberOfPages, setNumberOfPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumberOfPages(numPages);
  };

  return (
    <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numberOfPages)).map((el: any, index: number) => {
        return (
          <div className={classes} key={index} style={{ marginBottom: '20px' }}>
            <Page pageNumber={index + 1} width={docWidth} height={docHeight} />
          </div>
        );
      })}
    </Document>
  );
}
