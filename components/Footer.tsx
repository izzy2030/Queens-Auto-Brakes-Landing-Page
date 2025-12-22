import React from 'react';
import { translations } from '../constants';

interface FooterProps {
  t: (key: keyof typeof translations.en) => string;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="mt-16 py-12 border-t border-slate-800">
      <div className="max-w-8xl mx-auto px-6 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Queens Auto Services Elgin</h3>
        <div className="text-slate-400 space-y-2">
          <p>
            <a
              href="https://maps.google.com/?q=1303+Dundee+Ave+Elgin+IL+60120"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              1303 Dundee Ave, Elgin, IL 60120
            </a>
          </p>
          <p>
            <span>{t('callUs')} </span>
            <a href="tel:+12246353000" className="hover:text-cyan-400 transition-colors font-medium">(224) 635-3000</a>
          </p>
          <p className="text-sm">
            <span className="text-slate-500">Hours:</span> Mon-Fri 8:00 AM - 6:00 PM | Sat 8:00 AM - 4:00 PM
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-800 text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Queens Auto Services Elgin. All Rights Reserved. |
            <a href="https://queensautoserviceselgin.com/privacy-policy/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors ml-1">{t('privacyPolicy')}</a> |
            <a href="https://queensautoserviceselgin.com/terms-of-use/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors ml-1">{t('termsOfUse')}</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;