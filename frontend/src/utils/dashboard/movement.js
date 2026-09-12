import { resolveCollisions } from "./collision"
import { clampPosition, findNearestFreeCell } from "./grid"


export function moveWidget({widgets, widgetId, x, y, maxColumns, maxRows, dragDeltaX, dragDeltaY, oldPosition}) {
    const dragged = widgets.find(w => w.id === widgetId)
    if (!dragged) return widgets
    const position = clampPosition(x, y, dragged.w, dragged.h, maxColumns, maxRows)

    const resolvedOldPosition = oldPosition !== undefined ? oldPosition : { x: dragged.x, y: dragged.y }

    const movedWidgets = widgets.map(widget =>
        widget.id === widgetId
        ? { ...widget, x: position.x, y: position.y} 
        : widget
    )

    const resolved = resolveCollisions({
        widgets: movedWidgets,
        draggedId: widgetId,
        oldPosition: resolvedOldPosition,
        maxColumns,
        maxRows,
        dragDeltaX,
        dragDeltaY
    })

    if (resolved) return resolved

    //resolveCollisions failed. fresh library insert
    //look for a free cell
    const others = widgets.filter(w => w.id !== widgetId)
    const fallback = findNearestFreeCell(others, dragged, maxColumns, maxRows, position.x, position.y)

    if (fallback) {
        return widgets.map(w => w.id === widgetId ? 
            { ...widget, x: fallback.x, y: fallback.y} : w
        )
    }

    return null //grid is full (or not enough space)
}