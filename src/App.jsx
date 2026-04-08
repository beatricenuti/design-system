import React from "react";
import { Overview } from "./pages/Overview.jsx";
import { TokensPage } from "./pages/TokensPage.jsx";
import { ButtonDocs } from "./components/ButtonDocs.jsx";
import { ActionBarDocs } from "./components/ActionBarDocs.jsx";
import { ContextualAlertDocs } from "./components/ContextualAlertDocs.jsx";
import { CATEGORIES } from "./data/components.js";
import { StatusBadge } from "./components/StatusBadge.jsx";

const DOCS_PAGES = {
  button: ButtonDocs,
  "action-bar": ActionBarDocs,
  "contextual-alert": ContextualAlertDocs,
};

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 4px 16px", borderBottom: "1px solid #e8e8e8", marginBottom: 8 }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: "#009ee0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#212121", lineHeight: 1.2 }}>Channels DS</div>
        <div style={{ fontSize: 10, color: "#a0a0a0" }}>Design System</div>
      </div>
    </div>
  );
}

function ComingSoon({ componentId }) {
  const allComps = CATEGORIES.flatMap((c) => c.items);
  const comp = allComps.find((c) => c.id === componentId);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "50vh", textAlign: "center", gap: 12 }}>
      <div style={{ fontSize: 48 }}>🚧</div>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#212121" }}>{comp?.name || componentId}</h2>
      <p style={{ margin: 0, fontSize: 14, color: "#767676", maxWidth: 360 }}>
        La documentación de este componente está en desarrollo.<br />
        Mientras tanto, puedes verlo en Figma.
      </p>
      <a
        href="https://www.figma.com/design/NkKgVEkdTAusdqHaqtUULO/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 8, background: "#009ee0", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600 }}
      >
        Abrir en Figma ↗
      </a>
    </div>
  );
}

const NAV_ITEMS = [
  { type: "section", label: "General" },
  { id: "overview", label: "Componentes", icon: "⊞" },
  { id: "tokens",   label: "Tokens",       icon: "◈" },
  { type: "divider" },
  { type: "section", label: "Documentación" },
  { id: "button",           label: "Button",           icon: "○", status: "stable" },
  { id: "action-bar",       label: "Action Bar",        icon: "○", status: "stable" },
  { id: "contextual-alert", label: "Contextual Alert",  icon: "○", status: "stable" },
];

export function App() {
  const [active, setActive] = React.useState("overview");

  function navigate(id) {
    setActive(id);
  }

  const DocsComponent = DOCS_PAGES[active];

  return (
    <div className="app-root">
      {/* Sidebar */}
      <aside className="side-nav" style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <Logo />
        <nav style={{ flex: 1 }}>
          {NAV_ITEMS.map((item, i) => {
            if (item.type === "section") return (
              <div key={i} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a0a0a0", padding: "10px 10px 4px" }}>
                {item.label}
              </div>
            );
            if (item.type === "divider") return (
              <div key={i} style={{ height: 1, background: "#e8e8e8", margin: "8px 0" }} />
            );
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`side-nav__item${isActive ? " is-active" : ""}`}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ opacity: 0.5, fontSize: 12 }}>{item.icon}</span>
                  {item.label}
                </span>
                {item.status && <StatusBadge status={item.status} size="sm" />}
              </button>
            );
          })}
        </nav>

        {/* Footer link */}
        <div style={{ padding: "12px 4px 0", borderTop: "1px solid #e8e8e8", marginTop: 8 }}>
          <a
            href="https://www.figma.com/design/NkKgVEkdTAusdqHaqtUULO/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, color: "#767676", textDecoration: "none", fontSize: 13 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f1f1")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <svg width="14" height="14" viewBox="0 0 38 57" fill="none">
              <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
              <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
              <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
              <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
              <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#FF7262"/>
            </svg>
            Ver en Figma
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-pane" style={{ overflowY: "auto" }}>
        {active === "overview" && <Overview onSelectComponent={navigate} />}
        {active === "tokens"   && <TokensPage />}
        {DocsComponent         && <DocsComponent />}
        {!["overview", "tokens"].includes(active) && !DocsComponent && (
          <ComingSoon componentId={active} />
        )}
      </main>
    </div>
  );
}
