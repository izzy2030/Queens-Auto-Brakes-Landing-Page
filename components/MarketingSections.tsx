import React, { useEffect, useState, useRef } from "react";
import { translations } from "../constants";

interface SectionProps {
  t: (key: keyof typeof translations.en) => string;
}

export const HeroSection: React.FC<SectionProps> = ({ t }) => {
  return (
    <div
      id="hero-section"
      className="relative z-10 px-4 sm:px-6 lg:px-8 pt-12 md:pt-20"
    >
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-12">
          <span className="glass-card inline-block px-4 py-2 rounded-full text-cyan-300 text-sm font-medium mb-6 animate-on-scroll fade-up delay-0">
            {t("limitedSlots")}
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-on-scroll fade-up delay-1"
            dangerouslySetInnerHTML={{ __html: t("heroTitle") }}
          ></h1>
          <p className="text-lg text-white/70 mx-auto max-w-2xl animate-on-scroll fade-up delay-2">
            {t("heroSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center px-4">
          <div className="relative">
            <div className="hero-gradient absolute inset-0 rounded-2xl rotate-3 scale-105 opacity-30"></div>
            <div className="glass-card relative rounded-2xl p-3 shadow-xl">
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <img
                  src="https://queensautoserviceselgin.com/wp-content/uploads/2025/08/Queens-Auto-Brake-Repair-Before-and-After-0001.webp"
                  alt="New Brakes"
                  className="w-full h-auto"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400/1e293b/ffffff?text=Brake+Service")
                  }
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-50"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl opacity-30"></div>
          </div>

          <div>
            <ul className="space-y-3 mb-8 text-slate-300">
              <li className="flex items-start gap-3 text-lg">
                <span className="text-cyan-400 text-2xl flex-shrink-0">✅</span>
                <span>{t("bulletBrakeService")}</span>
              </li>
              {[1, 2, 3, 4].map((num) => (
                <li
                  key={num}
                  className="flex items-start gap-3 text-lg animate-on-scroll fade-up delay-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mt-1 text-cyan-400 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t(`bulletBonus${num}` as any),
                    }}
                  ></span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center md:items-start">
              <a
                href="#book"
                className="inline-flex items-center justify-center px-8 py-4 btn-gradient text-white text-lg font-bold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 cta-hover"
              >
                {t("heroCTA")}
              </a>
              <p className="mt-2 text-sm text-orange-400 italic font-semibold text-center md:text-left">
                {t("scarcityLine")}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center md:justify-start space-x-6">
              <div className="flex -space-x-2">
                <img
                  className="w-10 h-10 rounded-full border-2 border-slate-700 animate-on-scroll fade-up delay-2"
                  src="https://queensautoserviceselgin.com/wp-content/uploads/2025/05/Lavira-Johnson.png"
                  alt="Happy Customer 1"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-slate-700 animate-on-scroll fade-up delay-3"
                  src="https://queensautoserviceselgin.com/wp-content/uploads/2025/08/Chris-Muller.png"
                  alt="Happy Customer 2"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-slate-700 animate-on-scroll fade-up delay-4"
                  src="https://queensautoserviceselgin.com/wp-content/uploads/2025/08/Mark-Devino.png"
                  alt="Happy Customer 3"
                />
              </div>
              <p
                className="text-sm text-slate-400"
                dangerouslySetInnerHTML={{ __html: t("trustedBy") }}
              ></p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-xs text-slate-400 animate-on-scroll fade-up delay-4">
          <span>{t("restrictionsApply")} </span>
          <button
            className="bg-transparent p-0 border-0 text-white font-bold underline hover:text-cyan-400 hover:cursor-pointer transition-colors"
            onClick={() =>
              document.dispatchEvent(new CustomEvent("openDetails"))
            }
          >
            {t("seeDetails")}
          </button>
        </div>
      </div>
    </div>
  );
};

export const PromiseSection: React.FC<SectionProps> = ({ t }) => {
  const icons = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>,
  ];

  return (
    <section className="mt-20 max-w-8xl mx-auto px-6 animate-on-scroll fade-up delay-1">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          {t("promiseTitle")}
        </h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          {t("promiseSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((num, idx) => (
          <div
            key={num}
            className={`glass-card p-8 rounded-2xl flex flex-col items-center text-center group hover:bg-slate-800/20 transition-all duration-300 animate-on-scroll fade-up delay-${idx}`}
          >
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-blue-500/20 transition-colors">
              {icons[idx]}
            </div>
            <h4 className="font-bold text-white text-xl mb-3">
              {t(`promise${num}Title` as any)}
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t(`promise${num}Body` as any)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const WhenToReplaceSection: React.FC<SectionProps> = ({ t }) => (
  <section className="mt-16 p-6 md:p-12 glass-card rounded-2xl shadow-2xl max-w-8xl mx-auto animate-on-scroll fade-up delay-1">
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        {t("whenToReplaceTitle")}
      </h2>
      <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">
        {t("whenToReplaceSubtitle")}
      </p>
    </div>
    <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            {t("watchSignsTitle")}
          </h3>
          <ul className="space-y-4">
            {[
              {
                icon: "🔊",
                title: "signSqueakingTitle",
                body: "signSqueakingBody",
              },
              { icon: "🧽", title: "signSpongyTitle", body: "signSpongyBody" },
              {
                icon: "📏",
                title: "signStoppingTitle",
                body: "signStoppingBody",
              },
              { icon: "⚠️", title: "signLightTitle", body: "signLightBody" },
            ].map((sign) => (
              <li key={sign.title} className="flex items-start">
                <span className="text-2xl mr-4 mt-1">{sign.icon}</span>
                <div>
                  <strong className="text-slate-100">
                    {t(sign.title as any)}
                  </strong>
                  <p className="text-slate-400">{t(sign.body as any)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-lg text-left">
          <h3 className="text-xl font-bold text-white">{t("dontWaitTitle")}</h3>
          <p className="mt-2 text-slate-300">{t("dontWaitBody")}</p>
        </div>
      </div>
      <div>
        <img
          src="https://queensautoserviceselgin.com/wp-content/uploads/2025/08/New-vs.-Worn-Brake-Pads-Free-Brake-Inspection-Offer.webp"
          alt="Comparison"
          className="w-full rounded-2xl"
        />
      </div>
    </div>
  </section>
);

export const ExpertBrakeSection: React.FC<SectionProps> = ({ t }) => {
  const [count, setCount] = useState(0);
  const target = 25000;
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.ceil(start));
          }
        }, stepTime);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mt-16 p-6 md:p-12 glass-card rounded-2xl shadow-2xl max-w-8xl mx-auto animate-on-scroll fade-up delay-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
        <div>
          <img
            src="https://queensautoserviceselgin.com/wp-content/uploads/2025/08/Expert-Brake-Repair-with-Financing-Available-Auto-Service-Guide.webp"
            alt="Brake repair"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
        <div>
          <p className="text-sm font-extrabold uppercase mb-2 text-white rounded-full px-4 py-2 inline-flex items-center shadow-lg bg-gradient-to-br from-red-500 to-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {" "}
              <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />{" "}
            </svg>
            <span>{t("brakesServiced")}</span>
          </p>
          <h3 className="text-3xl font-bold text-white mb-4">
            {t("expertRepairTitle")}
          </h3>
          <p className="text-lg text-slate-300 mb-8">
            {t("expertRepairIntro")}
          </p>
          <ul className="text-white space-y-3 mt-6">
            {[
              "Equipment",
              "Inspection",
              "Warranty2",
              "Financing",
              "Vehicles",
            ].map((k) => (
              <li key={k} className="flex items-start gap-2">
                <span className="text-green-400 text-lg font-bold">✓</span>
                <span
                  dangerouslySetInnerHTML={{ __html: t(`bullet${k}` as any) }}
                ></span>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-left">
            <h3 ref={ref} className="text-white text-3xl font-bold">
              {count.toLocaleString()}+ Happy Customers
            </h3>
            <p className="text-gray-400 text-base mt-2">
              {t("trustedByDrivers")}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={`bg-slate-800/10 border border-slate-700 p-6 rounded-xl flex justify-between items-center hover:bg-slate-800/20 transition-colors animate-on-scroll fade-up delay-${n}`}
          >
            <div>
              <h4 className="text-white text-lg font-semibold mb-1 text-left">
                {t(`feature${n}Title` as any)}
              </h4>
              <p className="text-slate-300 text-sm opacity-85 text-left">
                {t(`feature${n}Body` as any)}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-cyan-400 flex-shrink-0 ml-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
};

export const WhyImportantSection: React.FC<SectionProps> = ({ t }) => (
  <section className="mt-16 p-6 md:p-12 glass-card rounded-2xl shadow-2xl max-w-8xl mx-auto animate-on-scroll fade-up delay-1">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-5 text-white">
          {t("whyImportantTitle")}
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-12 opacity-85 text-white">
          {t("whyImportantSubtitle")}
        </p>
        <div className="space-y-6">
          <div className="flex items-start">
            <svg
              className="w-10 h-10 mr-4 flex-shrink-0 text-cyan-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
              <path d="M12 2v4"></path>
              <path d="M12 18v4"></path>
              <path d="M4.93 4.93l2.83 2.83"></path>
              <path d="M16.24 16.24l2.83 2.83"></path>
              <path d="M2 12h4"></path>
              <path d="M18 12h4"></path>
              <path d="M4.93 19.07l2.83-2.83"></path>
              <path d="M16.24 7.76l2.83-2.83"></path>
            </svg>
            <div>
              <p className="text-xl font-bold text-white">{t("pain1Title")}</p>
              <p className="text-base text-slate-300 opacity-85">
                {t("pain1Body")}
              </p>
            </div>
          </div>
          {[2, 3].map((n) => (
            <div key={n} className="flex items-start">
              <span className="text-4xl mr-4 flex-shrink-0">
                {n === 2 ? "⚠️" : "💸"}
              </span>
              <div>
                <p className="text-xl font-bold text-white">
                  {t(`pain${n}Title` as any)}
                </p>
                <p className="text-base text-slate-300 opacity-85">
                  {t(`pain${n}Body` as any)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 p-4 bg-cyan-500/20 rounded-lg border border-cyan-500 text-white font-semibold italic text-center">
          <span>{t("reliefStatement")}</span>
        </div>
      </div>
      <div>
        <img
          src="https://queensautoserviceselgin.com/wp-content/uploads/2025/08/Nation-Wide-Protection-Expert-Brake-Disc-Repair-Replacement.webp"
          alt="Worn brakes"
          className="w-full rounded-2xl shadow-lg mt-8 md:mt-0"
        />
      </div>
    </div>
  </section>
);

export const TrustSignalsSection: React.FC<SectionProps> = ({ t }) => (
  <section className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-8xl mx-auto px-6 animate-on-scroll fade-up delay-1">
    {[
      {
        icon: (
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        ),
        color: "green",
        title: "trustRating",
        sub: "trustRatingSub",
      },
      {
        icon: (
          <path
            fillRule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        ),
        color: "blue",
        title: "trustExp",
        sub: "trustExpSub",
      },
      {
        icon: (
          <path
            fillRule="evenodd"
            d="M10 1.944A11.954 11.954 0 012.166 5.002L2.024 5.147A12.003 12.003 0 0010 18.455a12.003 12.003 0 007.976-13.308L17.834 5.002A11.954 11.954 0 0110 1.944zM8.5 6a1.5 1.5 0 113 0v4.5a1.5 1.5 0 11-3 0V6zM10 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            clipRule="evenodd"
          />
        ),
        color: "red",
        title: "trustWarranty",
        sub: "trustWarrantySub",
      },
    ].map((item, idx) => (
      <div
        key={idx}
        className={`glass-card p-6 rounded-xl shadow-lg animate-on-scroll fade-up delay-${idx}`}
      >
        <div
          className={`flex items-center justify-center h-12 w-12 rounded-full bg-${item.color}-500/10 text-${item.color}-400 mx-auto`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {item.icon}
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-100">
          {t(item.title as any)}
        </h3>
        <p className="text-sm text-slate-400">{t(item.sub as any)}</p>
      </div>
    ))}
  </section>
);

export const AboutSection: React.FC<SectionProps> = ({ t }) => (
  <section className="mt-16 glass-card rounded-2xl shadow-2xl p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center max-w-8xl mx-auto">
    <div>
      <h2 className="text-3xl font-bold text-white">{t("aboutTitle")}</h2>
      <p className="mt-4 text-slate-300 animate-on-scroll fade-up delay-1">
        {t("aboutBody")}
      </p>
      <ul className="mt-6 space-y-4">
        {[1, 2, 3, 4].map((n) => (
          <li key={n} className="flex items-center">
            <svg
              className="w-6 h-6 text-cyan-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>{" "}
            </svg>
            <span>{t(`aboutPoint${n}` as any)}</span>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <img
        src="https://queensautoserviceselgin.com/wp-content/uploads/2025/05/Queens-Elgin-Street-View-001.png"
        alt="Queens Auto Shop"
        className="rounded-2xl shadow-lg w-full"
        onError={(e) =>
          ((e.target as HTMLImageElement).src =
            "https://placehold.co/600x400/1e293b/ffffff?text=Our+Shop")
        }
      />
      <p className="mt-4 text-center text-slate-400">{t("aboutSubtext")}</p>
    </div>
  </section>
);

export const ParallaxSection: React.FC<SectionProps> = ({ t }) => (
  <section
    className="mt-16 parallax rounded-2xl shadow-2xl py-24 px-8 max-w-8xl mx-auto"
    style={{
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('https://queensautoserviceselgin.com/wp-content/uploads/2025/05/Queens-Elgin-Front-Desk-002.png')`,
    }}
  >
    <div className="relative z-10 text-center max-w-3xl mx-auto">
      <h2 className="text-4xl font-extrabold text-white">
        {t("parallaxTitle")}
      </h2>
      <p className="mt-4 text-lg text-slate-200 animate-on-scroll fade-up delay-2">
        {t("parallaxBody")}
      </p>
    </div>
  </section>
);

export const ServiceAreaSection: React.FC<SectionProps> = ({ t }) => (
  <section className="mt-16 max-w-8xl mx-auto px-6">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl font-bold text-white">
          {t("serviceAreaTitle")}
        </h2>
        <div className="w-24 h-1 bg-cyan-400 mt-4 mb-6"></div>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-4 text-slate-300 animate-on-scroll fade-up delay-1">
          {[
            "Elgin, IL",
            "South Elgin, IL",
            "Carpentersville, IL",
            "West Dundee, IL",
            "East Dundee, IL",
            "Algonquin, IL",
            "Bartlett, IL",
            "Streamwood, IL",
            "Hoffman Estates, IL",
            "Huntley, IL",
          ].map((city) => (
            <li key={city} className="flex items-center">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></span>
              {city}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-64 md:h-80 rounded-2xl overflow-hidden glass-card">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2959.563065668352!2d-88.2383856845781!3d42.11808097920364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880f0eb896c3453d%3A0x7d253942398246!2sQueens%20Auto%20Services!5e0!3m2!1sen!2sus!4v1689104000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>
);
