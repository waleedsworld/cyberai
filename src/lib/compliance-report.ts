// Pure helpers for turning a raw compliance scan result into an
// aggregated, scored, exportable audit report. Kept free of React so the
// scoring logic is easy to reason about and unit-test.

export interface RawFinding {
  law?: string;
  details?: string;
  evidence_snippet?: string;
  status?: string;
  [key: string]: unknown;
}

export interface RawPage {
  url?: string;
  findings?: RawFinding[];
  [key: string]: unknown;
}

export interface RawScanResults {
  pages?: RawPage[];
  [key: string]: unknown;
}

export interface NormalizedFinding {
  page: string;
  law: string;
  details: string;
  evidence: string;
  passed: boolean;
  status: string;
}

export interface PageSummary {
  url: string;
  total: number;
  passed: number;
  failed: number;
  score: number; // 0-100, percent of findings passing
}

export interface ReportSummary {
  totalFindings: number;
  passed: number;
  failed: number;
  pageCount: number;
  score: number; // 0-100 overall
  grade: string; // A / B / C / D / F
  pages: PageSummary[];
  findings: NormalizedFinding[];
}

/** A finding "passes" when its status is explicitly a passing value. */
export function isPassing(status: unknown): boolean {
  const s = String(status ?? "").trim().toLowerCase();
  return s === "pass" || s === "passed" || s === "compliant" || s === "ok";
}

export function scoreToGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 40) return "D";
  return "F";
}

/** Flatten + aggregate a raw scan result into a scored report summary. */
export function summarizeResults(results: RawScanResults | null | undefined): ReportSummary {
  const rawPages = Array.isArray(results?.pages) ? results!.pages! : [];
  const findings: NormalizedFinding[] = [];
  const pages: PageSummary[] = [];

  for (const page of rawPages) {
    const url = String(page?.url ?? "(unknown URL)");
    const rawFindings = Array.isArray(page?.findings) ? page.findings! : [];
    let pPassed = 0;

    for (const f of rawFindings) {
      const passed = isPassing(f?.status);
      if (passed) pPassed += 1;
      findings.push({
        page: url,
        law: String(f?.law ?? "Unspecified requirement"),
        details: String(f?.details ?? ""),
        evidence: String(f?.evidence_snippet ?? ""),
        passed,
        status: String(f?.status ?? "unknown"),
      });
    }

    const total = rawFindings.length;
    pages.push({
      url,
      total,
      passed: pPassed,
      failed: total - pPassed,
      score: total > 0 ? Math.round((pPassed / total) * 100) : 100,
    });
  }

  const totalFindings = findings.length;
  const passed = findings.filter((f) => f.passed).length;
  const failed = totalFindings - passed;
  const score = totalFindings > 0 ? Math.round((passed / totalFindings) * 100) : 100;

  return {
    totalFindings,
    passed,
    failed,
    pageCount: pages.length,
    score,
    grade: scoreToGrade(score),
    pages,
    findings,
  };
}

function csvEscape(value: string): string {
  const v = value.replace(/\r?\n/g, " ").trim();
  if (/[",]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

/** Serialize normalized findings to CSV text (RFC-4180-ish). */
export function findingsToCsv(findings: NormalizedFinding[]): string {
  const header = ["Page", "Requirement", "Status", "Details", "Evidence"];
  const rows = findings.map((f) =>
    [f.page, f.law, f.passed ? "PASS" : f.status.toUpperCase(), f.details, f.evidence]
      .map(csvEscape)
      .join(","),
  );
  return [header.join(","), ...rows].join("\n");
}

/** Trigger a client-side file download of arbitrary text content. */
export function downloadTextFile(filename: string, mime: string, content: string): void {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoke on next tick so the download has a chance to start.
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

/** Build a stable, filesystem-safe basename for exported reports. */
export function reportBasename(region: string): string {
  const safeRegion = (region || "report")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "report";
  const stamp = new Date().toISOString().slice(0, 10);
  return `compliance-${safeRegion}-${stamp}`;
}
