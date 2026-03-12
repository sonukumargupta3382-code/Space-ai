import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, ArrowLeft, Download } from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    // Check if running as a PWA/TWA (installed) or custom WebView User-Agent
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isCustomWebView = navigator.userAgent.includes('SpaceAI-App');
    setIsApp(isStandalone || isCustomWebView);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col relative">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            <div className="flex items-center gap-2">
              {!isHomePage ? (
                <button 
                  onClick={() => navigate('/')}
                  className="text-gray-600 hover:text-gray-900 p-1 flex items-center justify-center gap-2 font-medium"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              ) : (
                <Link to="/" className="flex items-center gap-1.5">
                  <span className="font-bold text-[22px] tracking-tight flex items-center">
                    Space<Sparkles className="w-5 h-5 ml-0.5" />AI
                  </span>
                </Link>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {!isApp && (
                <button 
                  onClick={() => alert('Download APK functionality will go here!')}
                  className="flex items-center gap-1.5 text-sm font-medium bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download App</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 w-full">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-gray-100 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-gray-500 tracking-wide uppercase">
            Developer By <span className="text-indigo-600 font-bold">KKG</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
