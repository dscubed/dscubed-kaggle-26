"use client";

import { useEffect, useState } from "react";

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
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" className="opacity-80">
      <path d="M8 10.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#23d191" />
      <path d="M5.17 8.17a4 4 0 0 1 5.66 0" stroke="#23d191" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
      <path d="M2.93 5.93a7 7 0 0 1 10.14 0" stroke="#23d191" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" className="opacity-80">
      <rect x="0.5" y="0.5" width="18" height="11" rx="2" stroke="#23d191" strokeWidth="1" />
      <rect x="19" y="3.5" width="2.5" height="5" rx="1" fill="#23d191" opacity="0.6" />
      <rect x="2" y="2" width="14" height="8" rx="1" fill="#23d191" />
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

const ROWS: Row[] = [
  { rank: 1, team: null, score: null, profit: null, prize: 200 },
  { rank: 2, team: null, score: null, profit: null, prize: 150 },
  { rank: 3, team: null, score: null, profit: null, prize: 100 },
  { rank: 4, team: null, score: null, profit: null, prize: null },
  { rank: 5, team: null, score: null, profit: null, prize: null },
];

const FONT_MONO = { fontFamily: "var(--font-mono)" };

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
  const tone = isWinner ? "text-[#23d191]" : "text-[#c2cfc9]";
  const flash = row.rank === 1 ? "bg-[#23d191]/[0.04]" : "";
  return (
    <>
      {/* Desktop row */}
      <div
        className={`hidden md:grid grid-cols-[50px_1fr_120px_140px_120px] items-center gap-4 px-5 py-3 border-b border-white/5 ${flash} hover:bg-white/[0.02] transition-colors`}
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
        <span className="text-[13px] text-right tabular-nums text-[#23d191]">
          {row.profit !== null ? `+$${fmt(row.profit)}` : "—"}
        </span>
        <span
          className={`text-[13px] text-right tabular-nums ${
            isWinner ? "text-white" : "text-white/20"
          }`}
        >
          {row.prize !== null ? `$${row.prize}.00` : "—"}
        </span>
      </div>

      {/* Mobile row — columnar */}
      <div
        className={`md:hidden grid grid-cols-[20px_1fr_48px_72px_36px] items-start gap-x-2 gap-y-0 px-4 py-3 border-b border-white/5 ${flash}`}
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
        <span className="text-[11px] tabular-nums text-[#23d191]">
          {row.profit !== null ? `+$${fmt(row.profit)}` : "—"}
        </span>
        <span
          className={`text-[11px] tabular-nums text-center ${
            isWinner ? "text-white" : "text-white/20"
          }`}
        >
          {row.prize !== null ? `$${row.prize}` : "—"}
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
      className="flex items-center justify-center py-3 text-[10px] border-[#23d191]/20 bg-black/15 text-[#23d191] tracking-[2px] uppercase"
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
            <span className={up ? "text-[#23d191]" : "text-[#ff5c7a]"}>
              {chg}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function Leaderboard() {
  const utc = useUtcClock();
  return (
    <section
      id="prizes"
      className="relative max-w-400 mx-auto px-5 md:px-12 pb-16 md:pb-32 w-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[11px] tracking-[3px] uppercase text-[#23d191]"
          style={FONT_MONO}
        >
          {"// PRIZES_AND_LEADERBOARD"}
        </span>
        <span className="h-px flex-1 bg-[#23d191]/20" />
      </div>

      <h2
        className="text-4xl md:text-6xl leading-[0.95] uppercase text-white mb-8"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        Prizes & Leaderboard
      </h2>

      {/* Display tablet */}
      <div
        className="relative rounded-md border border-[#23d191]/25 bg-[#02120a]/90 shadow-[0_0_40px_rgba(35,209,145,0.08)_inset,0_0_60px_rgba(0,0,0,0.6)] overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(35,209,145,0.04) 0px, rgba(35,209,145,0.04) 1px, transparent 1px, transparent 3px)",
        }}
      >
        {/* Bezel header */}
        <div
          className="flex items-center justify-between px-5 py-2 border-b border-[#23d191]/20 bg-black/40"
          style={FONT_MONO}
        >
          <div className="flex items-center gap-3 text-[11px] tracking-[2px] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#23d191] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#23d191]" />
            </span>
            <span className="text-[#23d191]">LIVE</span>
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
          className="hidden md:grid grid-cols-[50px_1fr_120px_140px_120px] items-center gap-4 px-5 py-2 border-b border-white/10 text-[10px] tracking-[2px] uppercase text-white/40"
          style={FONT_MONO}
        >
          <span>#</span>
          <span>Team</span>
          <span className="text-right">Score</span>
          <span className="text-right">Profit (USD)</span>
          <span className="text-right">Prize</span>
        </div>
        {/* Column headers — mobile */}
        <div
          className="md:hidden grid grid-cols-[20px_1fr_48px_72px_36px] items-center gap-x-2 px-4 py-2 border-b border-white/10 text-[10px] tracking-[2px] uppercase text-white/40"
          style={FONT_MONO}
        >
          <span>#</span>
          <span>Team</span>
          <span>Score</span>
          <span>Profit</span>
          <span className="text-center">Prize</span>
        </div>

        {/* Rows */}
        <div>
          {ROWS.map((r) => (
            <LeaderboardRow key={r.rank} row={r} />
          ))}
        </div>

        <LoadingRows />

        {/* Bezel footer */}
        <div
          className="flex items-center justify-between px-5 py-2 border-t border-[#23d191]/20 bg-black/40 text-[10px] tracking-[2px] uppercase"
          style={FONT_MONO}
        >
          <span className="text-white/30">PAGE 01 / 01</span>
          <div className="flex items-center gap-2 text-white/40">
            <span>SESSION 04</span>
            <span className="text-white/20">·</span>
            <span className="tabular-nums text-[#23d191]/70">UTC {utc}</span>
          </div>
          <span className="text-white/30">FEED OK</span>
        </div>
      </div>
    </section>
  );
}
