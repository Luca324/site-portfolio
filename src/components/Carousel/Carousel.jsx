import { useRef } from 'react'
import { assetUrl } from '../../assetUrl.js'
import useSwipe from '../../hooks/useSwipe.js'
import { shiftIndex, useCarouselFrameHeight } from '../../utils/carousel.js'
import ArrowIcon from '../ArrowIcon'
import css from './Carousel.module.css'

export default function Carousel({ images, alt, index, onIndexChange, onImageClick }) {
    const frameRef = useRef(null)
    const frameHeight = useCarouselFrameHeight(images, frameRef)
    const hasMany = images.length > 1

    function showPrevious() {
        onIndexChange((current) => shiftIndex(current, -1, images.length))
    }

    function showNext() {
        onIndexChange((current) => shiftIndex(current, 1, images.length))
    }

    useSwipe(frameRef, hasMany ? showNext : undefined, hasMany ? showPrevious : undefined)

    return (
    <div className={css.carousel}>
      {hasMany ? (
        <button
          type="button"
          className={`${css.sideButton} ${css.sideButtonPrev}`}
          aria-label="Предыдущее фото"
          onClick={showPrevious}
        >
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
          alt={alt}
          className={css.image}
          onClick={onImageClick}
        />
      </div>

      {hasMany ? (
        <button
          type="button"
          className={`${css.sideButton} ${css.sideButtonNext}`}
          aria-label="Следующее фото"
          onClick={showNext}
        >
          <ArrowIcon />
        </button>
      ) : null}
    </div>
    )
}
