import { Link } from "react-router-dom";
import { Linkedin, Twitter, Github, Mail, MapPin } from "lucide-react";
import PointBlankLogo from "@/components/PointBlankLogo";

const footerColumns = [
  {
    title: "Platform",
    links: [
      { text: "All Services", href: "/#services" },
      { text: "Operating Model", href: "/#architecture" },
      { text: "Service Categories", href: "/#categories" },
      { text: "Use Cases", href: "/#use-cases" },
    ],
  },
  {
    title: "Top Services",
    links: [
      { text: "Penetration Testing", href: "/services/penetration-testing" },
      { text: "Vulnerability Assessment", href: "/services/vulnerability-assessment" },
      { text: "Security Operations Center", href: "/services/security-operations-center" },
      { text: "Data Breach Response", href: "/services/data-breach-response" },
      { text: "Virtual CISO", href: "/services/virtual-ciso" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Blog", href: "#" },
      { text: "Case Studies", href: "#" },
      { text: "Compliance Mapping", href: "#" },
      { text: "Threat Briefings", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About PointBlank", href: "#" },
      { text: "Operating Model", href: "/#architecture" },
      { text: "Careers", href: "#" },
      { text: "Contact Sales", href: "#contact" },
    ],
  },
];

const socials = [
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Twitter, label: "Twitter", href: "#" },
  { Icon: Github, label: "GitHub", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-[#020202] overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent,rgba(208,32,48,0.55),transparent)]" />

      {/* Faint ambient glow */}
      <div className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(208,32,48,0.12),transparent_60%)] blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 pt-20 pb-12">
        {/* Top: brand + columns */}
        <div className="grid gap-12 lg:grid-cols-12 mb-16">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <PointBlankLogo subtitle="Offense, Defense, Response" />
            </Link>

            <p className="text-[14px] leading-relaxed text-white/55 max-w-sm mb-6">
              PointBlank delivers AI-assisted offensive security, compliance reviews, incident response, and analyst-backed remediation guidance.
            </p>

            <div className="space-y-3 text-[13px] text-white/55">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#ff8a96]" />
                <span>hello@pointblank.security</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#ff8a96]" />
                <span>Riyadh, Saudi Arabia</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/65 hover:border-[#d02030]/40 hover:bg-[#d02030]/10 hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid gap-10 grid-cols-2 md:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.text}>
                      <a
                        href={l.href}
                        className="text-[13px] text-white/70 hover:text-white transition-colors"
                      >
                        {l.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Status row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6 border-y border-white/10">
          <div className="flex items-center gap-3 text-[12px]">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono uppercase tracking-[0.22em] text-emerald-300/80">
              SOC Operations Online
            </span>
          </div>
          <div className="text-[12px] font-mono uppercase tracking-[0.22em] text-white/40">
            Build · v1.0 · PointBlank
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 text-[12px] text-white/45">
          <p>© 2025 PointBlank. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
