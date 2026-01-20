import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePunkLyrics = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write exactly one single verse (4-8 lines) in the style of late 90s and early 2000s American Pop-Punk about ${topic}. 

Influences & Tone: 
- Blink-182 (Simple, punchy rhymes, suburban angst)
- Sum 41 (Aggressive rhythmic delivery, frustration)
- New Found Glory (High-energy melodies, heart-on-sleeve honesty)

Stylistic Rules:
1. Meter & Rhythm: Lines must be short and rhythmic, suitable for fast tempos (160+ BPM).
2. Vocabulary: Use relatable, conversational language. Avoid overly poetic metaphors.
3. Themes: Focus on personal frustration, internal struggle, feeling misunderstood, or "narcissistic collapse." Feel free to add themes of suburban boredom.
4. Format: Output ONLY the lyrics. No intros, no musical cues like [Guitar Riff].`,
      config: {
        systemInstruction: "You are an expert songwriter specializing in late 90s and early 2000s American Pop-Punk. Your goal is to generate exactly one single verse (4-8 lines) per request. Output ONLY the lyrics. No intros, no 'Sure! Here is a verse,' and no musical cues.",
        temperature: 0.8,
      }
    });
    return response.text || "I'm too busy skating to write lyrics right now, mate!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The amps blew out! (API Error)";
  }
};