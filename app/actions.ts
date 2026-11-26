"use server";

import { refresh } from "next/cache";
import { supabase } from "@/lib/supabase";

export type JoinState =
  | { status: "idle" }
  | { status: "success"; name: string; position: number }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function joinWaitlist(
  _prev: JoinState,
  formData: FormData,
): Promise<JoinState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!name || name.length > 100) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { status: "error", message: "Please enter a valid email." };
  }

  const { data, error } = await supabase.rpc("join_waitlist", {
    p_name: name,
    p_email: email,
  });

  if (error) {
    return { status: "error", message: "Something went wrong. Try again." };
  }

  refresh();
  return {
    status: "success",
    name: name.split(" ")[0],
    position: Number(data),
  };
}
