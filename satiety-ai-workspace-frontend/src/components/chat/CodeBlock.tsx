import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  language: string;
  value: string;
}

function CodeBlock({
  language,
  value,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-slate-700">
      <div className="flex items-center justify-between bg-slate-900 px-4 py-2 text-sm">
        <span className="text-slate-400">
          {language || "text"}
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded px-2 py-1 hover:bg-slate-700"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "16px",
          background: "#0f172a",
        }}
        wrapLongLines
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;