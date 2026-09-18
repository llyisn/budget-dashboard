import React, { useContext, useLayoutEffect, useRef, useState } from 'react'
import { ColorVarsContext } from '../../context/context'

const TextWidget = ({ text = "", onSettingsChange, isEditMode }) => {
  const colorVars = useContext(ColorVarsContext)
  
  const [isEditing, setIsEditing] = useState(false)
  const editableRef = useRef(null)
  const clickPositionRef = useRef(null)

  function commitEdit() {
    setIsEditing(false)
    const value = editableRef.current?.textContent ?? ""
    onSettingsChange({ text: value.replace(/\u200B/g, '') })
  }

  function handleClick(e) {
    if (!isEditMode) return
    clickPositionRef.current = { x: e.clientX, y: e.clientY }
    setIsEditing(true)
  }

  //focus cursor on where user clicks when editing text
  useLayoutEffect(() => {
    if (!isEditing || !editableRef.current) return
    
    const el = editableRef.current
    el.focus()
    

    const selection = window.getSelection()
    const range = document.createRange()

    if (!el.textContent) {
      range.setStart(el,0)
      range.collapse(true)
      selection.removeAllRanges()
      selection.addRange(range)

      clickPositionRef.current = null
      return
    }

    if (!clickPositionRef.current) return

    const { x, y } = clickPositionRef.current
    let node = el.firstChild
    let offset = node.length // default is end of text

    if (document.caretPositionFromPoint) {
      const pos = document.caretPositionFromPoint(x, y)
      if (pos && el.contains(pos.offsetNode)) {
        node = pos.offsetNode
        offset = pos.offset
      }
    } else if (document.caretRangeFromPoint) { //for safari
      const rangeFromPoint = document.caretRangeFromPoint(x, y)
      if (rangeFromPoint && el.contains(rangeFromPoint.startContainer)) {
        node = rangeFromPoint.startContainer
        offset = rangeFromPoint.startOffset
      }
    }


    range.setStart(node, offset)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
  }, [isEditing])

  return (
    <div 
    style={colorVars}
    className='bg-(--w-main)
    border border-(--w-border)
    text-(--w-text)
    size-full rounded-md overflow-hidden @container p-2 md:p-5 '>
      {isEditing ? (
        <div
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={commitEdit}
          className='size-full outline-none text-[12cqw]'
        >
          {text}
        </div>
      ) : (
        <div onClick={handleClick} 
        data-drag-ignore
        className='min-h-full'>
          <p className='text-[12cqw]'>{text}</p>
        </div>
      )}
    </div>
  )
}

export default TextWidget