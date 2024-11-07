import React from 'react';
import { Play, Pause, AlertTriangle, Languages } from 'lucide-react';
import useSimulationStore from '../store/simulationStore';
import { translations } from '../i18n/translations';
import { UnitSystem, Language } from '../types/simulation';

const ControlPanel: React.FC = () => {
  const { 
    isRunning, 
    startSimulation, 
    stopSimulation, 
    speed, 
    setSpeed,
    unitSystem,
    setUnitSystem,
    language,
    setLanguage,
    data 
  } = useSimulationStore();

  const t = translations[language];
  const criticalCount = data.filter(d => d.status === 'critical').length;
  const warningCount = data.filter(d => d.status === 'warning').length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={isRunning ? stopSimulation : startSimulation}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            dir={language === 'fa' ? 'rtl' : 'ltr'}
          >
            {isRunning ? (
              <>
                <Pause size={20} />
                <span>{t.controls.stop}</span>
              </>
            ) : (
              <>
                <Play size={20} />
                <span>{t.controls.start}</span>
              </>
            )}
          </button>
          
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">{t.controls.speed}:</label>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="border rounded-md px-2 py-1"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={5}>5x</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-gray-700">{t.controls.units}:</label>
            <select
              value={unitSystem}
              onChange={(e) => setUnitSystem(e.target.value as UnitSystem)}
              className="border rounded-md px-2 py-1"
            >
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>
          </div>

          <button
            onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Languages size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-yellow-500">
            <AlertTriangle size={20} />
            <span>{t.controls.warnings}: {warningCount}</span>
          </div>
          <div className="flex items-center space-x-2 text-red-500">
            <AlertTriangle size={20} />
            <span>{t.controls.critical}: {criticalCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;