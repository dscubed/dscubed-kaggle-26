type Member = {
  name: string;
  role: string;
  /** Path to headshot in /public — null renders the monogram placeholder */
  photo: string | null;
};

const DIRECTOR: Member = {
  name: "Stanley Zaranski",
  role: "Education Director",
  photo: null,
};

const OFFICERS: Member[] = [
  { name: "Officer One", role: "Education Officer", photo: null },
  { name: "Officer Two", role: "Education Officer", photo: null },
  { name: "Officer Three", role: "Education Officer", photo: null },
  { name: "Officer Four", role: "Education Officer", photo: null },
  { name: "Officer Five", role: "Education Officer", photo: null },
  { name: "Officer Six", role: "Education Officer", photo: null },
];

const DISCORD_URL = "https://discord.gg/dscubed";

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
        className={`${dims} rounded-sm object-cover border border-[#23d191]/30`}
      />
    );
  }
  return (
    <div
      className={`${dims} relative flex items-center justify-center rounded-sm border border-[#23d191]/30 bg-[#02120a] overflow-hidden`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(35,209,145,0.06) 0px, rgba(35,209,145,0.06) 1px, transparent 1px, transparent 3px)",
      }}
    >
      <span className="text-[#23d191] tracking-[2px]" style={FONT_MONO}>
        {initials(member.name)}
      </span>
      <span className="absolute top-1 left-1 h-2 w-2 border-t border-l border-[#23d191]/60" />
      <span className="absolute top-1 right-1 h-2 w-2 border-t border-r border-[#23d191]/60" />
      <span className="absolute bottom-1 left-1 h-2 w-2 border-b border-l border-[#23d191]/60" />
      <span className="absolute bottom-1 right-1 h-2 w-2 border-b border-r border-[#23d191]/60" />
    </div>
  );
}

function OfficerCard({ member }: { member: Member }) {
  return (
    <div
      className="relative flex flex-col items-center gap-3 rounded-sm border border-white/10 bg-[#02120a]/70 p-5 hover:border-[#23d191]/40 hover:bg-[#02120a]/90 transition-colors"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(35,209,145,0.02) 0px, rgba(35,209,145,0.02) 1px, transparent 1px, transparent 3px)",
      }}
    >
      <Avatar member={member} size="md" />
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-[14px] text-white">{member.name}</span>
        <span
          className="text-[9px] tracking-[2px] uppercase text-[#23d191]/80"
          style={FONT_MONO}
        >
          {member.role}
        </span>
      </div>
    </div>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.317 4.369A19.791 19.791 0 0 0 16.558 3.2a.074.074 0 0 0-.079.037c-.34.607-.719 1.398-.984 2.02a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.995-2.02.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-3.759 1.169.07.07 0 0 0-.032.027C2.533 8.045 1.9 11.605 2.21 15.121a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.027c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.105 13.1 13.1 0 0 1-1.872-.893.077.077 0 0 1-.008-.128c.126-.094.252-.192.371-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.245.198.372.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.893.077.077 0 0 0-.04.106c.36.699.772 1.364 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-4.063-.838-7.594-3.549-10.725a.061.061 0 0 0-.031-.028zM8.02 12.98c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.976 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.954-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z" />
    </svg>
  );
}

export default function MeetTheTeam() {
  return (
    <section className="relative max-w-400 mx-auto px-12 pb-32 w-full">
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[11px] tracking-[3px] uppercase text-[#23d191]"
          style={FONT_MONO}
        >
          // TEAM_ROSTER
        </span>
        <span className="h-px flex-1 bg-[#23d191]/20" />
      </div>

      <h2
        className="text-6xl leading-[0.95] uppercase text-white mb-4"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        Meet The Team
      </h2>
      <p className="text-[15px] text-[#c2cfc9] leading-[1.7] max-w-[640px] mb-10">
        The traders behind the desk — your education crew designs the
        curriculum, runs the workshops, and makes sure no one walks in cold.
      </p>

      {/* Director — featured */}
      <div
        className="relative rounded-md border border-[#23d191]/30 bg-[#02120a]/85 p-8 mb-6 shadow-[0_0_40px_rgba(35,209,145,0.08)_inset,0_0_60px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(35,209,145,0.04) 0px, rgba(35,209,145,0.04) 1px, transparent 1px, transparent 3px)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 flex items-center px-5 py-2 border-b border-[#23d191]/20 bg-black/40 text-[10px] tracking-[2px] uppercase"
          style={FONT_MONO}
        >
          <span className="text-[#23d191]">DSCUBED · DIRECTOR</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 pt-6">
          <Avatar member={DIRECTOR} size="lg" />
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span
              className="text-[10px] tracking-[3px] uppercase text-[#23d191]"
              style={FONT_MONO}
            >
              {DIRECTOR.role}
            </span>
            <h3
              className="text-4xl uppercase leading-[1] text-white"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              {DIRECTOR.name}
            </h3>
            <p className="text-[14px] text-[#c2cfc9] leading-[1.6] max-w-[520px]">
              Stanley heads up DSCubed Education — shaping the workshop
              syllabus, mentoring competitors, and making sure the Kaggle comp
              runs like a well-oiled order book.
            </p>
          </div>
        </div>
      </div>

      {/* Officers grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {OFFICERS.map((o) => (
          <OfficerCard key={o.name} member={o} />
        ))}
      </div>

      {/* Discord CTA banner */}
      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noreferrer"
        className="relative flex flex-col sm:flex-row items-center justify-between gap-4 rounded-md border border-[#23d191]/30 bg-[#02120a]/85 px-8 py-6 overflow-hidden group hover:border-[#23d191]/60 transition-colors shadow-[0_0_40px_rgba(35,209,145,0.06)_inset]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(35,209,145,0.03) 0px, rgba(35,209,145,0.03) 1px, transparent 1px, transparent 3px)",
        }}
      >
        <div className="flex flex-col gap-1">
          <span
            className="text-[10px] tracking-[3px] uppercase text-[#23d191]"
            style={FONT_MONO}
          >
            // CONTACT_US
          </span>
          <span className="text-[20px] text-white">
            More questions? Ask the team directly on our Discord.
          </span>
        </div>

        <span
          className="inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-[#23d191]/50 bg-[#23d191]/10 text-[#23d191] text-[12px] tracking-[2px] uppercase shadow-[inset_0_0_12px_rgba(35,209,145,0.25)] group-hover:shadow-[inset_0_0_20px_rgba(35,209,145,0.45)] transition-shadow"
          style={FONT_MONO}
        >
          <DiscordIcon className="h-4 w-4" />
          Join Discord
        </span>
      </a>
    </section>
  );
}
