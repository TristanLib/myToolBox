import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const IPLocationMap: React.FC = () => {
  const [ip, setIp] = useState<string>('');
  const [location, setLocation] = useState<{ lat: number; lon: number; city: string; country: string } | null>(null);

  useEffect(() => {
    axios.get('https://api.ipify.org?format=json')
      .then(response => setIp(response.data.ip))
      .catch(error => console.error('Error fetching IP:', error));
  }, []);

  const fetchLocation = async () => {
    try {
      const response = await axios.get(`https://ipapi.co/${ip}/json/`);
      setLocation({
        lat: response.data.latitude,
        lon: response.data.longitude,
        city: response.data.city,
        country: response.data.country_name
      });
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Enter IP address"
        />
        <button
          onClick={fetchLocation}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Locate
        </button>
      </div>
      {location && (
        <div className="h-64 w-full">
          <MapContainer center={[location.lat, location.lon]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[location.lat, location.lon]}>
              <Popup>
                {location.city}, {location.country}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default IPLocationMap;