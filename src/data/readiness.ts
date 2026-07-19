// Compliance Readiness Scorecard — self-assessment model.
//
// Fully client-side: no backend call, no PII leaves the browser. Each domain
// carries a set of maturity questions answered on a shared 0–3 scale. The
// scorecard derives per-domain and overall readiness (normalised 0–100) plus
// a maturity tier, and surfaces targeted recommendations for weak domains.

export type MaturityLevel = 0 | 1 | 2 | 3;

export interface ReadinessOption {
  value: MaturityLevel;
  label: string;
}

export interface ReadinessQuestion {
  id: string;
  prompt: string;
}

export interface ReadinessDomain {
  id: string;
  title: string;
  /** short axis label for the radar chart */
  axis: string;
  blurb: string;
  questions: ReadinessQuestion[];
  /** shown when this domain scores below the attention threshold */
  recommendation: string;
}

// A single maturity scale reused across every question keeps the UX legible
// and the scoring comparable across domains.
export const MATURITY_OPTIONS: ReadinessOption[] = [
  { value: 0, label: "Not in place" },
  { value: 1, label: "Ad-hoc / informal" },
  { value: 2, label: "Defined & documented" },
  { value: 3, label: "Measured & optimised" },
];

export const READINESS_DOMAINS: ReadinessDomain[] = [
  {
    id: "governance",
    title: "Governance & Policy",
    axis: "Governance",
    blurb: "Ownership, written policy, and board-level accountability for security.",
    questions: [
      { id: "gov-1", prompt: "A named owner (CISO / security lead) is accountable for security." },
      { id: "gov-2", prompt: "Information-security policies are documented and reviewed annually." },
      { id: "gov-3", prompt: "Security risk is reported to leadership on a regular cadence." },
    ],
    recommendation:
      "Assign a clear security owner and formalise your core policies. A lightweight Virtual CISO engagement can stand this up in weeks, not quarters.",
  },
  {
    id: "data-protection",
    title: "Data Protection & Privacy",
    axis: "Data Protection",
    blurb: "How sensitive data is classified, encrypted, and handled for GCC privacy law.",
    questions: [
      { id: "data-1", prompt: "Sensitive data is inventoried and classified by sensitivity." },
      { id: "data-2", prompt: "Data is encrypted at rest and in transit across systems." },
      { id: "data-3", prompt: "Data handling maps to regional privacy law (e.g. PDPL / GDPR)." },
    ],
    recommendation:
      "Start with a data inventory and encryption baseline, then map flows to your jurisdiction's privacy law. Our compliance review flags gaps against PDPL and GDPR directly.",
  },
  {
    id: "access-control",
    title: "Access Control & Identity",
    axis: "Access & Identity",
    blurb: "MFA, least-privilege, and lifecycle management for accounts.",
    questions: [
      { id: "acc-1", prompt: "Multi-factor authentication is enforced on all critical systems." },
      { id: "acc-2", prompt: "Access follows least-privilege and is reviewed periodically." },
      { id: "acc-3", prompt: "Joiner / mover / leaver access changes happen promptly." },
    ],
    recommendation:
      "Enforce MFA everywhere and schedule quarterly access reviews. These two controls remove the majority of identity-driven breach paths.",
  },
  {
    id: "incident-response",
    title: "Incident Response",
    axis: "Incident Response",
    blurb: "Your ability to detect, contain, and recover from an incident.",
    questions: [
      { id: "ir-1", prompt: "A written incident-response plan exists with defined roles." },
      { id: "ir-2", prompt: "The response plan has been tested in the last 12 months." },
      { id: "ir-3", prompt: "Detection and alerting cover critical assets 24/7." },
    ],
    recommendation:
      "Document and tabletop-test your response plan before you need it. PointBlank's incident-response retainer gives you a rehearsed team on call.",
  },
  {
    id: "network-security",
    title: "Network & Endpoint Security",
    axis: "Network & Endpoint",
    blurb: "Segmentation, patching discipline, and endpoint protection.",
    questions: [
      { id: "net-1", prompt: "Networks are segmented to limit lateral movement." },
      { id: "net-2", prompt: "Critical patches are applied within a defined SLA." },
      { id: "net-3", prompt: "Endpoints run managed EDR / anti-malware protection." },
    ],
    recommendation:
      "Tighten patch SLAs and segment flat networks. A penetration test will show exactly which paths an attacker would take today.",
  },
  {
    id: "vendor-risk",
    title: "Vendor & Third-Party Risk",
    axis: "Vendor Risk",
    blurb: "How you assess and monitor the security of suppliers and SaaS.",
    questions: [
      { id: "ven-1", prompt: "Vendors are security-assessed before onboarding." },
      { id: "ven-2", prompt: "Contracts include security and breach-notification clauses." },
      { id: "ven-3", prompt: "Critical vendors are re-reviewed on a recurring basis." },
    ],
    recommendation:
      "Add a security questionnaire to procurement and re-review critical suppliers yearly. Third-party risk is now a leading cause of reportable breaches.",
  },
];

export const MAX_PER_QUESTION = 3;

export interface DomainScore {
  domain: ReadinessDomain;
  /** 0–100 */
  percent: number;
  answered: number;
  total: number;
}

export interface ReadinessTier {
  label: string;
  range: [number, number];
  accent: string; // tailwind text color class
  description: string;
}

export const READINESS_TIERS: ReadinessTier[] = [
  { label: "At Risk", range: [0, 39], accent: "text-red-400", description: "Foundational controls are missing. Prioritise governance, MFA, and a response plan." },
  { label: "Developing", range: [40, 64], accent: "text-amber-400", description: "Key controls exist but coverage is uneven. Close the weakest domains first." },
  { label: "Managed", range: [65, 84], accent: "text-sky-400", description: "A solid program is in place. Focus on testing, measurement, and consistency." },
  { label: "Resilient", range: [85, 100], accent: "text-emerald-400", description: "Mature, measured controls across the board. Sustain with continuous validation." },
];

/** Domains scoring at or below this percent get a highlighted recommendation. */
export const ATTENTION_THRESHOLD = 60;

export function tierForScore(percent: number): ReadinessTier {
  return (
    READINESS_TIERS.find((t) => percent >= t.range[0] && percent <= t.range[1]) ??
    READINESS_TIERS[0]
  );
}

export const TOTAL_QUESTIONS = READINESS_DOMAINS.reduce(
  (sum, d) => sum + d.questions.length,
  0
);
