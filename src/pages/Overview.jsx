import React from 'react';
import { CATEGORIES, STATUSES, STATUS_COUNTS, ALL_COMPONENTS, CATEGORY_COLORS } from '../data/components.js';
import { StatusBadge } from '../components/StatusBadge.jsx';

const FIGMA_FILE = 'https://www.figma.com/design/NkKgVEkdTAusdqHaqtUULO/';
const total = ALL_COMPONENTS.length;

function StatCard({ value, label, color }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 28, fontWeight: 700, color, lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: 13, color: '#767676' }}>{label}</span>
    </div>
  );
}

function ComponentCard({ item, onSelect, accentColor, accentBg }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        all: 'unset', cursor: 'pointer',
        background: '#fff',
        border: `1px solid ${hovered ? accentColor : '#e8e8e8'}`,
        borderRadius: 12,
        padding: '0',
        display: 'flex', flexDirection: 'column',
        transition: 'border-color .15s, box-shadow .15s',
        textAlign: 'left',
        overflow: 'hidden',
        boxShadow: hovered ? `0 0 0 3px ${accentBg}` : 'none',
      }}
    >
      {/* Accent bar top */}
      <div style={{ height: 3, background: accentColor, width: '100%', flexShrink: 0 }} />

      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#212121', lineHeight: 1.3 }}>{item.name}</span>
          <StatusBadge status={item.status} size="sm" />
        </div>

        <p style={{ margin: 0, fontSize: 12, color: '#767676', lineHeight: 1.5 }}>{item.description}</p>

        {/* Usage hint on hover */}
        {hovered && item.usage && (
          <p style={{ margin: 0, fontSize: 11, color: accentColor, lineHeight: 1.5, borderTop: '1px solid #f1f1f1', paddingTop: 7 }}>
            {item.usage.split('.')[0]}.
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto', paddingTop: 4 }}>
          {item.variants && (
            <span style={{ fontSize: 10, color: '#a0a0a0', background: '#f1f1f1', padding: '2px 6px', borderRadius: 5, fontFamily: 'monospace' }}>
              {item.variants} var.
            </span>
          )}
          {item.tokens && (
            <span style={{ fontSize: 10, color: '#007796', background: '#cafcf8', padding: '2px 6px', borderRadius: 5 }}>tokens</span>
          )}
          <a
            href={FIGMA_FILE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontSize: 10, color: '#009ee0', marginLeft: 'auto', textDecoration: 'none' }}
          >
            Figma ↗
          </a>
        </div>
      </div>
    </button>
  );
}

export function Overview({ onSelectComponent }) {
  const [search, setSearch] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('all');

  const filtered = ALL_COMPONENTS.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !search || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || (c.usage || '').toLowerCase().includes(q);
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const groupedFiltered = CATEGORIES.map(cat => ({
    ...cat,
    items: cat.items.filter(i => filtered.some(f => f.id === i.id)),
  })).filter(cat => cat.items.length > 0);

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#212121' }}>Componentes</h1>
            <p style={{ margin: 0, fontSize: 13, color: '#767676' }}>Catálogo completo del Channels Design System</p>
          </div>
          <a href={FIGMA_FILE} target="_blank" rel="noopener noreferrer" style={{
            marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 8, background: '#f1f1f1',
            color: '#414141', textDecoration: 'none', fontSize: 13, fontWeight: 500,
          }}>
            <svg width="14" height="14" viewBox="0 0 38 57" fill="none">
              <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
              <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
              <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
              <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
              <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#FF7262"/>
            </svg>
            Figma
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 8, marginBottom: 20 }}>
          <StatCard value={total}                       label="Total"   color="#212121" />
          <StatCard value={STATUS_COUNTS.stable || 0}   label="Stable"  color={STATUSES.stable.color} />
          <StatCard value={STATUS_COUNTS.beta || 0}     label="Beta"    color={STATUSES.beta.color} />
          <StatCard value={STATUS_COUNTS.wip || 0}      label="WIP"     color={STATUSES.wip.color} />
          <StatCard value={STATUS_COUNTS.new || 0}      label="New"     color={STATUSES.new.color} />
        </div>

        {/* Search + filter */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 240px' }}>
            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#a0a0a0', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar componente…"
              style={{ width: '100%', padding: '9px 12px 9px 34px', borderRadius: 8, border: '1px solid #e8e8e8', fontSize: 14, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#009ee0'}
              onBlur={e => e.target.style.borderColor = '#e8e8e8'}
            />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['all', 'stable', 'beta', 'wip', 'new'].map(s => {
              const active = filterStatus === s;
              const st = STATUSES[s];
              return (
                <button key={s} onClick={() => setFilterStatus(s)} style={{
                  padding: '7px 12px', borderRadius: 8, border: '1px solid',
                  borderColor: active ? (st ? st.color : '#009ee0') : '#e8e8e8',
                  background: active ? (st ? st.bg : '#e0f3fb') : '#fff',
                  color: active ? (st ? st.color : '#009ee0') : '#767676',
                  fontSize: 12, fontWeight: active ? 600 : 400, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  {s === 'all' ? `Todos (${total})` : `${STATUSES[s].label} (${STATUS_COUNTS[s] || 0})`}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      {groupedFiltered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#a0a0a0' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
          <p style={{ fontSize: 15, margin: 0 }}>No se encontraron componentes para «{search}»</p>
        </div>
      ) : (
        groupedFiltered.map(cat => {
          const colors = CATEGORY_COLORS[cat.id] || { accent: '#414141', bg: '#f1f1f1' };
          return (
            <section key={cat.id} style={{ marginBottom: 36 }}>
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                  {cat.icon}
                </div>
                <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#414141', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  {cat.label}
                </h2>
                <span style={{ fontSize: 11, color: colors.accent, background: colors.bg, padding: '2px 8px', borderRadius: 6, fontFamily: 'monospace', fontWeight: 600 }}>
                  {cat.items.length}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                {cat.items.map(item => (
                  <ComponentCard
                    key={item.id}
                    item={item}
                    onSelect={onSelectComponent}
                    accentColor={colors.accent}
                    accentBg={colors.bg}
                  />
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
