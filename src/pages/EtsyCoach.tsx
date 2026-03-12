import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export default function EtsyCoach() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setMimeType(file.type);
        setResultText(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!prompt && !selectedImage) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const parts: any[] = [];
      
      if (selectedImage) {
        parts.push({
          inlineData: {
            data: selectedImage.split(',')[1],
            mimeType: mimeType,
          },
        });
      }
      
      parts.push({
        text: `Act as an expert Etsy Coach. Analyze this product listing (title, description, and/or image). Provide actionable insights to improve SEO, conversion rate, and overall appeal. \n\nListing Details: ${prompt}`
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: { parts },
      });
      
      setResultText(response.text || "No insights generated.");
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Etsy Coach</h1>
        <p className="text-gray-500">Get AI-powered insights to improve your Etsy shop.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Input */}
          <div className="space-y-6 flex flex-col">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image (Optional)</label>
              <div 
                className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-colors ${selectedImage ? 'border-indigo-300 bg-indigo-50/30' : 'border-gray-300 hover:border-indigo-400 bg-gray-50'} h-48 relative cursor-pointer`}
                onClick={() => !selectedImage && fileInputRef.current?.click()}
              >
                {selectedImage ? (
                  <>
                    <img src={selectedImage} alt="Product" className="w-full h-full object-contain" />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                        setResultText(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full text-gray-600 hover:text-red-600 shadow-sm transition-colors"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Upload listing image</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Listing Title & Description</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Paste your Etsy listing title, tags, and description here..."
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-48 text-base"
              />
            </div>

            <div className="mt-auto pt-4">
              <button
                onClick={handleAnalyze}
                disabled={(!prompt && !selectedImage) || isProcessing}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-lg shadow-sm"
              >
                {isProcessing ? <><Loader2 className="w-6 h-6 animate-spin" /> Analyzing...</> : <><FileText className="w-6 h-6" /> Analyze Listing</>}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Coach Insights</label>
            <div className="border border-gray-200 rounded-2xl bg-gray-50 flex flex-col overflow-hidden relative flex-grow min-h-[400px]">
              {resultText ? (
                <div className="p-6 overflow-y-auto h-full prose prose-indigo max-w-none text-sm md:text-base">
                  {/* Simple text rendering, ideally we'd use react-markdown here but keeping it simple */}
                  {resultText.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                </div>
              ) : isProcessing ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Loader2 className="w-12 h-12 animate-spin mb-4 text-indigo-500" />
                  <p className="text-base font-medium">Analyzing your listing...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                  <FileText className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-base">Upload an image or paste your listing details to get expert advice.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
