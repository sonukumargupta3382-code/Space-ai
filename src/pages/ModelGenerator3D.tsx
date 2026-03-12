import ToolLayout from '../components/ToolLayout';
import { editImage } from '../services/geminiService';

export default function ModelGenerator3D() {
  return (
    <ToolLayout
      title="3D Model Generator"
      description="Generate 3D models from text descriptions and images."
      actionText="Generate 3D Render"
      requiresPrompt={true}
      promptPlaceholder="E.g., Turn this into a stylized low-poly 3D game asset..."
      onProcess={(image, mimeType, prompt) => editImage(image, mimeType, `Generate a high-quality 3D model render based on this image. ${prompt}. Professional studio lighting, clean background.`)}
    />
  );
}
