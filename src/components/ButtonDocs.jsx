import React from "react";
import { buttonVariants, getButtonTokensForState } from "../design-tokens/buttonTokens.js";
import { Button } from "./Button.jsx";
import { CodeBlock } from "./CodeBlock.jsx";

export function ButtonDocs() {
  const [variantId, setVariantId] = React.useState("primary");
  const [sizeId, setSizeId] = React.useState("medium");
  const [stateId, setStateId] = React.useState("default");

  const variant = buttonVariants.variants.find((v) => v.id === variantId);
  const size = buttonVariants.sizes.find((s) => s.id === sizeId);
  const state = buttonVariants.states.find((s) => s.id === stateId);

  const tokensForState = getButtonTokensForState(variantId, stateId);

  const codeExample = `import { Button } from "./components/Button.jsx";

<Button
  variant="${variantId}"
  size="${sizeId}"
  ${stateId === "disabled" ? "disabled" : ""}
>
  Label
</Button>`;

  return (
    <section className="docs-section" aria-labelledby="button-heading">
      <header className="docs-section__header">
        <h1 id="button-heading">Button</h1>
        <p className="docs-section__subtitle">
          Buttons trigger actions in the interface (submit, cancel, navigate). They use semantic
          design tokens for color, typography, spacing, and interaction states. Use Primary for
          the main action, Secondary for supporting actions, and Tertiary for low-emphasis or
          text-like actions. Available in three sizes (Small, Medium, Large) and with clear
          default, hover, pressed, and disabled states.
        </p>
      </header>

      <div className="docs-section__content">
        <div className="controls-panel">
          <div className="controls-panel__group">
            <span className="controls-panel__label">Variant</span>
            <div className="segment">
              {buttonVariants.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className={[
                    "segment__item",
                    v.id === variantId && "is-selected",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setVariantId(v.id)}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div className="controls-panel__group">
            <span className="controls-panel__label">Size</span>
            <div className="segment">
              {buttonVariants.sizes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={[
                    "segment__item",
                    s.id === sizeId && "is-selected",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setSizeId(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="controls-panel__group">
            <span className="controls-panel__label">State</span>
            <div className="segment">
              {buttonVariants.states.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={[
                    "segment__item",
                    s.id === stateId && "is-selected",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setStateId(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="preview-panel">
          <span className="preview-panel__label">Preview</span>
          <Button
            variant={variant.id}
            size={size.id}
            state={state.id}
            disabled={state.id === "disabled"}
          >
            Label
          </Button>
        </div>
      </div>

      <section aria-label="Button tokens" className="tokens-section">
        <h2>Tokens</h2>
        <p className="tokens-section__description">
          Semantic tokens for the selected variant and state. These names match Figma variable naming.
          Select your button component in Figma and use <strong>get_variable_defs</strong> to sync exact values.
        </p>
        <div className="tokens-table-wrapper">
          <table className="tokens-table">
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">Token name</th>
                <th scope="col">CSS variable</th>
                <th scope="col">Example value</th>
              </tr>
            </thead>
            <tbody>
              {tokensForState.map((t) => (
                <tr key={`${t.role}-${t.tokenName}`}>
                  <td>{t.role}</td>
                  <td><code className="token-name">{t.tokenName}</code></td>
                  <td><code className="token-name">{t.cssVariable}</code></td>
                  <td>
                    {t.exampleValue !== "transparent" && (
                      <span
                        className="tokens-table__swatch"
                        style={{ background: t.exampleValue }}
                      />
                    )}
                    {t.exampleValue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label="React usage" className="code-section">
        <h2>React code</h2>
        <p className="code-section__description">
          Use the Button component with the same props. Copy the code below.
        </p>
        <CodeBlock code={codeExample} label="React" />
      </section>
    </section>
  );
}
