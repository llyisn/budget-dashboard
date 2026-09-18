import { useEffect } from "react"

export function useClickOutside(ref, onOutsideClick, active) {
  useEffect(() => {
    if (!active) return

    function handlePointerDown(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutsideClick()
    }
    document.addEventListener('pointerdown', handlePointerDown)
    
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [active, onOutsideClick, ref])
}