
import Link from "next/link";

const navigation = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Mission", href: "/mission" },
  { label: "Participer", href: "/participer" },
  { label: "Pétitions", href: "/petitions" },
  { label: "Consultations", href: "/consultations" },
  { label: "Observatoire", href: "/observatoire" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-950 text-lg font-bold text-white">
            P
          </div>
          <div>
            <p className="text-lg font-extrabold tracking-tight text-blue-950">
              PEUPLE D'ABORD
            </p>
            <p className="text-xs font-medium tracking-widest text-slate-500">
              RÉPUBLIQUE DÉMOCRATIQUE DU CONGO
            </p>
          </div>
        </Link>

        <nav className="hidden flex-wrap items-center justify-center gap-5 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/connexion"
          className="shrink-0 rounded-lg bg-blue-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          Connexion
        </Link>
      </div>
    </header>
  );
}
