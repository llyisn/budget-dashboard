import React, { useLayoutEffect, useRef, useState } from 'react'

const TextWidget = ({ ref, gridStyle, text = "", onSettingsChange, isEditMode }) => {
  const [isEditing, setIsEditing] = useState(false)
  const editableRef = useRef(null)
  const clickPositionRef = useRef(null)

  function commitEdit() {
    setIsEditing(false)
    onSettingsChange({ text: editableRef.current?.textContent ?? "" })
  }

  function handleClick(e) {
    if (!isEditMode) return
    clickPositionRef.current = { x: e.clientX, y: e.clientY }
    setIsEditing(true)
  }

  //focus cursor on where user clicks when editing text
  useLayoutEffect(() => {
    if (!isEditing || !editableRef.current || !clickPositionRef.current) return
    
    const el = editableRef.current
    el.focus()

    const { x, y } = clickPositionRef.current
    let node = el.firstChild
    let offset = node ? node.length : 0 // default is end of text

    if (document.caretPositionFromPoint) {
      const pos = document.caretPositionFromPoint(x, y)
      if (pos && el.contains(pos.offsetNode)) {
        node = pos.offsetNode
        offset = pos.offset
      }
    } else if (document.caretRangeFromPoint) { //for safari
      const range = document.caretRangeFromPoint(x, y)
      if (range && el.contains(range.startContainer)) {
        node = range.startContainer
        offset = range.startOffset
      }
    }

    const selection = window.getSelection()
    const range = document.createRange()
    range.setStart(node, offset)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
  }, [isEditing])

  return (
    <div ref={ref} style={gridStyle} className='bg-(--widget-color) rounded-md px-5 py-7 overflow-hidden'>
      {isEditing ? (
        <div
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={commitEdit}
          className='size-full outline-none text-xs sm:text-md md:text-base lg:text-2xl xl:text-3xl'
        >
          {text}
        </div>
      ) : (
        <div onClick={handleClick}>
          <p className='text-xs sm:text-md md:text-base lg:text-2xl xl:text-3xl'>{text}</p>
        </div>
      )}
    </div>
  )
}

export default TextWidget