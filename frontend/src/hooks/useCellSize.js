import { useState, useEffect } from 'react'

const GAP_RATIO = 5.25;

const useCellSize = (gridContainerRef, columns) => {
   const [cellSize, setCellSize] = useState(84)
   const [gapSize, setGapSize] = useState(null)

   useEffect(() => {
        if (!gridContainerRef.current) return

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                const cell = entry.contentRect.width / (columns + (columns-1) / GAP_RATIO)
                setCellSize(cell)
                const gap = cell / GAP_RATIO
                setGapSize(gap)
                }
            })

            observer.observe(gridContainerRef.current)

            return () => {
                observer.disconnect()
            }
        
    }, [columns])

    return { cellSize, gapSize }
}

export default useCellSize
