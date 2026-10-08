import React, { useState } from 'react';
import RiskSummaryHeader from '../components/RiskSummaryHeader';
import RiskFindingCard from '../components/RiskFindingCard';
import CountdownCard from '../components/CountdownCard';
import ActionChecklist from '../components/ActionChecklist';
import EvidenceDrawer from '../components/EvidenceDrawer';
import MagicEmailModal from '../components/MagicEmailModal';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';

export default function Report({ reportData, onStartOver }) {
  const [selectedFinding, setSelectedFinding] = useState(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  if (!reportData) return null;

  return (
    <div className="main-content">
      {/* Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <button 
          className="btn btn-outline" 
          onClick={onStartOver}
          style={{ fontSize: '0.84rem', padding: '0.4rem 0.85rem' }}
        >
          <ArrowLeft size={16} />
          <span>New Claim Audit</span>
        </button>

        <button 
          className="btn btn-primary"
          onClick={() => setEmailModalOpen(true)}
          style={{ fontSize: '0.875rem' }}
        >
          <Mail size={16} />
          <span>Generate Notification Draft</span>
        </button>
      </div>

      {/* Report Header */}
      <RiskSummaryHeader reportData={reportData} />

      {/* Deadline Countdown Widget */}
      {reportData.deadline && (
        <CountdownCard deadlineData={reportData.deadline} />
      )}

      {/* Findings List */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>
          Identified Claim Risks
        </h2>

        {reportData.findings.map((finding) => (
          <RiskFindingCard
            key={finding.id}
            finding={finding}
            onSelectEvidence={(item) => setSelectedFinding(item)}
          />
        ))}
      </div>

      {/* Action Checklist */}
      <ActionChecklist initialActions={reportData.actionChecklist} />

      {/* Evidence Drawer Modal */}
      <EvidenceDrawer 
        finding={selectedFinding} 
        onClose={() => setSelectedFinding(null)} 
      />

      {/* Magic Email Draft Modal */}
      <MagicEmailModal 
        emailDraft={reportData.emailDraft}
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
      />
    </div>
  );
}
