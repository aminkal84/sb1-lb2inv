import React from 'react';
import { AlertTriangle, ThermometerSun, Settings2 } from 'lucide-react';
import useSimulationStore from '../store/simulationStore';
import { translations } from '../i18n/translations';
import { scenarios } from '../data/scenarios';
import { Scenario } from '../types/simulation';

const getImpactColor = (impact: Scenario['impact']) => {
  switch (impact) {
    case 'low': return 'text-yellow-500';
    case 'medium': return 'text-orange-500';
    case 'high': return 'text-red-500';
    default: return 'text-gray-500';
  }
};

const getCategoryIcon = (category: Scenario['category']) => {
  switch (category) {
    case 'mechanical': return <Settings2 className="w-5 h-5" />;
    case 'environmental': return <ThermometerSun className="w-5 h-5" />;
    case 'operational': return <AlertTriangle className="w-5 h-5" />;
    default: return null;
  }
};

const AIScenarioAnalysis: React.FC = () => {
  const { language, selectedScenario, setSelectedScenario } = useSimulationStore();
  const t = translations[language];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{t.scenarios.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setSelectedScenario(scenario.id)}
            className={`p-4 rounded-lg border transition-all ${
              selectedScenario === scenario.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className={getImpactColor(scenario.impact)}>
                  {getCategoryIcon(scenario.category)}
                </span>
                <h3 className="font-medium">
                  {scenario.name[language]}
                </h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-right">
              {scenario.description[language]}
            </p>
          </button>
        ))}
      </div>

      {selectedScenario && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">{t.scenarios.suggestions}</h3>
          <ul className="space-y-2">
            {t.scenarios.actions[selectedScenario]?.map((action, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIScenarioAnalysis;