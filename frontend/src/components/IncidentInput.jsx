import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function IncidentInput({ incidentText, setIncidentText, error }) {
  const sampleText = "My father was admitted to the hospital after an emergency at 9:00 AM today. The hospital estimate is ₹8,000 per day for the room.";
  const maxChars = 1000;

  const handleTextChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setIncidentText(e.target.value);
    }
  };

  const handleUseSample = () => {
    setIncidentText(sampleText);
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
        <div className="form-step-header" style={{ marginBottom: 0 }}>
          <span className="form-step-num">02</span>
          <span className="form-step-title">WHAT HAPPENED?</span>
        </div>
        <button 
          type="button" 
          onClick={handleUseSample}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--color-accent)', 
            fontSize: '0.78125rem', 
            fontWeight: 600, 
            cursor: 'pointer' 
          }}
        >
          Insert sample scenario
        </button>
      </div>

      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        Describe the situation in your own words (admission date, daily room charge, diagnosis).
      </p>

      <div style={{ position: 'relative' }}>
        <textarea
          className="textarea"
          value={incidentText}
          onChange={handleTextChange}
          placeholder="Example: My father was admitted to the hospital after an emergency at 9:00 AM today. The hospital estimate is ₹8,000 per day for the room."
          rows={3}
          maxLength={maxChars}
        />
        <div style={{ 
          fontSize: '0.72rem', 
          color: 'var(--text-muted)', 
          textAlign: 'right', 
          marginTop: '0.25rem' 
        }}>
          {incidentText.length} / {maxChars}
        </div>
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
