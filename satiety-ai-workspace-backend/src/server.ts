import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chat";
import healthRoutes from "./routes/health";

import authRoutes from "./routes/auth";

import userRoutes from "./routes/user";

import workspaceRoutes from "./routes/workspace";

import conversationRoutes from "./routes/conversation"

import messageRoutes from "./routes/messages";

const app = express();

app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Health
|--------------------------------------------------------------------------
*/

app.use("/api/health", healthRoutes);

/*
|--------------------------------------------------------------------------
| Chat
|--------------------------------------------------------------------------
*/

app.use("/api/chat", chatRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/workspaces", workspaceRoutes);

app.use("/api/conversations", conversationRoutes);

app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Satiety Backend running on port ${PORT}`);
});