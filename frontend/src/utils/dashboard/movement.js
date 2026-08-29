import { resolveCollisions } from "./collision"
import { clampPosition } from "./grid"


export function moveWidget({widgets, widgetId, x, y, maxColumns, maxRows, dragDeltaX, dragDeltaY}) {
    const dragged = widgets.find(w => w.id === widgetId)
    if (!dragged) return widgets
    const position = clampPosition(x, y, dragged.w, dragged.h, maxColumns, maxRows)

    const oldPosition = {
        x: dragged.x,
        y: dragged.y
    }

    const movedWidgets = widgets.map(widget =>
        widget.id === widgetId
        ? { ...widget, x: position.x, y: position.y} 
        : widget
    )

    return resolveCollisions({
        widgets: movedWidgets,
        draggedId: widgetId,
        oldPosition,
        maxColumns,
        maxRows,
        dragDeltaX,
        dragDeltaY
    })
}