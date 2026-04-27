import { Mail } from "lucide-react";
import Link from "next/link";
import { FaDiscord, FaInstagram, FaLinkedin } from "react-icons/fa";

const FONT_MONO = { fontFamily: "var(--font-mono)" };

export default function Footer() {
  const year = new Date().getUTCFullYear();
  return (
    <footer className="relative max-w-400 mx-auto px-5 md:px-12 py-8 w-full border-t border-white/5 bg-black/15">
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[9px] sm:text-[11px] tracking-[2px] uppercase text-white/40"
        style={FONT_MONO}
      >
        <span>
          © {year} DSCubed ·{" "}
          <span className="text-[#23d191]/70">
            Data Science Student Society
          </span>
        </span>
        <div className="flex gap-4 sm:gap-6 text-[#23d191]/70">
          <Link
            href="mailto:outreach@dscubed.org.au"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={18} />
          </Link>
          <Link
            href="https://discord.gg/Q3gZcPQV63"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord size={18} />
          </Link>
          <Link
            href="https://www.instagram.com/dscubed.unimelb/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={18} />
          </Link>
          <Link
            href="https://www.linkedin.com/company/dscubed/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
