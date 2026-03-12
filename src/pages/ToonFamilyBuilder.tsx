import ToolLayout from '../components/ToolLayout';
import { editImage } from '../services/geminiService';

export default function ToonFamilyBuilder() {
  return (
    <ToolLayout
      title="ToonFamily Builder"
      description="Create a custom cartoon of your family with AI."
      actionText="Build Cartoon"
      requiresPrompt={true}
      promptPlaceholder="E.g., Make us look like characters from a classic 90s animated movie, vibrant colors..."
      onProcess={(image, mimeType, prompt) => editImage(image, mimeType, `Create a custom cartoon illustration of this family. ${prompt}. High quality, expressive characters, clean background.`)}
    />
  );
}
