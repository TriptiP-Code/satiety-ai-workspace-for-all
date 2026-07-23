import { useEffect, useRef, useState } from "react";
import {
  Pencil,
  Trash2,
  FolderInput,
} from "lucide-react";

import type { Conversation } from "../../types/conversation";
import type { Workspace } from "../../types/workspace";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  theme: "dark" | "light";
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (
    id: string,
    title: string
  ) => void;
  workspaces: Workspace[];

onMove: (
  conversationId: string,
  workspaceId: string
) => void;
}

function ConversationItem({
  conversation,
  isActive,
  theme,
  onSelect,
  onDelete,
  onRename,
  workspaces,
  onMove,
}: ConversationItemProps) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [title, setTitle] = useState(
    conversation.title
  );

  const inputRef =
    useRef<HTMLInputElement>(null);

    const [showMoveMenu, setShowMoveMenu] =
  useState(false);

  useEffect(() => {
    setTitle(conversation.title);
  }, [conversation.title]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  function saveTitle() {
    onRename(conversation.id, title);
    setIsEditing(false);
  }

  function cancelEditing() {
    setTitle(conversation.title);
    setIsEditing(false);
  }

  return (
    <div
  className={`relative group flex items-center rounded-lg transition ${
    isActive
      ? theme === "dark"
        ? "bg-indigo-600"
        : "bg-indigo-100"
      : theme === "dark"
      ? "hover:bg-slate-800"
      : "hover:bg-slate-200"
  }`}
>
      {isEditing ? (
        <input
          ref={inputRef}
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          onBlur={saveTitle}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              saveTitle();

            if (e.key === "Escape")
              cancelEditing();
          }}
          className={`flex-1 rounded-lg px-3 py-2 text-sm outline-none ${
            theme === "dark"
              ? "bg-slate-700 text-white"
              : "bg-white border border-slate-300 text-slate-900"
          }`}
        />
      ) : (
        <>
          <button
            onClick={() =>
              onSelect(conversation.id)
            }
            onDoubleClick={() =>
              setIsEditing(true)
            }
            className={`flex-1 truncate px-3 py-2 text-left text-sm ${
  isActive
    ? theme === "dark"
      ? "text-white"
      : "text-indigo-700"
    : theme === "dark"
    ? "text-slate-300"
    : "text-slate-700"
}`}
          >
            {conversation.title}
          </button>

          <div
  className="
    mr-2
    flex
    items-center
    gap-1
    lg:opacity-0
    lg:group-hover:opacity-100
    transition-opacity
  "
>
            <button
              onClick={() =>
                setIsEditing(true)
              }
              className={`rounded p-1 transition ${
                theme === "dark"
                  ? "text-slate-400 hover:bg-slate-700 hover:text-white"
                  : "text-slate-500 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              <Pencil size={15} />
            </button>

            <button
              onClick={() =>
                onDelete(conversation.id)
              }
              className="rounded p-1 text-red-500 transition hover:bg-red-600 hover:text-white"
            >
              <Trash2 size={15} />
            </button>
            <button
  onClick={() => {
    setShowMoveMenu(!showMoveMenu);
  }}
  className={`rounded p-1 transition ${
  theme === "dark"
    ? "text-slate-400 hover:bg-slate-700 hover:text-white"
    : "text-slate-500 hover:bg-slate-200 hover:text-slate-900"
}`}
>
  <FolderInput size={15} />
</button>
{showMoveMenu && (
  <div
    className={`absolute right-0 top-full mt-1 z-50 w-44 rounded-lg border shadow-xl ${
  theme === "dark"
    ? "border-slate-700 bg-slate-800"
    : "border-slate-300 bg-white"
}`}
  >
    {workspaces
  .filter(
    (workspace) =>
      workspace.id !== conversation.workspaceId
  )
  .map((workspace) => (
      <button
        key={workspace.id}
        onClick={() => {
          onMove(
            conversation.id,
            workspace.id
          );

          setShowMoveMenu(false);
        }}
        className={`block w-full px-8 py-2 text-left text-sm ${
          theme === "dark"
            ? "hover:bg-slate-700"
            : "hover:bg-slate-100"
        }`}
      >
        📁 {workspace.name}
      </button>
    ))}
  </div>
)}
          </div>
        </>
      )}
    </div>
  );
}

export default ConversationItem;