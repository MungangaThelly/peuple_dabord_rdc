
"use client";

import { useState } from "react";

export default function PetitionForm() {
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [objective, setObjective] = useState("");
  const [justification, setJustification] = useState("");
  const [recipient, setRecipient] = useState("");

  return (
    <form className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-blue-950">
          Présentation de votre pétition
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Présentez clairement votre initiative. Les informations seront
          examinées avant toute publication.
        </p>
      </div>

      <div>
        <label htmlFor="title" className="mb-2 block font-semibold text-blue-950">
          Titre de la pétition *
        </label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          maxLength={150}
          placeholder="Ex. : Amélioration de l'accès à l'eau potable"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-800"
        />
      </div>

      <div>
        <label htmlFor="problem" className="mb-2 block font-semibold text-blue-950">
          Quel problème souhaitez-vous signaler ? *
        </label>
        <textarea
          id="problem"
          value={problem}
          onChange={(event) => setProblem(event.target.value)}
          required
          maxLength={3000}
          rows={5}
          placeholder="Décrivez la situation et les personnes concernées..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-800"
        />
      </div>

      <div>
        <label htmlFor="objective" className="mb-2 block font-semibold text-blue-950">
          Quel changement demandez-vous ? *
        </label>
        <textarea
          id="objective"
          value={objective}
          onChange={(event) => setObjective(event.target.value)}
          required
          maxLength={2000}
          rows={4}
          placeholder="Expliquez précisément le résultat souhaité..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-800"
        />
      </div>

      <div>
        <label htmlFor="justification" className="mb-2 block font-semibold text-blue-950">
          Justification et éléments disponibles
        </label>
        <textarea
          id="justification"
          value={justification}
          onChange={(event) => setJustification(event.target.value)}
          maxLength={4000}
          rows={5}
          placeholder="Présentez vos arguments, faits et éventuelles sources..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-800"
        />
      </div>

      <div>
        <label htmlFor="recipient" className="mb-2 block font-semibold text-blue-950">
          Institution ou autorité concernée
        </label>
        <input
          id="recipient"
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
          maxLength={200}
          placeholder="Ex. : Ministère, Assemblée provinciale..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-800"
        />
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="font-semibold text-blue-950">
          Information sur la modération
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Toute proposition sera examinée avant publication.
          Elle devra respecter les droits fondamentaux, la dignité
          humaine et les règles de participation de la plateforme.
        </p>
      </div>

      <button
        type="button"
        disabled
        className="w-full cursor-not-allowed rounded-lg bg-slate-400 px-6 py-4 font-semibold text-white"
      >
        Enregistrement en cours de préparation
      </button>

      <p className="text-xs text-slate-500">
        Le formulaire est actuellement en préparation. Aucune donnée
        n'est encore enregistrée ou transmise.
      </p>
    </form>
  );
}
