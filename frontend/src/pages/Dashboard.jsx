import { Activity, BriefcaseBusiness, CheckCircle2, Flame, Github, Target } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CalendarHeatmap from "../components/CalendarHeatmap";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import ProgressRing from "../components/ProgressRing";
import ScoreChart from "../components/ScoreChart";
import StatCard from "../components/StatCard";
import { useApi } from "../hooks/useApi";
import { scoreBadge } from "../utils/progress";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const { data, loading } = useApi("/progress", { records: [], streak: {} });
  const todayKey = new Date().toISOString().slice(0, 10);
  const today = data.records.find((record) => record.date.slice(0, 10) === todayKey) || { score: 0 };
  const recent = [...data.records].reverse().slice(-7);
  const dsa = recent.reduce((total, day) => total + Number(day.dsa1) + Number(day.dsa2) + Number(day.dsa3), 0);
  const jobs = recent.reduce((total, day) => total + Number(day.jobs), 0);
  if (loading) return <Loading />;
  return <>
    <PageHeader eyebrow="Command center" title={`Good ${new Date().getHours() < 12 ? "morning" : "evening"}, ${user?.name?.split(" ")[0]}`} description="Keep the loop tight: do the work, log it, study the signal.">
      <Link to="/tracker" className="btn-primary">Update today's progress</Link>
    </PageHeader>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard icon={Activity} label="Today's score" value={`${today.score}/10`} detail={scoreBadge(today.score)} />
      <StatCard icon={Flame} label="Current streak" value={`${data.streak.currentStreak || 0} days`} detail="Scores of 8 or higher" tone="amber" />
      <StatCard icon={Target} label="Longest streak" value={`${data.streak.longestStreak || 0} days`} detail="Your personal best" tone="violet" />
      <StatCard icon={CheckCircle2} label="Weekly progress" value={`${Math.round(recent.reduce((sum, day) => sum + day.score, 0) / 70 * 100) || 0}%`} detail="Across the last 7 days" tone="sky" />
    </div>
    <div className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_.8fr]">
      <section className="panel p-5"><div className="mb-4"><h2 className="font-bold text-white">Momentum trend</h2><p className="text-xs text-slate-500">Daily scores for the last seven entries</p></div><ScoreChart data={recent} /></section>
      <section className="panel flex items-center justify-around gap-3 p-5"><ProgressRing score={today.score} /><div><p className="text-sm font-bold text-white">Today's forge</p><p className="mt-1 max-w-32 text-xs leading-5 text-slate-500">Complete your essential habits to hit the green zone.</p></div></section>
    </div>
    <section className="panel mt-4 p-5"><div className="mb-5 flex items-center justify-between"><div><h2 className="font-bold text-white">Consistency calendar</h2><p className="text-xs text-slate-500">Your latest 12 weeks</p></div><Link className="text-xs font-semibold text-emerald-400" to="/calendar">Full view</Link></div><CalendarHeatmap records={data.records} /></section>
    <div className="mt-4 grid gap-4 sm:grid-cols-3"><StatCard icon={CheckCircle2} label="DSA problems" value={dsa} detail="Completed this week" /><StatCard icon={BriefcaseBusiness} label="Applications" value={jobs} detail="Submitted this week" tone="violet" /><StatCard icon={Github} label="GitHub activity" value={recent.filter((day) => day.github).length} detail="Push days this week" tone="sky" /></div>
  </>;
}
