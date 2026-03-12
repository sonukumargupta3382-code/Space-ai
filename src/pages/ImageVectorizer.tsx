import ToolLayout from '../components/ToolLayout';
import { editImage } from '../services/geminiService';

export default function ImageVectorizer() {
  return (
    <ToolLayout
      title="Image Vectorizer"
      description="Turn any image into a clean, flat vector-style illustration."
      actionText="Vectorize Image"
      requiresPrompt={false}
      onProcess={(image, mimeType) => editImage(image, mimeType, "Convert this image into a flat vector SVG illustration style, with clean lines, solid colors, and simplified shapes. Make it look like a scalable vector graphic.")}
    />
  );
}
