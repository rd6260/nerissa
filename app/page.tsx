import { Suspense } from "react";
import { connection } from "next/server";
import { supabase } from "@/lib/supabase";
import { WaitlistForm } from "./waitlist-form";

async function WaitlistCount() {
  await connection();
  const { data, error } = await supabase.rpc("waitlist_count");
  if (error || data == null) return null;
  const count = Number(data);

  return (
    <p className="rise flex items-baseline gap-2 text-muted">
      <span className="font-serif text-2xl tabular-nums text-ink">
        {count.toLocaleString()}
      </span>
      <span className="text-[13px] tracking-wide">
        {count === 1 ? "person is" : "people are"} already waiting
      </span>
    </p>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-6">
      <div className="flex w-full max-w-sm flex-1 flex-col items-center justify-center gap-14 py-20">
        <header
          className="rise flex flex-col items-center gap-6 text-center"
          style={{ animationDelay: "80ms" }}
        >
          <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-muted">
            <span className="h-px w-6 bg-faint" />
            By invitation
            <span className="h-px w-6 bg-faint" />
          </span>
          <h1 className="font-serif text-7xl leading-[0.9] tracking-tight text-ink sm:text-8xl">
            Ner<span className="italic">issa</span>
          </h1>
          <p className="max-w-[18rem] text-[15px] leading-relaxed text-muted">
            Something quietly beautiful is on its way. Join the list to be
            among the first.
          </p>
        </header>

        <div className="rise w-full" style={{ animationDelay: "220ms" }}>
          <WaitlistForm />
        </div>

        <Suspense fallback={<p className="h-8" />}>
          <WaitlistCount />
        </Suspense>
      </div>

      <footer className="pb-8 text-[11px] uppercase tracking-[0.3em] text-faint">
        Nerissa &middot; {"MMXXVI"}
      </footer>
    </main>
  );
}
