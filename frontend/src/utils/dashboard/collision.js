import { insideGrid, overlaps } from "./grid"


// return every widget that overlaps with the given widget
function collidingWidgets(widget, widgets) {
  return widgets.filter(other => other.id !== widget.id && overlaps(widget, other))
}

//try to move the widget out of the way in given direction. if moving causes other widgets to collide, push those too. if anything makes the whole chain impossible, return null
function attemptPush(widgets, moverId, axis, sign, causeRect, maxColumns, maxRows, immovableIds, visited) {
    //draggedId is effectively immovable while resolving collisions
    //prevent infinite recursion
  if (immovableIds.has(moverId) || visited.has(moverId)) return null

  const mover = widgets.find(w => w.id === moverId)
  if (!mover) return null

  const next = { ...mover }
  if (axis === 'x') {
    next.x = sign > 0 ? causeRect.x + causeRect.w : causeRect.x - mover.w
  } else {
    next.y = sign > 0 ? causeRect.y + causeRect.h : causeRect.y - mover.h
  }

  if (!insideGrid(next, maxColumns, maxRows)) return null

  const nextVisited = new Set(visited)
  nextVisited.add(moverId)

  let working = widgets.map(w => (w.id === moverId ? next : w))

  const newCollisions = collidingWidgets(next, working)

  // Can never push something into the dragged widget itself.
  if (newCollisions.some(c => immovableIds.has(c.id))) return null

  for (const collision of newCollisions) {
    if (nextVisited.has(collision.id)) return null // cycle guard

    const result = attemptPush(working, collision.id, axis, sign, next, maxColumns, maxRows, immovableIds, nextVisited)
    if (!result) return null

    working = result
  }

  return working
}
//prefer pushing widgets in the directiob the user dragged
function getDirectionOrder(dx, dy) {
  if (Math.abs(dx) >= Math.abs(dy) && dx !== 0) {
    const s = Math.sign(dx)
    return [
        //right/left  > down > up
      { axis: 'x', sign: s }, { axis: 'x', sign: -s },
      { axis: 'y', sign: 1 }, { axis: 'y', sign: -1 }
    ]
  }
  if (dy !== 0) {
    const s = Math.sign(dy)
    return [
        //down/up > right > left
      { axis: 'y', sign: s }, { axis: 'y', sign: -s },
      { axis: 'x', sign: 1 }, { axis: 'x', sign: -1 }
    ]
  }
  return [
    //right > left > down > up
    { axis: 'x', sign: 1 }, { axis: 'x', sign: -1 },
    { axis: 'y', sign: 1 }, { axis: 'y', sign: -1 }
  ]
}

export function resolveCollisions({ widgets, draggedId, oldPosition, maxColumns, maxRows, dragDeltaX, dragDeltaY }) {
  const base = widgets.map(w => ({ ...w }))
  const dragged = base.find(w => w.id === draggedId)
  if (!dragged) return base

  const fixedIds = new Set([draggedId])
  const initialCollisions = collidingWidgets(dragged, base)

  //nothing overlaps
  if (initialCollisions.length === 0) return base

  // same-size swap.
  if (
    oldPosition && 
    initialCollisions.length === 1 &&
    initialCollisions[0].w === dragged.w &&
    initialCollisions[0].h === dragged.h &&
    !overlaps(dragged, {w: dragged.w, h: dragged.h, x: oldPosition.x, y: oldPosition.y})
  ) {
    const other = initialCollisions[0]
    other.x = oldPosition.x
    other.y = oldPosition.y
    return base
  }

  const directions = getDirectionOrder(dragDeltaX, dragDeltaY)

  for (const dir of directions) {
    let working = base.map(w => ({ ...w }))
    const workingDragged = working.find(w => w.id === draggedId)
    let success = true

    // recompute collisions against the current working state each time,
    // since an earlier push in this same direction attempt may already
    // have cleared a later one
    let collisions = collidingWidgets(workingDragged, working)

    while (collisions.length > 0) {
      const target = collisions[0]
      const result = attemptPush(working, target.id, dir.axis, dir.sign, workingDragged, maxColumns, maxRows, fixedIds, new Set())

      if (!result) {
        success = false
        break
      }

      working = result
      collisions = collidingWidgets(workingDragged, working)
    }

    if (success) return working
  }

  // no direction could resolve it cleanly — snap back 
  if (oldPosition) {
    dragged.x = oldPosition.x
    dragged.y = oldPosition.y
    return base
  }
  return null
}