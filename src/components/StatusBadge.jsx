import React from 'react';
import { STATUSES } from '../data/components.js';

export function StatusBadge({ status, size = 'md' }) {
  const s = STATUSES[status] || STATUSES.wip;
  const px = size === 'sm' ? '3px 8px' : '4px 10px';
  const fs = size === 'sm' ? '11px' : '12px';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: px, borderRadius: 999,
      background: s.bg, color: s.color,
      fontSize: fs, fontWeight: 600, whiteSpace: 'nowrap',
      lineHeight: 1.4,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {s.label}
    </span>
  );
}
