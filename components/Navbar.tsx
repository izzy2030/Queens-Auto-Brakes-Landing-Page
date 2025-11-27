import React from 'react';
import { LangType } from '../types';
import { translations } from '../constants';

interface NavbarProps {
  lang: LangType;
  setLang: (lang: LangType) => void;
  t: (key: keyof typeof translations.en) => string;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, t }) => {
  return (
    <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-8xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="https://queensautoserviceselgin.com/wp-content/uploads/2024/11/Logo-White.webp" 
            alt="Queens Auto Services Logo" 
            className="h-10 w-auto" 
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null; 
              (e.target as HTMLImageElement).src='https://placehold.co/200x50/0f172a/ffffff?text=Queens+Auto';
            }} 
          />
        </div>
        
        {/* Language Switcher and Book Now Button */}
        <div className="flex items-center gap-4">
            <div className="text-sm">
                <button 
                  onClick={() => setLang('en')} 
                  className={`transition-colors hover:text-cyan-400 ${lang === 'en' ? 'font-bold text-white' : 'text-slate-400'}`}
                >
                  Eng
                </button>
                <span className="text-slate-500 mx-1">|</span>
                <button 
                  onClick={() => setLang('es')} 
                  className={`transition-colors hover:text-cyan-400 ${lang === 'es' ? 'font-bold text-white' : 'text-slate-400'}`}
                >
                  Spa
                </button>
            </div>
            <a href="#book" className="hidden sm:inline-block glass-card px-4 py-2 rounded-lg text-white hover:bg-white/10 transition">
              {t('bookNow')}
            </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;