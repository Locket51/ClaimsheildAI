import json
from app.models.schemas import RiskFinding

class AuditEngine:
    def __init__(self):
        # Local JSON Rules Engine (Fallback from Snowflake)
        self.policy_rules = [
            {"RULE_ID": "R001", "CLAUSE_TYPE": "ROOM_RENT", "CONDITION_TRIGGER": "Room rent cap exceeded", "RISK_SEVERITY": "HIGH", "CONSEQUENCE_DESCRIPTION": "Proportionate deduction will trigger across all medical bills.", "DEFAULT_RECOMMENDED_ACTION": "Request hospital billing desk to downgrade to eligible room category if medical condition permits."},
            {"RULE_ID": "R002", "CLAUSE_TYPE": "NOTIFICATION", "CONDITION_TRIGGER": "Emergency admission 24h deadline missed", "RISK_SEVERITY": "CRITICAL", "CONSEQUENCE_DESCRIPTION": "Failure to notify within the 24-hour window may lead to administrative claim delay or rejection.", "DEFAULT_RECOMMENDED_ACTION": "Contact TPA desk immediately using the emergency helpline provided."},
            {"RULE_ID": "R003", "CLAUSE_TYPE": "CO_PAYMENT", "CONDITION_TRIGGER": "Mandatory co-payment applied", "RISK_SEVERITY": "MEDIUM", "CONSEQUENCE_DESCRIPTION": "The insurer will reimburse a maximum of 80% of eligible charges; the rest must be paid out-of-pocket.", "DEFAULT_RECOMMENDED_ACTION": "Budget for direct out-of-pocket payment upon hospital discharge."},
            {"RULE_ID": "R004", "CLAUSE_TYPE": "PRE_AUTHORIZATION", "CONDITION_TRIGGER": "Pre-authorization failure for planned surgery", "RISK_SEVERITY": "CRITICAL", "CONSEQUENCE_DESCRIPTION": "Planned treatments without pre-authorization face direct rejection.", "DEFAULT_RECOMMENDED_ACTION": "Obtain signed pre-authorization form from attending physician before procedure."},
            {"RULE_ID": "R005", "CLAUSE_TYPE": "EVIDENCE", "CONDITION_TRIGGER": "Missing discharge summary", "RISK_SEVERITY": "HIGH", "CONSEQUENCE_DESCRIPTION": "Document verification delay prevents final claim settlement.", "DEFAULT_RECOMMENDED_ACTION": "Ensure hospital provides a stamped and signed discharge summary at checkout."}
        ]
        
    def analyze(self, facts: list, incident_text: str) -> dict:
        risks = []
        highest_severity = "LOW"
        
        severity_ranks = {"LOW": 1, "MEDIUM": 2, "HIGH": 3, "CRITICAL": 4}
        
        for fact in facts:
            clause = fact.get("clause_type")
            fact_clause = (clause if clause is not None else "").replace("_LIMIT", "")
            
            matched_rule = next((rule for rule in self.policy_rules if rule["CLAUSE_TYPE"] == fact_clause or rule["CLAUSE_TYPE"] in fact_clause), None)
            
            if matched_rule:
                risk_severity = matched_rule.get("RISK_SEVERITY", "MEDIUM")
                category = "FINANCIAL" if "RENT" in matched_rule.get("CLAUSE_TYPE", "") or "PAYMENT" in matched_rule.get("CLAUSE_TYPE", "") else "PROCEDURAL"
                
                risks.append(
                    RiskFinding(
                        severity=risk_severity,
                        category=category,
                        title=matched_rule.get("CONDITION_TRIGGER", "Potential risk detected"),
                        interpretation=matched_rule.get("CONSEQUENCE_DESCRIPTION", "This may create a claim risk depending on the policy's applicable terms."),
                        recommended_action=matched_rule.get("DEFAULT_RECOMMENDED_ACTION", "Review policy document for details."),
                        policy_evidence=fact.get("evidence", "Policy limit condition triggered."),
                        user_evidence="Based on your provided incident facts.",
                        policy_reference=fact.get("policy_reference", "General Policy Guidelines")
                    )
                )
                
                if severity_ranks.get(risk_severity, 0) > severity_ranks.get(highest_severity, 0):
                    highest_severity = risk_severity
                
        return {
            "risks": risks,
            "risk_level": highest_severity
        }

    def validate_certainty(self, text: str) -> str:
        unsupported_phrases = ["will definitely be rejected", "100% covered", "guaranteed", "87% chance"]
        lower_text = text.lower()
        for phrase in unsupported_phrases:
            if phrase in lower_text:
                return "Unable to verify from the provided policy."
        return text
