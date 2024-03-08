import { RegisterForm } from "@/components/auth/register-form";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <main>
      <section>
        <h1 className="font-bold text-2xl text-slate-100">Register Page!</h1>
        <p className="text-slate-700">create account to continue</p>
      </section>
      <RegisterForm />
      <section>
        <Link
          href={"/auth/login"}
          className="text-slate-700 hover:text-slate-400"
        >
          already have account ?
        </Link>
      </section>
    </main>
  );
}
