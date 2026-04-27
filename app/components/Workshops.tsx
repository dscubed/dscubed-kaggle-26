type Workshop = {
  index: number;
  title: string;
  description: string;
  date: string;
  time: string;
  /** YouTube video ID — null until the recording is published */
  youtubeId: string | null;
  /** Slides download URL — null until slides are released */
  slidesUrl: string | null;
};

const WORKSHOPS: Workshop[] = [
  {
    index: 1,
    title: "Exploratory Data Analysis",
    description:
      "Dig into market data — clean it, visualise it, and surface the signals that actually move prices before you feed them into a model.",
    date: "24 April 2026",
    time: "5:30 — 7:30 pm",
    youtubeId: null,
    slidesUrl: null,
  },
  {
    index: 2,
    title: "Model Building & Evaluation",
    description:
      "Build, benchmark, and backtest candidate models. Learn how to evaluate predictions against real profit curves instead of just accuracy.",
    date: "8 May 2026",
    time: "6:00 — 8:00 pm",
    youtubeId: null,
    slidesUrl: null,
  },
];

const FONT_MONO = { fontFamily: "var(--font-mono)" };

function VideoPreview({ youtubeId }: { youtubeId: string | null }) {
  if (youtubeId) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-sm border border-[#20beff]/25 bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="Workshop recording"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-video overflow-hidden rounded-sm border border-[#20beff]/20 bg-[#020d1a]/80"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(32,190,255,0.05) 0px, rgba(32,190,255,0.05) 1px, transparent 1px, transparent 3px)",
      }}
    >
      {/* Signal-lost crosshair */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-3" style={FONT_MONO}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#20beff] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#20beff]/80" />
          </span>
          <span className="text-[11px] tracking-[3px] uppercase text-[#20beff]">
            AWAITING SIGNAL
          </span>
        </div>
        <p
          className="text-[10px] tracking-[2px] uppercase text-white/40"
          style={FONT_MONO}
        >
          Recording drops after the session
        </p>
      </div>

      {/* Corner bezel marks */}
      <span className="absolute top-2 left-2 h-3 w-3 border-t border-l border-[#20beff]/60" />
      <span className="absolute top-2 right-2 h-3 w-3 border-t border-r border-[#20beff]/60" />
      <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[#20beff]/60" />
      <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[#20beff]/60" />
    </div>
  );
}

function DownloadSlides({ url }: { url: string | null }) {
  const disabled = url === null;
  const className =
    "flex items-center justify-center gap-2 w-full px-4 py-3 rounded-sm border text-[11px] tracking-[3px] uppercase transition-colors";

  if (disabled) {
    return (
      <div
        className={`${className} border-white/10 bg-white/[0.02] text-white/30 cursor-not-allowed`}
        style={FONT_MONO}
      >
        Slides Pending
        <span className="text-white/20">[ — ]</span>
      </div>
    );
  }

  return (
    <a
      href={url}
      download
      className={`${className} border-[#20beff]/40 bg-[#20beff]/10 text-[#20beff] hover:bg-[#20beff]/20 hover:border-[#20beff]/70 shadow-[inset_0_0_12px_rgba(32,190,255,0.2)] hover:shadow-[inset_0_0_20px_rgba(32,190,255,0.4)]`}
      style={FONT_MONO}
    >
      Download Slides
      <span>↓</span>
    </a>
  );
}

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <div
      className="relative flex flex-col gap-5 rounded-md border border-[#20beff]/25 bg-[#020d1a]/85 p-6 shadow-[0_0_40px_rgba(32,190,255,0.06)_inset,0_0_60px_rgba(0,0,0,0.5)] overflow-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(32,190,255,0.03) 0px, rgba(32,190,255,0.03) 1px, transparent 1px, transparent 3px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] tracking-[3px] uppercase text-[#20beff]"
          style={FONT_MONO}
        >
          WORKSHOP_{String(workshop.index).padStart(2, "0")}
        </span>
        <span
          className="text-[10px] tracking-[2px] uppercase text-white/30"
          style={FONT_MONO}
        >
          MODULE {workshop.index} / {WORKSHOPS.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3
          className="text-3xl uppercase leading-[1] text-white"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          {workshop.title}
        </h3>
        <p className="text-[14px] text-[#c2cfc9] leading-[1.6]">
          {workshop.description}
        </p>
      </div>

      {/* Date / time row */}
      <div
        className="flex items-center justify-between border-y border-white/5 py-3 text-[12px] tracking-[2px] uppercase"
        style={FONT_MONO}
      >
        <span className="text-white">{workshop.date}</span>
        <span className="text-[#20beff]">{workshop.time}</span>
      </div>

      <VideoPreview youtubeId={workshop.youtubeId} />

      <DownloadSlides url={workshop.slidesUrl} />
    </div>
  );
}

export default function Workshops() {
  return (
    <section
      id="workshops"
      className="relative max-w-400 mx-auto px-5 md:px-12 pb-16 md:pb-32 w-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[11px] tracking-[3px] uppercase text-[#20beff]"
          style={FONT_MONO}
        >
          {"// TRAINING_MODULES"}
        </span>
        <span className="h-px flex-1 bg-[#20beff]/20" />
      </div>

      <h2
        className="text-4xl md:text-6xl leading-[0.95] uppercase text-white mb-4"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        Workshops
      </h2>
      <p className="text-[15px] text-[#c2cfc9] leading-[1.7] max-w-[640px] mb-10">
        Unlock your potential with our guided workshops! Missed the session? We
        release the slides and recordings after each workshop so you can catch
        up.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WORKSHOPS.map((w) => (
          <WorkshopCard key={w.index} workshop={w} />
        ))}
      </div>
    </section>
  );
}
