
import Link from "next/link";
import SiteHeader from "@/components/site-header";

const categories = [
  "Toutes les pétitions",
  "En cours",
  "Clôturées",
];

export default function PetitionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="bg-blue-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-400">
            Participation citoyenne
          </p>
          <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">
            Pétitions citoyennes
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Découvrez les préoccupations collectives, soutenez les initiatives
            citoyennes et contribuez au débat public en République démocratique
            du Congo.
          </p>
          <Link
            href="/connexion"
            className="mt-8 inline-block rounded-lg bg-amber-400 px-7 py-4 font-bold text-blue-950 hover:bg-amber-300"
          >
            Proposer une pétition
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <span
              key={category}
              className={`rounded-full px-5 py-3 text-sm font-semibold ${
                index === 0
                  ? "bg-blue-950 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-950">
            ✍
          </div>
          <h2 className="mt-6 text-2xl font-bold text-blue-950">
            Les premières pétitions arrivent bientôt
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            Cet espace accueillera les initiatives citoyennes publiées
            et validées selon les règles de la plateforme.
          </p>
          <Link
            href="/inscription"
            className="mt-8 inline-block rounded-lg bg-blue-950 px-6 py-4 font-semibold text-white hover:bg-blue-800"
          >
            Créer mon compte citoyen
          </Link>
        </div>
      </section>

      <footer className="bg-blue-950 px-6 py-10 text-center text-sm text-blue-200">
        PEUPLE D'ABORD – RDC · La participation citoyenne au service de l'intérêt général.
      </footer>
    </main>
  );
}
