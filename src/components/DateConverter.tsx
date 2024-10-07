import React, { useState } from 'react';

const DateConverter: React.FC = () => {
  const [inputDate, setInputDate] = useState('');
  const [outputDate, setOutputDate] = useState('');

  const convertDate = () => {
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) {
      setOutputDate('Invalid date');
    } else {
      setOutputDate(date.toUTCString());
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="datetime-local"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={convertDate}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Convert to UTC
      </button>
      {outputDate && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p className="font-semibold">UTC Date:</p>
          <p>{outputDate}</p>
        </div>
      )}
    </div>
  );
};

export default DateConverter;