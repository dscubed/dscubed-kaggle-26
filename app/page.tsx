import Navbar from "./components/Navbar";
import HeroContent from "./components/HeroContent";
import StockChart from "./components/StockChart";
import About from "./components/About";
import Prizes from "./components/Prizes";
import Timeline from "./components/Timeline";
import Workshops from "./components/Workshops";
import FAQ from "./components/FAQ";
import MeetTheTeam from "./components/MeetTheTeam";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div
      className="relative overflow-x-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #0a1525 0%, #0a1525 75%, #03070f 100%)",
      }}
    >
      {/* Spotlight — swap src between /spotlight1.png and /spotlight2.png */}
      <img
        src="/spotlight1.png"
        alt=""
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/8 w-full max-w-[700px] h-auto pointer-events-none z-10 opacity-25"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Top-edge glare — matches IMC technique: pill + border-radius:100% + blur */}
      <div
        className="absolute left-1/2 pointer-events-none z-50"
        style={{
          top: "-0.875rem",
          transform: "translateX(-50%)",
          width: "15%",
          height: "0.875rem",
          borderRadius: "100%",
          background: "#fff",
          boxShadow:
            "inset 0 0.25rem 0.25rem 0 rgba(255,255,255,0.25), 0 0 1.25rem 0 rgba(255,255,255,0.75), 0 0 0.875rem 0 rgba(255,255,255,0.6)",
          filter: "blur(0.1875rem)",
        }}
      />
      <Navbar />
      <div
        className="relative flex flex-col h-screen max-w-400 mx-auto"
        id="hero"
      >
        {/* Chart — overflow-hidden clips the 3D-transformed canvas to hero bounds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 85% 70% at 50% 50%, black 10%, transparent 95%)",
              maskImage:
                "radial-gradient(ellipse 85% 70% at 50% 50%, black 10%, transparent 95%)",
            }}
          >
            <StockChart />
          </div>
        </div>

        {/* Radial glows — desktop only */}
        <div
          className="absolute hidden md:block pointer-events-none bottom-[-8%] left-[-6%] w-[45%] aspect-square rounded-full z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 35%, transparent 70%)",
          }}
        />
        <div
          className="absolute hidden md:block pointer-events-none top-[-12%] right-[-7%] w-[41%] aspect-square rounded-full z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.012) 35%, transparent 70%)",
          }}
        />

        <div className="relative z-20 flex-1 flex flex-col min-h-0">
          <HeroContent />
        </div>
      </div>

      <Sponsors />

      <About />
      <Prizes />
      <Timeline />
      <Workshops />
      <MeetTheTeam />
      <FAQ />
      <Footer />
    </div>
  );
}

function Sponsors() {
  return (
    <div className="max-w-400 mx-auto px-5 md:px-12 py-8 md:py-12 w-full flex justify-center">
      <div
        className="rounded-md border border-[#20beff]/20 hover:border-[#20beff]/40 transition-all overflow-hidden w-fit"
        style={{
          background: "rgba(2,13,26,0.8)",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(32,190,255,0.03) 0px, rgba(32,190,255,0.03) 1px, transparent 1px, transparent 3px)",
          boxShadow:
            "0 0 40px rgba(32,190,255,0.08) inset, 0 0 60px rgba(32,190,255,0.06), 0 0 120px rgba(32,190,255,0.04)",
        }}
      >
        <div className="flex flex-col items-center gap-5 md:gap-6 px-8 py-8 md:py-10">
          <span
            className="text-sm md:text-base tracking-[3px] uppercase text-[#20beff]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            SPONSORED BY
          </span>
          <div className="flex items-center gap-10 md:gap-16">
            <img
              src="/janestreet-logo.svg"
              alt="Jane Street"
              className="h-7 md:h-9 w-auto filter invert brightness-110 opacity-75 hover:opacity-100 transition-opacity"
            />
            <img
              src="/imc-logo.svg"
              alt="IMC"
              className="h-7 md:h-9 w-auto filter saturate-0 brightness-200 opacity-75 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
