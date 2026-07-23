import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Conversation } from "../../types/conversation";
import type { Workspace } from "../../types/workspace";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import {
  createWorkspaceApi,
  deleteWorkspaceApi,
  getWorkspacesApi,
  renameWorkspaceApi,
} from "../../services/workspaceApi";
import {
  createConversationApi,
  deleteConversationApi,
  getConversationsApi,
  updateConversationApi,
} from "../../services/conversationApi";

const THEME_KEY = "satiety-theme";

function AppLayout() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] =
    useState<string | null>(null);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setWorkspaces([]);
      setConversations([]);
      setActiveConversationId(null);
      setSelectedWorkspaceId("");
      return;
    }

    let cancelled = false;

    async function loadWorkspaceData() {
      try {
        const workspaceData = await getWorkspacesApi();
        const formattedWorkspaces: Workspace[] = workspaceData.map(
          (workspace: any) => ({
            id: workspace.id,
            name: workspace.name,
            isSystem: workspace.is_system,
          })
        );

        const conversationGroups = await Promise.all(
          formattedWorkspaces.map(async (workspace) => {
            const workspaceConversations =
              await getConversationsApi(workspace.id);

            return workspaceConversations.map((conversation: any) => ({
              id: conversation.id,
              title: conversation.title,
              workspaceId: workspace.id,
              workspace: workspace.name,
              // Messages are migrated in the next step.
              messages: [],
            }));
          })
        );

        if (cancelled) return;

        const loadedConversations = conversationGroups.flat();

        setWorkspaces(formattedWorkspaces);
        setConversations(loadedConversations);
        setSelectedWorkspaceId(formattedWorkspaces[0]?.id ?? "");
        setActiveConversationId(loadedConversations[0]?.id ?? null);
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          alert("Unable to load your workspaces and conversations.");
        }
      }
    }

    loadWorkspaceData();

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId
  );

  async function handleNewWorkspace() {
    const name = prompt("Workspace name");

    if (!name?.trim()) return;

    try {
      const workspace = await createWorkspaceApi(name.trim());
      const newWorkspace: Workspace = {
        id: workspace.id,
        name: workspace.name,
        isSystem: workspace.is_system,
      };

      setWorkspaces((previous) => [...previous, newWorkspace]);
      setSelectedWorkspaceId(newWorkspace.id);
    } catch (error) {
      console.error(error);
      alert("Unable to create workspace");
    }
  }

  async function handleNewChat() {
    const workspace =
      workspaces.find((item) => item.id === selectedWorkspaceId) ??
      workspaces[0];

    if (!workspace) {
      alert("Create a workspace before starting a chat.");
      return;
    }

    try {
      const conversation = await createConversationApi(
        workspace.id,
        "New Chat"
      );

      const newConversation: Conversation = {
        id: conversation.id,
        title: conversation.title,
        workspaceId: workspace.id,
        workspace: workspace.name,
        messages: [],
      };

      setConversations((previous) => [
        newConversation,
        ...previous,
      ]);
      setActiveConversationId(newConversation.id);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Unable to create conversation");
    }
  }

  async function handleRenameWorkspace(
    workspaceId: string,
    newName: string
  ) {
    const workspace = workspaces.find((item) => item.id === workspaceId);

    if (workspace?.isSystem) return;

    const name = newName.trim();
    if (!name) return;

    try {
      await renameWorkspaceApi(workspaceId, name);

      setWorkspaces((previous) =>
        previous.map((item) =>
          item.id === workspaceId ? { ...item, name } : item
        )
      );
      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.workspaceId === workspaceId
            ? { ...conversation, workspace: name }
            : conversation
        )
      );
    } catch (error) {
      console.error(error);
      alert("Unable to rename workspace");
    }
  }

  async function handleDeleteWorkspace(workspaceId: string) {
    const workspace = workspaces.find((item) => item.id === workspaceId);

    if (workspace?.isSystem) return;

    try {
      await deleteWorkspaceApi(workspaceId);

      const remainingWorkspaces = workspaces.filter(
        (item) => item.id !== workspaceId
      );
      const remainingConversations = conversations.filter(
        (conversation) => conversation.workspaceId !== workspaceId
      );

      setWorkspaces(remainingWorkspaces);
      setConversations(remainingConversations);
      setSelectedWorkspaceId(remainingWorkspaces[0]?.id ?? "");
      setActiveConversationId(remainingConversations[0]?.id ?? null);
    } catch (error) {
      console.error(error);
      alert("Unable to delete workspace");
    }
  }

  async function handleDeleteConversation(id: string) {
    const index = conversations.findIndex(
      (conversation) => conversation.id === id
    );
    const remaining = conversations.filter(
      (conversation) => conversation.id !== id
    );

    try {
      await deleteConversationApi(id);
      setConversations(remaining);

      if (activeConversationId === id) {
        const nextConversation =
          remaining[index] ?? remaining[index - 1];
        setActiveConversationId(nextConversation?.id ?? null);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete conversation");
    }
  }

  async function handleRenameConversation(id: string, newTitle: string) {
    const title = newTitle.trim() || "New Chat";

    try {
      const updatedConversation = await updateConversationApi(id, { title });

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === id
            ? { ...conversation, title: updatedConversation.title }
            : conversation
        )
      );
    } catch (error) {
      console.error(error);
      alert("Unable to rename conversation");
    }
  }

  async function handleMoveConversation(
    conversationId: string,
    workspaceId: string
  ) {
    const workspace = workspaces.find((item) => item.id === workspaceId);
    if (!workspace) return;

    try {
      await updateConversationApi(conversationId, { workspaceId });

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                workspaceId: workspace.id,
                workspace: workspace.name,
              }
            : conversation
        )
      );
    } catch (error) {
      console.error(error);
      alert("Unable to move conversation");
    }
  }

  return (
    <div
      className={`flex h-[100dvh] overflow-hidden transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        conversations={conversations}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        theme={theme}
        workspaces={workspaces}
        selectedWorkspaceId={selectedWorkspaceId}
        onSelectWorkspace={setSelectedWorkspaceId}
        activeConversationId={activeConversationId ?? ""}
        onNewChat={handleNewChat}
        onNewWorkspace={handleNewWorkspace}
        onRenameWorkspace={handleRenameWorkspace}
        onMoveConversation={handleMoveConversation}
        onDeleteWorkspace={handleDeleteWorkspace}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        onSelectConversation={(id) => {
          setActiveConversationId(id);
          navigate("/");

          if (window.innerWidth < 1024) {
            setSidebarOpen(false);
          }
        }}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex h-0 flex-1 overflow-hidden">
          <Outlet
            context={{
              activeConversation,
              conversations,
              setConversations,
              isLoading,
              setIsLoading,
            }}
          />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
