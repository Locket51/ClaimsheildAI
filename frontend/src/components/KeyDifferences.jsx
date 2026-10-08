import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

export default function KeyDifferences({ comparisonRows, policies, onOpenEvidence }) {
  const policyAName = policies[0]?.customName || policies[0]?.defaultLabel || 'Policy A';
  const policyBName = policies[1]?.customName || policies[1]?.defaultLabel || 'Policy B';
  const policyCName = policies[2]?.customName || policies[2]?.defaultLabel || 'Policy C';
  const hasPolicyC = policies.length > 2;

  // Key highlights: filter rows with notable differences
  const keyRows = comparisonRows.filter(r => 
    r.id === 'room_rent' || 
    r.id === 'co_pay' || 
    r.id === 'ped_waiting' || 
    r.id === 'emergency_notice' ||
    r.id === 'claim_deadline'
  );

  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Key Differences
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Crucial policy nuances that directly impact out-of-pocket costs and claim compliance.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.25rem'
      }}>
        {keyRows.map((row) => (
          <div 
            key={row.id} 
            className="card"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justify: 'space-between',
              padding: '1.35rem' 
            }}
          >
            <div>
              <div style={{ 
                display: 'flex', 
                justify: 'space-between', 
                alignItems: 'center', 
                marginBottom: '1rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.65rem'
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {row.category}
                </h3>
                <span className="eyebrow-label" style={{ fontSize: '0.68rem' }}>
                  {row.id.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              {/* Policy Values breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: hasPolicyC ? '1fr 1fr 1fr' : '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                    {policyAName}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {row.values.policy_a}
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                    {policyBName}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {row.values.policy_b}
                  </div>
                </div>

                {hasPolicyC && (
                  <div style={{
                    backgroundColor: 'var(--bg-surface-subtle)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                      {policyCName}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {row.values.policy_c}
                    </div>
                  </div>
                )}
              </div>

              {/* Analytical Summary Quote */}
              <blockquote style={{
                fontSize: '0.84rem',
                lineHeight: 1.5,
                color: 'var(--text-secondary)',
                borderLeft: '3px solid var(--color-accent)',
                paddingLeft: '0.75rem',
                margin: '0 0 1rem 0'
              }}>
                {row.summary}
              </blockquote>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', textAlign: 'right' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onOpenEvidence(row)}
                style={{ fontSize: '0.78125rem', padding: '0.35rem 0.75rem' }}
              >
                <FileText size={14} style={{ color: 'var(--color-accent)' }} />
                <span>View Evidence</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
