import React, { useRef, useState } from 'react';
import { Upload, CheckCircle2, RotateCcw, Trash2, AlertCircle, Edit2 } from 'lucide-react';

export default function PolicyUploadCard({ 
  policy, 
  onUpdatePolicy, 
  onRemovePolicy, 
  canRemove 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateAndSetFile = (file) => {
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      onUpdatePolicy(policy.id, {
        error: "This file doesn't appear to be a valid PDF. Please choose a policy PDF document."
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      onUpdatePolicy(policy.id, {
        error: 'This PDF is larger than the 10 MB limit. Please select a smaller document.'
      });
      return;
    }

    onUpdatePolicy(policy.id, {
      file: {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        rawFile: file
      },
      error: null
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleUseSample = (e) => {
    e.stopPropagation();
    const sampleNames = {
      policy_a: 'Policy_A_StarHealth.pdf',
      policy_b: 'Policy_B_CareAdvantage.pdf',
      policy_c: 'Policy_C_HDFCErgo.pdf'
    };
    onUpdatePolicy(policy.id, {
      file: {
        name: sampleNames[policy.id] || `${policy.defaultLabel}_Sample.pdf`,
        size: '2.4 MB',
        isSample: true
      },
      error: null
    });
  };

  return (
    <div className="card" style={{ padding: '1.25rem', position: 'relative' }}>
      {/* Header & Policy Label */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            color: 'var(--color-accent)', 
            backgroundColor: 'var(--color-accent-light)',
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
            letterSpacing: '0.04em'
          }}>
            {policy.defaultLabel}
          </span>

          {isEditingName ? (
            <input 
              type="text"
              value={policy.customName}
              onChange={(e) => onUpdatePolicy(policy.id, { customName: e.target.value })}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
              placeholder={`Custom name e.g. Star Health`}
              autoFocus
              style={{
                background: 'var(--bg-app)',
                border: '1px solid var(--color-accent)',
                color: 'var(--text-primary)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.875rem',
                fontWeight: 600,
                width: '100%',
                maxWidth: '180px'
              }}
            />
          ) : (
            <div 
              onClick={() => setIsEditingName(true)} 
              title="Click to rename policy"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.35rem', 
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: policy.customName ? 'var(--text-primary)' : 'var(--text-muted)'
              }}
            >
              <span>{policy.customName || `Name (Optional)`}</span>
              <Edit2 size={12} style={{ opacity: 0.6 }} />
            </div>
          )}
        </div>

        {canRemove && (
          <button 
            type="button" 
            onClick={() => onRemovePolicy(policy.id)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-muted)', 
              cursor: 'pointer',
              padding: '0.25rem'
            }}
            title={`Remove ${policy.defaultLabel}`}
            aria-label={`Remove ${policy.defaultLabel}`}
          >
            <Trash2 size={16} hoverstyle={{ color: 'var(--severity-critical)' }} />
          </button>
        )}
      </div>

      {/* Upload Zone or File State */}
      {policy.file ? (
        <div style={{
          backgroundColor: 'var(--bg-surface-subtle)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={22} style={{ color: 'var(--severity-success)', flexShrink: 0 }} />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ 
                fontWeight: 600, 
                fontSize: '0.9rem', 
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {policy.file.name}
              </div>
              <div style={{ fontSize: '0.78125rem', color: 'var(--text-muted)' }}>
                PDF • {policy.file.size}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
              onClick={() => fileInputRef.current?.click()}
            >
              <RotateCcw size={13} />
              <span>Replace</span>
            </button>
            <button 
              type="button" 
              className="btn btn-outline" 
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem', color: 'var(--severity-critical)' }}
              onClick={() => onUpdatePolicy(policy.id, { file: null, error: null })}
            >
              <Trash2 size={13} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <div 
          className={`dropzone ${isDragging ? 'active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{ padding: '1.5rem 1rem' }}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect}
            accept=".pdf"
            style={{ display: 'none' }}
          />

          <div className="dropzone-icon" style={{ width: '34px', height: '34px', marginBottom: '0.5rem' }}>
            <Upload size={18} />
          </div>

          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem', fontSize: '0.875rem' }}>
            Drop policy PDF
          </p>
          <p style={{ fontSize: '0.78125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            or browse files
          </p>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.85rem' }}>
            PDF • Max 10 MB
          </span>

          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
            >
              Browse
            </button>
            <button 
              type="button" 
              className="btn btn-outline" 
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
              onClick={handleUseSample}
            >
              Use sample
            </button>
          </div>
        </div>
      )}

      {policy.error && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '0.4rem', 
          color: 'var(--severity-critical)', 
          fontSize: '0.78125rem', 
          marginTop: '0.5rem',
          backgroundColor: 'var(--severity-critical-bg)',
          padding: '0.5rem 0.75rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--severity-critical-border)'
        }}>
          <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{policy.error}</span>
        </div>
      )}
    </div>
  );
}
