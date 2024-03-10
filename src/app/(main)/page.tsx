import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "nextPost",
};
export default function LandingPage() {
  return (
    <main className="py-20">
      <section className="text-center">
        <h1 className="font-bold text-slate-200 text-5xl tracking-wide">
          nextPost
        </h1>
        <h3 className="font-semibold text-slate-400 text-2xl capitalize mb-4">
          share your creative thoughts with others
        </h3>
        <p className="text-slate-700 mb-10 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
          aperiam quisquam recusandae voluptate sed saepe?
        </p>
        <p className="text-slate-500  ">
          created with{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            className="text-slate-300"
          >
            Next Js
          </a>{" "}
          &{" "}
          <a
            href="https://supabase.com/"
            target="_blank"
            className="text-slate-300"
          >
            Supabase{" "}
          </a>{" "}
          by{" "}
          <a
            href="https://github.com/stywn04"
            target="_blank"
            className="text-slate-300"
          >
            @stywn04
          </a>
        </p>
      </section>
    </main>
  );
}
