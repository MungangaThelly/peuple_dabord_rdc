
import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">
          ✓
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-widest text-amber-600">
          PEUPLE D'ABORD – RDC
        </p>

        <h1 className="mt-4 text-3xl font-bold text-blue-950">
          Adresse e-mail confirmée
        </h1>

        <p className="mt-5 leading-7 text-slate-600">
          Votre adresse e-mail a été confirmée. Vous pouvez maintenant
          accéder à votre compte citoyen.
        </p>

        <Link
          href="/connexion"
          className="mt-8 inline-block w-full rounded-lg bg-blue-950 px-6 py-4 font-semibold text-white transition hover:bg-blue-800"
        >
          Se connecter
        </Link>

        <Link
          href="/"
          className="mt-5 inline-block text-sm font-semibold text-blue-800 hover:underline"
        >
          Retour à l'accueil
        </Link>
      </section>
    </main>
  );
}
