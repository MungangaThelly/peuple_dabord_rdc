
import Link from "next/link";
import SiteHeader from "@/components/site-header";

const missions = [
  {
    number: "01",
    title: "Donner la parole aux citoyens",
    description:
      "Faciliter l'expression des préoccupations, des propositions et des attentes des citoyens de la RDC et de la diaspora.",
  },
  {
    number: "02",
    title: "Encourager la participation",
    description:
      "Permettre aux citoyens de lancer et soutenir des pétitions et de contribuer à des consultations collectives.",
  },
  {
    number: "03",
    title: "Renforcer la transparence",
    description:
      "Mettre à disposition des informations documentées sur les institutions, leurs engagements et leurs réponses.",
  },
  {
    number: "04",
    title: "Promouvoir le dialogue",
    description:
      "Favoriser des échanges pacifiques, respectueux et constructifs entre citoyens autour des enjeux publics.",
  },
];

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="bg-blue-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-400">
            Notre mission
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Faire de la participation citoyenne une réalité quotidienne.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100">
            Construire un espace numérique indépendant qui rapproche les
            citoyens du débat public et encourage une culture de
            responsabilité démocratique en République démocratique du Congo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
            Ce qui nous guide
          </p>
          <h2 className="mt-4 text-3xl font-bold text-blue-950">
            Quatre engagements au service des citoyens.
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            Notre démarche repose sur la participation, le respect des
            libertés fondamentales, l'accès à l'information et la
            responsabilité dans le débat public.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {missions.map((mission) => (
            <article
              key={mission.number}
              className="rounded-xl border border-slate-200 p-8 transition hover:border-blue-300 hover:shadow-sm"
            >
              <p className="text-sm font-bold text-amber-600">
                {mission.number}
              </p>
              <h3 className="mt-4 text-xl font-bold text-blue-950">
                {mission.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                {mission.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-amber-50 p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-blue-950">
            Une plateforme au service de l'intérêt général
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-slate-600">
            PEUPLE D'ABORD – RDC n'a pas vocation à remplacer les
            institutions de la République, le Parlement ou les juridictions.
            Les consultations sont des démarches citoyennes consultatives.
            Notre ambition est de contribuer à une démocratie plus
            participative, informée et responsable.
          </p>
          <Link
            href="/participer"
            className="mt-8 inline-block rounded-lg bg-blue-950 px-6 py-4 font-semibold text-white hover:bg-blue-800"
          >
            Comment participer ?
          </Link>
        </div>
      </section>

      <footer className="bg-blue-950 px-6 py-10 text-center text-sm text-blue-200">
        PEUPLE D'ABORD – RDC · La participation citoyenne au service de l'intérêt général.
      </footer>
    </main>
  );
}
