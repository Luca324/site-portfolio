import { assetUrl } from '../assetUrl.js'

const MAX_ANGLE = 5
const PERSPECTIVE = 1000
const GITHUB_ICON = 'GitHub_Invertocat_Black_Clearspace.svg'

function tiltImage(event) {
  const image = event.currentTarget
  const rect = image.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const normalizedX = (mouseX - centerX) / centerX
  const normalizedY = (mouseY - centerY) / centerY
  const rotateY = normalizedX * MAX_ANGLE
  const rotateX = -normalizedY * MAX_ANGLE

  image.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

function resetImage(event) {
  event.currentTarget.style.transform = `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg)`
}

export default function ProjectCard({ project }) {
  return (
    <li className="project-item" data-project-id={project.id}>
      <div className="project-title">
        <a href={project.github} target="_blank">
          <img src={assetUrl(GITHUB_ICON)} alt="" className="project-github-icon" />
          {project.title}
        </a>
      </div>
      <div className="project-description">{project.description}</div>
      {project.date ? <div className="project-date">{project.date}</div> : null}
      <div className="project-image-wrapper">
        <img
          src={assetUrl(project.image)}
          alt={project.alt}
          className="project-image"
          onMouseMove={tiltImage}
          onMouseLeave={resetImage}
        />
      </div>
    </li>
  )
}
