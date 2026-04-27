"use client";

import { useEffect, useState } from "react";

/* ─── Config ─────────────────────────────────────────────────────────────── */

/** Set this to the exact UTC ms timestamp when the competition goes live. */
const START_DATE = new Date("2026-05-01T00:00:00Z").getTime();

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getCountdown(now: number): string | null {
  const diff = START_DATE - now;
  if (diff <= 0) return null;
  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return `${pad(days)}:${pad(hours)}:${pad(mins)}:${pad(secs)}`;
}

/* ─── BottomBar ───────────────────────────────────────────────────────────── */

export default function BottomBar() {
  const [countdown, setCountdown] = useState<string | null>(() =>
    getCountdown(Date.now()),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown(getCountdown(Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (countdown === null) {
    return (
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          {/* ping ring */}
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#23d191] opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#23d191]" />
        </span>
        <span
          className="text-[13px] tracking-[2px] uppercase text-[#23d191]"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          Live
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-[11px] tracking-[2px] uppercase text-white/40">
        Competition starts in
      </p>
      <p
        className="text-[18px] tracking-[3px] tabular-nums text-white"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        {countdown}
      </p>
      <p className="text-[10px] tracking-[1.5px] uppercase text-white/30">
        DD · HH · MM · SS
      </p>
    </div>
  );
}
