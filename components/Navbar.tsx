import React from 'react';
import { LangType } from '../types';
import { translations } from '../constants';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  lang: LangType;
  setLang: (lang: LangType) => void;
  t: (key: keyof typeof translations.en) => string;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, t }) => {
  const { theme, setTheme } = useTheme();

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
                  className={`transition-colors hover:text-cyan-400 ${lang === 'en' ? 'font-bold text-foreground' : 'text-foreground/80'}`}
                >
                  Eng
                </button>
                <span className="text-foreground/50 mx-1">|</span>
                <button 
                  onClick={() => setLang('es')} 
                  className={`transition-colors hover:text-cyan-400 ${lang === 'es' ? 'font-bold text-foreground' : 'text-foreground/80'}`}
                >
                  Spa
                </button>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full transition-colors hover:bg-secondary"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-foreground" /> : <Moon className="h-5 w-5 text-foreground" />}
            </button>
            <a href="#book" className="hidden sm:inline-block px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
              {t('bookNow')}
            </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;