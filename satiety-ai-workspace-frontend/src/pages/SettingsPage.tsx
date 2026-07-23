import { useTheme } from "../context/ThemeContext";

function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`flex-1 overflow-y-auto p-8 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-4xl">

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p
          className={`mt-2 ${
            theme === "dark"
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          Manage your Satiety preferences.
        </p>

{/* Appearance */}

<div
  className={`mt-8 rounded-xl border p-6 ${
    theme === "dark"
      ? "border-slate-800 bg-slate-900"
      : "border-slate-300 bg-white"
  }`}
>
  <h2 className="text-xl font-semibold">
    Appearance
  </h2>

  <p
    className={`mt-1 text-sm ${
      theme === "dark"
        ? "text-slate-400"
        : "text-slate-600"
    }`}
  >
    Choose your preferred theme.
  </p>

  <div className="mt-6 space-y-3">

    <button
      onClick={() => {
        if (theme === "light") toggleTheme();
      }}
      className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 transition ${
        theme === "dark"
          ? "border-indigo-500 bg-indigo-500/10"
          : "border-slate-300 hover:bg-slate-50"
      }`}
    >
      <span>🌙 Dark</span>

      <div
        className={`h-4 w-4 rounded-full border ${
          theme === "dark"
            ? "border-indigo-500 bg-indigo-500"
            : "border-slate-400"
        }`}
      />
    </button>

    <button
      onClick={() => {
        if (theme === "dark") toggleTheme();
      }}
      className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 transition ${
        theme === "light"
          ? "border-indigo-500 bg-indigo-50"
          : "border-slate-700 hover:bg-slate-800"
      }`}
    >
      <span>☀️ Light</span>

      <div
        className={`h-4 w-4 rounded-full border ${
          theme === "light"
            ? "border-indigo-500 bg-indigo-500"
            : "border-slate-400"
        }`}
      />
    </button>

  </div>
</div>

        {/* AI */}

        <div
          className={`mt-6 rounded-xl border p-6 ${
            theme === "dark"
              ? "border-slate-800 bg-slate-900"
              : "border-slate-300 bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold">
            AI
          </h2>

          <p
            className={`mt-1 ${
              theme === "dark"
                ? "text-slate-400"
                : "text-slate-600"
            }`}
          >
            Satiety AI (Coming Soon)
          </p>
        </div>

        {/* Storage */}

        <div
          className={`mt-6 rounded-xl border p-6 ${
            theme === "dark"
              ? "border-slate-800 bg-slate-900"
              : "border-slate-300 bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold">
            Storage
          </h2>

          <button className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500">
            Clear Conversations
          </button>
        </div>

      </div>
    </div>
  );
}

export default SettingsPage;