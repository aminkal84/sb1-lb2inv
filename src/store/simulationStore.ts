import { create } from 'zustand';
import { SimulationState, SensorData, UnitSystem, Language, PhysicsParams, EnvironmentParams } from '../types/simulation';

const generateSensorData = (
  timestamp: number,
  physics: PhysicsParams,
  environment: EnvironmentParams
): SensorData => {
  const types = ['temperature', 'pressure', 'flow', 'level', 'humidity'] as const;
  const type = types[Math.floor(Math.random() * types.length)];
  
  const baseRanges = {
    temperature: { 
      min: 60 + environment.temperature * 0.5, 
      max: 80 + environment.temperature * 0.5 
    },
    pressure: { 
      min: 90 + environment.pressure * 0.1, 
      max: 110 + environment.pressure * 0.1 
    },
    flow: { 
      min: 40 + physics.acceleration * 0.2, 
      max: 60 + physics.acceleration * 0.2 
    },
    level: { 
      min: 70 - physics.gravity * 0.5, 
      max: 90 - physics.gravity * 0.5 
    },
    humidity: {
      min: environment.humidity * 0.8,
      max: environment.humidity * 1.2
    }
  };

  const range = baseRanges[type];
  const value = range.min + Math.random() * (range.max - range.min);
  
  const noise = Math.sin(timestamp / 1000) * (2 - physics.friction);
  const finalValue = value + noise;

  let status: 'normal' | 'warning' | 'critical' = 'normal';
  if (finalValue > range.max * 1.1) status = 'critical';
  else if (finalValue > range.max) status = 'warning';
  else if (finalValue < range.min * 0.9) status = 'critical';
  else if (finalValue < range.min) status = 'warning';

  return {
    id: `sensor-${Math.random().toString(36).substr(2, 9)}`,
    timestamp,
    value: finalValue,
    type,
    status
  };
};

const useSimulationStore = create<SimulationState & {
  startSimulation: () => void;
  stopSimulation: () => void;
  setSpeed: (speed: number) => void;
  updateData: () => void;
  setAnomalyThreshold: (threshold: number) => void;
  setUnitSystem: (system: UnitSystem) => void;
  setLanguage: (lang: Language) => void;
  setPhysics: (params: PhysicsParams) => void;
  setEnvironment: (params: EnvironmentParams) => void;
  setSelectedScenario: (scenarioId: string | null) => void;
}>((set, get) => ({
  isRunning: false,
  speed: 1,
  data: [],
  anomalyThreshold: 0.8,
  unitSystem: 'metric',
  language: 'en',
  physics: {
    acceleration: 9.81,
    friction: 0.5,
    gravity: 9.81
  },
  environment: {
    temperature: 25,
    humidity: 50,
    pressure: 1013
  },
  selectedScenario: null,
  suggestions: [],

  startSimulation: () => {
    set({ isRunning: true });
    const interval = setInterval(() => {
      if (get().isRunning) {
        get().updateData();
      }
    }, 1000 / get().speed);
    return () => clearInterval(interval);
  },

  stopSimulation: () => set({ isRunning: false }),
  setSpeed: (speed) => set({ speed }),
  updateData: () => {
    const { data, physics, environment } = get();
    const newData = [...data];
    const timestamp = Date.now();
    
    newData.push(generateSensorData(timestamp, physics, environment));
    
    if (newData.length > 100) {
      newData.shift();
    }

    set({ data: newData });
  },

  setAnomalyThreshold: (threshold) => set({ anomalyThreshold: threshold }),
  setUnitSystem: (system) => set({ unitSystem: system }),
  setLanguage: (lang) => set({ language: lang }),
  setPhysics: (params) => set({ physics: params }),
  setEnvironment: (params) => set({ environment: params }),
  setSelectedScenario: (scenarioId) => set({ selectedScenario: scenarioId })
}));

export default useSimulationStore;