import React, { useState } from 'react';
import { X, Copy, Check, Mail, Info } from 'lucide-react';

export default function MagicEmailModal({ emailDraft, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !emailDraft) return null;

  const handleCopy = () => {
    const fullText = `Subject: ${emailDraft.subject}\n\n${emailDraft.body}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={20} style={{ color: 'var(--color-accent-blue)' }} />
            <h2 className="modal-title">Notification Draft</h2>
          </div>
          <button 
            onClick={onClose} 
            className="remove-btn" 
            style={{ padding: '0.4rem' }}
            aria-label="Close Email Draft Modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-subtle)', marginBottom: '0.25rem' }}>
              SUBJECT:
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              {emailDraft.subject}
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1rem',
            whiteSpace: 'pre-line',
            fontSize: '0.875rem',
            color: 'var(--color-text-main)',
            fontFamily: 'monospace',
            lineHeight: 1.5
          }}>
            {emailDraft.body}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.78125rem',
            color: 'var(--color-text-subtle)',
            backgroundColor: 'var(--color-surface-hover)',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            <Info size={14} style={{ flexShrink: 0 }} />
            <span>{emailDraft.disclaimer}</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleCopy}>
            {copied ? (
              <>
                <Check size={16} />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Draft</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
