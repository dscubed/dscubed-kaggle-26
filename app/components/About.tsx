import Image from "next/image";
import HoverVideo from "./HoverVideo";

const FONT_MONO = { fontFamily: "var(--font-mono)" };

const GALLERY_IMAGE: (string | null)[] = [
  "img01.jpg",
  "img02.jpg",
  "img03.jpg",
  "img04.jpg",
  "img05.jpg",
  "img06.jpg",
  "img07.jpg",
  "img08.jpg",
  "img09.jpg",
  "img10.jpg",
];

function KaggleDatasetDiagram() {
  return (
    <svg viewBox="0 0 520 320" className="w-full h-auto" aria-hidden>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="5"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 Z" fill="#23d191" />
        </marker>
      </defs>

      {/* Kaggle wordmark, tinted green */}
      <g transform="translate(20 125) scale(1.15)">
        <path
          fill="#23d191"
          d="M26.92 47c-.05.18-.24.27-.56.27h-6.17a1.24 1.24 0 0 1-1-.48L9 33.78l-2.83 2.71v10.06a.61.61 0 0 1-.69.69H.69a.61.61 0 0 1-.69-.69V.69A.61.61 0 0 1 .69 0h4.79a.61.61 0 0 1 .69.69v28.24l12.21-12.35a1.44 1.44 0 0 1 1-.49h6.39a.54.54 0 0 1 .55.35.59.59 0 0 1-.07.63L13.32 29.55l13.46 16.72a.65.65 0 0 1 .14.73ZM51.93 47.24h-4.79c-.51 0-.76-.23-.76-.69v-1a12.77 12.77 0 0 1-7.84 2.29A11.28 11.28 0 0 1 31 45.16a9 9 0 0 1-3.12-7.07q0-6.81 8.46-9.23a61.55 61.55 0 0 1 10.06-1.67A5.47 5.47 0 0 0 40.48 21a14 14 0 0 0-7.91 2.77c-.41.24-.71.19-.9-.13l-2.5-3.54c-.23-.28-.16-.6.21-1a19.32 19.32 0 0 1 11.1-3.68A13.29 13.29 0 0 1 48 17.55q4.59 3.06 4.58 9.78v19.22a.61.61 0 0 1-.65.69Zm-5.55-14.5q-6.8.7-9.3 1.81Q33.69 36 34 38.71a3.49 3.49 0 0 0 1.53 2.46 5.87 5.87 0 0 0 3 1.08 9.49 9.49 0 0 0 7.77-2.57ZM81 59.28q-3.81 3.92-10.74 3.92a15.41 15.41 0 0 1-7.63-2c-.51-.33-1.11-.76-1.81-1.29s-1.5-1.19-2.43-2a.72.72 0 0 1-.07-1l3.26-3.26a.76.76 0 0 1 .56-.21.68.68 0 0 1 .49.21c2.58 2.58 5.11 3.88 7.56 3.88q8.39 0 8.39-8.74v-3.63a13.1 13.1 0 0 1-8.67 2.71 12.48 12.48 0 0 1-10.55-5.07A18.16 18.16 0 0 1 56 31.63a18 18 0 0 1 3.2-10.82 12.19 12.19 0 0 1 10.61-5.34 13.93 13.93 0 0 1 8.74 2.71v-1.39a.62.62 0 0 1 .69-.7h4.79a.62.62 0 0 1 .7.7v31q.03 7.57-3.73 11.49ZM78.58 26q-1.74-4.44-8-4.44-8.11 0-8.11 10.12 0 5.63 2.7 8.19a7.05 7.05 0 0 0 5.21 2q6.51 0 8.25-4.44ZM113.59 59.28q-3.78 3.91-10.72 3.92a15.44 15.44 0 0 1-7.63-2q-.76-.49-1.8-1.29c-.7-.53-1.51-1.19-2.43-2a.7.7 0 0 1-.07-1l3.26-3.26a.74.74 0 0 1 .55-.21.67.67 0 0 1 .49.21c2.59 2.58 5.11 3.88 7.56 3.88q8.4 0 8.4-8.74v-3.63a13.14 13.14 0 0 1-8.68 2.71A12.46 12.46 0 0 1 92 42.8a18.09 18.09 0 0 1-3.33-11.17 18 18 0 0 1 3.19-10.82 12.21 12.21 0 0 1 10.61-5.34 14 14 0 0 1 8.75 2.71v-1.39a.62.62 0 0 1 .69-.7h4.79a.62.62 0 0 1 .69.7v31q-.02 7.57-3.8 11.49ZM111.2 26q-1.74-4.44-8-4.44-8.2-.05-8.2 10.07 0 5.63 2.71 8.19a7 7 0 0 0 5.2 2q6.53 0 8.26-4.44ZM128 47.24h-4.78a.62.62 0 0 1-.7-.69V.69a.62.62 0 0 1 .7-.69H128a.61.61 0 0 1 .7.69v45.86a.61.61 0 0 1-.7.69ZM162.91 33.16a.62.62 0 0 1-.7.69h-22.54a8.87 8.87 0 0 0 2.91 5.69 10.63 10.63 0 0 0 7.15 2.46 11.64 11.64 0 0 0 6.86-2.15c.42-.28.77-.28 1 0l3.26 3.33c.37.37.37.69 0 1a18.76 18.76 0 0 1-11.58 3.75 16 16 0 0 1-11.8-4.72 16.2 16.2 0 0 1-4.57-11.86 16 16 0 0 1 4.51-11.52 14.36 14.36 0 0 1 10.82-4.3A14.07 14.07 0 0 1 158.88 20 15 15 0 0 1 163 31.63ZM153.82 23a8.18 8.18 0 0 0-5.69-2.15 8.06 8.06 0 0 0-5.48 2.08 9.24 9.24 0 0 0-3 5.41h16.71a7 7 0 0 0-2.54-5.34Z"
        />
      </g>

      {/* Halo behind wordmark */}
      <circle
        cx="125"
        cy="160"
        r="105"
        fill="none"
        stroke="#23d191"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
      <circle
        cx="125"
        cy="160"
        r="80"
        fill="none"
        stroke="#23d191"
        strokeOpacity="0.06"
        strokeWidth="1"
      />

      {/* Arrows — origin near right edge of logo */}
      <g
        stroke="#23d191"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead)"
        strokeDasharray="4 4"
      >
        <path d="M235 160 L415 70" />
        <path d="M235 160 L415 160" />
        <path d="M235 160 L415 250" />
      </g>

      {/* Dataset icons */}
      {[70, 160, 250].map((cy, i) => (
        <g key={i} transform={`translate(420 ${cy - 30})`}>
          <rect
            x="0"
            y="0"
            width="72"
            height="60"
            rx="3"
            fill="#02120a"
            stroke="#23d191"
            strokeOpacity="0.6"
          />
          {/* header bar */}
          <rect
            x="0"
            y="0"
            width="72"
            height="12"
            fill="#23d191"
            fillOpacity="0.18"
          />
          {/* grid rows */}
          {[22, 32, 42, 52].map((y) => (
            <line
              key={y}
              x1="6"
              y1={y}
              x2="66"
              y2={y}
              stroke="#23d191"
              strokeOpacity="0.35"
            />
          ))}
          {/* column divider */}
          <line
            x1="28"
            y1="12"
            x2="28"
            y2="56"
            stroke="#23d191"
            strokeOpacity="0.25"
          />
          <line
            x1="48"
            y1="12"
            x2="48"
            y2="56"
            stroke="#23d191"
            strokeOpacity="0.25"
          />
          <text
            x="36"
            y="74"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            letterSpacing="1.5"
            fill="#23d191"
            fillOpacity="0.7"
          >
            DATASET_{String(i + 1).padStart(2, "0")}
          </text>
        </g>
      ))}
    </svg>
  );
}

function WhatIsKaggle() {
  return (
    <div className="grid md:grid-cols-[1fr_1fr] gap-10 mb-20">
      <div className="flex flex-col gap-4">
        <h3
          className="text-4xl md:text-6xl leading-[1] uppercase text-white mt-8"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          WHAT IS <span className="text-[#23d191]">KAGGLE?</span>
        </h3>
        <p className="text-[15px] text-[#c2cfc9] leading-[1.7]">
          Kaggle is the world&apos;s leading platform for data science and
          machine learning. It hosts real-world datasets, challenges and
          competitions where individuals and teams build solutions to complex
          problems. For our flagship competition, we source Kaggle datasets to
          give you practical, industry-relevant experience.
        </p>
      </div>

      <div
        className="relative rounded-md border border-[#23d191]/20 bg-[#02120a]/70 p-6 overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(35,209,145,0.03) 0px, rgba(35,209,145,0.03) 1px, transparent 1px, transparent 3px)",
        }}
      >
        <KaggleDatasetDiagram />
      </div>
    </div>
  );
}

function GalleryTile({ src, index }: { src: string | null; index: number }) {
  const base =
    "relative shrink-0 w-[260px] sm:w-[320px] md:w-[420px] aspect-[4/3] snap-start rounded-sm border overflow-hidden";
  if (src) {
    return (
      <div className={`${base} border-[#23d191]/25`}>
        <Image
          src={`/gallery/${src}`}
          alt={`Past event ${index + 1}`}
          className="h-full w-full object-cover"
          width={500}
          height={375}
        />
      </div>
    );
  }
  return (
    <div
      className={`${base} border-[#23d191]/20 bg-[#02120a]/70 flex items-center justify-center`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(35,209,145,0.04) 0px, rgba(35,209,145,0.04) 1px, transparent 1px, transparent 3px)",
      }}
    >
      <span
        className="text-[10px] tracking-[3px] uppercase text-[#23d191]/60"
        style={FONT_MONO}
      >
        FRAME_{String(index + 1).padStart(3, "0")}
      </span>
      <span className="absolute top-2 left-2 h-2.5 w-2.5 border-t border-l border-[#23d191]/50" />
      <span className="absolute top-2 right-2 h-2.5 w-2.5 border-t border-r border-[#23d191]/50" />
      <span className="absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-[#23d191]/50" />
      <span className="absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-[#23d191]/50" />
    </div>
  );
}

function Gallery() {
  return (
    <div className="mb-20">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <h3
          className="text-4xl md:text-6xl leading-[1] uppercase text-white"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          Scenes From Previous Years
        </h3>
        <span
          className="text-[10px] tracking-[2px] uppercase text-white/40"
          style={FONT_MONO}
        >
          ← SCROLL · {GALLERY_IMAGE.length} FRAMES
        </span>
      </div>

      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 md:-mx-12 md:px-12"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#23d19155 transparent",
        }}
      >
        {GALLERY_IMAGE.map((src, i) => (
          <GalleryTile key={i} src={src} index={i} />
        ))}
      </div>
    </div>
  );
}

function Theme() {
  return (
    <div>
      <div className="flex flex-col-reverse md:grid md:grid-cols-[1fr_1fr] gap-10 mb-20">
        <div
          className="relative rounded-md border border-[#23d191]/20 bg-[#02120a]/70 overflow-hidden aspect-[1.7]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(35,209,145,0.03) 0px, rgba(35,209,145,0.03) 1px, transparent 1px, transparent 3px)",
          }}
        >
          <HoverVideo src="/theme_video.mp4" />
        </div>

        <div className="flex flex-col">
          <span
            className="text-[11px] tracking-[2px] uppercase text-white/40 block mb-3"
            style={FONT_MONO}
          >
            This year&apos;s theme
          </span>

          <h3
            className="text-4xl md:text-6xl leading-[0.95] uppercase text-white mb-6"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Stock Market
            <br />
            <span className="text-[#23d191]">Prediction</span>
          </h3>

          <p className="text-[15px] text-[#c2cfc9] leading-[1.7] max-w-[640px]">
            This year&apos;s challenge puts you in the driver&apos;s seat of the
            markets. Build models that forecast price movements, uncover signal
            in the noise, and compete on real historical data. The goal is
            simple: predict the market better than anyone else in the room and
            maximise your portfolio returns.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative flex flex-col gap-4 max-w-400 mx-auto px-5 md:px-12 py-12 md:py-24 w-full"
    >
      <div className="flex items-center gap-3 mb-10">
        <span
          className="text-[11px] tracking-[3px] uppercase text-[#23d191]"
          style={FONT_MONO}
        >
          // ABOUT
        </span>
        <span className="h-px flex-1 bg-[#23d191]/20" />
      </div>

      <WhatIsKaggle />
      <Theme />
      <Gallery />
    </section>
  );
}
