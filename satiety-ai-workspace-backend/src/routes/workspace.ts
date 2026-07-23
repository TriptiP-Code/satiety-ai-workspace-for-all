import { Router } from "express";

import {
  getAllWorkspaces,
  createNewWorkspace,
  editWorkspace,
  removeWorkspaceById,
} from "../controllers/workspaceController";

import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

router.get("/", getAllWorkspaces);

router.post("/", createNewWorkspace);

router.patch("/:id", editWorkspace);

router.delete("/:id", removeWorkspaceById);

export default router;