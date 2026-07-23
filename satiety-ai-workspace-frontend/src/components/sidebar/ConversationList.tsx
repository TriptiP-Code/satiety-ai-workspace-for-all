import type { Conversation } from "../../types/conversation";
import ConversationItem from "./ConversationItem";
import type { Workspace } from "../../types/workspace";

interface ConversationListProps {
  conversations: Conversation[];

  activeConversationId: string;

  workspaceId: string;
  selectedWorkspaceId: string;

  theme: "dark" | "light";

  onSelectWorkspace: (
    workspaceId: string
  ) => void;

  onSelectConversation: (
    id: string
  ) => void;

  onDeleteConversation: (
    id: string
  ) => void;

  onRenameConversation: (
    id: string,
    title: string
  ) => void;

  workspaces: Workspace[];

onMoveConversation: (
  conversationId: string,
  workspaceId: string
) => void;
}


function ConversationList({
  conversations,
  activeConversationId,
  theme,
  workspaces,
  onSelectConversation,
  onMoveConversation,
  onDeleteConversation,
  onRenameConversation,
}: ConversationListProps) {
  return (
    <div>
      <div className="mt-2 space-y-1">
        {conversations.map(
          (conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={
                conversation
              }
              theme={theme}
              isActive={
                activeConversationId ===
                conversation.id
              }
               workspaces={workspaces}
               onMove={onMoveConversation}
              onSelect={
                onSelectConversation
              }
              onDelete={
                onDeleteConversation
              }
              onRename={
                onRenameConversation
              }
            />
          )
        )}
      </div>
    </div>
  );
}

export default ConversationList;