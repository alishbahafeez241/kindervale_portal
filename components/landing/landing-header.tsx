"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export function LandingHeader() {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="kv-nav">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <div className="mark">
            {/* Kindervale Bird Logo SVG */}
            <svg viewBox="0 0 100 100" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="35" cy="55" r="22" fill="#2e5a75" />
              <circle cx="65" cy="55" r="18" fill="#f6b41e" />
              <circle cx="30" cy="48" r="4" fill="#fff" />
              <circle cx="62" cy="50" r="3" fill="#fff" />
              <polygon points="18,55 8,52 18,60" fill="#f6b41e" />
              <polygon points="78,55 86,53 78,60" fill="#2e5a75" />
            </svg>
          </div>
          <div>
            KINDERVALE
            <small>PRESCHOOL</small>
          </div>
        </Link>

        <div className="nav-links">
          <a href="#about">About Us</a>
          <a href="#curriculum">Curriculum</a>
          <a href="#levels">Our Levels</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Admissions</a>
          {isAuthenticated ? (
            <Link href="/dashboard" className="btn btn-primary nav-cta">
              Go to Portal ({user?.role})
            </Link>
          ) : (
            <Link href="/login" className="btn btn-primary nav-cta">
              Portal Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
