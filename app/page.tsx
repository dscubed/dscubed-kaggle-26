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
      style={{
        background:
          "radial-gradient(ellipse 110% 35% at 50% 0%, #163929 0%, #0c2417 100%)",
      }}
    >
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
