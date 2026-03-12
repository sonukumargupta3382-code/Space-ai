import { Link } from 'react-router-dom';
import { Pin, ArrowUpRight, Sparkles } from 'lucide-react';

const tools = [
  {
    id: 'editor',
    title: 'AI Image Editor',
    description: 'Upload and edit any image',
    path: '/editor',
    buttonText: 'Edit',
    image: 'https://picsum.photos/seed/editor/600/450',
    color: 'bg-indigo-500',
  },
  {
    id: 'generator',
    title: 'AI Image Generator',
    description: 'Generate images with AI',
    path: '/generator',
    buttonText: 'Generate',
    image: 'https://picsum.photos/seed/aigenerator/600/450',
    color: 'bg-purple-500',
    hideSplit: true,
  },
  {
    id: 'styles',
    title: 'AI Photo Styles',
    description: 'Transform photos with AI-powered style effects',
    path: '/styles',
    buttonText: 'Style',
    image: 'https://picsum.photos/seed/photostyle/600/450',
    color: 'bg-emerald-400',
  },
  {
    id: 'vectorizer',
    title: 'Image Vectorizer',
    description: 'Turn any image into SVG',
    path: '/vectorizer',
    buttonText: 'Vectorize',
    image: 'https://picsum.photos/seed/vectorart/600/450',
    color: 'bg-orange-400',
  },
  {
    id: 'upscaler',
    title: 'Image Upscaler',
    description: 'Keep quality while enlarging any image',
    path: '/upscaler',
    buttonText: 'Upscale',
    image: 'https://picsum.photos/seed/upscaler/600/450',
    color: 'bg-blue-400',
  },
  {
    id: 'remove-bg',
    title: 'Background Remover',
    description: 'Make any image transparent',
    path: '/remove-bg',
    buttonText: 'Remove BG',
    image: 'https://picsum.photos/seed/transparentbg/600/450',
    color: 'bg-indigo-400',
  },
  {
    id: 'people-remover',
    title: 'People Remover',
    description: 'Automatically remove people from background',
    path: '/people-remover',
    buttonText: 'Remove',
    image: 'https://picsum.photos/seed/peopleremover/600/450',
    color: 'bg-red-400',
  },
  {
    id: 'logo-creator',
    title: 'AI Logo Creator',
    description: 'Generate professional logos quickly',
    path: '/logo-creator',
    buttonText: 'Generate',
    image: 'https://picsum.photos/seed/logocreator/600/450',
    color: 'bg-yellow-400',
    hideSplit: true,
  },
  {
    id: 'quote-generator',
    title: 'AI Quote Generator',
    description: 'Turn any quote into artwork',
    path: '/quote-generator',
    buttonText: 'Generated',
    image: 'https://picsum.photos/seed/quotegenerator/600/450',
    color: 'bg-green-400',
    hideSplit: true,
  },
  {
    id: 'collage-maker',
    title: 'AI Collage Maker',
    description: 'Create beautiful collages from your photos',
    path: '/collage-maker',
    buttonText: 'Create',
    image: 'https://picsum.photos/seed/collagemaker/600/450',
    color: 'bg-pink-400',
  },
  {
    id: 'design-reviewer',
    title: 'AI Design Reviewer',
    description: 'Let Space AI review your designs',
    path: '/design-reviewer',
    buttonText: 'Re view',
    image: 'https://picsum.photos/seed/designreviewer/600/450',
    color: 'bg-teal-400',
    hideSplit: true,
  },
  {
    id: 'music-generator',
    title: 'AI Music Generator',
    description: 'Generate music with AI',
    path: '/music-generator',
    buttonText: 'Generate',
    image: 'https://picsum.photos/seed/musicgenerator/600/450',
    color: 'bg-cyan-400',
    hideSplit: true,
  },
  {
    id: 'video-generator',
    title: 'AI Video Generator',
    description: 'Describe the scene and atmosphere you want, and let AI create a unique video for you',
    path: '/video-generator',
    buttonText: 'Generate',
    image: 'https://picsum.photos/seed/videogenerator/600/450',
    color: 'bg-fuchsia-400',
    hideSplit: true,
  },
  {
    id: 'sound-effect-generator',
    title: 'AI Sound Effect Generator',
    description: 'Generate sound effects with AI',
    path: '/sound-effect-generator',
    buttonText: 'Generate',
    image: 'https://picsum.photos/seed/soundeffectgenerator/600/450',
    color: 'bg-rose-400',
    hideSplit: true,
  },
  {
    id: 'speech-generator',
    title: 'AI Speech Generator',
    description: 'Convert text to natural speech',
    path: '/speech-generator',
    buttonText: 'Generate',
    image: 'https://picsum.photos/seed/speechgenerator/600/450',
    color: 'bg-blue-500',
    hideSplit: true,
  },
  {
    id: 'watermark-remover',
    title: 'AI Watermark Remover',
    description: 'Remove watermarks in seconds',
    path: '/watermark-remover',
    buttonText: 'Remove',
    image: 'https://picsum.photos/seed/watermarkremover/600/450',
    color: 'bg-red-500',
  },
  {
    id: 'file-converter',
    title: 'File Converter',
    description: 'Convert images to any file format',
    path: '/file-converter',
    buttonText: 'Convert',
    image: 'https://picsum.photos/seed/fileconverter/600/450',
    color: 'bg-green-500',
    hideSplit: true,
  },
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    description: 'Compress images while maintaining quality',
    path: '/image-compressor',
    buttonText: 'Compress',
    image: 'https://picsum.photos/seed/imagecompressor/600/450',
    color: 'bg-yellow-500',
    hideSplit: true,
  },
  {
    id: 'large-file-transfer',
    title: 'Large File Transfer',
    description: 'Send any large file to anyone',
    path: '/large-file-transfer',
    buttonText: 'Send',
    image: 'https://picsum.photos/seed/largefiletransfer/600/450',
    color: 'bg-indigo-600',
    hideSplit: true,
  },
  {
    id: 'studio-designer',
    title: 'Studio Designer',
    description: 'Go Beyond Ordinary with every design',
    path: '/studio-designer',
    buttonText: 'Design',
    image: 'https://picsum.photos/seed/studiodesigner/600/450',
    color: 'bg-purple-600',
    hideSplit: true,
  },
  {
    id: '3d-model-viewer',
    title: '3D Model Viewer',
    description: 'View and validate 3D models',
    path: '/3d-model-viewer',
    buttonText: 'VIEW',
    image: 'https://picsum.photos/seed/3dmodelviewer/600/450',
    color: 'bg-gray-600',
    hideSplit: true,
  },
  {
    id: '3d-print-generator',
    title: '3D Print Generator',
    description: 'Generate 3D printable models from text descriptions',
    path: '/3d-print-generator',
    buttonText: 'Generate',
    image: 'https://picsum.photos/seed/3dprintgenerator/600/450',
    color: 'bg-orange-500',
    hideSplit: true,
  },
  {
    id: 'doodle-pet-generator',
    title: 'Doodle Pet Generator',
    description: 'Transform pet photos into adorable doodles',
    path: '/doodle-pet-generator',
    buttonText: 'Generate',
    image: 'https://picsum.photos/seed/doodlepetgenerator/600/450',
    color: 'bg-pink-500',
  },
  {
    id: '3d-model-generator',
    title: '3D Model Generator',
    description: 'Generate 3D models from text descriptions and images',
    path: '/3d-model-generator',
    buttonText: 'Generate',
    image: 'https://picsum.photos/seed/3dmodelgenerator/600/450',
    color: 'bg-teal-500',
  },
  {
    id: 'color-palette-picker',
    title: 'Color Palette Picker',
    description: 'Create brand color systems',
    path: '/color-palette-picker',
    buttonText: 'Create',
    image: 'https://picsum.photos/seed/colorpalettepicker/600/450',
    color: 'bg-cyan-500',
    hideSplit: true,
  },
  {
    id: 'coloring-page-maker',
    title: 'AI Coloring Page Maker',
    description: 'Transform photos into coloring pages',
    path: '/coloring-page-maker',
    buttonText: 'Generate',
    image: 'https://picsum.photos/seed/coloringpagemaker/600/450',
    color: 'bg-emerald-500',
  },
  {
    id: 'wedding-invite-generator',
    title: 'Wedding Invite Generator',
    description: 'Create beautiful wedding invitations with AI',
    path: '/wedding-invite-generator',
    buttonText: 'Generate',
    image: 'https://picsum.photos/seed/weddinginvitegenerator/600/450',
    color: 'bg-rose-500',
    hideSplit: true,
  },
  {
    id: 'etsy-coach',
    title: 'Etsy Coach',
    description: 'Get AI-powered insights to improve your Etsy shop',
    path: '/etsy-coach',
    buttonText: 'Analyze',
    image: 'https://picsum.photos/seed/etsycoach/600/450',
    color: 'bg-amber-500',
    hideSplit: true,
  },
  {
    id: 'toon-family-builder',
    title: 'ToonFamily Builder',
    description: 'Create a custom cartoon of your family with AI',
    path: '/toon-family-builder',
    buttonText: 'Build',
    image: 'https://picsum.photos/seed/toonfamilybuilder/600/450',
    color: 'bg-fuchsia-500',
  },
];

export default function Home() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pb-24">
      {tools.map((tool) => (
        <div key={tool.id} className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col">
          <div className={`aspect-[4/3] w-full ${tool.color} relative overflow-hidden`}>
            <img 
              src={tool.image} 
              alt={tool.title} 
              className="w-full h-full object-cover opacity-80 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
            
            {!tool.hideSplit && (
              <>
                {/* Split line */}
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 h-full border-r border-white/50 shadow-[1px_0_5px_rgba(0,0,0,0.1)]"></div>
                </div>
                {/* Before/After Badges */}
                <div className="absolute top-2 left-2 bg-white/30 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] text-white font-medium tracking-wide">
                  Before
                </div>
                <div className="absolute top-2 right-2 bg-white/30 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] text-white font-medium tracking-wide">
                  After
                </div>
              </>
            )}
            {tool.hideSplit && (
              <div className="absolute top-2 left-2 flex gap-1">
                <Sparkles className="w-4 h-4 text-white opacity-80" />
              </div>
            )}
          </div>
          
          <div className="p-3 sm:p-4 flex flex-col flex-grow">
            <h3 className="text-[15px] sm:text-[17px] font-bold text-gray-900 mb-1">{tool.title}</h3>
            <p className="text-[13px] text-gray-500 flex-grow leading-snug">{tool.description}</p>
            
            <div className="flex items-center justify-between mt-3 sm:mt-4">
              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                <Pin className="w-4 h-4" />
              </button>
              <Link 
                to={tool.path}
                className="flex items-center gap-1 bg-[#5b36e5] hover:bg-[#4a2bc4] text-white px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors"
              >
                {tool.buttonText}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
