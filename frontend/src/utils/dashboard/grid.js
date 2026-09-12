import { normalizeModuleId } from "vite/module-runner"

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

export function overlaps(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  )
}


export function findNearestFreeCell(widgets, widget, maxColumns, maxRows, originX, originY) {
  const fits = (x,y) => {
    const candidate = { ...widget, x, y}
    if (!insideGrid(candidate, maxColumns, maxRows)) return false

    return !widgets.some(other => overlaps(candidate, other))
  }

    const maxRadius = Math.max(maxColumns, maxRows)
    for (let radius = 0; radius <= maxRadius; radius++) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= array.length; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== radius) continue //check only outer ring
          const x = originX + dx
          const y = originY + dy
          if (x < 1 || y < 1) continue 
          if (fits(x,y)) return {x,y}
        }
      }
    }
  return null
}