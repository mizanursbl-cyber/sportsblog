// supabase/functions/criczop-feed/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const token = Deno.env.get("CRICZOP_BEARER_TOKEN");
    if (!token) {
      return new Response(JSON.stringify({ error: "Missing CRICZOP_BEARER_TOKEN" }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const limit = Math.min(Number(url.searchParams.get("limit") || "20"), 100);

    const upstream = await fetch("https://api.criczop.com/v1/cricket-feed", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      return new Response(text, {
        status: upstream.status,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const json = JSON.parse(text);

    const items = Array.isArray(json?.data) ? json.data.slice(0, limit) : [];

    // Cache a little so you don't hammer the upstream
    return new Response(JSON.stringify({ success: true, data: items }), {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
});
