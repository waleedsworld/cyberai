export type MegaNavItem = {
  title: string;
  description: string;
  href: string;
  featured?: boolean;
};

export type MegaNavColumn = {
  title: string;
  items: MegaNavItem[];
};

export type MegaNavSection = {
  label: string;
  href?: string;
  columns?: MegaNavColumn[];
};

export const megaNavSections: MegaNavSection[] = [
  {
    label: "Platform",
    columns: [
      {
        title: "PointBlank Platform",
        items: [
          {
            title: "PointBlank",
            description: "Enterprise AI security advisory, automation, and compliance workflows.",
            href: "/",
            featured: true,
          },
          {
            title: "AI Threat Detection",
            description: "Model-assisted detection playbooks for SOC and security operations teams.",
            href: "#features",
          },
          {
            title: "Compliance Automation",
            description: "Website, data, and operating-model checks mapped to audit readiness.",
            href: "/compliance-check",
          },
          {
            title: "Security Data Pipelines",
            description: "Prepare security telemetry for SIEM, AI review, and executive reporting.",
            href: "#case-studies",
          },
        ],
      },
      {
        title: "PointBlank Core",
        items: [
          {
            title: "Penetration Testing",
            description: "Application and infrastructure testing for exploitable security defects.",
            href: "/services/penetration-testing",
          },
          {
            title: "Vulnerability Assessment",
            description: "Non-exploit discovery of network, application, and infrastructure risks.",
            href: "/services/vulnerability-assessment",
          },
          {
            title: "Red Teaming",
            description: "Adversary simulation to validate controls, detection, and response.",
            href: "/services/red-teaming",
          },
          {
            title: "Source Code Review",
            description: "Manual and assisted review for logic, access, and implementation flaws.",
            href: "/services/source-code-review",
          },
        ],
      },
      {
        title: "Detection & Response",
        items: [
          {
            title: "Security Operations Center",
            description: "Managed monitoring across users, devices, traffic, and threat signals.",
            href: "/services/security-operations-center",
          },
          {
            title: "Managed Security Services",
            description: "Continuous security operations and analyst-led response coverage.",
            href: "/services/managed-security-services",
          },
          {
            title: "Compromise Assessment",
            description: "Evidence-led investigation to uncover active or historic intrusion.",
            href: "/services/compromise-assessment",
          },
          {
            title: "Data Breach Response",
            description: "Rapid containment, investigation, and communication support after incidents.",
            href: "/services/data-breach-response",
          },
        ],
      },
      {
        title: "SentinelOne Main",
        items: [
          {
            title: "Singularity Endpoint",
            description: "Autonomous prevention, detection, and response for endpoint estates.",
            href: "/platform/endpoint-security",
          },
          {
            title: "Singularity XDR",
            description: "Native and open protection across endpoint, identity, cloud, and data.",
            href: "/platform/xdr",
          },
          {
            title: "Purple AI",
            description: "Generative AI workflows for faster SecOps investigation and response.",
            href: "/platform/purple-ai",
          },
          {
            title: "AI-SIEM",
            description: "Security analytics and data operations for an autonomous SOC.",
            href: "/platform/ai-siem",
          },
        ],
      },
      {
        title: "Securing AI",
        items: [
          {
            title: "Prompt Security",
            description: "Secure enterprise AI tools, apps, prompts, and agent workflows.",
            href: "/platform/prompt-security",
            featured: true,
          },
          {
            title: "AI Governance",
            description: "Policies, controls, and review loops for responsible AI adoption.",
            href: "/platform/ai-governance",
          },
          {
            title: "Model Risk Review",
            description: "Assess data exposure, prompt injection, and automation risk.",
            href: "/platform/model-risk-review",
          },
        ],
      },
    ],
  },
  {
    label: "Core Services",
    columns: [
      {
        title: "Offensive Security",
        items: [
          {
            title: "Web Application Testing",
            description: "Deep testing for web apps, APIs, access controls, and business logic.",
            href: "/services/web-application-testing",
            featured: true,
          },
          {
            title: "Mobile Application Testing",
            description: "Android and iOS review for app, API, storage, and transport weaknesses.",
            href: "/services/mobile-application-testing",
          },
          {
            title: "External Infrastructure Testing",
            description: "Internet-facing exposure assessment and attack path validation.",
            href: "/services/external-infrastructure-testing",
          },
          {
            title: "Internal Infrastructure Testing",
            description: "Internal network review for lateral movement and privilege escalation paths.",
            href: "/services/internal-infrastructure-testing",
          },
        ],
      },
      {
        title: "Governance",
        items: [
          {
            title: "Virtual CISO",
            description: "Security leadership, roadmap, and board-ready risk communication.",
            href: "/services/virtual-ciso",
          },
          {
            title: "Discovery",
            description: "Asset, exposure, and operating-context discovery before deeper review.",
            href: "/services/discovery",
          },
          {
            title: "Server Credentialed Check",
            description: "Authenticated host assessment for configuration and patch-level risks.",
            href: "/services/server-credentialed-check",
          },
          {
            title: "Email Security",
            description: "Review controls around mail flow, phishing exposure, and account abuse.",
            href: "/services/email-security",
          },
        ],
      },
      {
        title: "Incident & Data",
        items: [
          {
            title: "Digital Investigations",
            description: "Forensic analysis for incidents, disputes, and suspicious activity.",
            href: "/services/digital-investigations",
          },
          {
            title: "Data Leakage Prevention",
            description: "Reduce exposure of sensitive data across endpoints, cloud, and workflows.",
            href: "/services/data-leakage-prevention",
          },
          {
            title: "Expert Witness Litigation",
            description: "Technical evidence review and expert support for cyber-related litigation.",
            href: "/services/expert-witness-litigation",
          },
          {
            title: "Secure Cloud Hosting",
            description: "Hardened hosting patterns for sensitive systems and regulated workloads.",
            href: "/services/secure-cloud-hosting",
          },
        ],
      },
    ],
  },
  {
    label: "SentinelOne",
    columns: [
      {
        title: "Cloud Security",
        items: [
          {
            title: "Singularity Cloud Security",
            description: "AI-powered CNAPP to block cloud attacks and reduce exposure.",
            href: "/platform/cloud-security",
            featured: true,
          },
          {
            title: "Cloud Native Security",
            description: "Secure cloud and development resources across the build lifecycle.",
            href: "/platform/cloud-native-security",
          },
          {
            title: "Cloud Workload Security",
            description: "Runtime workload protection for servers, containers, and cloud assets.",
            href: "/platform/cloud-workload-security",
          },
          {
            title: "Cloud Security Posture Management",
            description: "Detect and remediate cloud misconfigurations before they become incidents.",
            href: "/platform/cloud-security-posture-management",
          },
        ],
      },
      {
        title: "Identity & Exposure",
        items: [
          {
            title: "Singularity Identity",
            description: "Identity threat detection and response for enterprise directories.",
            href: "/platform/identity",
          },
          {
            title: "Vulnerability Management",
            description: "Application and OS vulnerability management with risk prioritization.",
            href: "/platform/vulnerability-management",
          },
          {
            title: "Threat Intelligence",
            description: "Adversary intelligence and campaign context for security teams.",
            href: "/platform/threat-intelligence",
          },
          {
            title: "RemoteOps Forensics",
            description: "Orchestrate forensic collection and remote investigation at scale.",
            href: "/platform/remoteops-forensics",
          },
        ],
      },
      {
        title: "Global Services",
        items: [
          {
            title: "Managed Detection & Response",
            description: "Analyst-led monitoring, triage, and response for critical environments.",
            href: "/global-services/managed-detection-and-response",
          },
          {
            title: "Incident Readiness & Response",
            description: "Prepare for incidents and respond with structured expert support.",
            href: "/global-services/incident-readiness-and-response",
          },
          {
            title: "Threat Hunting",
            description: "Proactive hunts for stealthy threats and abnormal attacker behavior.",
            href: "/global-services/threat-hunting",
          },
          {
            title: "Technical Account Management",
            description: "Dedicated security guidance and platform success planning.",
            href: "/global-services/technical-account-management",
          },
        ],
      },
    ],
  },
  {
    label: "Resources",
    columns: [
      {
        title: "Learn",
        items: [
          {
            title: "Blog",
            description: "Security thinking, AI defense notes, and research updates.",
            href: "/blog",
          },
          {
            title: "Cybersecurity 101",
            description: "Plain-language explainers for security concepts and controls.",
            href: "/resources/cybersecurity-101",
          },
          {
            title: "Case Studies",
            description: "Examples of enterprise security programs and measurable outcomes.",
            href: "#case-studies",
          },
          {
            title: "Webinars",
            description: "Guided sessions for teams evaluating AI and cyber operations.",
            href: "/resources/webinars",
          },
        ],
      },
      {
        title: "Company",
        items: [
          {
            title: "PointBlank",
            description: "Core security services, compliance workflows, and expert-led cyber delivery.",
            href: "/",
            featured: true,
          },
          {
            title: "SentinelOne Services",
            description: "Endpoint, cloud, identity, SIEM, and managed response capabilities.",
            href: "/companies/sentinelone",
          },
          {
            title: "Careers",
            description: "Roles for analysts, engineers, consultants, and AI security builders.",
            href: "#careers",
          },
          {
            title: "Legal & Compliance",
            description: "Program materials, policy alignment, and compliance references.",
            href: "/legal",
          },
        ],
      },
    ],
  },
];
