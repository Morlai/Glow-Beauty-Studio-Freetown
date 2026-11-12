// Glow Beauty Studio: services added by the admin (Vercel serverless function)
// GET            -> public list of added services
// GET ?img=ID    -> public service photo
// POST / DELETE  -> admin only (x-admin-pin header)
const crypto = require("crypto");

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const PIN = process.env.ADMIN_PIN || "";

async function redis(...cmd) {
  const r = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: "Bearer " + TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}
const same = (a, b) => {
  const x = Buffer.from(String(a || "")), y = Buffer.from(String(b || ""));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};
const clean = (v, n) => String(v == null ? "" : v).trim().slice(0, n);
const MAX_IMG = 600000; // characters of base64 text

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!URL_ || !TOKEN) return res.status(503).json({ error: "The booking database is not connected yet." });
  const ip = String(req.headers["x-forwarded-for"] || "x").split(",")[0].trim();

  try {
    if (req.method === "GET") {
      const imgId = clean(req.query && req.query.img, 24);
      if (imgId) {
        if (!/^[a-z0-9]{4,24}$/.test(imgId)) return res.status(400).end();
        const data = await redis("GET", "svcimg:" + imgId);
        const m = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(data || "");
        if (!m) return res.status(404).end();
        res.setHeader("Content-Type", m[1]);
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        return res.status(200).send(Buffer.from(m[2], "base64"));
      }
      const flat = await redis("HGETALL", "services");
      const vals = Array.isArray(flat) ? flat.filter((_, i) => i % 2 === 1) : Object.values(flat || {});
      const services = vals
        .map((v) => { try { return JSON.parse(v); } catch (e) { return null; } })
        .filter(Boolean)
        .sort((a, b) => (a.created || 0) - (b.created || 0))
        .map((s) => ({ id: s.id, n: s.n, p: s.p, img: s.hasImg ? "/api/services?img=" + s.id : "" }));
      return res.status(200).json({ services });
    }

    if (req.method !== "POST" && req.method !== "DELETE") {
      res.setHeader("Allow", "GET, POST, DELETE");
      return res.status(405).json({ error: "Method not allowed." });
    }

    // Admin only
    if (!PIN) return res.status(503).json({ error: "ADMIN_PIN is not set on the server. Add it in Vercel (Settings, Environment Variables) and redeploy." });
    if (!same(req.headers["x-admin-pin"], PIN)) {
      const k = "pin:" + ip;
      const n = await redis("INCR", k);
      if (n === 1) await redis("EXPIRE", k, 600);
      if (n > 10) return res.status(429).json({ error: "Too many attempts. Try again in 10 minutes." });
      return res.status(401).json({ error: "Wrong PIN." });
    }

    if (req.method === "POST") {
      let b = req.body;
      if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
      b = b && typeof b === "object" ? b : {};
      const n = clean(b.n, 80), p = Number(b.p);
      if (!n || !(p > 0 && p < 1e8)) return res.status(400).json({ error: "Add a service name and a price." });
      const image = typeof b.image === "string" ? b.image : "";
      if (image && (image.length > MAX_IMG || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(image)))
        return res.status(400).json({ error: "That image is too large or not supported. Try a smaller photo." });
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      if (image) await redis("SET", "svcimg:" + id, image);
      await redis("HSET", "services", id, JSON.stringify({ id, n, p, hasImg: !!image, created: Date.now() }));
      return res.status(201).json({ ok: true, id });
    }

    // DELETE
    const id = clean(req.query && req.query.id, 24);
    if (!/^[a-z0-9]{4,24}$/.test(id)) return res.status(400).json({ error: "Bad request." });
    await redis("HDEL", "services", id);
    await redis("DEL", "svcimg:" + id);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "Server error. Please try again." });
  }
};
