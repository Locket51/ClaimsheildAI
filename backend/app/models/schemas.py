from pydantic import BaseModel, Field
from typing import List, Optional, Any

class UploadIncident(BaseModel):
    incident_description: str
    
class ExtractedFact(BaseModel):
    clause_type: Optional[str] = Field(default=None, description="e.g., ROOM_RENT_LIMIT, CO_PAY, WAITING_PERIOD, DEADLINE")
    description: Optional[str] = Field(default=None, description="What the clause limits or requires")
    policy_reference: Optional[str] = Field(default=None, description="Section number or heading")
    evidence: Optional[str] = Field(default=None, description="Exact quote from the policy text")
    confidence: float = Field(default=1.0)
    
    class Config:
        extra = "ignore"

class RiskFinding(BaseModel):
    severity: str = Field(description="CRITICAL, HIGH, MEDIUM, LOW")
    category: str = Field(description="FINANCIAL, PROCEDURAL, COVERAGE")
    title: str
    interpretation: str
    recommended_action: str
    policy_evidence: Optional[str]
    user_evidence: Optional[str]
    policy_reference: Optional[str]

class ActionItem(BaseModel):
    task: str
    priority: str

class AnalyzeResponse(BaseModel):
    analysis_id: str
    status: str
    risk_level: str
    summary: dict
    risks: List[RiskFinding]
    deadlines: List[Any]
    actions: List[ActionItem]
    evidence: List[ExtractedFact]
    email_draft: Optional[str]
    warnings: List[str]
