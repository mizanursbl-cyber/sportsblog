import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export type CriczopItem = {
  url: string;
  title: string;
  description?: string;
  published_at?: string;
  images?: { landscape?: string };
};

export function useCriczopFeed(limit = 20, refreshMs = 60_000) {
  const [items, setItems] = useState<CriczopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke("criczop-feed", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // Pass limit using querystring style supported by invoke via path:
        // If your supabase-js doesn't support query here, use the fallback below.
        // @ts-ignore
        path: `criczop-feed?limit=${limit}`,
      });

      // Fallback if your invoke() doesn't support `path`:
      // const { data, error } = await supabase.functions.invoke("criczop-feed?limit=" + limit);

      if (!alive) return;

      if (error) {
        setError(error.message);
        setItems([]);
      } else {
        setItems((data?.data ?? []) as CriczopItem[]);
      }

      setLoading(false);
    };

    load();
    const t = setInterval(load, refreshMs);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [limit, refreshMs]);

  return { items, loading, error };
}
