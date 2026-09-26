"use client";

import { Highlight, type PrismTheme } from "prism-react-renderer";

const nosyTheme: PrismTheme = {
  plain: { color: "#ede4d8", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#6b5c4d", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#a89684" } },
    { types: ["property", "tag", "boolean", "number", "constant", "symbol"], style: { color: "#d4a373" } },
    { types: ["selector", "attr-name", "string", "char", "builtin"], style: { color: "#c89f7d" } },
    { types: ["operator", "entity", "url", "string"], style: { color: "#a89684" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "#8b3f1e", fontWeight: "500" } },
    { types: ["function", "class-name"], style: { color: "#e5c39e" } },
    { types: ["regex", "important", "variable"], style: { color: "#d4a373" } },
  ],
};

export function CodeViewer({ code, lang }: { code: string; lang: string }) {
  const language = lang === "tsx" ? "tsx"
    : lang === "ts" ? "ts"
    : lang === "js" ? "js"
    : lang === "json" ? "json"
    : lang === "css" ? "css"
    : lang === "markdown" ? "markdown"
    : "markup";

  return (
    <Highlight code={code.trimEnd()} language={language} theme={nosyTheme}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="font-[family-name:var(--font-mono)] text-[13px] leading-[1.7] m-0">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="table-row">
              <span className="table-cell pr-4 text-right select-none text-nosy-dim w-10">
                {i + 1}
              </span>
              <span className="table-cell">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}