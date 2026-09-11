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

// export function placeNewWidget({widgets, newWidget, x, y, maxColumns, maxRows}) {
//     const pos = clampPosition(x, y, newWidget.w, newWidget.h, maxColumns, maxRows)
//     const placed = {...newWidget, x: pos.x, y: pos.y}

//     return resolveCollisions({
//         widgets: [...widgets, placed],
//         draggedId: placed.id,
//         oldPosition: position, // same spot → no accidental "swap" branch, just pushes
//         maxColumns,
//         maxRows,
//         dragDeltaX: 0,
//         dragDeltaY: 0
//     })
// }