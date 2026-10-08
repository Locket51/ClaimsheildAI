# ClaimShield AI

> **Adversarially audit health insurance policies against a user's claim situation to identify hidden risks, deadlines, financial traps, missing evidence, and recommended actions.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Hackathon: HackNation](https://img.shields.io/badge/Hackathon-8--12hr%20MVP-orange.svg)]()
[![Stack: FastAPI%20%7C%20React%20%7C%20Gemma%20%7C%20Snowflake](https://img.shields.io/badge/Stack-FastAPI%20%7C%20React%20%7C%20Gemma%20%7C%20Snowflake-green.svg)]()

---

## 1. Executive Summary & Core Positioning

**ClaimShield AI** is **NOT** a generic insurance chatbot, nor is it a simple policy summarizer.

During a medical emergency or hospital admission, policyholders are flooded with long, legally complex insurance policy documents. Missing a single strict deadline or fine-print clause can lead to claim delays, massive out-of-pocket deductions, or total claim rejections.

ClaimShield AI performs an **Adversarial Claim Audit**. It actively thinks like an insurance auditor:
> *"If this claim gets challenged, what clauses, fine print, missing documentation, or reporting deadlines could create a problem for the policyholder?"*

### Core Value Proposition
- **Find the hidden traps:** Room rent caps, proportionate deductions, co-payment clauses, strict 24-hour notification deadlines, waiting periods, sub-limits, and exclusions.
- **Evidence-backed audit:** Every finding directly cites **Policy Evidence**, **User Evidence**, **ClaimShield Interpretation**, and **Recommended Action**.
- **No speculative or misleading claims:** ClaimShield never predicts fake rejection probabilities (e.g., "87% chance of rejection"). It flags *"Potential claim risk identified"* backed strictly by evidence.
- **Actionable output:** Provides an immediate action checklist, verified deadline countdown timers, and an AI-assisted claim notification / dispute draft.

---

## 2. The Problem

Health insurance policy documents contain critical conditions hidden deep within complex legal language:

* **Mandatory notification deadlines** (e.g., within 24 hours of emergency admission)
* **Pre-authorization requirements** for planned vs. emergency treatments
* **Room-rent limits** and subsequent **proportionate deductions** across medical bills
* **Co-payment percentages** based on age, hospital network, or pre-existing conditions
* **Sub-limits** on specific surgeries, doctor fees, or diagnostic tests
* **Specific exclusions & disease waiting periods**
* **Mandatory documentation requirements** (itemized bills, discharge summary, diagnostic reports)
* **Network vs. Non-network hospital admission rules**

When a hospital admission occurs, patients and families are under extreme stress and lack the time or legal expertise to analyze these documents. ClaimShield bridges this gap immediately.

---

## 3. Core Workflow

ClaimShield follows a strict **Understand → Ground → Reason → Verify → Act** operational model:

```text
               +----------------------------------+
               |        User Upload Policy        |
               +----------------------------------+
                                |
                                v
               +----------------------------------+
               |     Describe Claim Incident      |
               +----------------------------------+
                                |
                                v
               +----------------------------------+
               |  (Optional) Supporting Evidence  |
               +----------------------------------+
                                |
                                v
   [UNDERSTAND] +----------------------------------+
                |     Gemma via Local Ollama         |
                |  (Extract Policy & Incident Fact)|
                +----------------------------------+
                                |
                                v
     [GROUND]   +----------------------------------+
                |       Snowflake Data Warehouse    |
                |  (Policy Rules + Claims Context) |
                +----------------------------------+
                                |
                                v
     [REASON]   +----------------------------------+
                |    Adversarial Audit Engine      |
                |  (Cross-match Incident vs Policy)|
                +----------------------------------+
                                |
                                v
     [VERIFY]   +----------------------------------+
                |      Model Harness Layer         |
                | (Schema, Citation, Risk Check)   |
                +----------------------------------+
                                |
                                v
       [ACT]    +----------------------------------+
                |        Claim Risk Report         |
                |  - Evidence-backed Findings      |
                |  - Deadline Countdown            |
                |  - Action Checklist              |
                |  - AI Claim Communication Draft  |
                +----------------------------------+
```

---

## 4. Key Features

1. **Policy Upload & Incident Description:**
   - Drag-and-drop PDF upload with instant parsing feedback.
   - Simple, non-technical prompt for users to describe admission date, hospital charges, room choice, and treatment.
   - Support for optional supporting documents (hospital estimate bills, TPA communications, rejection letters).

2. **Adversarial Risk Identification:**
   - Categorized findings by severity: `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`.
   - Clear distinction between Procedural, Financial, Coverage, and Evidence risks.

3. **Evidence-Backed Results:**
   - Every risk card explicitly presents:
     - **Policy Evidence:** Quoted policy clause & clause section.
     - **User Evidence:** User's stated facts or document upload context.
     - **ClaimShield Interpretation:** Practical explanation of potential financial/legal risk.
     - **Recommended Action:** Concrete steps the user can take immediately.

4. **Deadline Countdown Timers:**
   - Live visual countdowns for strict policy deadlines (e.g., 24h notification or 30-day claim submission window) anchored against the incident timestamp.

5. **Action Checklist:**
   - Step-by-step checklist telling the user exactly what documents to collect and what phone calls/emails to make.

6. **AI-Assisted Claim Communication Draft ("Magic Email"):**
   - Automatically generates structured, professional notification or dispute emails addressed to the TPA/insurer, referencing exact policy clauses.

7. **Multi-Policy Comparison (`/compare`):**
   - Visually upload and compare 2 to 3 health insurance policies side-by-side.
   - Side-by-side comparison matrix across room-rent caps, co-pay %, PED waiting periods, emergency notification deadlines, ICU caps, and ambulance benefits.
   - Optional priority selector (*Lower out-of-pocket cost*, *Fewer restrictions*, *Shorter waiting periods*, etc.) to generate personalized takeaways.
   - Grounded clause evidence side drawer showing exact policy text and page numbers.
   - Strict evidence-first approach with zero speculative or fake score rankings.

---

## 5. Technology Stack & Component Architecture

| Layer | Technology | Key Responsibility |
| :--- | :--- | :--- |
| **Frontend** | React (Vite), Vanilla CSS | Responsive, accessible, mobile-first calm UI (`/`, `/compare`, `/analyze`, `/report`, `/how-it-works`, `/privacy`). |
| **Backend API** | Python, FastAPI, Pydantic | RESTful API orchestration, asynchronous pipeline execution, file buffer management. |
| **Document AI** | Gemma via Local Ollama | Multi-modal document understanding, policy parsing, clause extraction, incident structuring. |
| **Data & Rules** | Snowflake | Policy-risk rule repository, synthetic healthcare claims dataset, benchmark analytics. |
| **Workflow standard**| Agent Skill | Standardized procedure (`skills/claim-audit/`) defining audit steps and risk taxonomies. |
| **AI Validation** | Model Harness | Custom validation layer checking schema conformance, factual citations, and zero hallucinated claims. |
| **Developer Tools** | GitHub Copilot, Pytest | Code generation, schema verification, unit testing. |

---

## 6. Detailed Roles of Core Technologies

### Gemma (via Local Ollama)
Gemma4 acts as the core document reasoning and entity extraction engine:
- Extracts structured policy terms into strictly typed JSON (Limits, Co-pay, Deadlines, Exclusions).
- Normalizes incident descriptions into structured timestamps and financial figures.
- Formulates candidate adversarial risk arguments based on document evidence.
- *Strict Constraint:* Gemma outputs are enforced via Pydantic schemas and validated by the Model Harness; Gemma never interacts with the user as an unconstrained chatbot.


### Agent Skill (`skills/claim-audit/`)
Built according to the **Agent Skill Open Standard**:
- Encapsulates the complete procedural intelligence of an adversarial insurance audit.
- Contains references (`insurance-rules.md`, `risk-taxonomy.md`) and deterministic validation scripts (`validate_claim.py`).

### Model Harness (`harness/`)
The protective middleware validating AI responses before UI delivery:
- **Schema Validation:** Verifies structural JSON completeness.
- **Citation Validation:** Ensures every flagged risk references actual policy clauses.
- **Hallucination Prevention:** Rejects forbidden phrases like *"guaranteed rejection"*, *"100% approval"*, or fake statistical probabilities.
- **Privacy Assurance:** Ensures no raw PDF text is persisted into analytical logs.

---

## 7. Privacy by Design

Insurance policies contain sensitive personal and financial data. ClaimShield adheres strictly to privacy-first principles:

- **No Permanent PDF Storage:** Uploaded policy PDFs are processed in an ephemeral memory buffer during the audit session and immediately discarded.
- **Data Minimization:** Only extracted structural clauses and anonymized incident categories are passed into the audit engine.
- **Isolation of Analytics:** Snowflake analytics tables store only static synthetic healthcare data and public rule definitions. Personal documents are never written to Snowflake persistent storage.
- **Transparent Disclaimer:** The UI prominently displays data retention policies and clear notice that ClaimShield provides informational audits, not formal legal advice.

---

## 8. Repository Structure

```text
claimshield-ai/
├── frontend/                  # React + Vite frontend application
│   ├── src/
│   │   ├── components/        # UI Components (PolicyUploader, RiskFindingCard, etc.)
│   │   ├── pages/             # Route views (Home, Analyze, Report, HowItWorks, Privacy)
│   │   ├── mock/              # Mock dataset for offline/UI testing
│   │   └── index.css          # Core design tokens & calm CSS styling
│   └── package.json
├── backend/                   # FastAPI backend server
│   ├── app/
│   │   ├── api/               # API endpoint handlers (/upload, /audit, /health)
│   │   ├── core/              # Config, security, and logging
│   │   └── services/          # Audit orchestration service
│   └── main.py
├── skills/                    # Agent Skill Open Standard compliant directory
│   └── claim-audit/
│       ├── SKILL.md           # Master skill workflow specification
│       ├── references/        # Insurance rule definitions & risk taxonomy
│       │   ├── insurance-rules.md
│       │   └── risk-taxonomy.md
│       └── scripts/           # Standalone validation & execution helpers
│           └── validate_claim.py
├── harness/                   # Model Harness validation framework
│   ├── validator.py           # Output schema & evidence validator
│   ├── evaluator.py           # Hallucination & citation assertion checks
│   └── tests/                 # Harness test suites
├── snowflake/                 # Snowflake SQL schemas and analytics
│   ├── schema.sql             # Table DDLs for rules & benchmarks
│   ├── rules.sql              # Seed policy-risk rules
│   └── analytics.sql          # Benchmark comparison queries
├── gemma/                     # Gemma extraction prompts and JSON schemas
│   ├── extraction.py          # Local Ollama wrapper for Gemma4
│   ├── prompts/               # Structured extraction prompts
│   └── schemas/               # Pydantic schemas for extracted data
├── sample-data/               # Sample policies and synthetic incident tests
├── docs/                      # Technical documentation
│   ├── architecture.md
│   ├── privacy.md
│   └── copilot.md
├── README.md                  # Project overview & quickstart (this file)
├── IMPLEMENTATION.md          # Full technical execution plan
├── LICENSE                    # MIT License
└── CONTRIBUTING.md            # Contribution guidelines
```

---

## 9. Environment & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Local Ollama running Gemma4 (gemma4:e4b)
- Snowflake Account credentials (or local mock driver for offline evaluation)

### Environment Variables (`.env`)
```env
# Backend & AI Configuration
GEMMA_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
GEMMA_MODEL=gemma4:e4b

# Snowflake Configuration
SNOWFLAKE_ACCOUNT=your_account_identifier
SNOWFLAKE_USER=your_user
SNOWFLAKE_PASSWORD=your_password
SNOWFLAKE_DATABASE=CLAIMSHIELD_DB
SNOWFLAKE_SCHEMA=PUBLIC
SNOWFLAKE_WAREHOUSE=COMPUTE_WH

# Application Settings
ENVIRONMENT=development
PORT=8000
```

### Local Development Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-org/claimshield-ai.git
   cd claimshield-ai
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate

   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access Application:**
   Open your browser to `http://localhost:5173`.

---

## 10. Limitations & Disclaimers

- **Informational Tool:** ClaimShield AI is an automated policy auditing tool designed to highlight potential administrative, financial, and coverage risks. It does **not** constitute legal advice, insurance adjusting, or a formal claim guarantee.
- **Document Quality:** Extraction accuracy depends on the legibility and structure of the uploaded policy document (OCR/native PDF).
- **Insurer Final Authority:** Final claim settlement rests solely with the respective Insurance Company / TPA as per their official policy terms and regulatory guidelines.

---

## 11. License

Distributed under the MIT License. See `LICENSE` for more information.
