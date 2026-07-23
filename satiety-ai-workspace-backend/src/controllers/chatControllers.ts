import { Request, Response } from "express";
import { generateResponse } from "../services/gemini";

export async function chat(req: Request, res: Response) {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Messages array is required.",
      });
    }

    const reply = await generateResponse(messages);

    return res.json({
      reply,
    });
  } catch (error: any) {
    console.error("Chat Controller Error:", error);

    if (error?.status === 503) {
      return res.status(503).json({
        error:
          "Satiety AI is currently experiencing high demand. Please try again later.",
      });
    }

    if (error?.status === 401) {
      return res.status(500).json({
        error:
          "AI configuration error.",
      });
    }

    if (error?.status === 429) {
      return res.status(429).json({
        error:
          "Rate limit reached. Please try again shortly.",
      });
    }

    return res.status(500).json({
      error:
        "Something went wrong while generating the response.",
    });
  }
}