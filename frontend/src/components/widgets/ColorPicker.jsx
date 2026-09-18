import React, { useRef, useState } from 'react'
import { converter, formatHex} from 'culori'

const clamp = value => Math.min(1, Math.max(0, value))

const toHsv = converter('hsv')
const hexToHsv = hex => {
    const color = toHsv(hex)
    return {
        h: color?.h ?? 0,
        s: color?.s ?? 0,
        v: color?.v ?? 0
    }
}
const hsvToHex = ({h,s,v}) => 
    formatHex({mode: 'hsv', h,s,v})

const ColorPicker = ({value='#ff0000', onChange, onSave, onCancel}) => {
    const [hsv, setHsv] = useState(() => hexToHsv(value))
    const squareRef = useRef(null)
    const hueRef = useRef(null)

    function changeColor(next) {
        setHsv(next)
        onChange(hsvToHex(next))
    }

    function handleSquare(e) {
        const rect = squareRef.current.getBoundingClientRect()
        const s = clamp((e.clientX - rect.left) / rect.width)
        const v = clamp(1 - (e.clientY - rect.top) / rect.height)

        changeColor({...hsv, s, v})
    }

    function handleHue(e) {
        const rect = hueRef.current.getBoundingClientRect()
        const percentage = clamp((e.clientX - rect.left) / rect.width)
        const h = percentage * 360
        changeColor({...hsv, h})
    }

    function drag(e, handler) {
        const element = e.currentTarget
        element.setPointerCapture(e.pointerId)

        const move = event => handler(event)
        const up = () => {
            element.removeEventListener('pointermove', move)
            element.removeEventListener('pointerup', up)
        }

        element.addEventListener('pointermove', move)
        element.addEventListener('pointerup', up)
    }
    

  return (
    <div
    className='relative w-35 h-52 bg-black flex flex-col items-center p-1.5 rounded-xs @container'>
        {/* square */}
      <div 
      ref={squareRef}
      className='w-full aspect-square rounded-md cursor-crosshair touch-none relative'
      style={{backgroundColor: `hsl(${hsv.h} 100% 50%)`}}
      onPointerDown={e => drag(e, handleSquare)}
      >
        
        <div className='absolute inset-0 rounded-md'
        style={{background: 'linear-gradient(to right, #fff, transparent)'}} />

        <div className='absolute inset-0 rounded-md'
        style={{background: 'linear-gradient(to top, #000, transparent)'}} />

        {/* picker cursor (a circle) */}
        <div className='absolute rounded-full size-3 -translate-x-1/2 -translate-y-1/2 border border-white'
        style={{backgroundColor: hsvToHex(hsv),
            left: `${hsv.s * 100}%`,
            top: `${(1-hsv.v) * 100}%`

        }} />
      </div>

      {/* hue bar */}
      <div 
      ref={hueRef}
      className='my-2 w-full relative h-[0.2rem] cursor-pointer'
      style={{background: 'linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)'}}
      onPointerDown={e => drag(e, handleHue)}>
        {/* cursor */}
        <div className='absolute size-1.5 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full'
        style={{backgroundColor: `hsl(${hsv.h} 100% 50%)`,
            left: `${(hsv.h / 360) * 100}%`
        }} />
      </div>

      <span className='text-white'>{hsvToHex(hsv)}</span>

      {/* save and cancel buttons */}
      <div className='flex justify-between gap-8 text-white text-[12cqw]leading-tight'>
        <button onClick={onCancel} className=''>cancel</button>
        <button onClick={() => {
            onSave(hsvToHex(hsv))}}>save</button>
      </div>
    </div>
  )
}

export default ColorPicker
