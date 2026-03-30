import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl
// `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const parsePdf = async (file: Blob) => {
    try {
        const arrayBuffer = await file.arrayBuffer()
        const pdfDoc = await pdfjsLib.getDocument({data: arrayBuffer}).promise
        let fullText = ""
        for(let i = 1; i <= pdfDoc.numPages; i++){
            const page = await pdfDoc.getPage(i)
            const content = await page.getTextContent()
            const text = content.items.map((value: any) => value.str).join(" ")
            fullText += text + "\n"
        }

        console.log('expected result from parser', fullText)
        
        if(fullText.trim().length < 50){
            throw new Error('This pdf seems to be an image or scanned. Please upload proper pdfs')
        }

        return fullText
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Something went wrong')
    }
}

