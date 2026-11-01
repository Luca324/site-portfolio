import { useEffect, useRef } from 'react'
import { assetUrl } from '../../assetUrl.js'
import useSwipe from '../../hooks/useSwipe.js'
import { bindOverlayControls, shiftIndex, stopAndRun } from '../../utils/carousel.js'
import ArrowIcon from '../ArrowIcon'
import css from './ImageOverlay.module.css'

export default function ImageOverlay({ images, alt, index, onIndexChange, onClose }) {
    const overlayRef = useRef(null)
    const hasMany = images.length > 1

    function showPrevious() {
        if (!hasMany) {
            return
        }

        onIndexChange(shiftIndex(index, -1, images.length))
    }

    function showNext() {
        if (!hasMany) {
            return
        }

        onIndexChange(shiftIndex(index, 1, images.length))
    }

    useSwipe(overlayRef, showNext, showPrevious)

    useEffect(() => bindOverlayControls({
        index,
        length: images.length,
        onIndexChange,
        onClose,
    }), [images.length, index, onClose, onIndexChange])

    return (
    <div ref={overlayRef} className={css.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={alt}>
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
            className={`${css.arrow} ${css.arrowPrev}`}
            aria-label="Предыдущее фото"
            onClick={(event) => stopAndRun(event, showPrevious)}
          >
            <ArrowIcon className={css.pointLeft} />
          </button>
          <button
            type="button"
            className={`${css.arrow} ${css.arrowNext}`}
            aria-label="Следующее фото"
            onClick={(event) => stopAndRun(event, showNext)}
          >
            <ArrowIcon />
          </button>
        </div>
      ) : null}
    </div>
    )
}
