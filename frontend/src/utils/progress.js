export const scoreTone = (score = 0) => score >= 8 ? "text-emerald-400" : score >= 6 ? "text-amber-300" : "text-rose-400";
export const scoreBadge = (score = 0) => score >= 8 ? "Good Day" : score >= 6 ? "Average Day" : "Recovery Needed";
export const shortDate = (date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
