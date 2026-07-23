import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get(
  "/me",
  authenticate,
  (req, res) => {
    res.json({
      success: true,
      user: (req as any).user,
    });
  }
);

export default router;