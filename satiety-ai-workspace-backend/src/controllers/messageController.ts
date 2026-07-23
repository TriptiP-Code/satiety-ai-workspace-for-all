import { Request, Response } from "express";

import {
  addMessage,
  clearMessages,
  getMessages,
  removeMessage,
} from "../services/messageService";

function getRouteParameter(
  value: string | string[] | undefined
) {
  return Array.isArray(value) ? value[0] : value;
}

function sendMessageError(res: Response, error: unknown) {
  console.error(error);

  const message =
    error instanceof Error
      ? error.message
      : "Unable to process message request";

  const status =
    message === "Conversation not found" ||
    message === "Message not found"
      ? 404
      : 500;

  return res.status(status).json({
    success: false,
    error: message,
  });
}

export async function getAllMessages(req: Request, res: Response) {
  const conversationId = getRouteParameter(req.params.conversationId);

  if (!conversationId) {
    return res.status(400).json({
      success: false,
      error: "Conversation id is required",
    });
  }

  try {
    const userId = (req as any).user.id;
    const messages = await getMessages(conversationId, userId);

    return res.json(messages);
  } catch (error) {
    return sendMessageError(res, error);
  }
}

export async function createNewMessage(req: Request, res: Response) {
  const { conversationId, role, content } = req.body;

  if (!conversationId || !content?.trim()) {
    return res.status(400).json({
      success: false,
      error: "Conversation id and message content are required",
    });
  }

  if (role !== "user" && role !== "assistant") {
    return res.status(400).json({
      success: false,
      error: "Message role must be user or assistant",
    });
  }

  try {
    const userId = (req as any).user.id;
    const message = await addMessage(
      conversationId,
      userId,
      role,
      content.trim()
    );

    return res.status(201).json(message);
  } catch (error) {
    return sendMessageError(res, error);
  }
}

export async function deleteMessageById(req: Request, res: Response) {
  const id = getRouteParameter(req.params.id);

  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Message id is required",
    });
  }

  try {
    const userId = (req as any).user.id;
    await removeMessage(id, userId);

    return res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    return sendMessageError(res, error);
  }
}

export async function deleteMessagesForConversation(
  req: Request,
  res: Response
) {
  const conversationId = getRouteParameter(req.params.conversationId);

  if (!conversationId) {
    return res.status(400).json({
      success: false,
      error: "Conversation id is required",
    });
  }

  try {
    const userId = (req as any).user.id;
    await clearMessages(conversationId, userId);

    return res.json({
      success: true,
      message: "Messages deleted successfully",
    });
  } catch (error) {
    return sendMessageError(res, error);
  }
}
