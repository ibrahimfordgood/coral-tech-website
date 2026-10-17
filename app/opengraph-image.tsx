import { ImageResponse } from "next/og"

export const alt = "Coral Tech: websites and software for Sierra Leone's schools and businesses"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#1b2230", color: "#faf7f2" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 700 }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, background: "#ec6c4c", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 20, height: 20, borderRadius: 999, background: "#1b2230" }} />
          </div>
          Coral Tech
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }}>
          <span>Websites and software for</span>
          <span style={{ color: "#ec6c4c" }}>Sierra Leone&apos;s schools and businesses</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "rgba(250,247,242,0.7)" }}>Freetown · WhatsApp +232 75 408759</div>
      </div>
    ),
    size,
  )
}
