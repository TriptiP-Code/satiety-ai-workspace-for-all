import { Router } from "express";
import { supabaseAdmin } from "../config/supabase";

const router = Router();

router.get("/", async (_, res) => {
  try {
    console.log("Health endpoint hit");
    const { error } = await supabaseAdmin
      .from("workspaces")
      .select("id")
      .limit(1);

    if (error) {
      return res.status(500).json({
        status: "error",
        database: "disconnected",
        message: error.message,
      });
    }

    return res.json({
      status: "ok",
      database: "connected",
      message: "Supabase connection successful 🚀",
    });

  } catch (error: any) {
    console.error("============== ERROR ==============");
    console.error(error);

    console.error("CAUSE:");
    console.error(error.cause);

    console.error("STACK:");
    console.error(error.stack);

    return res.status(500).json({
      status: "error",
      database: "disconnected",
      message: error.toString(),
    });
  }
});

export default router;