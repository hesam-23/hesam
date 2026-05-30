import { createContext, useContext, useState } from "react"
import en from "./locales/en"
import fa from "./locales/fa"
import es from "./locales/es"

const translations = { en, fa, es }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en")

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}