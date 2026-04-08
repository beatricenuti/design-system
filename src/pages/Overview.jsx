import React from 'react';
import { CATEGORIES, STATUSES, STATUS_COUNTS, ALL_COMPONENTS } from '../data/components.js';
import { StatusBadge } from '../components/StatusBadge.jsx';

const FIGMA_FILE = 'https://www.figma.com/design/NkKgVEkdTAusdqHaqtUULO/';

const total = ALL_COMPONENTS.length;

function StatCard({ value, label, color }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12,
      padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <span style={{ fontSize: 28, fontWeight: 700, color, lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: 13, color: '#767676' }}>{label}</span>
    </div>
  );
}

function ComponentCard({ item, onSelect }) {
  const s = STATUSES[item.status];
  return (
    <button onClick={() => onSelect(item.id)} style={{
      all: 'unset', cursor: 'pointer',
      background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12,
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8,
      transition: 'border-color .15s, box-shadow .15s',
      textAlign: 'left',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#009ee0'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,158,224,.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#212121', lineHeight: 1.3 }}>{item.name}</span>
        <StatusBadge status={item.status} size="sm" />
      </div>
      <p style={{ margin: 0, fontSize: 12, color: '#767676', lineHeight: 1.5 }}>{item.description}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
        {item.variants && (
          <span style={{ fontSize: 11, color: '#a0a0a0', background: '#f1f1f1', padding: '2px 7px', borderRadius: 6, fontFamily: 'monospace' }}>
            {item.variants} variantes
          </span>
        )}
        {item.tokens && (
          <span style={{ fontSize: 11, color: '#007796', background: '#cafcf8', padding: '2px 7px', borderRadius: 6 }}>tokens</span>
        )}
        <a
          href={FIGMA_FILE}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{ fontSize: 11, color: '#009ee0', marginLeft: 'auto', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}
        >
          Figma ↗
        </a>
      </div>
    </button>
  );
}

export function Overview({ onSelectComponent }) {
  const [search, setSearch] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('all');

  const filtered = ALL_COMPONENTS.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const groupedFiltered = CATEGORIES.map(cat => ({
    ...cat,
    items: cat.items.filter(i => filtered.some(f => f.id === i.id)),
  })).filter(cat => cat.items.length > 0);

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#009ee0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#212121' }}>Channels Design System</h1>
            <p style={{ margin: 0, fontSize: 13, color: '#767676' }}>💥 Channels library — Prueba IA</p>
          </div>
          <a href={FIGMA_FILE} target="_blank" rel="noopener noreferrer" style={{
            marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 8, background: '#f1f1f1',
            color: '#414141', textDecoration: 'none', fontSize: 13, fontWeight: 500,
          }}>
            <svg width="16" height="16" viewBox="0 0 38 57" fill="none"><path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/><path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/><path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/><path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/><path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#FF7262"/></svg>
            Abrir en Figma
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, marginBottom: 24 }}>
          <StatCard value={total} label="Componentes total" color="#212121" />
          <StatCard value={STATUS_COUNTS.stable || 0}     label="Stable"     color={STATUSES.stable.color} />
          <StatCard value={STATUS_COUNTS.beta || 0}       label="Beta"       color={STATUSES.beta.color} />
          <StatCard value={STATUS_COUNTS.wip || 0}        label="WIP"        color={STATUSES.wip.color} />
          <StatCard value={STATUS_COUNTS.new || 0}        label="New"        color={STATUSES.new.color} />
        </div>

        {/* Search + filter */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 240px' }}>
            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#a0a0a0' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  padding: '7px 13px', borderRadius: 8, border: '1px solid',
                  borderColor: active ? (st ? st.color : '#009ee0') : '#e8e8e8',
                  background: active ? (st ? st.bg : '#e0f3fb') : '#fff',
                  color: active ? (st ? st.color : '#009ee0') : '#767676',
                  fontSize: 13, fontWeight: active ? 600 : 400, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  {s === 'all' ? `Todos (${total})` : `${STATUSES[s].label} (${STATUS_COUNTS[s] || 0})`}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Component grid by category */}
      {groupedFiltered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#a0a0a0' }}>
          <p style={{ fontSize: 16 }}>No se encontraron componentes para «{search}»</p>
        </div>
      ) : (
        groupedFiltered.map(cat => (
          <section key={cat.id} style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 16 }}>{cat.icon}</span>
              <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#414141', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{cat.label}</h2>
              <span style={{ fontSize: 12, color: '#a0a0a0', fontFamily: 'monospace', background: '#f1f1f1', padding: '1px 7px', borderRadius: 6 }}>{cat.items.length}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
              {cat.items.map(item => (
                <ComponentCard key={item.id} item={item} onSelect={onSelectComponent} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
