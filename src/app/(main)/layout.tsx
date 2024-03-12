import Navbar from "@/components/navbar";
import { NavbarMobile } from "@/components/navbar-mobile";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <NavbarMobile />

      <div className="lg:px-0 md:px-10 px-5 max-w-xl mx-auto py-28">
        {children}
      </div>
    </div>
  );
}
