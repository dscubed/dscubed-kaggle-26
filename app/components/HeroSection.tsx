/* ─── Center headline ─────────────────────────────────────────────────────── */

function MainHeadline() {
  return (
    <div className="absolute top-[25%] left-1/2 -translate-x-1/2 text-center w-full">
      <h1
        className="text-[135px] leading-[0.9] tracking-[-2px] uppercase text-white"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        Cybernetics
        <br />
        Reimagined
      </h1>
    </div>
  );
}

/* ─── Starburst SVG ───────────────────────────────────────────────────────── */

function Starburst() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="12" fill="#23d191" />
      <path d="M48 10 L52 10 L50 35 Z" fill="#23d191" />
      <path d="M48 90 L52 90 L50 65 Z" fill="#23d191" />
      <path d="M10 48 L10 52 L35 50 Z" fill="#23d191" />
      <path d="M90 48 L90 52 L65 50 Z" fill="#23d191" />
      <path d="M25 25 L28 22 L40 40 Z" fill="#23d191" />
      <path d="M75 75 L72 78 L60 60 Z" fill="#23d191" />
      <path d="M75 25 L78 28 L60 40 Z" fill="#23d191" />
      <path d="M25 75 L22 72 L40 60 Z" fill="#23d191" />
    </svg>
  );
}

/* ─── Center CTA row ──────────────────────────────────────────────────────── */

function CenterCTARow() {
  return (
    <div className="absolute top-[62%] left-[48%] -translate-x-1/2 flex items-center gap-[60px]">
      <Starburst />
      <p className="text-[14px] text-[#c2cfc9] leading-[1.6]">
        Across devices,
        <br />
        platforms, and tools
      </p>
      <button
        className="px-7 py-[14px] rounded-[4px] text-[14px] font-medium text-white cursor-pointer border border-[#23d191]"
        style={{
          background: "rgba(35, 209, 145, 0.1)",
          boxShadow: "inset 0 0 10px rgba(35, 209, 145, 0.2)",
        }}
      >
        Get Started
      </button>
    </div>
  );
}

/* ─── Bottom right stats ──────────────────────────────────────────────────── */

function StatBlock({
  heading,
  sub,
}: {
  heading: React.ReactNode;
  sub: string;
}) {
  return (
    <div>
      <h3
        className="text-[24px] leading-tight tracking-[0.5px] uppercase mb-2"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        {heading}
      </h3>
      <p className="text-[13px] text-[#c2cfc9] leading-[1.5] max-w-[150px]">
        {sub}
      </p>
    </div>
  );
}

function BottomRightStats() {
  return (
    <div className="absolute bottom-[60px] right-[60px] flex gap-[50px]">
      <StatBlock
        heading={
          <>
            500,000<sup className="text-[12px]">+</sup>
            <br />
            INTEGRATIONS
          </>
        }
        sub="Across devices, platforms, and tools"
      />
      <StatBlock
        heading={
          <>
            20<span className="text-[#23d191]">x</span> POWER
            <br />
            EFFICIENCY
          </>
        }
        sub="Operates smarter, not harder"
      />
    </div>
  );
}

/* ─── HeroSection ─────────────────────────────────────────────────────────── */

export default function HeroSection() {
  return (
    <div className="relative flex-1">
      <MainHeadline />
      <CenterCTARow />
      <BottomRightStats />
    </div>
  );
}
