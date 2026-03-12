import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2, Download, RefreshCw, Sparkles } from 'lucide-react';

interface ToolLayoutProps {
  title: string;
  description: string;
  actionText: string;
  onProcess: (image: string, mimeType: string, prompt?: string) => Promise<string>;
  requiresPrompt?: boolean;
  promptPlaceholder?: string;
  showStyleSelector?: boolean;
}

export default function ToolLayout({ 
  title, 
  description, 
  actionText, 
  onProcess,
  requiresPrompt = false,
  promptPlaceholder = "Describe what you want to do...",
  showStyleSelector = false
}: ToolLayoutProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Cyberpunk');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const styles = ['Cyberpunk', 'Anime', 'Watercolor', 'Oil Painting', 'Sketch', '3D Render', 'Vintage'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setMimeType(file.type);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      let finalPrompt = prompt;
      if (showStyleSelector) {
        finalPrompt = `Apply a ${selectedStyle} style to this image. ${prompt}`;
      }
      
      const result = await onProcess(selectedImage, mimeType, finalPrompt);
      setResultImage(result);
    } catch (err: any) {
      setError(err.message || "An error occurred during processing.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
        <p className="text-gray-500">{description}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Input */}
          <div className="space-y-6 flex flex-col">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Image</label>
              <div 
                className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-colors ${selectedImage ? 'border-indigo-300 bg-indigo-50/30' : 'border-gray-300 hover:border-indigo-400 bg-gray-50'} aspect-video relative cursor-pointer`}
                onClick={() => !selectedImage && fileInputRef.current?.click()}
              >
                {selectedImage ? (
                  <>
                    <img src={selectedImage} alt="Original" className="w-full h-full object-contain" />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                        setResultImage(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full text-gray-600 hover:text-red-600 shadow-sm transition-colors"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-7 h-7" />
                    </div>
                    <p className="text-base font-medium text-gray-700">Click to upload image</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/jpeg, image/png, image/webp" 
                  className="hidden" 
                />
              </div>
            </div>

            {requiresPrompt && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={promptPlaceholder}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-32 text-base"
                />
              </div>
            )}

            {showStyleSelector && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Style</label>
                <div className="flex flex-wrap gap-2">
                  {styles.map(style => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedStyle === style ? 'bg-indigo-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-4">
              <button
                onClick={handleProcess}
                disabled={!selectedImage || isProcessing || (requiresPrompt && !prompt && !showStyleSelector)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-lg shadow-sm"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    {actionText}
                  </>
                )}
              </button>
            </div>
            
            {error && (
              <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
                {error}
              </div>
            )}
          </div>

          {/* Right Column: Result */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
            <div className="border border-gray-200 rounded-2xl bg-gray-50 flex flex-col items-center justify-center overflow-hidden aspect-video relative flex-grow">
              {resultImage ? (
                <>
                  <img src={resultImage} alt="Result" className="w-full h-full object-contain" />
                  <a 
                    href={resultImage} 
                    download={`result-${Date.now()}.png`}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-gray-900 px-5 py-2.5 rounded-xl shadow-md font-medium text-sm flex items-center gap-2 hover:bg-white transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </a>
                </>
              ) : isProcessing ? (
                <div className="flex flex-col items-center text-gray-400">
                  <Loader2 className="w-12 h-12 animate-spin mb-4 text-indigo-500" />
                  <p className="text-base font-medium">Applying AI magic...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <ImageIcon className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-base">Result will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
