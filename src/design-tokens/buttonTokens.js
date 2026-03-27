/**
 * Button — Channels library · Prueba IA (Figma node 353-798).
 * Token paths match get_variable_defs from Figma file NkKgVEkdTAusdqHaqtUULO.
 */
export const buttonVariants = {
  variants: [
    { id: "Flat", label: "Flat" },
    { id: "Stroked", label: "Stroked" },
    { id: "Ghost", label: "Ghost" },
  ],
  sizes: [
    { id: "L", label: "L" },
    { id: "M", label: "M" },
    { id: "S", label: "S" },
  ],
  states: [
    { id: "Default", label: "Default" },
    { id: "Hover", label: "Hover" },
    { id: "Selected", label: "Selected" },
    { id: "Disabled", label: "Disabled" },
  ],
  types: [
    { id: "Text", label: "Text" },
    { id: "Icon + text", label: "Icon + text" },
    { id: "Text + icon", label: "Text + icon" },
    { id: "Icon", label: "Icon" },
  ],
};

const FIGMA_VARS = {
  brand500: {
    tokenName: "color/brand/channels/500",
    cssVariable: "--color-brand-channels-500",
    exampleValue: "#009ee0",
  },
  neutral0: {
    tokenName: "color/neutral/0",
    cssVariable: "--color-neutral-0",
    exampleValue: "#FFFFFF",
  },
  space12: {
    tokenName: "space/12",
    cssVariable: "--space-12",
    exampleValue: "48px",
  },
  space4: {
    tokenName: "space/4",
    cssVariable: "--space-4",
    exampleValue: "16px",
  },
  space0: {
    tokenName: "space/0",
    cssVariable: "--space-0",
    exampleValue: "0",
  },
  radiusSm: {
    tokenName: "radius/sm",
    cssVariable: "--radius-sm",
    exampleValue: "4px",
  },
  fontFamily: {
    tokenName: "font/family/base",
    cssVariable: "--font-family-base",
    exampleValue: "Nunito Sans",
  },
  fontSizeMd: {
    tokenName: "font/size/md",
    cssVariable: "--font-size-md",
    exampleValue: "16px",
  },
  fontWeightBold: {
    tokenName: "font/weight/bold",
    cssVariable: "--font-weight-bold",
    exampleValue: "700",
  },
};

/** Tokens for docs table: variant + state + blackVersion. */
export function getButtonTokensForState(variantId, stateId, blackVersion) {
  if (blackVersion) {
    return [
      { role: "Background (flat)", tokenName: "(black version)", cssVariable: "--ds-btn-bg", exampleValue: "#111827" },
      { role: "Label", tokenName: "(black version)", cssVariable: "--ds-btn-label", exampleValue: "#FFFFFF" },
    ];
  }

  const rows = [
    { role: "Fill (Flat)", ...FIGMA_VARS.brand500 },
    { role: "Label", ...FIGMA_VARS.neutral0 },
    { role: "Min height (L)", ...FIGMA_VARS.space12 },
    { role: "Horizontal padding", ...FIGMA_VARS.space4 },
    { role: "Vertical padding", ...FIGMA_VARS.space0 },
    { role: "Corner radius", ...FIGMA_VARS.radiusSm },
    { role: "Label font family", ...FIGMA_VARS.fontFamily },
    { role: "Label font size", ...FIGMA_VARS.fontSizeMd },
    { role: "Label font weight", ...FIGMA_VARS.fontWeightBold },
    { role: "Label line height", tokenName: "(component)", cssVariable: "22px", exampleValue: "22px (matches Figma text)" },
  ];

  if (variantId === "Stroked" || variantId === "Ghost") {
    rows[0] = {
      role: "Background",
      tokenName: "(transparent)",
      cssVariable: "transparent",
      exampleValue: "transparent",
    };
  }

  if (stateId === "Hover") {
    rows.push({
      role: "Overlay / fill",
      tokenName: "Figma 353-825 (15% black on base)",
      cssVariable: "linear-gradient + base",
      exampleValue: "rgba(0,0,0,0.15) on Flat",
    });
  }
  if (stateId === "Selected") {
    rows.push({
      role: "Overlay / fill",
      tokenName: "Figma 353-828 (25% black on base)",
      cssVariable: "linear-gradient + base",
      exampleValue: "rgba(0,0,0,0.25) on Flat",
    });
  }
  if (stateId === "Disabled") {
    rows.push({
      role: "Opacity",
      tokenName: "(component)",
      cssVariable: "opacity",
      exampleValue: "0.5",
    });
  }

  return rows;
}
