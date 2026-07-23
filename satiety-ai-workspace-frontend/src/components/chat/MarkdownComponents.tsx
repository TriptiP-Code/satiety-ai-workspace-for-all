import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import CopyButton from "./CopyButton";

const MarkdownComponents: Components = {
  code(props) {
    const { children, className } = props;

    const match = /language-(\w+)/.exec(className || "");

    if (!match) {
      return (
        <code className="rounded bg-slate-700 px-1 py-0.5">
          {children}
        </code>
      );
    }

    const code = String(children).replace(/\n$/, "");

    return (
      <div className="relative my-4">
        <CopyButton text={code} />

        <SyntaxHighlighter
          language={match[1]}
          style={oneDark}
          customStyle={{
            borderRadius: "12px",
            margin: 0,
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  },
};

export default MarkdownComponents;
