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
    <>
      <Navbar />
      <div className="relative flex flex-col h-screen max-w-400 mx-auto" id="hero">
        {/* Central green glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 48%, rgba(35,209,145,0.13) 0%, rgba(35,209,145,0.05) 40%, transparent 75%)",
          }}
        />

        {/* Side accent glows — visible on wide screens where edges feel empty */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 38% 50% at 4% 72%, rgba(255,255,255,0.055) 0%, transparent 70%), radial-gradient(ellipse 38% 50% at 96% 28%, rgba(255,255,255,0.055) 0%, transparent 70%)",
          }}
        />

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
    </>
  );
}
