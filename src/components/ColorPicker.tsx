import React, { useState } from 'react';

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState('#000000');

  return (
    <div className="space-y-4">
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full h-12 cursor-pointer"
      />
      <div className="flex items-center space-x-2">
        <div
          className="w-12 h-12 rounded-md shadow-md"
          style={{ backgroundColor: color }}
        ></div>
        <span className="text-lg font-semibold">{color}</span>
      </div>
    </div>
  );
};

export default ColorPicker;