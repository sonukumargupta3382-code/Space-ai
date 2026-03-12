import React, { useState, useRef } from 'react';
import { Upload, Minimize2, Loader2, Download, RefreshCw } from 'lucide-react';

export default function ImageCompressor() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.6);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompress = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const img = new Image();
      img.src = selectedImage;
      await new Promise(resolve => { img.onload = resolve; });
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        setResultImage(compressedDataUrl);
        
        // Calculate approximate size of base64 string
        const base64str = compressedDataUrl.split(',')[1];
        const decoded = atob(base64str);
        setCompressedSize(decoded.length);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Image Compressor</h1>
        <p className="text-gray-500">Compress images while maintaining quality.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
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
                    <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-lg text-xs font-medium">
                      {formatBytes(originalSize)}
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-7 h-7" />
                    </div>
                    <p className="text-base font-medium text-gray-700">Click to upload image</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Compression Quality: {Math.round(quality * 100)}%</label>
              <input 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.1" 
                value={quality} 
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Smaller File</span>
                <span>Better Quality</span>
              </div>
            </div>

            <div className="mt-auto pt-4">
              <button
                onClick={handleCompress}
                disabled={!selectedImage || isProcessing}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-lg shadow-sm"
              >
                {isProcessing ? <><Loader2 className="w-6 h-6 animate-spin" /> Compressing...</> : <><Minimize2 className="w-6 h-6" /> Compress</>}
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
            <div className="border border-gray-200 rounded-2xl bg-gray-50 flex flex-col items-center justify-center overflow-hidden aspect-video relative flex-grow">
              {resultImage ? (
                <>
                  <img src={resultImage} alt="Result" className="w-full h-full object-contain" />
                  <div className="absolute top-3 left-3 bg-green-500/90 text-white px-3 py-1 rounded-lg text-xs font-medium backdrop-blur">
                    Saved {Math.round((1 - compressedSize / originalSize) * 100)}%
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-lg text-xs font-medium">
                    {formatBytes(compressedSize)}
                  </div>
                  <a 
                    href={resultImage} 
                    download={`compressed-${Date.now()}.jpg`}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-gray-900 px-5 py-2.5 rounded-xl shadow-md font-medium text-sm flex items-center gap-2 hover:bg-white transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </a>
                </>
              ) : isProcessing ? (
                <div className="flex flex-col items-center text-gray-400">
                  <Loader2 className="w-12 h-12 animate-spin mb-4 text-indigo-500" />
                  <p className="text-base font-medium">Compressing...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <Minimize2 className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-base">Compressed image will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
