import ToolLayout from '../components/ToolLayout';
import { editImage } from '../services/geminiService';

export default function PhotoStyles() {
  return (
    <ToolLayout
      title="AI Photo Styles"
      description="Transform your photos with AI-powered style effects."
      actionText="Apply Style"
      showStyleSelector={true}
      requiresPrompt={false}
      onProcess={(image, mimeType, prompt) => editImage(image, mimeType, prompt || "Apply style")}
    />
  );
}
