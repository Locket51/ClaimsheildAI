import React from 'react';
import { Upload, FileSearch, CheckSquare, ArrowRight, AlertTriangle, ArrowDown } from 'lucide-react';

export default function HowItWorks({ onGoHome }) {
  const steps = [
    {
      num: '01',
      title: 'Upload',
      desc: 'Add your policy and describe what happened.',
      icon: <Upload size={18} style={{ color: 'var(--color-accent)' }} />
    },
    {
      num: '02',
      title: 'Understand',
      desc: 'Surface deadlines, limits, exclusions, and conditions.',
      icon: <FileSearch size={18} style={{ color: 'var(--color-accent)' }} />
    },
    {
      num: '03',
      title: 'Act',
      desc: 'Review the evidence and know what to do next.',
      icon: <CheckSquare size={18} style={{ color: 'var(--color-accent)' }} />
    }
  ];

  return (
    <div className="main-content">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="eyebrow-label" style={{ marginBottom: '0.65rem' }}>
          HOW CLAIMSHIELD WORKS
        </span>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
          Not another policy summary.
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
          ClaimShield checks your situation against the policy to surface conditions that could affect your claim.
        </p>
      </div>

      {/* 20. Connected 3-Step Process Flow */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '3.5rem',
        position: 'relative'
      }}>
        {steps.map((step, idx) => (
          <div key={step.num} className="card" style={{ padding: '1.35rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-accent)', letterSpacing: '0.08em' }}>
                {step.num}
              </span>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {step.icon}
              </div>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              {step.title}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 21. Adversarial Audit Panel */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            Security Analysis Panel
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Comparing plain policy text vs. grounded claim audit findings
          </p>
        </div>

        <div className="card" style={{ 
          padding: 0, 
          overflow: 'hidden',
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)' 
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}>
            {/* Left: Policy Summary */}
            <div style={{ padding: '1.75rem' }}>
              <div style={{ 
                fontSize: '0.72rem', 
                fontWeight: 800, 
                color: 'var(--text-muted)', 
                letterSpacing: '0.08em', 
                textTransform: 'uppercase', 
                marginBottom: '1rem' 
              }}>
                POLICY SUMMARY
              </div>
              <blockquote style={{ 
                fontSize: '1.05rem', 
                color: 'var(--text-secondary)', 
                fontStyle: 'italic',
                lineHeight: 1.5,
                borderLeft: '2px solid var(--border-color)',
                paddingLeft: '1rem',
                margin: 0
              }}>
                "Room rent is covered."
              </blockquote>
            </div>

            {/* Right: ClaimShield Audit with Thin Vertical Divider */}
            <div style={{ 
              padding: '1.75rem',
              backgroundColor: 'var(--bg-surface-subtle)',
              borderLeft: '1px solid var(--border-color)'
            }}>
              <div style={{ 
                fontSize: '0.72rem', 
                fontWeight: 800, 
                color: 'var(--color-accent)', 
                letterSpacing: '0.08em', 
                textTransform: 'uppercase', 
                marginBottom: '1rem' 
              }}>
                CLAIMSHIELD AUDIT
              </div>
              
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
                Room-rent limit detected
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '1rem',
                marginBottom: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Policy limit</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹5,000/day</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Hospital estimate</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--severity-critical)' }}>₹8,000/day</div>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                fontSize: '0.84rem', 
                fontWeight: 600, 
                color: 'var(--severity-high)', 
                marginBottom: '0.65rem' 
              }}>
                <AlertTriangle size={15} />
                <span>Potential deduction risk</span>
              </div>

              <div style={{ fontSize: '0.84rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                → Confirm eligible room
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 22. Evidence Chain Section */}
      <div className="card" style={{ padding: '1.75rem', marginBottom: '3rem', textAlign: 'center' }}>
        <div style={{ 
          fontSize: '0.72rem', 
          fontWeight: 800, 
          color: 'var(--color-accent)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.08em', 
          marginBottom: '1.25rem' 
        }}>
          GROUNDED EVIDENCE CHAIN
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          fontSize: '0.8125rem',
          fontWeight: 700
        }}>
          <div style={{
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)'
          }}>
            POLICY CLAUSE
          </div>
          <span style={{ color: 'var(--text-muted)' }}>↓</span>
          <div style={{
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)'
          }}>
            USER EVIDENCE
          </div>
          <span style={{ color: 'var(--text-muted)' }}>↓</span>
          <div style={{
            backgroundColor: 'var(--severity-high-bg)',
            color: 'var(--severity-high)',
            border: '1px solid var(--severity-high-border)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)'
          }}>
            CLAIMSHIELD FINDING
          </div>
          <span style={{ color: 'var(--text-muted)' }}>↓</span>
          <div style={{
            backgroundColor: 'var(--severity-success-bg)',
            color: 'var(--severity-success)',
            border: '1px solid var(--severity-success-border)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)'
          }}>
            RECOMMENDED ACTION
          </div>
        </div>
      </div>

      {/* Primary White-on-Dark CTA */}
      <div style={{ textAlign: 'center' }}>
        <button className="btn btn-cta btn-lg" onClick={onGoHome}>
          <span>Analyze My Claim</span>
          <ArrowRight size={18} className="btn-arrow" />
        </button>
      </div>
    </div>
  );
}
