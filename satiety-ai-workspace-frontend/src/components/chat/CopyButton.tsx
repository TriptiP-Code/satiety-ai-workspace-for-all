import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-md p-1 text-slate-400 transition hover:bg-slate-700 hover:text-white"
    >
      {copied ? (
        <Check size={16} />
      ) : (
        <Copy size={16} />
      )}
    </button>
  );
}

export default CopyButton;