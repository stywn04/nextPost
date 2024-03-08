"use client";

import { LoginType, loginSchema } from "@/libs/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorField } from "./field-error";
import { useTransition } from "react";
import { loginAction } from "@/app/actions/auth.action";
import toast from "react-hot-toast";
import { SubmitLoading } from "../submit-loading";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(loginSchema) });
  const [isPending, setTransition] = useTransition();

  async function registerHandler(fields: LoginType) {
    setTransition(async () => {
      try {
        await loginAction(fields, redirectTo);
        reset();
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    });
  }

  return (
    <section className="py-5">
      <form onSubmit={handleSubmit(registerHandler)}>
        <fieldset disabled={isPending} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-slate-200 font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="johan@liebert.me"
              className="w-full py-2 px-4 rounded-md bg-transparent border border-slate-700"
              {...register("email")}
            />
            <ErrorField fieldError={errors.email} />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-slate-200 font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="*******"
              className="w-full py-2 px-4 rounded-md bg-transparent border border-slate-700"
              {...register("password")}
            />
            <ErrorField fieldError={errors.password} />
          </div>
          <button className="w-full py-2 bg-slate-900 rounded-md">
            {isPending ? <SubmitLoading /> : "Login"}
          </button>
        </fieldset>
      </form>
    </section>
  );
}
