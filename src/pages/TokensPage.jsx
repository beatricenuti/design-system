import React from 'react';
import { COLOR_TOKENS, SEMANTIC_TOKENS, SPACING_TOKENS, RADIUS_TOKENS } from '../data/tokens.js';

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: '#414141', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</h2>
      {children}
    </section>
  );
}

function ColorSwatch({ name, hex, size = 'md' }) {
  const [copied, setCopied] = React.useState(false);
  const isLight = isLightColor(hex);

  function copy() {
    navigator.clipboard?.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (size === 'lg') {
    return (
      <div onClick={copy} title={copied ? '¡Copiado!' : 'Copiar hex'} style={{
        cursor: 'pointer', borderRadius: 10, overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ height: 56, background: hex, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {copied && <span style={{ fontSize: 11, fontWeight: 600, color: isLight ? '#212121' : '#fff' }}>✓ Copiado</span>}
        </div>
        <div style={{ padding: '6px 8px', background: '#fff' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#212121', fontFamily: 'monospace' }}>{hex}</div>
          <div style={{ fontSize: 10, color: '#a0a0a0', marginTop: 1, lineHeight: 1.3 }}>{name.split('/').slice(-2).join('/')}</div>
        </div>
      </div>
    );
  }

  return (
    <tr onClick={copy} style={{ cursor: 'pointer' }}
      onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
      onMouseLeave={e => e.currentTarget.style.background = ''}
    >
      <td style={{ padding: '8px 10px', fontSize: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: hex, border: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }} />
          <code style={{ fontSize: 11, background: '#f1f1f1', padding: '2px 5px', borderRadius: 4 }}>{name}</code>
        </div>
      </td>
      <td style={{ padding: '8px 10px', fontSize: 12, fontFamily: 'monospace', color: '#414141' }}>{hex}</td>
      <td style={{ padding: '8px 10px', fontSize: 11, color: '#a0a0a0' }}>{copied ? '✓ Copiado' : ''}</td>
    </tr>
  );
}

function isLightColor(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return (r*0.299 + g*0.587 + b*0.114) > 150;
}

export function TokensPage() {
  const [tab, setTab] = React.useState('primitive');
  const semanticCategories = [...new Set(SEMANTIC_TOKENS.map(t => t.category))];

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, color: '#212121' }}>Design Tokens</h1>
        <p style={{ margin: 0, fontSize: 14, color: '#767676' }}>Variables de diseño estructuradas en 2 colecciones: Primitives → Semantic.</p>
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, padding: 4, background: '#f1f1f1', borderRadius: 10, width: 'fit-content' }}>
        {[
          { id: 'primitive', label: 'Primitivos' },
          { id: 'semantic',  label: 'Semánticos' },
          { id: 'spacing',   label: 'Espaciado' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '7px 16px', borderRadius: 7, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            background: tab === t.id ? '#fff' : 'transparent',
            color: tab === t.id ? '#212121' : '#767676',
            fontWeight: tab === t.id ? 600 : 400, fontSize: 13,
            boxShadow: tab === t.id ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'primitive' && (
        <div>
          {Object.entries(COLOR_TOKENS).map(([group, tokens]) => (
            <Section key={group} title={group}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8 }}>
                {tokens.map(t => <ColorSwatch key={t.name} {...t} size="lg" />)}
              </div>
            </Section>
          ))}
        </div>
      )}

      {tab === 'semantic' && (
        <div>
          <p style={{ fontSize: 13, color: '#767676', margin: '0 0 20px' }}>
            Los tokens semánticos hacen referencia a tokens primitivos. Cambian automáticamente entre Light/Dark mode.
          </p>
          {semanticCategories.map(cat => (
            <Section key={cat} title={cat}>
              <div style={{ border: '1px solid #e8e8e8', borderRadius: 10, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead style={{ background: '#f8f8f8' }}>
                    <tr>
                      <th style={{ padding: '8px 10px', textAlign: 'left', color: '#767676', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Token</th>
                      <th style={{ padding: '8px 10px', textAlign: 'left', color: '#767676', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Valor (Light)</th>
                      <th style={{ padding: '8px 10px', width: 80 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {SEMANTIC_TOKENS.filter(t => t.category === cat).map(t => (
                      <ColorSwatch key={t.name} name={t.name} hex={t.hex} size="sm" />
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          ))}
        </div>
      )}

      {tab === 'spacing' && (
        <div>
          <Section title="Espaciado (Base 4px)">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {SPACING_TOKENS.map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8 }}>
                  <code style={{ fontSize: 12, color: '#414141', minWidth: 100, fontFamily: 'monospace' }}>{t.name}</code>
                  <span style={{ fontSize: 13, color: '#767676', minWidth: 44 }}>{t.value}</span>
                  <div style={{ height: 20, background: '#009ee0', borderRadius: 4, opacity: 0.8, width: parseInt(t.value) }} />
                </div>
              ))}
            </div>
          </Section>
          <Section title="Border Radius">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
              {RADIUS_TOKENS.map(t => (
                <div key={t.name} style={{ padding: '12px 14px', background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ width: '100%', height: 40, background: '#e0f3fb', border: '2px solid #009ee0', borderRadius: parseInt(t.value) || 0 }} />
                  <code style={{ fontSize: 11, color: '#414141', fontFamily: 'monospace' }}>{t.name}</code>
                  <span style={{ fontSize: 12, color: '#767676' }}>{t.value}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}
    </div>
  );
}
