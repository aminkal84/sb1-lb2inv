import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Gauge } from 'lucide-react';
import useSimulationStore from '../store/simulationStore';
import { translations } from '../i18n/translations';
import ControlPanel from './ControlPanel';
import ParameterControls from './ParameterControls';
import AIScenarioAnalysis from './AIScenarioAnalysis';

const Dashboard: React.FC = () => {
  const { data, language, unitSystem } = useSimulationStore();
  const t = translations[language];

  const convertTemperature = (value: number) => {
    return unitSystem === 'imperial' ? (value * 9/5) + 32 : value;
  };

  const convertPressure = (value: number) => {
    return unitSystem === 'imperial' ? value * 0.145038 : value;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.brand}</h1>
          <p className="text-gray-600 mt-2">{t.subtitle}</p>
        </header>

        <ControlPanel />
        <ParameterControls />
        <AIScenarioAnalysis />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t.environment.temperature}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.filter(d => d.type === 'temperature')}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()} 
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                  formatter={(value: number) => [
                    `${convertTemperature(value).toFixed(2)}${unitSystem === 'imperial' ? '°F' : '°C'}`,
                    t.environment.temperature
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563eb" 
                  dot={false}
                  name={t.environment.temperature}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t.environment.pressure}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.filter(d => d.type === 'pressure')}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()} 
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                  formatter={(value: number) => [
                    `${convertPressure(value).toFixed(2)}${unitSystem === 'imperial' ? ' PSI' : ' hPa'}`,
                    t.environment.pressure
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#dc2626" 
                  dot={false}
                  name={t.environment.pressure}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t.equipment.health}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Pump A', 'Compressor B', 'Valve C', 'Tank D'].map((equipment) => (
              <div key={equipment} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{equipment}</span>
                  <Gauge size={24} className="text-blue-500" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: `${85 + Math.random() * 15}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {(85 + Math.random() * 15).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;