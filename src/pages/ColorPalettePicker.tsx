import React, { useState } from 'react';
import { Palette, Loader2, Copy, Check } from 'lucide-react';
import { generateText } from '../services/geminiService';

export default function ColorPalettePicker() {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [colors, setColors] = useState<{hex: string, name: string}[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsProcessing(true);
    setColors([]);
    
    try {
      const response = await generateText(`Create a brand color palette of exactly 5 colors based on this description: "${prompt}". Return ONLY a valid JSON array of objects, where each object has "hex" (string starting with #) and "name" (string describing the color). No markdown, no extra text.`);
      
      // Clean up the response to parse JSON
      let jsonStr = response.trim();
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.substring(3, jsonStr.length - 3).trim();
      }
      
      const parsedColors = JSON.parse(jsonStr);
      setColors(parsedColors);
    } catch (err) {
      console.error(err);
      alert("Failed to generate palette. Please try a different prompt.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyColor = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Color Palette Picker</h1>
        <p className="text-gray-500">Create brand color systems from text descriptions.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Describe your brand or mood</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., A modern eco-friendly coffee shop, earthy tones with a pop of vibrant green..."
            className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-32 text-base mb-4"
          />
          <button
            onClick={handleGenerate}
            disabled={!prompt || isProcessing}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-lg shadow-sm"
          >
            {isProcessing ? <><Loader2 className="w-6 h-6 animate-spin" /> Generating...</> : <><Palette className="w-6 h-6" /> Create Palette</>}
          </button>
        </div>

        {colors.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Color System</h3>
            <div className="flex flex-col sm:flex-row h-auto sm:h-48 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              {colors.map((color, index) => (
                <div 
                  key={index} 
                  className="flex-1 flex flex-col group cursor-pointer h-32 sm:h-full"
                  onClick={() => copyColor(color.hex, index)}
                >
                  <div 
                    className="flex-grow transition-transform group-hover:scale-105 origin-bottom"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="bg-white p-3 text-center border-t border-gray-100 relative z-10">
                    <p className="font-mono text-sm font-bold text-gray-900">{color.hex}</p>
                    <p className="text-xs text-gray-500 truncate px-1" title={color.name}>{color.name}</p>
                    
                    <div className={`absolute inset-0 bg-indigo-600 text-white flex items-center justify-center transition-opacity ${copiedIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                      <Check className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">Click any color to copy its HEX code</p>
          </div>
        )}
      </div>
    </div>
  );
}
