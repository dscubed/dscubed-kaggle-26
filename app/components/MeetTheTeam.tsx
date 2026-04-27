import { FaDiscord } from "react-icons/fa";

type Member = {
  name: string;
  role: string;
  /** Path to headshot in /public — null renders the monogram placeholder */
  photo: string | null;
};

const DIRECTOR: Member = {
  name: "Stanley Zaranski",
  role: "Education Director",
  photo: "people/stanley-zaranski.webp",
};

const OFFICERS: Member[] = [
  { name: "Adam Lu", role: "Education Officer", photo: "people/adam-lu.webp" },
  {
    name: "Anhad Singh",
    role: "Education Officer",
    photo: "people/anhad-singh.webp",
  },
  {
    name: "Daniel Nam",
    role: "Education Officer",
    photo: "people/daniel-nam.webp",
  },
  {
    name: "Khan Vattanak",
    role: "Education Officer",
    photo: "people/khan-vattanak.webp",
  },
  {
    name: "Nick Muir",
    role: "Education Officer",
    photo: "people/nick-muir.webp",
  },
  {
    name: "Noah Ryan",
    role: "Education Officer",
    photo: "people/noah-ryan.webp",
  },
];

const DISCORD_URL = "https://discord.gg/Q3gZcPQV63";

const FONT_MONO = { fontFamily: "var(--font-mono)" };

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ member, size }: { member: Member; size: "lg" | "md" }) {
  const dims = size === "lg" ? "h-40 w-40 text-4xl" : "h-20 w-20 text-lg";
  if (member.photo) {
    return (
      <img
        src={member.photo}
        alt={member.name}
        className={`${dims} rounded-sm object-cover border border-[#20beff]/30`}
      />
    );
  }
  return (
    <div
      className={`${dims} relative flex items-center justify-center rounded-sm border border-[#20beff]/30 bg-[#020d1a] overflow-hidden`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(32,190,255,0.06) 0px, rgba(32,190,255,0.06) 1px, transparent 1px, transparent 3px)",
      }}
    >
      <span className="text-[#20beff] tracking-[2px]" style={FONT_MONO}>
        {initials(member.name)}
      </span>
      <span className="absolute top-1 left-1 h-2 w-2 border-t border-l border-[#20beff]/60" />
      <span className="absolute top-1 right-1 h-2 w-2 border-t border-r border-[#20beff]/60" />
      <span className="absolute bottom-1 left-1 h-2 w-2 border-b border-l border-[#20beff]/60" />
      <span className="absolute bottom-1 right-1 h-2 w-2 border-b border-r border-[#20beff]/60" />
    </div>
  );
}

function OfficerCard({ member }: { member: Member }) {
  return (
    <div
      className="relative flex flex-col items-center gap-3 rounded-sm border border-white/10 bg-[#020d1a]/70 p-5 hover:border-[#20beff]/40 hover:bg-[#020d1a]/90 transition-colors"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(32,190,255,0.02) 0px, rgba(32,190,255,0.02) 1px, transparent 1px, transparent 3px)",
      }}
    >
      <Avatar member={member} size="md" />
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-[14px] text-white">{member.name}</span>
        <span
          className="text-[9px] tracking-[2px] uppercase text-[#20beff]/80"
          style={FONT_MONO}
        >
          {member.role}
        </span>
      </div>
    </div>
  );
}

export default function MeetTheTeam() {
  return (
    <section className="relative max-w-400 mx-auto px-5 md:px-12 pb-16 md:pb-32 w-full">
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[11px] tracking-[3px] uppercase text-[#20beff]"
          style={FONT_MONO}
        >
          {"// TEAM_ROSTER"}
        </span>
        <span className="h-px flex-1 bg-[#20beff]/20" />
      </div>

      <h2
        className="text-4xl md:text-6xl leading-[0.95] uppercase text-white mb-4"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        Meet The Team
      </h2>
      <p className="text-[15px] text-[#c2cfc9] leading-[1.7] max-w-[640px] mb-10">
        Meet the DSCubed Education team. The team is responsible for designing
        and delivering the workshops, mentoring competitors, and running the
        competition day itself.
      </p>

      {/* Director — featured */}
      <div
        className="relative rounded-md border border-[#20beff]/30 bg-[#020d1a]/85 p-5 sm:p-8 mb-6 shadow-[0_0_40px_rgba(32,190,255,0.08)_inset,0_0_60px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(32,190,255,0.04) 0px, rgba(32,190,255,0.04) 1px, transparent 1px, transparent 3px)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 flex items-center px-5 py-2 border-b border-[#20beff]/20 bg-black/40 text-[10px] tracking-[2px] uppercase"
          style={FONT_MONO}
        >
          <span className="text-[#20beff]">DSCUBED · DIRECTOR</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 pt-6">
          <Avatar member={DIRECTOR} size="lg" />
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3
              className="text-4xl uppercase leading-[1] text-white"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              {DIRECTOR.name}
            </h3>
            <span
              className="text-[10px] tracking-[3px] uppercase text-[#20beff]"
              style={FONT_MONO}
            >
              {DIRECTOR.role}
            </span>
          </div>
        </div>
      </div>

      {/* Officers grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
        {OFFICERS.map((o) => (
          <OfficerCard key={o.name} member={o} />
        ))}
      </div>

      {/* Discord CTA banner */}
      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noreferrer"
        className="relative flex flex-col sm:flex-row items-center justify-between gap-4 rounded-md border border-[#20beff]/30 bg-[#020d1a]/85 px-5 sm:px-8 py-6 overflow-hidden group hover:border-[#20beff]/60 transition-colors shadow-[0_0_40px_rgba(32,190,255,0.06)_inset]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(32,190,255,0.03) 0px, rgba(32,190,255,0.03) 1px, transparent 1px, transparent 3px)",
        }}
      >
        <div className="flex flex-col gap-1">
          <span
            className="text-[10px] tracking-[3px] uppercase text-[#20beff]"
            style={FONT_MONO}
          >
            // CONTACT_US
          </span>
          <span className="text-[20px] text-white">
            More questions? Ask the team directly on our Discord.
          </span>
        </div>

        <span
          className="inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-[#20beff]/50 bg-[#20beff]/10 text-[#20beff] text-[12px] tracking-[2px] uppercase shadow-[inset_0_0_12px_rgba(32,190,255,0.25)] group-hover:shadow-[inset_0_0_20px_rgba(32,190,255,0.45)] transition-shadow"
          style={FONT_MONO}
        >
          <FaDiscord className="h-4 w-4" />
          Join Discord
        </span>
      </a>
    </section>
  );
}
