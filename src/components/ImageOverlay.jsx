import { useEffect } from 'react'
import { assetUrl } from '../assetUrl.js'

function neighbor(index, delta, length) {
  return (index + delta + length) % length
}

export default function ImageOverlay({ images, alt, index, onIndexChange, onClose }) {
  const hasMany = images.length > 1

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }

      if (!hasMany) {
        return
      }

      if (event.key === 'ArrowLeft') {
        onIndexChange(neighbor(index, -1, images.length))
      }

      if (event.key === 'ArrowRight') {
        onIndexChange(neighbor(index, 1, images.length))
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [hasMany, images.length, index, onClose, onIndexChange])

  return (
    <div className="image-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={alt}>
      <button type="button" className="image-overlay-close" aria-label="Закрыть" onClick={onClose}>
        ×
      </button>
      <img
        src={assetUrl(images[index])}
        alt={alt}
        className="image-overlay-picture"
        onClick={(event) => event.stopPropagation()}
      />
      {hasMany ? (
        <div className="image-overlay-nav">
          <button
            type="button"
            className="image-overlay-arrow"
            aria-label="Предыдущее фото"
            onClick={(event) => {
              event.stopPropagation()
              onIndexChange(neighbor(index, -1, images.length))
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="image-overlay-arrow"
            aria-label="Следующее фото"
            onClick={(event) => {
              event.stopPropagation()
              onIndexChange(neighbor(index, 1, images.length))
            }}
          >
            ›
          </button>
        </div>
      ) : null}
    </div>
  )
}
