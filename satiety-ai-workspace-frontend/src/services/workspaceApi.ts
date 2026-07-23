import { getToken } from "../utils/token";

const API_URL = import.meta.env.VITE_API_URL;



export async function getWorkspacesApi() {
  // const response = await fetch(`${API_URL}/workspaces`, {
  //   headers: {
  //     Authorization: `Bearer ${getToken()}`,
  //   },
  // });

  // if (!response.ok) {
  //   throw new Error("Failed to fetch workspaces");
  // }

  // return response.json();
   const token = getToken();

  console.log("TOKEN =", token);

  const response = await fetch(`${API_URL}/workspaces`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("STATUS =", response.status);

  if (!response.ok) {
    throw new Error("Failed to fetch workspaces");
  }

  return response.json();
}

export async function createWorkspaceApi(name: string) {
  const response = await fetch(`${API_URL}/workspaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create workspace");
  }

  return response.json();
}

export async function renameWorkspaceApi(
  id: string,
  name: string
) {
  const response = await fetch(
    `${API_URL}/workspaces/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        name,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to rename workspace");
  }

  return response.json();
}

export async function deleteWorkspaceApi(id: string) {
  const response = await fetch(
    `${API_URL}/workspaces/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete workspace");
  }

  return response.json();
}