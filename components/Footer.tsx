import React from 'react';
import { translations } from '../constants';

interface FooterProps {
  t: (key: keyof typeof translations.en) => string;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="mt-16 py-8 border-t border-slate-800">
      <div className="max-w-8xl mx-auto px-6 text-center text-sm text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} Queens Auto Service. All Rights Reserved. | 
          <a href="https://queensautoserviceselgin.com/privacy-policy/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors ml-1">{t('privacyPolicy')}</a> | 
          <a href="https://queensautoserviceselgin.com/terms-of-use/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors ml-1">{t('termsOfUse')}</a>
        </p>
        <p className="mt-2">2401 E Algonquin Rd, Algonquin, IL 60102</p>
        <p className="mt-1">
          <span>{t('callUs')} </span>
          <a href="tel:+18478441700" className="hover:text-cyan-400 transition-colors">(847) 844-1700</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;