import React, { useState } from 'react';
import { translations } from '../constants';

interface FAQProps {
    t: (key: keyof typeof translations.en) => string;
}

const FAQ: React.FC<FAQProps> = ({ t }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <section id="faq" className="mt-16 p-6 md:p-12 rounded-2xl max-w-8xl mx-auto">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-medium text-white">{t('faqTitle')}</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">{t('faqSubtitle')}</p>
            </div>
            <div className="mt-12 max-w-4xl mx-auto space-y-4">
                {items.map((num) => (
                    <div key={num} className="border-b border-slate-700 pb-4">
                        <button
                            onClick={() => setOpenIndex(openIndex === num ? null : num)}
                            className="w-full flex justify-between items-center text-left text-lg md:text-xl font-semibold text-white cursor-pointer hover:text-cyan-400 transition-colors"
                        >
                            <span>{t(`faq${num}q` as any)}</span>
                            <svg className={`w-6 h-6 transform transition-transform ${openIndex === num ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div
                            className={`mt-4 text-slate-300 overflow-hidden transition-all duration-300 ${openIndex === num ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            {t(`faq${num}a` as any)}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center text-slate-300">
                <p>{t('faqStillQuestions')}</p>
                <p className="mt-2">{t('faqContactUs')}</p>
                <a href="tel:+18478441700" className="mt-4 inline-flex items-center justify-center px-8 py-4 btn-gradient text-white text-lg font-bold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300">
                    {t('contactCTA')}
                </a>
            </div>
        </section>
    );
};

export default FAQ;