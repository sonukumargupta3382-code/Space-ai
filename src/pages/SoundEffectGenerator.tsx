import GeneratorLayout from '../components/GeneratorLayout';
import { GoogleGenAI, Modality } from "@google/genai";

export default function SoundEffectGenerator() {
  const generateSound = async (prompt: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Make a sound effect of: ${prompt}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Zephyr' },
            },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return `data:audio/mp3;base64,${base64Audio}`;
    }
    throw new Error("No sound generated");
  };

  return (
    <GeneratorLayout
      title="AI Sound Effect Generator"
      description="Generate sound effects with AI."
      actionText="Generate Sound"
      placeholder="E.g., A futuristic laser blast..."
      iconType="music"
      onGenerate={generateSound}
    />
  );
}
