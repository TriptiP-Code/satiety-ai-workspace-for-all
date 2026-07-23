import {
  Request,
  Response,
  NextFunction,
} from "express";

import { supabaseAdmin } from "../config/supabase";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Authorization header missing or invalid",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    const { data, error } =
      await supabaseAdmin.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        success: false,
        error: error?.message ?? "Invalid token",
      });
    }

    (req as any).user = data.user;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      error: "Authentication failed",
    });
  }
}