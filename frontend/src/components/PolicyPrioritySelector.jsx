import React from 'react';
import { MOCK_COMPARISON_DATA } from '../data/mockComparisonData';
import { Sparkles, Check } from 'lucide-react';

export default function PolicyPrioritySelector({ selectedPriority, onSelectPriority }) {
  return (
    <div style={{
      backgroundColor: 'var(--bg-surface-subtle)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem 1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
        <Sparkles size={16} style={{ color: 'var(--color-accent)' }} />
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          What matters most to you? <span style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Optional)</span>
        </h3>
      </div>
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Choose a priority to highlight the differences most relevant to your claim concerns.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {MOCK_COMPARISON_DATA.priorities.map((item) => {
          const isSelected = selectedPriority === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`chip ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectPriority(isSelected ? null : item.id)}
              style={{
                fontSize: '0.8125rem',
                padding: '0.4rem 0.85rem',
                cursor: 'pointer',
                borderRadius: 'var(--radius-full)'
              }}
            >
              {isSelected && <Check size={14} />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
