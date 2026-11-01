import { useEffect } from 'react'
import { assetUrl } from '../assetUrl.js'
import { bindOverlayControls, shiftIndex, stopAndRun } from '../utils/carousel.js'
import ArrowIcon from './ArrowIcon.jsx'
import css from './ImageOverlay.module.css'

export default function ImageOverlay({ images, alt, index, onIndexChange, onClose }) {
  const hasMany = images.length > 1

  useEffect(() => bindOverlayControls({
    index,
    length: images.length,
    onIndexChange,
    onClose,
  }), [images.length, index, onClose, onIndexChange])

  return (
    <div className={css.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={alt}>
      <button type="button" className={css.close} aria-label="Закрыть" onClick={onClose}>
        ×
      </button>
      <img
        src={assetUrl(images[index])}
        alt={alt}
        className={css.picture}
        onClick={(event) => event.stopPropagation()}
      />
      {hasMany ? (
        <div className={css.nav}>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            aria-label="Предыдущее фото"
            onClick={(event) => stopAndRun(event, () => onIndexChange(shiftIndex(index, -1, images.length)))}
          >
            <ArrowIcon className={css.pointLeft} />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            aria-label="Следующее фото"
            onClick={(event) => stopAndRun(event, () => onIndexChange(shiftIndex(index, 1, images.length)))}
          >
            <ArrowIcon />
          </button>
        </div>
      ) : null}
    </div>
  )
}
