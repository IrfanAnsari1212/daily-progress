import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { shortDate } from "../utils/progress";

export default function ScoreChart({ data = [] }) {
  return <ResponsiveContainer width="100%" height={260}>
    <AreaChart data={data}>
      <defs><linearGradient id="scoreFill" x1="0" x2="0" y1="0" y2="1"><stop offset="5%" stopColor="#34d399" stopOpacity={0.35}/><stop offset="95%" stopColor="#34d399" stopOpacity={0}/></linearGradient></defs>
      <CartesianGrid stroke="#202632" strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="date" tickFormatter={shortDate} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
      <YAxis domain={[0, 10]} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
      <Tooltip contentStyle={{ background: "#111620", border: "1px solid #29303d", borderRadius: 12 }} />
      <Area type="monotone" dataKey="score" stroke="#34d399" strokeWidth={3} fill="url(#scoreFill)" />
    </AreaChart>
  </ResponsiveContainer>;
}
