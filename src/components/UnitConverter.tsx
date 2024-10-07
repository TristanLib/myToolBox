import React, { useState } from 'react';

const UnitConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [result, setResult] = useState('');

  const units = {
    m: 1,
    cm: 0.01,
    mm: 0.001,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.34
  };

  const convert = () => {
    const inputValue = parseFloat(value);
    if (isNaN(inputValue)) {
      setResult('Invalid input');
      return;
    }

    const meterValue = inputValue * units[fromUnit as keyof typeof units];
    const outputValue = meterValue / units[toUnit as keyof typeof units];
    setResult(`${inputValue} ${fromUnit} = ${outputValue.toFixed(4)} ${toUnit}`);
  };

  return (
    <div className="space-y-4">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter value"
      />
      <div className="flex space-x-2">
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="p-2 border rounded"
        >
          {Object.keys(units).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
        <span className="text-2xl">→</span>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="p-2 border rounded"
        >
          {Object.keys(units).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
      <button
        onClick={convert}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Convert
      </button>
      {result && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p className="font-semibold">Result:</p>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;