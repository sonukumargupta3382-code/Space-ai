import MultiImageToolLayout from '../components/MultiImageToolLayout';
import { editMultipleImages } from '../services/geminiService';

export default function ImageEditor() {
  return (
    <MultiImageToolLayout
      title="AI Image Editor"
      description="Upload up to 5 images and describe how you want to edit or combine them."
      actionText="Edit Image"
      promptPlaceholder="E.g., Combine these images, or change the background of this image to a sunset..."
      maxImages={5}
      onProcess={(images, prompt) => editMultipleImages(images, prompt)}
    />
  );
}
