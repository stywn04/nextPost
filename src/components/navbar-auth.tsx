"use client";
import { logoutAction } from "@/app/actions/auth.action";
import { User } from "@supabase/supabase-js";
import { useTransition } from "react";
import { SubmitLoading } from "./submit-loading";
import Link from "next/link";

export function NavbarAuth({ user }: { user: User | null }) {
  const [isPending, setTransition] = useTransition();
  async function logoutHandler() {
    setTransition(async () => {
      await logoutAction();
    });
  }
  return user ? (
    <button
      onClick={logoutHandler}
      disabled={isPending}
      className="bg-transparent border border-red-600 text-red-600 py-1 px-4 rounded"
    >
      {isPending ? <SubmitLoading /> : "Log out"}
    </button>
  ) : (
    <Link
      className="py-1 px-4 rounded bg-transparent border border-slate-700 text-slate-700 hover:bg-white/5 hover:text-slate-200"
      href={"/auth/login"}
    >
      Log in
    </Link>
  );
}
