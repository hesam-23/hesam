import { useState } from "react"
import projects from "../data/projects"

function ProjectTrack() {
  const [activeId, setActiveId] = useState(null)

  return (
    <section style={{
      padding: "60px 40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "40px"
    }}>

      <h2 style={{
        fontSize: "12px",
        letterSpacing: "4px",
        color: "#888",
        fontWeight: "400"
      }}>BUILT SYSTEMS</h2>

      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "24px",
        alignItems: "center"
      }}>
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setActiveId(project.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer"
            }}
          >
            {/* آیکون */}
            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              backgroundColor: project.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              transform: activeId === project.id ? "scale(1.1)" : "scale(1)",
              boxShadow: activeId === project.id 
                ? `0 8px 30px ${project.color}88` 
                : "0 4px 15px rgba(0,0,0,0.1)"
            }}>
              {project.emoji}
            </div>

            {/* اسم */}
            <div style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "#111",
              letterSpacing: "0.5px",
              textAlign: "center"
            }}>
              {project.title}
            </div>

            {/* وضعیت */}
            <div style={{
              fontSize: "9px",
              fontWeight: "500",
              color: activeId === project.id ? project.accent : "#aaa",
              letterSpacing: "2px"
            }}>
              {project.status}
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}

export default ProjectTrack