/* ─── Deterministic seed data for StockChart ────────────────────────────── */
/*                                                                            */
/* Uses a Linear Congruential Generator (LCG) so the exact same sequence is  */
/* produced on the server and client — no Next.js hydration mismatches.      */

/* ── Private config (mirrors tunable constants in StockChart.tsx) ── */
const SEED_N = 80;
const SEED_START_A = 920;
const SEED_START_B = 660;
const SEED_SPREAD_A = 38;
const SEED_SPREAD_B = 34;
const SEED_DRIFT = 0.3;
const SEED_MIN = 50;
const LCG_SEED_A = 42;
const LCG_SEED_B = 137;

/* ── LCG — standard Numerical Recipes parameters ── */
function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296; // [0, 1)
  };
}

/* ── Point generator ── */
function generate(
  n: number,
  start: number,
  spread: number,
  drift: number,
  floor: number,
  rng: () => number,
): number[] {
  const pts: number[] = [start];
  for (let i = 1; i < n; i++)
    pts.push(Math.max(floor, pts[i - 1] + (rng() - 0.5) * spread + drift));
  return pts;
}

export const SEED_A: readonly number[] = generate(
  SEED_N,
  SEED_START_A,
  SEED_SPREAD_A,
  SEED_DRIFT,
  SEED_MIN,
  lcg(LCG_SEED_A),
);

export const SEED_B: readonly number[] = generate(
  SEED_N,
  SEED_START_B,
  SEED_SPREAD_B,
  SEED_DRIFT,
  SEED_MIN,
  lcg(LCG_SEED_B),
);
