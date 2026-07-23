import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "../../../utils/cn";
import { useTheme } from "../../../context/ThemeContext";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {

  // 👇 Put it here
  const { theme } = useTheme();

  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
  theme === "dark"
    ? "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500"
    : "bg-indigo-100 text-indigo-700 border border-indigo-300 hover:bg-indigo-200 focus:ring-indigo-400",

    secondary:
      theme === "dark"
        ? "bg-slate-800 text-slate-100 hover:bg-slate-700 focus:ring-slate-500"
        : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 focus:ring-slate-400",

    danger:
      "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;