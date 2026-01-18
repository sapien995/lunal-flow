
import React, { useState } from 'react';
import { CycleData } from '../types';

interface OnboardingProps {
  onComplete: (data: CycleData) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [tempData, setTempData] = useState<CycleData>({
    lastPeriodDate: new Date().toISOString().split('T')[0],
    cycleLength: 28,
    periodDuration: 5,
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const steps = [
    // Step 0: Welcome
    <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-24 h-24 bg-rose-100 rounded-full mx-auto flex items-center justify-center mb-4">
        <div className="w-12 h-12 bg-rose-500 rounded-full animate-pulse opacity-80"></div>
      </div>
      <h1 className="font-serif text-4xl text-rose-900 italic">Hello, Beautiful</h1>
      <p className="text-rose-700 leading-relaxed px-4">
        Welcome to LunaFlow. Let's start a journey of understanding your body's natural rhythms together.
      </p>
    </div>,

    // Step 1: Last Period
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="font-serif text-2xl text-rose-900 font-bold">When did your last period start?</h2>
      <p className="text-rose-600 text-sm">Tracking the first day of your last cycle helps us predict your next one accurately.</p>
      <input
        type="date"
        value={tempData.lastPeriodDate}
        onChange={(e) => setTempData({ ...tempData, lastPeriodDate: e.target.value })}
        className="w-full p-5 rounded-3xl bg-white border-2 border-rose-100 text-rose-900 text-lg focus:border-rose-400 focus:outline-none transition-all shadow-sm"
      />
    </div>,

    // Step 2: Cycle Length
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="font-serif text-2xl text-rose-900 font-bold">How long is your typical cycle?</h2>
      <p className="text-rose-600 text-sm">The average is 28 days, but anything from 21 to 35 is common.</p>
      <div className="bg-white p-8 rounded-3xl border-2 border-rose-100 shadow-sm text-center">
        <span className="text-5xl font-bold text-rose-500">{tempData.cycleLength}</span>
        <span className="text-rose-400 font-medium ml-2 uppercase text-xs tracking-widest">days</span>
        <input
          type="range"
          min="20"
          max="45"
          value={tempData.cycleLength}
          onChange={(e) => setTempData({ ...tempData, cycleLength: parseInt(e.target.value) })}
          className="w-full mt-8 accent-rose-500 h-2 bg-rose-50 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>,

    // Step 3: Period Duration
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="font-serif text-2xl text-rose-900 font-bold">And how many days does your period last?</h2>
      <p className="text-rose-600 text-sm">Most women bleed for 3 to 7 days.</p>
      <div className="bg-white p-8 rounded-3xl border-2 border-rose-100 shadow-sm text-center">
        <span className="text-5xl font-bold text-rose-500">{tempData.periodDuration}</span>
        <span className="text-rose-400 font-medium ml-2 uppercase text-xs tracking-widest">days</span>
        <input
          type="range"
          min="2"
          max="10"
          value={tempData.periodDuration}
          onChange={(e) => setTempData({ ...tempData, periodDuration: parseInt(e.target.value) })}
          className="w-full mt-8 accent-rose-500 h-2 bg-rose-50 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>,

    // Step 4: Ready
    <div className="text-center space-y-6 animate-in fade-in zoom-in duration-700">
      <div className="flex justify-center -space-x-4 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`w-12 h-12 rounded-full border-4 border-white shadow-md ${['bg-rose-200', 'bg-rose-300', 'bg-rose-400', 'bg-rose-500'][i-1]}`}></div>
        ))}
      </div>
      <h2 className="font-serif text-3xl text-rose-900 italic">You're all set!</h2>
      <p className="text-rose-700 leading-relaxed">
        We've personalized your calendar. LunaFlow will now guide you through the 4 phases of your cycle with tailored health advice.
      </p>
    </div>,
  ];

  return (
    <div className="fixed inset-0 bg-[#fffafb] z-[60] flex flex-col items-center justify-between p-8 pb-12 overflow-hidden">
      {/* Progress bar */}
      <div className="w-full max-w-xs flex gap-2 h-1 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-full transition-all duration-500 ${
              i <= step ? 'bg-rose-400' : 'bg-rose-100'
            }`}
          />
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center w-full max-w-sm">
        {steps[step]}
      </div>

      <div className="w-full max-w-sm flex gap-4">
        {step > 0 && step < steps.length - 1 && (
          <button
            onClick={prevStep}
            className="flex-1 py-4 px-8 rounded-2xl font-bold text-rose-400 hover:bg-rose-50 transition-all border border-rose-100"
          >
            Back
          </button>
        )}
        
        {step < steps.length - 1 ? (
          <button
            onClick={nextStep}
            className="flex-[2] bg-rose-500 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all transform active:scale-95"
          >
            {step === 0 ? "Get Started" : "Continue"}
          </button>
        ) : (
          <button
            onClick={() => onComplete(tempData)}
            className="w-full bg-rose-500 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all transform active:scale-95"
          >
            Enter Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
