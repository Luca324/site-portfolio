import { useState } from 'react'
import { assetUrl } from '../../assetUrl.js'
import Carousel from '../Carousel'
import ImageOverlay from '../ImageOverlay'
import css from './ProjectCard.module.css'

const GITHUB_ICON = 'GitHub_Invertocat_Black_Clearspace.svg'

export default function ProjectCard({ project }) {
    const images = project.images
    const [index, setIndex] = useState(0)
    const [open, setOpen] = useState(false)

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

      <Carousel
        images={images}
        alt={project.alt}
        index={index}
        onIndexChange={setIndex}
        onImageClick={() => setOpen(true)}
      />

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
