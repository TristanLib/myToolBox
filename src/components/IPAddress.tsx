import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const IPAddress: React.FC = () => {
  const [ip, setIp] = useState<string>('');
  const [location, setLocation] = useState<{ lat: number; lon: number; city: string; country: string } | null>(null);

  useEffect(() => {
    fetchIP();
  }, []);

  const fetchIP = async () => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      setIp(response.data.ip);
      fetchLocation(response.data.ip);
    } catch (error) {
      console.error('Error fetching IP:', error);
    }
  };

  const fetchLocation = async (ipAddress: string) => {
    try {
      const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
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
      <div className="text-lg font-semibold">Your IP address: {ip}</div>
      {location && (
        <>
          <div className="text-md">Location: {location.city}, {location.country}</div>
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
        </>
      )}
      <button
        onClick={fetchIP}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Refresh IP and Location
      </button>
    </div>
  );
};

export default IPAddress;