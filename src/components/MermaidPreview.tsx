import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidPreview: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [svg, setSvg] = useState<string>('');
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
  }, []);

  const renderMermaid = async () => {
    if (!input) return;

    try {
      const { svg } = await mermaid.render('mermaid-diagram', input);
      setSvg(svg);
    } catch (error) {
      console.error('Error rendering Mermaid diagram:', error);
      setSvg('<p>Invalid Mermaid syntax</p>');
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-40 p-2 border rounded"
        placeholder="Enter Mermaid diagram code"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={renderMermaid}
      >
        Preview Mermaid
      </button>
      <div 
        ref={mermaidRef}
        className="mt-4 p-2 bg-white rounded border"
        dangerouslySetInnerHTML={{ __html: svg }}
      ></div>
    </div>
  );
};

export default MermaidPreview;