"use client";

import Link from "next/link";

export function LandingHero() {
  return (
    <header className="hero">
      {/* Animated Sky Clouds */}
      <div className="sky-layer">
        <div className="cloud c1" />
        <div className="cloud c2" />
        <div className="cloud c3" />
        <div className="cloud c4" />
      </div>

      <div className="hero-lockup">
        {/* Bird Mascot SVG Illustration */}
        <div className="mx-auto mb-4 flex justify-center">
          <div className="hero-birds flex items-center justify-center rounded-3xl bg-white/15 p-4 backdrop-blur-md border border-white/20 shadow-2xl">
            <svg viewBox="0 0 100 100" width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="36" cy="52" r="26" fill="#fff" />
              <circle cx="68" cy="54" r="20" fill="#f6b41e" />
              <circle cx="30" cy="45" r="5" fill="#2e5a75" />
              <circle cx="64" cy="48" r="4" fill="#2e5a75" />
              <polygon points="14,52 2,48 14,58" fill="#f6b41e" />
              <polygon points="84,54 94,52 84,60" fill="#2e5a75" />
            </svg>
          </div>
        </div>

        <h1 className="brand-title">KINDERVALE</h1>
        <div className="brand-sub">PRESCHOOL</div>

        <div className="brand-tag">
          <span className="ln" />
          <span>Celebrating Childhood</span>
          <span className="ln" />
        </div>

        <div className="hero-cta">
          <Link href="/login" className="btn btn-primary">
            Enter Portal →
          </Link>
          <a href="#about" className="btn btn-ghost">
            Explore Features
          </a>
        </div>
      </div>

      {/* SVG Wave Footer Transition */}
      <div className="wave">
        <svg viewBox="0 0 1440 140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "120px" }}>
          <path fill="#d6ecf7" d="M0,70 C70,40 130,90 210,64 C300,34 350,92 450,70 C560,46 620,96 730,72 C850,46 900,98 1020,74 C1140,50 1200,96 1300,72 C1370,55 1410,78 1440,70 L1440,140 L0,140 Z" />
          <path fill="#eaf4fb" d="M0,95 C90,66 160,104 260,84 C370,62 430,106 560,90 C690,74 760,110 900,92 C1030,76 1110,108 1240,92 C1340,80 1400,100 1440,92 L1440,140 L0,140 Z" />
        </svg>
      </div>
    </header>
  );
}
