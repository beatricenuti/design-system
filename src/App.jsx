import React from "react";
import { GettingStarted } from "./pages/GettingStarted.jsx";
import { Overview } from "./pages/Overview.jsx";
import { TokensPage } from "./pages/TokensPage.jsx";
import { ComponentDetail } from "./pages/ComponentDetail.jsx";
import { CATEGORIES, CATEGORY_COLORS } from "./data/components.js";
import { StatusBadge } from "./components/StatusBadge.jsx";

const TOP_ITEMS = [
  { id: "getting-started", label: "Inicio",      icon: "⌂" },
  { id: "overview",        label: "Componentes", icon: "⊞" },
  { id: "tokens",          label: "Tokens",      icon: "◈" },
];

const RESERVED = new Set(["getting-started", "overview", "tokens"]);

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

export function App() {
  const [active, setActive] = React.useState("getting-started");
  const [collapsed, setCollapsed] = React.useState(
    Object.fromEntries(CATEGORIES.map(c => [c.id, true]))
  );

  function navigate(id) {
    setActive(id);
    // Auto-expand the category that contains this component
    for (const cat of CATEGORIES) {
      if (cat.items.some(i => i.id === id)) {
        setCollapsed(prev => ({ ...prev, [cat.id]: false }));
        break;
      }
    }
  }

  function toggleSection(catId) {
    setCollapsed(prev => ({ ...prev, [catId]: !prev[catId] }));
  }

  return (
    <div className="app-root">
      {/* Sidebar */}
      <aside className="side-nav" style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <Logo />
        <nav style={{ flex: 1 }}>
          {/* Top items */}
          {TOP_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`side-nav__item${active === item.id ? " is-active" : ""}`}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 6 }}
            >
              <span style={{ opacity: 0.5, fontSize: 12 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          {/* Divider */}
          <div style={{ height: 1, background: "#e8e8e8", margin: "8px 0" }} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a0a0a0", padding: "6px 10px 4px" }}>
            Por categoría
          </div>

          {/* Category groups (collapsible) */}
          {CATEGORIES.map(cat => {
            const isOpen = !collapsed[cat.id];
            const colors = CATEGORY_COLORS[cat.id] || { accent: '#414141', bg: '#f1f1f1' };
            const hasActive = cat.items.some(i => i.id === active);

            return (
              <div key={cat.id}>
                <button
                  onClick={() => toggleSection(cat.id)}
                  style={{
                    all: "unset", cursor: "pointer", width: "100%",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "6px 10px", borderRadius: 6, fontFamily: "inherit",
                    fontSize: 12, fontWeight: hasActive ? 700 : 600,
                    color: hasActive ? colors.accent : "#414141",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f3f4f6"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 10, opacity: 0.6 }}>{cat.icon}</span>
                    {cat.label}
                    <span style={{ fontSize: 10, color: colors.accent, background: colors.bg, padding: "0 5px", borderRadius: 4, fontFamily: "monospace" }}>
                      {cat.items.length}
                    </span>
                  </span>
                  <span style={{
                    fontSize: 9, color: "#a0a0a0",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform .15s",
                    display: "inline-block",
                  }}>▶</span>
                </button>

                {isOpen && (
                  <div style={{ paddingLeft: 10, paddingBottom: 4 }}>
                    {cat.items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => navigate(item.id)}
                        className={`side-nav__item${active === item.id ? " is-active" : ""}`}
                        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, padding: "6px 8px" }}
                      >
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, textAlign: "left" }}>
                          {item.name}
                        </span>
                        <StatusBadge status={item.status} size="sm" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: "12px 4px 0", borderTop: "1px solid #e8e8e8", marginTop: 8 }}>
          <a
            href="https://www.figma.com/design/NkKgVEkdTAusdqHaqtUULO/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, color: "#767676", textDecoration: "none", fontSize: 13 }}
            onMouseEnter={e => (e.currentTarget.style.background = "#f1f1f1")}
            onMouseLeave={e => (e.currentTarget.style.background = "")}
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
        {active === "getting-started" && <GettingStarted onNavigate={navigate} />}
        {active === "overview"        && <Overview onSelectComponent={navigate} />}
        {active === "tokens"          && <TokensPage />}
        {!RESERVED.has(active)        && (
          <ComponentDetail
            componentId={active}
            onNavigate={navigate}
            onBack={() => navigate("overview")}
          />
        )}
      </main>
    </div>
  );
}
