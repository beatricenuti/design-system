import React from "react";
import { buttonVariants, getButtonTokensForState } from "../design-tokens/buttonTokens.js";
import { Button } from "./Button.jsx";
import { CodeBlock } from "./CodeBlock.jsx";

export function ButtonDocs() {
  const [variantId, setVariantId] = React.useState("Flat");
  const [sizeId, setSizeId] = React.useState("L");
  const [stateId, setStateId] = React.useState("Default");
  const [typeId, setTypeId] = React.useState("Text");
  const [blackVersion, setBlackVersion] = React.useState(false);

  const tokensForState = getButtonTokensForState(variantId, stateId, blackVersion);

  const codeExample = `import { Button } from "./components/Button.jsx";

<Button
  variant="${variantId}"
  size="${sizeId}"
  state="${stateId}"
  type="${typeId}"
  text="Button"
  blackVersion={${blackVersion}}
/>`;

  return (
    <section className="docs-section" aria-labelledby="button-heading">
      <header className="docs-section__header">
        <h1 id="button-heading">Button</h1>
        <p className="docs-section__subtitle">
          Channels library — Prueba IA. Figma component (node{" "}
          <a
            href="https://www.figma.com/design/NkKgVEkdTAusdqHaqtUULO/%F0%9F%92%A5-Channels-library--Prueba-IA-?node-id=353-798&m=dev"
            target="_blank"
            rel="noreferrer"
          >
            353-798
          </a>
          ): Flat L Text default uses <code className="token-name">space/12</code> (48px),{" "}
          <code className="token-name">space/4</code> (16px) horizontal padding,{" "}
          <code className="token-name">space/0</code> vertical,{" "}
          <code className="token-name">radius/sm</code> (4px),{" "}
          <code className="token-name">color/brand/channels/500</code> (#009ee0),{" "}
          <code className="token-name">color/neutral/0</code> for label, Nunito Sans Bold{" "}
          <code className="token-name">font/size/md</code>. Hover 353-825 (15% black on base); Selected 353-828 (25%).
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

          <div className="controls-panel__group">
            <span className="controls-panel__label">Type</span>
            <div className="segment segment--wrap">
              {buttonVariants.types.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={[
                    "segment__item",
                    t.id === typeId && "is-selected",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setTypeId(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="controls-panel__group">
            <span className="controls-panel__label">Black version</span>
            <div className="segment">
              <button
                type="button"
                className={[
                  "segment__item",
                  blackVersion && "is-selected",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setBlackVersion((b) => !b)}
              >
                {blackVersion ? "On" : "Off"}
              </button>
            </div>
          </div>
        </div>

        <div className="preview-panel">
          <span className="preview-panel__label">Preview</span>
          <Button
            variant={variantId}
            size={sizeId}
            state={stateId}
            type={typeId}
            text="Button"
            blackVersion={blackVersion}
          />
        </div>
      </div>

      <section aria-label="Button tokens" className="tokens-section">
        <h2>Tokens</h2>
        <p className="tokens-section__description">
          Semantic variables from Figma for this component. Sync with{" "}
          <strong>get_variable_defs</strong> on the selected button node.
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
                  <td>
                    <code className="token-name">{t.tokenName}</code>
                  </td>
                  <td>
                    <code className="token-name">{t.cssVariable}</code>
                  </td>
                  <td>
                    {typeof t.exampleValue === "string" &&
                      t.exampleValue.startsWith("#") && (
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
          Copy the snippet below. Use <code className="token-name">children</code> instead of{" "}
          <code className="token-name">text</code> when the label is plain text.
        </p>
        <CodeBlock code={codeExample} label="React" />
      </section>
    </section>
  );
}
