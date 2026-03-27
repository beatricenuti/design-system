import React from "react";
import { ChannelsButton } from "./ChannelsButton.jsx";
import { CodeBlock } from "./CodeBlock.jsx";

const VARIANTS = [{ id: "Flat", label: "Flat" }, { id: "Stroked", label: "Stroked" }, { id: "Ghost", label: "Ghost" }];
const SIZES = [{ id: "L", label: "L" }, { id: "M", label: "M" }, { id: "S", label: "S" }];
const STATES = [{ id: "Default", label: "Default" }, { id: "Hover", label: "Hover" }, { id: "Selected", label: "Selected" }, { id: "Disabled", label: "Disabled" }];
const TYPES = [{ id: "Text", label: "Text" }, { id: "Icon + text", label: "Icon + text" }, { id: "Text + icon", label: "Text + icon" }, { id: "Icon", label: "Icon" }];

export function ChannelsButtonDocs() {
  const [variantId, setVariantId] = React.useState("Flat");
  const [sizeId, setSizeId] = React.useState("L");
  const [stateId, setStateId] = React.useState("Default");
  const [typeId, setTypeId] = React.useState("Text");
  const [blackVersion, setBlackVersion] = React.useState(false);

  const codeExample = `import { ChannelsButton } from "./components/ChannelsButton.jsx";

<ChannelsButton
  variant="${variantId}"
  size="${sizeId}"
  state="${stateId}"
  type="${typeId}"
  text="Button"
  blackVersion={${blackVersion}}
/>`;

  return (
    <section className="docs-section" aria-labelledby="channels-button-heading">
      <header className="docs-section__header">
        <h1 id="channels-button-heading">Channels Button</h1>
        <p className="docs-section__subtitle">
          Channels library - Prueba IA. Default text button 353-798; Text + icon with add_box 353-870. Variants: Flat, Stroked, Ghost. Sizes: L, M, S.
        </p>
      </header>

      <div className="docs-section__content">
        <div className="controls-panel">
          <div className="controls-panel__group">
            <span className="controls-panel__label">Variant</span>
            <div className="segment">
              {VARIANTS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className={["segment__item", v.id === variantId && "is-selected"].filter(Boolean).join(" ")}
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
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={["segment__item", s.id === sizeId && "is-selected"].filter(Boolean).join(" ")}
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
              {STATES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={["segment__item", s.id === stateId && "is-selected"].filter(Boolean).join(" ")}
                  onClick={() => setStateId(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="controls-panel__group">
            <span className="controls-panel__label">Type</span>
            <div className="segment">
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={["segment__item", t.id === typeId && "is-selected"].filter(Boolean).join(" ")}
                  onClick={() => setTypeId(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="controls-panel__group">
            <span className="controls-panel__label">Black version</span>
            <button
              type="button"
              className={["segment__item", blackVersion && "is-selected"].filter(Boolean).join(" ")}
              onClick={() => setBlackVersion((b) => !b)}
            >
              {blackVersion ? "On" : "Off"}
            </button>
          </div>
        </div>

        <div className="preview-panel">
          <span className="preview-panel__label">Preview</span>
          <ChannelsButton
            variant={variantId}
            size={sizeId}
            state={stateId}
            type={typeId}
            text="Button"
            blackVersion={blackVersion}
          />
        </div>
      </div>

      <div className="code-section">
        <h2 className="docs-section__header" style={{ fontSize: "18px", marginTop: "24px" }}>Usage</h2>
        <CodeBlock code={codeExample} label="React" />
      </div>
    </section>
  );
}
