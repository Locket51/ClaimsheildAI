# ClaimShield AI — Technical Implementation Blueprint

This document defines the complete technical architecture, data contracts, component design, pipeline flows, and build execution plan for **ClaimShield AI**. It serves as the single source of truth for engineering decisions during the 8–12 hour hackathon implementation.

---

## 1. Status Legend

Every technical component in this implementation blueprint is categorized using standard status tags:

- `[PLANNED]` — Scheduled for implementation during designated hackathon phases.
- `[IMPLEMENTED]` — Fully written, verified, and active in the codebase.
- `[OPTIONAL]` — Stretch goal to be implemented if time permits.
- `[OUT OF SCOPE]` — Explicitly excluded to protect the core MVP delivery.

---

## 2. Overall Product Architecture

ClaimShield AI operates on a modular, decoupled pipeline architecture:

```text
+-----------------------------------------------------------------------------------+
|                                 FRONTEND (React + Vite)                           |
|  - Policy Uploader  - Incident Form  - Progress Stepper  - Claim Risk Report Card |
|  - Countdown Timer  - Evidence Drawer - Action Checklist  - Magic Email Modal     |
+-----------------------------------------------------------------------------------+
                                          |
                                   REST API / HTTP
                                          |
+-----------------------------------------------------------------------------------+
|                                 BACKEND (FastAPI)                                 |
|                                                                                   |
|  1. File Ingestion & Parsing Buffer (Ephemeral Bytes)                             |
|  2. Gemma Extraction Service (Gemini API Integration)                             |
|  3. Snowflake Rule & Benchmark Fetcher                                            |
|  4. Adversarial Audit Engine                                                      |
|  5. Model Harness Validation Middleware                                           |
|  6. JSON Response Renderer                                                        |
+-----------------------------------------------------------------------------------+
        |                                   |                              |
        v                                   v                              v
+-----------------------+   +-------------------------------+   +-------------------+
|  GEMMA DOCUMENT AI    |   |     SNOWFLAKE WAREHOUSE       |   |   MODEL HARNESS   |
| (Structured Extraction|   |  - POLICY_RISK_RULES          |   | - Schema Checker  |
|  & Clause Breakdown)  |   |  - SYNTHETIC_CLAIMS_BENCHMARK |   | - Citation Checker|
+-----------------------+   +-------------------------------+   | - Privacy Check   |
                                                                +-------------------+
```

---

## 3. Core User Flow & Data Pipeline

```text
Step 1: User Uploads Policy (PDF) + Enters Incident Description + Optional Evidence
  ↓
Step 2: FastAPI receives request; creates an Ephemeral Processing Session in memory.
  ↓
Step 3: Gemma (via Gemini API) parses PDF & text to output structured JSON:
        - Extracted Policy Clauses (Limits, Deadlines, Co-pay, Exclusions)
        - Extracted Incident Facts (Admission time, Room rent, Surgery type)
  ↓
Step 4: Audit Engine queries Snowflake for matching POLICY_RISK_RULES and procedure benchmarks.
  ↓
Step 5: Adversarial Audit Engine cross-analyzes:
        [Incident Facts] vs. [Policy Clauses] vs. [Snowflake Risk Rules]
  ↓
Step 6: Model Harness intercepts generated audit findings:
        - Asserts Schema Compliance
        - Asserts Policy & User Evidence Citations
        - Filters Unsupported / Hallucinated Rejection Claims
  ↓
Step 7: Backend returns validated JSON to Frontend.
  ↓
Step 8: Frontend renders Claim Risk Report, Deadline Countdowns, Action Checklist, & Email Draft.
  ↓
Step 9: Ephemeral file buffer purged from memory.
```

---

## 4. Frontend Architecture

### 4.1 Technology Stack `[PLANNED]`
- **Framework:** React 18+ via Vite
- **Styling:** Vanilla CSS (Custom Design System with CSS Variables, modern healthcare/financial palette, zero Tailwind dependencies)
- **State Management:** React Context API / Local State hooks
- **Icons & Visuals:** Feather/Lucide inline SVG components
- **Routing:** Client-side React Router (or lightweight tab/view state manager)

### 4.2 Screens & Routes `[PLANNED]`
1. **`/` (Home / Start Audit):**
   - Hero Banner with core value proposition
   - Drag-and-Drop Policy PDF Uploader
   - Incident Details Form (Admission date/time, Daily room charge, Diagnosis/Treatment, Hospital Name)
   - Supporting Documents Uploader (Optional: Bills, Estimate letters)
   - Prominent Privacy Guarantee Notice
2. **`/analyze` (Analysis Stepper / Progress View):**
   - Real-time animated step indicator:
     - *Reading policy clauses...*
     - *Extracting key deadlines & financial caps...*
     - *Checking Snowflake policy risk rules...*
     - *Running adversarial audit harness...*
     - *Generating action plan...*
3. **`/report` (Claim Risk Report):**
   - Overall Risk Level Indicator (`CRITICAL`, `HIGH`, `MEDIUM`, `ATTENTION`)
   - High-Attention Findings List (Cards featuring Policy Evidence, User Evidence, Interpretation, Recommended Action)
   - Verified Deadline Countdown Widget
   - Interactive Action Checklist
   - AI Claim Communication Draft ("Magic Email") Modal Trigger
4. **`/how-it-works` (Product Methodology):**
   - Simple 3-step explanation: *Upload → Audit → Act*
   - Explanation of Adversarial Auditing vs generic AI chat
5. **`/privacy` (Privacy & Security Commitment):**
   - Zero persistent storage statement
   - Data minimization workflow
   - Legal disclaimer & AI limitation boundaries

### 4.3 UI Component Hierarchy `[PLANNED]`
```text
App
├── Navbar
├── Footer
├── Views
│   ├── HomeView
│   │   ├── Hero
│   │   ├── PolicyUploader
│   │   ├── IncidentForm
│   │   ├── EvidenceUploader
│   │   └── PrivacyBadge
│   ├── AnalyzeView
│   │   └── AnalysisProgressStepper
│   ├── ReportView
│   │   ├── RiskSummaryHeader
│   │   ├── RiskFindingCard
│   │   ├── EvidenceDrawer
│   │   ├── DeadlineCountdownCard
│   │   ├── ActionChecklist
│   │   └── MagicEmailModal
│   ├── HowItWorksView
│   └── PrivacyView
```

---

## 5. Backend Architecture & API Specifications

### 5.1 FastAPI Application Setup `[PLANNED]`
- Built with **Python 3.10+** and **FastAPI**.
- Asynchronous routes using `async/await`.
- CORS middleware enabled for local development (`http://localhost:5173`).

### 5.2 API Endpoints `[PLANNED]`

#### `POST /api/v1/audit`
- **Description:** Primary entry point. Receives policy file, incident description, and supporting documents; executes extraction, audit, harness validation, and returns final report.
- **Request Format:** `multipart/form-data`
  - `policy_file`: UploadFile (PDF)
  - `incident_description`: string
  - `supporting_files`: List[UploadFile] (Optional)
- **Response Format:** `application/json` (See Schema in Section 7)

#### `GET /api/v1/health`
- **Description:** Liveness check verifying connections to Gemini API & Snowflake.
- **Response:** `{"status": "ok", "gemini": true, "snowflake": true}`

#### `POST /api/v1/draft-email`
- **Description:** Generates an updated communication draft based on user-selected risk findings.
- **Request Body:** `{"finding_ids": ["F001", "F002"], "recipient_type": "TPA"}`
- **Response:** `{"subject": "...", "body": "..."}`

---

## 6. Gemma Document AI Pipeline

### 6.1 Extraction Strategy `[PLANNED]`
Gemma (via Gemini API `gemma-3-27b-it` or equivalent) is invoked with strict JSON mode and Pydantic validation schemas.

### 6.2 Prompt Strategy
1. **Policy Extraction Prompt:** Instructs Gemma to locate and extract precise numeric values, temporal constraints, and exact clause section identifiers from the raw PDF text.
2. **Incident Fact Extraction Prompt:** Normalizes unstructured user text into structured timestamps, currency values, and hospital categories.

---

## 7. Data Contracts & JSON Schemas

### 7.1 Policy Clauses Extracted JSON Schema `[PLANNED]`
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ExtractedPolicyClauses",
  "type": "object",
  "properties": {
    "policy_name": { "type": "string" },
    "insurer_name": { "type": "string" },
    "room_rent_limit": {
      "type": "object",
      "properties": {
        "daily_limit_amount": { "type": ["number", "null"] },
        "category_restriction": { "type": ["string", "null"] },
        "proportionate_deduction_applies": { "type": "boolean" },
        "clause_citation": { "type": "string" }
      },
      "required": ["proportionate_deduction_applies", "clause_citation"]
    },
    "notification_deadlines": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "admission_type": { "type": "string", "enum": ["EMERGENCY", "PLANNED", "ANY"] },
          "window_hours": { "type": "integer" },
          "clause_citation": { "type": "string" }
        },
        "required": ["admission_type", "window_hours", "clause_citation"]
      }
    },
    "co_payment": {
      "type": "object",
      "properties": {
        "percentage": { "type": "number" },
        "conditions": { "type": "string" },
        "clause_citation": { "type": "string" }
      },
      "required": ["percentage", "clause_citation"]
    },
    "exclusions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "category": { "type": "string" },
          "description": { "type": "string" },
          "clause_citation": { "type": "string" }
        }
      }
    }
  },
  "required": ["policy_name", "room_rent_limit", "notification_deadlines", "co_payment"]
}
```

### 7.2 Claim Risk Audit Output JSON Schema `[PLANNED]`
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ClaimRiskAuditReport",
  "type": "object",
  "properties": {
    "audit_id": { "type": "string" },
    "timestamp": { "type": "string" },
    "overall_risk_level": { "type": "string", "enum": ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
    "summary_text": { "type": "string" },
    "findings": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "category": { "type": "string", "enum": ["PROCEDURAL", "FINANCIAL", "COVERAGE", "EVIDENCE"] },
          "severity": { "type": "string", "enum": ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
          "title": { "type": "string" },
          "policy_evidence": { "type": "string" },
          "policy_clause_ref": { "type": "string" },
          "user_evidence": { "type": "string" },
          "interpretation": { "type": "string" },
          "recommended_action": { "type": "string" }
        },
        "required": [
          "id", "category", "severity", "title", "policy_evidence", 
          "user_evidence", "interpretation", "recommended_action"
        ]
      }
    },
    "deadline_countdown": {
      "type": ["object", "null"],
      "properties": {
        "deadline_title": { "type": "string" },
        "due_timestamp": { "type": "string" },
        "remaining_seconds": { "type": "integer" },
        "clause_ref": { "type": "string" }
      }
    },
    "action_checklist": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "task": { "type": "string" },
          "priority": { "type": "string", "enum": ["HIGH", "MEDIUM", "LOW"] },
          "completed": { "type": "boolean" }
        },
        "required": ["id", "task", "priority", "completed"]
      }
    },
    "email_draft": {
      "type": "object",
      "properties": {
        "subject": { "type": "string" },
        "body": { "type": "string" },
        "disclaimer": { "type": "string" }
      },
      "required": ["subject", "body", "disclaimer"]
    }
  },
  "required": ["audit_id", "overall_risk_level", "findings", "action_checklist", "email_draft"]
}
```

---

## 8. Snowflake Architecture & Database Schemas

Snowflake acts as the central policy-risk knowledge base and synthetic benchmark engine.

### 8.1 SQL Table Schemas `[PLANNED]`

```sql
-- Schema DDL: snowflake/schema.sql

CREATE DATABASE IF NOT EXISTS CLAIMSHIELD_DB;
USE DATABASE CLAIMSHIELD_DB;
CREATE SCHEMA IF NOT EXISTS PUBLIC;
USE SCHEMA PUBLIC;

-- Table 1: Standardized Policy Risk Rules
CREATE TABLE IF NOT EXISTS POLICY_RISK_RULES (
    RULE_ID VARCHAR(50) PRIMARY KEY,
    CLAUSE_TYPE VARCHAR(100) NOT NULL,
    CONDITION_TRIGGER VARCHAR(255) NOT NULL,
    RISK_SEVERITY VARCHAR(20) NOT NULL, -- CRITICAL, HIGH, MEDIUM, LOW
    CONSEQUENCE_DESCRIPTION TEXT NOT NULL,
    DEFAULT_RECOMMENDED_ACTION TEXT NOT NULL,
    CREATED_AT TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

-- Table 2: Synthetic Healthcare & Claims Benchmarks
CREATE TABLE IF NOT EXISTS SYNTHETIC_CLAIMS_BENCHMARK (
    BENCHMARK_ID VARCHAR(50) PRIMARY KEY,
    PROCEDURE_CATEGORY VARCHAR(100) NOT NULL,
    REGION_CODE VARCHAR(20) NOT NULL,
    AVG_ROOM_DAILY_COST NUMBER(10, 2),
    AVG_TOTAL_CLAIM_COST NUMBER(10, 2),
    TYPICAL_HOSPITAL_STAY_DAYS NUMBER(5, 1),
    COMMON_REJECTION_REASONS ARRAY
);
```

### 8.2 Seed Data `[PLANNED]`
- Seed `POLICY_RISK_RULES` with standard rules:
  - `R001`: Room Rent Cap -> Proportionate Deduction Trigger
  - `R002`: Emergency Admission Notification -> 24h Deadline Miss Trap
  - `R003`: Co-Payment Mandatory Split -> Financial Out-of-Pocket Risk
  - `R004`: Pre-authorization Failure -> Non-Emergency Penalty
  - `R005`: Missing Discharge Summary -> Document Verification Delay

---

## 9. Rule Engine & Adversarial Audit Logic

The **Adversarial Audit Engine** executes deterministic matching combined with LLM contextual reasoning:

```text
Algorithm: Adversarial Claim Audit
Input: Extracted Policy Clauses (P), Incident Facts (I), Snowflake Rules (R)
Output: Unvalidated Claim Risk Audit JSON

1. For each Clause c in P:
   a. Check if c matches trigger condition in Snowflake Rules R.
   b. Compare c.limit against I.charges (e.g. Room Rent: Policy=5000/day vs Incident=8000/day).
   c. If I.charges > c.limit:
      - Create Financial Risk Finding (Severity = HIGH)
      - Attach Policy Evidence = c.citation
      - Attach User Evidence = I.room_rent_statement
      - Calculate potential proportionate deduction impact

2. Check Temporal Deadlines:
   a. Identify Notification Deadline t = P.notification_hours (e.g., 24 hours).
   b. Calculate elapsed hours = (Current_Time - I.admission_timestamp).
   c. If remaining hours < 12 OR elapsed > t:
      - Create Procedural Risk Finding (Severity = CRITICAL)
      - Compute live remaining countdown timer.

3. Check Coverage & Exclusion Rules:
   a. Cross-reference I.diagnosis against P.exclusions.
   b. If matching exclusion found:
      - Create Coverage Risk Finding (Severity = CRITICAL/HIGH).

4. Compile Evidence-Backed Report JSON.
```

---

## 10. Agent Skill Specification

Implemented following the **Agent Skill Open Standard**:

### Directory Layout `[PLANNED]`
```text
skills/
└── claim-audit/
    ├── SKILL.md
    ├── references/
    │   ├── insurance-rules.md
    │   └── risk-taxonomy.md
    └── scripts/
        └── validate_claim.py
```

### SKILL.md Content Overview
Defines the reusable execution steps:
1. Extract policy terms & incident facts.
2. Cross-reference financial caps and temporal constraints.
3. Validate policy citation grounding.
4. Enforce non-speculative risk framing (*"Potential claim risk identified"*).

---

## 11. Model Harness Architecture

The Model Harness (`harness/`) guarantees safety, precision, and strict compliance before any output reaches the user.

```text
+-------------------------------------------------------------+
|                     RAW AUDIT OUTPUT                        |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                  MODEL HARNESS VALIDATOR                    |
|                                                             |
| 1. Schema Validator (Pydantic Schema Check)                 |
| 2. Evidence Validator (Policy & User Evidence Present?)     |
| 3. Citation Validator (Valid Policy Section Quoted?)        |
| 4. Risk Level Validator (Valid Enum: LOW/MED/HIGH/CRITICAL) |
| 5. Anti-Hallucination Filter (Reject forbidden phrases)     |
| 6. Privacy Validator (No raw document text leakage)         |
+-------------------------------------------------------------+
                   |                       |
            (Pass) |                       | (Fail)
                   v                       v
         [REMAINING PIPELINE]    [FALLBACK / RE-TRY]
```

### Anti-Hallucination Forbidden Phrase Filter Rules:
The harness immediately flags and rejects outputs containing:
- `"definitely rejected"`
- `"guaranteed approval"`
- `"100% covered"`
- `"exact reimbursement amount"`
- `"87% chance of rejection"` (or any ungrounded statistical rejection percentage)

---

## 12. Privacy-by-Design Architecture

1. **Ephemeral Processing Buffer:**
   - Uploaded PDF bytes reside solely in FastAPI request memory (`BytesIO`).
   - After Gemma completes entity extraction, the memory buffer is immediately overwritten and garbage collected.
2. **Zero Storage of Raw User Documents:**
   - Raw user documents are **never** written to disk, database, or persistent storage.
   - Snowflake receives **zero user PDFs**; Snowflake only stores static, anonymous policy rules and benchmark aggregations.
3. **UI Transparency:**
   - Prominent UI badge explicitly states: *"Your document is analyzed temporarily in memory and is never permanently stored."*

---

## 13. Frontend/Backend Data Contract & Mock Data

During Phase 1 (Frontend Development), the frontend will consume a centralized mock dataset (`frontend/src/mock/mockAuditReport.json`).

### Mock Audit JSON `[PLANNED]`
```json
{
  "audit_id": "AUDIT-2026-88912",
  "timestamp": "2026-10-07T21:30:00Z",
  "overall_risk_level": "HIGH",
  "summary_text": "ClaimShield identified 3 potential claim risks in your policy, including a critical 24-hour notification deadline and a high-risk room rent cap.",
  "findings": [
    {
      "id": "F001",
      "category": "PROCEDURAL",
      "severity": "CRITICAL",
      "title": "24-Hour Hospital Admission Notification Requirement",
      "policy_evidence": "Clause 4.1: The insured must notify the TPA/Insurer within 24 hours of emergency admission.",
      "policy_clause_ref": "Section 4.1 — Notice of Claim",
      "user_evidence": "Emergency admission recorded at October 7, 2026, 8:00 AM.",
      "interpretation": "Failure to notify within the 24-hour window may lead to administrative claim delay or rejection.",
      "recommended_action": "Contact TPA desk immediately using the emergency helpline provided."
    },
    {
      "id": "F002",
      "category": "FINANCIAL",
      "severity": "HIGH",
      "title": "Room-Rent Limit Exceeded (Proportionate Deduction Risk)",
      "policy_evidence": "Clause 3.2: Room rent capped at ₹5,000 per day for Category A hospitals.",
      "policy_clause_ref": "Section 3.2 — Eligible Expenses",
      "user_evidence": "Hospital estimate charge: ₹8,000 per day for Private Single Room.",
      "interpretation": "Exceeding the room rent limit will trigger proportionate deductions across all associated medical bills (e.g., doctor fees, nursing charges).",
      "recommended_action": "Request hospital desk to downgrade to eligible room category (₹5,000/day) if medical condition permits."
    },
    {
      "id": "F003",
      "category": "FINANCIAL",
      "severity": "MEDIUM",
      "title": "20% Mandatory Co-Payment Clause",
      "policy_evidence": "Clause 5.4: A 20% co-payment applies to all claims for insured persons over 60 years or non-network admissions.",
      "policy_clause_ref": "Section 5.4 — Co-Payment",
      "user_evidence": "Admission at non-network hospital facility.",
      "interpretation": "The insurer will reimburse a maximum of 80% of eligible charges; 20% must be paid out-of-pocket.",
      "recommended_action": "Budget for 20% direct out-of-pocket payment upon hospital discharge."
    }
  ],
  "deadline_countdown": {
    "deadline_title": "24-Hour Emergency Admission Notification Window",
    "due_timestamp": "2026-10-08T08:00:00Z",
    "remaining_seconds": 38140,
    "clause_ref": "Section 4.1"
  },
  "action_checklist": [
    { "id": "C001", "task": "Notify TPA / Insurer of emergency admission", "priority": "HIGH", "completed": false },
    { "id": "C002", "task": "Verify room eligibility limit with hospital billing desk", "priority": "HIGH", "completed": false },
    { "id": "C003", "task": "Collect itemized daily medical bill estimate", "priority": "MEDIUM", "completed": false },
    { "id": "C004", "task": "Obtain signed pre-authorization form from attending physician", "priority": "MEDIUM", "completed": false }
  ],
  "email_draft": {
    "subject": "URGENT: Emergency Hospitalization Intimation — Policy #CS-994821",
    "body": "Dear TPA / Claims Department,\n\nI am writing to formally intimate the emergency hospital admission of the insured under Policy #CS-994821.\n\nAdmission Details:\n- Date & Time: Oct 7, 2026 at 08:00 AM\n- Hospital Name: City Care Super Specialty Hospital\n- Treatment: Emergency Medical Intimation\n\nPlease find this email as formal intimation within the required policy timeframe as specified under Section 4.1.\n\nSincerely,\nPolicyholder",
    "disclaimer": "This draft is generated by ClaimShield AI for informational purposes and does not constitute legal representation."
  }
}
```

---

## 14. Hackathon Build Order & Phases

To maximize speed and guarantee a fully functional MVP within 8–12 hours, development follows strict sequential phases:

```text
+--------------------------------------------------------------------------------+
| PHASE 0: Documentation & Technical Blueprint [COMPLETED]                      |
|          - Establish README.md & IMPLEMENTATION.md                             |
+--------------------------------------------------------------------------------+
                                       |
                                       v
+--------------------------------------------------------------------------------+
| PHASE 1: Frontend Implementation [NEXT STEP]                                   |
|          - Build UI components & screens with mock data                        |
|          - Polished CSS, responsive layouts, countdown timer, checklist        |
+--------------------------------------------------------------------------------+
                                       |
                                       v
+--------------------------------------------------------------------------------+
| PHASE 2: Gemma Extraction Pipeline                                             |
|          - Set up Gemini API integration for policy & incident extraction      |
|          - Define Pydantic schemas for JSON structure                          |
+--------------------------------------------------------------------------------+
                                       |
                                       v
+--------------------------------------------------------------------------------+
| PHASE 3: Snowflake Database & Policy Rules                                     |
|          - Initialize Snowflake schemas, seed POLICY_RISK_RULES               |
|          - Write rule fetching queries and procedure benchmark lookup          |
+--------------------------------------------------------------------------------+
                                       |
                                       v
+--------------------------------------------------------------------------------+
| PHASE 4: Adversarial Audit Engine                                              |
|          - Build core reasoning logic combining Gemma + Snowflake + Incident   |
+--------------------------------------------------------------------------------+
                                       |
                                       v
+--------------------------------------------------------------------------------+
| PHASE 5: Model Harness Implementation                                          |
|          - Implement schema validation, citation check, hallucination filter   |
+--------------------------------------------------------------------------------+
                                       |
                                       v
+--------------------------------------------------------------------------------+
| PHASE 6: Agent Skill Setup                                                     |
|          - Create `skills/claim-audit/` layout, SKILL.md, validate_claim.py   |
+--------------------------------------------------------------------------------+
                                       |
                                       v
+--------------------------------------------------------------------------------+
| PHASE 7: End-to-End Backend Integration & REST API                             |
|          - Connect Frontend -> FastAPI -> Gemma -> Snowflake -> Audit -> UI    |
+--------------------------------------------------------------------------------+
                                       |
                                       v
+--------------------------------------------------------------------------------+
| PHASE 8: Testing, Polish & Demo Preparation                                    |
|          - Verify edge cases, validate countdown timers, record demo story     |
+--------------------------------------------------------------------------------+
```

---

## 15. MVP Scope Boundaries

### In Scope for MVP:
- PDF Policy Upload & Client-side validation
- Natural text Incident input form
- Gemma-powered structured extraction via Gemini API
- Snowflake repository of Policy-risk rules & procedure benchmarks
- Adversarial Claim Audit engine generating evidence-backed findings
- Model Harness validating schema, citations, and anti-hallucination rules
- Responsive UI (React) with Risk Cards, Countdown, Checklist, and Draft Email
- Standardized Agent Skill documentation & script structure

### Explicitly Out of Scope:
- User authentication, login, or user account management
- Persistent database storage of confidential user policy PDFs
- Complex claims analytics dashboard (kept strictly focused on the audit report)
- Generic conversational chatbot / open-ended chat window
- Automated phone call integration or direct insurance carrier API submission
- Legal compliance certification or guaranteed approval claims
