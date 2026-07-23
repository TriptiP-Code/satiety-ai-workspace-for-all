import { useTheme } from "../../context/ThemeContext";

function TypingIndicator() {
  const { theme } = useTheme();

  return (
    <div className="mb-4 flex justify-start">
      <div
        className={`rounded-2xl px-4 py-3 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-800"
            : "border border-slate-300 bg-white shadow-sm"
        }`}
      >
        <div className="flex gap-1">
          <span
            className={`h-2 w-2 animate-bounce rounded-full ${
              theme === "dark"
                ? "bg-slate-400"
                : "bg-slate-500"
            }`}
          ></span>

          <span
            className={`h-2 w-2 animate-bounce rounded-full ${
              theme === "dark"
                ? "bg-slate-400"
                : "bg-slate-500"
            }`}
            style={{ animationDelay: "0.15s" }}
          ></span>

          <span
            className={`h-2 w-2 animate-bounce rounded-full ${
              theme === "dark"
                ? "bg-slate-400"
                : "bg-slate-500"
            }`}
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;