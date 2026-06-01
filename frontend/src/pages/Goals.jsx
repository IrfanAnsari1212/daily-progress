import { Check, Target } from "lucide-react";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import { useApi } from "../hooks/useApi";
import api from "../services/api";

export default function Goals() {
  const { data: goals, setData: setGoals, loading } = useApi("/goals", []);
  if (loading) return <Loading />;
  const toggle = async (goal) => {
    const updated = (await api.put(`/goals/${goal._id}`, { completed: !goal.completed })).data;
    setGoals(goals.map((item) => item._id === updated._id ? updated : item));
  };
  return <>
    <PageHeader eyebrow="Three-week roadmap" title="Weekly goals" description="Move through the preparation syllabus without losing sight of the work already behind you." />
    <div className="space-y-5">{[1, 2, 3].map((week) => {
      const weekGoals = goals.filter((goal) => goal.week === week);
      const done = weekGoals.filter((goal) => goal.completed).length;
      const categories = [...new Set(weekGoals.map((goal) => goal.category))];
      return <section key={week} className="panel p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/10 text-emerald-400"><Target size={18}/></span><div><h2 className="font-bold text-white">Week {week}</h2><p className="text-xs text-slate-500">{done} of {weekGoals.length} milestones complete</p></div></div><strong className="text-sm text-emerald-400">{Math.round(done / weekGoals.length * 100) || 0}%</strong></div>
        <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${done / weekGoals.length * 100}%` }} /></div>
        <div className="grid gap-5 lg:grid-cols-3">{categories.map((category) => <div key={category}><h3 className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-slate-500">{category}</h3><div className="space-y-2">{weekGoals.filter((goal) => goal.category === category).map((goal) => <button key={goal._id} onClick={() => toggle(goal)} className={`flex w-full items-center gap-2 rounded-lg border p-2.5 text-left text-sm transition ${goal.completed ? "border-emerald-400/20 bg-emerald-400/5 text-slate-300" : "border-white/5 text-slate-500 hover:border-white/15"}`}><span className={`grid h-4 w-4 place-items-center rounded border ${goal.completed ? "border-emerald-400 bg-emerald-400 text-black" : "border-slate-600"}`}>{goal.completed && <Check size={11}/>}</span>{goal.title}</button>)}</div></div>)}</div>
      </section>;
    })}</div>
  </>;
}
