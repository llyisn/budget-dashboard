import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import useCellSize from '../hooks/useCellSize'
import DraggableWidget from '../components/widgets/DraggableWidget'
import { DragDropProvider, DragOverlay, useDroppable } from '@dnd-kit/react'
import { moveWidget } from '../utils/dashboard/movement'
import WidgetLibrary from '../components/WidgetLibrary'
import LibraryPreviewWidget from '../components/LibraryPreviewWidget'

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

  //WIDGET LIBRARY
  //for dragging widget library window
  const [libraryPos, setLibraryPos] = useState({x: 0, y: 0})
  const libraryDragStart = useRef(null)

  const [isLibraryOpen, setIsLibraryOpen] = useState(false)

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

  function updateWidgetSettings(id, newSettings) {
    setWidgets(prev => prev.map(widget =>
      widget.id === id ?
      {...widget, settings: {...widget.settings, ...newSettings}}
      : widget
    ))
  }

  function handleDragStart({operation}) {
    const {source} = operation
    if (source.data?.type === 'library') {
      libraryDragStart.current = {
        x: libraryPos.x,
        y: libraryPos.y
      }
      return
    }

    if (source.data?.type === 'library-widget') {
      setDraggedLibraryWidget(source.data)
      return
    }

    const widget = widgets.find(w => w.id === operation.source.id)
    if (!widget) return

    dragStartPosition.current = { x: widget.x, y: widget.y}
    //start with normal layout
    setPreviewWidgets(widgets)
  }


  function handleDragMove({ operation }) {
    const { source, transform } = operation

    if (source.data?.type === 'library') {
      const libraryStart = libraryDragStart.current
      if (!libraryStart) return

      setLibraryPos({
        x: libraryStart.x + (transform?.x ?? 0),
        y: libraryStart.y + (transform?.y ?? 0)
      })
      return
    }

    const widgetStart = dragStartPosition.current
    if (!widgetStart) return
    
    const trackSize = cellSize + gapSize

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
    if (source.data?.type === 'library') {
      libraryDragStart.current = null
      return
    }

    if (source.data?.type === 'library-widget') {
      setDraggedLibraryWidget(null)
      return
    }

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
  {isLibraryOpen && <WidgetLibrary position={libraryPos} close={setIsLibraryOpen}/>}
      
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
              {displayedWidgets.map(widget => (
                <DraggableWidget key={widget.id} widget={widget} disabled={!isEditMode}
                onSettingsChange={newSettings => updateWidgetSettings(widget.id,newSettings)} 
                isEditMode={isEditMode}/>
              ))}
            </div>
        </div>
      </div>
    </div>
    
          </DragDropProvider>
    
  )
}

export default Dashboard