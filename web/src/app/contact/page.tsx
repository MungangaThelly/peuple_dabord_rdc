
import Link from "next/link";
import SiteHeader from "@/components/site-header";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="bg-blue-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-400">
            Contact
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Échangeons autour de la participation citoyenne.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100">
            Une question, une proposition ou une demande d'information ?
            Nous souhaitons faciliter le dialogue avec les citoyens et
            les organisations intéressées par notre démarche.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
            Nous contacter
          </p>
          <h2 className="mt-4 text-3xl font-bold text-blue-950">
            Votre contribution nous intéresse.
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            PEUPLE D'ABORD – RDC est une initiative indépendante.
            Nous sommes ouverts aux échanges avec les citoyens,
            les chercheurs, les associations et les institutions.
          </p>

          <div className="mt-10 rounded-xl bg-slate-50 p-7">
            <h3 className="font-bold text-blue-950">
              Les sujets qui nous intéressent
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              <li>• Participation et initiatives citoyennes</li>
              <li>• Partenariats et coopération</li>
              <li>• Recherche et réflexion démocratique</li>
              <li>• Suggestions et améliorations de la plateforme</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-blue-950">
            Nous écrire
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Notre canal de contact officiel sera communiqué ici
            dès que l'adresse électronique dédiée à la plateforme
            sera configurée.
          </p>

          <div className="mt-8 rounded-lg bg-amber-50 p-5">
            <p className="text-sm font-semibold text-blue-950">
              PEUPLE D'ABORD – RDC
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Plateforme citoyenne indépendante et non partisane.
            </p>
          </div>

          <Link
            href="/participer"
            className="mt-8 inline-block rounded-lg bg-blue-950 px-6 py-4 font-semibold text-white hover:bg-blue-800"
          >
            Découvrir comment participer
          </Link>
        </div>
      </section>

      <footer className="bg-blue-950 px-6 py-10 text-center text-sm text-blue-200">
        PEUPLE D'ABORD – RDC · La participation citoyenne au service de l'intérêt général.
      </footer>
    </main>
  );
}
