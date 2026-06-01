import { scoreBadge } from "../utils/progress";

export default function CalendarHeatmap({ records = [] }) {
  const byDate = new Map(records.map((record) => [record.date.slice(0, 10), record]));
  const days = Array.from({ length: 84 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (83 - index));
    const key = date.toISOString().slice(0, 10);
    return { key, record: byDate.get(key) };
  });
  const tone = (score) => score >= 8 ? "bg-emerald-400" : score >= 6 ? "bg-amber-300" : "bg-rose-400";
  return <div>
    <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto pb-2">
      {days.map(({ key, record }) => <div key={key} title={`${key}: ${record ? `${record.score}/10 ${scoreBadge(record.score)}` : "No entry"}`}
        className={`h-3.5 w-3.5 rounded-[4px] ${record ? tone(record.score) : "bg-white/5"}`} />)}
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
      <span>Less</span><span className="h-3 w-3 rounded-sm bg-white/5" /><span className="h-3 w-3 rounded-sm bg-rose-400" /><span className="h-3 w-3 rounded-sm bg-amber-300" /><span className="h-3 w-3 rounded-sm bg-emerald-400" /><span>More</span>
    </div>
  </div>;
}
