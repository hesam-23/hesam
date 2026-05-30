import { useLang } from "../LanguageContext.jsx"

function About({ onClose }) {
  const { t, lang } = useLang()

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "#0f0f0f",
      zIndex: 200,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 24px",
      overflowY: "auto",
      direction: lang === "fa" ? "rtl" : "ltr"
    }}>

      <div style={{ maxWidth: "680px", width: "100%" }}>

        <p style={{
          fontSize: "11px",
          letterSpacing: "4px",
          color: "#555",
          marginBottom: "32px"
        }}>{t.about.label}</p>

        <h1 style={{
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: "300",
          color: "white",
          lineHeight: "1.3",
          marginBottom: "40px",
          letterSpacing: "-1px",
          whiteSpace: "pre-line"
        }}>{t.about.title}</h1>

        <p style={{
          fontSize: "15px",
          color: "#888",
          lineHeight: "1.9",
          marginBottom: "24px"
        }}>{t.about.p1}</p>

        <p style={{
          fontSize: "15px",
          color: "#888",
          lineHeight: "1.9",
          marginBottom: "60px"
        }}>{t.about.p2}</p>

        <button
          onClick={onClose}
          style={{
            padding: "14px 32px",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid #333",
            borderRadius: "30px",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "2px",
            cursor: "pointer"
          }}
        >{t.about.back}</button>

      </div>
    </div>
  )
}

export default About