# Design Token System Analysis

**Scope:** `src/styles.css`, `src/design-tokens/buttonTokens.js`, and `Base brand colors/*.tokens.json`.

---

## 1. Duplicate tokens (same or near-same values, different names)

### 1.1 White / surface

| Value   | Token(s) / usage |
|--------|--------------------|
| `#ffffff` | `--bg-surface`, `body` background, `.app-root`, `.side-nav`, `.main-pane`, `.segment__item.is-selected`, `--action-bar-bg`, `--color-button-primary-label` |

**Finding:** One hex is used both as a **semantic** token (`--bg-surface`) and as a **primitive** (button label). Elsewhere `#ffffff` is hardcoded instead of `var(--bg-surface)`. `--action-bar-bg` duplicates the same surface role with another name.

**Recommendation:** Use a single primitive (e.g. `--color-white` or keep in palette) and one semantic `--bg-surface` that references it. Use `var(--bg-surface)` everywhere for surface background; use a semantic `--color-button-primary-label` for button text (already done). Replace `--action-bar-bg` with `var(--bg-surface)` or alias it.

---

### 1.2 Light gray backgrounds

| Value   | Token(s) / usage |
|--------|--------------------|
| `#f8f9fa` | `--bg-elevated` |
| `#f3f4f6` | `.side-nav__item:hover`, `--color-button-secondary-background`, action-bar hover uses `var(--bg-elevated)` |
| `#f1f1f1` | `--action-bar-breadcrumb-bg`, `--contextual-alert-custom-bg` |
| `#f9fafb` | Button secondary disabled background (in buttonTokens.js) |
| `#eff6ff` | `.side-nav__item.is-active` (hardcoded) |

**Finding:** Four very similar light grays with no shared primitive. `#f1f1f1` appears in both Action Bar and Contextual Alert under different names. Hover/active states mix hardcoded hex and tokens.

**Recommendation:** Define one or two primitives (e.g. `--gray-50`, `--gray-100`) and map semantic tokens: `--bg-elevated`, `--bg-subtle`, `--bg-active` to them. Replace `--action-bar-breadcrumb-bg` and `--contextual-alert-custom-bg` with a shared semantic token (e.g. `--bg-subtle`).

---

### 1.3 Border / divider grays

| Value   | Token(s) / usage |
|--------|--------------------|
| `#e5e7eb` | `--border-subtle`, `.segment` background, `.code-block__copy` background |
| `#d1d5db` | `--color-button-secondary-border`, `.code-block__copy:hover`, button secondary hover border |
| `#a0a0a0` | `--action-bar-border` |
| `#767676` | `--action-bar-info-border` |
| `#9ca3af` | Button secondary hover/disabled (buttonTokens.js) |

**Finding:** Multiple border-like grays with no scale. `#e5e7eb` is both `--border-subtle` and hardcoded in segment/code-block. Action Bar uses its own border tokens (`#a0a0a0`, `#767676`) instead of global `--border-subtle` / `--text-muted`.

**Recommendation:** Map borders to a single scale (e.g. from Basic.tokens: 50/100/200/300) and semantic tokens: `--border-subtle`, `--border-strong`, `--border-muted`. Use them in Action Bar and Contextual Alert instead of component-specific hex.

---

### 1.4 Dark text

| Value   | Token(s) / usage |
|--------|--------------------|
| `#111827` | `--text-primary`, `--color-button-secondary-label` |
| `#414141` | `--action-bar-text` (Basic.tokens 500 - Base color) |
| `#1C1C1C` | Basic.tokens 900 - Darkest (in JSON, not in CSS) |

**Finding:** Two dark text colors in use: `#111827` (global) and `#414141` (Action Bar). They are not the same; Action Bar intentionally uses a different gray. Naming is inconsistent: one is “primary,” the other is “text” on the component.

**Recommendation:** Decide whether Action Bar should use `--text-primary` or a separate semantic (e.g. `--text-default` = primary, `--text-secondary` = muted). If both are needed, define them from the same scale (e.g. 900 vs 500) and name semantically.

---

### 1.5 Muted / secondary text

| Value   | Token(s) / usage |
|--------|--------------------|
| `#6b7280` | `--text-muted` |
| `#767676` | `--action-bar-info-border` (used as border, not text) |
| `#7A7A7A` | Basic.tokens 300 (in JSON only) |

**Finding:** `--text-muted` is used consistently for secondary text. `#767676` is used for an “info” border in Action Bar—semantically it could be “muted border” and align with a gray scale.

---

### 1.6 Brand blue / accent

| Value   | Token(s) / usage |
|--------|--------------------|
| `#2563eb` | `--accent`, `--color-button-primary-background`, `--color-button-tertiary-label`, `.side-nav__item.is-active` (hardcoded) |
| `#1d4ed8` | `--color-button-primary-border`, tertiary hover/pressed label |
| `#3b82f6` | Button primary hover background (buttonTokens.js only) |

**Finding:** Primary blue is repeated as `--accent` and in button/tertiary tokens. Active nav state uses `#2563eb` instead of `var(--accent)`. Good candidate for one primitive + semantic aliases.

**Recommendation:** Keep a primitive (e.g. `--color-brand-500`) and map `--accent`, button primary background, and tertiary label to it. Use `var(--accent)` for `.side-nav__item.is-active`.

---

### 1.7 Font family

| Value   | Token(s) / usage |
|--------|--------------------|
| `"Nunito Sans", system-ui, sans-serif` | `--action-bar-font`, `--contextual-alert-font` |

**Finding:** Same value defined twice. Body uses system stack only.

**Recommendation:** Single token, e.g. `--font-body` or `--font-ui`, and set it on `body`. Action Bar and Contextual Alert inherit or use `var(--font-body)`.

---

## 2. Inconsistent naming

### 2.1 Naming patterns

| Pattern | Examples | Issue |
|---------|----------|--------|
| **Semantic (role)** | `--bg-surface`, `--text-primary`, `--accent` | Clear intent. |
| **Component-prefixed** | `--action-bar-bg`, `--contextual-alert-info` | Duplicates roles (bg, text) that exist globally. |
| **Abbreviation** | `--action-bar-bg` vs `--color-button-primary-background` | Mix of `bg` and `background`. |
| **State in name** | Button: `--color-button-primary-background` (default only in CSS); buttonTokens use `.../default/background`, `.../hover/background` | CSS has no state in the name for default; hover/pressed/disabled not in CSS. |
| **Type suffix** | `--contextual-alert-info-bg` vs `--contextual-alert-info` | Inconsistent: one is fill, one is content; `-bg` vs no suffix. |

**Recommendation:** Adopt a single convention, e.g. `{category}-{role}-{variant?}-{state?}`: `color-button-primary-background`, `color-button-primary-hover-background`. Use a shared prefix for global semantics: `color-surface-default`, `color-text-primary`, `color-border-subtle`.

### 2.2 Radius

| Token / usage | Value |
|---------------|--------|
| `--action-bar-radius` | 100px |
| `--contextual-alert-radius-ghost` | 5px |
| `--contextual-alert-radius-flat` | 4px |
| Hardcoded | 6px, 12px, 14px, 999px |

**Finding:** No shared scale. “100px” vs “999px” both mean “pill”; 4px vs 5px vs 6px are ad hoc.

**Recommendation:** Define a radius scale (e.g. `--radius-sm: 4px`, `--radius-md: 8px`, `--radius-lg: 12px`, `--radius-full: 999px`) and reference it. Use `--radius-full` for Button and Action Bar pill shape.

### 2.3 Spacing / gap

- Values like 4px, 6px, 8px, 10px, 12px, 16px, 18px, 24px, 32px appear with no tokens.
- `--action-bar-gap: 8px` and `--contextual-alert-gap: 8px` duplicate the same value.

**Recommendation:** Introduce a spacing scale (e.g. 4, 8, 12, 16, 24, 32) and tokens like `--space-xs`, `--space-sm`, `--space-md`. Replace `--action-bar-gap` and `--contextual-alert-gap` with e.g. `var(--space-sm)`.

---

## 3. Scale gaps

### 3.1 Color scales (Figma JSON)

**Basic.tokens.json** (and similar structure in other brand files):

- **Present:** 50, 100, 200, 300, 500, 900  
- **Missing:** 400, 600, 700, 800  

So the scale jumps from 300 → 500 and 500 → 900. For borders, text, and backgrounds you may need steps in between (e.g. 400 for borders, 600/700 for text hierarchy).

**Recommendation:** Add 400, 600, 700, 800 to the palette (in Figma/JSON) and then map semantic tokens to the right step (e.g. border-subtle = 200, text-muted = 400, text-primary = 900).

### 3.2 Spacing scale (missing in code)

No spacing tokens exist. Raw values:

- 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32, 40 px (and 260px for nav width).

**Recommendation:** Define a scale (e.g. 4, 8, 12, 16, 24, 32, 40, 48, 64) and tokens (`--space-1` … `--space-8` or `--space-xs` … `--space-xl`). Use them for padding, gap, and margins.

### 3.3 Typography scale (missing in code)

Font sizes are hardcoded: 11px, 12px, 13px, 14px, 16px, 28px. Line heights are implicit or one-off (e.g. 21px, 22px). No type scale or tokens.

**Recommendation:** Define a type scale (e.g. 12, 14, 16, 18, 24, 28) and tokens (`--font-size-xs` … `--font-size-display`) plus line heights (`--line-height-tight`, `--line-height-body`). Use in components and doc shell.

### 3.4 Elevation / shadow (missing)

Shadows are ad hoc (e.g. `0 1px 2px rgba(...)`, `0 4px 12px rgba(...)`). No elevation scale.

**Recommendation:** Optional: add `--shadow-sm`, `--shadow-md`, `--shadow-lg` for consistency.

---

## 4. Tokens that should be semantic

These are raw or component-specific values that would be better as shared semantic tokens.

### 4.1 From primitives → semantic (global)

| Current | Suggested semantic | Purpose |
|---------|--------------------|--------|
| `#ffffff` (multiple) | `--bg-surface` (already exists) | Use everywhere for default surface. |
| `#f8f9fa` / `#f3f4f6` | `--bg-elevated` (exists), add `--bg-subtle` if needed | Raised panels, hover, secondary surfaces. |
| `#f1f1f1` | `--bg-subtle` | Breadcrumb, custom alert, any muted fill. |
| `#111827` | `--text-primary` (exists) | Use everywhere for primary text. |
| `#414141` | `--text-primary` or `--text-default` | Unify with primary or define “default” from scale. |
| `#6b7280` | `--text-muted` (exists) | Use for all secondary text. |
| `#e5e7eb` / `#d1d5db` | `--border-subtle`, `--border-default` | All borders and dividers. |
| `#2563eb` | `--accent` (exists) | Use for active states, links, primary actions. |
| `#eff6ff` | `--bg-active` or `--bg-interactive-subtle` | Selected/active nav item. |

### 4.2 Component tokens → semantic

| Current | Suggested semantic | Purpose |
|---------|--------------------|--------|
| `--action-bar-bg` | `var(--bg-surface)` | Single surface token. |
| `--action-bar-text` | `var(--text-primary)` or `--text-default` | Single primary text. |
| `--action-bar-border` | `var(--border-default)` or `--border-strong` | From scale. |
| `--action-bar-info-border` | `var(--border-muted)` or `var(--text-muted)` | Muted border. |
| `--action-bar-breadcrumb-bg` | `var(--bg-subtle)` | Reuse with contextual-alert-custom. |
| `--contextual-alert-custom-bg` | `var(--bg-subtle)` | Same as above. |
| `--contextual-alert-info` | `--color-info` (new) | Reuse for any info UI. |
| `--contextual-alert-info-bg` | `--color-info-bg` (new) | Reuse for info backgrounds. |
| Same for warning, error, success | `--color-warning`, `--color-error`, `--color-success` (+ `-bg`) | System-wide status colors. |
| `--action-bar-font` / `--contextual-alert-font` | `var(--font-body)` (new) | Single UI font. |
| `--action-bar-gap` / `--contextual-alert-gap` | `var(--space-sm)` (new) | Shared spacing. |
| `--action-bar-radius` | `var(--radius-full)` (new) | Pill shape. |

### 4.3 Button (already partially semantic)

- Button **default** state is already semantic (`--color-button-*-background/label/border`).
- **Hover, pressed, disabled** exist in `buttonTokens.js` but are not defined or used in CSS; they should be added as semantic state tokens and used in modifier classes so behavior and Figma stay in sync.

### 4.4 Hardcoded values that should use tokens

| Location | Current | Use instead |
|----------|--------|-------------|
| `.side-nav__item.is-active` | `#eff6ff`, `#2563eb` | `var(--bg-active)` or `var(--bg-interactive-subtle)`, `var(--accent)` |
| `.side-nav__item:hover` | `#f3f4f6` | `var(--bg-elevated)` |
| `.segment` | `#e5e7eb` | `var(--border-subtle)` |
| `.segment__item.is-selected` | `#ffffff` | `var(--bg-surface)` |
| `.code-block__copy` | `#e5e7eb` | `var(--border-subtle)` or `--bg-subtle` |
| `.code-block__copy:hover` | `#d1d5db` | e.g. `var(--border-default)` or hover token |

---

## 5. Summary table

| Issue type | Count | Priority |
|------------|-------|----------|
| Duplicate values (white, grays, blue, font) | 7+ groups | High – consolidate to primitives + semantics |
| Inconsistent naming (bg vs background, component vs global) | 5+ patterns | Medium – adopt one convention |
| Scale gaps (color 400/600/700/800; spacing/type missing) | 3 scales | Medium – add steps and scales |
| Raw/component values that should be semantic | 15+ | High – introduce global semantics and reuse |

**Suggested order of work:**  
1) Define a small set of global semantic tokens (`--bg-surface`, `--text-primary`, `--border-subtle`, `--accent`, `--font-body`) and use them everywhere.  
2) Replace duplicate and component-only tokens with these (or new semantics like `--color-info`, `--bg-subtle`).  
3) Add spacing and radius scales and wire components to them.  
4) Fill color-scale gaps in JSON and map semantics to scale steps.  
5) Add Button hover/pressed/disabled color variables and use them in CSS.

---

*End of token analysis.*
