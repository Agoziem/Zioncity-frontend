"use client";
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const useJsxToPdf = (jsxComponent) => {
    const [ pdfname, setPdfname ] = useState('MyPdf'); // set the pdf name
    const pdfRef = jsxComponent ? useRef(jsxComponent) : null;
    const [loading, setLoading] = useState(true);

    const generatePdf = async () => {
        setLoading(true);
        const canvas = await html2canvas(jsxComponent);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        if (pdfRef.current) {
            const componentWidth = pdfRef.current.offsetWidth;  // A4 page is 210mm wide
            const componentHeight = pdfRef.current.offsetHeight;  // A4 page is 297mm high
            pdf.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
        } else {
            pdf.addImage(imgData, 'PNG');
        }
        setLoading(false);
        pdf.save(`${pdfname}.pdf`);
    };

    return {loading, generatePdf, setPdfname};
};

export default useJsxToPdf;


// usage Example
// import React, { useRef } from 'react';
// import useJsxToPdf from './hooks/useJsxtoPdf';

// const MyComponent = () => {
//     const componentRef = useRef(null);
//     const {loading,generatePdf,setPdfname} = useJsxToPdf(componentRef.current);

//     const handleDownloadPdf = () => {
//         if (!loading) {
//             // If not loading, trigger the PDF generation
//             // This could be done through a button click or any other UI event
//             // In this example, we'll assume a button click
//             generatePdf()
//         }
//     };

//     return (
//         <div>
//             {/* Render your JSX component with a ref */}
//             <div ref={componentRef}>
//                 {/* Your JSX component code here */}
//             </div>
            
//             {/* Conditionally render a download button based on loading state */}
//             {!loading && (
//                 <button onClick={handleDownloadPdf}>Download PDF</button>
//             )}
//         </div>
//     );
// };

// export default MyComponent;
