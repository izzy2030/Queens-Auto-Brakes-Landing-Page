import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { LangType } from '../types';

interface BookingData {
  name: string;
  vehicle: string;
  date: string;
  time: string;
  couponCode?: string;
  audioUrl?: string;
}

interface ThankYouPageProps {
  lang?: LangType;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ lang = 'en' }) => {
  const [data, setData] = useState<BookingData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Trigger confetti
    // Trigger confetti - Center
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Trigger confetti - Left Cannon
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 }
    });

    // Trigger confetti - Right Cannon
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 }
    });

    // Retrieve state passed via pushState
    const state = window.history.state as BookingData;
    if (state) {
      setData(state);
      
      // Setup Audio (but don't play yet)
      const audioUrl = state.audioUrl || sessionStorage.getItem('customAudioUrl');
      if (audioUrl && !audioRef.current) {
          audioRef.current = new Audio(audioUrl);
          audioRef.current.onended = () => setIsPlaying(false);
          audioRef.current.onplay = () => setIsPlaying(true);
          audioRef.current.onpause = () => setIsPlaying(false);
      }
    }
  }, []);

  const handleStartAudio = () => {
      setHasInteracted(true);
      if (audioRef.current) {
          audioRef.current.play().catch(e => console.log("Play failed:", e));
      }
  };

  const toggleAudio = () => {
      if (audioRef.current) {
          if (isPlaying) {
              audioRef.current.pause();
          } else {
              audioRef.current.play();
          }
      }
  };

  const couponCode = data?.couponCode || '276KJO';
  const fallbackName = lang === 'es' ? 'Estimado Cliente' : 'Dear Customer';
  const displayName = data?.name || fallbackName;
  const hasAudio = !!(data?.audioUrl || sessionStorage.getItem('customAudioUrl'));

  return (
    <div className="min-h-screen bg-[#06080f] text-gray-300 font-sans flex flex-col">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              alt="Queens logo"
              className="h-10 w-auto"
              src="https://queensautoserviceselgin.com/wp-content/uploads/2024/11/Logo-White.webp"
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "https://placehold.co/200x50/1e293b/ffffff?text=Queens+Auto")
              }
            />
          </div>
          <nav className="flex items-center space-x-4">
            <a href="/" className="px-5 py-2 text-sm font-semibold bg-white text-gray-900 rounded-full hover:bg-gray-300 transition-colors">
              Back to Home
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="max-w-3xl w-full">
          <div className="mb-6">
            <svg
              className="mx-auto h-20 w-20 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.486 5.867L12.55 4.542C12.392 4.496 12.218 4.538 12.094 4.654L9.894 6.643C9.728 6.793 9.75 7.054 9.93 7.165L13.12 8.948C13.255 9.029 13.432 8.974 13.513 8.839L15.352 5.811C15.419 5.698 15.37 5.556 15.247 5.503L12.01 4.162"
                opacity="0.4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></path>
              <path
                d="M7.5 7.143L4.31 8.926C4.175 9.007 4 8.952 3.92 8.817L2.08 5.789C2.013 5.676 2.062 5.534 2.185 5.481L5.418 4.14C5.597 4.067 5.78 4.223 5.748 4.406L5.053 8.165"
                opacity="0.4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></path>
              <path
                d="M8.5 19.5V11C8.5 10.448 8.948 10 9.5 10H14.5C15.052 10 15.5 10.448 15.5 11V19.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></path>
              <path
                d="M18.89 12.04L21.43 13.51C21.61 13.62 21.58 13.88 21.4 14.03L19.59 15.65C19.46 15.77 19.28 15.73 19.17 15.6L16.63 14.13"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></path>
              <path
                d="M5.11 12.04L2.57 13.51C2.39 13.62 2.42 13.88 2.6 14.03L4.41 15.65C4.54 15.77 4.72 15.73 4.83 15.6L7.37 14.13"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            You're All Set, <span className="text-cyan-400">{displayName}!</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto">
            Your appointment is confirmed. We've saved your spot and sent a
            reminder to your phone.
          </p>
          
          {/* Audio Player UI - Only show if audio exists */}
          {hasAudio && (
            !hasInteracted ? (
              <div className="mb-12">
                  <button
                      onClick={handleStartAudio}
                      className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base sm:text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 animate-pulse"
                  >
                      <svg 
                        className="w-5 h-5 mr-3 fill-current" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Play a Message for {displayName}
                  </button>
               </div>
            ) : (
              <div className="mb-10 w-full max-w-sm mx-auto cursor-pointer" onClick={toggleAudio}>
                  <div className={`bg-white/10 rounded-full p-2 flex items-center space-x-3 transition-all ${isPlaying ? 'ring-2 ring-cyan-400/50' : ''}`}>
                  <span className="text-white text-2xl">{isPlaying ? '🔊' : '🔇'}</span>
                  <span className="text-white text-sm">{isPlaying ? 'Playing...' : 'Click to Play Message'}</span>
                  
                  {isPlaying && (
                      <div className="flex-grow flex items-center justify-between space-x-0.5 h-6">
                          {[...Array(15)].map((_, i) => (
                              <div
                              key={i}
                              className="w-1.5 bg-cyan-400/60 rounded-full animate-pulse"
                              style={{ 
                                  height: `${Math.random() * 100}%`,
                                  animationDelay: `-${Math.random()}s` 
                              }}
                              ></div>
                          ))}
                      </div>
                  )}
                  </div>
              </div>
            )
          )}

          <div className="space-y-6">
            <div className="p-[2px] rounded-lg bg-gradient-to-r from-cyan-400 via-transparent to-cyan-400 bg-[length:15px_15px]">
              <div className="bg-[#111827] rounded-[10px] p-8 border border-cyan-500/30 border-dashed">
                <p className="text-sm text-gray-400 mb-2">
                  Here is your exclusive savings code. Show it at the shop to get
                  your discount:
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-4xl md:text-5xl font-bold tracking-widest text-cyan-400">
                    {couponCode}
                  </span>
                  <button
                    className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    onClick={() => navigator.clipboard.writeText(couponCode)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-[#111827] rounded-lg p-6 text-left grid grid-cols-1 sm:grid-cols-3 gap-6 border border-gray-800">
              <div>
                <p className="text-xs text-gray-400 mb-1">Name</p>
                <p className="font-semibold text-white">{displayName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Vehicle</p>
                <p className="font-semibold text-white">{data?.vehicle || 'Your Vehicle'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Appointment</p>
                <p className="font-semibold text-white">
                  {data ? `${data.date} at ${data.time}` : 'Pending Confirmation'}
                </p>
              </div>
            </div>
            <div className="bg-[#111827] rounded-lg p-8 text-left border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">
                What Happens Next?
              </h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-400">
                <li>Check your text messages for a confirmation.</li>
                <li>
                  A team member will call you shortly to confirm all the
                  details.
                </li>
                <li>
                  Head to the shop at your scheduled time. We'll be ready for
                  you!
                </li>
              </ol>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111827] rounded-lg p-8 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-2">
                  Need to Reschedule?
                </h3>
                <p className="text-gray-400 mb-6">
                  No problem. Give us a call and we'll find a better time.
                </p>
                <a
                  className="inline-block w-full max-w-xs px-6 py-3 border border-gray-600 rounded-full text-white font-semibold hover:bg-gray-800 transition-colors text-center"
                  href="tel:847-844-1700"
                >
                  (847) 844-1700
                </a>
              </div>
              <div className="bg-[#111827] rounded-lg p-8 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-2">
                  Where to Find Us
                </h3>
                <p className="text-gray-400 mb-6">
                  2401 E Algonquin Rd, Algonquin, IL 60102
                </p>
                <a
                  className="inline-block w-full max-w-xs px-6 py-3 border border-gray-600 rounded-full text-white font-semibold hover:bg-gray-800 transition-colors text-center"
                  href="https://maps.google.com/?q=2401+E+Algonquin+Rd,+Algonquin,+IL+60102"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
        <div className="container mx-auto">
          <p>
            © 2025 Queens Auto Service. All Rights Reserved. |{" "}
            <a className="hover:text-cyan-400" href="#">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a className="hover:text-cyan-400" href="#">
              Terms of Use
            </a>
          </p>
          <p className="mt-1">2401 E Algonquin Rd, Algonquin, IL 60102</p>
        </div>
      </footer>
    </div>
  );
};

export default ThankYouPage;
