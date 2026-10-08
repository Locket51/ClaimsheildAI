import React, { useState } from 'react';
import PolicyUploadGrid from '../components/PolicyUploadGrid';
import PolicyPrioritySelector from '../components/PolicyPrioritySelector';
import ComparisonLoading from '../components/ComparisonLoading';
import ComparisonTable from '../components/ComparisonTable';
import KeyDifferences from '../components/KeyDifferences';
import ComparisonEvidenceDrawer from '../components/ComparisonEvidenceDrawer';
import PriorityAnalysis from '../components/PriorityAnalysis';
import { MOCK_COMPARISON_DATA } from '../data/mockComparisonData';
import { ArrowLeft, ShieldCheck, ArrowRight, AlertCircle, FileSearch, RefreshCw } from 'lucide-react';

export default function Compare({ onGoHome }) {
  const [policies, setPolicies] = useState([
    {
      id: 'policy_a',
      defaultLabel: 'Policy A',
      customName: '',
      file: null,
      error: null
    },
    {
      id: 'policy_b',
      defaultLabel: 'Policy B',
      customName: '',
      file: null,
      error: null
    }
  ]);

  const [selectedPriority, setSelectedPriority] = useState(null);
  const [viewState, setViewState] = useState('input'); // 'input' | 'loading' | 'results' | 'error'
  const [globalError, setGlobalError] = useState(null);
  const [activeEvidenceRow, setActiveEvidenceRow] = useState(null);

  const handleUpdatePolicy = (policyId, updates) => {
    setPolicies(prev => prev.map(p => p.id === policyId ? { ...p, ...updates } : p));
    setGlobalError(null);
  };

  const handleAddPolicy = () => {
    if (policies.length < 3) {
      setPolicies(prev => [
        ...prev,
        {
          id: 'policy_c',
          defaultLabel: 'Policy C',
          customName: '',
          file: null,
          error: null
        }
      ]);
    }
  };

  const handleRemovePolicy = (policyId) => {
    if (policies.length > 2) {
      setPolicies(prev => prev.filter(p => p.id !== policyId));
    }
  };

  const uploadedCount = policies.filter(p => p.file !== null).length;
  const canCompare = uploadedCount >= 2;

  const handleStartComparison = () => {
    if (!canCompare) {
      setGlobalError('Add at least one more policy PDF to compare.');
      return;
    }
    setGlobalError(null);
    setViewState('loading');
  };

  const handleLoadingComplete = () => {
    setViewState('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartOver = () => {
    setViewState('input');
    setActiveEvidenceRow(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="main-content main-content-wide">
      {/* Navigation Back */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button 
          onClick={onGoHome}
          className="btn btn-outline"
          style={{ fontSize: '0.8125rem', padding: '0.35rem 0.75rem', gap: '0.35rem' }}
        >
          <ArrowLeft size={15} />
          <span>Back to ClaimShield</span>
        </button>
      </div>

      {/* INPUT / UPLOAD STATE */}
      {viewState === 'input' && (
        <div>
          {/* Header */}
          <div style={{ maxWidth: '680px', marginBottom: '2rem' }}>
            <span className="eyebrow-label">
              <ShieldCheck size={13} />
              MULTI-POLICY AUDIT
            </span>
            <h1 className="hero-title" style={{ fontSize: '2.25rem', marginTop: '0.4rem', marginBottom: '0.5rem' }}>
              COMPARE POLICIES
            </h1>
            <p className="hero-subtitle">
              See the differences that matter before choosing a policy. Compare room-rent limits, co-pay, waiting periods, claim deadlines, and other important conditions.
            </p>
          </div>

          {/* Upload Cards Grid */}
          <div style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
              YOUR POLICIES ({uploadedCount} of {policies.length} uploaded)
            </div>

            <PolicyUploadGrid 
              policies={policies}
              onUpdatePolicy={handleUpdatePolicy}
              onAddPolicy={handleAddPolicy}
              onRemovePolicy={handleRemovePolicy}
            />
          </div>

          {/* Priority Selector */}
          <PolicyPrioritySelector 
            selectedPriority={selectedPriority}
            onSelectPriority={setSelectedPriority}
          />

          {/* Global Error Banner if any */}
          {globalError && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--severity-critical)',
              backgroundColor: 'var(--severity-critical-bg)',
              border: '1px solid var(--severity-critical-border)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.875rem'
            }}>
              <AlertCircle size={18} />
              <span>{globalError}</span>
            </div>
          )}

          {/* Compare CTA Button */}
          <div style={{ maxWidth: '420px', margin: '0 auto', textAlign: 'center' }}>
            <button 
              type="button" 
              className="btn btn-cta btn-block btn-lg"
              disabled={!canCompare}
              onClick={handleStartComparison}
            >
              <span>Compare Policies</span>
              <ArrowRight size={18} className="btn-arrow" />
            </button>
            {!canCompare && (
              <p style={{ fontSize: '0.78125rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Upload at least two policy PDFs to enable comparison.
              </p>
            )}
          </div>
        </div>
      )}

      {/* LOADING STATE */}
      {viewState === 'loading' && (
        <ComparisonLoading 
          policies={policies}
          onComplete={handleLoadingComplete}
        />
      )}

      {/* RESULTS STATE */}
      {viewState === 'results' && (
        <div>
          {/* Results Header */}
          <div style={{ 
            display: 'flex', 
            justify: 'space-between', 
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '1.5rem'
          }}>
            <div>
              <span className="eyebrow-label" style={{ marginBottom: '0.5rem' }}>
                <FileSearch size={13} />
                AUDIT COMPARISON REPORT
              </span>
              <h1 className="hero-title" style={{ fontSize: '2.25rem', marginTop: '0.3rem', marginBottom: '0.35rem' }}>
                Policy Comparison
              </h1>
              <p className="hero-subtitle">
                Here's how the policies differ across claim-relevant conditions.
              </p>
            </div>

            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleStartOver}
              style={{ fontSize: '0.8125rem', padding: '0.45rem 0.9rem' }}
            >
              <RefreshCw size={14} />
              <span>Compare Different Policies</span>
            </button>
          </div>

          {/* Policies Pill Banner */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            marginBottom: '2rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1.25rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              {policies.length} Policies Compared:
            </span>
            {policies.map(p => (
              <span key={p.id} className="chip" style={{ fontWeight: 600 }}>
                {p.customName || p.defaultLabel} ({p.file?.name || 'Uploaded PDF'})
              </span>
            ))}
          </div>

          {/* Priority-Based Analysis if Priority Selected */}
          <PriorityAnalysis 
            selectedPriority={selectedPriority} 
            policies={policies}
          />

          {/* Comparison Matrix Table */}
          <ComparisonTable 
            comparisonRows={MOCK_COMPARISON_DATA.comparisonRows}
            policies={policies}
            onOpenEvidence={(row) => setActiveEvidenceRow(row)}
          />

          {/* Key Differences Cards */}
          <KeyDifferences 
            comparisonRows={MOCK_COMPARISON_DATA.comparisonRows}
            policies={policies}
            onOpenEvidence={(row) => setActiveEvidenceRow(row)}
          />

          {/* Side Evidence Drawer */}
          <ComparisonEvidenceDrawer 
            row={activeEvidenceRow}
            policies={policies}
            onClose={() => setActiveEvidenceRow(null)}
          />

          {/* Disclaimer */}
          <div style={{
            marginTop: '3rem',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-color)',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}>
            <strong>Important Legal Notice:</strong> ClaimShield compares the information identified in the uploaded policy documents. This comparison is informational and is not legal, financial, medical, or insurance advice. A policy that appears more favorable on selected criteria may not be the best choice for every person or health requirement.
          </div>
        </div>
      )}

      {/* ERROR STATE */}
      {viewState === 'error' && (
        <div className="card" style={{ maxWidth: '520px', margin: '3rem auto', textAlign: 'center', padding: '2.5rem' }}>
          <AlertCircle size={40} style={{ color: 'var(--severity-critical)', margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            We couldn't complete the comparison
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Please try again with readable policy PDFs.
          </p>
          <button className="btn btn-primary" onClick={() => setViewState('input')}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
