import { Download, Save } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import { useApi } from "../hooks/useApi";
import api from "../services/api";

const blank = { skills: [], certifications: [], projects: [] };
export default function Resume() {
  const { data, loading } = useApi("/resume", blank);
  const [values, setValues] = useState(blank);
  const [saved, setSaved] = useState("");
  useEffect(() => setValues(data || blank), [data]);
  if (loading) return <Loading />;
  const update = (field, text) => setValues({ ...values, [field]: text.split("\n") });
  const save = async () => { setValues((await api.put("/resume", values)).data); setSaved("Resume data saved."); setTimeout(() => setSaved(""), 2200); };
  const exportText = () => {
    const text = ["PROFESSIONAL SKILLS", ...values.skills, "", "CERTIFICATIONS", ...values.certifications, "", "PROJECTS", ...values.projects].join("\n");
    const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([text], { type: "text/plain" })); link.download = "progressforge-resume-data.txt"; link.click();
  };
  return <>
    <PageHeader eyebrow="Career profile" title="Resume data" description="Keep your resume building blocks tidy and export-ready. Use one entry per line.">
      <div className="flex gap-2"><button onClick={exportText} className="btn-secondary flex items-center gap-2"><Download size={16}/>Export</button><button onClick={save} className="btn-primary flex items-center gap-2"><Save size={16}/>Save</button></div>
    </PageHeader>
    {saved && <p className="mb-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-300">{saved}</p>}
    <div className="grid gap-4 lg:grid-cols-3">{[["skills","Skills"],["certifications","Certifications"],["projects","Projects"]].map(([field,label]) => <label key={field} className="panel block p-5"><span className="mb-3 block text-sm font-bold text-white">{label}</span><textarea rows="13" className="input resize-none leading-6" value={values[field].join("\n")} onChange={(e) => update(field, e.target.value)} placeholder={`Add ${label.toLowerCase()}, one per line`} /></label>)}</div>
  </>;
}
