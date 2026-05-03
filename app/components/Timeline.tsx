"use client";

import { useEffect, useState } from "react";

type Status = "CLOSED" | "UPCOMING" | "LIVE";

type Entry = {
  /** ISO 8601 with offset — event start */
  start: string;
  /** ISO 8601 with offset — event end (defines LIVE window) */
  end: string;
  location: string;
  title: string;
};

const EVENT_TIMELINE: Entry[] = [
  {
    start: "2026-05-07T17:00:00+10:00",
    end: "2026-05-07T19:00:00+10:00",
    location: "Alan Gilbert Building · L1-124",
    title: "Beginner Friendly Workshop",
  },
  {
    start: "2026-05-09T10:00:00+10:00",
    end: "2026-05-09T15:00:00+10:00",
    location: "Arts West Building · Forum Theatre",
    title: "Competition Day",
  },
];

const COMPETITION_DAY: Entry[] = [
  {
    start: "2026-05-09T10:30:00+10:00",
    end: "2026-05-09T11:00:00+10:00",
    location: "Arts West Building · Forum Theatre",
    title: "Team Registration & Setup",
  },
  {
    start: "2026-05-09T10:30:00+10:00",
    end: "2026-05-09T11:00:00+10:00",
    location: "Arts West Building · Forum Theatre",
    title: "Introduction · Welcome + Datasets Presentation",
  },
  {
    start: "2026-05-09T11:00:00+10:00",
    end: "2026-05-09T14:00:00+10:00",
    location: "Arts West Building · Forum Theatre",
    title: "Coding Time · Build your models",
  },
  {
    start: "2026-05-09T14:00:00+10:00",
    end: "2026-05-09T14:30:00+10:00",
    location: "Arts West Building · Forum Theatre",
    title: "Judging Time · Food & Networking",
  },
  {
    start: "2026-05-09T14:30:00+10:00",
    end: "2026-05-09T14:30:00+10:00",
    location: "Arts West Building · Forum Theatre",
    title: "Closing Ceremony · Prizes & Awards",
  },
];

const FONT_MONO = { fontFamily: "var(--font-mono)" };

const TZ = "Australia/Melbourne";

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  timeZone: TZ,
  month: "short",
  day: "2-digit",
});
const TIME_FMT = new Intl.DateTimeFormat("en-GB", {
  timeZone: TZ,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatDate(iso: string) {
  return DATE_FMT.format(new Date(iso)).toUpperCase();
}
function formatTime(iso: string) {
  return TIME_FMT.format(new Date(iso));
}

function getStatus(entry: Entry, now: number | null): Status {
  if (now === null) return "UPCOMING";
  const start = new Date(entry.start).getTime();
  const end = new Date(entry.end).getTime();
  if (now < start) return "UPCOMING";
  if (now > end) return "CLOSED";
  return "LIVE";
}

function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    CLOSED: "text-white/30 border-white/15 bg-white/[0.02]",
    UPCOMING: "text-[#20beff] border-[#20beff]/30 bg-[#20beff]/[0.05]",
    LIVE: "text-[#20beff] border-[#20beff]/60 bg-[#20beff]/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 border rounded-sm text-[9px] tracking-[2px] ${map[status]}`}
      style={FONT_MONO}
    >
      {status === "LIVE" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#20beff] opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#20beff]" />
        </span>
      )}
      {status}
    </span>
  );
}

function EntryRow({
  entry,
  last,
  status,
}: {
  entry: Entry;
  last: boolean;
  status: Status;
}) {
  const dim = status === "CLOSED";
  const border = last ? "" : "border-b border-white/5";
  return (
    <>
      {/* Mobile */}
      <div
        className={`sm:hidden flex flex-col gap-2 py-4 ${border} ${dim ? "opacity-40" : ""}`}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="text-[15px] text-white leading-snug flex-1">
            {entry.title}
          </span>
          <StatusPill status={status} />
        </div>
        <div
          className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] tracking-[1.5px] uppercase"
          style={FONT_MONO}
        >
          <span className="border-l-2 border-[#20beff]/40 pl-2 text-white tracking-[1px] text-[12px]">
            {formatDate(entry.start)}
          </span>
          <span className="text-[#20beff]">{formatTime(entry.start)}</span>
          <span className="text-white/40">◆ {entry.location}</span>
        </div>
      </div>

      {/* Desktop */}
      <div
        className={`hidden sm:grid sm:grid-cols-[110px_1fr_auto] sm:items-center gap-6 py-5 ${border} ${dim ? "opacity-40" : ""}`}
      >
        <div
          className="flex flex-col leading-none border-l-2 border-[#20beff]/40 pl-3"
          style={FONT_MONO}
        >
          <span className="text-[18px] text-white tracking-[1px]">
            {formatDate(entry.start)}
          </span>
          <span className="text-[11px] text-[#20beff] mt-1 tracking-[2px]">
            {formatTime(entry.start)}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span
            className="text-[10px] tracking-[2px] uppercase text-white/40"
            style={FONT_MONO}
          >
            ◆ {entry.location}
          </span>
          <span className="text-[17px] text-white">{entry.title}</span>
        </div>

        <StatusPill status={status} />
      </div>
    </>
  );
}

export default function Timeline() {
  const [tab, setTab] = useState<"event" | "comp">("event");
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const entries = tab === "event" ? EVENT_TIMELINE : COMPETITION_DAY;

  return (
    <section
      id="timeline"
      className="relative max-w-400 mx-auto px-5 md:px-12 pb-16 md:pb-32 w-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[11px] tracking-[3px] uppercase text-[#20beff]"
          style={FONT_MONO}
        >
          {"// SCHEDULE"}
        </span>
        <span className="h-px flex-1 bg-[#20beff]/20" />
      </div>

      <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
        <h2
          className="text-4xl md:text-6xl leading-[0.95] uppercase text-white"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          Event Timeline
        </h2>

        <div
          className="inline-flex border border-[#20beff]/25 rounded-sm bg-black/40 p-1"
          style={FONT_MONO}
        >
          <button
            onClick={() => setTab("event")}
            className={`px-4 py-2 text-[11px] tracking-[2px] uppercase rounded-sm transition-colors cursor-pointer ${
              tab === "event"
                ? "bg-[#20beff]/15 text-[#20beff] shadow-[inset_0_0_12px_rgba(32,190,255,0.25)]"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Event Timeline
          </button>
          <button
            onClick={() => setTab("comp")}
            className={`px-4 py-2 text-[11px] tracking-[2px] uppercase rounded-sm transition-colors cursor-pointer ${
              tab === "comp"
                ? "bg-[#20beff]/15 text-[#20beff] shadow-[inset_0_0_12px_rgba(32,190,255,0.25)]"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Competition Day
          </button>
        </div>
      </div>

      <div
        className="relative rounded-md border border-[#20beff]/20 bg-[#020d1a]/80 shadow-[0_0_40px_rgba(32,190,255,0.06)_inset,0_0_60px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(32,190,255,0.03) 0px, rgba(32,190,255,0.03) 1px, transparent 1px, transparent 3px)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-2 border-b border-[#20beff]/20 bg-black/40 text-[11px] tracking-[2px] uppercase"
          style={FONT_MONO}
        >
          <span className="text-[#20beff]">
            {tab === "event" ? "EVENT_TIMELINE.FEED" : "COMP_DAY.FEED"}
          </span>
          <span className="flex gap-2 text-white/40">
            {entries.length} ENTRIES{" "}
            <span className="hidden sm:block">
              · SYNC {now === null ? "..." : "OK"}
            </span>
          </span>
        </div>

        <div className="px-4 sm:px-6">
          {entries.map((e, i) => (
            <EntryRow
              key={i}
              entry={e}
              last={i === entries.length - 1}
              status={getStatus(e, now)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
