import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { RegisterForm } from "@/components/auth/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <main>
      <AuthHeader title="Register" desc="create account to continue" />
      <RegisterForm />
      <AuthFooter href="/auth/login" desc="already have account ?" />
    </main>
  );
}
