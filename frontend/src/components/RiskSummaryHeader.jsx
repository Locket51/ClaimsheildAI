import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export default function RiskSummaryHeader({ reportData }) {
  const { statusLabel, issueCount, summary } = reportData;

  return (
    <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--severity-high)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="severity-pill severity-high" style={{ marginBottom: '0.5rem' }}>
            <AlertTriangle size={12} />
            {statusLabel}
          </span>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
            Claim Risk Report
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', maxWidth: '640px' }}>
            {summary}
          </p>
        </div>

        <div style={{
          backgroundColor: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1.25rem',
          textAlign: 'center',
          minWidth: '140px'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--severity-high)' }}>
            {issueCount}
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Issues Identified
          </div>
        </div>
      </div>
    </div>
  );
}
