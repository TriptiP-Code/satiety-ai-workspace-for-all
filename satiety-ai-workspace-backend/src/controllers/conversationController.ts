import { Request, Response } from "express";

import {
  getConversations,
  addConversation,
  updateConversation,
  removeConversation,
} from "../services/conversationService";

export async function getAllConversations(
  req: Request,
  res: Response
) {
  try {
    const workspaceId = String(req.params.workspaceId);
    const userId = (req as any).user.id;

    if (!workspaceId) {
      return res.status(400).json({
        success: false,
        error: "Workspace id is required",
      });
    }

    const conversations =
      await getConversations(workspaceId, userId);

    res.json(conversations);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Unable to fetch conversations",
    });
  }
}

export async function createNewConversation(
  req: Request,
  res: Response
) {
  try {
    const { workspaceId, title } = req.body;
    const userId = (req as any).user.id;

    if (!workspaceId || !title?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Workspace id and title are required",
      });
    }

    const conversation =
      await addConversation(
        workspaceId,
        title.trim(),
        userId
      );

    res.status(201).json(conversation);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Unable to create conversation",
    });
  }
}

export async function editConversation(
  req: Request,
  res: Response
) {
  try {
    const id = String(req.params.id);
    const userId = (req as any).user.id;

    const { title, workspaceId } = req.body;

    if (!title?.trim() && !workspaceId) {
      return res.status(400).json({
        success: false,
        error: "A title or workspace id is required",
      });
    }

    const conversation =
      await updateConversation(
        id,
        userId,
        {
          title: title?.trim(),
          workspaceId,
        }
      );

    res.json(conversation);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error:
        "Unable to rename conversation",
    });
  }
}

export async function removeConversationById(
  req: Request,
  res: Response
) {
  try {
    const id = String(req.params.id);
    const userId = (req as any).user.id;

    await removeConversation(id, userId);

    res.json({
      success: true,
      message:
        "Conversation deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error:
        "Unable to delete conversation",
    });
  }
}
