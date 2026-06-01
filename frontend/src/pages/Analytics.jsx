import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import ScoreChart from "../components/ScoreChart";
import { useApi } from "../hooks/useApi";
import { shortDate } from "../utils/progress";

const tooltip = { background: "#111620", border: "1px solid #29303d", borderRadius: 12 };
const axis = { fill: "#64748b", fontSize: 11 };
function ChartBox({ title, subtitle, children }) {
  return <section className="panel p-5"><h2 className="font-bold text-white">{title}</h2><p className="mb-5 text-xs text-slate-500">{subtitle}</p>{children}</section>;
}
export default function Analytics() {
  const { data, loading } = useApi("/analytics", { daily: [] });
  if (loading) return <Loading />;
  const daily = data.daily.slice(-21);
  return <>
    <PageHeader eyebrow="Signal room" title="Analytics" description="Read the trend lines, find the weak spots, and adjust your next week." />
    <div className="grid gap-4 xl:grid-cols-2">
      <ChartBox title="Daily score trend" subtitle="Preparation quality over time"><ScoreChart data={daily}/></ChartBox>
      <ChartBox title="DSA completion" subtitle="Problems completed per day"><ResponsiveContainer width="100%" height={260}><BarChart data={daily}><CartesianGrid stroke="#202632" strokeDasharray="3 3" vertical={false}/><XAxis dataKey="date" tickFormatter={shortDate} tick={axis} axisLine={false}/><YAxis domain={[0,6]} tick={axis} axisLine={false}/><Tooltip contentStyle={tooltip}/><Bar dataKey="dsa" fill="#818cf8" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></ChartBox>
      <ChartBox title="Job applications" subtitle="Application cadence"><ResponsiveContainer width="100%" height={260}><BarChart data={daily}><CartesianGrid stroke="#202632" strokeDasharray="3 3" vertical={false}/><XAxis dataKey="date" tickFormatter={shortDate} tick={axis} axisLine={false}/><YAxis domain={[0,1]} tick={axis} axisLine={false}/><Tooltip contentStyle={tooltip}/><Bar dataKey="jobs" fill="#38bdf8" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></ChartBox>
      <ChartBox title="Streak growth" subtitle="Consecutive good days"><ResponsiveContainer width="100%" height={260}><LineChart data={daily}><CartesianGrid stroke="#202632" strokeDasharray="3 3" vertical={false}/><XAxis dataKey="date" tickFormatter={shortDate} tick={axis} axisLine={false}/><YAxis tick={axis} axisLine={false}/><Tooltip contentStyle={tooltip}/><Legend/><Line type="monotone" dataKey="streak" stroke="#fbbf24" strokeWidth={3} dot={false}/></LineChart></ResponsiveContainer></ChartBox>
    </div>
  </>;
}
