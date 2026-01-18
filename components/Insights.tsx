
import React, { useEffect, useState } from 'react';
import { getHealthInsights } from '../services/geminiService';
import { CycleData, CyclePhase, SymptomLog } from '../types';
import { getCurrentPhase } from '../utils/cycleCalculator';

interface InsightsProps {
  cycle: CycleData;
  logs: SymptomLog[];
}

const Insights: React.FC<InsightsProps> = ({ cycle, logs }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const phase = getCurrentPhase(cycle.lastPeriodDate, cycle.cycleLength, cycle.periodDuration);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const data = await getHealthInsights(phase, logs);
      setInsight(data || "Check back soon for insights.");
      setLoading(false);
    };
    fetchInsights();
  }, [phase, logs.length]);

  return (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-br from-rose-400 to-rose-600 p-8 rounded-3xl text-white shadow-xl">
        <h2 className="text-3xl font-serif mb-2 italic">Personalized Care</h2>
        <p className="opacity-90">Deep dive into your cycle patterns and hormones.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
          </div>
          <h3 className="font-bold text-rose-900 text-lg">AI Health Assistant</h3>
        </div>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-rose-50 rounded w-3/4"></div>
            <div className="h-4 bg-rose-50 rounded w-full"></div>
            <div className="h-4 bg-rose-50 rounded w-5/6"></div>
          </div>
        ) : (
          <div className="prose prose-rose max-w-none text-rose-800 text-sm leading-relaxed whitespace-pre-wrap">
            {insight}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100">
            <h4 className="font-bold text-rose-900 mb-2">Nutrition Tips</h4>
            <p className="text-rose-700 text-sm">Focus on magnesium-rich foods like dark chocolate and leafy greens during this phase to support muscle relaxation.</p>
        </div>
        <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100">
            <h4 className="font-bold text-rose-900 mb-2">Movement Guide</h4>
            <p className="text-rose-700 text-sm">Gentle yoga or light walking is perfect right now. Listen to your body's cues for rest.</p>
        </div>
      </div>
    </div>
  );
};

export default Insights;
