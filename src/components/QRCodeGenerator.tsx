import React, { useState } from 'react';

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const generateQRCode = () => {
    const encodedText = encodeURIComponent(text);
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedText}`);
  };

  return (
    <div>
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={generateQRCode}
      >
        Generate QR Code
      </button>
      {qrCode && (
        <div className="mt-4">
          <img src={qrCode} alt="Generated QR Code" />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;