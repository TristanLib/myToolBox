import React, { useState } from 'react';
import axios from 'axios';

const TideTable: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [tides, setTides] = useState<any[]>([]);

  const fetchTides = async () => {
    try {
      // Note: You'll need to sign up for a tide API service and replace this URL
      const response = await axios.get(`https://api.example.com/tides?location=${location}&date=${date}`);
      setTides(response.data.tides);
    } catch (error) {
      console.error('Error fetching tide data:', error);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter location (e.g., 'San Francisco')"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={fetchTides}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Get Tide Information
      </button>
      {tides.length > 0 && (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Time</th>
              <th className="border p-2">Height</th>
              <th className="border p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {tides.map((tide, index) => (
              <tr key={index}>
                <td className="border p-2">{tide.time}</td>
                <td className="border p-2">{tide.height}</td>
                <td className="border p-2">{tide.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TideTable;