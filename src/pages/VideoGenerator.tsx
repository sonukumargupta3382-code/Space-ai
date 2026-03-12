import GeneratorLayout from '../components/GeneratorLayout';
import { GoogleGenAI } from "@google/genai";

export default function VideoGenerator() {
  const generateVideo = async (prompt: string): Promise<string> => {
    const win = window as any;
    
    const tryGenerate = async (isRetry = false): Promise<string> => {
      // Check if API key is selected (for Veo models)
      if (win.aistudio && (!await win.aistudio.hasSelectedApiKey() || isRetry)) {
        await win.aistudio.openSelectKey();
        // Assume key is selected after this
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      try {
        let operation = await ai.models.generateVideos({
          model: 'veo-3.1-fast-generate-preview',
          prompt: prompt,
          config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9'
          }
        });

        while (!operation.done) {
          await new Promise(resolve => setTimeout(resolve, 10000));
          operation = await ai.operations.getVideosOperation({operation: operation});
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
          // The video URI needs to be fetched with the API key
          const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
          const response = await fetch(downloadLink, {
            method: 'GET',
            headers: {
              'x-goog-api-key': apiKey || '',
            },
          });
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        }
        throw new Error("No video generated");
      } catch (error: any) {
        const errorMsg = error.message || "";
        const isPermissionError = errorMsg.includes("Requested entity was not found") || 
                                 errorMsg.includes("PERMISSION_DENIED") || 
                                 error.status === 403 || 
                                 error.status === "PERMISSION_DENIED";
                                 
        if (!isRetry && isPermissionError) {
          console.log("Permission error detected, prompting for API key again...");
          return tryGenerate(true);
        }
        throw error;
      }
    };

    return tryGenerate();
  };

  return (
    <GeneratorLayout
      title="AI Video Generator"
      description="Describe the scene and atmosphere you want, and let AI create a unique video for you."
      actionText="Generate Video"
      placeholder="E.g., A neon hologram of a cat driving at top speed..."
      iconType="video"
      onGenerate={generateVideo}
    />
  );
}
