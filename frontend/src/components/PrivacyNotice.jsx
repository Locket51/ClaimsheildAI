import React from 'react';
import { Lock } from 'lucide-react';

export default function PrivacyNotice() {
  return (
    <div style={{
      backgroundColor: 'var(--bg-surface-subtle)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '0.75rem 1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.65rem',
      marginBottom: '1.25rem',
      fontSize: '0.8125rem',
      color: 'var(--text-secondary)'
    }}>
      <Lock size={15} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
      <div>
        <strong style={{ color: 'var(--text-primary)' }}>Privacy-first processing:</strong> Only the information needed for your claim audit is processed in a temporary buffer.
      </div>
    </div>
  );
}
