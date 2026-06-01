import CalendarHeatmap from "../components/CalendarHeatmap";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import { useApi } from "../hooks/useApi";
import { scoreBadge, scoreTone } from "../utils/progress";

export default function Calendar() {
  const { data, loading } = useApi("/progress", { records: [] });
  if (loading) return <Loading />;
  return <>
    <PageHeader eyebrow="History" title="Consistency calendar" description="A color-coded view of your recent daily preparation scores." />
    <section className="panel p-6"><CalendarHeatmap records={data.records}/></section>
    <section className="panel mt-4 divide-y divide-white/5 p-5"><h2 className="mb-3 font-bold text-white">Recent entries</h2>{data.records.slice(0, 14).map((record) => <div key={record._id} className="flex items-center justify-between py-3 text-sm"><span className="text-slate-400">{new Date(record.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span><span className={`font-bold ${scoreTone(record.score)}`}>{record.score}/10 · {scoreBadge(record.score)}</span></div>)}</section>
  </>;
}
