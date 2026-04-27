"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about", sub: "Competition overview" },
  { label: "Prizes", href: "#leaderboard", sub: "Prizes and Leaderboard" },
  { label: "Timeline", href: "#timeline", sub: "Key dates" },
  { label: "Workshops", href: "#workshops", sub: "Learning sessions" },
  { label: "Team", href: "#team", sub: "Meet the organisers" },
  { label: "FAQ", href: "#faq", sub: "Common questions" },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

const FONT_MONO = { fontFamily: "var(--font-mono)" };

function useActiveSection() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);
  return active;
}

function Logo() {
  return (
    <Link href="https://dscubed.org.au" className="flex items-center gap-2">
      <svg
        width="135"
        height="157"
        viewBox="0 0 135 157"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
      >
        <path
          d="M111.282 53.2729L94.4429 62.9744V94.0229L67.4985 109.546L40.5569 94.0229V62.9744L67.4985 47.4515V28.0486L23.718 53.2729V103.724L67.4985 128.952L111.282 103.724V53.2729Z"
          fill="currentColor"
        />
        <path
          d="M134.857 117.309L118.018 107.607L67.4985 136.714L16.982 107.607V49.3928L67.4985 20.2857L118.018 49.3928L134.857 39.6914L67.4985 0.880005L0.143066 39.6914V117.309L67.4985 156.117L134.857 117.309Z"
          fill="currentColor"
        />
      </svg>
    </Link>
  );
}

function HamburgerButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-center items-center gap-[5px] h-9 w-9 cursor-pointer rounded-sm border border-white/10 hover:border-[#20beff]/40 transition-colors duration-200"
      aria-label="Toggle menu"
    >
      <span
        className={`block h-[1.5px] w-4 bg-white transition-all duration-200 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
      />
      <span
        className={`block h-[1.5px] w-4 bg-white transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
      />
      <span
        className={`block h-[1.5px] w-4 bg-white transition-all duration-200 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
      />
    </button>
  );
}

function NavButton() {
  return (
    <Link
      href="https://events.humanitix.com/dscubed-2026-kaggle-competition"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className="flex items-center px-5 py-[9px] rounded-sm cursor-pointer text-[12px] tracking-wide font-mono font-bold border text-[#20beff] border-[#20beff]/25 bg-[#020d1a]/90 transition-opacity duration-200 hover:opacity-90">
        JOIN NOW
      </button>
    </Link>
  );
}

function Sidebar({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: string;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(2,6,15,0.55)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full z-[70] flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{
          width: "min(340px, 90vw)",
          background:
            "linear-gradient(160deg, rgba(10,20,40,0.98) 0%, rgba(2,6,15,0.99) 60%)",
          borderLeft: "1px solid rgba(32,190,255,0.15)",
          boxShadow:
            "-8px 0 40px rgba(0,0,0,0.6), inset -1px 0 0 rgba(32,190,255,0.05)",
        }}
      >
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 4px)",
          }}
        />

        {/* Top bar */}
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-[#20beff]/10">
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[10px] tracking-[3px] uppercase text-[#20beff]/60"
              style={FONT_MONO}
            >
              {"// KAGGLE_COMPETITION"}
            </span>
            <span
              className="text-[9px] tracking-[2px] uppercase text-white/20"
              style={FONT_MONO}
            >
              v2026 · DSCubed
            </span>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-sm border border-white/10 hover:border-[#20beff]/40 text-white/50 hover:text-white transition-colors duration-150 cursor-pointer text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Nav items */}
        <nav className="relative flex-1 flex flex-col px-4 py-6 gap-1 overflow-y-auto">
          {NAV_LINKS.map(({ label, href, sub }, i) => {
            const id = href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={label}
                href={href}
                onClick={onClose}
                className="group relative flex items-center gap-4 px-4 py-3.5 rounded-sm transition-all duration-200 hover:bg-[#20beff]/5"
                style={isActive ? { background: "rgba(32,190,255,0.08)" } : {}}
              >
                {/* Active left bar */}
                <span
                  className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full transition-all duration-200"
                  style={{ background: isActive ? "#20beff" : "transparent" }}
                />

                {/* Index */}
                <span
                  className="text-[10px] w-6 shrink-0 text-right tabular-nums"
                  style={{
                    ...FONT_MONO,
                    color: isActive ? "#20beff" : "rgba(255,255,255,0.2)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Divider tick */}
                <span
                  className="w-px h-6 shrink-0"
                  style={{
                    background: isActive
                      ? "rgba(32,190,255,0.4)"
                      : "rgba(255,255,255,0.08)",
                  }}
                />

                {/* Label + sub */}
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-[13px] font-medium tracking-[0.5px] uppercase transition-colors duration-200"
                    style={{
                      color: isActive ? "#20beff" : "rgba(255,255,255,0.85)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-[10px] tracking-[1px]"
                    style={{ ...FONT_MONO, color: "rgba(255,255,255,0.25)" }}
                  >
                    {sub}
                  </span>
                </div>

                {/* Arrow */}
                <span
                  className="ml-auto text-xs transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                  style={{ color: "#20beff" }}
                >
                  →
                </span>
              </a>
            );
          })}
        </nav>

        {/* Bottom status bar */}
        <div className="relative px-6 py-4 border-t border-[#20beff]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#20beff] animate-pulse" />
            <span
              className="text-[9px] tracking-[2px] uppercase text-white/25"
              style={FONT_MONO}
            >
              Live
            </span>
          </div>
          <span
            className="text-[9px] tracking-[2px] uppercase text-white/20"
            style={FONT_MONO}
          >
            Kaggle · 2026
          </span>
        </div>

        {/* Corner brackets */}
        <span className="absolute top-3 left-3 h-3 w-3 border-t border-l border-[#20beff]/30" />
        <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#20beff]/30" />
      </aside>
    </>
  );
}

export default function Navbar() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center py-4 border-b border-transparent px-5 md:px-12">
        <Logo />
        <div className="flex items-center gap-3">
          <NavButton />
          <HamburgerButton
            open={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </header>

      <Sidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        active={active}
      />
    </>
  );
}
