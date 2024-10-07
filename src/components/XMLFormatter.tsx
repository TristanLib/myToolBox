import React, { useState } from 'react';

const XMLFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatXML = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, "text/xml");
      const serializer = new XMLSerializer();
      const formatted = formatXMLString(serializer.serializeToString(xmlDoc));
      setOutput(formatted);
    } catch (error) {
      setOutput('Invalid XML');
    }
  };

  const formatXMLString = (xml: string) => {
    let formatted = '';
    let indent = '';
    const tab = '  '; // 2 spaces for indentation
    xml.split(/>\s*</).forEach(function(node) {
      if (node.match( /^\/\w/ )) {
        indent = indent.substring(tab.length); // decrease indent
      }
      formatted += indent + '<' + node + '>\r\n';
      if (node.match( /^<?\w[^>]*[^\/]$/ )) {
        indent += tab; // increase indent
      }
    });
    return formatted.substring(1, formatted.length-3);
  };

  return (
    <div>
      <textarea
        className="w-full h-40 p-2 border rounded"
        placeholder="Paste your XML here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={formatXML}
      >
        Format XML
      </button>
      <pre className="mt-4 p-2 bg-gray-100 rounded overflow-auto">
        {output}
      </pre>
    </div>
  );
};

export default XMLFormatter;