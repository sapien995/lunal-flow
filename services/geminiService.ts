
import { GoogleGenAI, Type } from "@google/genai";
import { CyclePhase, SymptomLog } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getHealthInsights = async (phase: CyclePhase, symptoms: SymptomLog[]) => {
  const recentSymptoms = symptoms.slice(-3).map(s => 
    `Date: ${s.date}, Flow: ${s.flow}, Pain: ${s.pain}/5, Moods: ${s.mood.join(', ')}`
  ).join('\n');

  const prompt = `
    Context: You are a friendly, professional women's health educator.
    The user is currently in their ${phase} phase.
    Recent symptom logs:
    ${recentSymptoms || 'No symptoms logged yet.'}

    Provide personalized health advice covering:
    1. What's happening in their body right now.
    2. Recommended nutrition (specific foods).
    3. Exercise tips for this phase.
    4. A comforting 'Daily Wisdom' snippet.

    Keep it concise, supportive, and evidence-based. Include a disclaimer that you are an AI, not a doctor.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the health database. Please check back later for personalized insights.";
  }
};

export const askHealthQuestion = async (question: string) => {
    const prompt = `As a female health educator, answer this question clearly and empathetically: "${question}". Focus on menstrual health, reproductive wellness, and general wellbeing.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        return "I'm sorry, I couldn't process that question right now.";
    }
};
