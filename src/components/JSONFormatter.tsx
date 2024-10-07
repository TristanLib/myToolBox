import React, { useState } from 'react';

const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (error) {
      setOutput('Invalid JSON');
    }
  };

  return (
    <div>
      <textarea
        className="w-full h-40 p-2 border rounded"
        placeholder="Paste your JSON here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={formatJSON}
      >
        Format JSON
      </button>
      <pre className="mt-4 p-2 bg-gray-100 rounded overflow-auto">
        {output}
      </pre>
    </div>
  );
};

export default JSONFormatter;