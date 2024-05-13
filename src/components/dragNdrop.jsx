import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    noClick: false,
    noKeyboard: true
  });

  const activeStyle = 'border-blue-500';
  const defaultStyle = 'border-gray-300';

  return (
    <div {...getRootProps()} style={{ cursor: 'pointer' }} className={`dropzone w-full h-32 flex justify-center items-center p-4 border-2 border-dashed ${isDragActive ? activeStyle : defaultStyle}`}>
      <input {...getInputProps()} />
      <p>{isDragActive ? 'Drop the file...' : 'Drag \'n\' drop file here, or click to select files'}</p>
    </div>
  );
};

const FileList = ({ files, removeFile }) => {
  return (
    <ul className="list-decimal pl-8">
      {files.map((file, index) => (
        <li key={index} className="mt-2">
          {file.name} <button onClick={() => removeFile(index)} className="text-red-500 ml-2">Remove</button>
        </li>
      ))}
    </ul>
  );
};

const DragAndDropComponent = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFiles((prevFiles) => [...prevFiles, file]);
  }, []);

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const mergePDFs = async () => {
    const mergedPdf = await PDFDocument.create();
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }
    const mergedPdfFile = await mergedPdf.save();
    downloadMergedPDF(mergedPdfFile);
  };

  const downloadMergedPDF = (pdfData) => {
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'merged.pdf';
    link.click();
  };

  const isMergeButtonDisabled = files.length < 2;

  return (
    <div className="flex flex-col items-center p-4 w-96">
      <Dropzone onDrop={onDrop} />
      {files.length > 0 && <FileList files={files} removeFile={removeFile} />}
      <button 
        onClick={mergePDFs} 
        disabled={isMergeButtonDisabled}
        className={`mt-4 p-2 text-white rounded ${!isMergeButtonDisabled ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        Merge PDFs
      </button>
    </div>
  );
};

export default DragAndDropComponent;

