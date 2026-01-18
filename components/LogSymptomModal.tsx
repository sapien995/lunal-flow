
import React, { useState } from 'react';
import { SymptomLog } from '../types';

interface LogSymptomModalProps {
  onClose: () => void;
  onSave: (log: SymptomLog) => void;
}

const LogSymptomModal: React.FC<LogSymptomModalProps> = ({ onClose, onSave }) => {
  const [flow, setFlow] = useState<SymptomLog['flow']>('None');
  const [pain, setPain] = useState(0);
  const [energy, setEnergy] = useState(3);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const moods = ['😊 Happy', '😔 Low', '😠 Irritable', '😴 Tired', '✨ Energetic', '🤔 Anxious', '😌 Calm'];

  const toggleMood = (mood: string) => {
    setSelectedMoods(prev => 
      prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
  };

  const handleSave = () => {
    onSave({
      date: new Date().toISOString().split('T')[0],
      flow,
      pain,
      energy,
      mood: selectedMoods,
      notes
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-rose-900">How are you today?</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="space-y-8">
          {/* Flow Selection */}
          <div>
            <label className="block text-sm font-semibold text-rose-800 mb-3">Flow Intensity</label>
            <div className="grid grid-cols-4 gap-2">
              {(['None', 'Light', 'Medium', 'Heavy'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFlow(f)}
                  className={`py-3 rounded-2xl border-2 transition-all ${
                    flow === f ? 'bg-rose-500 text-white border-rose-500' : 'bg-rose-50 border-rose-100 text-rose-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Pain Slider */}
          <div>
            <label className="block text-sm font-semibold text-rose-800 mb-3">Pain Level: {pain}/5</label>
            <input
              type="range"
              min="0"
              max="5"
              value={pain}
              onChange={(e) => setPain(parseInt(e.target.value))}
              className="w-full accent-rose-500"
            />
          </div>

          {/* Mood Selector */}
          <div>
            <label className="block text-sm font-semibold text-rose-800 mb-3">Moods</label>
            <div className="flex flex-wrap gap-2">
              {moods.map(m => (
                <button
                  key={m}
                  onClick={() => toggleMood(m)}
                  className={`px-4 py-2 rounded-full text-sm border-2 transition-all ${
                    selectedMoods.includes(m) ? 'bg-rose-200 border-rose-400 text-rose-900' : 'bg-white border-rose-100 text-rose-700'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Energy Slider */}
          <div>
            <label className="block text-sm font-semibold text-rose-800 mb-3">Energy Level: {energy}/5</label>
            <input
              type="range"
              min="1"
              max="5"
              value={energy}
              onChange={(e) => setEnergy(parseInt(e.target.value))}
              className="w-full accent-rose-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-rose-800 mb-3">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything else you want to track?"
              className="w-full p-4 rounded-2xl bg-rose-50 border border-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-200 h-24"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-rose-600 transition-all"
          >
            Save Daily Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogSymptomModal;
