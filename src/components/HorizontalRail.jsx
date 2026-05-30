import { useState } from "react"
import { useLang } from "../LanguageContext.jsx"
import Navbar from "./Navbar"
import ProjectScene from "./ProjectScene"
import About from "./About"
import Contact from "./Contact"
import projects from "../data/projects"

function HorizontalRail({ activeProjectId, setActiveProjectId }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAbout, setShowAbout] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const { t, lang } = useLang()

  const goToProject = (index) => {
    setCurrentIndex(index + 1)
    setActiveProjectId(projects[index].id)
  }

  const goHome = () => {
    setCurrentIndex(0)
    setActiveProjectId(null)
  }

  const activeProject = projects.find(p => p.id === activeProjectId)

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0
    }}>

      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999
      }}>
        <Navbar
          onHome={goHome}
          onAbout={() => setShowAbout(true)}
          onContact={() => setShowContact(true)}
          hiddenHome={showAbout || showContact}
          hidden={showAbout || showContact}
        />
      </div>

      <div style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fafaf8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "60px",
        paddingTop: "60px",
        position: "relative"
      }}>
        <h1 className="hero-title" style={{
  fontSize: "48px",
  fontWeight: "300",
  letterSpacing: "-1px",
  color: "#111",
  direction: lang === "fa" ? "rtl" : "ltr"
}}>{t.hero}</h1>

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px"
        }}>
          <p style={{
            fontSize: "11px",
            letterSpacing: "4px",
            color: "#888",
            fontWeight: "400"
          }}>{t.builtSystems}</p>

          <div className="project-grid">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => goToProject(index)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "20px",
                    backgroundColor: project.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "36px",
                    transition: "transform 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  {project.emoji}
                </div>
                <div style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "#111",
                  letterSpacing: "0.5px"
                }}>{project.title}</div>
                <div style={{
                  fontSize: "9px",
                  color: "#aaa",
                  letterSpacing: "2px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  {project.status === "LIVE" && (
                    <span style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#22c55e",
                      display: "inline-block",
                      animation: "pulse 1.5s infinite"
                    }} />
                  )}
                  {project.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          position: "absolute",
          bottom: "24px",
          left: 0, right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px"
        }}>
          <p style={{
            fontSize: "11px",
            color: "#aaa",
            letterSpacing: "0.5px"
          }}>© 2026 HEGOLZ. All rights reserved.</p>
          <p style={{
            fontSize: "11px",
            color: "#aaa",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            Michigan, USA
            <img src="https://flagcdn.com/w20/us.png" alt="US flag" style={{width: "20px"}} />
          </p>
        </div>

      </div>

      {activeProject && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 100
        }}>
          <ProjectScene
            key={activeProjectId}
            project={activeProject}
            onClose={goHome}
          />
        </div>
      )}

      {showAbout && <About onClose={() => setShowAbout(false)} />}
      {showContact && <Contact onClose={() => setShowContact(false)} />}

    </div>
  )
}

export default HorizontalRail