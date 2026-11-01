import { useRef, useState } from 'react'
import { assetUrl } from '../assetUrl.js'
import { shiftIndex, useCarouselFrameHeight } from '../utils/carousel.js'
import ArrowIcon from './ArrowIcon.jsx'
import ImageOverlay from './ImageOverlay.jsx'
import css from './ProjectCard.module.css'

const GITHUB_ICON = 'GitHub_Invertocat_Black_Clearspace.svg'

export default function ProjectCard({ project }) {
    const images = project.images
    const frameRef = useRef(null)
    const frameHeight = useCarouselFrameHeight(images, frameRef)
    const [index, setIndex] = useState(0)
    const [open, setOpen] = useState(false)
    const hasMany = images.length > 1


    return (
    <li className={css.item} data-project-id={project.id}>
      <div className={css.title}>
        <a href={project.github} target="_blank">
          <img src={assetUrl(GITHUB_ICON)} alt="" className={css.githubIcon} />
          {project.title}
        </a>
      </div>

      <div className={css.description}>{project.description}</div>

      {project.date ? <div className={css.date}>{project.date}</div> : null}
	  
      <div className={css.carousel}>
        {hasMany ? (
          <button type="button" className={`${css.sideButton} ${css.sideButtonPrev}`} aria-label="Предыдущее фото" onClick={() => setIndex((current) => shiftIndex(current, -1, images.length))}>
            <ArrowIcon className={css.pointLeft} />
          </button>
        ) : null}
        <div
          className={css.frame}
          ref={frameRef}
          style={frameHeight ? { height: frameHeight } : undefined}
        >
          <img
            src={assetUrl(images[index])}
            alt={project.alt}
            className={css.image}
            onClick={() => setOpen(true)}
          />
        </div>
        {hasMany ? (
          <button type="button" className={`${css.sideButton} ${css.sideButtonNext}`} aria-label="Следующее фото" onClick={() => setIndex((current) => shiftIndex(current, 1, images.length))}>
            <ArrowIcon />
          </button>
        ) : null}
      </div>
      {open ? (
        <ImageOverlay
          images={images}
          alt={project.alt}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </li>
    )
}
