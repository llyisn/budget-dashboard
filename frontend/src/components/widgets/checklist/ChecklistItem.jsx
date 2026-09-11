import React, { useLayoutEffect, useRef, useState } from 'react'

const ChecklistItem = ({id, content, checked, onToggle,
  isEditMode,
  isEditing, //is current item being edited
  caretRequest,
  onRequestEdit,
  onCommit,
  onMergeUp,
  onSplitItem
}) => {
  const editableRef = useRef(null)

  useLayoutEffect(() => {
    if (!isEditing || !editableRef.current || !caretRequest) return
    const el = editableRef.current
    el.focus()
    placeCaret(el, caretRequest)
  }, [isEditing, caretRequest])

function placeCaret(el, request) {
  const selection = window.getSelection() //Selection object representing current caret position (or selected text)
  const range = document.createRange()

  //put the caret where user clicked
  if (request?.type === 'point') {
    // Chrome / Firefox
    if (document.caretPositionFromPoint) {
      const pos = document.caretPositionFromPoint(request.x, request.y)

      if (pos && el.contains(pos.offsetNode)) {
        range.setStart(pos.offsetNode, pos.offset)
        range.collapse(true) //collapse range to one endpoint (start)

        selection.removeAllRanges()
        selection.addRange(range)
        return
      }
    }

    // Safari
    if (document.caretRangeFromPoint) {
      const rangeFromPoint = document.caretRangeFromPoint(request.x, request.y)

      if (
        rangeFromPoint &&
        el.contains(rangeFromPoint.startContainer)
      ) {
        selection.removeAllRanges()
        selection.addRange(rangeFromPoint)
        return
      }
    }
  }

  //for merging items
  if (request?.type === 'offset' && el.firstChild) {
    const offset = Math.min(
      request.value,
      el.firstChild.length
    )

    range.setStart(el.firstChild, offset)
    range.collapse(true)

    selection.removeAllRanges()
    selection.addRange(range)
    return
  }

  // fallback = end of text for new empty items (with content = '')
  range.selectNodeContents(el)
  range.collapse(false) //collapse toward end

  selection.removeAllRanges()
  selection.addRange(range)
}

  const commit = () => onCommit(id, editableRef.current?.textContent ?? '')

  function handleBlur() {
  commit()
}

  const textRef = useRef(null)

function handleClick(e) {
  if (!isEditMode) return

  const textEl = textRef.current
  if (!textEl || !content) {
    onRequestEdit(id, { type: 'offset', value: 0 })
    return
  }

  const rect = textEl.getBoundingClientRect()
  if (e.clientX >= rect.right) {
    onRequestEdit(id, { type: 'offset', value: content.length })
  } else if (e.clientX <= rect.left) {
    onRequestEdit(id, { type: 'offset', value: 0 })
  } else {
    onRequestEdit(id, { type: 'point', x: e.clientX, y: e.clientY })
  }
}


  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault() //prevent browser behaviour of adding /n

      const selection = window.getSelection()
      if (!selection || !selection.isCollapsed) return 
      const caretOffset = selection.anchorOffset
      const text = editableRef.current?.textContent ?? ''

      const before = text.slice(0, caretOffset)
      const after = text.slice(caretOffset)
      
      onSplitItem(id, before, after)
      return
    }
    if (e.key === 'Backspace') {
      const sel = window.getSelection()
      if (!sel || !sel.isCollapsed || sel.anchorOffset !== 0) return
      e.preventDefault()
      onMergeUp(id, editableRef.current?.textContent ?? '')
    }
  }


  return (
    <div className='flex items-baseline'>
        <input onChange={() => onToggle(id)} checked={checked} className='sr-only peer' id={`todo-${id}`} type="checkbox" />
        
        
        <label htmlFor={`todo-${id}`}
                className={`size-3 border border-gray-500 rounded-xs mr-2 cursor-pointer 
                after:content-['✓']
                after:text-xs
                after:scale-0
                grid place-items-center

                peer-checked:after:scale-100
                `}
        />
        {isEditing ? (
          <div ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`flex-1 min-w-0 wrap-break-word outline-none ${checked ? 'line-through' : ''}`}>
            {content}
          </div>
        ) : (
          <div className={`flex-1 min-w-0 wrap-break-word ${checked ? 'line-through' : ''}`} 
          onClick={handleClick}
          >
            <p ref={textRef}>{content}</p>
          </div>
        )
      }     
    </div>
  )
}

export default ChecklistItem
