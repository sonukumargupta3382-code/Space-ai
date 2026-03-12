import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
            
            {/* Right side items removed as requested */}
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
