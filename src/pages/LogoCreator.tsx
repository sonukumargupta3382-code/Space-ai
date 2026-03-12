import GeneratorLayout from '../components/GeneratorLayout';
import { generateImage } from '../services/geminiService';

export default function LogoCreator() {
  return (
    <GeneratorLayout
      title="AI Logo Creator"
      description="Generate professional logos quickly."
      actionText="Generate Logo"
      placeholder="E.g., A minimalist logo for a coffee shop named 'Brew', using warm colors..."
      iconType="image"
      onGenerate={(prompt) => generateImage(`Create a professional logo design: ${prompt}. Clean background, high quality.`)}
    />
  );
}
