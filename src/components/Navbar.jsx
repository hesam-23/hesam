import { useState } from "react"
import "../styles/Navbar.css"
import { useLang } from "../LanguageContext.jsx"

function Navbar({ onHome, onAbout, onContact, hiddenHome, hidden }) {
  const { lang, setLang, t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  if (hidden) return null

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={onHome} style={{cursor: "pointer"}}>HEGOLZ</div>

      {/* دسکتاپ منو */}
      <ul className="navbar-links navbar-desktop">
        {!hiddenHome && <li onClick={onHome}>{t.navbar.home}</li>}
        <li onClick={onAbout}>{t.navbar.about}</li>
        <li onClick={onContact}>{t.navbar.contact}</li>
      </ul>

      {/* دکمه‌های زبان دسکتاپ */}
      <div className="lang-buttons navbar-desktop">
        {["en", "fa", "es"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: "4px 10px",
              borderRadius: "20px",
              border: "1px solid",
              borderColor: lang === l ? "white" : "#555",
              backgroundColor: lang === l ? "white" : "transparent",
              color: lang === l ? "#111" : "#888",
              fontSize: "11px",
              fontWeight: "600",
              cursor: "pointer",
              letterSpacing: "1px"
            }}
          >{l.toUpperCase()}</button>
        ))}
      </div>

      {/* همبرگر موبایل */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* منوی موبایل */}
      {menuOpen && (
        <div className="mobile-menu">
          {!hiddenHome && (
            <div onClick={() => { onHome(); setMenuOpen(false) }}>{t.navbar.home}</div>
          )}
          <div onClick={() => { onAbout(); setMenuOpen(false) }}>{t.navbar.about}</div>
          <div onClick={() => { onContact(); setMenuOpen(false) }}>{t.navbar.contact}</div>
          <div className="mobile-lang">
            {["en", "fa", "es"].map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setMenuOpen(false) }}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: "1px solid",
                  borderColor: lang === l ? "white" : "#555",
                  backgroundColor: lang === l ? "white" : "transparent",
                  color: lang === l ? "#111" : "#888",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar