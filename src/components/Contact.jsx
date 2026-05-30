import { useState } from "react"
import { useLang } from "../LanguageContext.jsx"

function Contact({ onClose }) {
  const { t, lang } = useLang()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleSubmit = async () => {
    if (!form.firstName.trim()) { setError(t.contact.errorName); return }
    if (!form.email.trim()) { setError(t.contact.errorEmail); return }
    if (!validateEmail(form.email)) { setError(t.contact.errorEmailValid); return }

    setLoading(true)
    try {
      const response = await fetch("https://formspree.io/f/mreyerde", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      if (response.ok) setSubmitted(true)
      else setError(t.contact.errorServer)
    } catch {
      setError(t.contact.errorConnection)
    }
    setLoading(false)
  }

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

      <div style={{ maxWidth: "560px", width: "100%" }}>

        <p style={{
          fontSize: "11px",
          letterSpacing: "4px",
          color: "#555",
          marginBottom: "32px"
        }}>{t.contact.label}</p>

        {submitted ? (
          <div style={{ textAlign: "center" }}>
            <h1 style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: "300",
              color: "white",
              marginBottom: "24px"
            }}>{t.contact.successTitle}</h1>
            <p style={{ color: "#888", marginBottom: "40px" }}>{t.contact.successMsg}</p>
            <button
              onClick={onClose}
              style={{
                padding: "14px 32px",
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid #333",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "2px",
                cursor: "pointer"
              }}
            >{t.contact.back}</button>
          </div>
        ) : (
          <>
            <h1 style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: "300",
              color: "white",
              marginBottom: "48px",
              letterSpacing: "-1px"
            }}>{t.contact.title}</h1>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "16px"
            }}>
              <input
                type="text"
                placeholder={t.contact.firstName}
                value={form.firstName}
                onChange={e => handleChange("firstName", e.target.value)}
                style={{
                  flex: "1 1 120px",
                  padding: "16px 20px",
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #222",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "Inter, sans-serif",
                  minWidth: "0"
                }}
              />
              <input
                type="text"
                placeholder={t.contact.lastName}
                value={form.lastName}
                onChange={e => handleChange("lastName", e.target.value)}
                style={{
                  flex: "1 1 120px",
                  padding: "16px 20px",
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #222",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "Inter, sans-serif",
                  minWidth: "0"
                }}
              />
            </div>

            <input
              type="email"
              placeholder={t.contact.email}
              value={form.email}
              onChange={e => handleChange("email", e.target.value)}
              style={{
                width: "100%",
                padding: "16px 20px",
                backgroundColor: "#1a1a1a",
                border: "1px solid #222",
                borderRadius: "12px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                marginBottom: "16px",
                boxSizing: "border-box",
                fontFamily: "Inter, sans-serif"
              }}
            />

            <textarea
              placeholder={t.contact.message}
              value={form.message}
              onChange={e => handleChange("message", e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "16px 20px",
                backgroundColor: "#1a1a1a",
                border: "1px solid #222",
                borderRadius: "12px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                marginBottom: "16px",
                boxSizing: "border-box",
                resize: "none",
                fontFamily: "Inter, sans-serif"
              }}
            />

            {error && (
              <p style={{
                color: "#e94560",
                fontSize: "13px",
                marginBottom: "16px"
              }}>{error}</p>
            )}

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "16px",
                  backgroundColor: loading ? "#333" : "white",
                  color: loading ? "#888" : "#111",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: "600",
                  letterSpacing: "2px",
                  cursor: loading ? "not-allowed" : "pointer",
                  minWidth: "140px"
                }}
              >{loading ? t.contact.sending : t.contact.send}</button>

              <button
                onClick={onClose}
                style={{
                  padding: "16px 24px",
                  backgroundColor: "transparent",
                  color: "white",
                  border: "1px solid #333",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: "600",
                  letterSpacing: "2px",
                  cursor: "pointer"
                }}
              >{t.contact.back}</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Contact