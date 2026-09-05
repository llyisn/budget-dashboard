import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import useCellSize from '../hooks/useCellSize'
import DraggableWidget from '../components/widgets/DraggableWidget'
import { DragDropProvider, useDroppable } from '@dnd-kit/react'
import { moveWidget } from '../utils/dashboard/movement'

const maxColumns = 14

const Dashboard = ({name='', widgetData}) => {
  const gridContainerRef = useRef(null)
  const gridAreaRef = useRef(null) // flexible wrapper that owns the available height
  const { cellSize, gapSize } = useCellSize(gridContainerRef)
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

  function updateWidgetSettings(id, newSettings) {
    setWidgets(prev => prev.map(widget =>
      widget.id === id ?
      {...widget, settings: {...widget.settings, ...newSettings}}
      : widget
    ))
  }

  function handleDragStart({operation}) {
    const widget = widgets.find(w => w.id === operation.source.id)
    if (!widget) return

    dragStartPosition.current = { x: widget.x, y: widget.y}
    //start with normal layout
    setPreviewWidgets(widgets)
  }


  function handleDragMove({ operation }) {
    const { source, transform } = operation

    const start = dragStartPosition.current
    if (!start) return
    
    const trackSize = cellSize + gapSize

    const deltaX = Math.round((transform?.x ?? 0) / trackSize)
    const deltaY = Math.round((transform?.y ?? 0) / trackSize)

    const x = start.x + deltaX
    const y = start.y + deltaY

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

  function handleDragEnd() {
    if (previewWidgets) {
      setWidgets(previewWidgets)
    }

    setPreviewWidgets(null)
    dragStartPosition.current = null
  }

  const displayedWidgets = previewWidgets ?? widgets

  return (
    <div className="bg-linear-to-b from-[#F6CECE] to-[#C7B5C6]">
      <div className="h-screen px-12 py-4 flex flex-col">
        <Header title={name} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
        <div ref={gridAreaRef} className="flex-1 min-h-0">
          <DragDropProvider
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          >
            <div
              ref={gridContainerRef}
              className="grid grid-cols-14 gap-(--gap-size) auto-rows-(--cell-size)"
              style={{ '--cell-size': `${cellSize}px`, '--gap-size': `${gapSize}px` }}
            >
              {displayedWidgets.map(widget => (
                <DraggableWidget key={widget.id} widget={widget} disabled={!isEditMode}
                onSettingsChange={newSettings => updateWidgetSettings(widget.id,newSettings)} 
                isEditMode={isEditMode}/>
              ))}
            </div>
          </DragDropProvider>
        </div>
      </div>
    </div>
  )
}

export default Dashboard