type Row = {
  rank: number;
  team: string[];
  score: number;
  profit: number;
  prize: number | null;
};

const ROWS: Row[] = [
  {
    rank: 1,
    team: ["A. Nakamura", "J. Patel"],
    score: 0.9421,
    profit: 18420.55,
    prize: 200,
  },
  { rank: 2, team: ["L. Okafor"], score: 0.9188, profit: 15233.1, prize: 150 },
  {
    rank: 3,
    team: ["M. Chen", "S. Rossi", "K. Dubois"],
    score: 0.9042,
    profit: 13988.72,
    prize: 100,
  },
  {
    rank: 4,
    team: ["R. Ahmed", "T. Volkov"],
    score: 0.8876,
    profit: 11204.3,
    prize: null,
  },
  {
    rank: 5,
    team: ["E. Bianchi"],
    score: 0.8731,
    profit: 9876.44,
    prize: null,
  },
  {
    rank: 6,
    team: ["H. Tanaka", "D. Park"],
    score: 0.8502,
    profit: 8211.09,
    prize: null,
  },
  { rank: 7, team: ["N. Schmidt"], score: 0.839, profit: 6540.21, prize: null },
  {
    rank: 8,
    team: ["O. Ivanov", "Y. Sato", "P. Rao", "V. Costa"],
    score: 0.8124,
    profit: 4123.88,
    prize: null,
  },
];

const FONT_MONO = { fontFamily: "var(--font-mono)" };

function fmt(n: number, dp = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });
}

function TeamCell({ members }: { members: string[] }) {
  return (
    <div className="flex flex-col leading-tight">
      <span className="text-white">{members.join(" · ")}</span>
    </div>
  );
}

function LeaderboardRow({ row }: { row: Row }) {
  const isWinner = row.prize !== null;
  const tone = isWinner ? "text-[#23d191]" : "text-[#c2cfc9]";
  const flash = row.rank === 1 ? "bg-[#23d191]/[0.04]" : "";
  return (
    <div
      className={`grid grid-cols-[50px_1fr_120px_140px_120px] items-center gap-4 px-5 py-3 border-b border-white/5 ${flash} hover:bg-white/[0.02] transition-colors`}
      style={FONT_MONO}
    >
      <span className={`text-[13px] ${tone}`}>
        {String(row.rank).padStart(2, "0")}
      </span>
      <span className="text-[13px]">
        <TeamCell members={row.team} />
      </span>
      <span className={`text-[13px] text-right tabular-nums ${tone}`}>
        {fmt(row.score, 4)}
      </span>
      <span className="text-[13px] text-right tabular-nums text-[#23d191]">
        +${fmt(row.profit)}
      </span>
      <span
        className={`text-[13px] text-right tabular-nums ${
          isWinner ? "text-white" : "text-white/20"
        }`}
      >
        {row.prize !== null ? `$${row.prize}.00` : "—"}
      </span>
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
  return (
    <section className="relative max-w-400 mx-auto px-12 pb-32 w-full">
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[11px] tracking-[3px] uppercase text-[#23d191]"
          style={FONT_MONO}
        >
          // PRIZES_LEADERBOARD
        </span>
        <span className="h-px flex-1 bg-[#23d191]/20" />
      </div>

      <h2
        className="text-6xl leading-[0.95] uppercase text-white mb-8"
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
            <span className="text-white/30">·</span>
            <span className="text-white/50">DSCUBED::KAGGLE/26</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-white/40 tracking-[2px] uppercase">
            <span>SESSION 04</span>
            <span>·</span>
            <span>UTC 14:22:07</span>
          </div>
        </div>

        <TickerStrip />

        {/* Column headers */}
        <div
          className="grid grid-cols-[50px_1fr_120px_140px_120px] items-center gap-4 px-5 py-2 border-b border-white/10 text-[10px] tracking-[2px] uppercase text-white/40"
          style={FONT_MONO}
        >
          <span>#</span>
          <span>Team</span>
          <span className="text-right">Score</span>
          <span className="text-right">Profit (USD)</span>
          <span className="text-right">Prize</span>
        </div>

        {/* Rows */}
        <div>
          {ROWS.map((r) => (
            <LeaderboardRow key={r.rank} row={r} />
          ))}
        </div>

        {/* Bezel footer */}
        <div
          className="flex items-center justify-between px-5 py-2 border-t border-[#23d191]/20 bg-black/40 text-[10px] tracking-[2px] uppercase text-white/30"
          style={FONT_MONO}
        >
          <span>PAGE 01 / 01</span>
          <span>▲ AUTO-REFRESH · 5s</span>
          <span>FEED OK</span>
        </div>
      </div>
    </section>
  );
}
