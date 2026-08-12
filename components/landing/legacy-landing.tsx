"use client";

import Link from "next/link";

const LANDING_HTML = "";

export function LegacyLandingComponent() {
  return (
    <div className="legacy-landing-root" dangerouslySetInnerHTML={{ __html: LANDING_HTML }} />
  );
}
