import { Request, Response } from "express";

import {
  getWorkspaces,
  addWorkspace,
  updateWorkspace,
  removeWorkspace,
} from "../services/workspaceService";

export async function getAllWorkspaces(
  req: Request,
  res: Response
) {
  try {
    const userId = (req as any).user.id;

    const workspaces = await getWorkspaces(userId);

    return res.json(workspaces);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Unable to fetch workspaces",
    });
  }
}

export async function createNewWorkspace(
  req: Request,
  res: Response
) {
  try {
    const userId = (req as any).user.id;

    if (!req.body || !req.body.name) {
      return res.status(400).json({
        success: false,
        error: "Workspace name is required",
      });
    }

    const { name } = req.body;

    const workspace = await addWorkspace(userId, name);

    return res.status(201).json(workspace);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Unable to create workspace",
    });
  }
}

export async function editWorkspace(
  req: Request,
  res: Response
) {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Workspace id is required",
      });
    }

    if (!req.body || !req.body.name) {
      return res.status(400).json({
        success: false,
        error: "Workspace name is required",
      });
    }

    const { name } = req.body;

    const workspace = await updateWorkspace(id, name);

    return res.json(workspace);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Unable to rename workspace",
    });
  }
}

export async function removeWorkspaceById(
  req: Request,
  res: Response
) {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Workspace id is required",
      });
    }

    await removeWorkspace(id);

    return res.json({
      success: true,
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Unable to delete workspace",
    });
  }
}