import { createClient } from "@/libs/supabase/server";
import { NavbarLinks } from "./navbar-links";
import { NavbarAuth } from "./navbar-auth";
import Link from "next/link";

export default async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className="fixed top-0 left-0 right-0 py-4 bg-slate-950/80 backdrop-blur-lg z-50">
      <nav className="max-w-5xl mx-auto grid grid-cols-6">
        <section>
          <Link href={"/"}>
            <h1 className="font-bold text-2xl">nP</h1>
          </Link>
        </section>
        <section className="col-span-4 flex items-center justify-center gap-2">
          <NavbarLinks />
        </section>
        <section className="flex justify-end">
          <NavbarAuth user={user} />
        </section>
      </nav>
    </header>
  );
}
