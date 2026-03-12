import ToolLayout from '../components/ToolLayout';
import { editImage } from '../services/geminiService';

export default function ImageUpscaler() {
  return (
    <ToolLayout
      title="Image Upscaler"
      description="Enhance the quality and sharpness of your images."
      actionText="Upscale Image"
      requiresPrompt={false}
      onProcess={(image, mimeType) => editImage(image, mimeType, "Upscale and enhance the quality of this image. Make it sharper, more detailed, and remove any compression artifacts or blurriness. Maintain the original subject perfectly.")}
    />
  );
}
