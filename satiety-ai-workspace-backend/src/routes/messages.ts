import { Router } from "express";

import {
  createNewMessage,
  deleteMessageById,
  deleteMessagesForConversation,
  getAllMessages,
} from "../controllers/messageController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

router.get("/:conversationId", getAllMessages);
router.post("/", createNewMessage);

// This supports a future "clear chat" action.
router.delete(
  "/conversation/:conversationId",
  deleteMessagesForConversation
);
router.delete("/:id", deleteMessageById);

export default router;
