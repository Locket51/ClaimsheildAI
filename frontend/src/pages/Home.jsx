import React, { useState } from 'react';
import PolicyUploader from '../components/PolicyUploader';
import IncidentInput from '../components/IncidentInput';
import SupportingDocuments from '../components/SupportingDocuments';
import PrivacyNotice from '../components/PrivacyNotice';
import SecurityPreviewCard from '../components/SecurityPreviewCard';
import { ArrowRight, Check, ShieldCheck, Lock, FileSearch } from 'lucide-react';

export default function Home({ onStartAnalysis, onNavigate }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [incidentText, setIncidentText] = useState('');
  const [supportingFiles, setSupportingFiles] = useState([]);
  const [policyError, setPolicyError] = useState(null);
  const [incidentError, setIncidentError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnalyzeClick = () => {
    let hasError = false;

    if (!uploadedFile) {
      setPolicyError('Please upload your insurance policy to continue.');
      hasError = true;
    } else {
      setPolicyError(null);
    }

    if (!incidentText.trim()) {
      setIncidentError('Please describe what happened.');
      hasError = true;
    } else {
      setIncidentError(null);
    }

    if (!hasError) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onStartAnalysis({ uploadedFile, incidentText, supportingFiles });
      }, 300);
    }
  };

  return (
    <div className="main-content main-content-wide">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Hero & Product Vision */}
        <div>
          <span className="eyebrow-label">
            <ShieldCheck size={13} />
            CLAIM PROTECTION
          </span>

          <h1 className="hero-title">
            Your policy shouldn't<br />be another emergency.
          </h1>

          <p className="hero-subtitle">
            Upload your policy. Tell us what happened. ClaimShield surfaces deadlines, financial risks, and conditions that deserve attention.
          </p>

          <div className="trust-indicators">
            <div className="trust-item">
              <Check size={14} className="trust-check" />
              <span>Evidence-backed</span>
            </div>
            <div className="trust-item">
              <Check size={14} className="trust-check" />
              <span>Privacy-first</span>
            </div>
            <div className="trust-item">
              <Check size={14} className="trust-check" />
              <span>AI-assisted</span>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <SecurityPreviewCard />
          </div>

          {/* Secondary Flow Entry: Compare Policies */}
          <div className="card" style={{ 
            marginTop: '1.5rem', 
            padding: '1.25rem 1.5rem', 
            backgroundColor: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-color)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <FileSearch size={16} style={{ color: 'var(--color-accent)' }} />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Comparing multiple policies?
              </h3>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', lineHeight: 1.5 }}>
              Compare 2 to 3 health insurance policies side-by-side across room-rent caps, co-pay, waiting periods, and claim deadlines.
            </p>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => onNavigate && onNavigate('/compare')}
              style={{ fontSize: '0.8125rem', padding: '0.4rem 0.85rem' }}
            >
              <span>Compare Policies</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column: Form Intake Container */}
        <div>
          <div className="card" style={{ padding: '1.75rem' }}>
            <PolicyUploader 
              uploadedFile={uploadedFile} 
              setUploadedFile={setUploadedFile} 
              error={policyError}
              setError={setPolicyError}
            />

            <IncidentInput 
              incidentText={incidentText} 
              setIncidentText={setIncidentText} 
              error={incidentError}
            />

            <SupportingDocuments 
              supportingFiles={supportingFiles} 
              setSupportingFiles={setSupportingFiles} 
            />

            <PrivacyNotice />

            <button 
              className="btn btn-cta btn-block btn-lg"
              onClick={handleAnalyzeClick}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Analyzing your claim...' : 'Analyze My Claim'}</span>
              <ArrowRight size={18} className="btn-arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
