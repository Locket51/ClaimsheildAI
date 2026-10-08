from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uuid
import os
import json
from app.providers.gemma_provider import GemmaProvider
from app.models.schemas import AnalyzeResponse, ActionItem, ExtractedFact
from app.services.audit_engine import AuditEngine
from app.core.config import settings

app = FastAPI(title="ClaimShield AI Backend")

# Fix CORS so React can fetch data
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

gemma_provider = GemmaProvider()
audit_engine = AuditEngine()

@app.get("/api/v1/health")
async def health_check():
    ollama_health = await gemma_provider.check_health()
    return ollama_health

@app.get("/api/v1/test_gemma")
async def test_gemma():
    prompt = "You are ClaimShield. Explain in two sentences what a health insurance room-rent sub-limit is."
    try:
        response = await gemma_provider.generate(prompt)
        return {"status": "success", "response": response}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/api/v1/analyze", response_model=AnalyzeResponse)
async def analyze_claim(
    incident: str = Form(...),
    policy: UploadFile = File(...)
):
    analysis_id = f"cs_{uuid.uuid4().hex[:8]}"
    
    import pypdf
    import io
    import re
    
    # 1. Privacy - Temporary processing
    if not policy.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
        
    policy_text = ""
    try:
        # Read the file directly into memory without saving to disk
        pdf_bytes = await policy.read()
        pdf_file = io.BytesIO(pdf_bytes)
        reader = pypdf.PdfReader(pdf_file)
        
        for page in reader.pages:
            text = page.extract_text()
            if text:
                policy_text += text + "\n"
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse PDF: {str(e)}")
        
    # Cap the policy text length to avoid overflowing Gemma's context window
    # In a production app, we would use RAG or chunking.
    max_chars = 15000
    if len(policy_text) > max_chars:
        policy_text = policy_text[:max_chars] + "... [TRUNCATED]"
        
    prompt = f"""
    You are an expert insurance auditor. Extract facts from the following incident and policy context.
    Return ONLY a raw JSON array of objects, with no markdown formatting or backticks.
    Each object must have the keys: clause_type, description, policy_reference, evidence.
    If you don't know a section, use null.
    
    Valid clause_type values: ROOM_RENT, NOTIFICATION, CO_PAYMENT, PRE_AUTHORIZATION, EVIDENCE
    
    Incident: {incident}
    
    Policy Text:
    {policy_text}
    """
    
    try:
        response_text = await gemma_provider.generate(prompt)
        
        # Try to clean the response if it returned markdown
        cleaned_response = response_text.strip()
        if cleaned_response.startswith("```json"):
            cleaned_response = cleaned_response[7:]
        elif cleaned_response.startswith("```"):
            cleaned_response = cleaned_response[3:]
        if cleaned_response.endswith("```"):
            cleaned_response = cleaned_response[:-3]
        
        try:
            extracted_facts = json.loads(cleaned_response.strip())
            if not isinstance(extracted_facts, list):
                extracted_facts = [extracted_facts]
        except json.JSONDecodeError:
            # Fallback if Gemma didn't format properly
            print(f"Failed to parse Gemma output as JSON: {response_text}")
            extracted_facts = [
                {
                    "clause_type": "ROOM_RENT",
                    "description": "Fallback: Could not parse AI response",
                    "policy_reference": "N/A",
                    "evidence": "N/A"
                }
            ]
        
        audit_result = audit_engine.analyze(extracted_facts, incident)
        
        return AnalyzeResponse(
            analysis_id=analysis_id,
            status="completed",
            risk_level=audit_result.get("risk_level", "LOW"),
            summary={"issues_found": len(audit_result.get("risks", []))},
            risks=audit_result.get("risks", []),
            deadlines=[],
            actions=[ActionItem(task="Contact TPA for pre-authorization", priority="HIGH")],
            evidence=[ExtractedFact(**fact) for fact in extracted_facts],
            email_draft=audit_engine.validate_certainty("Dear TPA, please find attached my claim for reimbursement."),
            warnings=["This is an informational audit. Final decision rests with the insurer."]
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
