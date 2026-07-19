import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  FileJson,
  FileText,
  Globe,
  History,
  Loader2,
  Printer,
  Search,
  ShieldCheck,
  Trash2,
  XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/lib/api-base";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import {
  type ComplianceReport,
  type FindingStatus,
  downloadTextFile,
  normalizeStatus,
  reportFilenameStem,
  reportToCSV,
  reportToJSON,
  scoreBand,
  summarizeReport,
} from "@/lib/report-center";
import {
  entryFromReport,
  useComplianceHistory,
  type HistoryEntry,
} from "@/hooks/use-compliance-history";

type StatusFilter = "all" | "fail" | "warn" | "pass" | "unknown";

const statusMeta: Record<
  FindingStatus,
  { label: string; badge: "default" | "destructive" | "secondary" | "outline"; icon: typeof CheckCircle; color: string }
> = {
  pass: { label: "PASS", badge: "default", icon: CheckCircle, color: "text-green-500" },
  fail: { label: "FAIL", badge: "destructive", icon: XCircle, color: "text-red-500" },
  warn: { label: "REVIEW", badge: "secondary", icon: AlertTriangle, color: "text-amber-500" },
  unknown: { label: "N/A", badge: "outline", icon: Clock, color: "text-muted-foreground" },
};

function ScoreRing({ score }: { score: number }) {
  const band = scoreBand(score);
  const ringColor =
    band.tone === "good" ? "text-green-500" : band.tone === "warn" ? "text-amber-500" : "text-red-500";
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.max(0, Math.min(100, score)) / 100);
  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-muted" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className={`${ringColor} transition-all duration-700`}
          stroke="currentColor"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground">{score}</span>
        <span className={`text-xs font-semibold uppercase tracking-wide ${ringColor}`}>{band.label}</span>
      </div>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof CheckCircle;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card/50 p-4">
      <Icon className={`h-6 w-6 ${color}`} />
      <div>
        <div className="text-2xl font-bold leading-none text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

const ComplianceReports = () => {
  const { toast } = useToast();
  const { history, save, remove, clear } = useComplianceHistory();
  const [searchParams] = useSearchParams();
  const autoLoadedRef = useRef(false);
  const [jobIdInput, setJobIdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ComplianceReport | null>(null);
  const [activeJobId, setActiveJobId] = useState<string>("");
  const [activeMeta, setActiveMeta] = useState<{ regionName?: string; regionId?: string }>({});
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");

  const summary = useMemo(() => summarizeReport(report), [report]);

  const loadReport = async (jobId: string, meta?: { regionName?: string; regionId?: string }) => {
    const id = jobId.trim();
    if (!id) {
      toast({ title: "Enter a job ID", description: "e.g. job_d42950eb", variant: "destructive" });
      return;
    }
    setLoading(true);
    setReport(null);
    try {
      const res = await fetch(`${API_BASE_URL}/complaince_job/${id}/report`);
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}${text ? ` — ${text.slice(0, 140)}` : ""}`);
      }
      const data: ComplianceReport = await res.json();
      if (!data || !Array.isArray(data.pages)) {
        throw new Error("This job has no report yet. It may still be running or may have failed.");
      }
      setReport(data);
      setActiveJobId(id);
      setActiveMeta(meta ?? {});
      setFilter("all");
      setQuery("");
      // Persist / refresh in local history.
      save(
        entryFromReport(data, {
          jobId: id,
          regionName: meta?.regionName,
          regionId: meta?.regionId ?? data.region_id,
        })
      );
      toast({ title: "Report loaded", description: `${id} — score ${summarizeReport(data).score}/100` });
    } catch (error) {
      toast({
        title: "Could not load report",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openFromHistory = (entry: HistoryEntry) => {
    setJobIdInput(entry.jobId);
    loadReport(entry.jobId, { regionName: entry.regionName, regionId: entry.regionId });
  };

  // Auto-load a report when arriving from the compliance wizard via ?job=.
  useEffect(() => {
    const jobParam = searchParams.get("job");
    if (jobParam && !autoLoadedRef.current) {
      autoLoadedRef.current = true;
      const known = history.find((h) => h.jobId === jobParam);
      setJobIdInput(jobParam);
      loadReport(jobParam, known ? { regionName: known.regionName, regionId: known.regionId } : undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filteredPages = useMemo(() => {
    if (!report?.pages) return [];
    const q = query.trim().toLowerCase();
    return report.pages
      .map((page) => {
        const findings = (page.findings ?? []).filter((f) => {
          const status = normalizeStatus(f.status);
          if (filter !== "all" && status !== filter) return false;
          if (!q) return true;
          return (
            String(f.law ?? "").toLowerCase().includes(q) ||
            String(f.details ?? "").toLowerCase().includes(q) ||
            String(page.url ?? "").toLowerCase().includes(q)
          );
        });
        return { page, findings };
      })
      .filter(({ findings, page }) => findings.length > 0 || (!query && filter === "all" && !page.findings?.length));
  }, [report, filter, query]);

  const handleExport = (kind: "json" | "csv") => {
    if (!report) return;
    const stem = reportFilenameStem(report, activeJobId);
    if (kind === "json") {
      downloadTextFile(`${stem}.json`, reportToJSON(report), "application/json");
    } else {
      downloadTextFile(`${stem}.csv`, reportToCSV(report), "text/csv;charset=utf-8");
    }
    toast({ title: `Exported ${kind.toUpperCase()}`, description: `${stem}.${kind}` });
  };

  const filterCounts: Record<StatusFilter, number> = {
    all: summary.findingCount,
    fail: summary.failCount,
    warn: summary.warnCount,
    pass: summary.passCount,
    unknown: summary.otherCount,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <Seo
        title="Compliance Report Center | PointBlank"
        description="Revisit, score, filter, and export every PointBlank compliance scan. Look up any job by ID and download audit-ready JSON, CSV, or PDF."
        path="/reports"
      />
      {/* Print rules: when printing, show only the report card. Scoped to this page. */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #compliance-report-print, #compliance-report-print * { visibility: visible !important; }
          #compliance-report-print { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>
      <Header />
      <main className="pt-[108px] pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5">
              <History className="mr-2 h-4 w-4" />
              Report Center
            </Badge>
            <h1 className="mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
              Compliance Reports, on demand
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
              Re-open any scan, score it, filter the findings, and export audit-ready evidence. Your scan
              history lives privately in this browser — nothing is uploaded.
            </p>
          </div>

          {/* Lookup */}
          <Card className="no-print mx-auto mb-8 max-w-3xl border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Search className="h-5 w-5 text-primary" />
                Look up a report by Job ID
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  placeholder="job_d42950eb"
                  value={jobIdInput}
                  onChange={(e) => setJobIdInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && loadReport(jobIdInput)}
                  className="font-mono"
                />
                <Button onClick={() => loadReport(jobIdInput)} disabled={loading} className="sm:w-40">
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Load Report
                    </>
                  )}
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Ran a scan on the{" "}
                <Link to="/compliance-check" className="text-primary underline underline-offset-2">
                  compliance check
                </Link>{" "}
                page? Its job ID is saved below automatically.
              </p>
            </CardContent>
          </Card>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
            {/* History sidebar */}
            <aside className="no-print space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <History className="h-4 w-4" />
                  Scan history
                </h2>
                {history.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
                    onClick={() => {
                      clear();
                      toast({ title: "History cleared" });
                    }}
                  >
                    Clear
                  </Button>
                )}
              </div>

              {history.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="p-5 text-center text-sm text-muted-foreground">
                    No saved scans yet. Reports you load or run will appear here.
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  {history.map((entry) => {
                    const band = scoreBand(entry.score);
                    const tone =
                      band.tone === "good"
                        ? "text-green-500"
                        : band.tone === "warn"
                        ? "text-amber-500"
                        : "text-red-500";
                    return (
                      <Card
                        key={entry.jobId}
                        className={`cursor-pointer transition-all hover:border-primary/50 ${
                          entry.jobId === activeJobId ? "border-primary/60 ring-1 ring-primary/30" : ""
                        }`}
                        onClick={() => openFromHistory(entry)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-foreground">
                                {entry.urls[0] ?? entry.jobId}
                              </div>
                              <div className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                                {entry.jobId}
                              </div>
                            </div>
                            <span className={`shrink-0 text-lg font-bold ${tone}`}>{entry.score}</span>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                            {entry.regionName && (
                              <span className="inline-flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                {entry.regionName}
                              </span>
                            )}
                            <span className="text-green-500">{entry.passCount} pass</span>
                            <span className="text-red-500">{entry.failCount} fail</span>
                            {entry.urls.length > 1 && <span>+{entry.urls.length - 1} URLs</span>}
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[11px] text-muted-foreground">
                              {new Date(entry.savedAt).toLocaleDateString()}
                            </span>
                            <button
                              className="text-muted-foreground transition-colors hover:text-destructive"
                              aria-label="Remove from history"
                              onClick={(e) => {
                                e.stopPropagation();
                                remove(entry.jobId);
                                if (entry.jobId === activeJobId) {
                                  setReport(null);
                                  setActiveJobId("");
                                }
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </aside>

            {/* Report viewer */}
            <section className="min-w-0">
              {!report && !loading && (
                <Card className="flex min-h-[340px] items-center justify-center border-dashed">
                  <CardContent className="p-8 text-center">
                    <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mb-1 font-semibold text-foreground">No report open</h3>
                    <p className="mx-auto max-w-sm text-sm text-muted-foreground">
                      Load a report by Job ID above, or pick a saved scan from your history to see its
                      score, findings, and export options.
                    </p>
                  </CardContent>
                </Card>
              )}

              {loading && (
                <Card className="flex min-h-[340px] items-center justify-center">
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary" />
                    <p className="text-muted-foreground">Fetching report…</p>
                  </CardContent>
                </Card>
              )}

              {report && !loading && (
                <div id="compliance-report-print" className="space-y-6">
                  {/* Scorecard */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                        <ScoreRing score={summary.score} />
                        <div className="flex-1 text-center sm:text-left">
                          <div className="mb-1 font-mono text-xs text-muted-foreground">{activeJobId}</div>
                          <h2 className="text-xl font-bold text-foreground">
                            {report.pages?.[0]?.url ?? "Compliance report"}
                          </h2>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {summary.pageCount} page{summary.pageCount === 1 ? "" : "s"} ·{" "}
                            {summary.findingCount} finding{summary.findingCount === 1 ? "" : "s"} checked
                            {activeMeta.regionName ? ` · ${activeMeta.regionName}` : ""}
                          </p>
                          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <StatTile icon={CheckCircle} label="Passing" value={summary.passCount} color="text-green-500" />
                            <StatTile icon={XCircle} label="Failing" value={summary.failCount} color="text-red-500" />
                            <StatTile icon={AlertTriangle} label="Review" value={summary.warnCount} color="text-amber-500" />
                            <StatTile icon={FileText} label="Pages" value={summary.pageCount} color="text-primary" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Controls */}
                  <div className="no-print flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {(["all", "fail", "warn", "pass", "unknown"] as StatusFilter[]).map((f) => (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                            filter === f
                              ? "border-primary bg-primary/15 text-primary"
                              : "border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {f === "all"
                            ? "All"
                            : f === "fail"
                            ? "Failing"
                            : f === "warn"
                            ? "Review"
                            : f === "pass"
                            ? "Passing"
                            : "Other"}{" "}
                          <span className="opacity-60">({filterCounts[f]})</span>
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Filter findings…"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          className="h-8 w-44 pl-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Export bar */}
                  <div className="no-print flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Export
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleExport("json")}>
                      <FileJson className="mr-1.5 h-4 w-4" />
                      JSON
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                      <Download className="mr-1.5 h-4 w-4" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.print()}>
                      <Printer className="mr-1.5 h-4 w-4" />
                      Print / PDF
                    </Button>
                  </div>

                  {/* Findings */}
                  {filteredPages.length === 0 ? (
                    <Card className="border-dashed">
                      <CardContent className="p-8 text-center text-sm text-muted-foreground">
                        No findings match your filters.
                      </CardContent>
                    </Card>
                  ) : (
                    <Accordion type="multiple" defaultValue={filteredPages.map((_, i) => `page-${i}`)}>
                      {filteredPages.map(({ page, findings }, pageIndex) => {
                        const pageSummary = summarizeReport({ pages: [page] });
                        return (
                          <AccordionItem key={pageIndex} value={`page-${pageIndex}`} className="border-b-0">
                            <Card className="mb-4">
                              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                <div className="flex flex-1 items-center gap-3 pr-2 text-left">
                                  <Globe className="h-5 w-5 shrink-0 text-primary" />
                                  <span className="min-w-0 flex-1 truncate font-semibold text-foreground">
                                    {page.url ?? `Page ${pageIndex + 1}`}
                                  </span>
                                  <span className="hidden shrink-0 gap-1.5 sm:flex">
                                    {pageSummary.passCount > 0 && (
                                      <Badge variant="default" className="bg-green-500/15 text-green-500 hover:bg-green-500/15">
                                        {pageSummary.passCount} pass
                                      </Badge>
                                    )}
                                    {pageSummary.failCount > 0 && (
                                      <Badge variant="destructive">{pageSummary.failCount} fail</Badge>
                                    )}
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-6 pb-5">
                                <div className="space-y-3">
                                  {findings.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                      No findings recorded for this page.
                                    </p>
                                  ) : (
                                    findings.map((finding, findingIndex) => {
                                      const status = normalizeStatus(finding.status);
                                      const meta = statusMeta[status];
                                      const Icon = meta.icon;
                                      return (
                                        <div key={findingIndex} className="rounded-lg border p-4">
                                          <div className="flex items-start gap-3">
                                            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${meta.color}`} />
                                            <div className="min-w-0 flex-1">
                                              <div className="flex items-start justify-between gap-2">
                                                <h4 className="font-semibold text-foreground">
                                                  {finding.law ?? "Requirement"}
                                                </h4>
                                                <Badge variant={meta.badge} className="shrink-0">
                                                  {meta.label}
                                                </Badge>
                                              </div>
                                              {finding.details && (
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                  {finding.details}
                                                </p>
                                              )}
                                              {finding.evidence_snippet && (
                                                <div className="mt-2 rounded bg-muted p-2 text-xs">
                                                  <strong>Evidence:</strong> {finding.evidence_snippet}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })
                                  )}
                                </div>
                              </AccordionContent>
                            </Card>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComplianceReports;
