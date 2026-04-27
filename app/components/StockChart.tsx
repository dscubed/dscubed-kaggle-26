"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { SEED_A, SEED_B } from "./chartSeedData";

/* ─── SVG canvas ─────────────────────────────────────────────────────────── */

const SVG_W = 1400;
const SVG_H = 750;
const PAD = { top: 60, right: 110, bottom: 70, left: 40 };
/** Drawable region inside padding */
const CW = SVG_W - PAD.left - PAD.right;
const CH = SVG_H - PAD.top - PAD.bottom;

/* ─── Data stream ────────────────────────────────────────────────────────── */

const TICK_MS = 800; // ms between incoming data points
const MAX_HISTORY = 130; // rolling buffer length (points kept per series)
const MIN_VALUE = 50; // lower clamp on all series values
const WALK_SPREAD_A = 38; // random walk step amplitude for series A
const WALK_SPREAD_B = 34; // random walk step amplitude for series B
const WALK_DRIFT = 0.3; // net drift per tick (0 = perfectly balanced walk)

/* ─── Camera ─────────────────────────────────────────────────────────────── */

const CAMERA_LERP = 0.04; // interpolation factor (0 = frozen, 1 = instant)
const CAMERA_WINDOW = 20; // recent-point window used to compute target range
const CAMERA_MIN_PAD = 90; // whitespace below the data minimum
const CAMERA_MAX_PAD = 230; // whitespace above the data maximum

/* ─── Y axis ─────────────────────────────────────────────────────────────── */

const Y_DIVISIONS = 8; // grid intervals (Y_DIVISIONS + 1 labels rendered)
const Y_TICK_NOTCH = 8; // tick mark length in SVG px
const Y_LABEL_DX = 12; // x gap between axis line and label text
const Y_LABEL_DY = 5; // y offset to vertically centre label on tick
const Y_LABEL_FONT = 15; // font size in px

/* ─── X axis ─────────────────────────────────────────────────────────────── */

const TICKS_PER_MONTH = 10; // data ticks represented by one month label
const X_ARROW_HALF = 6; // half-height of the trailing arrowhead
const X_ARROW_LEN = 14; // length of the trailing arrowhead
const X_LABEL_DY = 22; // y offset of label below axis line
const X_LABEL_FONT = 13; // font size in px

/* ─── Presentation ───────────────────────────────────────────────────────── */

const CHART_BLUR = "blur(1.2px)";
const CHART_PERSPECTIVE = "1300px";
const CHART_ROT_X = 50; // static X tilt in degrees
const CHART_ROT_Y = -5; // static Y tilt in degrees
const CHART_SCALE = 0.98;

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

/* ─── Math helpers ───────────────────────────────────────────────────────── */

function arrayMin(arr: readonly number[]): number {
  let m = Infinity;
  for (const v of arr) if (v < m) m = v;
  return m;
}

function arrayMax(arr: readonly number[]): number {
  let m = -Infinity;
  for (const v of arr) if (v > m) m = v;
  return m;
}

/* ─── Geometry ───────────────────────────────────────────────────────────── */

function toX(i: number, total: number): number {
  return PAD.left + (i / (total - 1)) * CW;
}

function toY(v: number, min: number, max: number): number {
  return PAD.top + CH - ((v - min) / (max - min)) * CH;
}

/**
 * Imperatively write both SVG paths into existing DOM elements.
 * Called from rAF — never triggers React reconciliation.
 */
function writePaths(
  pts: readonly number[],
  min: number,
  max: number,
  lineEl: SVGPathElement,
  areaEl: SVGPathElement,
) {
  const n = pts.length;
  const floor = SVG_H - PAD.bottom;
  if (n === 0) return;
  let line = `M${Math.round(toX(0, n))},${Math.round(toY(pts[0], min, max))}`;
  for (let i = 1; i < n; i++) {
    line += ` L${Math.round(toX(i, n))},${Math.round(toY(pts[i], min, max))}`;
  }
  lineEl.setAttribute("d", line);
  areaEl.setAttribute(
    "d",
    `${line} L${Math.round(toX(n - 1, n))},${floor} L${PAD.left},${floor} Z`,
  );
}

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface ChartState {
  a: number[];
  b: number[];
  ticks: number;
}

interface ViewState {
  min: number;
  max: number;
}

/* ─── Initial state (deterministic — no Math.random at module level) ─────── */

const INITIAL_CHART: ChartState = {
  a: [...SEED_A],
  b: [...SEED_B],
  ticks: SEED_A.length,
};

const INITIAL_VIEW: ViewState = (() => {
  const all = [...SEED_A, ...SEED_B];
  const recent = [
    ...SEED_A.slice(-CAMERA_WINDOW),
    ...SEED_B.slice(-CAMERA_WINDOW),
  ];
  return {
    min: Math.max(0, arrayMin(all) - CAMERA_MIN_PAD),
    max: arrayMax(recent) + CAMERA_MAX_PAD,
  };
})();

/* ─── Axis components (memoized — only re-render when labels change) ─────── */

const YAxis = memo(function YAxis({
  labels,
}: {
  labels: { val: number; y: number }[];
}) {
  const axisX = SVG_W - PAD.right;
  return (
    <g>
      <line
        x1={axisX}
        y1={PAD.top}
        x2={axisX}
        y2={SVG_H - PAD.bottom}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
      />
      {labels.map(({ val, y }) => (
        <g key={val}>
          {/* Horizontal grid line */}
          <line
            x1={PAD.left}
            y1={y}
            x2={axisX}
            y2={y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <line
            x1={axisX - Y_TICK_NOTCH}
            y1={y}
            x2={axisX}
            y2={y}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          <text
            x={axisX + Y_LABEL_DX}
            y={y + Y_LABEL_DY}
            fill="rgba(255,255,255,0.6)"
            fontSize={Y_LABEL_FONT}
            fontFamily="Inter, sans-serif"
          >
            {val}
          </text>
        </g>
      ))}
    </g>
  );
});

const XAxis = memo(function XAxis({
  labels,
}: {
  labels: { label: string; x: number }[];
}) {
  const axisY = SVG_H - PAD.bottom;
  const axisRight = SVG_W - PAD.right;
  return (
    <g>
      <line
        x1={PAD.left}
        y1={axisY}
        x2={axisRight}
        y2={axisY}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
      />
      <path
        d={`M${axisRight},${axisY - X_ARROW_HALF} L${axisRight + X_ARROW_LEN},${axisY} L${axisRight},${axisY + X_ARROW_HALF}`}
        fill="rgba(255,255,255,0.35)"
      />
      {labels.map(({ label, x }) => (
        <g key={`${label}-${x}`}>
          {/* Vertical grid line */}
          <line
            x1={x}
            y1={PAD.top}
            x2={x}
            y2={axisY}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <text
            x={x}
            y={axisY + X_LABEL_DY}
            fill="rgba(255,255,255,0.55)"
            fontSize={X_LABEL_FONT}
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
          >
            {label}
          </text>
        </g>
      ))}
    </g>
  );
});

/* ─── StockChart ─────────────────────────────────────────────────────────── */

export default function StockChart() {
  // chart drives React renders (800 ms cadence)
  const [chart, setChart] = useState<ChartState>(INITIAL_CHART);
  const chartRef = useRef<ChartState>(chart);

  // Mobile-only layout tweaks: extend wrapper left and anchor SVG bottom-right
  // so the chart doesn't hard-clip on tall narrow viewports. Desktop unchanged.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // view lives entirely in a ref — camera never triggers React re-renders
  const viewRef = useRef<ViewState>(INITIAL_VIEW);

  // axisView is a React-state snapshot of viewRef, updated only on data ticks
  // so YAxis/XAxis re-render at 800 ms, not per camera frame
  const [axisView, setAxisView] = useState<ViewState>(INITIAL_VIEW);

  // Refs to SVG path DOM elements for imperative d-attribute updates
  const pathAreaBRef = useRef<SVGPathElement>(null);
  const pathLineBRef = useRef<SVGPathElement>(null);
  const pathAreaARef = useRef<SVGPathElement>(null);
  const pathLineARef = useRef<SVGPathElement>(null);

  // Refs for the live-end dot groups (imperative position updates via rAF)
  const dotGroupARef = useRef<SVGGElement>(null);
  const dotGroupBRef = useRef<SVGGElement>(null);

  // No `d` prop needed in JSX — rAF fills in the correct path before first
  // paint (rAF fires before browser paint), and React's reconciler never
  // touches the attribute again because the static empty string prop never
  // changes between renders.

  // Cached all-points tMin (updated at data tick, not every rAF frame)
  const cachedTMinRef = useRef<number>(
    Math.min(arrayMin(SEED_A), arrayMin(SEED_B)),
  );

  // Set when new data arrives; cleared after a rAF redraw
  const dataDirtyRef = useRef(true);

  // Keep chartRef in sync; snapshot view for axis on every data tick
  useEffect(() => {
    chartRef.current = chart;
    dataDirtyRef.current = true;

    // Recompute global min here (800 ms) instead of every rAF frame
    const { a, b } = chart;
    let tMin = Infinity;
    for (let i = 0; i < a.length; i++) {
      if (a[i] < tMin) tMin = a[i];
      if (b[i] < tMin) tMin = b[i];
    }
    cachedTMinRef.current = tMin;

    setAxisView({ ...viewRef.current });
  }, [chart]);

  /* ── new data tick ── */
  useEffect(() => {
    const id = setInterval(() => {
      setChart((prev) => {
        const nextA = Math.max(
          MIN_VALUE,
          prev.a[prev.a.length - 1] +
            (Math.random() - 0.5) * WALK_SPREAD_A +
            WALK_DRIFT,
        );
        const nextB = Math.max(
          MIN_VALUE,
          prev.b[prev.b.length - 1] +
            (Math.random() - 0.5) * WALK_SPREAD_B +
            WALK_DRIFT,
        );
        return {
          a: [...prev.a.slice(-MAX_HISTORY), nextA],
          b: [...prev.b.slice(-MAX_HISTORY), nextB],
          ticks: prev.ticks + 1,
        };
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  /* ── camera + path animation via rAF — zero React re-renders ── */
  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const { a, b } = chartRef.current;
      const n = a.length;

      if (n > 0) {
        // tMax: scan only the recent CAMERA_WINDOW slice (fast)
        let tMax = -Infinity;
        const wStart = Math.max(0, n - CAMERA_WINDOW);
        for (let i = wStart; i < n; i++) {
          if (a[i] > tMax) tMax = a[i];
          if (b[i] > tMax) tMax = b[i];
        }
        // tMin: use value cached at data-tick time (avoids full O(n) scan every frame)
        const tMin = Math.max(0, cachedTMinRef.current - CAMERA_MIN_PAD);
        tMax += CAMERA_MAX_PAD;

        const v = viewRef.current;
        const newMin = v.min + (tMin - v.min) * CAMERA_LERP;
        const newMax = v.max + (tMax - v.max) * CAMERA_LERP;

        // Skip expensive DOM writes when camera is settled and data is clean
        const cameraDelta = Math.abs(newMin - v.min) + Math.abs(newMax - v.max);
        const needsRedraw = dataDirtyRef.current || cameraDelta > 0.05;

        viewRef.current = { min: newMin, max: newMax };

        if (needsRedraw) {
          dataDirtyRef.current = false;

          // Imperatively push path strings into DOM — skips React reconciler
          if (pathLineARef.current && pathAreaARef.current)
            writePaths(
              a,
              newMin,
              newMax,
              pathLineARef.current,
              pathAreaARef.current,
            );
          if (pathLineBRef.current && pathAreaBRef.current)
            writePaths(
              b,
              newMin,
              newMax,
              pathLineBRef.current,
              pathAreaBRef.current,
            );

          // Move live-end dot groups to the trailing tip of each series
          if (dotGroupARef.current) {
            const cx = Math.round(toX(n - 1, n));
            const cy = Math.round(toY(a[n - 1], newMin, newMax));
            dotGroupARef.current.setAttribute(
              "transform",
              `translate(${cx},${cy})`,
            );
          }
          if (dotGroupBRef.current) {
            const cx = Math.round(toX(n - 1, n));
            const cy = Math.round(toY(b[n - 1], newMin, newMax));
            dotGroupBRef.current.setAttribute(
              "transform",
              `translate(${cx},${cy})`,
            );
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* ── derived axis values (800 ms cadence via axisView) ── */
  const { a, b, ticks } = chart;
  const n = a.length;

  const yLabels = useMemo(() => {
    const step = (axisView.max - axisView.min) / Y_DIVISIONS;
    return Array.from({ length: Y_DIVISIONS + 1 }, (_, i) => ({
      val: Math.round(axisView.min + step * i),
      y: toY(axisView.min + step * i, axisView.min, axisView.max),
    }));
  }, [axisView]);

  const xLabels = useMemo((): { label: string; x: number }[] => {
    const startTick = ticks - n + 1;
    const firstBoundary =
      Math.ceil(startTick / TICKS_PER_MONTH) * TICKS_PER_MONTH;
    const labels: { label: string; x: number }[] = [];
    for (let t = firstBoundary; t <= ticks; t += TICKS_PER_MONTH) {
      const idx = t - startTick;
      if (idx >= 0 && idx < n)
        labels.push({
          label: MONTHS[Math.floor(t / TICKS_PER_MONTH) % 12],
          x: toX(idx, n),
        });
    }
    return labels;
  }, [ticks, n]);

  return (
    <div
      className={`absolute pointer-events-none ${
        isMobile ? "-left-[30%] right-0 inset-y-0" : "inset-0"
      }`}
      style={{
        filter: CHART_BLUR,
        transform: `perspective(${CHART_PERSPECTIVE}) rotateX(${CHART_ROT_X}deg) rotateY(${CHART_ROT_Y}deg) scale(${CHART_SCALE})${isMobile ? " translateY(-12%) scale(1.25)" : ""}`,
        transformOrigin: "50% 50%",
        willChange: "transform",
      }}
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        height="100%"
        preserveAspectRatio={isMobile ? "xMaxYMax slice" : "xMaxYMid slice"}
      >
        <defs>
          <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86efac" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#86efac" stopOpacity="0" />
          </linearGradient>
          {/* Left-edge fade — ease-out curve: fast rise at edge, smooth shoulder */}
          <linearGradient
            id="edgeFade"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="8%" stopColor="white" stopOpacity="0.03" />
            <stop offset="18%" stopColor="white" stopOpacity="0.10" />
            <stop offset="30%" stopColor="white" stopOpacity="0.24" />
            <stop offset="45%" stopColor="white" stopOpacity="0.46" />
            <stop offset="60%" stopColor="white" stopOpacity="0.68" />
            <stop offset="75%" stopColor="white" stopOpacity="0.87" />
            <stop offset="85%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="chartMask">
            <rect
              x="0"
              y="0"
              width={SVG_W}
              height={SVG_H}
              fill="url(#edgeFade)"
            />
          </mask>
        </defs>

        <g mask="url(#chartMask)">
          {/* d="" — rAF fills the real path before first paint; static prop
              means React's reconciler never overwrites the imperative updates */}
          <path ref={pathAreaBRef} d="" fill="url(#gradB)" />
          <path
            ref={pathLineBRef}
            d=""
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path ref={pathAreaARef} d="" fill="url(#gradA)" />
          <path
            ref={pathLineARef}
            d=""
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <YAxis labels={yLabels} />
          <XAxis labels={xLabels} />

          {/* Live-end dot — series B (#4ade80) */}
          <g ref={dotGroupBRef} transform="translate(0,0)">
            <circle r="5" fill="none" stroke="#4ade80" strokeWidth="1.5">
              <animate
                attributeName="r"
                values="5;20"
                dur="1.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;0"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="4" fill="#4ade80" opacity="0.95" />
          </g>

          {/* Live-end dot — series A (#86efac) */}
          <g ref={dotGroupARef} transform="translate(0,0)">
            <circle r="4" fill="none" stroke="#86efac" strokeWidth="1.5">
              <animate
                attributeName="r"
                values="4;16"
                dur="1.6s"
                begin="0.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0"
                dur="1.6s"
                begin="0.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3" fill="#86efac" opacity="0.9" />
          </g>
        </g>
      </svg>
    </div>
  );
}
