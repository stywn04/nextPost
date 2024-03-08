"use client";

import { LoginType, loginSchema } from "@/libs/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorField } from "./field-error";

export function LoginForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(loginSchema) });

  async function registerHandler(fields: LoginType) {
    console.log(fields);
  }

  return (
    <section className="py-5">
      <form onSubmit={handleSubmit(registerHandler)}>
        <fieldset className="flex flex-col gap-3">
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
            Register
          </button>
        </fieldset>
      </form>
    </section>
  );
}
