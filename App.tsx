
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Insights from './components/Insights';
import Settings from './components/Settings';
import LogSymptomModal from './components/LogSymptomModal';
import Onboarding from './components/Onboarding';
import { CycleData, SymptomLog } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'insights' | 'settings'>('dashboard');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    return !localStorage.getItem('luna_onboarding_complete');
  });
  
  // Persistent State
  const [cycle, setCycle] = useState<CycleData>(() => {
    const saved = localStorage.getItem('luna_cycle');
    return saved ? JSON.parse(saved) : {
      lastPeriodDate: new Date().toISOString().split('T')[0],
      cycleLength: 28,
      periodDuration: 5
    };
  });

  const [logs, setLogs] = useState<SymptomLog[]>(() => {
    const saved = localStorage.getItem('luna_logs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('luna_cycle', JSON.stringify(cycle));
  }, [cycle]);

  useEffect(() => {
    localStorage.setItem('luna_logs', JSON.stringify(logs));
  }, [logs]);

  const handleOnboardingComplete = (data: CycleData) => {
    setCycle(data);
    localStorage.setItem('luna_onboarding_complete', 'true');
    setShowOnboarding(false);
  };

  const addLog = (newLog: SymptomLog) => {
    setLogs(prev => [...prev, newLog]);
    setIsLogModalOpen(false);
  };

  const updateCycle = (newData: Partial<CycleData>) => {
    setCycle(prev => ({ ...prev, ...newData }));
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#fffafb] pb-24 max-w-xl mx-auto shadow-xl relative">
      {/* Header Area */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-sm">
                <div className="w-4 h-4 bg-white rounded-full opacity-30 blur-[2px]"></div>
            </div>
            <span className="font-serif text-xl font-bold text-rose-900 italic">LunaFlow</span>
        </div>
        <button onClick={() => setActiveTab('settings')} className="text-rose-400 p-2 rounded-full hover:bg-rose-50 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="transition-all duration-300">
        {activeTab === 'dashboard' && <Dashboard cycle={cycle} onLogClick={() => setIsLogModalOpen(true)} />}
        {activeTab === 'insights' && <Insights cycle={cycle} logs={logs} />}
        {activeTab === 'settings' && <Settings cycle={cycle} updateCycle={updateCycle} />}
      </main>

      {/* Tab Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl bg-white/80 backdrop-blur-md border-t border-rose-100 px-6 py-4 flex justify-around items-center z-40">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-rose-500' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">Today</span>
        </button>

        <button 
          onClick={() => setActiveTab('insights')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'insights' ? 'text-rose-500' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">Insights</span>
        </button>

        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? 'text-rose-500' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">Plan</span>
        </button>
      </nav>

      {/* Modals */}
      {isLogModalOpen && (
        <LogSymptomModal onClose={() => setIsLogModalOpen(false)} onSave={addLog} />
      )}
    </div>
  );
};

export default App;
