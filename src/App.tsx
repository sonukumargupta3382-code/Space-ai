import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ImageEditor from './pages/ImageEditor';
import ImageGenerator from './pages/ImageGenerator';
import PhotoStyles from './pages/PhotoStyles';
import ImageVectorizer from './pages/ImageVectorizer';
import ImageUpscaler from './pages/ImageUpscaler';
import BackgroundRemover from './pages/BackgroundRemover';
import PeopleRemover from './pages/PeopleRemover';
import LogoCreator from './pages/LogoCreator';
import QuoteGenerator from './pages/QuoteGenerator';
import CollageMaker from './pages/CollageMaker';
import DesignReviewer from './pages/DesignReviewer';
import MusicGenerator from './pages/MusicGenerator';
import VideoGenerator from './pages/VideoGenerator';
import SoundEffectGenerator from './pages/SoundEffectGenerator';
import SpeechGenerator from './pages/SpeechGenerator';
import WatermarkRemover from './pages/WatermarkRemover';
import FileConverter from './pages/FileConverter';
import ImageCompressor from './pages/ImageCompressor';
import LargeFileTransfer from './pages/LargeFileTransfer';
import StudioDesigner from './pages/StudioDesigner';
import ModelViewer3D from './pages/ModelViewer3D';
import PrintGenerator3D from './pages/PrintGenerator3D';
import DoodlePetGenerator from './pages/DoodlePetGenerator';
import ModelGenerator3D from './pages/ModelGenerator3D';
import ColorPalettePicker from './pages/ColorPalettePicker';
import ColoringPageMaker from './pages/ColoringPageMaker';
import WeddingInviteGenerator from './pages/WeddingInviteGenerator';
import EtsyCoach from './pages/EtsyCoach';
import ToonFamilyBuilder from './pages/ToonFamilyBuilder';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="editor" element={<ImageEditor />} />
          <Route path="generator" element={<ImageGenerator />} />
          <Route path="styles" element={<PhotoStyles />} />
          <Route path="vectorizer" element={<ImageVectorizer />} />
          <Route path="upscaler" element={<ImageUpscaler />} />
          <Route path="remove-bg" element={<BackgroundRemover />} />
          <Route path="people-remover" element={<PeopleRemover />} />
          <Route path="logo-creator" element={<LogoCreator />} />
          <Route path="quote-generator" element={<QuoteGenerator />} />
          <Route path="collage-maker" element={<CollageMaker />} />
          <Route path="design-reviewer" element={<DesignReviewer />} />
          <Route path="music-generator" element={<MusicGenerator />} />
          <Route path="video-generator" element={<VideoGenerator />} />
          <Route path="sound-effect-generator" element={<SoundEffectGenerator />} />
          <Route path="speech-generator" element={<SpeechGenerator />} />
          <Route path="watermark-remover" element={<WatermarkRemover />} />
          <Route path="file-converter" element={<FileConverter />} />
          <Route path="image-compressor" element={<ImageCompressor />} />
          <Route path="large-file-transfer" element={<LargeFileTransfer />} />
          <Route path="studio-designer" element={<StudioDesigner />} />
          <Route path="3d-model-viewer" element={<ModelViewer3D />} />
          <Route path="3d-print-generator" element={<PrintGenerator3D />} />
          <Route path="doodle-pet-generator" element={<DoodlePetGenerator />} />
          <Route path="3d-model-generator" element={<ModelGenerator3D />} />
          <Route path="color-palette-picker" element={<ColorPalettePicker />} />
          <Route path="coloring-page-maker" element={<ColoringPageMaker />} />
          <Route path="wedding-invite-generator" element={<WeddingInviteGenerator />} />
          <Route path="etsy-coach" element={<EtsyCoach />} />
          <Route path="toon-family-builder" element={<ToonFamilyBuilder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
