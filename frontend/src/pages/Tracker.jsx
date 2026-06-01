import { Check, Save, Target } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import ProgressRing from "../components/ProgressRing";
import { useApi } from "../hooks/useApi";
import api from "../services/api";
import { scoreBadge } from "../utils/progress";

const sections = [
  ["DSA practice", [["dsa1", "Problem 1"], ["dsa2", "Problem 2"], ["dsa3", "Problem 3"]]],
  ["Build & learn", [["learning", "Topic completed"], ["project", "Feature built"], ["github", "Code pushed"]]],
  ["Interview prep", [["os", "OS studied"], ["dbms", "DBMS studied"], ["cn", "CN studied"]]],
  ["Career & health", [["jobs", "Applied to jobs"], ["exercise", "Exercise"], ["sleep", "Sleep 7+ hours"]]],
  ["Guardrails", [["wakeRule", "Wake up same time"], ["sleepRule", "Sleep same time"], ["youtubeRule", "No YouTube browsing"], ["courseRule", "No new courses"]]]
];
const initial = {
  ...Object.fromEntries(sections.flatMap(([, items]) => items.map(([key]) => [key, false]))),
  taskOfDay: "",
  taskOfDayCompleted: false
};
const getScore = (v) => ["dsa1","dsa2","dsa3","learning","project","github","jobs","exercise","sleep"].filter((k) => v[k]).length + Number(v.os || v.dbms || v.cn);

export default function Tracker() {
  const { data, loading } = useApi("/progress", { records: [] });
  const [values, setValues] = useState(initial);
  const [saved, setSaved] = useState("");
  const todayKey = new Date().toISOString().slice(0, 10);
  const today = data.records.find((record) => record.date.slice(0, 10) === todayKey);
  useEffect(() => { if (today) setValues({ ...initial, ...today }); }, [today]);
  if (loading) return <Loading />;
  const score = getScore(values);
  const save = async () => {
    await api.post("/progress", { ...values, date: todayKey });
    setSaved("Today's progress is saved.");
    setTimeout(() => setSaved(""), 2500);
  };
  return <>
    <PageHeader eyebrow="Daily tracker" title="Log today's reps" description="The essential list is scored out of ten. Guardrails are tracked separately to make your routine visible.">
      <button onClick={save} className="btn-primary flex items-center gap-2"><Save size={16}/>Save progress</button>
    </PageHeader>
    {saved && <p className="mb-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-300">{saved}</p>}
    <div className="grid gap-4 xl:grid-cols-[1fr_260px]">
      <div className="space-y-4">
        <section className="panel p-5">
          <div className="mb-4 flex items-center gap-2"><Target size={17} className="text-emerald-400"/><h2 className="text-sm font-bold text-white">Task of the day <span className="font-normal text-slate-500">(optional)</span></h2></div>
          <input className="input" maxLength={160} placeholder="Add one custom task for today" value={values.taskOfDay} onChange={(event) => setValues({ ...values, taskOfDay: event.target.value, taskOfDayCompleted: event.target.value.trim() ? values.taskOfDayCompleted : false })}/>
          <button disabled={!values.taskOfDay.trim()} onClick={() => setValues({ ...values, taskOfDayCompleted: !values.taskOfDayCompleted })} className={`mt-3 flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${values.taskOfDayCompleted ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-white/5 bg-white/[.025] text-slate-400 hover:border-white/15"}`}><span className={`grid h-5 w-5 place-items-center rounded-md border ${values.taskOfDayCompleted ? "border-emerald-400 bg-emerald-400 text-slate-950" : "border-slate-600"}`}>{values.taskOfDayCompleted && <Check size={13}/>}</span>{values.taskOfDayCompleted ? "Custom task completed" : "Mark custom task as completed"}</button>
          <p className="mt-3 text-xs text-slate-500">Leave this blank to use only the default checklist. This optional task does not change your score.</p>
        </section>
        {sections.map(([title, items]) => <section key={title} className="panel p-5"><h2 className="mb-4 text-sm font-bold text-white">{title}</h2><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{items.map(([key, label]) => <button key={key} onClick={() => setValues({ ...values, [key]: !values[key] })} className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition ${values[key] ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-white/5 bg-white/[.025] text-slate-400 hover:border-white/15"}`}><span className={`grid h-5 w-5 place-items-center rounded-md border ${values[key] ? "border-emerald-400 bg-emerald-400 text-slate-950" : "border-slate-600"}`}>{values[key] && <Check size={13}/>}</span>{label}</button>)}</div></section>)}
      </div>
      <aside className="panel h-fit p-5 xl:sticky xl:top-6"><h2 className="font-bold text-white">Live score</h2><p className="mt-1 text-xs text-slate-500">Updates as you check items</p><div className="my-6 flex justify-center"><ProgressRing score={score}/></div><div className="rounded-xl bg-white/5 p-3 text-center text-sm font-bold text-emerald-400">{scoreBadge(score)}</div></aside>
    </div>
  </>;
}
