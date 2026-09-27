import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const alt = `${DATA.name} — Full Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const topSkills = DATA.skills.slice(0, 6);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 30, color: "#8577f2" }}>{DATA.name}</div>
          <div style={{ fontSize: 68, color: "#fafafa", fontWeight: 700, lineHeight: 1.1 }}>
            Full Stack Developer
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#a1a1aa" }}>
            {`React · Next.js · Node.js · MongoDB — ${DATA.location}`}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {topSkills.map((skill) => (
            <div
              key={skill}
              style={{
                display: "flex",
                fontSize: 24,
                color: "#e4e4e7",
                border: "1px solid #333",
                borderRadius: 8,
                padding: "10px 20px",
              }}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
