"use client";

import Link from "next/link";
import { Smile, BookOpen, Heart, Brain, MessageSquare, Activity, Palette, Globe, Sparkles } from "lucide-react";

export function LandingSections() {
  const levels = [
    { title: "Playgroup", age: "Ages 2 – 3 Yrs", bg: "bg-[#f6b41e]", desc: "Sensory exploration, basic motor skills, and fun group play." },
    { title: "Nursery", age: "Ages 3 – 4 Yrs", bg: "bg-[#2e5a75]", desc: "Phonics introduction, vocabulary expansion, and creative expression." },
    { title: "KG 1", age: "Ages 4 – 5 Yrs", bg: "bg-[#8a7ff0]", desc: "Early literacy, numeracy, logical reasoning, and teamwork." },
    { title: "KG 2", age: "Ages 5 – 6 Yrs", bg: "bg-[#1f4257]", desc: "Primary school preparation, reading fluency, and STEM activities." }
  ];

  const eyfsAreas = [
    { title: "Communication & Language", icon: MessageSquare },
    { title: "Physical Development", icon: Activity },
    { title: "Personal & Social Growth", icon: Heart },
    { title: "Literacy & Phonics", icon: BookOpen },
    { title: "Mathematics & Logic", icon: Brain },
    { title: "Understanding the World", icon: Globe },
    { title: "Expressive Arts & Design", icon: Palette }
  ];

  const galleryCircles = [
    { label: "Creative Art & Play", color: "from-[#f6b41e] to-orange-400", icon: Palette },
    { label: "Phonics & Reading", color: "from-[#2e5a75] to-teal-500", icon: BookOpen },
    { label: "Outdoor Explorations", color: "from-emerald-400 to-teal-600", icon: Smile }
  ];

  return (
    <div className="bg-[#fbfcfd]">
      {/* About Section / Cards */}
      <section className="pad" id="about">
        <div className="container">
          <div className="sec-head">
            <h2>Why Choose Kindervale?</h2>
            <p>Providing a safe, nurturing, and modern early learning environment for every child.</p>
          </div>

          <div className="cards">
            <div className="card">
              <div className="ic bg-amber-100 text-[#f6b41e]">🎨</div>
              <h3>Holistic EYFS Curriculum</h3>
              <p>Designed according to international early years foundation stage principles to foster active curiosity.</p>
            </div>
            <div className="card">
              <div className="ic bg-teal-100 text-[#2e5a75]">🛡️</div>
              <h3>Safe & Caring Environment</h3>
              <p>Dedicated staff and state-of-the-art facilities prioritizing child well-being and safety at every turn.</p>
            </div>
            <div className="card">
              <div className="ic bg-indigo-100 text-indigo-600">📱</div>
              <h3>Real-Time Parent Portal</h3>
              <p>Stay connected with real-time attendance logs, progress report cards, fee challans, and notices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Circular Photo Gallery */}
      <section className="pad bg-slate-50/60 border-y border-[#e6edf2]" id="gallery">
        <div className="container">
          <div className="sec-head">
            <h2>School Life & Activities</h2>
            <p>Glimpse into our colorful classrooms, creative studios, and outdoor play spaces.</p>
          </div>

          <div className="gallery">
            {galleryCircles.map((item) => {
              const Icon = item.icon;
              return (
                <figure key={item.label} className="gcircle">
                  <div className={`mx-auto flex h-[200px] w-[200px] items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-white shadow-xl border-4 border-white transition hover:scale-105`}>
                    <Icon className="h-20 w-20 opacity-90" />
                  </div>
                  <figcaption>{item.label}</figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Levels */}
      <section className="pad" id="levels">
        <div className="container">
          <div className="sec-head">
            <h2>Our Learning Levels</h2>
            <p>Tailored developmental stages for children aged 2 to 6 years old.</p>
          </div>

          <div className="levels">
            {levels.map((lvl) => (
              <div key={lvl.title} className={`level ${lvl.bg}`}>
                <h4>{lvl.title}</h4>
                <small className="block mb-3 font-bold">{lvl.age}</small>
                <p className="text-xs leading-relaxed opacity-95">{lvl.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EYFS Framework */}
      <section className="pad bg-slate-50/60 border-t border-[#e6edf2]" id="curriculum">
        <div className="container">
          <div className="sec-head">
            <h2>7 EYFS Areas of Learning</h2>
            <p>Ensuring balanced academic, emotional, physical, and social development.</p>
          </div>

          <div className="eyfs">
            {eyfsAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.title}>
                  <Icon className="mx-auto mb-2 h-7 w-7 text-[#2e5a75]" />
                  <span>{area.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Banner Strip */}
      <div className="strip">
        <div className="cloud c1" />
        <h2>Join the Kindervale Family Today</h2>
        <p>Log in to access child progress reports, real-time attendance, fee challans, and school calendars.</p>
        <Link href="/login" className="btn btn-primary">
          Access Portal Sign In →
        </Link>
      </div>

      {/* Footer */}
      <footer id="contact">
        <div className="container">
          <div className="foot-grid">
            <div>
              <h5 className="font-bold text-white text-lg">KINDERVALE PRESCHOOL</h5>
              <p className="text-xs text-slate-300 mt-2">
                Providing excellence in early childhood education, holistic care, and transparent parent involvement.
              </p>
            </div>
            <div>
              <h5>Quick Links</h5>
              <a href="#about">About Us</a>
              <a href="#curriculum">Curriculum</a>
              <a href="#levels">Learning Levels</a>
              <Link href="/login">Portal Login</Link>
            </div>
            <div>
              <h5>Contact Information</h5>
              <p>📍 123 Education Lane, Kindervale</p>
              <p>📞 +1 (555) 019-2831</p>
              <p>✉️ info@kindervale.edu</p>
            </div>
          </div>
          <div className="foot-bottom">
            © {new Date().getFullYear()} Kindervale Preschool — School Information System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
