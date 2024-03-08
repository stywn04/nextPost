interface AuthHeaderProps {
  title: string;
  desc: string;
}
export function AuthHeader({ title, desc }: AuthHeaderProps) {
  return (
    <section>
      <h1 className="font-bold text-2xl text-slate-100">{title}</h1>
      <p className="text-slate-700">{desc}</p>
    </section>
  );
}
