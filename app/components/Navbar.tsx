"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

function NavLinks({ active }: { active: string }) {
  return (
    <nav className="flex gap-8">
      {NAV_LINKS.map(({ label, href }) => {
        const id = href.slice(1);
        const isActive = active === id;
        return (
          <a
            key={label}
            href={href}
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

export default function Navbar() {
  const active = useActiveSection();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4.5 border-b border-white/5 backdrop-blur-xl px-12 bg-black/20">
      <div className="flex items-center gap-12">
        <Logo />
        <NavLinks active={active} />
      </div>
      <ContactButton />
    </header>
  );
}
