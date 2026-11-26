"use client";

import { useActionState } from "react";
import { joinWaitlist, type JoinState } from "./actions";

const initial: JoinState = { status: "idle" };

export function WaitlistForm() {
  const [state, action, pending] = useActionState(joinWaitlist, initial);

  if (state.status === "success") {
    return (
      <div className="rise flex flex-col items-center gap-3 py-6 text-center">
        <p className="font-serif text-3xl italic text-ink">
          Thank you, {state.name}.
        </p>
        <p className="text-[15px] leading-relaxed text-muted">
          Your place is reserved. We&rsquo;ll write when the doors open.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex w-full flex-col gap-4">
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
        <label htmlFor="name">Name</label>
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
      <button type="submit" disabled={pending} className="btn mt-6">
        {pending ? (
          "Reserving…"
        ) : (
          <>
            Request an invitation
            <span aria-hidden className="arrow">
              &rarr;
            </span>
          </>
        )}
      </button>
      <p aria-live="polite" className="min-h-5 text-center text-sm text-[#9a4a3c]">
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
