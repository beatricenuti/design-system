import React from "react";

/**
 * Design system Button. Uses semantic design tokens (CSS variables) that match Figma.
 * Variants: primary | secondary | tertiary
 * Sizes: small | medium | large
 * state: optional "default" | "hover" | "pressed" | "disabled" for docs preview only; omit in app code.
 */
export function Button({
  variant = "primary",
  size = "medium",
  disabled = false,
  state: stateOverride,
  children,
  className = "",
  ...props
}) {
  const state = stateOverride ?? (disabled ? "disabled" : "default");
  const classes = [
    "ds-button",
    `ds-button--${variant}`,
    `ds-button--${size}`,
    `ds-button--${state}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={`${classes} ${className}`.trim()}
      disabled={state === "disabled"}
      {...props}
    >
      {children}
    </button>
  );
}
