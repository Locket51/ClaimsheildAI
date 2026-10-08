import React from 'react';
import { Plus, Check } from 'lucide-react';

export default function SupportingDocuments({ supportingFiles, setSupportingFiles }) {
  const documentOptions = [
    { id: 'est', name: 'Hospital estimate' },
    { id: 'rej', name: 'Rejection letter' },
    { id: 'bill', name: 'Hospital bill' },
    { id: 'sum', name: 'Discharge summary' }
  ];

  const toggleDoc = (docName) => {
    if (supportingFiles.includes(docName)) {
      setSupportingFiles(supportingFiles.filter(item => item !== docName));
    } else {
      setSupportingFiles([...supportingFiles, docName]);
    }
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div className="form-step-header" style={{ marginBottom: '0.25rem' }}>
        <span className="form-step-num">03</span>
        <span className="form-step-title">SUPPORTING EVIDENCE (OPTIONAL)</span>
      </div>
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
        Select optional documents available to refine clause matching. You can continue without these.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
        {documentOptions.map((doc) => {
          const isSelected = supportingFiles.includes(doc.name);
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => toggleDoc(doc.name)}
              className={`chip ${isSelected ? 'selected' : ''}`}
            >
              {isSelected ? <Check size={13} /> : <Plus size={13} />}
              <span>{doc.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
