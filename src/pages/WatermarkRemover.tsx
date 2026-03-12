import ToolLayout from '../components/ToolLayout';
import { editImage } from '../services/geminiService';

export default function WatermarkRemover() {
  return (
    <ToolLayout
      title="AI Watermark Remover"
      description="Remove watermarks in seconds."
      actionText="Remove Watermark"
      requiresPrompt={false}
      onProcess={(image, mimeType) => editImage(image, mimeType, "Remove all watermarks, text, and logos from this image. Keep the background clean and natural.")}
    />
  );
}
