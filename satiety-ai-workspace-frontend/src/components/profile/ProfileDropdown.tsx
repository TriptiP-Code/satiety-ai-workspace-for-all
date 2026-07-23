import { User, Settings, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  open: boolean;
}

function ProfileDropdown({ open }: Props) {
  const { theme } = useTheme();

  if (!open) return null;

  return (
    <div
      className={`absolute right-0 top-14 w-64 rounded-xl border shadow-xl overflow-hidden transition-all duration-200 ${
        theme === "dark"
          ? "border-slate-700 bg-slate-900"
          : "border-slate-300 bg-white"
      }`}
    >
      {/* User */}

      <div
        className={`px-4 py-4 border-b ${
          theme === "dark"
            ? "border-slate-700"
            : "border-slate-200"
        }`}
      >
        <p
          className={`font-semibold ${
            theme === "dark"
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Tripti
        </p>

        <p
          className={`text-sm ${
            theme === "dark"
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          Welcome back 👋
        </p>
      </div>

      {/* Items */}

      <button
        className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition ${
          theme === "dark"
            ? "hover:bg-slate-800 text-slate-200"
            : "hover:bg-slate-100 text-slate-700"
        }`}
      >
        <User size={18} />
        Profile
      </button>

      <button
        className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition ${
          theme === "dark"
            ? "hover:bg-slate-800 text-slate-200"
            : "hover:bg-slate-100 text-slate-700"
        }`}
      >
        <Settings size={18} />
        Settings
      </button>

      <button
  className={`flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 transition ${
    theme === "dark"
      ? "hover:bg-slate-800"
      : "hover:bg-slate-100"
  }`}
>
  <LogOut size={18} />
  Logout
</button>
    </div>
  );
}

export default ProfileDropdown;