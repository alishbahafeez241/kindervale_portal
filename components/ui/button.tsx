import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-brand-gold text-brand-navy shadow-soft hover:bg-[#e0a00c]",
        variant === "outline" && "border border-[#dfe8ef] bg-white text-brand-navy hover:bg-brand-cloud",
        variant === "ghost" && "text-brand-navy hover:bg-brand-cloud",
        className
      )}
      {...props}
    />
  );
}
