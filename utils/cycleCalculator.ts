
import { CycleData, CyclePhase } from '../types';

export const calculateNextPeriod = (lastDate: string, length: number) => {
  const date = new Date(lastDate);
  date.setDate(date.getDate() + length);
  return date.toISOString().split('T')[0];
};

export const getDaysRemaining = (nextDate: string) => {
  const today = new Date();
  const next = new Date(nextDate);
  const diffTime = next.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getCurrentPhase = (lastDate: string, length: number, duration: number): CyclePhase => {
  const today = new Date();
  const start = new Date(lastDate);
  const diffDays = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) % length;

  if (diffDays < duration) return 'Menstrual';
  if (diffDays < 11) return 'Follicular';
  if (diffDays < 16) return 'Ovulatory';
  return 'Luteal';
};

export const getPhaseDescription = (phase: CyclePhase) => {
    switch(phase) {
        case 'Menstrual': return "Your body is shedding the uterine lining. Rest and hydration are key.";
        case 'Follicular': return "Estrogen levels rise. You might feel more energetic and creative.";
        case 'Ovulatory': return "The most fertile time. Libido and confidence are often high.";
        case 'Luteal': return "Progesterone peaks. You might experience PMS or desire quiet time.";
    }
};
