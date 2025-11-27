import React, { useState, useEffect } from 'react';
import { translations } from './constants';
import { LangType } from './types';
import Navbar from './components/Navbar';
import BookingForm from './components/BookingForm';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Modals from './components/Modals';
import StickyBanner from './components/StickyBanner';
import ThankYouPage from './components/ThankYouPage';
import {
  HeroSection,
  PromiseSection,
  WhenToReplaceSection,
  ExpertBrakeSection,
  WhyImportantSection,
  TrustSignalsSection,
  AboutSection,
  ParallaxSection,
  ServiceAreaSection
} from './components/MarketingSections';

const App: React.FC = () => {
  const [lang, setLang] = useState<LangType>('en');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Detect browser language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') as LangType;
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
      setLang(savedLang);
    } else {
      const userLang = navigator.language.split('-')[0];
      setLang(userLang === 'es' ? 'es' : 'en');
    }

    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLangChange = (newLang: LangType) => {
    setLang(newLang);
    localStorage.setItem('preferredLanguage', newLang);
    document.documentElement.lang = newLang;
  };

  // Helper to get translation
  const t = (key: keyof typeof translations.en) => {
    return translations[lang][key] || translations.en[key];
  };

  if (currentPath === '/thank-you') {
    return <ThankYouPage lang={lang} />;
  }

  return (
    <div className="relative z-10 text-slate-300">
       {/* Background Elements */}
      <div className="background-wrapper">
         <div className="background-top-gradient"></div>
         <div className="background-glow-1"></div>
         <div className="background-glow-2"></div>
         <div className="background-glow-center"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <Navbar lang={lang} setLang={handleLangChange} t={t} />

        <HeroSection t={t} />

        <PromiseSection t={t} />

        <BookingForm t={t} lang={lang} />

        <Testimonials t={t} lang={lang} />

        <WhenToReplaceSection t={t} />

        <ExpertBrakeSection t={t} />

        <WhyImportantSection t={t} />

        <TrustSignalsSection t={t} />

        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent my-16 max-w-8xl mx-auto"></div>

        <AboutSection t={t} />

        <ParallaxSection t={t} />

        <ServiceAreaSection t={t} />

        <FAQ t={t} />

        <Footer t={t} />
      </div>

      <Modals t={t} />

      <StickyBanner t={t} />
    </div>
  );
};

export default App;