import React, { useState, useRef } from 'react';
import { Upload, Send, Loader2, Link as LinkIcon, Copy, Check } from 'lucide-react';

export default function LargeFileTransfer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setDownloadLink(null);
      setUploadProgress(0);
    }
  };

  const handleTransfer = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }
    
    // Generate a mock download link
    const mockId = Math.random().toString(36).substring(2, 10);
    setDownloadLink(`https://studio.ai/transfer/${mockId}`);
    setIsUploading(false);
  };

  const copyToClipboard = () => {
    if (downloadLink) {
      navigator.clipboard.writeText(downloadLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Large File Transfer</h1>
        <p className="text-gray-500">Send any large file securely up to 2GB.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10">
        {!downloadLink ? (
          <div className="space-y-8">
            <div 
              className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-colors ${selectedFile ? 'border-indigo-300 bg-indigo-50/30' : 'border-gray-300 hover:border-indigo-400 bg-gray-50'} py-20 cursor-pointer relative`}
              onClick={() => !isUploading && fileInputRef.current?.click()}
            >
              {selectedFile ? (
                <div className="text-center z-10">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 truncate max-w-xs px-4">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{formatBytes(selectedFile.size)}</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8" />
                  </div>
                  <p className="text-lg font-medium text-gray-700">Click to select a file</p>
                  <p className="text-sm text-gray-500 mt-1">Any file type up to 2GB</p>
                </div>
              )}
              
              {isUploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                  <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-indigo-600 transition-all duration-200 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-indigo-600 font-medium">{uploadProgress}% Uploaded</p>
                </div>
              )}
              
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            </div>

            <button
              onClick={handleTransfer}
              disabled={!selectedFile || isUploading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-lg shadow-sm"
            >
              {isUploading ? <><Loader2 className="w-6 h-6 animate-spin" /> Uploading...</> : 'Get Transfer Link'}
            </button>
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to send!</h2>
            <p className="text-gray-500 mb-8">Your file is uploaded and ready to be shared.</p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3 overflow-hidden">
                <LinkIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-700 font-medium truncate">{downloadLink}</span>
              </div>
              <button 
                onClick={copyToClipboard}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors flex-shrink-0"
              >
                {copied ? <><Check className="w-4 h-4 text-green-600" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            
            <button
              onClick={() => {
                setSelectedFile(null);
                setDownloadLink(null);
              }}
              className="text-indigo-600 font-medium hover:text-indigo-700"
            >
              Send another file
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
