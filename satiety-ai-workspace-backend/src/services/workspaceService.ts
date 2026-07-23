import {
  getUserWorkspaces,
  createWorkspace,
  renameWorkspace,
  deleteWorkspace,
} from "../repositories/workspaceRepository";

export async function getWorkspaces(
  userId: string
) {
  return getUserWorkspaces(userId);
}

export async function addWorkspace(
  userId: string,
  name: string
) {
  return createWorkspace(userId, name);
}

export async function updateWorkspace(
  id: string,
  name: string
) {
  return renameWorkspace(id, name);
}

export async function removeWorkspace(
  id: string
) {
  return deleteWorkspace(id);
}