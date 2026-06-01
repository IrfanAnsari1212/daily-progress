export default function StatCard({ icon: Icon, label, value, detail, tone = "emerald" }) {
  const tones = { emerald: "bg-emerald-400/10 text-emerald-400", amber: "bg-amber-400/10 text-amber-300", violet: "bg-violet-400/10 text-violet-300", sky: "bg-sky-400/10 text-sky-300" };
  return <div className="panel p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20">
    <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}><Icon size={19} /></div>
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
    <p className="mt-2 text-3xl font-extrabold tracking-tight text-white">{value}</p>
    <p className="mt-1 text-xs text-slate-500">{detail}</p>
  </div>;
}
