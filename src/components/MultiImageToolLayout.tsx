import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2, Download, RefreshCw, Sparkles, X } from 'lucide-react';

interface MultiImageToolLayoutProps {
  title: string;
  description: string;
  actionText: string;
  onProcess: (images: {base64: string, mimeType: string}[], prompt: string) => Promise<string>;
  promptPlaceholder?: string;
  maxImages?: number;
}

export default function MultiImageToolLayout({ 
  title, 
  description, 
  actionText, 
  onProcess,
  promptPlaceholder = "Describe what you want to do with these images...",
  maxImages = 2
}: MultiImageToolLayoutProps) {
  const [selectedImages, setSelectedImages] = useState<{base64: string, mimeType: string}[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length > 0) {
      const remainingSlots = maxImages - selectedImages.length;
      const filesToProcess = files.slice(0, remainingSlots);

      filesToProcess.forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImages(prev => [...prev, {
            base64: reader.result as string,
            mimeType: file.type
          }]);
        };
        reader.readAsDataURL(file);
      });
      
      setResultImage(null);
      setError(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (selectedImages.length === 0) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await onProcess(selectedImages, prompt);
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images ({selectedImages.length}/{maxImages})
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {selectedImages.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                    <img src={img.base64} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-white/90 backdrop-blur p-1.5 rounded-full text-gray-600 hover:text-red-600 shadow-sm transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {selectedImages.length < maxImages && (
                  <div 
                    className="border-2 border-dashed border-gray-300 hover:border-indigo-400 bg-gray-50 rounded-xl flex flex-col items-center justify-center aspect-square cursor-pointer transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-6 h-6 text-indigo-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600">Add Image</span>
                  </div>
                )}
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/jpeg, image/png, image/webp" 
                multiple
                className="hidden" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={promptPlaceholder}
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-32 text-base"
              />
            </div>

            <div className="mt-auto pt-4">
              <button
                onClick={handleProcess}
                disabled={selectedImages.length === 0 || isProcessing || !prompt}
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
                  <p className="text-base text-center px-4">Result will appear here.<br/>Upload multiple images to combine or edit them.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
