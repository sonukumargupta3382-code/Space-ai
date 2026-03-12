import GeneratorLayout from '../components/GeneratorLayout';
import { generateImage } from '../services/geminiService';

export default function PrintGenerator3D() {
  return (
    <GeneratorLayout
      title="3D Print Generator"
      description="Generate 3D printable models from text descriptions."
      actionText="Generate Model"
      placeholder="E.g., A detailed miniature of a medieval castle with turrets and a drawbridge..."
      iconType="image"
      onGenerate={(prompt) => generateImage(`A highly detailed 3D render of a 3D printable model: ${prompt}. Solid gray material, clean studio lighting, isometric view.`)}
    />
  );
}
