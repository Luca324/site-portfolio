import { useEffect, useRef } from 'react'

const SWIPE_THRESHOLD = 48

/** Вешает свайп на элемент: палец влево вызывает onLeft, палец вправо — onRight. */
export default function useSwipe(targetRef, onLeft, onRight) {
    const onLeftRef = useRef(onLeft)
    const onRightRef = useRef(onRight)
    onLeftRef.current = onLeft
    onRightRef.current = onRight

    useEffect(() => {
        const element = targetRef.current

        if (!element) {
            return undefined
        }

        let startX = 0
        let startY = 0
        let tracking = false

        function onTouchStart(event) {
            if (event.touches.length !== 1) {
                tracking = false

                return
            }

            startX = event.touches[0].clientX
            startY = event.touches[0].clientY
            tracking = true
        }

        function onTouchEnd(event) {
            if (!tracking) {
                return
            }

            tracking = false
            const touch = event.changedTouches[0]
            const deltaX = touch.clientX - startX
            const deltaY = touch.clientY - startY
            const horizontal = Math.abs(deltaX) >= SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)

            if (!horizontal) {
                return
            }

            event.preventDefault()

            if (deltaX < 0) {
                onLeftRef.current?.()
            } else {
                onRightRef.current?.()
            }
        }

        function onTouchCancel() {
            tracking = false
        }

        element.addEventListener('touchstart', onTouchStart, { passive: true })
        element.addEventListener('touchend', onTouchEnd)
        element.addEventListener('touchcancel', onTouchCancel)

        return () => {
            element.removeEventListener('touchstart', onTouchStart)
            element.removeEventListener('touchend', onTouchEnd)
            element.removeEventListener('touchcancel', onTouchCancel)
        }
    }, [targetRef])
}
