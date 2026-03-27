/**
 * Button variant/size/state definitions and semantic design tokens.
 * Token names follow Figma semantic naming. Sync with Figma via get_variable_defs (select button in Figma).
 */
export const buttonVariants = {
  variants: [
    { id: "primary", label: "Primary" },
    { id: "secondary", label: "Secondary" },
    { id: "tertiary", label: "Tertiary" },
  ],
  sizes: [
    { id: "small", label: "Small" },
    { id: "medium", label: "Medium" },
    { id: "large", label: "Large" },
  ],
  states: [
    { id: "default", label: "Default" },
    { id: "hover", label: "Hover" },
    { id: "pressed", label: "Pressed" },
    { id: "disabled", label: "Disabled" },
  ],
};

/**
 * Semantic tokens per variant and state. Names match Figma variable naming (e.g. color/button/primary/...).
 * CSS variables in :root and .ds-button--* map these for implementation.
 */
function makeTokenRows(variant, defaultBg, defaultLabel, defaultBorder, hoverBg, hoverLabel, hoverBorder, pressedBg, pressedLabel, pressedBorder, disabledBg, disabledLabel, disabledBorder) {
  const byState = {
    default: [
      { role: "Background", tokenName: `color/button/${variant}/default/background`, cssVariable: `--color-button-${variant}-background`, exampleValue: defaultBg },
      { role: "Label", tokenName: `color/button/${variant}/default/label`, cssVariable: `--color-button-${variant}-label`, exampleValue: defaultLabel },
      { role: "Border", tokenName: `color/button/${variant}/default/border`, cssVariable: `--color-button-${variant}-border`, exampleValue: defaultBorder },
    ],
    hover: [
      { role: "Background", tokenName: `color/button/${variant}/hover/background`, cssVariable: `--color-button-${variant}-hover-background`, exampleValue: hoverBg },
      { role: "Label", tokenName: `color/button/${variant}/hover/label`, cssVariable: `--color-button-${variant}-hover-label`, exampleValue: hoverLabel },
      { role: "Border", tokenName: `color/button/${variant}/hover/border`, cssVariable: `--color-button-${variant}-hover-border`, exampleValue: hoverBorder },
    ],
    pressed: [
      { role: "Background", tokenName: `color/button/${variant}/pressed/background`, cssVariable: `--color-button-${variant}-pressed-background`, exampleValue: pressedBg },
      { role: "Label", tokenName: `color/button/${variant}/pressed/label`, cssVariable: `--color-button-${variant}-pressed-label`, exampleValue: pressedLabel },
      { role: "Border", tokenName: `color/button/${variant}/pressed/border`, cssVariable: `--color-button-${variant}-pressed-border`, exampleValue: pressedBorder },
    ],
    disabled: [
      { role: "Background", tokenName: `color/button/${variant}/disabled/background`, cssVariable: `--color-button-${variant}-disabled-background`, exampleValue: disabledBg },
      { role: "Label", tokenName: `color/button/${variant}/disabled/label`, cssVariable: `--color-button-${variant}-disabled-label`, exampleValue: disabledLabel },
      { role: "Border", tokenName: `color/button/${variant}/disabled/border`, cssVariable: `--color-button-${variant}-disabled-border`, exampleValue: disabledBorder },
    ],
  };
  return byState;
}

export const buttonTokens = {
  primary: makeTokenRows(
    "primary",
    "#2563eb", "#ffffff", "#1d4ed8",
    "#3b82f6", "#ffffff", "#2563eb",
    "#1d4ed8", "#ffffff", "#1b40a0",
    "#93c5fd", "#e0e7ff", "#93c5fd"
  ),
  secondary: makeTokenRows(
    "secondary",
    "#f3f4f6", "#111827", "#d1d5db",
    "#e5e7eb", "#111827", "#9ca3af",
    "#e5e7eb", "#111827", "#6b7280",
    "#f9fafb", "#9ca3af", "#e5e7eb"
  ),
  tertiary: makeTokenRows(
    "tertiary",
    "transparent", "#2563eb", "transparent",
    "#eff6ff", "#1d4ed8", "transparent",
    "#dbeafe", "#1d4ed8", "transparent",
    "transparent", "#93c5fd", "transparent"
  ),
};

/** Get token rows for the current variant and state for the docs table. */
export function getButtonTokensForState(variantId, stateId) {
  return buttonTokens[variantId]?.[stateId] ?? buttonTokens[variantId]?.default ?? [];
}
