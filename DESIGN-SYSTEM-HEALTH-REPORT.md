# Design System Health Report

**Generated:** March 16, 2025  
**Scope:** `src/` components, styles, design tokens, and Figma token assets.

---

## 1. DS component usage

### Design system components (from Figma / DS library)

| Component           | File                 | Usage in app                         | Token-aware |
|--------------------|----------------------|--------------------------------------|-------------|
| **Button**         | `Button.jsx`         | ButtonDocs, preview only             | ✅ Yes (semantic tokens) |
| **Action Bar**     | `ActionBar.jsx`      | ActionBarDocs only                   | Partial (own CSS vars) |
| **Contextual Alert** | `ContextualAlert.jsx` | ContextualAlertDocs only           | Partial (own CSS vars) |

- **Button** is the only component with a dedicated token module (`buttonTokens.js`) and semantic CSS variables (`--color-button-*`). It is used only in the docs preview.
- **Action Bar** and **Contextual Alert** are documented as “from Figma UI Library” and use component-scoped CSS variables in `styles.css` (e.g. `--action-bar-*`, `--contextual-alert-*`), but no shared design-token layer.
- **No consumption outside docs:** There are no other pages or features importing these DS components; usage is limited to the documentation shell.

### Summary

- **3** DS components (Button, Action Bar, Contextual Alert).
- **1** has a formal token contract (Button).
- **0** usages in app/product code; all usage is inside doc pages.

---

## 2. Token compliance

### 2.1 Central token layer (`:root` in `styles.css`)

- **Defined:** `--bg-surface`, `--bg-elevated`, `--border-subtle`, `--text-primary`, `--text-muted`, `--accent`, plus Button default-state tokens (`--color-button-*-background/label/border`).
- **Used as intended:** Layout/shell (e.g. side nav, docs panels) often use `var(--bg-elevated)`, `var(--border-subtle)`, `var(--text-primary)`, `var(--text-muted)`. Button styles use the button token variables.

### 2.2 Hardcoded values (non-compliant)

**Hex colors in `src/styles.css` (not from tokens):**

| Location                     | Hardcoded value   | Suggested token / fix                          |
|-----------------------------|-------------------|------------------------------------------------|
| `body`, `.app-root`, `.side-nav` | `#ffffff`         | `var(--bg-surface)`                            |
| `.side-nav__item.is-active`  | `#eff6ff`, `#2563eb` | `var(--bg-elevated)` or semantic active token |
| `.side-nav__item:hover`     | `#f3f4f6`         | `var(--bg-elevated)`                           |
| `.segment`                  | `#e5e7eb`         | `var(--border-subtle)`                         |
| `.segment__item.is-selected`| `#ffffff`         | `var(--bg-surface)`                            |
| `.code-block__copy`         | `#e5e7eb`         | `var(--border-subtle)` or neutral token        |
| `.code-block__copy:hover`   | `#d1d5db`         | Token for muted border/hover                   |

**Button:** Default state is token-driven. Hover/pressed/disabled **colors** are not wired to CSS variables (see Design drift).

**Action Bar / Contextual Alert:** Their tokens are defined as raw hex in a second `:root` block (e.g. `--action-bar-bg: #ffffff`, `--contextual-alert-info: #007796`). They are consistent within the component but **not** derived from the shared Figma token files (see below).

### 2.3 Figma token files (unused in code)

- **Base brand colors:** `Basic.tokens.json`, `B2B.tokens.json`, `Channels.tokens.json`, `Customers.tokens.json`
- **Ad-hoc brand colors:** `Balañá.tokens.json`, `Circuit cat.tokens.json`, `La Caixa.tokens.json`

**Finding:** No imports or build step reference these `.tokens.json` files. All token values in the app are hand-maintained in `styles.css` and `buttonTokens.js`. Token compliance is therefore **partial**: the *concept* of tokens is used, but the **source of truth** (Figma/JSON) is not connected.

### Token compliance score

- **Central tokens:** ~70% (shell uses them; several hex fallbacks remain).
- **Button tokens:** Default state compliant; hover/pressed/disabled not implemented as token-driven colors.
- **Figma/JSON tokens:** 0% (not wired).

---

## 3. Custom components detected

Components that are **not** part of the documented DS (Button, Action Bar, Contextual Alert) and are used to build the docs shell:

| Component   | File          | Purpose                    | Uses DS tokens?     |
|------------|----------------|----------------------------|---------------------|
| **SideNav** | `SideNav.jsx`  | Doc navigation             | Partial (some vars) |
| **CodeBlock** | `CodeBlock.jsx` | Code snippet + copy      | Partial (some vars) |
| **ButtonDocs** | `ButtonDocs.jsx` | Button doc page          | Yes (buttonTokens)  |
| **ActionBarDocs** | `ActionBarDocs.jsx` | Action Bar doc page  | N/A                 |
| **ContextualAlertDocs** | `ContextualAlertDocs.jsx` | Contextual Alert doc page | N/A   |

**Classification:**

- **SideNav** and **CodeBlock** are custom UI for the documentation app. They use some global tokens (`--text-muted`, `--border-subtle`, etc.) but also contain hardcoded colors (see table in §2.2). They are not part of the “product” DS.
- **\*Docs** components are doc-only and correctly use (or showcase) the DS components; they are not custom product components.

**Recommendation:** If the docs shell should align with the DS, refactor SideNav and CodeBlock to use only design tokens and remove remaining hex values.

---

## 4. Design drift

### 4.1 Button: state tokens defined but not implemented

- **`buttonTokens.js`** and the docs table describe semantic tokens for **hover**, **pressed**, and **disabled** (e.g. `color/button/primary/hover/background` → `--color-button-primary-hover-background`).
- **`styles.css`** defines only **default** state variables. `.ds-button--hover`, `.ds-button--pressed`, and `.ds-button--disabled` do **not** use state-specific color variables; they use:
  - hover: `transform` + `box-shadow`
  - pressed: `box-shadow`
  - disabled: `opacity: 0.45`
- **Result:** Visual states in code do not follow the documented token set; hover/pressed/disabled colors will not match Figma if those tokens are ever synced.

**Recommendation:** Add CSS variables for hover/pressed/disabled (e.g. from `buttonTokens.js`) and use them in `.ds-button--hover`, `.ds-button--pressed`, `.ds-button--disabled`.

### 4.2 Typography

- **index.html:** Google Fonts loads **Nunito Sans**.
- **body in styles.css:** `font-family: system-ui, -apple-system, ...` (no Nunito Sans).
- **Action Bar & Contextual Alert:** Use `var(--action-bar-font)` / `var(--contextual-alert-font)` = `"Nunito Sans", system-ui, sans-serif`.

**Result:** The main app/shell uses system UI font; only Action Bar and Contextual Alert use Nunito Sans. Inconsistent type stack across the doc site.

### 4.3 Token naming and layering

- **Global tokens:** `--bg-surface`, `--text-primary`, etc.
- **Button:** `--color-button-{variant}-{role}` (default only in CSS).
- **Action Bar:** `--action-bar-bg`, `--action-bar-text`, etc.
- **Contextual Alert:** `--contextual-alert-info`, `--contextual-alert-info-bg`, etc.

Action Bar and Contextual Alert do not reference the global palette (e.g. `--text-primary`, `--bg-surface`). Colors are component-specific and duplicated (e.g. `#414141`, `#f1f1f1`), which will drift if the global theme changes.

### 4.4 Figma token sync

- README suggests syncing with Figma via `get_variable_defs` and updating `buttonTokens.js` and `styles.css`.
- No pipeline or script exists to generate CSS/JS from the repo’s `.tokens.json` or from Figma. All token values are manual.

**Design drift score:** Medium–high (state tokens missing for Button, typography and token layering inconsistent, no automated token sync).

---

## 5. Recommendations summary

| Priority | Action |
|----------|--------|
| High     | Implement hover/pressed/disabled **color** tokens for Button in CSS and use them in modifier classes. |
| High     | Replace remaining hardcoded hex colors in `styles.css` with existing `:root` tokens (e.g. `--bg-surface`, `--border-subtle`). |
| Medium   | Unify typography: either use Nunito Sans for the whole doc app (and set it on `body`) or document that only certain components use it. |
| Medium   | Wire Action Bar and Contextual Alert to shared tokens where possible (e.g. text, borders, backgrounds) to reduce duplication and drift. |
| Low      | Introduce a token pipeline (e.g. Style Dictionary or custom script) to generate `styles.css` / JS from Figma or from the `.tokens.json` files. |
| Low      | Use DS components in at least one non-docs screen to validate usage and token behavior in context. |

---

*End of report.*
