import React from "react";

const IconInfo = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const IconWarning = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
);

const IconError = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
  </svg>
);

const IconSuccess = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const IconAlarm = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const IconClose = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const STATE_ICONS = {
  Info: IconInfo,
  Warning: IconWarning,
  Error: IconError,
  Success: IconSuccess,
  Custom: IconAlarm,
};

/** Figma component set root 978-10738 — variant frame ids */
const FIGMA_ROOT = {
  "Info:Ghost": "978:10745",
  "Info:Flat": "978:10739",
  "Warning:Ghost": "978:10756",
  "Warning:Flat": "978:10750",
  "Error:Ghost": "978:10767",
  "Error:Flat": "978:10761",
  "Success:Ghost": "978:10778",
  "Success:Flat": "978:10772",
  "Custom:Ghost": "978:10789",
  "Custom:Flat": "978:10783",
};

/** Icon column / icon — Info Flat 978-10739 vs Info Ghost 978-10745 */
const FIGMA_ICON_SLOT = {
  "Info:Ghost": "5605:13099",
  "Info:Flat": "17888:34453",
};

const FIGMA_ICON_NODE = {
  "Info:Ghost": "978:10746",
  "Info:Flat": "17888:34454",
};

const FIGMA_CONTENT = {
  "Info:Ghost": "978:10747",
  "Info:Flat": "978:10741",
  "Warning:Ghost": "978:10758",
  "Warning:Flat": "978:10752",
  "Error:Ghost": "978:10769",
  "Error:Flat": "978:10763",
  "Success:Ghost": "978:10780",
  "Success:Flat": "978:10774",
  "Custom:Ghost": "978:10791",
  "Custom:Flat": "978:10785",
};

function figmaKey(state, type) {
  return `${state}:${type}`;
}

/**
 * Contextual Alert — Figma 978-10738 (set). Info + Flat instance: **978-10739**.
 * States: Info | Warning | Error | Success | Custom. Types: Ghost | Flat.
 */
export function ContextualAlert({
  state = "Info",
  type = "Ghost",
  title,
  description = "This is the description",
  showTitle = false,
  closeIcon = false,
  onClose,
  icon: customIcon,
  className,
}) {
  const isFlat = type === "Flat";
  const DefaultIcon = STATE_ICONS[state] || IconAlarm;
  const ghostInfo = type === "Ghost" && state === "Info";
  const key = figmaKey(state, type);

  const classNames = [
    "contextual-alert",
    `contextual-alert--${state.toLowerCase()}`,
    isFlat ? "contextual-alert--flat" : "contextual-alert--ghost",
    className,
  ].filter(Boolean).join(" ");

  const showTitleBlock = showTitle && title != null && title !== "";
  const showDescription = description != null && description !== "";

  const figmaRootNodeId = FIGMA_ROOT[key] ?? "978:10738";

  const iconSlotId = FIGMA_ICON_SLOT[key];
  const iconNodeId = FIGMA_ICON_NODE[key];

  const iconEl = (
    <div className="contextual-alert__icon-slot" data-node-id={iconSlotId}>
      <span className="contextual-alert__icon" data-node-id={iconNodeId} aria-hidden>
        {customIcon != null ? customIcon : <DefaultIcon />}
      </span>
    </div>
  );

  return (
    <div
      className={classNames}
      data-node-id={figmaRootNodeId}
      role={state === "Error" ? "alert" : "status"}
      aria-live="polite"
    >
      {iconEl}
      <div className="contextual-alert__content" data-node-id={FIGMA_CONTENT[key]}>
        {showTitleBlock && (
          <p
            className="contextual-alert__title"
            data-node-id={ghostInfo ? "978:10748" : "978:10742"}
          >
            {title}
          </p>
        )}
        {showDescription && (
          <p
            className="contextual-alert__description"
            data-node-id={ghostInfo ? "11839:40242" : "978:10743"}
          >
            {description}
          </p>
        )}
      </div>
      {isFlat && closeIcon && (
        <button
          type="button"
          className="contextual-alert__close"
          onClick={onClose}
          aria-label="Close"
          data-node-id={state === "Info" ? "978:10744" : "978:10755"}
        >
          <IconClose />
        </button>
      )}
    </div>
  );
}
