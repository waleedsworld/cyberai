import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Globe,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  FileDown,
  FileJson,
  Printer,
  ListFilter,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  summarizeResults,
  findingsToCsv,
  downloadTextFile,
  reportBasename,
  type RawScanResults,
} from "@/lib/compliance-report";

interface ComplianceReportProps {
  results: RawScanResults;
  region: string;
  urls: string[];
  onRestart: () => void;
}

type Filter = "all" | "failed" | "passed";

/** Colour ramp for the compliance score, from strong to weak. */
function scoreColor(score: number): string {
  if (score >= 90) return "hsl(142 71% 45%)"; // green
  if (score >= 75) return "hsl(160 60% 45%)"; // teal-green
  if (score >= 60) return "hsl(38 92% 50%)"; // amber
  if (score >= 40) return "hsl(25 95% 53%)"; // orange
  return "hsl(0 84% 60%)"; // red
}

/** Print-safe inline SVG donut so we don't depend on chart rendering. */
const ScoreRing: React.FC<{ score: number; grade: string }> = ({ score, grade }) => {
  const size = 160;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = scoreColor(score);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Compliance score ${score} percent`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 900ms ease" }}
      />
      <text x="50%" y="46%" dominantBaseline="middle" textAnchor="middle" fontSize="34" fontWeight="700" fill={color}>
        {score}%
      </text>
      <text x="50%" y="66%" dominantBaseline="middle" textAnchor="middle" fontSize="15" fill="hsl(var(--muted-foreground))">
        Grade {grade}
      </text>
    </svg>
  );
};

const StatTile: React.FC<{ label: string; value: number | string; tone?: "pass" | "fail" | "neutral" }> = ({
  label,
  value,
  tone = "neutral",
}) => {
  const toneClass =
    tone === "pass" ? "text-green-500" : tone === "fail" ? "text-red-500" : "text-foreground";
  return (
    <div className="rounded-lg border bg-card p-4 text-center">
      <div className={`text-3xl font-bold ${toneClass}`}>{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
};

const ComplianceReport: React.FC<ComplianceReportProps> = ({ results, region, urls, onRestart }) => {
  const [filter, setFilter] = useState<Filter>("all");
  const { toast } = useToast();
  const summary = useMemo(() => summarizeResults(results), [results]);
  const generatedAt = useMemo(() => new Date(), []);

  const filteredFindings = useMemo(() => {
    if (filter === "passed") return summary.findings.filter((f) => f.passed);
    if (filter === "failed") return summary.findings.filter((f) => !f.passed);
    return summary.findings;
  }, [summary.findings, filter]);

  // Group filtered findings back under their page for display.
  const groupedByPage = useMemo(() => {
    const map = new Map<string, typeof filteredFindings>();
    for (const f of filteredFindings) {
      const arr = map.get(f.page) ?? [];
      arr.push(f);
      map.set(f.page, arr);
    }
    return Array.from(map.entries());
  }, [filteredFindings]);

  const handleExportCsv = () => {
    downloadTextFile(`${reportBasename(region)}.csv`, "text/csv", findingsToCsv(summary.findings));
    toast({ title: "CSV exported", description: `${summary.totalFindings} findings written.` });
  };

  const handleExportJson = () => {
    const payload = {
      generated_at: generatedAt.toISOString(),
      region,
      urls,
      summary: {
        overall_score: summary.score,
        grade: summary.grade,
        total_findings: summary.totalFindings,
        passed: summary.passed,
        failed: summary.failed,
        pages: summary.pages,
      },
      findings: summary.findings,
      raw: results,
    };
    downloadTextFile(`${reportBasename(region)}.json`, "application/json", JSON.stringify(payload, null, 2));
    toast({ title: "JSON exported", description: "Full report with raw data saved." });
  };

  const handlePrint = () => window.print();

  return (
    <div className="report-root max-w-5xl mx-auto">
      {/* Print styles: hide chrome, keep the report readable on paper. */}
      <style>{`
        @media print {
          header, footer, .report-actions, .report-filter { display: none !important; }
          .report-root { max-width: 100% !important; }
          main { padding-top: 0 !important; }
          .report-finding { break-inside: avoid; }
          .report-card { break-inside: avoid; box-shadow: none !important; }
          body { background: #fff !important; }
        }
      `}</style>

      {/* Report header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-primary">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">Compliance Audit Report</span>
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">{region || "Compliance"} Results</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {summary.pageCount} page(s) scanned · Generated {generatedAt.toLocaleString()}
          </p>
        </div>
        <div className="report-actions flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print / PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCsv}>
            <FileDown className="mr-2 h-4 w-4" /> CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportJson}>
            <FileJson className="mr-2 h-4 w-4" /> JSON
          </Button>
        </div>
      </div>

      {/* Score overview */}
      <Card className="report-card mb-6">
        <CardContent className="flex flex-col items-center gap-8 p-6 md:flex-row md:items-center">
          <div className="shrink-0">
            <ScoreRing score={summary.score} grade={summary.grade} />
          </div>
          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile label="Requirements" value={summary.totalFindings} />
            <StatTile label="Passed" value={summary.passed} tone="pass" />
            <StatTile label="Failed" value={summary.failed} tone="fail" />
            <StatTile label="Pages" value={summary.pageCount} />
          </div>
        </CardContent>
      </Card>

      {/* Per-page breakdown */}
      {summary.pages.length > 1 && (
        <Card className="report-card mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Per-page compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {summary.pages.map((p) => (
              <div key={p.url}>
                <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                  <span className="flex min-w-0 items-center gap-2">
                    <Globe className="h-4 w-4 shrink-0 text-primary" />
                    <span className="truncate">{p.url}</span>
                  </span>
                  <span className="shrink-0 font-medium" style={{ color: scoreColor(p.score) }}>
                    {p.score}% · {p.passed}/{p.total}
                  </span>
                </div>
                <Progress value={p.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Filter */}
      <div className="report-filter mb-4 flex items-center gap-2">
        <ListFilter className="h-4 w-4 text-muted-foreground" />
        {(["all", "failed", "passed"] as Filter[]).map((f) => {
          const count =
            f === "all" ? summary.totalFindings : f === "failed" ? summary.failed : summary.passed;
          return (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f === "failed" ? "Failed" : "Passed"} ({count})
            </Button>
          );
        })}
      </div>

      {/* Findings grouped by page */}
      {groupedByPage.length === 0 ? (
        <Card className="report-card">
          <CardContent className="p-8 text-center text-muted-foreground">
            No {filter === "all" ? "" : filter} findings to show.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {groupedByPage.map(([pageUrl, findings]) => (
            <Card key={pageUrl} className="report-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Globe className="h-5 w-5 shrink-0" />
                  <span className="truncate">{pageUrl}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {findings.map((finding, i) => (
                    <div key={i} className="report-finding rounded-lg border p-4">
                      <div className="mb-2 flex items-start gap-3">
                        {finding.passed ? (
                          <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold">{finding.law}</h4>
                          {finding.details && (
                            <p className="mt-1 text-sm text-muted-foreground">{finding.details}</p>
                          )}
                          {finding.evidence && (
                            <div className="mt-2 rounded bg-muted p-2 text-xs">
                              <strong>Evidence:</strong> {finding.evidence}
                            </div>
                          )}
                        </div>
                        <Badge variant={finding.passed ? "default" : "destructive"}>
                          {finding.passed ? "PASS" : finding.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="report-actions mt-8 text-center">
        <Button onClick={onRestart} size="lg">
          Check Another Website
        </Button>
      </div>
    </div>
  );
};

export default ComplianceReport;
