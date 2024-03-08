import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

interface LoginPageProps {
  searchParams: {
    redirectTo: string | undefined;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const redirectTo = searchParams?.redirectTo ?? "/posts";
  return (
    <main>
      <AuthHeader title="Login" desc="login use your account to continue" />
      <LoginForm redirectTo={redirectTo} />
      <AuthFooter href="/auth/register" desc="doesn't have account ?" />
    </main>
  );
}
