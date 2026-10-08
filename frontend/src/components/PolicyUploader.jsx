import React, { useState, useRef } from 'react';
import { Upload, CheckCircle2, Lock, RotateCcw, Trash2, AlertCircle } from 'lucide-react';

export default function PolicyUploader({ uploadedFile, setUploadedFile, error, setError }) {
  const [isDragging, setIsDragging] = useState(false);
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

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf')) {
      setError('Please upload a PDF, JPG or PNG file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File is too large. Please choose a document smaller than 10 MB.');
      return;
    }

    setError(null);
    // Attach the actual file blob so it can be appended to FormData
    file.displaySize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    setUploadedFile(file);
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

  const handleUseMockFile = () => {
    setError(null);
    // Create a dummy Blob to satisfy the File interface
    const dummyBlob = new Blob(['Dummy policy content for testing'], { type: 'application/pdf' });
    dummyBlob.name = 'Health_Insurance_Policy.pdf';
    dummyBlob.displaySize = '2.4 MB';
    setUploadedFile(dummyBlob);
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div className="form-step-header">
        <span className="form-step-num">01</span>
        <span className="form-step-title">YOUR POLICY</span>
      </div>

      {uploadedFile ? (
        <div className="file-intake-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={20} style={{ color: 'var(--severity-success)', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {uploadedFile.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                PDF · {uploadedFile.size}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              style={{ fontSize: '0.78125rem', padding: '0.35rem 0.75rem' }}
              onClick={() => fileInputRef.current?.click()}
            >
              <RotateCcw size={14} />
              <span>Replace</span>
            </button>
            <button 
              type="button" 
              className="btn btn-outline" 
              style={{ fontSize: '0.78125rem', padding: '0.35rem 0.5rem' }}
              onClick={() => setUploadedFile(null)}
              title="Remove Document"
            >
              <Trash2 size={14} style={{ color: 'var(--severity-critical)' }} />
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
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect}
            accept=".pdf,.jpg,.jpeg,.png"
            style={{ display: 'none' }}
          />
          <div className="dropzone-icon">
            <Upload size={20} />
          </div>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem', fontSize: '0.9375rem' }}>
            Drop your policy here
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
            PDF, JPG or PNG · up to 10 MB
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button type="button" className="btn btn-secondary" style={{ fontSize: '0.8125rem', padding: '0.4rem 0.85rem' }}>
              Choose file
            </button>
            <button 
              type="button" 
              className="btn btn-outline" 
              style={{ fontSize: '0.8125rem', padding: '0.4rem 0.85rem' }}
              onClick={(e) => {
                e.stopPropagation();
                handleUseMockFile();
              }}
            >
              Use sample
            </button>
          </div>
        </div>
      )}

      {/* Security Microcopy */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: '0.78125rem',
        color: 'var(--text-muted)',
        marginTop: '0.5rem'
      }}>
        <Lock size={13} style={{ color: 'var(--color-accent)' }} />
        <span><strong>Secure document intake:</strong> Your policy is processed only for this audit.</span>
      </div>

      {error && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.4rem', 
          color: 'var(--severity-critical)', 
          fontSize: '0.8125rem', 
          marginTop: '0.4rem' 
        }}>
          <AlertCircle size={15} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
