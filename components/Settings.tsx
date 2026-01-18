
import React from 'react';
import { CycleData } from '../types';

interface SettingsProps {
  cycle: CycleData;
  updateCycle: (newData: Partial<CycleData>) => void;
}

const Settings: React.FC<SettingsProps> = ({ cycle, updateCycle }) => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-serif text-rose-900 font-bold mb-6">Cycle Preferences</h2>
      
      <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-rose-800 mb-2">Last Period Start Date</label>
          <input
            type="date"
            value={cycle.lastPeriodDate}
            onChange={(e) => updateCycle({ lastPeriodDate: e.target.value })}
            className="w-full p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-rose-800 mb-2">Average Cycle Length ({cycle.cycleLength} days)</label>
          <input
            type="range"
            min="20"
            max="45"
            value={cycle.cycleLength}
            onChange={(e) => updateCycle({ cycleLength: parseInt(e.target.value) })}
            className="w-full accent-rose-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-rose-800 mb-2">Period Duration ({cycle.periodDuration} days)</label>
          <input
            type="range"
            min="2"
            max="10"
            value={cycle.periodDuration}
            onChange={(e) => updateCycle({ periodDuration: parseInt(e.target.value) })}
            className="w-full accent-rose-500"
          />
        </div>
      </div>

      <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100">
        <h4 className="font-bold text-rose-900 mb-2 italic">Privacy First</h4>
        <p className="text-rose-700 text-xs">
          Your data is stored locally on this device. We never sell your personal health information.
        </p>
      </div>
    </div>
  );
};

export default Settings;
