import React, { useState } from 'react';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

const TimeZoneConverter: React.FC = () => {
  const [fromTime, setFromTime] = useState<string>('');
  const [fromZone, setFromZone] = useState<string>('UTC');
  const [toZone, setToZone] = useState<string>('America/New_York');
  const [convertedTime, setConvertedTime] = useState<string>('');

  const timeZones = [
    'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London',
    'Europe/Paris', 'Asia/Tokyo', 'Australia/Sydney'
  ];

  const handleConvert = () => {
    if (!fromTime) return;

    const utcDate = zonedTimeToUtc(fromTime, fromZone);
    const convertedDate = utcToZonedTime(utcDate, toZone);
    setConvertedTime(format(convertedDate, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: toZone }));
  };

  return (
    <div className="space-y-4">
      <input
        type="datetime-local"
        value={fromTime}
        onChange={(e) => setFromTime(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <div className="flex space-x-2">
        <select
          value={fromZone}
          onChange={(e) => setFromZone(e.target.value)}
          className="w-1/2 p-2 border rounded"
        >
          {timeZones.map(zone => (
            <option key={zone} value={zone}>{zone}</option>
          ))}
        </select>
        <select
          value={toZone}
          onChange={(e) => setToZone(e.target.value)}
          className="w-1/2 p-2 border rounded"
        >
          {timeZones.map(zone => (
            <option key={zone} value={zone}>{zone}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleConvert}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Convert
      </button>
      {convertedTime && (
        <div className="text-lg">
          Converted Time: {convertedTime}
        </div>
      )}
    </div>
  );
};

export default TimeZoneConverter;