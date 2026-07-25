import { ImageResponse } from "next/og";
import { isLocale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "de";
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #ECEBF2 0%, #ffffff 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "20px",
              background: "linear-gradient(120deg, #6355E4 0%, #17A398 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="19" r="11.5" stroke="#fff" strokeWidth="5" />
              <path
                d="M35.5 19 V29.5 a11.5 11.5 0 0 1 -19 8.6"
                stroke="#fff"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ fontSize: "44px", fontWeight: 700, color: "#14162B" }}>GentleBook</div>
        </div>
        <div
          style={{
            marginTop: "48px",
            fontSize: "64px",
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#14162B",
            maxWidth: "900px",
          }}
        >
          {locale === "de"
            ? "Dein Kalender füllt sich von selbst."
            : "Your calendar fills itself."}
        </div>
        <div style={{ marginTop: "28px", fontSize: "28px", color: "#8A8A8A", maxWidth: "820px" }}>
          {dict.hero.eyebrow}
        </div>
        <div
          style={{
            marginTop: "48px",
            alignSelf: "flex-start",
            padding: "18px 40px",
            borderRadius: "999px",
            background: "linear-gradient(120deg, #6355E4 0%, #17A398 100%)",
            color: "white",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          {dict.hero.ctaPrimary}
        </div>
      </div>
    ),
    size
  );
}
