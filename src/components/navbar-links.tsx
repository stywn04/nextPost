"use client";
import { BookOpen, PenBox, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavbarLinks() {
  const navlinks = [
    { href: "/posts", to: "Posts", icon: <BookOpen size={18} /> },
    { href: "/create", to: "Create", icon: <PenBox size={18} /> },
    { href: "/search", to: "Search", icon: <Search size={18} /> },
    { href: "/profile", to: "Profile", icon: <User size={18} /> },
  ];
  const pathname = usePathname();
  return navlinks.map((link) => {
    const active = pathname === link.href;
    return (
      <Link
        href={link.href}
        key={link.href}
        className={`py-1 px-4 rounded hover:bg-white/5 hover:text-slate-200 ${!active ? "text-slate-700" : "text-slate-200"}`}
      >
        <span className="flex items-center gap-1">
          {link.icon}
          {link.to}
        </span>
      </Link>
    );
  });
}
