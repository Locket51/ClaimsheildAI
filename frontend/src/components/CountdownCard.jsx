import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

export default function CountdownCard({ deadlineData }) {
  if (!deadlineData) return null;

  const [secondsLeft, setSecondsLeft] = useState(deadlineData.initialSeconds || 67335);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  return (
    <div className="card" style={{ 
      marginBottom: '1.5rem', 
      backgroundColor: 'var(--severity-critical-bg)',
      borderColor: 'var(--severity-critical-border)',
      padding: '1.25rem 1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            padding: '0.6rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--severity-critical)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              CRITICAL DEADLINE
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {deadlineData.title}
            </h4>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Clause Ref: {deadlineData.clauseRef}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ 
            fontFamily: 'monospace', 
            fontSize: '1.85rem', 
            fontWeight: 800, 
            color: 'var(--severity-critical)',
            letterSpacing: '0.05em'
          }}>
            {formatTime(secondsLeft)}
          </div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
            {deadlineData.description}
          </div>
        </div>
      </div>
    </div>
  );
}
