import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function normalizeProofPath(proofPath: unknown) {
  if (!proofPath) return "";

  let normalizedPath = String(proofPath).trim();

  try {
    if (normalizedPath.startsWith("http://") || normalizedPath.startsWith("https://")) {
      const url = new URL(normalizedPath);
      const marker = "/registration-files/";
      const markerIndex = url.pathname.indexOf(marker);

      if (markerIndex >= 0) {
        normalizedPath = url.pathname.slice(markerIndex + marker.length);
      }
    }
  } catch {
    // Ignore malformed URLs and keep the original string.
  }

  normalizedPath = normalizedPath.replace(/^\/+/, "");
  normalizedPath = normalizedPath.replace(/^registration-files\/+/, "");

  try {
    normalizedPath = decodeURIComponent(normalizedPath);
  } catch {
    // Ignore malformed URI sequences.
  }

  return normalizedPath;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return json({ error: "Missing Supabase function secrets." }, 500);
    }

    const { proofPath } = await request.json();
    const normalizedPath = normalizeProofPath(proofPath);

    if (!normalizedPath) {
      return json({ error: "proofPath is required." }, 400);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase.storage
      .from("registration-files")
      .createSignedUrl(normalizedPath, 60 * 10);

    if (error || !data?.signedUrl) {
      return json({ error: error?.message || "Could not create signed URL." }, 400);
    }

    return json({ signedUrl: data.signedUrl });
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "Unexpected proof URL error." },
      500,
    );
  }
});
