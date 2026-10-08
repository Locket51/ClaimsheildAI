/**
 * ClaimShield AI — Isolated Mock Comparison Data
 * 
 * Clean, structured mock comparison payload designed for UI development.
 * Easily replaceable with a real API payload in the future.
 */

export const MOCK_COMPARISON_DATA = {
  policies: [
    {
      id: "policy_a",
      defaultName: "Policy A",
      provider: "Star Health Comprehensive",
      fileName: "Policy_A_StarHealth.pdf",
      fileSize: "2.4 MB"
    },
    {
      id: "policy_b",
      defaultName: "Policy B",
      provider: "Care Advantage Insurance",
      fileName: "Policy_B_CareAdvantage.pdf",
      fileSize: "3.1 MB"
    },
    {
      id: "policy_c",
      defaultName: "Policy C",
      provider: "HDFC ERGO Optima Secure",
      fileName: "Policy_C_HDFCErgo.pdf",
      fileSize: "1.8 MB"
    }
  ],

  priorities: [
    { id: "cost", label: "Lower out-of-pocket cost" },
    { id: "restrictions", label: "Fewer restrictions" },
    { id: "hospitalization", label: "Hospitalization coverage" },
    { id: "waiting", label: "Shorter waiting periods" },
    { id: "emergency", label: "Emergency flexibility" },
    { id: "sum_insured", label: "Higher coverage limits" }
  ],

  comparisonRows: [
    {
      id: "sum_insured",
      category: "Sum Insured",
      values: {
        policy_a: "₹10,000,000 (₹10L)",
        policy_b: "₹15,000,000 (₹15L)",
        policy_c: "₹12,000,000 (₹12L)"
      },
      indicators: {
        policy_a: { type: "neutral", label: "Base limit" },
        policy_b: { type: "favorable", label: "Higher limit" },
        policy_c: { type: "neutral", label: "Moderate limit" }
      },
      summary: "Policy B provides the highest base sum insured among the compared options.",
      evidence: {
        policy_a: { quote: "Sum Insured under Schedule II is fixed at ₹10,000,000 per policy year.", page: 3 },
        policy_b: { quote: "Annual aggregate Maximum Limit of Indemnity shall be ₹15,000,000.", page: 4 },
        policy_c: { quote: "Base Sum Insured is ₹12,000,000 per policy period.", page: 2 }
      }
    },
    {
      id: "room_rent",
      category: "Room Rent Limit",
      values: {
        policy_a: "₹5,000 / day",
        policy_b: "No stated limit",
        policy_c: "₹7,000 / day"
      },
      indicators: {
        policy_a: { type: "restrictive", label: "Restrictive limit" },
        policy_b: { type: "favorable", label: "No room cap" },
        policy_c: { type: "neutral", label: "Capped" }
      },
      summary: "Policy B provides greater stated room-rent flexibility with no capped room limits, avoiding proportionate deductions.",
      evidence: {
        policy_a: { quote: "The maximum eligible room rent and boarding expense is ₹5,000 per day for normal hospital rooms.", page: 7 },
        policy_b: { quote: "No room-rent limit identified in the provided policy wording for single private AC rooms.", page: 6 },
        policy_c: { quote: "Room rent expense is capped at ₹7,000 per day or 1% of Sum Insured.", page: 9 }
      }
    },
    {
      id: "co_pay",
      category: "Co-Payment Clause",
      values: {
        policy_a: "10% mandatory",
        policy_b: "0% (No co-pay)",
        policy_c: "5% co-pay"
      },
      indicators: {
        policy_a: { type: "restrictive", label: "10% co-pay" },
        policy_b: { type: "favorable", label: "0% co-pay" },
        policy_c: { type: "neutral", label: "5% co-pay" }
      },
      summary: "Policy B requires no co-payment out of pocket, whereas Policy A requires a 10% co-payment on all admissible claims.",
      evidence: {
        policy_a: { quote: "A co-payment of 10% shall apply to each and every claim filed under Section 4.1.", page: 12 },
        policy_b: { quote: "Co-payment requirement: NIL (0%) for treatment taken within network hospitals.", page: 8 },
        policy_c: { quote: "A 5% co-pay applies if the insured person is admitted to a non-network hospital.", page: 14 }
      }
    },
    {
      id: "emergency_notice",
      category: "Emergency Notice Window",
      values: {
        policy_a: "Within 24 hours",
        policy_b: "Within 48 hours",
        policy_c: "Within 24 hours"
      },
      indicators: {
        policy_a: { type: "restrictive", label: "Strict 24h" },
        policy_b: { type: "favorable", label: "Longer 48h window" },
        policy_c: { type: "restrictive", label: "Strict 24h" }
      },
      summary: "Policy B grants a 48-hour notification window post emergency admission, offering more flexibility during crises.",
      evidence: {
        policy_a: { quote: "In case of emergency hospitalization, notice of claim must be given within 24 hours of admission.", page: 15 },
        policy_b: { quote: "Notification of emergency hospitalization must be submitted within 48 hours of admission.", page: 11 },
        policy_c: { quote: "Intimation of emergency admission must reach the insurer within 24 hours.", page: 10 }
      }
    },
    {
      id: "ped_waiting",
      category: "PED Waiting Period",
      values: {
        policy_a: "36 months",
        policy_b: "24 months",
        policy_c: "24 months"
      },
      indicators: {
        policy_a: { type: "restrictive", label: "Longer (36m)" },
        policy_b: { type: "favorable", label: "Shorter (24m)" },
        policy_c: { type: "favorable", label: "Shorter (24m)" }
      },
      summary: "Policy B and Policy C both have a shorter 24-month pre-existing disease waiting period compared to Policy A (36 months).",
      evidence: {
        policy_a: { quote: "Pre-existing conditions (PED) are excluded for 36 continuous months of insurance coverage.", page: 18 },
        policy_b: { quote: "Waiting period for Pre-Existing Diseases declared at proposal: 24 months.", page: 13 },
        policy_c: { quote: "Cover for declared Pre-Existing Diseases commences after 24 continuous months.", page: 16 }
      }
    },
    {
      id: "claim_deadline",
      category: "Claim Submission Deadline",
      values: {
        policy_a: "30 days post-discharge",
        policy_b: "60 days post-discharge",
        policy_c: "45 days post-discharge"
      },
      indicators: {
        policy_a: { type: "restrictive", label: "Short (30 days)" },
        policy_b: { type: "favorable", label: "Flexible (60 days)" },
        policy_c: { type: "neutral", label: "45 days" }
      },
      summary: "Policy B allows up to 60 days post-discharge to submit complete claim documentation.",
      evidence: {
        policy_a: { quote: "All claim documents must be submitted within 30 days from date of discharge.", page: 22 },
        policy_b: { quote: "Document submission deadline is extended to 60 days post discharge date.", page: 19 },
        policy_c: { quote: "Completed claim forms must be received within 45 days after discharge.", page: 21 }
      }
    },
    {
      id: "icu_limit",
      category: "ICU Charge Limit",
      values: {
        policy_a: "₹10,000 / day",
        policy_b: "No stated limit",
        policy_c: "₹12,000 / day"
      },
      indicators: {
        policy_a: { type: "restrictive", label: "Capped ₹10k" },
        policy_b: { type: "favorable", label: "No ICU cap" },
        policy_c: { type: "neutral", label: "Capped ₹12k" }
      },
      summary: "Policy B places no daily room/ICU cap, protecting against ICU billing surcharges.",
      evidence: {
        policy_a: { quote: "Intensive Care Unit (ICU) charges are capped at ₹10,000 per day.", page: 8 },
        policy_b: { quote: "Actual ICU and CCU expenses covered up to Sum Insured limit.", page: 7 },
        policy_c: { quote: "ICU charges eligible up to maximum ₹12,000 per day.", page: 9 }
      }
    },
    {
      id: "ambulance",
      category: "Ambulance Coverage",
      values: {
        policy_a: "₹3,000 / hospitalization",
        policy_b: "₹5,000 / hospitalization",
        policy_c: "₹5,000 / hospitalization"
      },
      indicators: {
        policy_a: { type: "restrictive", label: "Lower cap" },
        policy_b: { type: "favorable", label: "Higher cap" },
        policy_c: { type: "favorable", label: "Higher cap" }
      },
      summary: "Policy B and Policy C offer ₹5,000 ambulance reimbursement per hospitalization event.",
      evidence: {
        policy_a: { quote: "Road ambulance charges covered up to ₹3,000 per admission.", page: 14 },
        policy_b: { quote: "Emergency road ambulance expenses covered up to ₹5,000 per event.", page: 12 },
        policy_c: { quote: "Ambulance benefit limit set at ₹5,000 per hospitalization.", page: 11 }
      }
    }
  ],

  priorityInsights: {
    cost: {
      title: "Based on your priority: Lower out-of-pocket cost",
      favorablePolicyId: "policy_b",
      favorableName: "Policy B",
      reasons: [
        "0% stated co-payment (vs 10% on Policy A)",
        "No stated room-rent cap (prevents proportionate deductions across hospital bills)",
        "Higher ambulance reimbursement limit (₹5,000 vs ₹3,000)"
      ],
      warnings: [
        "Policy A: 10% co-pay & ₹5,000/day room rent cap may trigger significant out-of-pocket costs"
      ]
    },
    restrictions: {
      title: "Based on your priority: Fewer restrictions",
      favorablePolicyId: "policy_b",
      favorableName: "Policy B",
      reasons: [
        "No room-rent or ICU daily caps",
        "Extended 48-hour emergency notification deadline",
        "Extended 60-day claim submission window post-discharge"
      ],
      warnings: [
        "Policy A & C impose strict 24-hour emergency intimation requirement"
      ]
    },
    hospitalization: {
      title: "Based on your priority: Hospitalization coverage",
      favorablePolicyId: "policy_b",
      favorableName: "Policy B",
      reasons: [
        "Higher total sum insured limit (₹15L)",
        "Full coverage for ICU charges up to Sum Insured",
        "Enhanced ambulance coverage"
      ],
      warnings: [
        "Policy A caps ICU charges at ₹10,000/day"
      ]
    },
    waiting: {
      title: "Based on your priority: Shorter waiting periods",
      favorablePolicyId: "policy_b",
      favorableName: "Policy B & Policy C",
      reasons: [
        "24-month pre-existing disease (PED) waiting period",
        "12 months shorter than Policy A's 36-month requirement"
      ],
      warnings: [
        "Policy A requires 36 continuous months before PED coverage begins"
      ]
    },
    emergency: {
      title: "Based on your priority: Emergency flexibility",
      favorablePolicyId: "policy_b",
      favorableName: "Policy B",
      reasons: [
        "48-hour emergency admission intimation window",
        "60 days to collect and submit post-discharge claim documents"
      ],
      warnings: [
        "Policy A & C require intimation strictly within 24 hours of emergency admission"
      ]
    },
    sum_insured: {
      title: "Based on your priority: Higher coverage limits",
      favorablePolicyId: "policy_b",
      favorableName: "Policy B",
      reasons: [
        "₹15,000,000 (₹15L) annual aggregate limit",
        "No capping on single room or ICU daily rates"
      ],
      warnings: [
        "Policy A provides ₹10L and Policy C provides ₹12L sum insured"
      ]
    }
  }
};
