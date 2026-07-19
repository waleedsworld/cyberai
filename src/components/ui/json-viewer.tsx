import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * JsonViewer — a lightweight, dependency-free syntax highlighter for JSON.
 *
 * Tokenises a pretty-printed JSON string and colourises keys, strings,
 * numbers, booleans and null so raw API responses read like a real
 * developer console rather than a flat <pre> blob. Purely presentational —
 * safe for untrusted data because every token is rendered as text, never
 * as HTML.
 */

type TokenKind =
  | "key"
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "punct"
  | "plain";

interface Token {
  value: string;
  kind: TokenKind;
}

const KIND_CLASS: Record<TokenKind, string> = {
  key: "text-[#ff8a96]",
  string: "text-[#7fdca4]",
  number: "text-[#f0b25a]",
  boolean: "text-[#c792ea]",
  null: "text-white/40 italic",
  punct: "text-white/45",
  plain: "text-white/80",
};

// Matches, in order: quoted strings (with optional trailing colon => key),
// literals, numbers, and structural punctuation.
const TOKEN_RE =
  /("(?:\\.|[^"\\])*")(\s*:)?|(\btrue\b|\bfalse\b)|(\bnull\b)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}\[\],])/g;

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(source)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ value: source.slice(lastIndex, match.index), kind: "plain" });
    }

    const [, str, colon, bool, nul, num, punct] = match;

    if (str !== undefined) {
      if (colon) {
        tokens.push({ value: str, kind: "key" });
        tokens.push({ value: colon, kind: "punct" });
      } else {
        tokens.push({ value: str, kind: "string" });
      }
    } else if (bool !== undefined) {
      tokens.push({ value: bool, kind: "boolean" });
    } else if (nul !== undefined) {
      tokens.push({ value: nul, kind: "null" });
    } else if (num !== undefined) {
      tokens.push({ value: num, kind: "number" });
    } else if (punct !== undefined) {
      tokens.push({ value: punct, kind: "punct" });
    }

    lastIndex = TOKEN_RE.lastIndex;
  }

  if (lastIndex < source.length) {
    tokens.push({ value: source.slice(lastIndex), kind: "plain" });
  }

  return tokens;
}

export interface JsonViewerProps extends React.HTMLAttributes<HTMLPreElement> {
  data: unknown;
  /** Show a gutter with line numbers. Defaults to true. */
  lineNumbers?: boolean;
}

export const JsonViewer = React.forwardRef<HTMLPreElement, JsonViewerProps>(
  ({ data, lineNumbers = true, className, ...props }, ref) => {
    const source = React.useMemo(() => {
      try {
        return typeof data === "string" ? data : JSON.stringify(data, null, 2);
      } catch {
        return String(data);
      }
    }, [data]);

    const lines = React.useMemo(() => source.split("\n"), [source]);

    return (
      <pre
        ref={ref}
        className={cn(
          "font-mono text-[13px] leading-relaxed text-white/80 overflow-x-auto",
          className
        )}
        {...props}
      >
        <code className="grid grid-cols-[auto_1fr] gap-x-4">
          {lines.map((line, i) => (
            <React.Fragment key={i}>
              {lineNumbers && (
                <span
                  aria-hidden
                  className="select-none text-right text-white/20 tabular-nums pr-1 border-r border-white/5"
                >
                  {i + 1}
                </span>
              )}
              <span className="whitespace-pre">
                {tokenize(line).map((tok, j) => (
                  <span key={j} className={KIND_CLASS[tok.kind]}>
                    {tok.value}
                  </span>
                ))}
                {line.length === 0 ? " " : ""}
              </span>
            </React.Fragment>
          ))}
        </code>
      </pre>
    );
  }
);

JsonViewer.displayName = "JsonViewer";

export default JsonViewer;
