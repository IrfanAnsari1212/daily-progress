import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

export const useApi = (url, initialValue = null) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    setLoading(true);
    try { setData((await api.get(url)).data); setError(""); }
    catch (err) { setError(err.response?.data?.message || "Something went wrong"); }
    finally { setLoading(false); }
  }, [url]);
  useEffect(() => { refresh(); }, [refresh]);
  return { data, setData, loading, error, refresh };
};
