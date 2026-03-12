import GeneratorLayout from '../components/GeneratorLayout';
import { generateImage } from '../services/geminiService';

export default function StudioDesigner() {
  return (
    <GeneratorLayout
      title="Studio Designer"
      description="Go Beyond Ordinary with every design."
      actionText="Design Now"
      placeholder="E.g., A sleek modern poster for a tech conference featuring abstract geometric shapes..."
      iconType="image"
      onGenerate={(prompt) => generateImage(`Create a professional graphic design: ${prompt}. High quality, modern aesthetic.`)}
    />
  );
}
