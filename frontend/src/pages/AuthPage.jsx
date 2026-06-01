import { Hammer } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, register } from "../redux/authSlice";

export default function AuthPage() {
  const isRegister = useLocation().pathname === "/register";
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault();
    const result = await dispatch(isRegister ? register(values) : login(values));
    if (!result.error) navigate("/");
  };
  return <main className="grid min-h-screen lg:grid-cols-[1.1fr_.9fr]">
    <section className="hidden bg-[#0c111a] p-12 lg:flex lg:flex-col lg:justify-between">
      <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-400 text-slate-950"><Hammer size={20}/></span><span className="font-['Space_Grotesk'] text-xl font-bold">ProgressForge</span></div>
      <div><p className="text-xs font-bold uppercase tracking-[.25em] text-emerald-400">Consistency compounds</p><h1 className="mt-4 max-w-xl font-['Space_Grotesk'] text-6xl font-bold leading-[1.04] tracking-tight">Forge the habits behind your next opportunity.</h1><p className="mt-5 max-w-lg text-slate-400">One focused dashboard for DSA, projects, interviews, job applications, and your health routine.</p></div>
      <p className="text-xs text-slate-600">ProgressForge · Daily preparation workspace</p>
    </section>
    <section className="flex items-center justify-center px-6 py-12"><form onSubmit={submit} className="w-full max-w-sm">
      <p className="text-xs font-bold uppercase tracking-[.22em] text-emerald-400">Welcome {isRegister ? "aboard" : "back"}</p>
      <h2 className="mt-3 font-['Space_Grotesk'] text-3xl font-bold">{isRegister ? "Create your account" : "Log in to your forge"}</h2>
      <p className="mt-2 text-sm text-slate-500">{isRegister ? "Start your preparation streak today." : "Pick up where you left off."}</p>
      <div className="mt-8 space-y-4">
        {isRegister && <input className="input" placeholder="Your name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />}
        <input className="input" type="email" placeholder="Email address" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
        <input className="input" type="password" placeholder="Password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
      </div>
      {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}
      <button disabled={loading} className="btn-primary mt-6 w-full">{loading ? "Working..." : isRegister ? "Create account" : "Log in"}</button>
      <p className="mt-5 text-center text-sm text-slate-500">{isRegister ? "Already registered?" : "New to ProgressForge?"} <Link className="font-semibold text-emerald-400" to={isRegister ? "/login" : "/register"}>{isRegister ? "Log in" : "Create account"}</Link></p>
    </form></section>
  </main>;
}
