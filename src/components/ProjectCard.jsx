import { useCallback, useState } from 'react'
import { assetUrl } from '../assetUrl.js'
import ImageOverlay from './ImageOverlay.jsx'

const GITHUB_ICON = 'GitHub_Invertocat_Black_Clearspace.svg'

function neighbor(index, delta, length) {
  return (index + delta + length) % length
}

export default function ProjectCard({ project }) {
  const images = project.images
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const hasMany = images.length > 1

  const showPrevious = useCallback(() => {
    setIndex((current) => neighbor(current, -1, images.length))
  }, [images.length])

  const showNext = useCallback(() => {
    setIndex((current) => neighbor(current, 1, images.length))
  }, [images.length])

  const closeOverlay = useCallback(() => {
    setOpen(false)
  }, [])

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
        <div className="project-image-frame">
          {hasMany ? (
            <button type="button" className="project-carousel-arrow project-carousel-arrow-prev" aria-label="Предыдущее фото" onClick={showPrevious}>
              ‹
            </button>
          ) : null}
          <img
            src={assetUrl(images[index])}
            alt={project.alt}
            className="project-image"
            onClick={() => setOpen(true)}
          />
          {hasMany ? (
            <button type="button" className="project-carousel-arrow project-carousel-arrow-next" aria-label="Следующее фото" onClick={showNext}>
              ›
            </button>
          ) : null}
        </div>
      </div>
      {open ? (
        <ImageOverlay
          images={images}
          alt={project.alt}
          index={index}
          onIndexChange={setIndex}
          onClose={closeOverlay}
        />
      ) : null}
    </li>
  )
}
