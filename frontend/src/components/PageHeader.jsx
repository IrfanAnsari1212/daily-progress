export default function PageHeader({ eyebrow, title, description, children }) {
  return <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">{eyebrow}</p>
      <h1 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white">{title}</h1>
      {description && <p className="mt-2 max-w-2xl text-sm text-slate-400">{description}</p>}
    </div>
    {children}
  </header>;
}
