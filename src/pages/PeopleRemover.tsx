import ToolLayout from '../components/ToolLayout';
import { editImage } from '../services/geminiService';

export default function PeopleRemover() {
  return (
    <ToolLayout
      title="People Remover"
      description="Automatically remove people from background."
      actionText="Remove People"
      requiresPrompt={false}
      onProcess={(image, mimeType) => editImage(image, mimeType, "Remove all people from this image, keeping the background intact.")}
    />
  );
}
