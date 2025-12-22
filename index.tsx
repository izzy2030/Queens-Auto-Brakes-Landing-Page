import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

function GlobalObservers() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // If reduced motion, immediately add animate class to all
      document
        .querySelectorAll<HTMLElement>(".animate-on-scroll")
        .forEach((el) => el.classList.add("animate"));
      return;
    }

    const els = document.querySelectorAll<HTMLElement>(".animate-on-scroll");
    if (!els || els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 100px 0px"  // Trigger 100px before entering viewport
      }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <GlobalObservers />
    <App />
  </React.StrictMode>
);
