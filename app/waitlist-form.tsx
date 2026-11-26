"use client";

import { useActionState } from "react";
import { joinWaitlist, type JoinState } from "./actions";

const initial: JoinState = { status: "idle" };

export function WaitlistForm() {
  const [state, action, pending] = useActionState(joinWaitlist, initial);

  if (state.status === "success") {
    return (
      <div className="rise flex flex-col items-center gap-5 py-4 text-center">
        <span className="eyebrow text-gold">Your place</span>
        <p className="font-serif text-7xl font-light leading-none tabular-nums text-ink">
          <span className="align-top text-2xl italic text-gold">No.</span>
          {String(state.position).padStart(3, "0")}
        </p>
        <div className="gold-rule w-16" />
        <p className="max-w-[16rem] font-serif text-xl italic leading-snug text-ink">
          Thank you, {state.name}.
        </p>
        <p className="max-w-[16rem] text-[13px] leading-relaxed text-muted">
          Your invitation is reserved. We&rsquo;ll be in touch, personally,
          before anyone else.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex w-full flex-col gap-3">
      <div className="field">
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          placeholder=" "
        />
        <label htmlFor="name">Full name</label>
      </div>
      <div className="field">
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder=" "
        />
        <label htmlFor="email">Email address</label>
      </div>
      <button type="submit" disabled={pending} className="btn mt-8">
        <span className="relative">
          {pending ? "Joining" : "Join waitlist"}
        </span>
        {!pending && (
          <span aria-hidden className="arrow relative text-sm">
            &rarr;
          </span>
        )}
      </button>
      <p
        aria-live="polite"
        className="min-h-5 text-center text-[13px] text-[#9a4a3c]"
      >
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
