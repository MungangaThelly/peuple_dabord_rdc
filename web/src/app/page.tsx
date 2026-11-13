import SiteHeader from "@/components/site-header";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      {/* Hero */}
      <section id="accueil" className="relative overflow-hidden bg-blue-950">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-800/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
          <div>
            <p className="mb-6 inline-flex rounded-full border border-blue-300/30 bg-blue-900/60 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-100">
              Plateforme citoyenne indépendante
            </p>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              La voix du peuple.
              <span className="block text-amber-400">
                L'avenir en commun.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-blue-100">
              Un espace de participation citoyenne pour proposer, débattre,
              soutenir des initiatives et suivre les réponses des institutions
              en République démocratique du Congo.
            </p>

            <div
              id="participer"
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#petitions"
                className="rounded-lg bg-amber-400 px-7 py-4 text-center font-bold text-blue-950 transition hover:bg-amber-300"
              >
                Découvrir les pétitions
              </a>
              <a
                href="#apropos"
                className="rounded-lg border border-white/30 px-7 py-4 text-center font-semibold text-white transition hover:bg-white/10"
              >
                Comprendre la plateforme
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
              Notre conviction
            </p>
            <blockquote className="mt-6 text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
              « La citoyenneté ne se limite pas au vote. Elle se construit
              chaque jour par la participation, le dialogue et la
              responsabilité. »
            </blockquote>
            <div className="mt-8 h-1 w-16 rounded-full bg-amber-400" />
            <p className="mt-4 text-sm text-blue-200">
              PEUPLE D'ABORD – RDC
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="apropos" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
            Notre mission
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
            Remettre le citoyen au cœur de la vie publique.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            PEUPLE D'ABORD est un espace indépendant et non partisan qui
            facilite l'expression citoyenne, la participation démocratique
            et le suivi de l'action publique.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
              Nos espaces citoyens
            </p>
            <h2 className="mt-4 text-3xl font-bold text-blue-950 sm:text-4xl">
              Participer, dialoguer, demander des comptes.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <article id="petitions" className="rounded-2xl border border-slate-200 bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-950">
                ✍
              </div>
              <h3 className="mt-6 text-xl font-bold text-blue-950">
                Pétitions citoyennes
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Initier ou soutenir des propositions collectives sur les
                questions qui concernent la société congolaise.
              </p>
              <a href="#participer" className="mt-6 inline-block font-semibold text-blue-800 hover:underline">
                En savoir plus →
              </a>
            </article>

            <article id="consultations" className="rounded-2xl border border-slate-200 bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-xl text-amber-700">
                ◉
              </div>
              <h3 className="mt-6 text-xl font-bold text-blue-950">
                Consultations citoyennes
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Exprimer son point de vue, participer aux débats et contribuer
                à des réflexions collectives.
              </p>
              <a href="#participer" className="mt-6 inline-block font-semibold text-blue-800 hover:underline">
                En savoir plus →
              </a>
            </article>

            <article id="observatoire" className="rounded-2xl border border-slate-200 bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl text-emerald-700">
                ◎
              </div>
              <h3 className="mt-6 text-xl font-bold text-blue-950">
                Observatoire citoyen
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Consulter des informations documentées et suivre les réponses
                et engagements des institutions publiques.
              </p>
              <a href="#participer" className="mt-6 inline-block font-semibold text-blue-800 hover:underline">
                En savoir plus →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Participation */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl bg-amber-50 px-8 py-12 text-center sm:px-16">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-700">
            Une citoyenneté active
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold text-blue-950 sm:text-4xl">
            La démocratie se construit aussi entre les élections.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            En RDC comme dans la diaspora, chaque citoyen doit pouvoir
            contribuer au débat public dans un cadre respectueux,
            transparent et responsable.
          </p>
          <a
            href="#apropos"
            className="mt-8 inline-block rounded-lg bg-blue-950 px-7 py-4 font-semibold text-white transition hover:bg-blue-800"
          >
            Découvrir notre démarche
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-extrabold">PEUPLE D'ABORD – RDC</p>
            <p className="mt-2 text-sm text-blue-200">
              La participation citoyenne au service de l'intérêt général.
            </p>
          </div>
          <p className="text-sm text-blue-200">
            Plateforme indépendante et non partisane.
          </p>
        </div>
        <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-blue-300">
          © 2026 PEUPLE D'ABORD – RDC. Tous droits réservés.
        </div>
      </footer>
    </main>
  );
}
