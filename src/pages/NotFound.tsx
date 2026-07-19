import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, ShieldQuestion, Terminal } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Seo
        title="Page Not Found | PointBlank"
        description="The requested PointBlank page could not be found."
        path={location.pathname}
        noIndex
      />
      <Header />
      <main className="relative flex min-h-[calc(100vh-180px)] items-center justify-center overflow-hidden px-6 pt-[108px] pb-16">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d02030]/20 blur-[120px] nf-drift" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-[320px] w-[320px] rounded-full bg-[#660008]/30 blur-[100px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:44px_44px]" />

        <div className="relative w-full max-w-xl text-center">
          <div className="mx-auto mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d02030]/40 bg-[#d02030]/10 backdrop-blur">
            <ShieldQuestion className="h-8 w-8 text-[#ff8a96]" />
          </div>

          <h1 className="bg-gradient-to-b from-white to-white/30 bg-clip-text text-[96px] font-bold leading-none tracking-tight text-transparent nf-flicker sm:text-[128px]">
            404
          </h1>

          <p className="mt-2 text-lg font-medium text-white/85">
            This page slipped past our perimeter.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/50">
            The route you requested doesn&apos;t exist, was moved, or is being
            kept behind access controls.
          </p>

          {/* Terminal-style path readout */}
          <div className="mx-auto mt-8 max-w-md overflow-hidden rounded-xl border border-white/10 bg-black/50 text-left backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
              <Terminal className="h-3.5 w-3.5 text-white/40" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                request log
              </span>
              <span className="ml-auto flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-[#d02030]/60" />
              </span>
            </div>
            <div className="px-4 py-3 font-mono text-[13px]">
              <span className="text-emerald-400/80">GET</span>{" "}
              <span className="break-all text-white/70">
                {location.pathname}
              </span>
              <div className="mt-1 text-[#ff8a96]">
                &rarr; 404 Not Found
                <span className="ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 animate-pulse bg-[#ff8a96]/80" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#d02030] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_32px_-8px_rgba(208,32,48,0.65)] transition-all hover:-translate-y-0.5 hover:bg-[#f52b43]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Return home
            </Link>
            <Link
              to="/compliance-check"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/90 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.07]"
            >
              Run a compliance check
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
