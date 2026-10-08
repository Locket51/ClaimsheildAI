import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';

export default function AnalysisProgress({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Reading policy clauses & terms", duration: 800 },
    { label: "Identifying important deadlines & financial caps", duration: 900 },
    { label: "Checking Snowflake policy risk rules", duration: 1000 },
    { label: "Comparing claim conditions against incident facts", duration: 900 },
    { label: "Preparing evidence-backed action plan", duration: 800 }
  ];

  useEffect(() => {
    let timer;
    if (currentStep < steps.length) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].duration);
    }
    // We no longer call onComplete here. The parent component will unmount this component 
    // and navigate to the next page when the backend API request finishes.

    return () => clearTimeout(timer);
  }, [currentStep, steps]);

  return (
    <div style={{ padding: '2rem 0', textAlign: 'center' }}>
      <div className="card" style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'left', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-accent-blue-light)',
            color: 'var(--color-accent-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <Loader2 className="spinner" size={28} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
            Analyzing your claim
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            We're reviewing your policy for conditions that may affect your claim.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            const isPending = idx > currentStep;

            return (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.875rem',
                  opacity: isPending ? 0.4 : 1,
                  transition: 'opacity 0.2s ease'
                }}
              >
                {isCompleted && (
                  <CheckCircle2 size={20} style={{ color: 'var(--severity-success)', flexShrink: 0 }} />
                )}
                {isCurrent && (
                  <Loader2 className="spinner" size={20} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} />
                )}
                {isPending && (
                  <Circle size={20} style={{ color: 'var(--color-text-subtle)', flexShrink: 0 }} />
                )}

                <span style={{ 
                  fontSize: '0.9375rem', 
                  fontWeight: isCurrent ? 600 : 400,
                  color: isCurrent ? 'var(--color-primary)' : 'var(--color-text-main)'
                }}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
