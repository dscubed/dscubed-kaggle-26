"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Theme", href: "#theme" },
  { label: "Prizes", href: "#prizes" },
  { label: "Timeline", href: "#timeline" },
  { label: "Workshops", href: "#workshops" },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

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
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
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
    <Link
      href="https://dscubed.org.au"
      className="flex items-center gap-2 text-xl font-bold tracking-[0.5px]"
    >
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

function NavLinks({ active, onClickLink }: { active: string; onClickLink?: () => void }) {
  return (
    <nav className="flex gap-8">
      {NAV_LINKS.map(({ label, href }) => {
        const id = href.slice(1);
        const isActive = active === id;
        return (
          <a
            key={label}
            href={href}
            onClick={onClickLink}
            className={`relative text-[11px] font-medium tracking-[1px] uppercase transition-colors pb-[3px] ${
              isActive ? "text-[#23d191]" : "text-white hover:text-[#23d191]"
            }`}
          >
            {label}
            <span
              className={`absolute bottom-0 left-0 h-px bg-[#23d191] transition-all duration-300 ${
                isActive ? "w-full opacity-100" : "w-0 opacity-0"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}

function ContactButton() {
  return (
    <button
      className="flex items-center gap-2 px-5 py-[10px] rounded-[4px] font-semibold text-[13px] text-black cursor-pointer"
      style={{
        background: "linear-gradient(135deg, #2ddb9b 0%, #159b6b 100%)",
      }}
    >
      Sign up
    </button>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="text-white"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}

function MobileDrawer({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: string;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-[#02120a]/95 backdrop-blur-xl border-l border-white/10 transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-[11px] tracking-[2px] uppercase text-[#23d191]">
            Navigation
          </span>
          <button onClick={onClose} className="cursor-pointer" aria-label="Close menu">
            <HamburgerIcon open />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={label}
                href={href}
                onClick={onClose}
                className={`block px-4 py-3 rounded-sm text-sm font-medium tracking-[1px] uppercase transition-colors ${
                  isActive
                    ? "text-[#23d191] bg-[#23d191]/10"
                    : "text-white hover:text-[#23d191] hover:bg-white/[0.03]"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>
        <div className="px-4 pt-2">
          <ContactButton />
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const active = useActiveSection();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-3 md:py-4.5 border-b border-white/5 backdrop-blur-xl px-5 md:px-12 bg-black/20">
        <Logo />
        <div className="hidden md:flex items-center gap-12">
          <NavLinks active={active} />
        </div>
        <div className="hidden md:block">
          <ContactButton />
        </div>
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <HamburgerIcon open={false} />
        </button>
      </header>
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} active={active} />
    </>
  );
}
