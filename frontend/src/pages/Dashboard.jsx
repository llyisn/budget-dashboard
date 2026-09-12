import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import useCellSize from '../hooks/useCellSize'
import DraggableWidget from '../components/widgets/DraggableWidget'
import { DragDropProvider, DragOverlay, useDroppable } from '@dnd-kit/react'
import { moveWidget } from '../utils/dashboard/movement'
import WidgetLibrary from '../components/widget-library/WidgetLibrary'
import LibraryItem from '../components/widget-library/LibraryItem'
const maxColumns = 16

const Dashboard = ({name='', widgetData}) => {
  const gridContainerRef = useRef(null)
  const gridAreaRef = useRef(null) // flexible wrapper that owns the available height
  const { cellSize, gapSize } = useCellSize(gridContainerRef, maxColumns)
  const { droppable } = useDroppable({ id: 'dashboard', element: gridContainerRef })

  const [isEditMode, setIsEditMode] = useState(false)


  const [maxRows, setMaxRows] = useState(1)

  //commited layout
  const [widgets, setWidgets] = useState(widgetData)
  //temporary layout shown during dragging
  const [previewWidgets, setPreviewWidgets] = useState(null)
  //of the dragged widget
  const dragStartPosition = useRef(null)

  //sets max rows
  useEffect(() => {
    if (!gridAreaRef.current) return

    const updateMaxRows = () => {
      const height = gridAreaRef.current.clientHeight
      const rows = Math.floor((height + gapSize) / (cellSize + gapSize))
      setMaxRows(Math.max(1, rows))
    }

    updateMaxRows()

    const observer = new ResizeObserver(updateMaxRows)
    observer.observe(gridAreaRef.current)

    return () => observer.disconnect()
  }, [cellSize, gapSize])

  //---- WIDGET LIBRARY
  //for dragging widget library window
  const [libraryPos, setLibraryPos] = useState({x: 0, y: 0})
  const libraryDragStart = useRef(null)

  //for opening library
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)

  //controlling buttons through keyboard
  useEffect(() => {
    function handleKeyDown(e) {
      const target = e.target
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
      ) return

      if (e.key.toLowerCase() === 'e')  {
        setIsEditMode(prev => !prev)
        setIsLibraryOpen(false)
        return
      }
      if(e.key.toLowerCase() === 'w' && isEditMode) setIsLibraryOpen(prev => !prev)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isEditMode])

  const [draggedLibraryWidget, setDraggedLibraryWidget] = useState(null)  

  //const [libraryDragPhase, setLibraryDragPhase] = useState('idle') //idle = nothing is dragged; floating = picked up form library, follows cursor, not over grid yet; docking = part of grid system

  const ghostWidgetRef = useRef(null)
  const ghostStartPos = useRef({x: 0, y: 0})


  const updateWidgetSettings = useCallback((id, newSettings) => {
    setWidgets(prev => prev.map(w =>
      w.id === id ?
      {...w, settings: {...w.settings, ...newSettings}}
      : w
    ))
  },[])

  function handleDragStart({operation}) {
    const {source, activatorEvent} = operation

    //WIDGET LIBRARY
    if (source.data?.type === 'library') {
      libraryDragStart.current = {
        x: libraryPos.x,
        y: libraryPos.y
      }
      return
    }

    if (source.data?.type === 'library-widget') {
      const widget = source.data.widget
      setDraggedLibraryWidget(widget)

      const px = activatorEvent.clientX
      const py = activatorEvent.clientY

      if (!gridContainerRef) return
      const rect = gridContainerRef.current.getBoundingClientRect()
  
      // offset as a fraction of the library preview's own size (0-1)
      const widgetRect = source.element.getBoundingClientRect()
      const fracX = (px - widgetRect.left) / widgetRect.width
      const fracY = (py - widgetRect.top) / widgetRect.height

      // scale that fraction onto the overlay's actual rendered size
      const trackSize = cellSize + (gapSize/2)
      const overlayWidth = widget.w * cellSize + (widget.w - 1) * gapSize
      const overlayHeight = widget.h * cellSize + (widget.h - 1) * gapSize
      const offsetX = fracX * overlayWidth
      const offsetY = fracY * overlayHeight

      const relX = px - offsetX - rect.left
      const relY = py - offsetY - rect.top
      const gridX = Math.floor(relX / trackSize)+1
      const gridY = Math.floor(relY / trackSize)+1
      console.log('relative to grid', relX, relY)
      console.log('tracksize',trackSize)
      console.log('grid', gridX, gridY)


      ghostWidgetRef.current = {
        id: '__ghost__',
        type: widget.type,
        settings: widget.settings,
        w: widget.w,
        h: widget.h,
        x: gridX,
        y: gridY
      }

      ghostStartPos.current = {x: gridX, y: gridY}
      
      console.log('--------------')

      return
    }

    const widget = widgets.find(w => w.id === operation.source.id)
    if (!widget) return

    //DRAGGING EXISTING WIDGETS
    dragStartPosition.current = { x: widget.x, y: widget.y}
    //start with normal layout
    setPreviewWidgets(widgets)
  }

  function handleDragMove({ operation }) {
    const { source, transform } = operation
    const trackSize = cellSize + gapSize

    //WIDGET LIBRARY
    if (source.data?.type === 'library') {
      const libraryStart = libraryDragStart.current
      if (!libraryStart) return

      setLibraryPos({
        x: libraryStart.x + (transform?.x ?? 0),
        y: libraryStart.y + (transform?.y ?? 0)
      })
      return
    }

    if (source.data?.type === 'library-widget') {
      const ghost = ghostWidgetRef.current
      if (!ghost) return 

      const ghostStart = ghostStartPos.current

      const deltaX = Math.round((transform?.x ?? 0) / trackSize)
      const deltaY = Math.round((transform?.y ?? 0) / trackSize)

      const x = ghostStart.x + deltaX
      const y = ghostStart.y + deltaY

      const preview = moveWidget({
            widgets: [...widgets, ghostWidgetRef.current],
            widgetId: '__ghost__',
            x,
            y,
            maxColumns,
            maxRows,
            dragDeltaX: transform?.x ?? 0,
            dragDeltaY: transform?.y ?? 0,
            oldPosition: null
          })
      if (preview) setPreviewWidgets(preview) //if null keep showing last valid preview, no update
      return
    }


    //DRAGGING EXISTING WIDGETS
    const widgetStart = dragStartPosition.current
    if (!widgetStart) return
    

    const deltaX = Math.round((transform?.x ?? 0) / trackSize)
    const deltaY = Math.round((transform?.y ?? 0) / trackSize)

    const x = widgetStart.x + deltaX
    const y = widgetStart.y + deltaY

    const preview = moveWidget({
        widgets,
        widgetId: source.id,
        x,
        y,
        maxColumns,
        maxRows,
        dragDeltaX: transform?.x ?? 0,
        dragDeltaY: transform?.y ?? 0
      })
    setPreviewWidgets(preview)
  }

  function handleDragEnd({operation}) {
    const {source} = operation

    //WIDGET LIBRARY
    if (source.data?.type === 'library') {
      libraryDragStart.current = null
      return
    }

    if (source.data?.type === 'library-widget') {
      if (previewWidgets) {
        const finalWidgets = previewWidgets.map(w => w.id === '__ghost__' ? { ...w, id: crypto.randomUUID(), settings: {...w.settings, preview: false} } : w)
      setWidgets(finalWidgets)
      }
      //else: no valid spot, insert is dropped
      
      setDraggedLibraryWidget(null)
      setPreviewWidgets(null)
      ghostWidgetRef.current = null 
      ghostStartPos.current = {x: 0, y: 0}

      return
    }

    //DRAGGING EXISTING WIDGETS
    if (previewWidgets) {
      setWidgets(previewWidgets)
    }

    setPreviewWidgets(null)
    dragStartPosition.current = null
  }

  const displayedWidgets = previewWidgets ?? widgets

  return (
    <DragDropProvider
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          >
<div className="bg-linear-to-b from-[#F6CECE] to-[#C7B5C6]">
  {isLibraryOpen && <WidgetLibrary position={libraryPos} close={setIsLibraryOpen} isDraggingWidget={!!draggedLibraryWidget}/>}
      
  <div className="h-screen px-12 py-4 flex flex-col">
    <Header title={name} isEditMode={isEditMode} setIsEditMode={setIsEditMode} setIsLibraryOpen={setIsLibraryOpen}/>
    <div ref={gridAreaRef} className="flex-1 min-h-0">
      <div
              ref={gridContainerRef}
              className="grid gap-(--gap-size) auto-rows-(--cell-size)"
              style={{ '--cell-size': `${cellSize}px`, '--gap-size': `${gapSize}px`,
              gridTemplateColumns: `repeat(${maxColumns}, minmax(0, 1fr))`
            }}
            >
              {displayedWidgets.map(widget => {
       
                if (widget.id === '__ghost__') {
                  return (
                    <div key='__ghost__'
                    style={{
                      gridColumn: `${widget.x} / span ${widget.w}`,
                      gridRow: `${widget.y} / span ${widget.h}`,
                      visibility: 'hidden',
                    }} />
                  )
                }   
                return (
                    <DraggableWidget key={widget.id} widget={widget} disabled={!isEditMode}
                onSettingsChange={updateWidgetSettings} 
                isEditMode={isEditMode}/>
                  )        
})}
            </div>
        </div>
      </div>
    </div>
  
    {draggedLibraryWidget && (
      <DragOverlay>
      <LibraryItem type={draggedLibraryWidget.type} settings={draggedLibraryWidget.settings} w={draggedLibraryWidget.w} h={draggedLibraryWidget.h} pixelSize={{width: draggedLibraryWidget.w*cellSize + (draggedLibraryWidget.w-1)*gapSize, height: draggedLibraryWidget.h*cellSize + (draggedLibraryWidget.h-1)*gapSize }} />
    </DragOverlay>
    )}
    
    
          </DragDropProvider>
    
  )
}

export default Dashboard