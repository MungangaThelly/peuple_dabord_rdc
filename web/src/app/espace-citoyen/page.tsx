
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export const instant = false;

export default async function EspaceCitoyenPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/connexion");
  }

  const pseudonym =
    user.user_metadata?.public_pseudonym || "Citoyen";

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-lg font-extrabold text-blue-950">
            PEUPLE D'ABORD – RDC
          </Link>
          <span className="text-sm text-slate-500">
            Espace citoyen
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
          Votre espace personnel
        </p>

        <h1 className="mt-4 text-3xl font-bold text-blue-950">
          Bienvenue, {pseudonym}
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Retrouvez ici vos futures activités citoyennes, vos pétitions,
          vos consultations et les initiatives que vous soutenez.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-blue-950">Mes pétitions</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Suivre vos initiatives et vos signatures.
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-blue-950">Mes consultations</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Participer aux débats et consultations citoyennes.
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-blue-950">Mon profil</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Consulter vos informations de compte.
            </p>
          </article>
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Votre pseudonyme est public. Votre adresse e-mail reste privée.
        </p>
      </section>
    </main>
  );
}
