import React from "react";

export function SideNav({ items, activeId, onSelect }) {
  let lastGroup = null;

  return (
    <nav className="side-nav__list" aria-label="Design system navigation">
      {items.map((item) => {
        if (item.type === "heading") {
          lastGroup = item.id;
          return (
            <div key={item.id} className="side-nav__section-heading">
              {item.label}
            </div>
          );
        }

        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            className={["side-nav__item", isActive && "is-active"]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

