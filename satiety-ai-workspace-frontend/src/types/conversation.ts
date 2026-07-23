import type { Message } from "./chat";

export interface Conversation {
  id: string;
  title: string;
  workspace: string;

  // NEW
  workspaceId: string;

  messages: Message[];
}