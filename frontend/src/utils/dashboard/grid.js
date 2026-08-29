export function insideGrid(widget, maxColumns, maxRows) {
  return (
    widget.x >= 1 &&
    widget.y >= 1 &&
    widget.x + widget.w - 1 <= maxColumns &&
    widget.y + widget.h - 1 <= maxRows
  )
}

export function clampPosition(x, y, w, h, maxColumns, maxRows) {
  return {
    x: Math.min(Math.max(1, x), maxColumns - w + 1),
    y: Math.min(Math.max(1, y), maxRows - h + 1)
  }
}

export function dragTransformToGridDelta({
    transformX,
    transformY,
    cellSize,
    gapSize
    }) {
    const trackSize = cellSize + gapSize

    return {
        x: Math.round(transformX / trackSize),
        y: Math.round(transformY / trackSize)
    }
}