import React, { useState, useRef, useEffect } from 'react';
import { Upload, Box, RefreshCw } from 'lucide-react';

export default function ModelViewer3D() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Dynamically load model-viewer script if not present
    if (!document.querySelector('script[src*="model-viewer"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedFile(url);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">3D Model Viewer</h1>
        <p className="text-gray-500">View and validate 3D models (.glb, .gltf).</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-8">
        {!selectedFile ? (
          <div 
            className="border-2 border-dashed border-gray-300 hover:border-indigo-400 bg-gray-50 rounded-2xl flex flex-col items-center justify-center py-32 cursor-pointer transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium text-gray-700">Click to upload 3D Model</p>
            <p className="text-sm text-gray-500 mt-1">Supports .glb and .gltf files</p>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".glb,.gltf" className="hidden" />
          </div>
        ) : (
          <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
            {/* @ts-ignore - model-viewer is a web component */}
            <model-viewer
              src={selectedFile}
              camera-controls
              auto-rotate
              ar
              shadow-intensity="1"
              style={{ width: '100%', height: '100%' }}
            ></model-viewer>
            
            <button 
              onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full text-gray-600 hover:text-red-600 shadow-sm transition-colors z-10"
              title="Upload new model"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
