import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export default function SecurityPreviewCard() {
  return (
    <div className="security-preview-card">
      <div className="scanline" />
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-accent)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          <ShieldCheck size={14} />
          <span>CLAIM AUDIT</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.8125rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
          <CheckCircle2 size={15} style={{ color: 'var(--severity-success)' }} />
          <span>Policy received</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
          <CheckCircle2 size={15} style={{ color: 'var(--severity-success)' }} />
          <span>Clauses identified</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--severity-high)', fontWeight: 600 }}>
          <AlertTriangle size={15} style={{ color: 'var(--severity-high)' }} />
          <span>2 conditions need review</span>
        </div>
      </div>

      <div style={{ 
        borderTop: '1px solid var(--border-color)', 
        paddingTop: '0.65rem',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <FileText size={13} />
          <span>Evidence-backed analysis</span>
        </div>
      </div>
    </div>
  );
}
