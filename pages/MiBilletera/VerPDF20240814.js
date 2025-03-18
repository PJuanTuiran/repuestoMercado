import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function VerPDF({selectedPDF}) {

    const [pdfFile, setPdfFile] = useState();
    const [viewPdf, setViewPdf] = useState();

    useEffect(()=>{
        handleChange(selectedPDF);
    }, [selectedPDF])

    const fileType = ['application/pdf']

    const handleChange = (data) => {
        let selectedFile = data;
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile)
                reader.onload = (e) => {
                    setPdfFile(e.target.result)
                }
            }
            else {
                setPdfFile(null)
            }
        }
        else {
            console.log("Seleccione ")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (pdfFile !== null) {
            setViewPdf(pdfFile)
        }
        else {
            setViewPdf(null)
        }
    }

    const newplugin = defaultLayoutPlugin();

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <input type='file' className='form-control' onChange={handleChange} />
                <button type='submit' className='btn btn-success'>
                    View PDF
                </button>
            </form>

            <h2>View PDF</h2>
            <div className='pdf-container'>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                    {
                        viewPdf && <>
                            <Viewer fileUrl={viewPdf} />
                        </>}
                    {!viewPdf && <>No PDF</>}
                </Worker>
            </div>
        </div>
    );
}

export default VerPDF;