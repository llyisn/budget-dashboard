import React, { useState, useEffect } from 'react'

const useElementHeight = (containerRef) => {
    const [availableHeight, setAvailableHeight] = useState(null)
  useEffect(() => {
         if (!containerRef.current) return
  
         const observer = new ResizeObserver(([entry]) => {
          setAvailableHeight(entry.contentRect.height)
         })
  
         observer.observe(containerRef.current)
  
         return () => {
                 observer.disconnect()
             }
     }, [])

     return availableHeight
}

export default useElementHeight
