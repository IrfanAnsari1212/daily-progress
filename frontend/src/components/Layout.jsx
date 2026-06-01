import { BarChart3, CalendarDays, CheckSquare, FileText, Github, LayoutDashboard, LogOut, Menu, Target, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../redux/authSlice";

const links = [
  ["/", "Dashboard", LayoutDashboard], ["/tracker", "Daily tracker", CheckSquare], ["/goals", "Weekly goals", Target],
  ["/analytics", "Analytics", BarChart3], ["/calendar", "Calendar", CalendarDays], ["/github", "GitHub", Github], ["/resume", "Resume data", FileText]
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const sidebar = <aside className="flex h-full w-64 flex-col border-r border-white/10 bg-[#0c1018] p-4">
    <div className="mb-8 flex items-center gap-3 px-2 py-2"><div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400 font-black text-slate-950">PF</div><div><p className="font-['Space_Grotesk'] font-bold text-white">ProgressForge</p><p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400">Build momentum</p></div></div>
    <nav className="space-y-1">{links.map(([to, label, Icon]) => <NavLink end={to === "/"} key={to} to={to} onClick={() => setOpen(false)}
      className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-emerald-400/10 text-emerald-400" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}><Icon size={17} />{label}</NavLink>)}</nav>
    <div className="mt-auto border-t border-white/10 pt-4"><div className="mb-3 px-3"><p className="truncate text-sm font-semibold text-white">{user?.name}</p><p className="truncate text-xs text-slate-500">{user?.email}</p></div>
      <button onClick={() => dispatch(logout())} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"><LogOut size={17}/>Log out</button></div>
  </aside>;
  return <div className="min-h-screen bg-[#080b12]">
    <div className="fixed inset-y-0 left-0 hidden lg:block">{sidebar}</div>
    {open && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)}><div className="h-full w-64" onClick={(event) => event.stopPropagation()}>{sidebar}</div></div>}
    <header className="flex h-16 items-center justify-between border-b border-white/10 px-5 lg:hidden"><span className="font-['Space_Grotesk'] font-bold text-white">ProgressForge</span><button onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></header>
    <main className="p-5 sm:p-8 lg:ml-64 lg:p-10"><Outlet /></main>
  </div>;
}
