import GeneratorLayout from '../components/GeneratorLayout';
import { generateImage } from '../services/geminiService';

export default function QuoteGenerator() {
  return (
    <GeneratorLayout
      title="AI Quote Generator"
      description="Turn any quote into artwork."
      actionText="Generate Artwork"
      placeholder="E.g., 'Be the change you wish to see in the world' - Mahatma Gandhi"
      iconType="image"
      onGenerate={(prompt) => generateImage(`Create a beautiful typography artwork featuring this quote: "${prompt}". High quality, artistic background.`)}
    />
  );
}
