
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function InscriptionPage() {
  const [pseudonym, setPseudonym] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (password.length < 12) {
      setMessage("Le mot de passe doit contenir au moins 12 caractères.");
      return;
    }

    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      setMessage("Le mot de passe doit contenir au moins une lettre et un chiffre.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Les deux mots de passe ne correspondent pas.");
      return;
    }

    if (pseudonym.trim().length < 3) {
      setMessage("Le pseudonyme doit contenir au moins 3 caractères.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            public_pseudonym: pseudonym.trim(),
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage(
        "Inscription enregistrée. Consultez votre boîte e-mail pour confirmer votre adresse avant de vous connecter."
      );
      setPassword("");
      setConfirmPassword("");
    } catch {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <Link href="/" className="text-sm font-semibold text-blue-800 hover:underline">
          ← Retour à l'accueil
        </Link>

        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
            PEUPLE D'ABORD – RDC
          </p>
          <h1 className="mt-3 text-3xl font-bold text-blue-950">
            Créer un compte citoyen
          </h1>
          <p className="mt-3 leading-7 text-slate-600">
            Rejoignez un espace indépendant de participation et de dialogue
            citoyen.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="pseudonym" className="mb-2 block text-sm font-semibold text-slate-700">
              Pseudonyme public
            </label>
            <input
              id="pseudonym"
              type="text"
              required
              minLength={3}
              maxLength={80}
              autoComplete="nickname"
              value={pseudonym}
              onChange={(event) => setPseudonym(event.target.value)}
              placeholder="Ex. CitoyenDebout"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
            />
            <p className="mt-2 text-xs text-slate-500">
              Ce pseudonyme sera visible publiquement. N'utilisez pas votre adresse e-mail.
            </p>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
              Adresse e-mail privée
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="vous@exemple.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={12}
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="12 caractères minimum"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
            />
            <p className="mt-2 text-xs text-slate-500">
              Au moins 12 caractères, avec des lettres et des chiffres.
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Répétez votre mot de passe"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {message && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-lg bg-blue-50 p-4 text-sm leading-6 text-blue-900"
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-950 px-6 py-4 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Création du compte..." : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Vous avez déjà un compte ?{" "}
          <Link href="/connexion" className="font-semibold text-blue-800 hover:underline">
            Se connecter
          </Link>
        </p>

        <p className="mt-6 text-xs leading-5 text-slate-500">
          La création d'un compte ne constitue pas une vérification de votre
          identité civile. Votre pseudonyme public est distinct de votre
          adresse e-mail privée.
        </p>
      </section>
    </main>
  );
}
