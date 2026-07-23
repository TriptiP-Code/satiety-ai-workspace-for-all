import { useEffect, useRef, useState } from "react";
import { FolderPlus } from "lucide-react";

import Button from "../ui/Button";

import type { Conversation } from "../../types/conversation";
import type { Workspace } from "../../types/workspace";

import ConversationList from "../sidebar/ConversationList";
import WorkspaceSection from "../sidebar/WorkspaceSection";

import { useNavigate } from "react-router-dom";

interface SidebarProps {
  workspaces: Workspace[];
  conversations: Conversation[];

  activeConversationId: string;

  selectedWorkspaceId: string;
  theme: "dark" | "light";

  onNewChat: () => void;
  onNewWorkspace: () => void;

  onMoveConversation: (
  conversationId: string,
  workspaceId: string
) => void;

onSelectWorkspace: (workspaceId: string) => void;

onRenameWorkspace: (
  workspaceId: string,
  newName: string
) => void;

onDeleteWorkspace: (
  workspaceId: string
) => void;

onDeleteConversation: (id: string) => void;
  onRenameConversation: (
    id: string,
    title: string
  ) => void;

  onSelectConversation: (id: string) => void;
  sidebarOpen: boolean;
setSidebarOpen: React.Dispatch<
  React.SetStateAction<boolean>
>;
}

function Sidebar({
  workspaces,
  conversations,
  activeConversationId,
  selectedWorkspaceId,
  theme,
  onNewChat,
  onNewWorkspace,
  onSelectWorkspace,
  onRenameWorkspace,
  onDeleteWorkspace,
  onDeleteConversation,
  onRenameConversation,
  onSelectConversation,
  onMoveConversation,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

const [expandedWorkspaceId, setExpandedWorkspaceId] =
  useState<string | null>(null);

const workspaceRefs = useRef<
  Record<string, HTMLDivElement | null>
>({});

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

const groupedWorkspaces = workspaces.map((workspace) => {
  const workspaceConversations =
    filteredConversations.filter(
      (conversation) =>
        conversation.workspaceId === workspace.id
    );

  return {
    workspace,
    conversations: workspaceConversations,
    hasSearchResult:
      search.trim() !== "" &&
      workspaceConversations.length > 0,
  };
});

useEffect(() => {
  if (!search.trim()) return;

  const firstMatch = groupedWorkspaces.find(
    (group) => group.hasSearchResult
  );

  if (!firstMatch) return;

  requestAnimationFrame(() => {
    workspaceRefs.current[
      firstMatch.workspace.id
    ]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}, [search, groupedWorkspaces]);

  return (
    <aside
  className={`
    fixed left-0 top-0 z-40 h-[100dvh] overflow-hidden
    w-72 lg:w-80
    transform transition-all duration-300
    ${
      sidebarOpen
        ? "translate-x-0"
        : "-translate-x-full"
    }
    lg:translate-x-0
    lg:static
    lg:flex
    flex shrink-0 flex-col border-r
    ${
      theme === "dark"
        ? "border-slate-800 bg-slate-900"
        : "border-slate-300 bg-slate-100"
    }
  `}
>
      {/* Header */}
      <div className={`flex h-16 items-center border-b px-6 ${
  theme === "dark"
    ? "border-slate-800"
    : "border-slate-300"
}`}>
        <div>
          <h1 className="text-xl font-bold text-indigo-400">
            Satiety
          </h1>

          <p className={`text-xs ${
  theme === "dark"
    ? "text-slate-400"
    : "text-slate-600"
}`}>
            Your AI Workspace
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="shrink-0 space-y-4 p-4">
        <Button
          className="w-full"
          onClick={() => {
  onNewChat();

  if (window.innerWidth < 1024) {
    setSidebarOpen(false);
  }
}}
        >
          + New Chat
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          onClick={onNewWorkspace}
        >
          <FolderPlus size={18} />

          <span className="ml-2">
            New Workspace
          </span>
        </Button>

        <input
          type="text"
          placeholder="🔍 Search conversations..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${
  theme === "dark"
    ? "border-slate-700 bg-slate-800 text-white focus:border-indigo-500"
    : "border-slate-300 bg-white text-slate-900 focus:border-indigo-500"
}`}
        />
      </div>

      {/* Workspaces */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
        <p className={`mb-3 text-xs font-semibold uppercase tracking-wide ${
  theme === "dark"
    ? "text-slate-500"
    : "text-slate-600"
}`}>
          Recent Chats
        </p>

        <div className="space-y-4">
          {groupedWorkspaces.map(
  ({
    workspace,
    conversations,
    hasSearchResult,
  }) => (
              <div
  key={workspace.id}
  ref={(element) => {
    workspaceRefs.current[workspace.id] =
      element;
  }}
>
<WorkspaceSection
 theme={theme}
  name={workspace.name}
  isSystem={workspace.isSystem ?? false}
  isSelected={
    selectedWorkspaceId === workspace.id
  }
  isExpanded={
    expandedWorkspaceId === workspace.id ||
    hasSearchResult
  }
  onClick={() => {
    onSelectWorkspace(workspace.id);

    setExpandedWorkspaceId((prev) =>
      prev === workspace.id
        ? null
        : workspace.id
    );
  }}
  onRename={() => {
    const name = prompt(
      "Rename workspace",
      workspace.name
    );

    if (!name) return;

    onRenameWorkspace(
      workspace.id,
      name
    );
  }}
  onDelete={() => {
    if (
      confirm(
        `Delete "${workspace.name}" workspace?`
      )
    ) {
      onDeleteWorkspace(workspace.id);
    }
  }}
/>
{(
  expandedWorkspaceId === workspace.id ||
  hasSearchResult
) && (
                  <ConversationList
                    conversations={
                      conversations
                    }
                    activeConversationId={
                      activeConversationId
                    }
                    workspaces={workspaces}
                    onMoveConversation={onMoveConversation}
                    selectedWorkspaceId={
                      selectedWorkspaceId
                    }
                    workspaceId={workspace.id}
                    onSelectWorkspace={
                      onSelectWorkspace
                    }
                    onDeleteConversation={
                      onDeleteConversation
                    }
                    onRenameConversation={
                      onRenameConversation
                    }
                    onSelectConversation={
                      onSelectConversation
                    }
                    theme={theme}
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <div
  className={`shrink-0 border-t px-4 pt-4 pb-8 md:pb-4 ${
    theme === "dark"
      ? "border-slate-800 bg-slate-900"
      : "border-slate-300 bg-slate-100"
  }`}
>
  <button
  onClick={() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);

      setTimeout(() => {
        navigate("/settings");
      }, 250); // matches your sidebar animation
    } else {
      navigate("/settings");
    }
  }}
  className={`w-full rounded-lg px-3 py-3 text-left text-sm transition ${
    theme === "dark"
      ? "hover:bg-slate-800"
      : "hover:bg-slate-200"
  }`}
>
  ⚙ Settings
</button>
</div>
    </aside>
  );
}

export default Sidebar;