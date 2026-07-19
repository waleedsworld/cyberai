// Shared types + pure helpers for the Compliance Report Center. These sit
// alongside the wizard's compliance-report.ts helpers but model findings with a
// richer pass/fail/review/unknown status so a re-opened report can be scored,
// filtered, and exported independently of the live scan flow.

export type FindingStatus = "pass" | "fail" | "warn" | "unknown";

export interface ComplianceFinding {
  law?: string;
  details?: string;
  status?: string;
  evidence_snippet?: string;
  [key: string]: unknown;
}

export interface CompliancePage {
  url?: string;
  findings?: ComplianceFinding[];
  [key: string]: unknown;
}

export interface ComplianceReport {
  job_id?: string;
  region_id?: string;
  region?: string;
  pages?: CompliancePage[];
  [key: string]: unknown;
}

export interface CenterSummary {
  pageCount: number;
  findingCount: number;
  passCount: number;
  failCount: number;
  warnCount: number;
  otherCount: number;
  /** 0-100 compliance score = passing findings / gradable findings. */
  score: number;
}

/** Normalise the free-form status string coming back from the API. */
export function normalizeStatus(raw: unknown): FindingStatus {
  const s = String(raw ?? "").trim().toLowerCase();
  if (["pass", "passed", "compliant", "ok", "yes", "true"].includes(s)) return "pass";
  if (["fail", "failed", "non-compliant", "noncompliant", "violation", "no", "false"].includes(s))
    return "fail";
  if (["warn", "warning", "partial", "review", "manual"].includes(s)) return "warn";
  return "unknown";
}

export function summarizeReport(report: ComplianceReport | null | undefined): CenterSummary {
  const pages = report?.pages ?? [];
  let findingCount = 0;
  let passCount = 0;
  let failCount = 0;
  let warnCount = 0;
  let otherCount = 0;

  for (const page of pages) {
    for (const finding of page.findings ?? []) {
      findingCount += 1;
      switch (normalizeStatus(finding.status)) {
        case "pass":
          passCount += 1;
          break;
        case "fail":
          failCount += 1;
          break;
        case "warn":
          warnCount += 1;
          break;
        default:
          otherCount += 1;
      }
    }
  }

  // Score is based on findings that can actually be graded (pass/fail/warn);
  // warnings count as half credit. Unknowns are excluded from the denominator.
  const gradable = passCount + failCount + warnCount;
  const score = gradable === 0 ? 0 : Math.round(((passCount + warnCount * 0.5) / gradable) * 100);

  return { pageCount: pages.length, findingCount, passCount, failCount, warnCount, otherCount, score };
}

export function scoreBand(score: number): { label: string; tone: "good" | "warn" | "bad" } {
  if (score >= 85) return { label: "Strong", tone: "good" };
  if (score >= 60) return { label: "Needs work", tone: "warn" };
  return { label: "At risk", tone: "bad" };
}

function csvEscape(value: unknown): string {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/** Flatten a report into a CSV suitable for spreadsheets / audit evidence. */
export function reportToCSV(report: ComplianceReport): string {
  const header = ["url", "law", "status", "details", "evidence"];
  const rows: string[] = [header.join(",")];
  for (const page of report.pages ?? []) {
    const findings = page.findings ?? [];
    if (findings.length === 0) {
      rows.push([page.url, "", "", "", ""].map(csvEscape).join(","));
      continue;
    }
    for (const f of findings) {
      rows.push(
        [page.url, f.law, normalizeStatus(f.status), f.details, f.evidence_snippet]
          .map(csvEscape)
          .join(",")
      );
    }
  }
  return rows.join("\r\n");
}

export function reportToJSON(report: ComplianceReport): string {
  return JSON.stringify(report, null, 2);
}

/** Build a filesystem-safe filename stem from a report, e.g. compliance_zuhd-store_2026-07-19. */
export function reportFilenameStem(report: ComplianceReport, jobId?: string): string {
  const firstUrl = report.pages?.[0]?.url ?? "";
  let host = "report";
  try {
    if (firstUrl) host = new URL(firstUrl).hostname.replace(/^www\./, "");
  } catch {
    /* ignore malformed url */
  }
  const safeHost = host.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "report";
  const date = new Date().toISOString().slice(0, 10);
  const suffix = jobId ? `_${jobId}` : "";
  return `compliance_${safeHost}_${date}${suffix}`;
}

/** Trigger a client-side file download for arbitrary text content. */
export function downloadTextFile(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}
