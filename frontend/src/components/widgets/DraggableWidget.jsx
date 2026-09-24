import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {useDraggable} from '@dnd-kit/react';
import {motion} from 'motion/react'
import { PaintbrushVertical, Image } from 'lucide-react';
import { widgetColorSchemas } from '../../config/widgetColorSchemas';
import { ColorVarsContext } from '../../context/context';
import { widgetTypes } from '../../config/widgetTypes';
import { useClickOutside } from '../../hooks/useClickOutside';
import { resolveWidgetColors, getColorChanges } from '../../utils/colors/widgetColors';
import ColorPanel from './ColorPanel';

const HOVER_OPEN_DELAY = 250
const HOVER_CLOSE_DELAY = 350

const DRAG_IGNORE_SELECTOR = '[contenteditable="true"], input, textarea, button, select, [data-drag-ignore]'

function handleContentPointerDownCapture(e) {
  if (e.target.closest(DRAG_IGNORE_SELECTOR)) e.stopPropagation()
}

const DraggableWidget = ({widget, disabled, onSettingsChange, isEditMode, onDeleteWidget, globalColors, openControlsId, setOpenControlsId,

  setAddTxWidget, setTransactionModal
}) => {
    const { ref, handleRef, isDragging } = useDraggable({id: widget.id, data: widget, disabled})
    const Component = widgetTypes[widget.type]
    
    //ui: widget size and position
    const gridStyle = { gridColumn: `${widget.x} / span ${widget.w}`, 
                gridRow: `${widget.y} / span ${widget.h}`,
            }

    //widget settings
    const handleChange = useCallback(newSettings => onSettingsChange(widget.id, newSettings), [onSettingsChange, widget.id])

    //controls
    const isHoveringRef = useRef(false)
    const hoverTimer = useRef(null)

    function scheduleShow() {
      clearTimeout(hoverTimer.current)
      hoverTimer.current = setTimeout(() => setOpenControlsId(widget.id), HOVER_OPEN_DELAY)
    }

    function scheduleHide() {
      clearTimeout(hoverTimer.current)
      hoverTimer.current = setTimeout(() => setOpenControlsId(prev => (prev === widget.id ? null : prev)), HOVER_CLOSE_DELAY)
    }

    function handlePointerEnter(e) {
      if (!isEditMode || e.pointerType === 'touch') return 
      isHoveringRef.current = true 
      scheduleShow()
    }

    function handlePointerLeave(e) {
      if (!isEditMode || e.pointerType === 'touch') return
      isHoveringRef.current = false
      if (isPanelOpen) return
      scheduleHide()
    }

    useEffect(() => () => clearTimeout(hoverTimer.current), [])

    const isHoverOpen = openControlsId === widget.id && !isDragging

    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const [activeColorKey, setActiveColorKey] = useState(null)
    const [previewColors, setPreviewColors] = useState(null)
    const railRef = useRef(null)

    const closePanel = useCallback(() => {
      setIsPanelOpen(false)
      setActiveColorKey(null)
      setPreviewColors({})
      if (!isHoveringRef.current) {
        setOpenControlsId(prev => (prev === widget.id ? null : prev))
      }
    }, [setOpenControlsId, widget.id])

    useClickOutside(railRef, closePanel, isPanelOpen)

    function togglePanel() {
      setIsPanelOpen(prev => {
        const next = !prev
        if (!next) {
          setActiveColorKey(null)
          setPreviewColors({})
        }
        return next
      })
    }

    function saveColor(newColor, key) {
      const changes = getColorChanges(colorSlots, key, newColor)

      onSettingsChange(widget.id, {colors: {
        ...widget.settings.colors,
        ...changes
      }})

      setPreviewColors(prev => {
        const { [key]: _, ...rest } = prev ?? {}
        return rest
      })
      setActiveColorKey(null)
    }

    const showRail = isEditMode && (isHoverOpen || isPanelOpen)
    const colorSlots = widgetColorSchemas[widget.type] ?? []

    const resolvedColors = useMemo(() => resolveWidgetColors(widget.type, widget.settings.colors, globalColors), [widget.type, widget.settings.colors, globalColors]) 

    const displayedColors = {...resolvedColors, ...previewColors}

   const colorVars = useMemo(() => Object.fromEntries(
    Object.entries(displayedColors).map(([key, color]) => [`--w-${key}`, color])
   ), [displayedColors]) 
    
 
  //  for ImageWidget
  const imgWidgetRef = useRef(null)
   

  return (
    <motion.div
    ref={ref}
    layout
    style={gridStyle}
    className="relative min-h-0 min-w-0

    after:absolute after:top-0 after:-right-8
    after:w-8 after:h-full
    after:content-['']"
    onPointerEnter={handlePointerEnter}
    onPointerLeave={handlePointerLeave}
    >
      <div
      ref={handleRef}
      onPointerDownCapture={handleContentPointerDownCapture}
      className={`size-full`}>
          <ColorVarsContext.Provider value={colorVars}>
            <Component
            {...(widget.type === 'image' ? { ref: imgWidgetRef, widgetId: widget.id } : {})} // for ImageWidget

            {...(widget.type === 'transactions list' ? {setTransactionModal} : {}) }
          {...widget.settings} 
          onSettingsChange={handleChange}
          isEditMode={isEditMode}
          setAddTxWidget={setAddTxWidget} />
          </ColorVarsContext.Provider>
          
      </div>

    {showRail && (
      <div ref={railRef} >
        {/* DELETE BTN */}
        <button
        onClick={onDeleteWidget}
        className='absolute top-0 -right-8 z-40 border bg-(--widget-color) rounded-xs leading-none px-1 py-px
        cursor-pointer text-[1.5rem]'>
        ×
        </button>
        {/* COLOR SETTINGS BTN */}
        <button 
        onClick={togglePanel}
        className='absolute top-8 -right-8 z-40 border bg-(--widget-color) rounded-xs leading-none p-0.75
        cursor-pointer' >
          <PaintbrushVertical size={16} />
        </button>
        
        {/* color panel */}
        {isPanelOpen && (
          <ColorPanel 
          colorSlots={colorSlots}
          setActiveColorKey={setActiveColorKey}
          activeColorKey={activeColorKey}
          resolvedColors={resolvedColors}
          displayedColors={displayedColors}
          setPreviewColors={setPreviewColors}
          saveColor={saveColor}
          
          />
        )}

        {/* FOR IMG: change image */}
        {widget.type === 'image' && (
          <button
        onClick={() => {
          imgWidgetRef.current?.changeImage()}}
        className='absolute top-16 -right-8 z-40 border bg-(--widget-color) rounded-xs leading-none p-0.75
        cursor-pointer'>
          <Image size={16} />
        </button>
        )}
      </div>
    )}
    



    </motion.div>  
  )
}

export default React.memo(DraggableWidget)
