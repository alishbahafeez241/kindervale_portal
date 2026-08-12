"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";

const LOGIN_HTML = "";

export function LegacyLoginComponent() {
  const { login } = useAuth();
  return (
    <div className="legacy-login-root" dangerouslySetInnerHTML={{ __html: LOGIN_HTML }} />
  );
}
