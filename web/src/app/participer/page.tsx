
import Link from "next/link";
import SiteHeader from "@/components/site-header";

const participationOptions = [
  {
    number: "01",
    title: "Créer un compte citoyen",
    description:
      "Rejoindre la plateforme avec une adresse e-mail privée et choisir un pseudonyme public.",
    href: "/inscription",
    action: "Créer mon compte",
  },
  {
    number: "02",
    title: "Soutenir une pétition",
    description:
      "Découvrir les initiatives citoyennes, consulter leurs objectifs et soutenir celles auxquelles vous adhérez.",
    href: "/petitions",
    action: "Voir les pétitions",
  },
  {
    number: "03",
    title: "Participer aux consultations",
    description:
      "Exprimer votre opinion et contribuer aux réflexions collectives sur les questions d'intérêt général.",
    href: "/consultations",
    action: "Voir les consultations",
  },
  {
    number: "04",
    title: "Suivre l'action publique",
    description:
      "Consulter les informations documentées et suivre les engagements et réponses des institutions.",
    href: "/observatoire",
    action: "Découvrir l'observatoire",
  },
];

export default function ParticiperPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="bg-blue-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-400">
            Participer
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Votre voix compte. Votre participation construit l'avenir.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100">
            Que vous viviez en République démocratique du Congo ou dans la
            diaspora, vous pouvez contribuer au débat public et soutenir
            des initiatives citoyennes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
            Comment commencer ?
          </p>
          <h2 className="mt-4 text-3xl font-bold text-blue-950">
            Quatre façons de participer.
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            La participation citoyenne prend plusieurs formes.
            Choisissez l'espace qui correspond à votre démarche.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {participationOptions.map((option) => (
            <article
              key={option.number}
              className="rounded-xl border border-slate-200 p-8 transition hover:border-blue-300 hover:shadow-sm"
            >
              <p className="text-sm font-bold text-amber-600">
                {option.number}
              </p>
              <h3 className="mt-4 text-xl font-bold text-blue-950">
                {option.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                {option.description}
              </p>
              <Link
                href={option.href}
                className="mt-6 inline-block font-semibold text-blue-800 hover:underline"
              >
                {option.action} →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-amber-50 p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-blue-950">
            Participer dans le respect de chacun
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-slate-600">
            La plateforme repose sur le respect des libertés fondamentales,
            la dignité humaine, le dialogue pacifique et la responsabilité.
            Les contributions doivent être respectueuses et ne pas porter
            atteinte aux droits d'autrui.
          </p>
          <Link
            href="/inscription"
            className="mt-8 inline-block rounded-lg bg-blue-950 px-6 py-4 font-semibold text-white hover:bg-blue-800"
          >
            Rejoindre la plateforme
          </Link>
        </div>
      </section>

      <footer className="bg-blue-950 px-6 py-10 text-center text-sm text-blue-200">
        PEUPLE D'ABORD – RDC · La participation citoyenne au service de l'intérêt général.
      </footer>
    </main>
  );
}
