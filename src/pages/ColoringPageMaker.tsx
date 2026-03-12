import ToolLayout from '../components/ToolLayout';
import { editImage } from '../services/geminiService';

export default function ColoringPageMaker() {
  return (
    <ToolLayout
      title="AI Coloring Page Maker"
      description="Transform photos into coloring pages."
      actionText="Generate Coloring Page"
      requiresPrompt={false}
      onProcess={(image, mimeType) => editImage(image, mimeType, "Transform this photo into a black and white line art coloring page. Clean, distinct outlines, no shading, pure white background.")}
    />
  );
}
