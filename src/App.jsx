import React from "react";
import { SideNav } from "./components/SideNav.jsx";
import { ButtonDocs } from "./components/ButtonDocs.jsx";
import { ActionBarDocs } from "./components/ActionBarDocs.jsx";
import { ContextualAlertDocs } from "./components/ContextualAlertDocs.jsx";
const navItems = [
  { type: "heading", id: "components-heading", label: "Components" },
  { id: "button", label: "Button" },
  { id: "action-bar", label: "Action Bar" },
  { id: "contextual-alert", label: "Contextual Alert" },
];

export function App() {
  const [activeComponentId, setActiveComponentId] = React.useState("button");

  return (
    <div className="app-root">
      <aside className="side-nav">
        <div className="side-nav__logo">Design System</div>
        <SideNav
          items={navItems}
          activeId={activeComponentId}
          onSelect={(id) => id !== "components-heading" && setActiveComponentId(id)}
        />
      </aside>
      <main className="main-pane">
        {activeComponentId === "button" && <ButtonDocs />}
        {activeComponentId === "action-bar" && <ActionBarDocs />}
        {activeComponentId === "contextual-alert" && <ContextualAlertDocs />}
      </main>
    </div>
  );
}
