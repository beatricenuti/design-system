import React from "react";
import { ContextualAlert } from "./ContextualAlert.jsx";

const STATES = [
  { id: "Info", label: "Info" },
  { id: "Warning", label: "Warning" },
  { id: "Error", label: "Error" },
  { id: "Success", label: "Success" },
  { id: "Custom", label: "Custom" },
];

const TYPES = [
  { id: "Ghost", label: "Ghost" },
  { id: "Flat", label: "Flat" },
];

export function ContextualAlertDocs() {
  const [state, setState] = React.useState("Info");
  const [type, setType] = React.useState("Ghost");
  const [showTitle, setShowTitle] = React.useState(false);
  const [closeIcon, setCloseIcon] = React.useState(false);

  return (
    <section className="docs-section contextual-alert-docs" aria-labelledby="contextual-alert-heading">
      <header className="docs-section__header">
        <h1 id="contextual-alert-heading">Contextual Alert</h1>
        <p className="docs-section__subtitle">
          Inline message that appears in context (e.g. above a form or list) to inform, warn, or
          confirm. Figma component 978-10738 (all state × type variants; Info Ghost instance
          978-10745). Five states and two types: Ghost and Flat (optional close). Use for
          validation feedback, status updates, or short guidance without blocking the page.
        </p>
      </header>

      <div className="docs-section__content" style={{ flexDirection: "column", gap: 24 }}>
        <div className="controls-panel" style={{ maxWidth: 420 }}>
          <div className="controls-panel__group">
            <span className="controls-panel__label">State</span>
            <div className="segment">
              {STATES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`segment__item ${state === s.id ? "is-selected" : ""}`}
                  onClick={() => setState(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="controls-panel__group">
            <span className="controls-panel__label">Type</span>
            <div className="segment">
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`segment__item ${type === t.id ? "is-selected" : ""}`}
                  onClick={() => setType(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="controls-panel__group">
            <span className="controls-panel__label">Options</span>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={showTitle}
                  onChange={(e) => setShowTitle(e.target.checked)}
                />
                <span>Show title</span>
              </label>
              {type === "Flat" && (
                <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={closeIcon}
                    onChange={(e) => setCloseIcon(e.target.checked)}
                  />
                  <span>Close button</span>
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="contextual-alert-docs__preview">
          <ContextualAlert
            state={state}
            type={type}
            title="This is an optional title"
            description="This is the description"
            showTitle={showTitle}
            closeIcon={type === "Flat" && closeIcon}
            onClose={() => {}}
          />
        </div>

        <div className="contextual-alert-docs__all">
          <p style={{ margin: "0 0 12px", fontSize: 14, color: "var(--text-muted)" }}>
            All variants (Ghost and Flat)
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 520 }}>
            {TYPES.map((t) => (
              <div key={t.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                  {t.label}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {STATES.map((s) => (
                    <ContextualAlert
                      key={`${t.id}-${s.id}`}
                      state={s.id}
                      type={t.id}
                      description="This is the description"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
