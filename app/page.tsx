import Navbar from "./components/Navbar";
import HeroContent from "./components/HeroContent";
import StockChart from "./components/StockChart";
import About from "./components/About";
import Leaderboard from "./components/Leaderboard";
import Timeline from "./components/Timeline";
import Workshops from "./components/Workshops";
import FAQ from "./components/FAQ";
import MeetTheTeam from "./components/MeetTheTeam";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div
      className="relative"
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
        className="relative flex flex-col h-screen max-w-400 mx-auto overflow-hidden"
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
              "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.035) 35%, transparent 70%)",
          }}
        />
        <div
          className="absolute hidden md:block pointer-events-none top-[-12%] right-[-7%] w-[41%] aspect-square rounded-full z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.03) 35%, transparent 70%)",
          }}
        />

        <div className="relative z-20 flex-1 flex flex-col min-h-0">
          <HeroContent />
        </div>
      </div>
      <About />
      <Leaderboard />
      <Timeline />
      <Workshops />
      <MeetTheTeam />
      <FAQ />
      <Footer />
    </div>
  );
}
