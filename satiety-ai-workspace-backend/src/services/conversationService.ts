import {
  getWorkspaceConversations,
  createConversation,
  renameConversation,
  deleteConversation,
} from "../repositories/conversationRepository";

export async function getConversations(
  workspaceId: string,
  userId: string
) {
  return getWorkspaceConversations(
    workspaceId,
    userId
  );
}

export async function addConversation(
  workspaceId: string,
  title: string,
  userId: string
) {
  return createConversation(
    workspaceId,
    title,
    userId
  );
}

export async function updateConversation(
  id: string,
  userId: string,
  updates: {
    title?: string;
    workspaceId?: string;
  }
) {
  return renameConversation(id, userId, updates);
}

export async function removeConversation(id: string, userId: string) {
  return deleteConversation(id, userId);
}
