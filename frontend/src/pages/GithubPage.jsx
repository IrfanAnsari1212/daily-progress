import { ExternalLink, Github, Search, Star } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import api from "../services/api";

export default function GithubPage() {
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState(user?.githubUsername || "");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchProfile = async (event) => {
    event.preventDefault(); setLoading(true);
    try { setData((await api.get(`/github/${username}`)).data); setError(""); }
    catch (err) { setError(err.response?.data?.message || "GitHub profile could not be loaded"); }
    finally { setLoading(false); }
  };
  return <>
    <PageHeader eyebrow="Public activity" title="GitHub integration" description="Pull a contribution snapshot from any public GitHub profile." />
    <form onSubmit={fetchProfile} className="panel mb-4 flex gap-2 p-3"><input className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="GitHub username" /><button className="btn-primary flex items-center gap-2" disabled={loading}><Search size={16}/>{loading ? "Loading" : "Fetch"}</button></form>
    {error && <p className="mb-4 text-sm text-rose-400">{error}</p>}
    {data ? <><div className="mb-4 grid gap-4 md:grid-cols-[1.2fr_.8fr_.8fr]"><div className="panel flex items-center gap-4 p-5"><img alt="" src={data.profile.avatarUrl} className="h-16 w-16 rounded-2xl"/><div><h2 className="font-bold text-white">@{data.profile.login}</h2><p className="mt-1 text-xs text-slate-500">{data.profile.bio || "No public bio"}</p></div></div><StatCard icon={Github} label="Repositories" value={data.totalRepositories} detail="Public repositories"/><StatCard icon={Github} label="Weekly commits" value={data.weeklyCommits} detail="Public push events" tone="violet"/></div>
      <section className="panel p-5"><h2 className="mb-4 font-bold text-white">Recently updated repositories</h2><div className="grid gap-3 sm:grid-cols-2">{data.repositories.map((repo) => <a key={repo.id} href={repo.url} target="_blank" rel="noreferrer" className="rounded-xl border border-white/5 p-4 transition hover:border-emerald-400/30"><div className="flex justify-between"><strong className="text-sm text-slate-200">{repo.name}</strong><ExternalLink size={14} className="text-slate-600"/></div><p className="mt-3 flex gap-4 text-xs text-slate-500"><span>{repo.language || "General"}</span><span className="flex items-center gap-1"><Star size={12}/>{repo.stars}</span></p></a>)}</div></section></> :
      <div className="panel grid min-h-64 place-items-center p-8 text-center"><div><Github className="mx-auto mb-3 text-slate-700" size={36}/><p className="text-sm text-slate-500">Enter a GitHub username to load a public contribution snapshot.</p></div></div>}
  </>;
}
