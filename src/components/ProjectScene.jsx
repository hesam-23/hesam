import { useState } from "react"
import { useLang } from "../LanguageContext.jsx"

function ProjectScene({ project, onClose }) {
  const { lang } = useLang()
  const [showSummary, setShowSummary] = useState(false)
  const [showSkills, setShowSkills] = useState(false)
  const [entered, setEntered] = useState(false)

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      position: "relative",
      backgroundColor: project.color
    }}>

      {entered && project.url && (
        <iframe
          src={project.url}
          style={{
            width: "100%",
            height: "calc(100% - 60px)",
            border: "none",
            marginTop: "60px"
          }}
        />
      )}

      {!entered && (
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          zIndex: 200
        }}>
          <h2 style={{
            color: "white",
            fontSize: "28px",
            fontWeight: "300",
            letterSpacing: "2px",
            marginBottom: "20px"
          }}>{project.title}</h2>

          <div style={{
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  justifyContent: "center",
  maxWidth: "600px"
}}>

            {project.url && (
              <button
                onClick={() => setEntered(true)}
                style={{
                  padding: "14px 32px",
                  backgroundColor: "white",
                  color: "#111",
                  borderRadius: "30px",
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: "2px",
                  border: "none",
                  cursor: "pointer"
                }}
              >ENTER →</button>
            )}

           <button
  onClick={onClose}
  className="mobile-only"
  style={{
    padding: "14px 32px",
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "white",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "2px",
    border: "1px solid rgba(255,255,255,0.4)",
    cursor: "pointer"
  }}
>← HOME </button>

            <button
              onClick={() => setShowSummary(true)}
              style={{
                padding: "14px 32px",
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "white",
                borderRadius: "30px",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "2px",
                border: "1px solid rgba(255,255,255,0.4)",
                cursor: "pointer"
              }}
            >SUMMARY</button>

            <button
              onClick={() => setShowSkills(true)}
              style={{
                padding: "14px 32px",
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "white",
                borderRadius: "30px",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "2px",
                border: "1px solid rgba(255,255,255,0.4)",
                cursor: "pointer"
              }}
            >SKILLS</button>

          </div>
        </div>
      )}

      {showSummary && (
        <div
          onClick={() => setShowSummary(false)}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9000
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "48px",
              maxWidth: "560px",
              width: "90%"
            }}
          >
            <h2 style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#111",
              marginBottom: "16px"
            }}>{project.title}</h2>
            <p style={{
              fontSize: "15px",
              lineHeight: "1.8",
              color: "#444"
            }}>{project.summary[lang]}</p>
            <button
              onClick={() => setShowSummary(false)}
              style={{
                marginTop: "32px",
                padding: "10px 24px",
                backgroundColor: "#111",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "12px",
                letterSpacing: "1px"
              }}
            >CLOSE</button>
          </div>
        </div>
      )}

      {showSkills && (
        <div
          onClick={() => setShowSkills(false)}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9000
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "48px",
              maxWidth: "480px",
              width: "90%"
            }}
          >
            <h2 style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#111",
              marginBottom: "24px"
            }}>Technologies Used</h2>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px"
            }}>
              {project.skills.map((skill, i) => (
                <span key={i} style={{
                  padding: "8px 18px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#111"
                }}>{skill}</span>
              ))}
            </div>
            <button
              onClick={() => setShowSkills(false)}
              style={{
                marginTop: "32px",
                padding: "10px 24px",
                backgroundColor: "#111",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "12px",
                letterSpacing: "1px"
              }}
            >CLOSE</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default ProjectScene