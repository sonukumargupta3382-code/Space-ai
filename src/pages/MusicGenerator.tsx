import GeneratorLayout from '../components/GeneratorLayout';
import { GoogleGenAI, Modality } from "@google/genai";

export default function MusicGenerator() {
  const generateMusic = async (prompt: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Sing a song about: ${prompt}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return `data:audio/mp3;base64,${base64Audio}`;
    }
    throw new Error("No music generated");
  };

  return (
    <GeneratorLayout
      title="AI Music Generator"
      description="Generate music with AI."
      actionText="Generate Music"
      placeholder="E.g., A relaxing lo-fi beat for studying..."
      iconType="music"
      onGenerate={generateMusic}
    />
  );
}
