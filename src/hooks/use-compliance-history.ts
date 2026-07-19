import { useCallback, useEffect, useState } from "react";
import type { ComplianceReport } from "@/lib/report-center";
import { summarizeReport } from "@/lib/report-center";

// Local, privacy-friendly history of compliance scans. Nothing leaves the
// browser: we persist a lightweight summary keyed by job id so a user can
// revisit, re-open, and export past reports from the Report Center.

const STORAGE_KEY = "pointblank.compliance.history.v1";
const MAX_ENTRIES = 50;

export interface HistoryEntry {
  jobId: string;
  urls: string[];
  regionName?: string;
  regionId?: string;
  savedAt: number;
  score: number;
  passCount: number;
  failCount: number;
  pageCount: number;
}

function read(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((e) => e && typeof e.jobId === "string");
  } catch {
    return [];
  }
}

function write(entries: HistoryEntry[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
    // Notify other hook instances in the same tab (storage event only fires cross-tab).
    window.dispatchEvent(new Event("pointblank:history"));
  } catch {
    /* quota / private mode — fail silently */
  }
}

/** Build a history entry from a full report + context, without persisting it. */
export function entryFromReport(
  report: ComplianceReport,
  ctx: { jobId: string; regionName?: string; regionId?: string; urls?: string[] }
): HistoryEntry {
  const summary = summarizeReport(report);
  const urls =
    ctx.urls && ctx.urls.length
      ? ctx.urls
      : (report.pages ?? []).map((p) => p.url ?? "").filter(Boolean);
  return {
    jobId: ctx.jobId,
    urls,
    regionName: ctx.regionName,
    regionId: ctx.regionId,
    savedAt: Date.now(),
    score: summary.score,
    passCount: summary.passCount,
    failCount: summary.failCount,
    pageCount: summary.pageCount,
  };
}

/**
 * Persist (or refresh) a scan in history. Safe to call outside React — used by
 * the compliance wizard when a scan completes. De-dupes on jobId and keeps the
 * most recent scan at the top.
 */
export function saveHistoryEntry(entry: HistoryEntry): void {
  const existing = read().filter((e) => e.jobId !== entry.jobId);
  write([entry, ...existing]);
}

export function useComplianceHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => read());

  const refresh = useCallback(() => setHistory(read()), []);

  useEffect(() => {
    const onChange = () => refresh();
    window.addEventListener("pointblank:history", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("pointblank:history", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refresh]);

  const save = useCallback(
    (entry: HistoryEntry) => {
      saveHistoryEntry(entry);
      refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    (jobId: string) => {
      write(read().filter((e) => e.jobId !== jobId));
      refresh();
    },
    [refresh]
  );

  const clear = useCallback(() => {
    write([]);
    refresh();
  }, [refresh]);

  return { history, save, remove, clear, refresh };
}
