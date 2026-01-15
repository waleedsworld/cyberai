import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Sparkles,
  Workflow,
  Home,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import TrustedBrands from "@/components/TrustedBrands";
import { getServiceBySlug, getRelatedServices } from "@/data/services";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const relatedServices = service ? getRelatedServices(service.slug) : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#030303] text-white">
        <Seo
          title="Service Not Found | PointBlank"
          description="The requested PointBlank service page could not be found."
          path={slug ? `/services/${slug}` : "/services"}
          noIndex
        />
        <Header />
        <main className="pt-[180px] pb-32">
          <div className="mx-auto max-w-xl px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Service not found</h1>
            <p className="text-white/65 mb-8">
              The service you are looking for doesn't exist or has been moved.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-lg bg-[#d02030] hover:bg-[#f52b43] px-6 py-3 font-semibold transition-colors"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Seo
        title={`${service.title} | PointBlank`}
        description={`${service.shortDescription} PointBlank combines AI-assisted workflows with expert verification.`}
        path={`/services/${service.slug}`}
      />
      <Header />

      <main className="pt-[108px]">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10">
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(208,32,48,0.18),transparent_60%)] blur-3xl" />
          </div>

          {/* Fine grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(245,43,67,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(245,43,67,0.07) 1px,transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse at 70% 50%, #000 35%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 70% 50%, #000 35%, transparent 80%)",
            }}
          />

          <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 pt-14 pb-20 md:pt-16 md:pb-28">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[12px] text-white/55 mb-10 uppercase tracking-[0.18em]">
              <Link to="/" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                <Home className="h-3 w-3" /> Home
              </Link>
              <ChevronRight className="h-3 w-3 text-white/30" />
              <Link to="/#services" className="hover:text-white transition-colors">
                Services
              </Link>
              <ChevronRight className="h-3 w-3 text-white/30" />
              <span className="text-white/75 normal-case tracking-normal">
                {service.title}
              </span>
            </nav>

            <div className="grid gap-12 lg:grid-cols-12 items-start fade-up">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#d02030]/40 bg-[#d02030]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff8a96] mb-7">
                  <Sparkles className="h-3 w-3" />
                  {service.category}
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-7">
                  {service.aiTitle}
                </h1>

                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mb-10">
                  {service.shortDescription}
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-lg bg-[#d02030] hover:bg-[#f52b43] px-6 py-3 text-[14px] font-semibold transition-colors shadow-[0_0_24px_rgba(208,32,48,0.3)]"
                  >
                    Request this service
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#process"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 hover:border-white/30 hover:bg-white/5 px-6 py-3 text-[14px] font-semibold transition-colors"
                  >
                    See how it works
                  </a>
                </div>
              </div>

              {/* Quick facts aside */}
              <aside className="lg:col-span-4 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a0505] to-[#070303] p-7">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff8a96] mb-5">
                  Service Brief
                </div>
                <dl className="space-y-5">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-1">Category</dt>
                    <dd className="text-[14px] text-white font-semibold">{service.category}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-1">Process Stages</dt>
                    <dd className="text-[14px] text-white font-semibold">{service.process.length} steps</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-1">Deliverables</dt>
                    <dd className="text-[14px] text-white font-semibold">{service.deliverables.length} included</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-1">Engagement</dt>
                    <dd className="text-[14px] text-white font-semibold">AI-assisted · Expert-verified</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <TrustedBrands variant="subtle" heading="Trusted by teams that ship security on a deadline" />

        {/* Problem & approach */}
        <section className="border-b border-white/10 bg-[#050202]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-20 md:py-28 grid gap-14 md:grid-cols-2">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff8a96] mb-4">
                The problem
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
                What goes wrong without this in place
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">{service.problem}</p>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff8a96] mb-4">
                The PointBlank approach
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
                How we close the gap
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">{service.approach}</p>
            </div>
          </div>
        </section>

        {/* AI positioning */}
        <section className="border-b border-white/10 bg-[#030303]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-20 md:py-28">
            <div className="max-w-3xl mb-14">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff8a96] mb-4">
                AI assistance
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                Where AI accelerates the work
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                {service.aiPositioning}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {service.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a0505] to-[#070303] p-7"
                >
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#d02030]/30 bg-[#d02030]/10">
                    <Cpu className="h-4 w-4 text-[#ff8a96]" />
                  </div>
                  <p className="text-[15px] font-semibold leading-snug">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expert verification */}
        <section className="border-b border-white/10 bg-[#050202]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-20 md:py-28">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a0306] via-[#0a0202] to-[#030303] p-10 md:p-16 relative overflow-hidden">
              <div className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-[#d02030]/10 blur-3xl" />

              <div className="relative max-w-3xl">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#d02030]/40 bg-[#d02030]/10">
                  <ShieldCheck className="h-5 w-5 text-[#ff8a96]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
                  Expert verification, not blind automation
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  AI moves fast. Experts verify. Every finding is reviewed by a senior security professional before it lands in your report.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="border-b border-white/10 bg-[#030303]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-20 md:py-28">
            <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff8a96] mb-4">
                  Deliverables
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">What you receive</h2>
              </div>
              <span className="text-[12px] font-mono uppercase tracking-[0.22em] text-white/40">
                {service.deliverables.length} items
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {service.deliverables.map((d, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-[#070303] p-5 hover:border-[#d02030]/40 transition-colors"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#ff8a96] flex-shrink-0 mt-0.5" />
                  <p className="text-[14px] leading-relaxed text-white/85">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="border-b border-white/10 bg-[#050202]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-20 md:py-28">
            <div className="mb-14">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff8a96] mb-4">
                Process
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                From engagement to closure
              </h2>
            </div>

            <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-5">
              {service.process.map((step, idx) => (
                <li key={step} className="bg-[#070303] p-7">
                  <div className="text-[11px] font-mono tracking-[0.25em] text-[#d02030] mb-4">
                    /0{idx + 1}
                  </div>
                  <Workflow className="h-5 w-5 text-[#ff8a96]/80 mb-4" />
                  <div className="text-[15px] font-semibold">{step}</div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Related */}
        {relatedServices.length > 0 && (
          <section className="border-b border-white/10 bg-[#030303]">
            <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-20 md:py-28">
              <div className="mb-12">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff8a96] mb-4">
                  Related services
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Often paired with this engagement
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {relatedServices.slice(0, 3).map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/services/${rel.slug}`}
                    className="group rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a0505] to-[#070303] p-7 hover:border-[#d02030]/40 transition-all"
                  >
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-3">
                      {rel.category}
                    </div>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-[#ff8a96] transition-colors">
                      {rel.aiTitle}
                    </h3>
                    <p className="text-[13px] text-white/55 mb-6 leading-relaxed">
                      {rel.shortDescription}
                    </p>
                    <div className="flex items-center justify-between pt-5 border-t border-white/10">
                      <span className="text-[13px] font-semibold text-white/80">View service</span>
                      <ArrowUpRight className="h-4 w-4 text-white/60 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section id="contact" className="border-b border-white/10 bg-[#030303]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-20 md:py-28">
            <div className="rounded-3xl border border-[#d02030]/30 bg-gradient-to-br from-[#1a0306] via-[#0a0202] to-[#030303] p-10 md:p-16 relative overflow-hidden">
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(208,32,48,0.2),transparent_60%)] blur-3xl" />

              <div className="relative max-w-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
                  Start with a security review
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-8">
                  Book a call with a PointBlank expert. We'll scope this engagement and confirm the next concrete step within one business day.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#book"
                    className="group inline-flex items-center gap-2 rounded-lg bg-[#d02030] hover:bg-[#f52b43] px-6 py-3 text-[14px] font-semibold transition-colors shadow-[0_0_24px_rgba(208,32,48,0.3)]"
                  >
                    Book a call
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <Link
                    to="/#services"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 hover:border-white/30 hover:bg-white/5 px-6 py-3 text-[14px] font-semibold transition-colors"
                  >
                    Browse all services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;
