import { useRef, useState } from "react";
import {
  Paperclip,
  Send,
  X,
  Folder,
} from "lucide-react";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { useTheme } from "../../context/ThemeContext";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

function ChatInput({
  onSendMessage,
  isLoading,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const { theme } = useTheme();

  function handleSend() {
    if (isLoading) return;

    if (
      !input.trim() &&
      !selectedFile
    )
      return;

    onSendMessage(input);

    setInput("");
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  }

  return (
    <div
  className={`shrink-0 border-t px-4 md:px-8 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-colors duration-300 ${
    theme === "dark"
      ? "border-slate-800 bg-slate-950"
      : "border-slate-300 bg-white"
  }`}
>
      {/* Attachment Preview */}

      {selectedFile && (
        <div className="mx-auto mb-4 flex max-w-4xl">
          <div
            className={`flex items-center gap-3 rounded-lg border px-4 py-2 ${
              theme === "dark"
                ? "border-slate-700 bg-slate-800"
                : "border-slate-300 bg-slate-100"
            }`}
          >
            <Folder
  size={16}
  className={
    theme === "dark"
      ? "text-indigo-400"
      : "text-indigo-600"
  }
/>

            <span className="max-w-xs truncate text-sm">
              {selectedFile.name}
            </span>

            <button
              onClick={() => {
                setSelectedFile(null);

                if (fileInputRef.current) {
                  fileInputRef.current.value =
                    "";
                }
              }}
              className="rounded p-1 transition hover:bg-red-500 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-4xl items-center gap-3">

        {/* Hidden File Input */}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />

        <Button
          variant="secondary"
          className="px-3"
          disabled={isLoading}
          onClick={() =>
            fileInputRef.current?.click()
          }
        >
          <Paperclip size={18} />
        </Button>

        <Input
          placeholder={
            isLoading
              ? "Satiety is thinking..."
              : "Ask anything..."
          }
          value={input}
          disabled={isLoading}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !isLoading
            ) {
              handleSend();
            }
          }}
        />

        <Button
          className="px-3"
          onClick={handleSend}
          disabled={isLoading}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}

export default ChatInput;