import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

import Button from "../../components/ui/Button";

import { useTheme } from "../../context/ThemeContext";

import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const { theme } = useTheme();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  async function handleLogin(
  e: React.FormEvent
) {
  e.preventDefault();

  const success = await login(
    email.trim().toLowerCase(),
    password
  );

  if (!success) {
    alert("Invalid email or password");
    return;
  }

  navigate("/");
}

  return (
    <div
      className={`relative flex min-h-screen items-center justify-center overflow-hidden px-6 ${
        theme === "dark"
          ? "bg-slate-950"
          : "bg-slate-100"
      }`}
    >
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-blob" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-blob animation-delay-2000" />

      <div
        className={`relative w-full max-w-md rounded-3xl border p-8 backdrop-blur-xl shadow-2xl ${
          theme === "dark"
            ? "border-white/10 bg-white/5"
            : "border-white/70 bg-white/70"
        }`}
      >
        <div className="flex justify-center">
          <div className="rounded-3xl bg-indigo-500/20 p-4">
            <Sparkles className="text-indigo-500" />
          </div>
        </div>

        <h1
          className={`mt-6 text-center text-4xl font-bold ${
            theme === "dark"
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Welcome Back
        </h1>

        <p
          className={`mt-2 text-center ${
            theme === "dark"
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          Continue your AI conversations.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className={`w-full rounded-xl border px-4 py-3 outline-none ${
              theme === "dark"
                ? "border-slate-700 bg-slate-900 text-white"
                : "border-slate-300 bg-white"
            }`}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className={`w-full rounded-xl border px-4 py-3 outline-none ${
              theme === "dark"
                ? "border-slate-700 bg-slate-900 text-white"
                : "border-slate-300 bg-white"
            }`}
          />

          <Button
            className="w-full py-3"
            type="submit"
          >
            Login
          </Button>
        </form>

        <p
          className={`mt-8 text-center ${
            theme === "dark"
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-500"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;