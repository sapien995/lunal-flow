
import React from 'react';
import { CycleData, CyclePhase } from '../types';
import { getDaysRemaining, calculateNextPeriod, getCurrentPhase, getPhaseDescription } from '../utils/cycleCalculator';

interface DashboardProps {
  cycle: CycleData;
  onLogClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ cycle, onLogClick }) => {
  const nextPeriod = calculateNextPeriod(cycle.lastPeriodDate, cycle.cycleLength);
  const daysLeft = getDaysRemaining(nextPeriod);
  const phase = getCurrentPhase(cycle.lastPeriodDate, cycle.cycleLength, cycle.periodDuration);
  
  // Progress calculation for the circle
  const today = new Date();
  const start = new Date(cycle.lastPeriodDate);
  const currentDayInCycle = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) % cycle.cycleLength;
  const progressPercent = (currentDayInCycle / cycle.cycleLength) * 100;

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <div className="text-center">
        <h1 className="font-serif text-3xl text-rose-800 italic">Welcome back, Luna</h1>
        <p className="text-rose-400 font-medium">Your body, your rhythm.</p>
      </div>

      {/* Cycle Progress Ring */}
      <div className="relative w-72 h-72 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="144"
            cy="144"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-rose-100"
          />
          <circle
            cx="144"
            cy="144"
            r="120"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - progressPercent / 100)}
            strokeLinecap="round"
            className="text-rose-400 transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-rose-400 text-lg font-semibold uppercase tracking-widest">{phase}</span>
          <span className="text-5xl font-bold text-rose-900 my-2">{daysLeft > 0 ? daysLeft : 0}</span>
          <span className="text-rose-500 font-medium">days until period</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 w-full max-w-md">
        <h3 className="font-bold text-rose-900 mb-1">{phase} Phase Insights</h3>
        <p className="text-rose-700 text-sm leading-relaxed">
          {getPhaseDescription(phase)}
        </p>
      </div>

      <button
        onClick={onLogClick}
        className="bg-rose-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all transform hover:scale-105 active:scale-95"
      >
        Log Daily Symptoms
      </button>
    </div>
  );
};

export default Dashboard;
