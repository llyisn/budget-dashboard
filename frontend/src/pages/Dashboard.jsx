import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import useCellSize from '../hooks/useCellSize'
import DraggableWidget from '../components/widgets/DraggableWidget'
import { DragDropProvider, useDroppable } from '@dnd-kit/react'
import { dragTransformToGridDelta } from '../utils/dashboard/grid'
import { moveWidget } from '../utils/dashboard/movement'

const widgetData = [
  { id: 1, type: 'stat', w: 3, h: 1, x: 1, y: 1, settings: { variant: 'inline', label: 'savings', value: '$86 347', delta: '↑12,4% vs. last month' } },
  { id: 2, type: 'budget', w: 3, h: 1, x: 1, y: 2, settings: { variant: 'inline', valueNow: 5.3, valueMax: 7 } },
  { id: 3, type: 'text', w: 3, h: 2, x: 4, y: 1, settings: { text: 'ugly consistency beats pretty perfection' } },
  { id: 4, type: 'checklist', w: 2, h: 2, x: 1, y: 3, settings: { data: [
    { id: 1, content: 'order tv', checked: true },
    { id: 2, content: 'taxes', checked: false },
    { id: 3, content: 'docs', checked: false }
  ] } },
//  { id: 5, type: 'transaction', w: 4, h: 6, x: 7, y: 1, settings: { date: '23.07.26', price: 192.34 } },
  { id: 6, type: 'budgetHistory', w: 4, h: 2, x: 11, y: 1, settings: { data: [
    { month: 'Jul 26', total: 3484, rent: 2500, food: null }
  ] } },
  { id: 7, type: 'goal', w: 3, h: 2, x: 3, y: 3, settings: { valueNow: 4305, valueMax: 8000 } },
  { id: 8, type: 'topExpenses', w: 4, h: 2, x: 11, y: 3, settings: { data: { rent: 439.35, food: 1823.88, transport: 331.66 } } }
]

const maxColumns = 14

const Dashboard = () => {
  const gridContainerRef = useRef(null)
  const gridAreaRef = useRef(null) // flexible wrapper that owns the available height
  const { cellSize, gapSize } = useCellSize(gridContainerRef)
  const { droppable } = useDroppable({ id: 'dashboard', element: gridContainerRef })

  const [widgets, setWidgets] = useState(widgetData)

  const [maxRows, setMaxRows] = useState(1)

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

  function handleDragEnd({ operation }) {
    const { source, transform } = operation

    const widget = widgets.find(w => w.id === source.id)

    const { x: dx, y: dy } = dragTransformToGridDelta({
      transformX: transform?.x ?? 0,
      transformY: transform?.y ?? 0,
      cellSize,
      gapSize
    })

    const x = widget.x + dx
    const y = widget.y + dy

    setWidgets(prev =>
      moveWidget({
        widgets: prev,
        widgetId: source.id,
        x,
        y,
        maxColumns,
        maxRows,
        dragDeltaX: transform?.x ?? 0,
        dragDeltaY: transform?.y ?? 0
      })
    )
  }

  return (
    <div className="bg-linear-to-b from-[#F6CECE] to-[#C7B5C6]">
      <div className="h-screen px-12 py-4 flex flex-col">
        <Header title="Dashboard" />
        <div ref={gridAreaRef} className="flex-1 min-h-0">
          <DragDropProvider
          
          onDragEnd={handleDragEnd}
          >
            <div
              ref={gridContainerRef}
              className="grid grid-cols-14 gap-(--gap-size) auto-rows-(--cell-size)"
              style={{ '--cell-size': `${cellSize}px`, '--gap-size': `${gapSize}px` }}
            >
              {widgets.map(widget => (
                <DraggableWidget key={widget.id} widget={widget} />
              ))}
            </div>
          </DragDropProvider>
        </div>
      </div>
    </div>
  )
}

export default Dashboard