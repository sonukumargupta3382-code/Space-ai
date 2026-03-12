import React, { useState } from 'react';
import { Sparkles, Loader2, Download, Image as ImageIcon, Music, Video, FileText } from 'lucide-react';

interface GeneratorLayoutProps {
  title: string;
  description: string;
  actionText: string;
  placeholder: string;
  iconType?: 'image' | 'music' | 'video' | 'text';
  onGenerate: (prompt: string) => Promise<string>;
}

export default function GeneratorLayout({
  title,
  description,
  actionText,
  placeholder,
  iconType = 'image',
  onGenerate
}: GeneratorLayoutProps) {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const res = await onGenerate(prompt);
      setResult(res);
    } catch (err: any) {
      setError(err.message || "An error occurred during generation.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const IconComponent = iconType === 'music' ? Music : iconType === 'video' ? Video : iconType === 'text' ? FileText : ImageIcon;

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
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-2">Describe what you want</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-2xl p-5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-64 text-lg"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleGenerate}
                disabled={isProcessing || !prompt}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-lg shadow-sm"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Generating...
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
            <div className="border border-gray-200 rounded-2xl bg-gray-50 flex flex-col items-center justify-center overflow-hidden aspect-square lg:aspect-auto lg:h-full relative">
              {result ? (
                <>
                  {iconType === 'image' && <img src={result} alt="Generated Result" className="w-full h-full object-cover" />}
                  {iconType === 'music' && <audio src={result} controls className="w-full px-4" />}
                  {iconType === 'video' && <video src={result} controls className="w-full h-full object-cover" />}
                  {iconType === 'text' && <div className="p-6 text-lg text-gray-800 overflow-y-auto w-full h-full">{result}</div>}
                  
                  {iconType !== 'text' && (
                    <a 
                      href={result} 
                      download={`generated-${Date.now()}`}
                      className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-gray-900 px-5 py-2.5 rounded-xl shadow-md font-medium text-sm flex items-center gap-2 hover:bg-white transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </a>
                  )}
                </>
              ) : isProcessing ? (
                <div className="flex flex-col items-center text-gray-400">
                  <Loader2 className="w-12 h-12 animate-spin mb-4 text-indigo-500" />
                  <p className="text-base font-medium">Working on it...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <IconComponent className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-base">Your generated result will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
