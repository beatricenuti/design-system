import React from "react";

const IconFilterAlt = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M4.25 5.66C4.1 5.42 4 5.13 4 4.86V4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v.86c0 .27-.1.56-.25.8L15 11.27V19c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-7.73L4.25 5.66z" />
  </svg>
);

const IconArrowBack = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
);

const IconInfo = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

/**
 * Action Bar from Figma UI Library (node 17543-13742).
 * Filter, Back + breadcrumb, Search seats; mobile shows icon-only Filter, Back, Info, Search seats.
 */
export function ActionBar({
  filter = true,
  mobile = false,
  searchSeats = true,
  alertInfo = true,
  viewName = "View name",
  onFilterClick,
  onBackClick,
  onSearchSeatsClick,
  onInfoClick,
  className,
}) {
  return (
    <div
      className={[ "action-bar", className ].filter(Boolean).join(" ")}
      data-node-id="17543-13742"
      role="toolbar"
      aria-label="Actions"
    >
      {!mobile && filter && (
        <button
          type="button"
          className="action-bar__btn action-bar__btn--filter"
          onClick={onFilterClick}
          aria-label="Filter"
        >
          <IconFilterAlt className="action-bar__btn-icon" />
          <span>Filter</span>
        </button>
      )}

      {!mobile && (
        <div className="action-bar__breadcrumb">
          <button
            type="button"
            className="action-bar__breadcrumb-back"
            onClick={onBackClick}
            aria-label="Back"
          >
            <IconArrowBack className="action-bar__breadcrumb-icon" />
            <span>Back</span>
          </button>
          <span className="action-bar__breadcrumb-item">{viewName}</span>
        </div>
      )}

      {!mobile && searchSeats && (
        <button
          type="button"
          className="action-bar__btn"
          onClick={onSearchSeatsClick}
        >
          Search seats
        </button>
      )}

      {mobile && filter && (
        <button
          type="button"
          className="action-bar__btn action-bar__btn--icon-only"
          onClick={onFilterClick}
          aria-label="Filter"
        >
          <IconFilterAlt className="action-bar__btn-icon" />
        </button>
      )}

      {mobile && (
        <button
          type="button"
          className="action-bar__breadcrumb-back"
          style={{ marginRight: 0 }}
          onClick={onBackClick}
          aria-label="Back"
        >
          <IconArrowBack className="action-bar__breadcrumb-icon" />
          <span>Back</span>
        </button>
      )}

      {mobile && alertInfo && (
        <button
          type="button"
          className="action-bar__btn action-bar__btn--icon-only action-bar__btn--info"
          onClick={onInfoClick}
          aria-label="Information"
        >
          <IconInfo className="action-bar__btn-icon" />
        </button>
      )}

      {mobile && searchSeats && (
        <button
          type="button"
          className="action-bar__btn"
          onClick={onSearchSeatsClick}
        >
          Search seats
        </button>
      )}
    </div>
  );
}
