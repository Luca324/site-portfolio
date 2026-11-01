import { useEffect, useState } from 'react'
import { assetUrl } from '../assetUrl.js'

/** Сдвигает индекс кадра по кругу. */
export function shiftIndex(index, delta, length) {
    return (index + delta + length) % length
}

/** Возвращает действие оверлея по нажатой клавише. */
export function overlayKeyAction(key, canShift) {
    if (key === 'Escape') {
        return 'close'
    }

    if (!canShift) {
        return null
    }

    if (key === 'ArrowLeft') {
        return 'previous'
    }

    if (key === 'ArrowRight') {
        return 'next'
    }

    return null
}

/** Блокирует прокрутку страницы и возвращает функцию, которая её восстанавливает. */
export function holdPageScroll() {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
        document.body.style.overflow = previousOverflow
    }
}

/** Вешает клавиши оверлея и блокирует прокрутку, пока оверлей открыт. */
export function bindOverlayControls({ index, length, onIndexChange, onClose }) {
    const releaseScroll = holdPageScroll()

    function onKeyDown(event) {
        const action = overlayKeyAction(event.key, length > 1)

        if (action === 'close') {
            onClose()
        }

        if (action === 'previous') {
            onIndexChange(shiftIndex(index, -1, length))
        }

        if (action === 'next') {
            onIndexChange(shiftIndex(index, 1, length))
        }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
        releaseScroll()
        window.removeEventListener('keydown', onKeyDown)
    }
}

/** Останавливает всплытие клика и выполняет действие. */
export function stopAndRun(event, action) {
    event.stopPropagation()
    action()
}

/** Загружает натуральные ширину и высоту каждой картинки. */
export function loadImageSizes(fileNames) {
    return Promise.all(fileNames.map((fileName) => new Promise((resolve) => {
        const image = new Image()
        image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight })
        image.src = assetUrl(fileName)
    })))
}

/** Считает высоту кадра: самая высокая картинка на всю текущую ширину. */
export function tallestImageHeight(sizes, frameWidth) {
    return sizes.reduce((maxHeight, size) => {
        return Math.max(maxHeight, (frameWidth * size.height) / size.width)
    }, 0)
}

/** Держит высоту кадра равной самой высокой картинке и обновляет её при изменении ширины. */
export function useCarouselFrameHeight(fileNames, frameRef) {
    const [height, setHeight] = useState(0)

    useEffect(() => {
        const frame = frameRef.current
        if (!frame) {
            return undefined
        }

        let sizes = []
        let cancelled = false

        function update() {
            if (!sizes.length || !frame.clientWidth) {
                return
            }

            setHeight(tallestImageHeight(sizes, frame.clientWidth))
        }

        loadImageSizes(fileNames).then((loaded) => {
            if (cancelled) {
                return
            }

            sizes = loaded
            update()
        })

        const observer = new ResizeObserver(update)
        observer.observe(frame)

        return () => {
            cancelled = true
            observer.disconnect()
        }
    }, [fileNames, frameRef])

    return height
}
