import { useNavigate } from "react-router-dom";
import { Sparkles, Brain, FolderOpen, MessageSquare, } from "lucide-react";
import Button from "../../components/ui/Button";
import { useTheme } from "../../context/ThemeContext";

function WelcomePage() {
  const navigate = useNavigate();

  const { theme } = useTheme();

  return (
    <div
      className={`relative flex min-h-screen items-center justify-center overflow-x-hidden px-4 py-4 md:px-6 md:py-10 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950"
          : "bg-slate-100"
      }`}
    >
      {/* Background Blobs */}

      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-blob" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-blob animation-delay-2000" />

      <div className="absolute left-1/2 top-1/2 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl animate-blob animation-delay-4000" />

      <div
        className={`relative z-10 w-full max-w-md rounded-3xl border p-5 sm:p-6 md:p-10 text-center shadow-2xl backdrop-blur-xl transition-all duration-500 ${
          theme === "dark"
            ? "border-white/10 bg-white/5"
            : "border-white/60 bg-white/70"
        }`}
      >
        {/* Logo */}

        <div className="mb-4 flex justify-center md:mb-8">
          <div
            className={`rounded-3xl p-3 md:p-5 ${
              theme === "dark"
                ? "bg-indigo-500/20"
                : "bg-indigo-100"
            }`}
          >
            <Sparkles
              size={34}
              className="text-indigo-500"
            />
          </div>
        </div>

        {/* Heading */}

        <h1
          className={`text-3xl font-bold md:text-5xl ${
            theme === "dark"
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Satiety
        </h1>

        <p
          className={`mt-2 text-base md:mt-3 md:text-lg ${
            theme === "dark"
              ? "text-indigo-300"
              : "text-indigo-600"
          }`}
        >
          Your AI Workspace
        </p>

        <p
          className={`mx-auto mt-3 max-w-md text-sm leading-6 md:mt-4 md:text-base md:leading-7 ${
            theme === "dark"
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          Chat with AI, organize conversations into
          workspaces and build a searchable knowledge
          base that grows with you.
        </p>

        {/* Buttons */}

        <div className="mt-5 space-y-3 md:mt-8">
          <Button
            className="w-full py-3"
            onClick={() => navigate("/login")}
          >
            Get Started →
          </Button>

          <Button
            variant="secondary"
            className="w-full py-3"
            onClick={() => navigate("/register")}
          >
            Create Free Account
          </Button>
        </div>

        {/* Features */}

        <div
          className={`hidden md:grid mt-8 grid-cols-3 gap-4 ${
            theme === "dark"
              ? "text-slate-300"
              : "text-slate-700"
          }`}
        >
          <div
            className={`rounded-xl border p-4 text-center ${
              theme === "dark"
                ? "border-slate-800 bg-slate-900/40"
                : "border-slate-200 bg-white/60"
            }`}
          >
            <MessageSquare
              className="mx-auto mb-2 text-indigo-500"
              size={22}
            />

            <p className="text-sm font-medium md:text-base">
              AI Chats
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 text-center ${
              theme === "dark"
                ? "border-slate-800 bg-slate-900/40"
                : "border-slate-200 bg-white/60"
            }`}
          >
            <FolderOpen
              className="mx-auto mb-2 text-indigo-500"
              size={22}
            />

            <p className="text-sm font-medium md:text-base">
              Smart Workspaces
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 text-center ${
              theme === "dark"
                ? "border-slate-800 bg-slate-900/40"
                : "border-slate-200 bg-white/60"
            }`}
          >
            <Brain
              className="mx-auto mb-2 text-indigo-500"
              size={22}
            />

            <p className="text-sm font-medium md:text-base">
              Your Second Brain
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;