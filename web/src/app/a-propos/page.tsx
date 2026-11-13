
import Link from "next/link";
import SiteHeader from "@/components/site-header";

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="bg-blue-950 px-6 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-400">
            À propos de nous
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Le citoyen au cœur de la vie publique.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100">
            PEUPLE D'ABORD – RDC est une initiative citoyenne indépendante
            et non partisane consacrée à la participation démocratique,
            au dialogue public et à la responsabilité institutionnelle.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
              Notre identité
            </p>
            <h2 className="mt-4 text-3xl font-bold text-blue-950">
              Une initiative au service de l'intérêt général.
            </h2>
          </div>

          <div className="space-y-5 leading-8 text-slate-600">
            <p>
              La vie démocratique ne se limite pas aux périodes électorales.
              Elle suppose également la possibilité pour les citoyens de
              s'informer, de s'exprimer, de proposer des initiatives et de
              suivre les réponses apportées aux préoccupations collectives.
            </p>
            <p>
              PEUPLE D'ABORD – RDC entend mettre à disposition un espace
              numérique permettant de structurer cette participation,
              dans le respect des libertés, des droits fondamentaux et
              de la dignité de chacun.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 p-7">
            <h3 className="text-xl font-bold text-blue-950">
              Indépendance
            </h3>
            <p className="mt-4 leading-7 text-slate-600">
              Une démarche citoyenne sans affiliation partisane.
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 p-7">
            <h3 className="text-xl font-bold text-blue-950">
              Participation
            </h3>
            <p className="mt-4 leading-7 text-slate-600">
              Un espace ouvert au dialogue et aux initiatives collectives.
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 p-7">
            <h3 className="text-xl font-bold text-blue-950">
              Responsabilité
            </h3>
            <p className="mt-4 leading-7 text-slate-600">
              Une culture de transparence, de documentation et de suivi.
            </p>
          </article>
        </div>

        <div className="mt-16 rounded-2xl bg-amber-50 p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-blue-950">
            Notre ambition
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-slate-600">
            Contribuer à une culture démocratique dans laquelle chaque
            citoyen peut participer au débat public, formuler des
            propositions et demander des comptes dans un cadre
            pacifique, respectueux et transparent.
          </p>
          <Link
            href="/participer"
            className="mt-8 inline-block rounded-lg bg-blue-950 px-6 py-4 font-semibold text-white hover:bg-blue-800"
          >
            Découvrir comment participer
          </Link>
        </div>
      </section>

      <footer className="bg-blue-950 px-6 py-10 text-center text-sm text-blue-200">
        PEUPLE D'ABORD – RDC · Plateforme indépendante et non partisane.
      </footer>
    </main>
  );
}
