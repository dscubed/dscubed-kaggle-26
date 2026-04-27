const FONT_MONO = { fontFamily: "var(--font-mono)" };

export default function Footer() {
  const year = new Date().getUTCFullYear();
  return (
    <footer className="relative max-w-400 mx-auto px-5 md:px-12 py-8 w-full border-t border-white/5">
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] tracking-[2px] uppercase text-white/40"
        style={FONT_MONO}
      >
        <span>
          © {year} DSCubed ·{" "}
          <span className="text-[#23d191]/70">
            Data Science Student Society
          </span>
        </span>
        <span className="text-white/30">MARKET CLOSED · EOF</span>
      </div>
    </footer>
  );
}
