import React from 'react';

const FIGMA_FILE = 'https://www.figma.com/design/NkKgVEkdTAusdqHaqtUULO/';

function QuickLinkCard({ icon, title, description, cta, onClick, href }) {
  const [hovered, setHovered] = React.useState(false);
  const style = {
    display: 'flex', flexDirection: 'column', gap: 10,
    padding: '20px 22px', borderRadius: 14,
    border: `1px solid ${hovered ? '#009ee0' : '#e8e8e8'}`,
    boxShadow: hovered ? '0 0 0 3px rgba(0,158,224,.1)' : 'none',
    background: '#fff', textDecoration: 'none', color: 'inherit',
    transition: 'border-color .15s, box-shadow .15s',
    cursor: 'pointer',
  };

  const inner = (
    <>
      <div style={{ fontSize: 28 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#212121', marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 13, color: '#767676', lineHeight: 1.5 }}>{description}</div>
      </div>
      <div style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#009ee0' }}>
        {cta} →
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {inner}
      </a>
    );
  }

  return (
    <button onClick={onClick} style={{ ...style, all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10, padding: '20px 22px', borderRadius: 14, border: `1px solid ${hovered ? '#009ee0' : '#e8e8e8'}`, boxShadow: hovered ? '0 0 0 3px rgba(0,158,224,.1)' : 'none', background: '#fff', transition: 'border-color .15s, box-shadow .15s' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {inner}
    </button>
  );
}

export function GettingStarted({ onNavigate }) {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>

      {/* Hero */}
      <div className="getting-started-hero">
        <div style={{ width: 52, height: 52, borderRadius: 14, background: '#009ee0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </div>
        <h1>Channels Design System</h1>
        <p style={{ margin: '0 0 24px', fontSize: 16, color: '#767676', maxWidth: 560, lineHeight: 1.6 }}>
          Una librería de componentes, tokens y guías de uso para construir interfaces consistentes,
          accesibles y alineadas con la marca en todos los productos de Channels.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('overview')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '10px 20px', borderRadius: 8, border: 'none',
            background: '#009ee0', color: '#fff', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Explorar componentes →
          </button>
          <a href={FIGMA_FILE} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '10px 20px', borderRadius: 8, border: '1px solid #e8e8e8',
            color: '#414141', fontSize: 14, fontWeight: 500, textDecoration: 'none',
          }}>
            <svg width="14" height="14" viewBox="0 0 38 57" fill="none">
              <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
              <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
              <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
              <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
              <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#FF7262"/>
            </svg>
            Abrir en Figma
          </a>
        </div>
      </div>

      {/* Token Hierarchy */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#767676' }}>
            Arquitectura de tokens
          </h2>
        </div>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: '#a0a0a0', lineHeight: 1.5 }}>
          Los tokens se organizan en tres capas. Cambiar un valor primitivo se propaga automáticamente a todos los componentes que lo usan.
        </p>
        <div className="token-hierarchy">
          <div className="token-hierarchy__col">
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#009ee0', marginBottom: 10 }}>1 · Primitivos</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#212121', marginBottom: 6 }}>Valores base</div>
            <p style={{ margin: '0 0 14px', fontSize: 12, color: '#767676', lineHeight: 1.5 }}>
              Los valores de diseño más básicos: hexadecimales de color, píxeles de tamaño.
            </p>
            <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: '8px 10px', fontFamily: 'monospace', fontSize: 11 }}>
              <div style={{ color: '#a0a0a0' }}>color/brand/channels/500</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: '#009ee0', border: '1px solid rgba(0,0,0,.1)' }} />
                <span style={{ color: '#212121', fontWeight: 600 }}>#009ee0</span>
              </div>
            </div>
          </div>

          <div className="token-hierarchy__col">
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7c3aed', marginBottom: 10 }}>2 · Semánticos</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#212121', marginBottom: 6 }}>Significado de uso</div>
            <p style={{ margin: '0 0 14px', fontSize: 12, color: '#767676', lineHeight: 1.5 }}>
              Tokens con nombre semántico. Cambian entre Light y Dark mode automáticamente.
            </p>
            <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: '8px 10px', fontFamily: 'monospace', fontSize: 11 }}>
              <div style={{ color: '#a0a0a0' }}>color/action/primary/default</div>
              <div style={{ color: '#7c3aed', marginTop: 4 }}>→ color/brand/channels/500</div>
            </div>
          </div>

          <div className="token-hierarchy__col">
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2e7d32', marginBottom: 10 }}>3 · Componentes</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#212121', marginBottom: 6 }}>Uso en la UI</div>
            <p style={{ margin: '0 0 14px', fontSize: 12, color: '#767676', lineHeight: 1.5 }}>
              Los componentes usan tokens semánticos, nunca valores primitivos directamente.
            </p>
            <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: '8px 10px', fontFamily: 'monospace', fontSize: 11 }}>
              <div style={{ color: '#a0a0a0' }}>Button (Flat)</div>
              <div style={{ color: '#2e7d32', marginTop: 4 }}>→ color/action/primary/default</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#767676' }}>
          Por dónde empezar
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 16 }}>
          <QuickLinkCard
            icon="⊞"
            title="Explorar componentes"
            description="Navega el catálogo completo de 50+ componentes organizados por categoría."
            cta="Ver componentes"
            onClick={() => onNavigate('overview')}
          />
          <QuickLinkCard
            icon="◈"
            title="Design Tokens"
            description="Explora los tokens de color, espaciado y tipografía del sistema."
            cta="Ver tokens"
            onClick={() => onNavigate('tokens')}
          />
          <QuickLinkCard
            icon=""
            title="Archivo Figma"
            description="Accede al archivo de diseño con todos los componentes y variables."
            cta="Abrir Figma"
            href={FIGMA_FILE}
          />
        </div>
      </section>

      {/* How to navigate */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#767676' }}>
          Cómo usar esta documentación
        </h2>
        <div style={{ background: '#f8f9fa', border: '1px solid #e8e8e8', borderRadius: 14, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { n: '1', title: 'Busca el componente', desc: 'Usa el buscador en "Componentes" o navega por el sidebar por categorías para encontrar lo que necesitas.' },
            { n: '2', title: 'Lee cuándo usarlo', desc: 'Cada componente tiene una guía de "Cuándo sí" y "Cuándo no" para ayudarte a tomar la decisión correcta.' },
            { n: '3', title: 'Consulta el archivo Figma', desc: 'Para ver todas las variantes, estados y especificaciones detalladas, cada componente tiene un link directo al archivo.' },
          ].map((step, i, arr) => (
            <div key={step.n} style={{ display: 'flex', gap: 16, paddingBottom: i < arr.length - 1 ? 20 : 0, marginBottom: i < arr.length - 1 ? 20 : 0, borderBottom: i < arr.length - 1 ? '1px solid #e8e8e8' : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: '#009ee0', color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {step.n}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#212121', marginBottom: 3 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: '#767676', lineHeight: 1.5 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
