export type UnitSystem = 'metric' | 'imperial';
export type Language = 'en' | 'fa';

export interface PhysicsParams {
  acceleration: number;
  friction: number;
  gravity: number;
}

export interface EnvironmentParams {
  temperature: number;
  humidity: number;
  pressure: number;
}

export interface SensorData {
  id: string;
  timestamp: number;
  value: number;
  type: 'temperature' | 'pressure' | 'flow' | 'level' | 'humidity';
  status: 'normal' | 'warning' | 'critical';
}

export interface Scenario {
  id: string;
  name: { en: string; fa: string };
  description: { en: string; fa: string };
  impact: 'low' | 'medium' | 'high';
  category: 'mechanical' | 'environmental' | 'operational';
}

export interface Suggestion {
  id: string;
  title: { en: string; fa: string };
  description: { en: string; fa: string };
  priority: 'low' | 'medium' | 'high';
  actions: Array<{ en: string; fa: string }>;
}

export interface SimulationState {
  isRunning: boolean;
  speed: number;
  data: SensorData[];
  anomalyThreshold: number;
  unitSystem: UnitSystem;
  language: Language;
  physics: PhysicsParams;
  environment: EnvironmentParams;
  selectedScenario: string | null;
  suggestions: Suggestion[];
}