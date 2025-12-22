export type Service = {
  id: string;
  slug: string;
  title: string;
  aiTitle: string;
  category: "Offensive Security" | "Defensive Operations" | "Governance & Compliance" | "Incident & Investigation" | "Infrastructure & Cloud";
  shortDescription: string;
  aiPositioning: string;
  problem: string;
  approach: string;
  bullets: string[];
  deliverables: string[];
  process: string[];
  relatedServices: string[];
  icon?: string;
};

export const services: Service[] = [
  // Offensive Security
  {
    id: "penetration-testing",
    slug: "penetration-testing",
    title: "Penetration Testing",
    aiTitle: "AI-Assisted Penetration Testing",
    category: "Offensive Security",
    shortDescription: "Expert-led vulnerability exploitation with AI-assisted discovery and expert verification.",
    aiPositioning: "AI accelerates vulnerability discovery and attack path mapping. Expert penetration testers validate findings and ensure real-world exploitability.",
    problem: "Organizations need to know what attackers can actually achieve, not just what vulnerabilities exist.",
    approach: "Combine AI-assisted reconnaissance and attack surface analysis with expert penetration testing and social engineering validation.",
    bullets: [
      "AI-assisted vulnerability discovery and prioritization",
      "Expert-led exploitation and attack path validation",
      "Real-world risk assessment and remediation guidance",
    ],
    deliverables: [
      "Detailed penetration test report",
      "Exploitability assessment and risk scoring",
      "Remediation roadmap with priority order",
      "Remediation validation support",
    ],
    process: ["Discover", "Analyze", "Exploit", "Validate", "Report"],
    relatedServices: ["vulnerability-assessment", "red-teaming", "web-application-testing"],
  },
  {
    id: "vulnerability-assessment",
    slug: "vulnerability-assessment",
    title: "Vulnerability Assessment",
    aiTitle: "AI-Prioritized Vulnerability Assessment",
    category: "Offensive Security",
    shortDescription: "Non-exploit discovery with AI-powered prioritization of actual business risk.",
    aiPositioning: "AI identifies and scores vulnerabilities using exploitability context and business impact. Expert review ensures remediation guidance is practical.",
    problem: "Vulnerability scanners generate noise. Teams get overwhelmed by finding counts without clear prioritization.",
    approach: "Use AI to discover, score, and prioritize vulnerabilities by real exploit likelihood and business impact. Combine with expert validation for remediation guidance.",
    bullets: [
      "AI-assisted noise reduction and signal enhancement",
      "Exploitability-aware risk prioritization",
      "Business-context remediation planning",
    ],
    deliverables: [
      "Vulnerability inventory with risk scores",
      "Attack surface analysis by impact",
      "Remediation roadmap with effort estimates",
      "Evidence summaries for compliance",
    ],
    process: ["Discover", "Analyze", "Prioritize", "Validate", "Report"],
    relatedServices: ["penetration-testing", "red-teaming", "server-credentialed-check"],
  },
  {
    id: "red-teaming",
    slug: "red-teaming",
    title: "Red Teaming",
    aiTitle: "AI-Enhanced Adversary Simulation",
    category: "Offensive Security",
    shortDescription: "Multi-phase adversary simulation to validate detection and response capabilities.",
    aiPositioning: "AI models realistic attacker behavior and assists with attack path generation. Expert red teamers conduct hands-on simulation and assess organizational response.",
    problem: "Controls look good in theory but fail when tested by realistic attackers.",
    approach: "Combine AI-assisted attack scenario planning with hands-on red team exercises to validate detection, investigation, and response capabilities.",
    bullets: [
      "AI-modeled attack scenarios and path generation",
      "Expert red team hands-on simulation",
      "Detection and response gap identification",
    ],
    deliverables: [
      "Attack scenario report with execution timeline",
      "Detection and response observations",
      "Control gap analysis",
      "Incident response improvement roadmap",
    ],
    process: ["Plan", "Simulate", "Detect", "Respond", "Report"],
    relatedServices: ["penetration-testing", "compromise-assessment", "security-operations-center"],
  },
  {
    id: "source-code-review",
    slug: "source-code-review",
    title: "Source Code Review",
    aiTitle: "AI-Assisted Application Security Review",
    category: "Offensive Security",
    shortDescription: "AI-accelerated code analysis combined with expert architectural and logic review.",
    aiPositioning: "AI identifies common patterns, dependency risks, and potential flaws at scale. Expert developers review logic, access controls, and security architecture.",
    problem: "Security code review is slow and expensive. Developers need feedback before they ship.",
    approach: "Combine AI-powered static analysis and dependency review with expert manual code review for architectural and logic validation.",
    bullets: [
      "AI-assisted common weakness detection",
      "Expert architectural security review",
      "Access control and business logic validation",
    ],
    deliverables: [
      "Code review findings report",
      "Risk-prioritized security issues",
      "Fix examples and remediation guidance",
      "Training recommendations",
    ],
    process: ["Scan", "Analyze", "Review", "Validate", "Report"],
    relatedServices: ["web-application-testing", "mobile-application-testing", "discovery"],
  },
  {
    id: "web-application-testing",
    slug: "web-application-testing",
    title: "Web Application Testing",
    aiTitle: "AI-Guided Web Security Testing",
    category: "Offensive Security",
    shortDescription: "Deep testing for web applications, APIs, and business logic with AI-assisted vulnerability discovery.",
    aiPositioning: "AI explores attack surfaces, generates test cases, and identifies patterns. Expert testers validate complex logic flaws and business logic bypasses.",
    problem: "Web applications and APIs present large attack surfaces. Manual testing alone is slow and incomplete.",
    approach: "Combine AI-assisted reconnaissance and fuzzing with expert testing of authentication, access control, and business logic.",
    bullets: [
      "AI-assisted attack surface enumeration",
      "Expert testing of access controls and logic",
      "API security assessment with threat modeling",
    ],
    deliverables: [
      "Web application test report",
      "Vulnerability assessment with CVSS scoring",
      "Business logic risk analysis",
      "Remediation and secure coding guidance",
    ],
    process: ["Discover", "Map", "Test", "Validate", "Report"],
    relatedServices: ["penetration-testing", "source-code-review", "mobile-application-testing"],
  },
  {
    id: "mobile-application-testing",
    slug: "mobile-application-testing",
    title: "Mobile Application Testing",
    aiTitle: "AI-Powered Mobile Security Testing",
    category: "Offensive Security",
    shortDescription: "Android and iOS application security assessment with AI-assisted binary and API analysis.",
    aiPositioning: "AI reverse engineers binaries, detects obfuscation patterns, and identifies protocol weaknesses. Expert testers assess app logic, storage, and network security.",
    problem: "Mobile apps handle sensitive data and authentication but are often underevaluated compared to web applications.",
    approach: "Combine AI-assisted binary analysis and API fuzzing with expert testing of data storage, transport, and authentication mechanisms.",
    bullets: [
      "AI-assisted binary reverse engineering",
      "Storage and transport security assessment",
      "API and authentication testing",
    ],
    deliverables: [
      "Mobile app security test report",
      "Vulnerability findings with impact assessment",
      "Secure coding and secure API guidance",
      "Remediation roadmap",
    ],
    process: ["Analyze", "Test", "Assess", "Validate", "Report"],
    relatedServices: ["web-application-testing", "source-code-review", "external-infrastructure-testing"],
  },
  {
    id: "external-infrastructure-testing",
    slug: "external-infrastructure-testing",
    title: "External Infrastructure Testing",
    aiTitle: "AI-Powered External Attack Surface Assessment",
    category: "Offensive Security",
    shortDescription: "Internet-facing exposure assessment using AI reconnaissance and expert exploitation.",
    aiPositioning: "AI maps public assets, enumerates services, and generates attack paths. Expert testers validate actual exploitability and business impact.",
    problem: "Organizations don't always know what is exposed to the internet or what attackers can reach.",
    approach: "Combine AI-powered external reconnaissance and service enumeration with expert exploitation testing and business impact assessment.",
    bullets: [
      "AI-powered external asset discovery",
      "Service enumeration and vulnerability assessment",
      "Exploitation testing with business risk analysis",
    ],
    deliverables: [
      "External asset inventory",
      "Exposure assessment report",
      "Exploitation findings with risk scoring",
      "Remediation recommendations",
    ],
    process: ["Discover", "Enumerate", "Test", "Assess", "Report"],
    relatedServices: ["penetration-testing", "internal-infrastructure-testing", "vulnerability-assessment"],
  },
  {
    id: "internal-infrastructure-testing",
    slug: "internal-infrastructure-testing",
    title: "Internal Infrastructure Testing",
    aiTitle: "AI-Assisted Internal Network Security Testing",
    category: "Offensive Security",
    shortDescription: "Internal network assessment with AI-assisted lateral movement and privilege escalation path mapping.",
    aiPositioning: "AI maps trust relationships and attack paths. Expert testers validate lateral movement and privilege escalation feasibility.",
    problem: "Internal networks often contain trust relationships that enable rapid attacker lateral movement and privilege escalation.",
    approach: "Combine AI-assisted network mapping and trust analysis with expert testing of lateral movement and privilege escalation paths.",
    bullets: [
      "AI-powered network reconnaissance and trust mapping",
      "Lateral movement and privilege escalation testing",
      "Configuration and patch-level risk assessment",
    ],
    deliverables: [
      "Network assessment report",
      "Trust relationship and attack path analysis",
      "Privilege escalation findings",
      "Remediation and hardening guidance",
    ],
    process: ["Discover", "Map", "Test", "Validate", "Report"],
    relatedServices: ["external-infrastructure-testing", "server-credentialed-check", "penetration-testing"],
  },
  {
    id: "server-credentialed-check",
    slug: "server-credentialed-check",
    title: "Server Credentialed Check",
    aiTitle: "AI-Powered Host Security Assessment",
    category: "Offensive Security",
    shortDescription: "Authenticated server and endpoint assessment with AI-driven configuration and patch analysis.",
    aiPositioning: "AI analyzes configurations, patch status, and baseline deviations. Expert review identifies business-context risks and remediation priorities.",
    problem: "Unpatched servers and weak configurations are common attack vectors but hard to prioritize across large environments.",
    approach: "Combine AI-powered configuration scanning and patch analysis with expert assessment of business-critical systems and remediation feasibility.",
    bullets: [
      "AI-assisted configuration analysis",
      "Patch level and compliance assessment",
      "Risk prioritization by business impact",
    ],
    deliverables: [
      "Server assessment report",
      "Configuration findings with remediation guidance",
      "Patch and baseline recommendations",
      "Compliance alignment evidence",
    ],
    process: ["Scan", "Analyze", "Assess", "Prioritize", "Report"],
    relatedServices: ["vulnerability-assessment", "internal-infrastructure-testing", "email-security"],
  },

  // Defensive Operations
  {
    id: "security-operations-center",
    slug: "security-operations-center",
    title: "Security Operations Center (SOC)",
    aiTitle: "AI-Enhanced Security Operations Center",
    category: "Defensive Operations",
    shortDescription: "Managed 24/7 monitoring and response using AI-assisted threat triage and investigation.",
    aiPositioning: "AI ingests and correlates security signals, performs triage, and generates investigation summaries. Expert analysts confirm findings and lead response.",
    problem: "Monitoring false positives drown analysts. SOCs need AI triage to focus on real threats.",
    approach: "Deploy AI-assisted signal processing, anomaly detection, and triage to reduce alert noise. Expert analysts investigate and respond to validated threats.",
    bullets: [
      "AI-assisted alert triage and noise reduction",
      "Real-time threat correlation and investigation",
      "Expert-led incident response and containment",
    ],
    deliverables: [
      "24/7 monitoring and response SLA",
      "Alert handling and escalation procedures",
      "Weekly threat summary reports",
      "Incident response documentation",
    ],
    process: ["Monitor", "Triage", "Investigate", "Respond", "Report"],
    relatedServices: ["managed-security-services", "compromise-assessment", "data-breach-response"],
  },
  {
    id: "managed-security-services",
    slug: "managed-security-services",
    title: "Managed Security Services",
    aiTitle: "AI-Integrated Managed Security Services",
    category: "Defensive Operations",
    shortDescription: "Continuous security operations with AI-powered monitoring and expert analyst response.",
    aiPositioning: "AI monitors endpoints, network, cloud, and identity. Expert analysts verify and respond to threats with human judgment and domain expertise.",
    problem: "Most organizations lack 24/7 security expertise. AI alone misses context; human analysts alone are too expensive to scale.",
    approach: "Combine AI-driven monitoring across all security layers with expert analyst triage and response, optimized for cost and coverage.",
    bullets: [
      "AI-powered threat monitoring across layers",
      "Expert analyst triage and response",
      "Continuous threat hunting and intelligence",
    ],
    deliverables: [
      "Managed service SLA and coverage",
      "Monthly security posture reports",
      "Incident reports and trend analysis",
      "Threat intelligence summaries",
    ],
    process: ["Monitor", "Correlate", "Triage", "Respond", "Report"],
    relatedServices: ["security-operations-center", "compromise-assessment", "threat-hunting"],
  },

  // Governance & Compliance
  {
    id: "virtual-ciso",
    slug: "virtual-ciso",
    title: "Virtual CISO",
    aiTitle: "AI-Assisted Virtual CISO Advisory",
    category: "Governance & Compliance",
    shortDescription: "Fractional security leadership with AI-powered risk modeling and compliance automation.",
    aiPositioning: "AI maps risk landscape, models compliance status, and generates recommendations. Expert CISO provides strategic guidance and board-ready communication.",
    problem: "Organizations need security leadership but can't afford a full-time CISO. Executives need clear risk communication.",
    approach: "Combine AI-driven risk and compliance analysis with expert CISO strategic guidance, roadmap planning, and board communication.",
    bullets: [
      "AI-powered risk and compliance modeling",
      "Expert security roadmap development",
      "Board-ready risk communication",
    ],
    deliverables: [
      "Security strategy and roadmap",
      "Risk assessment and executive summary",
      "Quarterly board-ready reports",
      "Policy and governance recommendations",
    ],
    process: ["Assess", "Model", "Plan", "Guide", "Report"],
    relatedServices: ["discovery", "compliance-automation", "security-governance"],
  },
  {
    id: "discovery",
    slug: "discovery",
    title: "Discovery & Assessment",
    aiTitle: "AI-Powered Security Posture Discovery",
    category: "Governance & Compliance",
    shortDescription: "Asset, exposure, and operating context discovery before deeper security review.",
    aiPositioning: "AI catalogs assets, exposure, and operating context across infrastructure, cloud, and endpoints. Expert review prioritizes assessment scope.",
    problem: "Organizations often don't know what they have or what is exposed before security assessments begin.",
    approach: "Combine AI-powered asset discovery and exposure mapping with expert scoping and assessment planning.",
    bullets: [
      "AI-powered asset discovery and inventory",
      "Exposure mapping across infrastructure",
      "Operating context and risk baseline",
    ],
    deliverables: [
      "Asset inventory and exposure report",
      "Security assessment scope and roadmap",
      "Risk baseline and maturity assessment",
      "Prioritized next steps",
    ],
    process: ["Discover", "Map", "Assess", "Scope", "Plan"],
    relatedServices: ["virtual-ciso", "email-security", "server-credentialed-check"],
  },
  {
    id: "email-security",
    slug: "email-security",
    title: "Email Security",
    aiTitle: "AI-Powered Email Security Assessment",
    category: "Governance & Compliance",
    shortDescription: "Email infrastructure and phishing exposure assessment with AI-powered simulation.",
    aiPositioning: "AI simulates phishing attacks and maps mail infrastructure risks. Expert testers validate detection evasion and social engineering effectiveness.",
    problem: "Email remains the primary attack vector but security is often poorly evaluated.",
    approach: "Combine AI-powered phishing simulation and infrastructure assessment with expert testing of email security controls and user awareness.",
    bullets: [
      "AI-powered phishing simulation and metrics",
      "Email infrastructure risk assessment",
      "User awareness and detection testing",
    ],
    deliverables: [
      "Email security assessment report",
      "Phishing simulation results and trends",
      "Control recommendations and roadmap",
      "Security awareness training guidance",
    ],
    process: ["Discover", "Assess", "Simulate", "Validate", "Report"],
    relatedServices: ["discovery", "data-leakage-prevention", "security-awareness"],
  },

  // Incident & Investigation
  {
    id: "compromise-assessment",
    slug: "compromise-assessment",
    title: "Compromise Assessment",
    aiTitle: "AI-Assisted Compromise Investigation",
    category: "Incident & Investigation",
    shortDescription: "Evidence-led investigation to uncover active or historic intrusion using AI-powered analysis.",
    aiPositioning: "AI analyzes logs, forensics, and threat intelligence for intrusion indicators. Expert investigators validate findings and scope impact.",
    problem: "Breach investigation is slow and expensive. Organizations need quick answers on what happened and what is still active.",
    approach: "Combine AI-powered log and forensics analysis with expert investigator judgment to uncover intrusion scope and remediation requirements.",
    bullets: [
      "AI-powered intrusion indicator detection",
      "Timeline and impact analysis",
      "Expert remediation roadmap",
    ],
    deliverables: [
      "Investigation findings and timeline",
      "Compromise scope and impact assessment",
      "Remediation and hardening recommendations",
      "Evidence documentation for legal/compliance",
    ],
    process: ["Collect", "Analyze", "Identify", "Investigate", "Report"],
    relatedServices: ["data-breach-response", "digital-investigations", "security-operations-center"],
  },
  {
    id: "data-breach-response",
    slug: "data-breach-response",
    title: "Data Breach Response",
    aiTitle: "AI-Assisted Breach Response & Containment",
    category: "Incident & Investigation",
    shortDescription: "Rapid containment, investigation, and communication support after security incidents.",
    aiPositioning: "AI accelerates breach triage, impact analysis, and communication timeline. Expert responders lead containment, investigation, and stakeholder communication.",
    problem: "Breaches require immediate response. Organizations need expert guidance on investigation, containment, and communication.",
    approach: "Deploy expert incident response team with AI-assisted analysis to rapidly contain, investigate, and communicate breach details.",
    bullets: [
      "Rapid incident containment and isolation",
      "AI-assisted breach scope analysis",
      "Expert guidance on notification and communication",
    ],
    deliverables: [
      "Incident response action plan",
      "Breach scope and impact assessment",
      "Timeline and evidence documentation",
      "Communication templates and strategy",
    ],
    process: ["Assess", "Contain", "Investigate", "Communicate", "Close"],
    relatedServices: ["compromise-assessment", "digital-investigations", "expert-witness-litigation"],
  },
  {
    id: "digital-investigations",
    slug: "digital-investigations",
    title: "Digital Investigations",
    aiTitle: "AI-Assisted Forensic Investigation",
    category: "Incident & Investigation",
    shortDescription: "Forensic analysis for incidents, disputes, and suspicious activity with AI acceleration.",
    aiPositioning: "AI processes large forensic datasets, identifies patterns, and flags anomalies. Expert forensic investigators validate findings and produce evidence.",
    problem: "Forensic investigations are time-consuming and expensive. Timeline and causality are hard to establish from raw data.",
    approach: "Combine AI-powered forensic data processing and pattern detection with expert investigator analysis for litigation and incident response.",
    bullets: [
      "AI-assisted forensic data processing",
      "Timeline and causality analysis",
      "Evidence-quality findings and documentation",
    ],
    deliverables: [
      "Forensic investigation report",
      "Timeline and event reconstruction",
      "Evidence documentation and chain of custody",
      "Expert witness support available",
    ],
    process: ["Acquire", "Process", "Analyze", "Validate", "Report"],
    relatedServices: ["compromise-assessment", "expert-witness-litigation", "data-breach-response"],
  },
  {
    id: "expert-witness-litigation",
    slug: "expert-witness-litigation",
    title: "Expert Witness & Litigation",
    aiTitle: "Expert Technical Evidence Support",
    category: "Incident & Investigation",
    shortDescription: "Technical evidence review and expert support for cyber-related litigation.",
    aiPositioning: "Expert witnesses provide technical testimony and evidence analysis. AI accelerates document review and trend analysis for large datasets.",
    problem: "Cyber incidents often result in litigation. Organizations need credible expert testimony on technical facts.",
    approach: "Provide experienced expert witnesses with litigation support and AI-assisted evidence review.",
    bullets: [
      "Expert witness testimony and reports",
      "Technical evidence analysis",
      "Litigation support and discovery",
    ],
    deliverables: [
      "Expert witness report",
      "Testimony and deposition support",
      "Evidence analysis and summaries",
      "Timeline and causality documentation",
    ],
    process: ["Review", "Analyze", "Document", "Testify", "Support"],
    relatedServices: ["digital-investigations", "compromise-assessment", "data-breach-response"],
  },

  // Infrastructure & Cloud
  {
    id: "data-leakage-prevention",
    slug: "data-leakage-prevention",
    title: "Data Leakage Prevention",
    aiTitle: "AI-Powered Data Leakage Assessment & Prevention",
    category: "Infrastructure & Cloud",
    shortDescription: "Reduce sensitive data exposure across endpoints, cloud, and workflows with AI detection.",
    aiPositioning: "AI identifies sensitive data in motion and at rest, maps exposure paths, and validates controls. Expert assessment prioritizes remediation.",
    problem: "Sensitive data is everywhere—endpoints, cloud, emails, logs. Organizations need visibility into where it is and how it moves.",
    approach: "Combine AI-powered data discovery and exposure mapping with expert assessment of controls and remediation prioritization.",
    bullets: [
      "AI-powered sensitive data discovery",
      "Exposure mapping across systems",
      "Control validation and improvement roadmap",
    ],
    deliverables: [
      "Data exposure assessment report",
      "Sensitive data inventory and risk scoring",
      "Control recommendations and implementation guidance",
      "Policy and training recommendations",
    ],
    process: ["Discover", "Map", "Assess", "Validate", "Report"],
    relatedServices: ["email-security", "secure-cloud-hosting", "compliance-automation"],
  },
  {
    id: "secure-cloud-hosting",
    slug: "secure-cloud-hosting",
    title: "Secure Cloud Hosting",
    aiTitle: "Hardened Secure Cloud Infrastructure",
    category: "Infrastructure & Cloud",
    shortDescription: "Hardened hosting patterns for sensitive systems and regulated workloads.",
    aiPositioning: "Expert architects design secure cloud infrastructure with AI-powered compliance verification. Continuous monitoring ensures controls remain effective.",
    problem: "Organizations need to host sensitive data in the cloud but struggle with architecture, configuration, and compliance.",
    approach: "Deploy expert-designed secure cloud infrastructure with AI-powered compliance monitoring and expert management.",
    bullets: [
      "Expert-designed secure cloud architecture",
      "Compliance-aligned configuration and controls",
      "Continuous AI-powered monitoring and maintenance",
    ],
    deliverables: [
      "Secure cloud infrastructure deployment",
      "Compliance alignment and documentation",
      "Ongoing monitoring and maintenance SLA",
      "Incident response and escalation procedures",
    ],
    process: ["Design", "Deploy", "Monitor", "Maintain", "Report"],
    relatedServices: ["discovery", "data-leakage-prevention", "compliance-automation"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: Service["category"]): Service[] {
  return services.filter((s) => s.category === category);
}

export function getRelatedServices(slug: string): Service[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return service.relatedServices
    .map((relSlug) => getServiceBySlug(relSlug))
    .filter((s): s is Service => s !== undefined);
}
