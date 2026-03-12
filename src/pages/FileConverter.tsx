import React, { useState, useRef } from 'react';
import { Upload, FileType, Loader2, Download, RefreshCw } from 'lucide-react';

export default function FileConverter() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState('image/png');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const img = new Image();
      img.src = selectedImage;
      await new Promise(resolve => { img.onload = resolve; });
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Fill white background for transparent to JPG conversion
        if (targetFormat === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        setResultImage(canvas.toDataURL(targetFormat));
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
        <h1 className="text-3xl font-bold text-gray-900 mb-3">File Converter</h1>
        <p className="text-gray-500">Convert images to any file format instantly.</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-3">Target Format</label>
              <div className="flex gap-3">
                {['image/png', 'image/jpeg', 'image/webp'].map(format => (
                  <button
                    key={format}
                    onClick={() => setTargetFormat(format)}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${targetFormat === format ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {format.split('/')[1].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4">
              <button
                onClick={handleConvert}
                disabled={!selectedImage || isProcessing}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-lg shadow-sm"
              >
                {isProcessing ? <><Loader2 className="w-6 h-6 animate-spin" /> Converting...</> : <><FileType className="w-6 h-6" /> Convert</>}
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
                  <a 
                    href={resultImage} 
                    download={`converted.${targetFormat.split('/')[1]}`}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-gray-900 px-5 py-2.5 rounded-xl shadow-md font-medium text-sm flex items-center gap-2 hover:bg-white transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </a>
                </>
              ) : isProcessing ? (
                <div className="flex flex-col items-center text-gray-400">
                  <Loader2 className="w-12 h-12 animate-spin mb-4 text-indigo-500" />
                  <p className="text-base font-medium">Converting...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <FileType className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-base">Converted file will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
