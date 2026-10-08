import React, { useState, useEffect } from 'react';
import { Check, ShieldCheck, Loader2 } from 'lucide-react';

export default function ComparisonLoading({ policies, onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const policyAName = policies[0]?.customName || policies[0]?.defaultLabel || 'Policy A';
  const policyBName = policies[1]?.customName || policies[1]?.defaultLabel || 'Policy B';
  const policyCName = policies[2]?.customName || policies[2]?.defaultLabel || 'Policy C';

  const steps = [
    `Reading ${policyAName}`,
    `Reading ${policyBName}`,
    ...(policies.length > 2 ? [`Reading ${policyCName}`] : []),
    `Identifying important conditions`,
    `Comparing claim restrictions`,
    `Preparing your comparison`
  ];

  useEffect(() => {
    const stepDuration = 550; // ms per step
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 400);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [steps.length, onComplete]);

  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="card" style={{ 
      maxWidth: '540px', 
      margin: '3rem auto', 
      padding: '2.5rem 2rem',
      textAlign: 'center' 
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--color-accent-light)',
        color: 'var(--color-accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.25rem'
      }}>
        <ShieldCheck size={26} />
      </div>

      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
        Comparing your policies
      </h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
        Cross-auditing policy clauses and claim conditions...
      </p>

      {/* Progress Bar */}
      <div style={{
        height: '6px',
        width: '100%',
        backgroundColor: 'var(--bg-surface-subtle)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        marginBottom: '2rem'
      }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          backgroundColor: 'var(--color-accent)',
          transition: 'width 0.4s ease'
        }} />
      </div>

      {/* Staged Checklist */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.75rem', 
        alignItems: 'flex-start',
        maxWidth: '360px',
        margin: '0 auto'
      }}>
        {steps.map((stepText, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isUpcoming = idx > currentStepIndex;

          return (
            <div 
              key={idx} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.875rem',
                color: isDone 
                  ? 'var(--text-primary)' 
                  : isCurrent 
                  ? 'var(--color-accent)' 
                  : 'var(--text-muted)',
                fontWeight: isCurrent ? 600 : 400,
                opacity: isUpcoming ? 0.45 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                backgroundColor: isDone 
                  ? 'var(--severity-success-bg)' 
                  : isCurrent 
                  ? 'var(--color-accent-light)' 
                  : 'transparent',
                border: isDone 
                  ? '1px solid var(--severity-success-border)' 
                  : isCurrent 
                  ? '1px solid var(--color-accent)' 
                  : '1px solid var(--border-color)',
                color: isDone 
                  ? 'var(--severity-success)' 
                  : isCurrent 
                  ? 'var(--color-accent)' 
                  : 'var(--text-muted)'
              }}>
                {isDone ? (
                  <Check size={12} />
                ) : isCurrent ? (
                  <Loader2 size={12} className="spinner" />
                ) : (
                  <span style={{ fontSize: '0.65rem' }}>○</span>
                )}
              </div>

              <span>{stepText}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
