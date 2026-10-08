import React from 'react';
import { MOCK_COMPARISON_DATA } from '../data/mockComparisonData';
import { Sparkles, Check, AlertCircle } from 'lucide-react';

export default function PriorityAnalysis({ selectedPriority, policies }) {
  if (!selectedPriority) return null;

  const priorityData = MOCK_COMPARISON_DATA.priorityInsights[selectedPriority];
  if (!priorityData) return null;

  const policyAName = policies[0]?.customName || policies[0]?.defaultLabel || 'Policy A';
  const policyBName = policies[1]?.customName || policies[1]?.defaultLabel || 'Policy B';

  return (
    <div className="card" style={{ 
      marginBottom: '2.5rem',
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--color-accent)',
      boxShadow: '0 0 20px -5px rgba(96, 165, 250, 0.12)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <Sparkles size={18} style={{ color: 'var(--color-accent)' }} />
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          {priorityData.title}
        </h3>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        Based on the criteria identified in your uploaded policy documents:
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        {/* Positive highlights */}
        <div style={{
          backgroundColor: 'var(--severity-success-bg)',
          border: '1px solid var(--severity-success-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem'
        }}>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--severity-success)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            Favorable Conditions ({policyBName})
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {priorityData.reasons.map((reason, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                <Check size={15} style={{ color: 'var(--severity-success)', flexShrink: 0, marginTop: '2px' }} />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cautions / Restrictions */}
        <div style={{
          backgroundColor: 'var(--severity-high-bg)',
          border: '1px solid var(--severity-high-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem'
        }}>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--severity-high)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            Important Restrictions ({policyAName})
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {priorityData.warnings.map((warn, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                <AlertCircle size={15} style={{ color: 'var(--severity-high)', flexShrink: 0, marginTop: '2px' }} />
                <span>{warn}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
