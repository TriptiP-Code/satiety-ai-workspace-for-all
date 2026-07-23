import { Router } from "express";

import {
  getAllConversations,
  createNewConversation,
  editConversation,
  removeConversationById,
} from "../controllers/conversationController";

import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

router.get("/:workspaceId", getAllConversations);

router.post("/", createNewConversation);

router.patch("/:id", editConversation);

router.delete("/:id", removeConversationById);

export default router;
