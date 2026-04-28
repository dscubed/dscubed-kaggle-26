"use client";

import { useState } from "react";

type QA = {
  q: string;
  a: string;
};

const FAQS: QA[] = [
  {
    q: "Who can enter the competition?",
    a: "Anyone, students across all skill levels. You can compete solo or in pairs. Looking for a partner? there will be time for team formation on the day where we will help match you up.",
  },
  {
    q: "Do I need prior machine learning experience?",
    a: "Nope. Our workshops are designed for beginners and will cover all the ML basics you need to get going. We also have Education Officers on hand during the comp to help out with any questions you have.",
  },
  {
    // TODO: confirm this answer again with education.
    q: "How are teams scored?",
    a: "Submissions are ranked on a held-out test set using a combination of prediction score and simulated trading profit.",
  },
  {
    q: "What do I need to bring?",
    a: "A laptop, charger, and your brain. We supply snacks, catered lunch, and enough coffee to keep you well past the closing bell.",
  },
  {
    q: "Is there a cost to enter?",
    a: "Nope. The competition and workshops are completely free to attend for everyone members or non-members.",
  },
  {
    q: "Can I attend online?",
    a: "Unfortunately, no. The Kaggle Competition is an in-person event due to logistical reasons. Plus, there will be food and networking opportunities!",
  },
  {
    q: "Where can I ask more questions?",
    a: "Hop into our Discord — there's a dedicated channel where organisers, officers are ready to answer any questions or give you guidance.",
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
        open ? "bg-[#20beff]/[0.03]" : ""
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left cursor-pointer group"
      >
        <span
          className="text-[11px] tracking-[2px] text-[#20beff]/70 w-10 shrink-0"
          style={FONT_MONO}
        >
          Q.{String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[16px] text-white group-hover:text-[#20beff] transition-colors">
          {qa.q}
        </span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center border border-[#20beff]/40 rounded-sm text-[#20beff] text-[14px] transition-transform ${
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
          <div className="flex gap-3 sm:gap-4 px-4 sm:px-6 pb-5">
            <span
              className="text-[11px] tracking-[2px] text-[#20beff]/70 w-10 shrink-0"
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
    <section className="relative max-w-400 mx-auto px-5 md:px-12 pb-16 md:pb-32 w-full">
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[11px] tracking-[3px] uppercase text-[#20beff]"
          style={FONT_MONO}
        >
          {"// FAQ.STREAM"}
        </span>
        <span className="h-px flex-1 bg-[#20beff]/20" />
      </div>

      <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
        <h2
          className="text-4xl md:text-6xl leading-[0.95] uppercase text-white"
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
          <span className="text-[#20beff]">FAQ::QUERY_FEED</span>
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
