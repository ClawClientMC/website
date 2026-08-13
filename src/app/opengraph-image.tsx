import { ImageResponse } from "next/og";

export const alt = "ClawClient — Performance and PvP launcher for Minecraft";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f0f0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          gap: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #d45a00, #b84a00)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            C
          </div>
          <span
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#f5f5f5",
              letterSpacing: "-0.02em",
            }}
          >
            ClawClient
          </span>
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: "800px",
          }}
        >
          Performance and PvP launcher for Minecraft
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#999999",
            lineHeight: 1.5,
            maxWidth: "640px",
          }}
        >
          Focused profiles, mods, versions, and accounts in a premium desktop client.
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
