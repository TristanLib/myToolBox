import React, { useState } from 'react';

const PDFConverter: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [action, setAction] = useState<'convert' | 'split' | 'merge'>('convert');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    setConverting(true);
    const formData = new FormData();
    
    if (action === 'merge') {
      files.forEach((file, index) => {
        formData.append(`files`, file);
      });
    } else {
      formData.append('file', files[0]);
    }

    try {
      const response = await fetch(`/${action === 'convert' ? 'convert-to-pdf' : action === 'split' ? 'split-pdf' : 'merge-pdfs'}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = action === 'merge' ? 'merged.pdf' : action === 'split' ? 'split_pdfs.zip' : `${files[0].name}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error(`${action} failed`);
      }
    } catch (error) {
      console.error(`Error ${action}ing file:`, error);
      alert(`Error ${action}ing file. Please try again.`);
    } finally {
      setConverting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Choose action:
          </label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value as 'convert' | 'split' | 'merge')}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="convert">Convert to PDF</option>
            <option value="split">Split PDF</option>
            <option value="merge">Merge PDFs</option>
          </select>
        </div>
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
            {action === 'merge' ? 'Upload PDFs to merge' : `Upload ${action === 'split' ? 'PDF' : 'file'} to ${action}`}
          </label>
          <input
            id="file-upload"
            name="file"
            type="file"
            multiple={action === 'merge'}
            onChange={handleFileChange}
            accept={action === 'convert' ? '.doc,.docx,.txt,.jpg,.jpeg,.png' : '.pdf'}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>
        <button
          type="submit"
          disabled={files.length === 0 || converting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {converting ? `${action === 'convert' ? 'Converting' : action === 'split' ? 'Splitting' : 'Merging'}...` : `${action === 'convert' ? 'Convert' : action === 'split' ? 'Split' : 'Merge'} ${action === 'merge' ? 'PDFs' : 'PDF'}`}
        </button>
      </form>
    </div>
  );
};

export default PDFConverter;