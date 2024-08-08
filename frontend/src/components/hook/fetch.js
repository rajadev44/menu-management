import { useState } from "react";

export default function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetcher = async (fetch) => {
    setLoading(true);
    setError(null); // Reset error before a new fetch
    try {
      const result = await fetch();
      const json = await result.json();
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetcher };
}
