import GeneratorLayout from '../components/GeneratorLayout';
import { generateSpeech } from '../services/geminiService';

export default function SpeechGenerator() {
  return (
    <GeneratorLayout
      title="AI Speech Generator"
      description="Convert text to natural speech."
      actionText="Generate Speech"
      placeholder="E.g., Welcome to our new application! We are so excited to have you here."
      iconType="music"
      onGenerate={generateSpeech}
    />
  );
}
