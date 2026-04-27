import Link from "next/link";
import BottomBar from "./BottomBar";

function Heading() {
  return (
    <div className="flex flex-col items-center mt-6 gap-4">
      <div className="flex gap-2">
        <img src="/kaggle.svg" alt="Logo" className="h-6 sm:h-8 inline-block" />
        <span className="text-lg sm:text-2xl font-medium">COMPETITION</span>
      </div>
      <h1
        className="text-6xl sm:text-7xl md:text-8xl leading-[0.9] uppercase text-white"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        Stock Market
        <br />
        <span className="header-gradient">Prediction</span>
      </h1>
    </div>
  );
}

function Description() {
  return (
    <p className="text-[15px] text-[#c2cfc9] leading-[1.7] max-w-[420px] text-center">
      Put your skills to the test in this year&apos;s Kaggle competition! Level
      up and compete for prizes. Fit for all skill levels.
    </p>
  );
}

function CTAButton() {
  return (
    <Link
      href="https://events.humanitix.com/dscubed-2026-kaggle-competition"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button
        className="mt-2 px-6 py-3 rounded-sm text-sm font-medium text-[#23d191] font-mono uppercase cursor-pointer border border-[#23d191] hover:border-[#23d191]/50 transition-all duration-300 backdrop-blur-2xl shadow-[inset_0_0_10px_rgba(35,209,145,0.2)] hover:shadow-[inset_0_0_28px_rgba(35,209,145,0.55)]"
        style={{
          background: "rgba(35, 209, 145, 0.1)",
        }}
      >
        Sign up
      </button>
    </Link>
  );
}

export default function HeroContent() {
  return (
    <main className="relative flex-1 flex flex-col items-center text-center px-5 md:px-12 py-4">
      {/* Foreground text — centred in remaining space */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-3">
        <Heading />
        <Description />
        <CTAButton />
      </div>

      {/* Bottom stats — in flow, content anchored to bottom */}
      <div className="relative z-10 flex justify-center">
        <BottomBar />
      </div>
    </main>
  );
}
