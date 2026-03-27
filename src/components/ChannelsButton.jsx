import React from "react";
import { ChannelsAddBoxIcon } from "./icons/ChannelsAddBoxIcon.jsx";
import "./ChannelsButton.css";

/**
 * Channels Button — Channels library - Prueba IA.
 * Default Flat L Text: Figma 353-798 (353:799 label). Text + icon: 353-870.
 */
export function ChannelsButton({
  className = "",
  blackVersion = false,
  size = "L",
  state = "Default",
  text = "Button",
  type = "Text",
  variant = "Flat",
  icon,
  disabled,
  children,
  ...props
}) {
  const isDisabled = disabled ?? state === "Disabled";
  const isSelected = state === "Selected";
  const isHover = state === "Hover";
  const label = text ?? (typeof children === "string" ? children : "Button");

  const needsIconSlot = type === "Icon" || type === "Icon + text" || type === "Text + icon";
  const resolvedIcon = icon ?? (needsIconSlot ? <ChannelsAddBoxIcon /> : null);

  const classes = [
    "channels-btn",
    `channels-btn--${variant.toLowerCase()}`,
    `channels-btn--${size.toLowerCase()}`,
    type === "Text + icon" && "channels-btn--text-icon",
    type === "Icon + text" && "channels-btn--icon-text",
    type === "Icon" && "channels-btn--icon-only",
    isSelected && "channels-btn--selected",
    isHover && "channels-btn--hover",
    blackVersion && "channels-btn--black",
  ]
    .filter(Boolean)
    .join(" ");

  const showText = type !== "Icon" && label;
  const iconLeft = type === "Icon + text";
  const iconRight = type === "Text + icon";
  const iconOnly = type === "Icon";

  const figmaNodeId =
    variant === "Flat" && size === "L" && type === "Text + icon" && state === "Default" && !blackVersion
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
      {resolvedIcon && iconLeft && <span className="channels-btn__icon" aria-hidden>{resolvedIcon}</span>}
      {showText && (
        <span className="channels-btn__label" data-node-id={type === "Text" ? "353:799" : undefined}>
          {label}
        </span>
      )}
      {resolvedIcon && iconRight && <span className="channels-btn__icon" aria-hidden>{resolvedIcon}</span>}
      {resolvedIcon && iconOnly && <span className="channels-btn__icon" aria-hidden>{resolvedIcon}</span>}
    </button>
  );
}
