import type { InputHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { useTheme } from "../../../context/ThemeContext";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

function Input({
  className,
  ...props
}: InputProps) {
  const { theme } = useTheme();

  return (
    <input
      className={cn(
        "w-full rounded-lg border px-4 py-2 outline-none transition-all duration-300",

        theme === "dark"
          ? "border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",

        className
      )}
      {...props}
    />
  );
}

export default Input;