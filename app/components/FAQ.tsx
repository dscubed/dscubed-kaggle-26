"use client";

import { useState } from "react";

type QA = {
  q: string;
  a: string;
};

const FAQS: QA[] = [
  {
    q: "Who can enter the competition?",
    a: "Anyone — students, grads, and industry folk across all skill levels. You can compete solo or form a team of up to four. We have tracks and prizes designed to keep things fair whether it's your first Kaggle or your fiftieth.",
  },
  {
    q: "Do I need prior machine learning experience?",
    a: "Nope. Our workshops cover everything from exploratory data analysis to model building and evaluation. If you can write a bit of Python, you can ship a submission by the end of the event.",
  },
  {
    q: "How are teams scored?",
    a: "Submissions are ranked on a held-out test set using a combination of prediction score and simulated trading profit. The public leaderboard updates live; the final board locks when submissions close at 6pm on competition day.",
  },
  {
    q: "What do I need to bring?",
    a: "A laptop, charger, and your brain. We supply datasets, starter notebooks, snacks, catered lunch, and enough coffee to keep you well past the closing bell.",
  },
  {
    q: "Is there a cost to enter?",
    a: "Free for DSCubed members. Non-members can sign up at the door with a one-time membership fee that also gets you into every other event we run this year.",
  },
  {
    q: "Where can I ask more questions?",
    a: "Hop into our Discord — there's a dedicated #kaggle-26 channel where organisers, mentors, and past competitors hang out and help out.",
  },
];

const FONT_MONO = { fontFamily: "var(--font-mono)" };

function FaqItem({
  qa,
  index,
  open,
  onToggle,
}: {
  qa: QA;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border-b border-white/5 transition-colors ${
        open ? "bg-[#23d191]/[0.03]" : ""
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-5 text-left cursor-pointer group"
      >
        <span
          className="text-[11px] tracking-[2px] text-[#23d191]/70 w-10 shrink-0"
          style={FONT_MONO}
        >
          Q.{String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[16px] text-white group-hover:text-[#23d191] transition-colors">
          {qa.q}
        </span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center border border-[#23d191]/40 rounded-sm text-[#23d191] text-[14px] transition-transform ${
            open ? "rotate-45" : ""
          }`}
          style={FONT_MONO}
          aria-hidden
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex gap-4 px-6 pb-5">
            <span
              className="text-[11px] tracking-[2px] text-[#23d191]/70 w-10 shrink-0"
              style={FONT_MONO}
            >
              A.{String(index + 1).padStart(2, "0")}
            </span>
            <p className="flex-1 text-[14px] text-[#c2cfc9] leading-[1.7]">
              {qa.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative max-w-400 mx-auto px-12 pb-32 w-full">
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[11px] tracking-[3px] uppercase text-[#23d191]"
          style={FONT_MONO}
        >
          // FAQ.STREAM
        </span>
        <span className="h-px flex-1 bg-[#23d191]/20" />
      </div>

      <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
        <h2
          className="text-6xl leading-[0.95] uppercase text-white"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          Frequently
          <br />
          Asked Questions
        </h2>
        <span
          className="text-[11px] tracking-[2px] uppercase text-white/40"
          style={FONT_MONO}
        >
          {FAQS.length} ENTRIES · READ-ONLY
        </span>
      </div>

      <div
        className="relative rounded-md border border-[#23d191]/20 bg-[#02120a]/80 shadow-[0_0_40px_rgba(35,209,145,0.06)_inset,0_0_60px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(35,209,145,0.03) 0px, rgba(35,209,145,0.03) 1px, transparent 1px, transparent 3px)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-2 border-b border-[#23d191]/20 bg-black/40 text-[11px] tracking-[2px] uppercase"
          style={FONT_MONO}
        >
          <span className="text-[#23d191]">FAQ::QUERY_FEED</span>
          <span className="text-white/40">EXPAND TO INSPECT</span>
        </div>

        <div>
          {FAQS.map((qa, i) => (
            <FaqItem
              key={i}
              qa={qa}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
