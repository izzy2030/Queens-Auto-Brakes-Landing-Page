import React, { useState } from 'react';
import { allReviews, allReviewsEs, translations } from '../constants';
import { Review, LangType } from '../types';

interface TestimonialsProps {
    t: (key: keyof typeof translations.en) => string;
    lang: LangType;
}

const Testimonials: React.FC<TestimonialsProps> = ({ t, lang }) => {
    const [limit, setLimit] = useState(6);
    const reviewsSource = lang === 'es' ? allReviewsEs : allReviews;
    const reviews = reviewsSource.slice(0, limit);

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white" dangerouslySetInnerHTML={{ __html: t('testimonialsTitle') }}></h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                    {t('testimonialsSubtitle')}
                </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, idx) => (
                    <ReviewCard key={idx} review={review} t={t} />
                ))}
            </div>
            {limit < reviewsSource.length && (
                <div className="mt-12 text-center">
                    <button
                        onClick={() => setLimit(reviewsSource.length)}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-full shadow-lg hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-300"
                    >
                        {t('loadMore')}
                    </button>
                </div>
            )}
        </section>
    );
};

interface ReviewCardProps {
    review: Review;
    t: (key: keyof typeof translations.en) => string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, t }) => {
    const [expanded, setExpanded] = useState(false);
    const initials = review.name.split(" ").map((n) => n[0]).join("");
    const isLong = review.text.length > 150;
    const displayText = !expanded && isLong ? review.text.substring(0, 150) + "..." : review.text;

    return (
        <div className="group relative p-8 rounded-2xl glass-card hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col">
            <div className="absolute top-4 left-4 z-0">
                <svg width="45" height="36" className="fill-current text-cyan-400 opacity-10" viewBox="0 0 45 36">
                    <path d="M13.5 0C6.04 0 0 6.04 0 13.5C0 20.96 6.04 27 13.5 27H18V36H9C4.03 36 0 31.97 0 27V25.65C0 22.77 1.17 20.04 3.26 17.96C5.34 15.87 8.07 14.7 10.95 14.7H13.5C16.8 14.7 19.8 12.15 20.25 8.85C20.25 8.85 20.25 8.55 20.25 8.55C20.25 3.83 16.42 0 11.7 0H13.5ZM40.5 0C33.04 0 27 6.04 27 13.5C27 20.96 33.04 27 40.5 27H45V36H36C31.03 36 27 31.97 27 27V25.65C27 22.77 28.17 20.04 30.26 17.96C32.34 15.87 35.07 14.7 37.95 14.7H40.5C43.8 14.7 46.8 12.15 47.25 8.85C47.25 8.85 47.25 8.55 47.25 3.83 43.42 0 38.7 0H40.5Z" />
                </svg>
            </div>
            <div className="relative z-10 flex flex-col flex-grow">
                <p className="text-lg text-slate-300 leading-relaxed flex-grow">{displayText}</p>
                {isLong && (
                    <div className="text-right mt-4">
                        <button onClick={() => setExpanded(!expanded)} className="text-cyan-400 font-semibold hover:underline">
                            {expanded ? t('readLess') : t('readMore')}
                        </button>
                    </div>
                )}
            </div>
            <div className="relative z-10 flex items-center mt-6 pt-6 border-t border-slate-800">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-white text-lg font-bold mr-4">{initials}</div>
                <div>
                    <h4 className="font-semibold text-white">{review.name}</h4>
                    <div className="text-amber-400">★★★★★</div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;