import React from 'react';
import { Shield, FileText, Database, AlertTriangle, Lock } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="main-content">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="eyebrow-label" style={{ marginBottom: '0.65rem' }}>
          <Lock size={13} />
          SECURITY & PRIVACY
        </span>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
          Privacy is part of the workflow.
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
          Insurance documents can contain sensitive information. ClaimShield is designed to minimize unnecessary data exposure.
        </p>
      </div>

      {/* 23. Three Compact Rows / Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
        <div className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Shield size={20} style={{ color: 'var(--color-accent)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
              Privacy by Design
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Built around data minimization and controlled processing.
            </p>
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <FileText size={20} style={{ color: 'var(--color-accent)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
              Temporary Processing
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Raw documents are handled during the active analysis flow.
            </p>
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Database size={20} style={{ color: 'var(--color-accent)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
              Data Separation
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Rules and synthetic analytics remain separate from confidential user documents.
            </p>
          </div>
        </div>
      </div>

      {/* 24. Important Notice Panel */}
      <div style={{
        backgroundColor: 'rgba(251, 191, 36, 0.07)',
        border: '1px solid rgba(251, 191, 36, 0.25)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.35rem 1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem'
      }}>
        <AlertTriangle size={20} style={{ color: 'var(--severity-high)', flexShrink: 0, marginTop: '0.15rem' }} />
        <div>
          <div style={{ 
            fontSize: '0.78125rem', 
            fontWeight: 800, 
            color: 'var(--severity-high)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.08em', 
            marginBottom: '0.35rem' 
          }}>
            ⚠ IMPORTANT
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
            ClaimShield provides AI-assisted information to help users understand potential policy risks.
            <br />
            It does not provide legal advice, guarantee coverage, or determine claim approval.
          </div>
        </div>
      </div>
    </div>
  );
}
