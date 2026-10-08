import React from 'react';
import { X, FileText, UserCheck, ShieldCheck, Lightbulb } from 'lucide-react';

export default function EvidenceDrawer({ finding, onClose }) {
  if (!finding) return null;

  const { title, policyEvidence, clauseRef, userContext, comparison, interpretation, recommendedAction } = finding;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              GROUNDED EVIDENCE ANALYSIS
            </span>
            <h2 className="modal-title" style={{ marginTop: '0.15rem' }}>
              Policy Evidence
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="remove-btn" 
            style={{ padding: '0.4rem' }}
            aria-label="Close Evidence Drawer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            {title}
          </div>

          {/* LAYER 1: POLICY EVIDENCE */}
          <div style={{
            backgroundColor: 'var(--color-accent-blue-light)',
            border: '1px solid var(--severity-attention-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <FileText size={16} style={{ color: 'var(--color-accent-blue)' }} />
              <strong style={{ fontSize: '0.84rem', color: 'var(--color-accent-blue)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                1. Policy Evidence
              </strong>
            </div>
            <blockquote style={{ 
              fontSize: '0.9375rem', 
              color: 'var(--color-primary)', 
              fontStyle: 'italic',
              lineHeight: 1.45,
              marginBottom: '0.5rem',
              borderLeft: '3px solid var(--color-accent-blue)',
              paddingLeft: '0.75rem'
            }}>
              "{policyEvidence}"
            </blockquote>
            <div style={{ fontSize: '0.78125rem', fontWeight: 600, color: 'var(--color-text-subtle)' }}>
              Source: {clauseRef}
            </div>
          </div>

          {/* LAYER 2: USER EVIDENCE */}
          <div style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <UserCheck size={16} style={{ color: 'var(--color-text-muted)' }} />
              <strong style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                2. User Evidence
              </strong>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
              {comparison ? (
                <span>Hospital estimate charge: <strong>{comparison.hospitalEstimate}</strong> vs. Stated admission details.</span>
              ) : (
                <span>{userContext || "Stated claim incident context provided during upload."}</span>
              )}
            </div>
          </div>

          {/* LAYER 3: CLAIMSHIELD INTERPRETATION */}
          <div style={{
            backgroundColor: 'var(--severity-high-bg)',
            border: '1px solid var(--severity-high-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <ShieldCheck size={16} style={{ color: 'var(--severity-high)' }} />
              <strong style={{ fontSize: '0.84rem', color: 'var(--severity-high)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                3. ClaimShield Interpretation
              </strong>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
              {interpretation}
            </div>
          </div>

          {/* LAYER 4: RECOMMENDED ACTION */}
          <div style={{
            backgroundColor: 'var(--severity-success-bg)',
            border: '1px solid var(--severity-success-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <Lightbulb size={16} style={{ color: 'var(--severity-success)' }} />
              <strong style={{ fontSize: '0.84rem', color: 'var(--severity-success)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                4. Recommended Action
              </strong>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)', lineHeight: 1.45 }}>
              {recommendedAction}
            </div>
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
