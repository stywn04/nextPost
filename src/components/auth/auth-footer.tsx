import Link from "next/link";

interface AuthFooterProps {
  href: string;
  desc: string;
}

export function AuthFooter({ href, desc }: AuthFooterProps) {
  return (
    <section>
      <Link href={href} className="text-slate-700 hover:text-slate-400">
        {desc}
      </Link>
    </section>
  );
}
