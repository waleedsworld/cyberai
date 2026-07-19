import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * EmptyState — a calm, premium placeholder for panels that have no content
 * yet (no API response, no results, nothing selected). Gives the eye a
 * focal point instead of a blank void: a haloed icon, a short title, and a
 * one-line hint, optionally with an action slot.
 */

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon: Icon, title, description, action, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center overflow-hidden",
          className
        )}
        {...props}
      >
        {/* soft crimson halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-[#d02030]/10 blur-3xl"
        />

        {Icon && (
          <div className="relative mb-5">
            <span
              aria-hidden
              className="absolute inset-0 rounded-2xl bg-[#d02030]/20 blur-md"
            />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0c0c10]">
              <Icon className="h-6 w-6 text-[#ff8a96]" strokeWidth={1.6} />
            </div>
          </div>
        )}

        <h3 className="relative text-base font-semibold text-white/90">{title}</h3>
        {description && (
          <p className="relative mt-1.5 max-w-xs text-sm leading-relaxed text-white/45">
            {description}
          </p>
        )}
        {action && <div className="relative mt-5">{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

export default EmptyState;
