import { useState, useEffect } from 'react'

const GAP_RATIO = 5.25;

const useCellSize = (gridContainerRef) => {
   const [cellSize, setCellSize] = useState(84)
   const [gapSize, setGapSize] = useState(null)

   useEffect(() => {
        if (!gridContainerRef.current) return

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
        //     console.log('Element:', entry.target);
                //const cellSize = (entry.contentRect.width - (11*16)) / 12
                const cell = entry.contentRect.width / (14 + 11 / GAP_RATIO)
                setCellSize(cell)
                const gap = cell / GAP_RATIO
                setGapSize(gap)
                }
            })

            observer.observe(gridContainerRef.current)

            return () => {
                observer.disconnect()
            }
        
    }, [])

    return { cellSize, gapSize }
}

export default useCellSize
