import { Suspense } from "react";
import { connection } from "next/server";
import { supabase } from "@/lib/supabase";
import { WaitlistForm } from "./waitlist-form";

async function getCount() {
  await connection();
  const { data, error } = await supabase.rpc("waitlist_count");
  return error || data == null ? null : Number(data);
}

async function WaitlistCount() {
  const count = await getCount();
  if (count == null) return null;

  return (
    <div className="rise flex flex-col items-center gap-2">
      <span className="font-serif text-4xl font-light tabular-nums text-ink">
        {count.toLocaleString()}
      </span>
      <span className="eyebrow text-muted">
        {count === 1 ? "Guest" : "Guests"} awaiting invitation
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className="frame" aria-hidden />

      {/* Corner details */}
      <div className="eyebrow pointer-events-none fixed inset-x-8 top-9 z-10 hidden justify-between text-muted sm:inset-x-12 sm:flex">
        <span>Nerissa</span>
        <span>Private Preview</span>
      </div>
      <div className="eyebrow pointer-events-none fixed inset-x-8 bottom-9 z-10 hidden justify-between text-muted sm:inset-x-12 sm:flex">
        <span>Est. MMXXVI</span>
        <span>By invitation only</span>
      </div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 py-24">
        <div className="flex w-full max-w-md flex-col items-center gap-12">
          <header className="rise flex flex-col items-center gap-7 text-center">
            <h1 className="font-serif text-7xl font-light leading-[0.85] tracking-[-0.02em] text-ink sm:text-[7.5rem]">
              Nerissa
            </h1>
            <div className="flex items-center gap-4">
              <div className="gold-rule w-10" />
              <span className="font-serif text-lg italic text-gold">
                for the legal mind
              </span>
              <div className="gold-rule w-10" />
            </div>
            <p className="max-w-sm text-[15px] leading-7 text-muted">
              An AI assistant for lawyers and clerks. Nerissa handles your
              drafting, scheduling and research &mdash; leaving you free for
              the work that truly demands your intellect.
            </p>
          </header>

          <div
            className="rise card w-full px-8 pb-6 pt-8 sm:px-10"
            style={{ animationDelay: "180ms" }}
          >
            <WaitlistForm />
          </div>

          <Suspense fallback={<div className="h-16" />}>
            <WaitlistCount />
          </Suspense>
        </div>
      </main>
    </>
  );
}
