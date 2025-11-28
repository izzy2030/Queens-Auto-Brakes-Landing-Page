import React, { useState, useEffect } from 'react';
import { translations } from '../constants';

interface StickyBannerProps {
  t: (key: keyof typeof translations.en) => string;
}

const StickyBanner: React.FC<StickyBannerProps> = ({ t }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bookingForm = document.getElementById('book');
      const footer = document.querySelector('footer');

      if (bookingForm && footer) {
        const bookingRect = bookingForm.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();

        const formPassedViewport = bookingRect.bottom < 0;
        const footerInViewport = footerRect.top < window.innerHeight;

        setIsVisible(formPassedViewport && !footerInViewport);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
          }`}
      >
        <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-2xl shadow-2xl w-[900px] max-w-[90vw]">
          <div className="px-8 py-5 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium text-xl">{t('heroCTA')}</h3>
                <p className="text-white/90 text-sm">{t('scarcityLine')}</p>
              </div>
            </div>
            <a
              href="#book"
              className="relative text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 shadow-lg flex-shrink-0 border-beam-btn-v2 overflow-hidden"
            >
              <span className="relative z-10">Claim Offer</span>
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          const bookingForm = document.getElementById('book');
          bookingForm?.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`md:hidden fixed bottom-4 left-4 right-4 z-50 transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
          }`}
      >
        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 px-6 py-4 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-white font-bold text-base truncate">Claim Offer</p>
                <p className="text-white/90 text-xs truncate">{t('scarcityLine')}</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
        </div>
      </button>
    </>
  );
};

export default StickyBanner;
