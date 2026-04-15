import Link from "next/link";

const NAV_LINKS = ["Theme", "Prizes", "Timeline", "Workshops"] as const;

function Logo() {
  return (
    <Link
      href="https://dscubed.org.au"
      className="flex items-center gap-2 text-xl font-bold tracking-[0.5px]"
    >
      <svg
        width="135"
        height="157"
        viewBox="0 0 135 157"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
      >
        <path
          d="M111.282 53.2729L94.4429 62.9744V94.0229L67.4985 109.546L40.5569 94.0229V62.9744L67.4985 47.4515V28.0486L23.718 53.2729V103.724L67.4985 128.952L111.282 103.724V53.2729Z"
          fill="currentColor"
        />
        <path
          d="M134.857 117.309L118.018 107.607L67.4985 136.714L16.982 107.607V49.3928L67.4985 20.2857L118.018 49.3928L134.857 39.6914L67.4985 0.880005L0.143066 39.6914V117.309L67.4985 156.117L134.857 117.309Z"
          fill="currentColor"
        />
      </svg>
    </Link>
  );
}

function NavLinks() {
  return (
    <nav className="flex gap-8">
      {NAV_LINKS.map((label) => (
        <a
          key={label}
          href="#"
          className="text-white text-[11px] font-medium tracking-[1px] uppercase hover:text-[#23d191] transition-colors"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

function ContactButton() {
  return (
    <button
      className="flex items-center gap-2 px-5 py-[10px] rounded-[4px] font-semibold text-[13px] text-black cursor-pointer"
      style={{
        background: "linear-gradient(135deg, #2ddb9b 0%, #159b6b 100%)",
      }}
    >
      Sign up
    </button>
  );
}

export default function Navbar() {
  return (
    <header className="flex justify-between items-center py-4.5 border-b border-white/5 backdrop-blur-xl px-12">
      <div className="flex items-center gap-12">
        <Logo />
        <NavLinks />
      </div>
      <ContactButton />
    </header>
  );
}
