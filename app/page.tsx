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

/* Noise tile — grayscale fractal noise, blended as overlay at page level     */
/* Covers navbar + hero + bottom bar uniformly, no white-background artifact  */
const NOISE_BG = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">' +
    '<filter id="n">' +
    '<feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch"/>' +
    '<feColorMatrix type="saturate" values="0"/>' +
    "</filter>" +
    '<rect width="256" height="256" fill="white" filter="url(#n)"/>' +
    "</svg>",
)}")`;

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative flex flex-col h-screen max-w-400 mx-auto overflow-hidden" id="hero">
        {/* Animated chart inside elliptical radial-gradient mask window */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 78% at 50% 50%, black 35%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 90% 78% at 50% 50%, black 35%, transparent 100%)",
          }}
        >
          <StockChart />
        </div>

        <div className="relative z-20 flex-1 flex flex-col min-h-0">
          <HeroContent />
        </div>

        {/* Noise grain — sits above chart but below UI */}
        <div
          className="absolute inset-0 z-10 pointer-events-none h-screen w-screen"
          style={{
            backgroundImage: NOISE_BG,
            backgroundSize: "256px 256px",
            opacity: 0.3,
            mixBlendMode: "overlay" as const,
          }}
        />
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
