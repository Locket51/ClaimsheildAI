import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, HelpCircle } from 'lucide-react';

export default function ComparisonTable({ comparisonRows, policies, onOpenEvidence }) {
  const policyAName = policies[0]?.customName || policies[0]?.defaultLabel || 'Policy A';
  const policyBName = policies[1]?.customName || policies[1]?.defaultLabel || 'Policy B';
  const policyCName = policies[2]?.customName || policies[2]?.defaultLabel || 'Policy C';
  const hasPolicyC = policies.length > 2;

  const renderIndicator = (indicator) => {
    if (!indicator) return null;

    let badgeStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.3rem',
      fontSize: '0.72rem',
      fontWeight: 700,
      padding: '0.15rem 0.5rem',
      borderRadius: 'var(--radius-full)',
      marginTop: '0.35rem',
      letterSpacing: '0.02em',
      textTransform: 'uppercase'
    };

    if (indicator.type === 'favorable') {
      return (
        <span style={{
          ...badgeStyle,
          backgroundColor: 'var(--severity-success-bg)',
          color: 'var(--severity-success)',
          border: '1px solid var(--severity-success-border)'
        }}>
          <CheckCircle2 size={12} />
          {indicator.label || 'More favorable'}
        </span>
      );
    } else if (indicator.type === 'restrictive') {
      return (
        <span style={{
          ...badgeStyle,
          backgroundColor: 'var(--severity-critical-bg)',
          color: 'var(--severity-critical)',
          border: '1px solid var(--severity-critical-border)'
        }}>
          <AlertCircle size={12} />
          {indicator.label || 'More restrictive'}
        </span>
      );
    } else if (indicator.type === 'attention') {
      return (
        <span style={{
          ...badgeStyle,
          backgroundColor: 'var(--severity-high-bg)',
          color: 'var(--severity-high)',
          border: '1px solid var(--severity-high-border)'
        }}>
          <AlertTriangle size={12} />
          {indicator.label || 'Important difference'}
        </span>
      );
    } else {
      return (
        <span style={{
          ...badgeStyle,
          backgroundColor: 'var(--bg-surface-subtle)',
          color: 'var(--text-muted)',
          border: '1px solid var(--border-color)'
        }}>
          <HelpCircle size={12} />
          {indicator.label || 'Standard'}
        </span>
      );
    }
  };

  return (
    <div className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '2.5rem' }}>
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        backgroundColor: 'var(--bg-surface-subtle)'
      }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Condition Comparison Matrix
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Key claim provisions identified across your uploaded policy documents.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.85rem', fontSize: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--severity-success)' }}>
            🟢 More favorable
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--severity-high)' }}>
            🟡 Important difference
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--severity-critical)' }}>
            🔴 More restrictive
          </span>
        </div>
      </div>

      {/* Desktop Table & Mobile Responsive Container */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: '0.875rem'
        }}>
          <thead>
            <tr style={{
              backgroundColor: 'var(--bg-app)',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <th style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-muted)', width: '22%' }}>
                Claim Factor
              </th>
              <th style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {policyAName}
              </th>
              <th style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {policyBName}
              </th>
              {hasPolicyC && (
                <th style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {policyCName}
                </th>
              )}
              <th style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-muted)', width: '100px', textAlign: 'right' }}>
                Evidence
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, index) => (
              <tr 
                key={row.id}
                style={{
                  borderBottom: index < comparisonRows.length - 1 ? '1px solid var(--border-color)' : 'none',
                  backgroundColor: index % 2 === 0 ? 'transparent' : 'var(--bg-surface-subtle)',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {row.category}
                </td>

                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-body)', verticalAlign: 'top' }}>
                  <div style={{ fontWeight: 600 }}>{row.values.policy_a}</div>
                  {renderIndicator(row.indicators.policy_a)}
                </td>

                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-body)', verticalAlign: 'top' }}>
                  <div style={{ fontWeight: 600 }}>{row.values.policy_b}</div>
                  {renderIndicator(row.indicators.policy_b)}
                </td>

                {hasPolicyC && (
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-body)', verticalAlign: 'top' }}>
                    <div style={{ fontWeight: 600 }}>{row.values.policy_c}</div>
                    {renderIndicator(row.indicators.policy_c)}
                  </td>
                )}

                <td style={{ padding: '1rem 1.25rem', textAlign: 'right', verticalAlign: 'top' }}>
                  <button 
                    type="button"
                    className="btn btn-outline"
                    onClick={() => onOpenEvidence(row)}
                    style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem' }}
                  >
                    Evidence
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
