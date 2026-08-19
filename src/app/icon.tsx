import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Browser tab icon: the same "AA" monogram as the site rail's logo
 * (Header.tsx), on a circle in the same forest green used for the rail
 * background (--forest-green, #3e6155). Generated at build time via
 * next/og's ImageResponse, so no external image asset is needed.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3e6155",
          borderRadius: "50%",
          color: "#fff",
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        AA
      </div>
    ),
    { ...size },
  );
}
