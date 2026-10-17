import "server-only"
import { createHash } from "node:crypto"
import { headers } from "next/headers"

/** Salted hash of the visitor's IP, so we can rate limit without storing raw IPs. */
export async function getRequestInfo() {
  const h = await headers()
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown"
  const salt = process.env.IP_HASH_SALT ?? "coral-tech-dev"
  return {
    ipHash: createHash("sha256").update(salt + ip).digest("hex"),
    userAgent: h.get("user-agent")?.slice(0, 300) ?? null,
  }
}
