import React from "react";

export function CodeBlock({ code, label = "React" }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard might be blocked; ignore.
    }
  };

  return (
    <div className="code-block">
      <div className="code-block__header">
        <span className="code-block__label">{label}</span>
        <button type="button" className="code-block__copy" onClick={handleCopy}>
          Copy
        </button>
      </div>
      <pre className="code-block__body">
        <code>{code}</code>
      </pre>
    </div>
  );
}

