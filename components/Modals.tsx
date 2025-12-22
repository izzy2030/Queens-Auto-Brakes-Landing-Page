import React, { useState, useEffect } from 'react';
import { translations } from '../constants';

interface ModalsProps {
  t: (key: keyof typeof translations.en) => string;
}

const Modals: React.FC<ModalsProps> = ({ t }) => {
  const [showExit, setShowExit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    let exitTimer: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      const exitIntentShown = sessionStorage.getItem('exitIntentShown');
      // Trigger when mouse leaves through top of page (intent to close tab/navigate away)
      if (e.clientY <= 0 && !exitIntentShown) {
        exitTimer = setTimeout(() => {
          setShowExit(true);
          sessionStorage.setItem('exitIntentShown', 'true');
        }, 200); // Reduced from 1000ms to 200ms for snappier response
      }
    };

    const handleMouseEnter = () => {
      clearTimeout(exitTimer);
    };

    const handleOpenDetails = () => setShowDetails(true);

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('openDetails', handleOpenDetails);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('openDetails', handleOpenDetails);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <>
      {/* Exit Intent */}
      {showExit && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-fade-in">
          <div className="glass-card rounded-2xl shadow-2xl p-8 text-center max-w-md w-full mx-4 border border-slate-700 relative">
            <button onClick={() => setShowExit(false)} className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="text-5xl mb-4">👋</div>
            <h2 className="text-2xl font-medium text-white" dangerouslySetInnerHTML={{ __html: t('popupTitle') }}></h2>
            <p className="mt-2 text-slate-400">{t('popupSubtitle')}</p>
            <div className="mt-6">
              <a href="#book" onClick={() => setShowExit(false)} className="inline-flex items-center justify-center px-8 py-3 btn-gradient text-white text-lg font-bold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300">
                {t('popupCTA')}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Details Popup */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in p-4" onClick={() => setShowDetails(false)}>
          <div className="glass-card rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 border border-slate-700 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowDetails(false)} className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h2 className="text-2xl font-medium text-white">{t('disclaimerTitle')}</h2>
            <p className="mt-4 text-slate-300 text-left">{t('disclaimerBody')}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;