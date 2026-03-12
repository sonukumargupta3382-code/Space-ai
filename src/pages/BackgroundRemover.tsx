import ToolLayout from '../components/ToolLayout';
import { editImage } from '../services/geminiService';

export default function BackgroundRemover() {
  return (
    <ToolLayout
      title="Background Remover"
      description="Remove the background from your image, leaving only the main subject."
      actionText="Remove Background"
      requiresPrompt={false}
      onProcess={(image, mimeType) => editImage(image, mimeType, "Remove the background from this image completely. Leave only the main subject on a pure, solid white background. Ensure the edges of the subject are clean and precise.")}
    />
  );
}
