import type { Message } from "../types/chat";
import { getToken } from "../utils/token";

const API_URL = import.meta.env.VITE_API_URL;

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

async function parseResponse(response: Response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Message request failed");
  }

  return data;
}

export async function getMessagesApi(conversationId: string) {
  const response = await fetch(`${API_URL}/messages/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

export async function createMessageApi(
  conversationId: string,
  role: Message["role"],
  content: string
) {
  const response = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ conversationId, role, content }),
  });

  return parseResponse(response);
}

export async function deleteMessageApi(id: string) {
  const response = await fetch(`${API_URL}/messages/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

export async function clearConversationMessagesApi(
  conversationId: string
) {
  const response = await fetch(
    `${API_URL}/messages/conversation/${conversationId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return parseResponse(response);
}
