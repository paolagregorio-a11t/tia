import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

const KEY = "turnos";
const PERSONAS = ["Dani", "Bea", "Josean", "Paola"];
const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const HORA = /^\d{2}:\d{2}$/;

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const all = (await redis.hgetall(KEY)) || {};
      const list = Object.entries(all).map(([id, v]) => ({
        id,
        ...(typeof v === "string" ? JSON.parse(v) : v),
      }));
      return res.status(200).json(list);
    }

    if (req.method === "POST") {
      const { who, date, from, to } = req.body || {};
      if (!PERSONAS.includes(who) || !FECHA.test(date) || !HORA.test(from) || !HORA.test(to)) {
        return res.status(400).json({ error: "Datos no válidos" });
      }
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      await redis.hset(KEY, { [id]: JSON.stringify({ who, date, from, to }) });
      return res.status(201).json({ id });
    }

    if (req.method === "DELETE") {
      const id = String(req.query.id || "");
      if (!id) return res.status(400).json({ error: "Falta id" });
      await redis.hdel(KEY, id);
      return res.status(204).end();
    }

    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).end();
  } catch (e) {
    return res.status(500).json({ error: "Error del servidor" });
  }
}
