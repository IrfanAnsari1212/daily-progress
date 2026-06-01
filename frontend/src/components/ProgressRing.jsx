export default function ProgressRing({ score = 0, size = 150 }) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  return <div className="relative" style={{ width: size, height: size }}>
    <svg className="-rotate-90" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={radius} fill="none" stroke="#202632" strokeWidth="10" />
      <circle cx="70" cy="70" r={radius} fill="none" stroke="#34d399" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={circumference} strokeDashoffset={circumference * (1 - score / 10)} className="transition-all duration-700" />
    </svg>
    <div className="absolute inset-0 grid place-items-center text-center">
      <div><strong className="block text-3xl text-white">{score}</strong><span className="text-xs text-slate-500">out of 10</span></div>
    </div>
  </div>;
}
