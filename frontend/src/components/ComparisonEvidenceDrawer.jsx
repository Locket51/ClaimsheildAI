import React from 'react';
import { X, FileText, ShieldCheck } from 'lucide-react';

export default function ComparisonEvidenceDrawer({ row, policies, onClose }) {
  if (!row) return null;

  const policyAName = policies[0]?.customName || policies[0]?.defaultLabel || 'Policy A';
  const policyBName = policies[1]?.customName || policies[1]?.defaultLabel || 'Policy B';
  const policyCName = policies[2]?.customName || policies[2]?.defaultLabel || 'Policy C';
  const hasPolicyC = policies.length > 2;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              GROUNDED CLAUSE EVIDENCE
            </span>
            <h2 className="modal-title" style={{ marginTop: '0.15rem' }}>
              {row.category}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="btn btn-outline" 
            style={{ padding: '0.35rem', borderRadius: 'var(--radius-full)' }}
            aria-label="Close Evidence Drawer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Policy A Evidence */}
          <div style={{
            backgroundColor: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.15rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={16} style={{ color: 'var(--color-accent)' }} />
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  {policyAName}
                </strong>
              </div>
              <span className="chip" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                Page {row.evidence.policy_a.page}
              </span>
            </div>

            <blockquote style={{
              fontSize: '0.875rem',
              color: 'var(--text-body)',
              fontStyle: 'italic',
              lineHeight: 1.5,
              borderLeft: '3px solid var(--color-accent)',
              paddingLeft: '0.75rem',
              margin: '0.5rem 0 0.5rem 0'
            }}>
              "{row.evidence.policy_a.quote}"
            </blockquote>

            <div style={{ fontSize: '0.78125rem', color: 'var(--text-muted)' }}>
              Stated value: <strong>{row.values.policy_a}</strong>
            </div>
          </div>

          {/* Policy B Evidence */}
          <div style={{
            backgroundColor: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.15rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={16} style={{ color: 'var(--color-accent)' }} />
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  {policyBName}
                </strong>
              </div>
              <span className="chip" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                Page {row.evidence.policy_b.page}
              </span>
            </div>

            <blockquote style={{
              fontSize: '0.875rem',
              color: 'var(--text-body)',
              fontStyle: 'italic',
              lineHeight: 1.5,
              borderLeft: '3px solid var(--color-accent)',
              paddingLeft: '0.75rem',
              margin: '0.5rem 0 0.5rem 0'
            }}>
              "{row.evidence.policy_b.quote}"
            </blockquote>

            <div style={{ fontSize: '0.78125rem', color: 'var(--text-muted)' }}>
              Stated value: <strong>{row.values.policy_b}</strong>
            </div>
          </div>

          {/* Policy C Evidence (if present) */}
          {hasPolicyC && row.evidence.policy_c && (
            <div style={{
              backgroundColor: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.15rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={16} style={{ color: 'var(--color-accent)' }} />
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {policyCName}
                  </strong>
                </div>
                <span className="chip" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                  Page {row.evidence.policy_c.page}
                </span>
              </div>

              <blockquote style={{
                fontSize: '0.875rem',
                color: 'var(--text-body)',
                fontStyle: 'italic',
                lineHeight: 1.5,
                borderLeft: '3px solid var(--color-accent)',
                paddingLeft: '0.75rem',
                margin: '0.5rem 0 0.5rem 0'
              }}>
                "{row.evidence.policy_c.quote}"
              </blockquote>

              <div style={{ fontSize: '0.78125rem', color: 'var(--text-muted)' }}>
                Stated value: <strong>{row.values.policy_c}</strong>
              </div>
            </div>
          )}

          {/* Analytical Takeaway */}
          <div style={{
            backgroundColor: 'var(--color-accent-light)',
            border: '1px solid var(--severity-attention-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <ShieldCheck size={16} style={{ color: 'var(--color-accent)' }} />
              <strong style={{ fontSize: '0.84rem', color: 'var(--color-accent)', textTransform: 'uppercase' }}>
                Audit Finding Takeaway
              </strong>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {row.summary}
            </p>
          </div>

        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close Evidence
          </button>
        </div>
      </div>
    </div>
  );
}
