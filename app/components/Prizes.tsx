"use client";

import { useEffect, useState } from "react";

const FONT_MONO = { fontFamily: "var(--font-mono)" };

function useUtcClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(time.getUTCHours())}:${pad(time.getUTCMinutes())}:${pad(time.getUTCSeconds())}`;
}

function WifiIcon() {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      className="opacity-80"
    >
      <path d="M8 10.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#20beff" />
      <path
        d="M5.17 8.17a4 4 0 0 1 5.66 0"
        stroke="#20beff"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M2.93 5.93a7 7 0 0 1 10.14 0"
        stroke="#20beff"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      className="opacity-80"
    >
      <rect
        x="0.5"
        y="0.5"
        width="18"
        height="11"
        rx="2"
        stroke="#20beff"
        strokeWidth="1"
      />
      <rect
        x="19"
        y="3.5"
        width="2.5"
        height="5"
        rx="1"
        fill="#20beff"
        opacity="0.6"
      />
      <rect x="2" y="2" width="14" height="8" rx="1" fill="#20beff" />
    </svg>
  );
}

type Row = {
  rank: number;
  team: string[] | null;
  score: number | null;
  profit: number | null;
  prize: number | null;
};

const LEADERBOARD_ROWS: Row[] = [
  { rank: 1, team: null, score: null, profit: null, prize: 400 },
  { rank: 2, team: null, score: null, profit: null, prize: 300 },
  { rank: 3, team: null, score: null, profit: null, prize: 150 },
  { rank: 4, team: null, score: null, profit: null, prize: null },
  { rank: 5, team: null, score: null, profit: null, prize: null },
];

function fmt(n: number, dp = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });
}

function TeamCell({ members }: { members: string[] | null }) {
  if (!members) {
    return <span className="text-white/30 italic">TBD</span>;
  }
  return (
    <div className="flex flex-col leading-tight">
      <span className="text-white hidden md:inline">{members.join(" · ")}</span>
      <span className="md:hidden text-white flex flex-col">
        {members.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </span>
    </div>
  );
}

function LeaderboardRow({ row }: { row: Row }) {
  const isWinner = row.prize !== null;
  const tone = isWinner ? "text-[#20beff]" : "text-[#c2cfc9]";
  const flash = row.rank === 1 ? "bg-[#20beff]/[0.04]" : "";
  return (
    <>
      {/* Desktop row */}
      <div
        className={`hidden md:grid grid-cols-[50px_1fr_120px_140px] items-center gap-4 px-5 py-3 border-b border-white/5 ${flash} hover:bg-white/[0.02] transition-colors`}
        style={FONT_MONO}
      >
        <span className={`text-[13px] ${tone}`}>
          {String(row.rank).padStart(2, "0")}
        </span>
        <span className="text-[13px]">
          <TeamCell members={row.team} />
        </span>
        <span className={`text-[13px] text-right tabular-nums ${tone}`}>
          {row.score !== null ? fmt(row.score, 4) : "—"}
        </span>
        <span className="text-[13px] text-right tabular-nums text-[#20beff]">
          {row.profit !== null ? `+$${fmt(row.profit)}` : "—"}
        </span>
      </div>

      {/* Mobile row — columnar */}
      <div
        className={`md:hidden grid grid-cols-[20px_1fr_48px_72px] items-start gap-x-2 gap-y-0 px-4 py-3 border-b border-white/5 ${flash}`}
        style={FONT_MONO}
      >
        <span className={`text-[11px] ${tone} tabular-nums pt-0.5`}>
          {String(row.rank).padStart(2, "0")}
        </span>
        <span className="text-[11px]">
          <TeamCell members={row.team} />
        </span>
        <span className={`text-[11px] tabular-nums ${tone}`}>
          {row.score !== null ? fmt(row.score, 4) : "—"}
        </span>
        <span className="text-[11px] tabular-nums text-[#20beff]">
          {row.profit !== null ? `+$${fmt(row.profit)}` : "—"}
        </span>
      </div>
    </>
  );
}

function LoadingRows() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const id = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex items-center justify-center py-3 text-[10px] border-[#20beff]/20 bg-black/15 text-[#20beff] tracking-[2px] uppercase"
      style={FONT_MONO}
    >
      Loading <span className="w-[18px] text-left inline-block">{dots}</span>
    </div>
  );
}

function TickerStrip() {
  const tickers = [
    ["AAPL", "+1.24%"],
    ["NVDA", "+3.88%"],
    ["TSLA", "-0.72%"],
    ["MSFT", "+0.41%"],
    ["GOOG", "+2.10%"],
    ["AMZN", "-1.15%"],
    ["META", "+0.98%"],
    ["JPM", "+0.33%"],
  ];
  return (
    <div
      className="flex items-center gap-6 px-5 py-2 border-b border-white/10 overflow-hidden whitespace-nowrap text-[11px]"
      style={FONT_MONO}
    >
      {tickers.map(([sym, chg]) => {
        const up = chg.startsWith("+");
        return (
          <span key={sym} className="flex items-center gap-2">
            <span className="text-white/60">{sym}</span>
            <span className={up ? "text-[#20beff]" : "text-[#ff5c7a]"}>
              {chg}
            </span>
          </span>
        );
      })}
    </div>
  );
}

function MedalSVG({ place }: { place: number }) {
  const colors = {
    1: { outer: "#FFD700", inner: "#FFC700", shine: "#FFED4E" },
    2: { outer: "#C0C0C0", inner: "#A8A8A8", shine: "#E8E8E8" },
    3: { outer: "#CD7F32", inner: "#B87333", shine: "#E6B87D" },
  };
  const color = colors[place as keyof typeof colors];
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 48 48"
      fill="none"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id={`medal-${place}`} cx="35%" cy="35%">
          <stop offset="0%" stopColor={color.shine} />
          <stop offset="50%" stopColor={color.outer} />
          <stop offset="100%" stopColor={color.inner} />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill={`url(#medal-${place})`} />
      <circle
        cx="24"
        cy="24"
        r="22"
        fill="none"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="1"
      />
    </svg>
  );
}

const prizes = [
  {
    place: 2,
    amount: "300",
    merch: "IMC MERCH",
    heightMobile: "70px",
    heightDesktop: "120px",
    rayHeightMobile: "40px",
    rayHeightDesktop: "70px",
  },
  {
    place: 1,
    amount: "400",
    merch: "IMC MERCH",
    heightMobile: "100px",
    heightDesktop: "160px",
    rayHeightMobile: "60px",
    rayHeightDesktop: "100px",
  },
  {
    place: 3,
    amount: "200",
    merch: "IMC MERCH",
    heightMobile: "50px",
    heightDesktop: "90px",
    rayHeightMobile: "30px",
    rayHeightDesktop: "50px",
  },
];

export default function Prizes() {
  const utc = useUtcClock();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    const listener = () => checkMobile();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);
  return (
    <section
      id="prizes"
      className="relative max-w-400 mx-auto px-4 md:px-12 py-12 md:py-16 md:pb-32 w-full overflow-visible"
    >
      {/* ── Prizes subsection ── */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[11px] tracking-[3px] uppercase text-[#20beff]"
          style={FONT_MONO}
        >
          {"// PRIZES_LEADERBOARD"}
        </span>
        <span className="h-px flex-1 bg-[#20beff]/20" />
      </div>

      <h2
        className="text-3xl md:text-6xl leading-[0.95] uppercase text-white mb-8 md:mb-12"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        Prize Pool
      </h2>

      {/* Podium Container */}
      <div
        className="relative perspective flex flex-col gap-4 justify-end items-center mb-12"
        style={{
          perspective: "1200px",
          minHeight: isMobile ? "340px" : "480px",
        }}
      >
        {/* Podium bases */}
        <div
          className="relative flex items-end justify-center gap-2 md:gap-4 lg:gap-8"
          style={{
            width: "100%",
            overflow: "visible",
            minHeight: isMobile ? "170px" : "260px",
          }}
        >
          {prizes.map((prize) => (
            <div key={prize.place} className="relative">
              {/* Light ray upward */}
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 pointer-events-none"
                style={{
                  height: isMobile
                    ? prize.rayHeightMobile
                    : prize.rayHeightDesktop,
                  background: `linear-gradient(to top, rgba(32,190,255,0.7) 0%, rgba(32,190,255,0.25) 100%)`,
                  filter: "blur(0.5px)",
                  boxShadow: "0 0 8px rgba(32,190,255,0.6)",
                }}
              />

              {/* Prize card */}
              <div
                className="absolute bottom-full -translate-x-1/2 left-1/2 w-28 md:w-30 lg:w-40 text-center pointer-events-auto"
                style={{
                  bottom: `calc(100% + ${isMobile ? prize.rayHeightMobile : prize.rayHeightDesktop})`,
                }}
              >
                <div
                  className="rounded-sm border border-[#20beff]/40 bg-[#020d1a]/90 backdrop-blur-sm shadow-[0_0_30px_rgba(32,190,255,0.2)_inset,0_0_40px_rgba(32,190,255,0.15)] p-2 md:p-3"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(32,190,255,0.02) 0px, rgba(32,190,255,0.02) 1px, transparent 1px, transparent 3px)",
                  }}
                >
                  <div
                    className="text-[8px] md:text-[9px] tracking-[1.5px] uppercase text-[#20beff] mb-0.5 md:mb-1"
                    style={FONT_MONO}
                  >
                    {prize.place === 1
                      ? "1st"
                      : prize.place === 2
                        ? "2nd"
                        : "3rd"}
                  </div>

                  <div className="flex justify-center mb-1 md:mb-2 w-6 h-6 md:w-8 md:h-8 mx-auto">
                    <MedalSVG place={prize.place} />
                  </div>

                  <div className="text-xs md:text-sm font-bold font-mono text-white mb-0.5">
                    +${prize.amount}
                  </div>
                  <div
                    className="text-[7px] md:text-[8px] tracking-[0.5px] uppercase text-white/60"
                    style={FONT_MONO}
                  >
                    + {prize.merch}
                  </div>
                </div>
              </div>

              {/* Podium base */}
              <div
                className="rounded-sm border border-[#20beff]/30 w-28 md:w-40 transition-all hover:border-[#20beff]/50 hover:shadow-[0_0_20px_rgba(32,190,255,0.2)]"
                style={{
                  height: isMobile ? prize.heightMobile : prize.heightDesktop,
                  background: `linear-gradient(to bottom, rgba(32,190,255,0.12) 0%, rgba(32,190,255,0.05) 100%)`,
                  borderRadius: "8px",
                  boxShadow:
                    "0 0 12px rgba(32,190,255,0.08), inset 0 0 8px rgba(32,190,255,0.05)",
                }}
              />
            </div>
          ))}
        </div>

        {/* All attendees Jane Street notification banner */}
        <div
          className="relative w-full"
          style={{ width: "100%", maxWidth: "550px", marginTop: "0px" }}
        >
          <div
            className="rounded-lg border border-[#20beff]/30 bg-[#020d1a]/95 backdrop-blur-md p-3 md:p-5 shadow-[0_0_30px_rgba(32,190,255,0.15)_inset]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(32,190,255,0.02) 0px, rgba(32,190,255,0.02) 1px, transparent 1px, transparent 3px)",
            }}
          >
            {/* Header row: logo + title + timestamp */}
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="bg-white rounded-md p-1 md:p-2 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center flex-shrink-0">
                  <img
                    src="/janestreet.svg"
                    alt="Jane Street"
                    className="sm:size-4 md:size-5 object-contain"
                  />
                </div>
                <div
                  className="text-[9px] md:text-[11px] tracking-[2px] uppercase font-bold text-white"
                  style={FONT_MONO}
                >
                  Jane Street
                </div>
              </div>
              <div
                className="text-[8px] md:text-[10px] tracking-[1px] uppercase text-white/50"
                style={FONT_MONO}
              >
                Now
              </div>
            </div>

            {/* Message */}
            <div className="text-[10px] md:text-[14px] text-white/80 leading-relaxed">
              We also have Jane Street merch available for all participating
              attendees!
            </div>
          </div>
        </div>
      </div>

      <h2
        className="text-3xl md:text-6xl leading-[0.95] uppercase text-white mb-8 md:mb-12"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        Leaderboard
      </h2>

      <div
        className="relative rounded-md border border-[#20beff]/25 bg-[#020d1a]/90 shadow-[0_0_40px_rgba(32,190,255,0.08)_inset,0_0_60px_rgba(0,0,0,0.6)] overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(32,190,255,0.04) 0px, rgba(32,190,255,0.04) 1px, transparent 1px, transparent 3px)",
        }}
      >
        {/* Bezel header */}
        <div
          className="flex items-center justify-between px-5 py-2 border-b border-[#20beff]/20 bg-black/40"
          style={FONT_MONO}
        >
          <div className="flex items-center gap-3 text-[11px] tracking-[2px] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#20beff] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#20beff]" />
            </span>
            <span className="text-[#20beff]">LIVE</span>
            <span className="text-white/30 hidden sm:inline">·</span>
            <span className="text-white/50 hidden sm:inline">
              DSCUBED::KAGGLE/26
            </span>
          </div>
          <div className="flex items-center gap-3">
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        <TickerStrip />

        {/* Column headers — desktop */}
        <div
          className="hidden md:grid grid-cols-[50px_1fr_120px_140px] items-center gap-4 px-5 py-2 border-b border-white/10 text-[10px] tracking-[2px] uppercase text-white/40"
          style={FONT_MONO}
        >
          <span>#</span>
          <span>Team</span>
          <span className="text-right">Score</span>
          <span className="text-right">Profit (USD)</span>
        </div>
        {/* Column headers — mobile */}
        <div
          className="md:hidden grid grid-cols-[20px_1fr_48px_72px] items-center gap-x-2 px-4 py-2 border-b border-white/10 text-[10px] tracking-[2px] uppercase text-white/40"
          style={FONT_MONO}
        >
          <span>#</span>
          <span>Team</span>
          <span>Score</span>
          <span>Profit</span>
        </div>

        {/* Rows */}
        <div>
          {LEADERBOARD_ROWS.map((r) => (
            <LeaderboardRow key={r.rank} row={r} />
          ))}
        </div>

        <LoadingRows />

        {/* Bezel footer */}
        <div
          className="flex items-center justify-between px-5 py-2 border-t border-[#20beff]/20 bg-black/40 text-[10px] tracking-[2px] uppercase"
          style={FONT_MONO}
        >
          <span className="text-white/30">PAGE 01 / 01</span>
          <div className="flex items-center gap-2 text-white/40">
            <span className="hidden sm:block">SESSION 04</span>
            <span className="text-white/20 hidden sm:block">·</span>
            <span className="tabular-nums text-[#20beff]/70">UTC {utc}</span>
          </div>
          <span className="text-white/30">FEED OK</span>
        </div>
      </div>
    </section>
  );
}
