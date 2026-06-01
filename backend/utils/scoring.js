export const TRACKER_FIELDS = [
  "dsa1", "dsa2", "dsa3", "dsa4", "dsa5", "dsa6", "learning", "project", "github", "os", "dbms",
  "cn", "jobs", "exercise", "sleep", "wakeRule", "sleepRule", "youtubeRule", "courseRule"
];

export const calculateScore = (entry) =>
  ["dsa1", "dsa2", "dsa3", "learning", "project", "github", "jobs", "exercise", "sleep"]
    .reduce((score, field) => score + (entry[field] ? 1 : 0), 0)
  + (entry.os || entry.dbms || entry.cn ? 1 : 0);

export const normalizeDate = (value = new Date()) => {
  const date = new Date(value);
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

export const dateKey = (value) => normalizeDate(value).toISOString().slice(0, 10);
