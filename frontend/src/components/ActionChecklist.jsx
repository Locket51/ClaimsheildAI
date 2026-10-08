import React, { useState } from 'react';
import { CheckSquare, Square, CheckCircle2 } from 'lucide-react';

export default function ActionChecklist({ initialActions = [] }) {
  const [actions, setActions] = useState(initialActions);

  const toggleTask = (id) => {
    setActions(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = actions.filter(a => a.completed).length;
  const totalCount = actions.length;

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            What you should do now
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>
            Recommended action checklist based on your policy clauses
          </p>
        </div>
        <div style={{
          backgroundColor: completedCount === totalCount ? 'var(--severity-success-bg)' : 'var(--color-bg)',
          border: `1px solid ${completedCount === totalCount ? 'var(--severity-success-border)' : 'var(--color-border)'}`,
          padding: '0.35rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8125rem',
          fontWeight: 700,
          color: completedCount === totalCount ? 'var(--severity-success)' : 'var(--color-text-muted)'
        }}>
          {completedCount} of {totalCount} completed
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {actions.map((item) => (
          <div 
            key={item.id}
            onClick={() => toggleTask(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              backgroundColor: item.completed ? 'var(--color-surface-hover)' : 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            {item.completed ? (
              <CheckSquare size={20} style={{ color: 'var(--severity-success)', flexShrink: 0 }} />
            ) : (
              <Square size={20} style={{ color: 'var(--color-text-subtle)', flexShrink: 0 }} />
            )}
            <span style={{ 
              fontSize: '0.9375rem', 
              fontWeight: 500,
              color: item.completed ? 'var(--color-text-subtle)' : 'var(--color-text-main)',
              textDecoration: item.completed ? 'line-through' : 'none'
            }}>
              {item.task}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
