import { ImageResponse } from "next/og";

import { getFullName, getPrimaryHeadline, getPublicLocation } from "@/lib/portfolio";
import { OG_IMAGE_SIZE, SITE_URL } from "@/lib/seo";

export const alt = `${getFullName()} — ${getPrimaryHeadline()}`;
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

/**
 * Social share card.
 *
 * Deliberately typographic and monotone — it mirrors the page's editorial
 * look and, more practically, depends on no image asset, so the build cannot
 * break before a portrait has been uploaded. Rendered with next/og's bundled
 * fallback font rather than fetching Geist at build time.
 */
export default function OpengraphImage() {
  const domain = SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fafafa",
          color: "#0a0a0a",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#71717a",
            }}
          >
            Portfolio
          </div>
          <div style={{ display: "flex", width: 96, height: 2, backgroundColor: "#0a0a0a" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1, letterSpacing: -3 }}>
            {getFullName()}
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#3f3f46", lineHeight: 1.3 }}>
            {getPrimaryHeadline()}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #d4d4d8",
            paddingTop: 28,
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#71717a",
          }}
        >
          <div style={{ display: "flex" }}>{getPublicLocation()}</div>
          <div style={{ display: "flex" }}>{domain}</div>
        </div>
      </div>
    ),
    size
  );
}
