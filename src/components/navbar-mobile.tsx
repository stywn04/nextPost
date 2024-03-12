"use client";
import { BookOpen, PenBox, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavbarMobile() {
  const navlinks = [
    { href: "/posts", to: "Posts", icon: <BookOpen size={28} /> },
    { href: "/create", to: "Create", icon: <PenBox size={28} /> },
    { href: "/search", to: "Search", icon: <Search size={28} /> },
    { href: "/profile", to: "Profile", icon: <User size={28} /> },
  ];
  const pathname = usePathname();
  return (
    <section className="md:hidden grid grid-cols-4 justify-center fixed bottom-0 left-0 right-0 bg-slate-950/75 backdrop-blur-lg z-50 p-5">
      {navlinks.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            href={link.href}
            key={link.href}
            className={`flex items-center justify-center py-1 px-4 rounded hover:bg-white/5 hover:text-slate-200 ${!active ? "text-slate-700" : "text-slate-200"}`}
          >
            <span className="flex items-center gap-1">{link.icon}</span>
          </Link>
        );
      })}
    </section>
  );
}
