import React from "react";
import { ActionBar } from "./ActionBar.jsx";

export function ActionBarDocs() {
  const [mobile, setMobile] = React.useState(false);

  return (
    <section className="docs-section action-bar-docs" aria-labelledby="action-bar-heading">
      <header className="docs-section__header">
        <h1 id="action-bar-heading">Action Bar</h1>
        <p className="docs-section__subtitle">
          A horizontal toolbar that sits above list or detail content and provides navigation and
          filters. On desktop it includes a Filter button, a Back button with an overlapping
          breadcrumb label (e.g. current view name), and a “Search seats” action. On mobile it
          uses an icon-only Filter, Back (with label), an optional Info icon for help or alerts,
          and Search seats. Use it to orient users and give quick access to filtering and
          navigation.
        </p>
      </header>

      <div className="docs-section__content" style={{ flexDirection: "column", gap: 24 }}>
        <div className="controls-panel" style={{ maxWidth: 320 }}>
          <div className="controls-panel__group">
            <span className="controls-panel__label">Layout</span>
            <div className="segment">
              <button
                type="button"
                className={`segment__item ${!mobile ? "is-selected" : ""}`}
                onClick={() => setMobile(false)}
              >
                Desktop
              </button>
              <button
                type="button"
                className={`segment__item ${mobile ? "is-selected" : ""}`}
                onClick={() => setMobile(true)}
              >
                Mobile
              </button>
            </div>
          </div>
        </div>

        <div className="action-bar-docs__preview">
          <ActionBar
            mobile={mobile}
            viewName="View name"
            onFilterClick={() => {}}
            onBackClick={() => {}}
            onSearchSeatsClick={() => {}}
            onInfoClick={() => {}}
          />
        </div>
      </div>
    </section>
  );
}
