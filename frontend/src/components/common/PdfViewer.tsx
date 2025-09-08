import {Document, Page, pdfjs} from 'react-pdf'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url'
import { useState } from 'react'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

export default function ViewPDFDocument({fileUrl} : any){
    const [numberOfPages, setNumberOfPages] = useState(0)

    const onDocumentLoadSuccess = ({numPages} : any) => {
        setNumberOfPages(numPages)
    }
    
    return(
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            {
                Array.from(new Array(numberOfPages)).map((el : any, index : number) => {
                    return <div className='border w-[600px]'  key={index} style={{marginBottom:'20px'}}>
                            <Page pageNumber={index + 1} width={600} />
                    </div>
                })
            }
        </Document>
    )
}