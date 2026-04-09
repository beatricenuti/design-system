import React from 'react';
import { CATEGORIES, CATEGORY_COLORS, STATUSES } from '../data/components.js';
import { StatusBadge } from '../components/StatusBadge.jsx';
import { ButtonDocs } from '../components/ButtonDocs.jsx';
import { ActionBarDocs } from '../components/ActionBarDocs.jsx';
import { ContextualAlertDocs } from '../components/ContextualAlertDocs.jsx';

const FIGMA_FILE = 'https://www.figma.com/design/NkKgVEkdTAusdqHaqtUULO/';

const EMBEDDED_DOCS = {
  button: ButtonDocs,
  'action-bar': ActionBarDocs,
  'contextual-alert': ContextualAlertDocs,
};

function SectionHeading({ children }) {
  return <h2 className="detail-section-heading">{children}</h2>;
}

function HeroSection({ comp, colors, onBack }) {
  return (
    <div style={{ marginBottom: 36 }}>
      {/* Back breadcrumb */}
      <button onClick={onBack} style={{
        all: 'unset', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5,
        fontSize: 13, color: '#a0a0a0', marginBottom: 22, fontFamily: 'inherit',
      }}
        onMouseEnter={e => e.currentTarget.style.color = '#009ee0'}
        onMouseLeave={e => e.currentTarget.style.color = '#a0a0a0'}
      >
        ← Todos los componentes
      </button>

      {/* Color accent bar */}
      <div style={{ height: 4, width: 48, borderRadius: 999, background: colors.accent, marginBottom: 20 }} />

      {/* Category pill */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '3px 10px', borderRadius: 999,
        background: colors.bg, color: colors.accent,
        fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em',
        marginBottom: 12,
      }}>
        {comp.categoryLabel}
      </div>

      {/* Title + badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#212121' }}>{comp.name}</h1>
        <StatusBadge status={comp.status} />
      </div>

      {/* Description */}
      <p style={{ margin: '0 0 20px', fontSize: 15, color: '#414141', lineHeight: 1.65, maxWidth: 580 }}>
        {comp.description}
      </p>

      {/* Figma link */}
      <a href={FIGMA_FILE} target="_blank" rel="noopener noreferrer" style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '9px 16px', borderRadius: 8, border: '1px solid #e8e8e8',
        color: '#414141', textDecoration: 'none', fontSize: 13, fontWeight: 500,
        background: '#fff',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#009ee0'; e.currentTarget.style.color = '#009ee0'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8'; e.currentTarget.style.color = '#414141'; }}
      >
        <svg width="14" height="14" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
          <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#FF7262"/>
        </svg>
        Ver en Figma ↗
      </a>
    </div>
  );
}

function WhenToUseSection({ comp }) {
  if (!comp.usage) return null;
  return (
    <section style={{ marginBottom: 32 }}>
      <SectionHeading>Cuándo usar este componente</SectionHeading>
      <p style={{ margin: 0, fontSize: 15, color: '#414141', lineHeight: 1.7, maxWidth: 640 }}>
        {comp.usage}
      </p>
    </section>
  );
}

function DosAndDonts({ comp }) {
  if (!comp.doUse?.length && !comp.dontUse?.length) return null;
  return (
    <section style={{ marginBottom: 36 }}>
      <SectionHeading>Guía de uso</SectionHeading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {comp.doUse?.length > 0 && (
          <div style={{ background: '#f2fbce', border: '1.5px solid #9ec84f', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#517c00', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14 }}>✓</span> Cuándo sí usar
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {comp.doUse.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#3a5c00', lineHeight: 1.5 }}>
                  <span style={{ color: '#517c00', flexShrink: 0, fontWeight: 700, marginTop: 1 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {comp.dontUse?.length > 0 && (
          <div style={{ background: '#fff0ed', border: '1.5px solid #ff8a80', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ce001b', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14 }}>✕</span> Cuándo no usar
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {comp.dontUse.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#7a0010', lineHeight: 1.5 }}>
                  <span style={{ color: '#ce001b', flexShrink: 0, fontWeight: 700, marginTop: 1 }}>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function VariantsSection({ comp, colors }) {
  if (!comp.variants || comp.variants === 0) return null;
  return (
    <section style={{ marginBottom: 36 }}>
      <SectionHeading>Variantes</SectionHeading>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: colors.bg, padding: '8px 14px', borderRadius: 8 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: colors.accent, fontFamily: 'monospace' }}>{comp.variants}</span>
          <span style={{ fontSize: 13, color: '#414141' }}>variantes disponibles</span>
        </div>
        <a href={FIGMA_FILE} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 13, color: '#009ee0', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          Ver todas en Figma ↗
        </a>
      </div>
      <p style={{ margin: '10px 0 0', fontSize: 13, color: '#767676', lineHeight: 1.5, maxWidth: 520 }}>
        Explora el set completo de variantes, estados y combinaciones de propiedades en el archivo Figma.
      </p>
    </section>
  );
}

function RelatedComponents({ related, onNavigate }) {
  if (!related.length) return null;
  return (
    <section style={{ marginBottom: 40 }}>
      <SectionHeading>Componentes relacionados</SectionHeading>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {related.map(comp => {
          const colors = CATEGORY_COLORS[comp.category] || CATEGORY_COLORS.display;
          return (
            <button key={comp.id} onClick={() => onNavigate(comp.id)} style={{
              all: 'unset', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 14px', background: '#fff',
              border: '1px solid #e8e8e8', borderRadius: 10,
              fontFamily: 'inherit',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = colors.accent; e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.bg}`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: '#212121' }}>{comp.name}</span>
              <StatusBadge status={comp.status} size="sm" />
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function ComponentDetail({ componentId, onNavigate, onBack }) {
  const allItems = CATEGORIES.flatMap(c =>
    c.items.map(i => ({ ...i, category: c.id, categoryLabel: c.label }))
  );
  const comp = allItems.find(i => i.id === componentId);

  if (!comp) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: 12, textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>🔍</div>
        <h2 style={{ margin: 0, fontSize: 18, color: '#212121' }}>Componente no encontrado</h2>
        <button onClick={onBack} style={{ all: 'unset', cursor: 'pointer', color: '#009ee0', fontSize: 14, fontFamily: 'inherit' }}>
          ← Volver a componentes
        </button>
      </div>
    );
  }

  const colors = CATEGORY_COLORS[comp.category] || { accent: '#414141', bg: '#f1f1f1' };
  const EmbeddedDocs = EMBEDDED_DOCS[componentId];

  const related = (comp.relatedComponents || [])
    .map(id => allItems.find(i => i.id === id))
    .filter(Boolean);

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <HeroSection comp={comp} colors={colors} onBack={onBack} />
      <WhenToUseSection comp={comp} />
      <DosAndDonts comp={comp} />
      <VariantsSection comp={comp} colors={colors} />
      <RelatedComponents related={related} onNavigate={onNavigate} />

      {/* Embedded full docs for documented components */}
      {EmbeddedDocs && (
        <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: 36, marginTop: 8 }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#767676' }}>
              Documentación interactiva
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: '#a0a0a0' }}>
              Prueba el componente con controles en tiempo real.
            </p>
          </div>
          <EmbeddedDocs />
        </div>
      )}
    </div>
  );
}
