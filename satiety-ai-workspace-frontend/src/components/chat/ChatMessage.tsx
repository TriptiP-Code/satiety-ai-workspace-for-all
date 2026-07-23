import type { Message } from "../../types/chat";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import MarkdownComponents from "./MarkdownComponents";
import CopyButton from "./CopyButton";

import { useTheme } from "../../context/ThemeContext";

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message }: ChatMessageProps) {
  const { theme } = useTheme();

  const isUser = message.role === "user";

  return (
    <div
      className={`mb-6 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className="w-full max-w-4xl">
        <div className="mb-2 flex items-center justify-between px-1">
          <span
            className={`text-xs font-semibold ${
              theme === "dark"
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >
            {isUser ? "You" : "Satiety AI"}
          </span>

          <CopyButton text={message.content} />
        </div>

       <div
  className={`rounded-2xl px-5 py-4 transition-colors duration-300 ${
    isUser
      ? theme === "dark"
        ? "bg-indigo-600 text-white"
        : "bg-indigo-100 border border-indigo-300 text-slate-900"
      : theme === "dark"
      ? "bg-slate-800 text-slate-100"
      : "bg-white border border-slate-300 text-slate-900 shadow-sm"
  }`}
>
          <div className="markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;