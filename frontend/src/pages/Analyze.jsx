import React from 'react';
import AnalysisProgress from '../components/AnalysisProgress';

export default function Analyze({ onAnalysisComplete }) {
  return (
    <div className="main-content">
      <AnalysisProgress onComplete={onAnalysisComplete} />
    </div>
  );
}
