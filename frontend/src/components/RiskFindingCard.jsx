import React from 'react';
import { AlertCircle, AlertTriangle, Info, FileSearch, ArrowRight } from 'lucide-react';

export default function RiskFindingCard({ finding, onSelectEvidence }) {
  const { id, severity, title, description, userContext, comparison, potentialImpact, action } = finding;

  const getSeverityBadge = () => {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className="severity-pill severity-critical">
            <AlertCircle size={12} />
            CRITICAL
          </span>
        );
      case 'HIGH':
        return (
          <span className="severity-pill severity-high">
            <AlertTriangle size={12} />
            HIGH RISK
          </span>
        );
      case 'ATTENTION':
      default:
        return (
          <span className="severity-pill severity-attention">
            <Info size={12} />
            ATTENTION
          </span>
        );
    }
  };

  const getBorderColor = () => {
    switch (severity) {
      case 'CRITICAL': return 'var(--severity-critical-border)';
      case 'HIGH': return 'var(--severity-high-border)';
      default: return 'var(--severity-attention-border)';
    }
  };

  return (
    <div className="card" style={{ 
      marginBottom: '1.25rem', 
      borderLeft: `4px solid ${getBorderColor()}`,
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
        {getSeverityBadge()}
      </div>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.4rem' }}>
        {title}
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-main)', marginBottom: '0.875rem', lineHeight: 1.45 }}>
        {description}
      </p>

      {/* User Context callout if present */}
      {userContext && (
        <div style={{
          backgroundColor: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.5rem 0.75rem',
          fontSize: '0.84rem',
          color: 'var(--color-text-muted)',
          marginBottom: '0.875rem'
        }}>
          <strong>Incident context:</strong> {userContext}
        </div>
      )}

      {/* Comparison block if present (e.g. Room Rent) */}
      {comparison && (
        <div style={{
          backgroundColor: 'var(--severity-high-bg)',
          border: '1px solid var(--severity-high-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          marginBottom: '0.875rem',
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--severity-high)', textTransform: 'uppercase' }}>
              Policy Limit
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {comparison.policyLimit}
            </div>
          </div>
          <div style={{ borderLeft: '1px solid var(--severity-high-border)', paddingLeft: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--severity-high)', textTransform: 'uppercase' }}>
              Hospital Estimate
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--severity-critical)' }}>
              {comparison.hospitalEstimate}
            </div>
          </div>
        </div>
      )}

      {/* Potential Impact if present */}
      {potentialImpact && (
        <div style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', marginBottom: '0.875rem' }}>
          <strong>Potential impact:</strong> {potentialImpact}
        </div>
      )}

      {/* Recommended Action */}
      {action && (
        <div style={{ 
          fontSize: '0.875rem', 
          color: 'var(--color-primary)', 
          fontWeight: 500,
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <span style={{ fontWeight: 700, color: 'var(--color-accent-blue)' }}>Action:</span> {action}
        </div>
      )}

      <button 
        className="btn btn-outline"
        onClick={() => onSelectEvidence(finding)}
        style={{ fontSize: '0.84rem', padding: '0.45rem 0.9rem' }}
      >
        <FileSearch size={16} />
        <span>View Policy Evidence</span>
      </button>
    </div>
  );
}
