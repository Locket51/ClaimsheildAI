from fpdf import FPDF
import os

def create_pdf(filename, content):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    for line in content.split('\n'):
        # using multi_cell to handle text wrapping properly
        pdf.multi_cell(0, 8, txt=line)
    
    output_dir = r"c:\Users\TRIDIB BISWAS\Desktop\Hacktober2\ClaimsheildAI\sample-data"
    os.makedirs(output_dir, exist_ok=True)
    pdf_path = os.path.join(output_dir, filename)
    pdf.output(pdf_path)
    print(f"Successfully created: {pdf_path}")

maternity_content = """
HEALTH INSURANCE POLICY - FAMILY FLOATER
Plan: Joyous Maternity Shield

1. MATERNITY BENEFIT
Maternity expenses are covered up to a maximum limit of Rs. 50,000 for normal delivery and Rs. 75,000 for C-section.
Waiting Period: A strict 24-month waiting period applies from the policy inception date for any maternity-related claims.

2. NEWBORN BABY COVER
The newborn baby is covered from day 1, subject to a sub-limit of Rs. 20,000 for any neonatal care or ICU charges.
Notice must be given within 7 days of birth to add the newborn to the policy.

3. PRE-AUTHORIZATION
All planned maternity admissions require pre-authorization at least 72 hours prior to admission. Failure to do so will result in a 20% co-payment penalty.

4. EXCLUSIONS
Stem cell harvesting, voluntary termination of pregnancy, and non-medical items (diapers, baby food) are strictly excluded.
"""

senior_content = """
HEALTH INSURANCE POLICY - SENIOR CITIZEN
Plan: Golden Years Care

1. PRE-EXISTING DISEASES (PED)
All pre-existing diseases declared at the time of policy purchase are covered after a 24-month waiting period. Any claim related to a PED within this period will be rejected.

2. MANDATORY CO-PAYMENT
A mandatory 20% co-payment applies to ALL claims because the insured is above 65 years of age.

3. ROOM RENT LIMIT
Room rent is capped at Rs. 3,000 per day. Proportionate deductions will apply to all other hospital charges (surgery, doctor visits, nursing) if a higher category room is chosen.

4. DAY CARE PROCEDURES
Cataract surgery is covered but strictly capped at Rs. 25,000 per eye, including lenses. 

5. CLAIM SUBMISSION
All post-hospitalization claims and original documents (Discharge Summary, Final Bill) must be submitted within 15 days of discharge.
"""

create_pdf("maternity_policy.pdf", maternity_content)
create_pdf("senior_citizen_policy.pdf", senior_content)
