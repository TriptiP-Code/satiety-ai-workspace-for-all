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
    throw new Error(data.error || "Conversation request failed");
  }

  return data;
}

export async function getConversationsApi(workspaceId: string) {
  const response = await fetch(
    `${API_URL}/conversations/${workspaceId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return parseResponse(response);
}

export async function createConversationApi(
  workspaceId: string,
  title: string
) {
  const response = await fetch(`${API_URL}/conversations`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ workspaceId, title }),
  });

  return parseResponse(response);
}

export async function updateConversationApi(
  id: string,
  updates: { title?: string; workspaceId?: string }
) {
  const response = await fetch(`${API_URL}/conversations/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(updates),
  });

  return parseResponse(response);
}

export async function deleteConversationApi(id: string) {
  const response = await fetch(`${API_URL}/conversations/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}
