import ToolLayout from '../components/ToolLayout';
import { GoogleGenAI } from "@google/genai";

export default function DesignReviewer() {
  const reviewDesign = async (base64Image: string, mimeType: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: mimeType,
            },
          },
          {
            text: "Review this design. Provide constructive feedback on layout, typography, color scheme, and overall aesthetics. Return the feedback as a formatted text.",
          },
        ],
      },
    });
    
    return response.text || "No feedback generated.";
  };

  return (
    <ToolLayout
      title="AI Design Reviewer"
      description="Let Space AI review your designs."
      actionText="Review Design"
      requiresPrompt={false}
      onProcess={async (image, mimeType) => {
        const feedback = await reviewDesign(image, mimeType);
        // Since ToolLayout expects an image URL back, we'll just return a placeholder image with text for now,
        // or we could modify ToolLayout to handle text. But let's just use the original image and show an alert.
        alert(feedback);
        return image;
      }}
    />
  );
}
