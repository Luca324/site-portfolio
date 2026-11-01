import { useMemo, useState } from 'react'
import { projects } from '../data/projects.jsx'
import ProjectCard from './ProjectCard.jsx'

export default function Projects() {
  const [sort, setSort] = useState('default')

  const sorted = useMemo(() => {
    const items = projects.map((project, index) => ({ project, index }))

    if (sort === 'default') {
      items.sort((a, b) => a.index - b.index)
      return items
    }

    items.sort((a, b) => {
      const orderA = typeof a.project.order === 'number' ? a.project.order : 0
      const orderB = typeof b.project.order === 'number' ? b.project.order : 0

      if (sort === 'newest') {
        return orderB - orderA
      }

      if (sort === 'oldest') {
        return orderA - orderB
      }

      return 0
    })

    return items
  }, [sort])

  return (
    <section>
      <h2>Проекты</h2>
      <div className="projects-filter">
        <span>Сортировать проекты:</span>
        <select id="project-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="default">В порядке по умолчанию</option>
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
        </select>
      </div>
      <ul className="projects-list">
        {sorted.map(({ project }) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    </section>
  )
}
