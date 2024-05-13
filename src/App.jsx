import React from 'react';
import './App.css';
import DragAndDropComponent from './components/dragNdrop';

function App() {
  return (
      <div className="App">
    <div className="text-center p-4">
        <h1 className="text-3xl font-bold">Quick PDF Merger Tool</h1>
        <h2 className="text-xl mt-2">
      Merge two or more PDF files into a single PDF file. The order of the files will be the order in which they are dropped. Everthing is done locally in your browser. No files are uploaded to any server. The source code can be found at GitHub
            <a href="https://github.com/saraxtro/QuickPDFMerge" className="text-blue-500 hover:text-blue-700"> here</a>.
        </h2>
    </div>
    <div className="flex justify-center items-center mt-4 mb-4">
        <DragAndDropComponent />
    </div>
</div>

  );
}

export default App;

