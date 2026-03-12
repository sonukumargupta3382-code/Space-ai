import ToolLayout from '../components/ToolLayout';
import { editImage } from '../services/geminiService';

export default function DoodlePetGenerator() {
  return (
    <ToolLayout
      title="Doodle Pet Generator"
      description="Transform pet photos into adorable doodles."
      actionText="Generate Doodle"
      requiresPrompt={false}
      onProcess={(image, mimeType) => editImage(image, mimeType, "Transform this pet photo into an adorable, cute, hand-drawn doodle style illustration. Keep it simple and charming.")}
    />
  );
}
