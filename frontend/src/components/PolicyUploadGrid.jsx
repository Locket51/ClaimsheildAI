import React from 'react';
import PolicyUploadCard from './PolicyUploadCard';
import { Plus } from 'lucide-react';

export default function PolicyUploadGrid({ 
  policies, 
  onUpdatePolicy, 
  onAddPolicy, 
  onRemovePolicy 
}) {
  const canAddMore = policies.length < 3;
  const canRemove = policies.length > 2;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.25rem'
      }}>
        {policies.map((policy) => (
          <PolicyUploadCard 
            key={policy.id}
            policy={policy}
            onUpdatePolicy={onUpdatePolicy}
            onRemovePolicy={onRemovePolicy}
            canRemove={canRemove}
          />
        ))}
      </div>

      {canAddMore && (
        <div style={{ textAlign: 'center' }}>
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={onAddPolicy}
            style={{ 
              fontSize: '0.875rem', 
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              borderStyle: 'dashed'
            }}
          >
            <Plus size={16} />
            <span>Add another policy (Policy C)</span>
          </button>
        </div>
      )}
    </div>
  );
}
