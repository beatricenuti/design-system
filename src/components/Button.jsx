import React from "react";
import { ChannelsAddBoxIcon } from "./icons/ChannelsAddBoxIcon.jsx";
import "./Button.css";

const LEGACY_VARIANT = { primary: "Flat", secondary: "Stroked", tertiary: "Ghost" };
const LEGACY_SIZE = { small: "S", medium: "M", large: "L" };
const LEGACY_STATE = {
  default: "Default",
  hover: "Hover",
  pressed: "Selected",
  disabled: "Disabled",
};

function normalizeVariant(variant) {
  if (typeof variant !== "string") return "Flat";
  const lower = variant.toLowerCase();
  if (LEGACY_VARIANT[lower]) return LEGACY_VARIANT[lower];
  return variant.charAt(0).toUpperCase() + variant.slice(1).toLowerCase();
}

function normalizeSize(size) {
  if (typeof size !== "string") return "L";
  const lower = size.toLowerCase();
  if (LEGACY_SIZE[lower]) return LEGACY_SIZE[lower];
  return size.toUpperCase();
}

function normalizeState(state) {
  if (typeof state !== "string") return "Default";
  const lower = state.toLowerCase();
  if (LEGACY_STATE[lower]) return LEGACY_STATE[lower];
  return state.charAt(0).toUpperCase() + state.slice(1).toLowerCase();
}

/**
 * Channels library — Prueba IA button (Figma node 353-798, file NkKgVEkdTAusdqHaqtUULO).
 * Props match Figma: variant Flat | Stroked | Ghost; size L | M | S; state Default | Hover | Selected | Disabled;
 * type Text | Icon + text | Text + icon | Icon; blackVersion.
 * Legacy: variant primary | secondary | tertiary; size small | medium | large; state default | hover | pressed | disabled.
 */
export function Button({
  className = "",
  blackVersion = false,
  size = "L",
  state = "Default",
  text,
  type = "Text",
  variant = "Flat",
  icon,
  disabled,
  children,
  ...props
}) {
  const variantNorm = normalizeVariant(variant);
  const sizeNorm = normalizeSize(size);
  const stateNorm = normalizeState(state);

  const isDisabled = disabled ?? stateNorm === "Disabled";
  const isSelected = stateNorm === "Selected";
  const isHover = stateNorm === "Hover";

  const label = text ?? (typeof children === "string" ? children : "Button");
  const needsIconSlot =
    type === "Icon" || type === "Icon + text" || type === "Text + icon";
  const resolvedIcon = icon ?? (needsIconSlot ? <ChannelsAddBoxIcon /> : null);

  const classes = [
    "ds-button",
    `ds-button--${variantNorm.toLowerCase()}`,
    `ds-button--${sizeNorm.toLowerCase()}`,
    type === "Text + icon" && "ds-button--text-icon",
    type === "Icon + text" && "ds-button--icon-text",
    type === "Icon" && "ds-button--icon-only",
    isSelected && "ds-button--selected",
    isHover && "ds-button--hover",
    blackVersion && "ds-button--black",
  ]
    .filter(Boolean)
    .join(" ");

  const showText = type !== "Icon" && label;
  const iconLeft = type === "Icon + text";
  const iconRight = type === "Text + icon";
  const iconOnly = type === "Icon";

  const figmaNodeId =
    variantNorm === "Flat" &&
    sizeNorm === "L" &&
    type === "Text + icon" &&
    stateNorm === "Default" &&
    !blackVersion
      ? "353:870"
      : "353:798";

  return (
    <button
      type="button"
      className={`${classes} ${className}`.trim()}
      disabled={isDisabled}
      data-node-id={figmaNodeId}
      aria-pressed={isSelected || undefined}
      {...props}
    >
      {resolvedIcon && iconLeft && (
        <span className="ds-button__icon" aria-hidden>
          {resolvedIcon}
        </span>
      )}
      {showText && (
        <span
          className="ds-button__label"
          data-node-id={type === "Text" ? "353:799" : undefined}
        >
          {label}
        </span>
      )}
      {resolvedIcon && iconRight && (
        <span className="ds-button__icon" aria-hidden>
          {resolvedIcon}
        </span>
      )}
      {resolvedIcon && iconOnly && (
        <span className="ds-button__icon" aria-hidden>
          {resolvedIcon}
        </span>
      )}
    </button>
  );
}
