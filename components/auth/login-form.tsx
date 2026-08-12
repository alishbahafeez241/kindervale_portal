"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import toast from "react-hot-toast";

export function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const presetAccounts = [
    { label: "Admin", username: "admin", color: "btn-primary" },
    { label: "Teacher", username: "teacher", color: "btn-teal" },
    { label: "Parent", username: "parent", color: "btn-primary" },
    { label: "Principal", username: "principal", color: "btn-teal" },
    { label: "Daycare", username: "daycare", color: "btn-outline" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg("Please enter your username.");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      await login({ username, password });
    } catch (err: unknown) {
      console.error("Login failed:", err);
      const msg = err instanceof Error ? err.message : "Invalid username or password";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-wrap">
      {/* Animated Clouds */}
      <div className="cloud ac1" />
      <div className="cloud ac2" />
      <div className="cloud ac3" />

      <div className="auth-card">
        {/* Logo Header */}
        <div className="logo">
          <div className="mark">
            <svg viewBox="0 0 100 100" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="35" cy="55" r="22" fill="#2e5a75" />
              <circle cx="65" cy="55" r="18" fill="#f6b41e" />
              <circle cx="30" cy="48" r="4" fill="#fff" />
              <circle cx="62" cy="50" r="3" fill="#fff" />
              <polygon points="18,55 8,52 18,60" fill="#f6b41e" />
              <polygon points="78,55 86,53 78,60" fill="#2e5a75" />
            </svg>
          </div>
        </div>

        <h2>Kindervale Portal</h2>
        <div className="sub">School Information System</div>

        {errorMsg && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-600">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Username / Account ID</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin, teacher, parent"
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full justify-center mt-2">
            {isSubmitting ? "Signing in..." : "Sign In to Portal →"}
          </button>
        </form>

        {/* Demo Preset Buttons */}
        <div className="mt-6 text-center">
          <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
            Select Quick Account
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {presetAccounts.map((acc) => (
              <button
                key={acc.username}
                type="button"
                onClick={() => { setUsername(acc.username); setPassword("password"); }}
                className={`btn btn-sm ${username === acc.username ? "btn-primary" : "btn-outline"}`}
              >
                {acc.label}
              </button>
            ))}
          </div>
        </div>

        <div className="demo-note">
          Demo login: use any account above with password <code>password</code>.
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs font-bold text-slate-500 hover:text-[#2e5a75]">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
