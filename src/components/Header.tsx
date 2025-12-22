import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, Search, X } from "lucide-react";
import { megaNavSections, type MegaNavSection } from "@/data/navigation";
import PointBlankLogo from "@/components/PointBlankLogo";

const utilityLinks = [
  { label: "Experiencing a Breach?", href: "/services/data-breach-response" },
  { label: "Blog", href: "#" },
];

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const activeSection = megaNavSections.find((s) => s.label === activeMenu);
  const mobilePanelSection = megaNavSections.find((s) => s.label === mobilePanel);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${
        scrolled
          ? "border-white/10 bg-[#030303]/85 backdrop-blur-xl"
          : "border-white/5 bg-[#030303]/60 backdrop-blur"
      }`}
    >
      {/* Utility bar */}
      <div className="border-b border-white/5">
        <div className="mx-auto flex h-8 max-w-[1440px] items-center justify-end gap-6 px-5 text-[12px] text-white/55 md:px-10 lg:px-16">
          {utilityLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="hidden transition-colors hover:text-white md:inline-block"
            >
              {l.label}
            </a>
          ))}
          <button
            className="hidden text-white/60 transition-colors hover:text-white md:inline-flex"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main nav */}
      <nav className="relative" onMouseLeave={() => setActiveMenu(null)} aria-label="Primary">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-16">
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => {
              setMobileOpen(false);
              setMobilePanel(null);
            }}
          >
            <PointBlankLogo />
          </Link>

          <div className="hidden h-full items-center gap-0 lg:flex">
            {megaNavSections.map((section) => (
              <MegaNavButton
                key={section.label}
                section={section}
                active={activeMenu === section.label}
                onOpen={() => setActiveMenu(section.label)}
              />
            ))}
            <a
              href="#pricing"
              className="flex h-full items-center px-4 text-[14px] font-medium text-white/70 transition-colors hover:text-white"
              onMouseEnter={() => setActiveMenu(null)}
            >
              Pricing
            </a>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#contact"
              className="rounded-lg border border-white/15 px-4 py-2.5 text-[13px] font-semibold text-white/85 transition-all hover:border-white/30 hover:text-white"
            >
              Contact
            </a>
            <a
              href="#book"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#d02030] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#f52b43] shadow-[0_0_24px_rgba(208,32,48,0.35)]"
            >
              Book a Review
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white lg:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((open) => !open);
              setMobilePanel(null);
            }}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {activeSection?.columns ? <DesktopMegaPanel section={activeSection} /> : null}
        {mobileOpen ? (
          <MobileMegaPanel
            activePanel={mobilePanel}
            onPanelOpen={(label) => setMobilePanel(label)}
            onPanelBack={() => setMobilePanel(null)}
            onClose={() => setMobileOpen(false)}
            panelSection={mobilePanelSection}
          />
        ) : null}
      </nav>
    </header>
  );
};

type MegaNavButtonProps = {
  section: MegaNavSection;
  active: boolean;
  onOpen: () => void;
};

const MegaNavButton = ({ section, active, onOpen }: MegaNavButtonProps) => (
  <button
    className={`relative flex h-full items-center gap-1.5 px-4 text-[14px] font-medium transition-colors focus:outline-none ${
      active ? "text-white" : "text-white/70 hover:text-white"
    }`}
    onMouseEnter={onOpen}
    onFocus={onOpen}
    aria-expanded={active}
  >
    {section.label}
    <ChevronDown
      className={`h-3.5 w-3.5 transition-transform ${active ? "rotate-180 text-[#ff8a96]" : ""}`}
    />
    {active ? <span className="absolute inset-x-3 -bottom-px h-px bg-[#d02030]" /> : null}
  </button>
);

const DesktopMegaPanel = ({ section }: { section: MegaNavSection }) => (
  <div className="absolute left-0 right-0 top-full hidden lg:block z-[60]">
    {/* Fully opaque bg so footer / page content behind the dropdown can't bleed through */}
    <div className="border-y border-white/10 bg-[#050208] shadow-[0_24px_60px_rgba(0,0,0,0.8)]">
      <div className="mx-auto max-w-[1440px] px-10 py-10 lg:px-16">
        <div
          className={`grid gap-8 ${
            section.columns && section.columns.length > 3 ? "grid-cols-5" : "grid-cols-3"
          }`}
        >
          {section.columns?.map((column) => (
            <div key={column.title} className="min-w-0">
              <div className="mb-4 pb-3 border-b border-white/10 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                {column.title}
              </div>
              <ul className="space-y-1">
                {column.items.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      className={`block rounded-lg border px-4 py-3 transition-all ${
                        item.featured
                          ? "border-[#d02030]/40 bg-[#d02030]/10 hover:bg-[#d02030]/15"
                          : "border-transparent hover:border-white/10 hover:bg-white/5"
                      }`}
                    >
                      <span className="block text-[14px] font-semibold text-white leading-snug">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-[12px] leading-snug text-white/55">
                        {item.description}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

type MobileMegaPanelProps = {
  activePanel: string | null;
  onPanelOpen: (label: string) => void;
  onPanelBack: () => void;
  onClose: () => void;
  panelSection?: MegaNavSection;
};

const MobileMegaPanel = ({
  activePanel,
  onPanelOpen,
  onPanelBack,
  onClose,
  panelSection,
}: MobileMegaPanelProps) => (
  <div className="lg:hidden border-t border-white/10 bg-[#030303] absolute inset-x-0 top-full h-[calc(100vh-108px)] overflow-hidden">
    {!activePanel ? (
      <div className="h-full overflow-y-auto px-5 py-6 space-y-2 fade-up">
        {megaNavSections.map((section) => (
          <button
            key={section.label}
            onClick={() => onPanelOpen(section.label)}
            className="w-full flex items-center justify-between rounded-xl px-5 py-4 text-left border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all"
          >
            <span className="text-[15px] font-semibold text-white">{section.label}</span>
            <ChevronRight className="h-4 w-4 text-white/45" />
          </button>
        ))}

        <a
          href="#pricing"
          onClick={onClose}
          className="w-full flex items-center justify-between rounded-xl px-5 py-4 text-left border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all"
        >
          <span className="text-[15px] font-semibold text-white">Pricing</span>
          <ChevronRight className="h-4 w-4 text-white/45" />
        </a>

        <div className="grid grid-cols-2 gap-3 pt-6">
          <a
            href="#contact"
            className="rounded-lg border border-white/15 px-4 py-3 text-center text-[14px] font-semibold text-white hover:bg-white/5 transition-colors"
            onClick={onClose}
          >
            Contact
          </a>
          <a
            href="#book"
            className="rounded-lg bg-[#d02030] hover:bg-[#f52b43] px-4 py-3 text-center text-[14px] font-semibold text-white transition-colors"
            onClick={onClose}
          >
            Book a Review
          </a>
        </div>
      </div>
    ) : panelSection ? (
      <div className="h-full flex flex-col fade-up">
        <div className="sticky top-0 z-10 flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-[#070303]">
          <button
            onClick={onPanelBack}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:bg-white/5 text-white transition-colors"
            aria-label="Back"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="text-[16px] font-semibold text-white">{panelSection.label}</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">
          {panelSection.columns?.map((column) => (
            <div key={column.title}>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                {column.title}
              </div>
              <ul className="space-y-1.5">
                {column.items.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      onClick={onClose}
                      className={`block rounded-lg px-4 py-3 transition-all ${
                        item.featured
                          ? "border border-[#d02030]/40 bg-[#d02030]/10"
                          : "border border-white/5 hover:border-white/15 hover:bg-white/5"
                      }`}
                    >
                      <div className="text-[14px] font-semibold text-white">
                        {item.title}
                      </div>
                      <div className="mt-1 text-[12px] leading-snug text-white/55">
                        {item.description}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ) : null}
  </div>
);

export default Header;
