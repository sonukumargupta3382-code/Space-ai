import MultiImageToolLayout from '../components/MultiImageToolLayout';
import { editMultipleImages } from '../services/geminiService';

export default function CollageMaker() {
  return (
    <MultiImageToolLayout
      title="AI Collage Maker"
      description="Select multiple photos to create a beautiful collage."
      actionText="Create Collage"
      promptPlaceholder="E.g., Create a beautiful vintage style collage with these photos..."
      maxImages={6}
      onProcess={(images, prompt) => editMultipleImages(images, prompt || "Create a beautiful artistic collage using all these images together in one cohesive layout.")}
    />
  );
}
