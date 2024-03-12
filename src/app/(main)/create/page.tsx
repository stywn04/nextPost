import { getCurrentUserAction } from "@/app/actions/user.action";
import { CreatePostForm } from "@/components/post/create-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create",
};

export default async function CreatePage() {
  const { name, avatar } = await getCurrentUserAction();
  return (
    <main>
      <section>
        <h1 className="font-semibold text-xl text-slate-200">Hi {name}!</h1>
        <p className="text-slate-700">wanna share some thoughts ?</p>
      </section>
      <section className="grid grid-cols-12 py-5 gap-2 justify-between">
        <div className="col-span-2 md:col-span-1 ">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <CreatePostForm />
      </section>
    </main>
  );
}
