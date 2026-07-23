import {
  createMessage,
  deleteConversationMessages,
  deleteMessage,
  getConversationMessages,
} from "../repositories/messageRepository";

export async function getMessages(
  conversationId: string,
  userId: string
) {
  return getConversationMessages(conversationId, userId);
}

export async function addMessage(
  conversationId: string,
  userId: string,
  role: "user" | "assistant",
  content: string
) {
  return createMessage(conversationId, userId, role, content);
}

export async function removeMessage(id: string, userId: string) {
  return deleteMessage(id, userId);
}

export async function clearMessages(
  conversationId: string,
  userId: string
) {
  return deleteConversationMessages(conversationId, userId);
}
