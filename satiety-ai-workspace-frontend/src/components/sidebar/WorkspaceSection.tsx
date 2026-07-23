import { useEffect, useRef, useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

interface WorkspaceSectionProps {
  name: string;
  isSelected: boolean;
  isExpanded: boolean;
  isSystem: boolean;

  theme: "dark" | "light";

  onClick: () => void;

  onRename: () => void;
  onDelete: () => void;
}

function WorkspaceSection({
  name,
  isSelected,
  isExpanded,
  theme,
  isSystem,

  onClick,

  onRename,
  onDelete,
}: WorkspaceSectionProps) {
  const [showMenu, setShowMenu] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  return (
    <div
      ref={menuRef}
      className="group relative"
    >
      <div
        className={`flex w-full items-center justify-between rounded-md px-3 py-2 transition-colors duration-300 ${
          isSelected
            ? theme === "dark"
              ? "bg-slate-800 text-indigo-400"
              : "bg-indigo-100 text-indigo-600"
            : theme === "dark"
            ? "text-slate-300 hover:bg-slate-800"
            : "text-slate-700 hover:bg-slate-200"
        }`}
      >
        {/* Workspace Button */}
        <button
          onClick={onClick}
          className="flex flex-1 items-center gap-2 overflow-hidden text-left"
        >
          <span className="text-lg">
            {isExpanded ? "📂" : "📁"}
          </span>

          <span className="truncate text-sm font-medium">
            {name}
          </span>
        </button>

        {/* Menu Button */}
        {!isSystem && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      setShowMenu((prev) => !prev);
    }}
    className={`
      rounded p-1 transition
      opacity-100 lg:opacity-0
      lg:group-hover:opacity-100
      ${
        theme === "dark"
          ? "hover:bg-slate-700"
          : "hover:bg-slate-300"
      }
    `}
  >
    <MoreHorizontal size={16} />
  </button>
)}
      </div>

      {showMenu && (
        <div
          className={`absolute right-2 top-11 z-50 w-40 rounded-lg border shadow-xl ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800"
              : "border-slate-300 bg-white"
          }`}
        >
          <button
            onClick={() => {
              setShowMenu(false);
              onRename();
            }}
            className={`flex w-full items-center gap-2 px-3 py-2 text-sm ${
              theme === "dark"
                ? "hover:bg-slate-700"
                : "hover:bg-slate-100"
            }`}
          >
            <Pencil size={15} />
            Rename
          </button>

          <button
            onClick={() => {
              setShowMenu(false);
              onDelete();
            }}
            className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 ${
              theme === "dark"
                ? "hover:bg-slate-700"
                : "hover:bg-slate-100"
            }`}
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default WorkspaceSection;