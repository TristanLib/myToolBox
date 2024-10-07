import React, { useState } from 'react';
import { Cpu, FileText, Code, QrCode, FileCode, GitBranch, Wrench, Calendar, Calculator, DollarSign, Clock, Waves } from 'lucide-react';
import IPAddress from './components/IPAddress';
import PDFConverter from './components/PDFConverter';
import JSONFormatter from './components/JSONFormatter';
import QRCodeGenerator from './components/QRCodeGenerator';
import XMLFormatter from './components/XMLFormatter';
import MermaidPreview from './components/MermaidPreview';
import ColorPicker from './components/ColorPicker';
import DateConverter from './components/DateConverter';
import UnitConverter from './components/UnitConverter';
import CurrencyConverter from './components/CurrencyConverter';
import TimeZoneConverter from './components/TimeZoneConverter';
import TideTable from './components/TideTable';

const tools = [
  { name: 'IP Address & Map', icon: Cpu, component: IPAddress },
  { name: 'PDF Converter', icon: FileText, component: PDFConverter },
  { name: 'JSON Formatter', icon: Code, component: JSONFormatter },
  { name: 'QR Code Generator', icon: QrCode, component: QRCodeGenerator },
  { name: 'XML Formatter', icon: FileCode, component: XMLFormatter },
  { name: 'Mermaid Preview', icon: GitBranch, component: MermaidPreview },
  { name: 'Color Picker', icon: Wrench, component: ColorPicker },
  { name: 'Date Converter', icon: Calendar, component: DateConverter },
  { name: 'Unit Converter', icon: Calculator, component: UnitConverter },
  { name: 'Currency Converter', icon: DollarSign, component: CurrencyConverter },
  { name: 'Time Zone Converter', icon: Clock, component: TimeZoneConverter },
  { name: 'Tide Table', icon: Waves, component: TideTable },
];

function App() {
  const [activeTool, setActiveTool] = useState(tools[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Online Toolbox</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-64 bg-white shadow-lg rounded-lg mb-6 md:mb-0 md:mr-6">
            <nav className="p-4">
              {tools.map((tool) => (
                <button
                  key={tool.name}
                  onClick={() => setActiveTool(tool)}
                  className={`flex items-center px-4 py-2 text-base leading-6 font-medium rounded-md w-full mb-2 transition-colors duration-150 ease-in-out ${
                    activeTool.name === tool.name
                      ? 'text-white bg-indigo-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <tool.icon className="mr-4 h-6 w-6" />
                  {tool.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex-1">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-600">{activeTool.name}</h2>
              <activeTool.component />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;