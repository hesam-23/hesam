import { useState } from "react"
import { useLang } from "./LanguageContext.jsx"
import HorizontalRail from "./components/HorizontalRail"

function App() {
  const [activeProjectId, setActiveProjectId] = useState(null)
  const { lang } = useLang()

 document.body.dir = lang === "fa" ? "rtl" : "ltr"
document.body.style.fontFamily = lang === "fa" ? "'Vazirmatn', sans-serif" : "'Inter', sans-serif"

return (
    <div>
      <HorizontalRail 
        activeProjectId={activeProjectId}
        setActiveProjectId={setActiveProjectId}
      />
    </div>
  )
}

export default App