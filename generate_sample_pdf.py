from fpdf import FPDF
import os

pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=12)

content = """
HEALTH INSURANCE POLICY - TERMS AND CONDITIONS
Policyholder: John Doe
Policy Number: HLT-2024-998822
Plan: Comprehensive Health Shield

1. IN-PATIENT HOSPITALIZATION
We cover expenses for hospitalization for a minimum period of 24 consecutive hours.
Room Rent Limit: Room rent is capped at 1% of the Sum Insured per day. If a room with higher rent is chosen, proportionate deductions will apply to all associated medical expenses.

2. CLAIM NOTIFICATION DEADLINE
CRITICAL DEADLINE: In case of planned hospitalization, notice must be given 48 hours prior to admission. In case of emergency hospitalization, notice must be given to the TPA within 24 hours of admission. Failure to notify within 24 hours will result in claim rejection.

3. CO-PAYMENT
A mandatory co-payment of 10% applies to all claims. If treatment is taken at a Non-Network hospital, an additional 15% co-payment will be applied (Total 25%).

4. WAITING PERIODS
Specific illnesses such as Cataract, Hernia, and Joint Replacements have a waiting period of 24 months from the policy inception date.
Pre-existing diseases are covered only after 36 months of continuous coverage.

5. SUB-LIMITS
Cataract surgery is capped at Rs. 40,000 per eye.
Modern treatments (e.g., Robotic surgery) are capped at 50% of the Sum Insured or Rs. 1,00,000, whichever is lower.

6. EXCLUSIONS
Expenses related to dietary supplements, vitamins, and non-medical items (e.g., registration charges, admission kits) are not covered and will be entirely deducted from the claim amount.
"""

for line in content.split('\n'):
    pdf.cell(200, 8, txt=line, ln=True, align='L')

output_dir = r"c:\Users\TRIDIB BISWAS\Desktop\Hacktober2\ClaimsheildAI\sample-data"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

pdf_path = os.path.join(output_dir, "sample_policy.pdf")
pdf.output(pdf_path)
print(f"Successfully created: {pdf_path}")
