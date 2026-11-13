
import { redirect } from "next/navigation";
import SiteHeader from "@/components/site-header";
import { createClient } from "@/lib/supabase-server";
import PetitionForm from "@/components/petition-form";

export const instant = false;

export default async function CreerPetitionPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/connexion?redirect=/petitions/creer");
  }

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="bg-blue-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-400">
            Initiative citoyenne
          </p>
          <h1 className="mt-5 text-4xl font-extrabold">
            Proposer une pétition
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-blue-100">
            Présentez une préoccupation collective et expliquez
            le changement que vous souhaitez défendre.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <PetitionForm />
      </section>
    </main>
  );
}
