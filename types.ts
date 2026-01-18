
export type CyclePhase = 'Menstrual' | 'Follicular' | 'Ovulatory' | 'Luteal';

export interface SymptomLog {
  date: string;
  flow: 'None' | 'Light' | 'Medium' | 'Heavy';
  pain: number; // 0-5
  mood: string[];
  energy: number; // 0-5
  notes: string;
}

export interface CycleData {
  lastPeriodDate: string;
  cycleLength: number; // Default 28
  periodDuration: number; // Default 5
}

export interface EducationSnippet {
  title: string;
  content: string;
  category: 'Hormones' | 'Nutrition' | 'Exercise' | 'Mental Health';
}
