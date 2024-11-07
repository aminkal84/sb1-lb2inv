import React from 'react';
import useSimulationStore from '../store/simulationStore';
import { translations } from '../i18n/translations';

const ParameterControls: React.FC = () => {
  const { 
    physics, 
    setPhysics, 
    environment, 
    setEnvironment,
    language 
  } = useSimulationStore();

  const t = translations[language];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">{t.physics.acceleration}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.physics.acceleration}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={physics.acceleration}
                onChange={(e) => setPhysics({ ...physics, acceleration: Number(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">{physics.acceleration} m/s²</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.physics.friction}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={physics.friction}
                onChange={(e) => setPhysics({ ...physics, friction: Number(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">{physics.friction}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.physics.gravity}
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={physics.gravity}
                onChange={(e) => setPhysics({ ...physics, gravity: Number(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">{physics.gravity} m/s²</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">{t.environment.temperature}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.environment.temperature}
              </label>
              <input
                type="range"
                min="-20"
                max="50"
                value={environment.temperature}
                onChange={(e) => setEnvironment({ ...environment, temperature: Number(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">{environment.temperature}°C</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.environment.humidity}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={environment.humidity}
                onChange={(e) => setEnvironment({ ...environment, humidity: Number(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">{environment.humidity}%</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.environment.pressure}
              </label>
              <input
                type="range"
                min="900"
                max="1100"
                value={environment.pressure}
                onChange={(e) => setEnvironment({ ...environment, pressure: Number(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">{environment.pressure} hPa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParameterControls;