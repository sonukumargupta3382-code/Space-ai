import GeneratorLayout from '../components/GeneratorLayout';
import { generateImage } from '../services/geminiService';

export default function WeddingInviteGenerator() {
  return (
    <GeneratorLayout
      title="Wedding Invite Generator"
      description="Create beautiful wedding invitations with AI."
      actionText="Generate Invite"
      placeholder="E.g., A rustic floral wedding invitation for Sarah and John, elegant script font, gold accents..."
      iconType="image"
      onGenerate={(prompt) => generateImage(`Create a beautiful, high-quality wedding invitation design: ${prompt}. Elegant typography, professional layout.`)}
    />
  );
}
