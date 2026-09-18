import React, { useContext, useLayoutEffect, useRef, useState } from 'react'
import ChecklistItem from './ChecklistItem'
import { ColorVarsContext } from '../../../context/context'

const ChecklistWidget = ({data = [], isEditMode}) => {
  const colorVars = useContext(ColorVarsContext)
  
  //item: { id: string, content: string, checked: boolean }
  const [items, setItems] = useState(data) //list of todos (checklist items)
  const [editingId, setEditingId] = useState(null) //which item is currently being edited
  const [caretRequest, setCaretRequest] = useState(null) //info where caret should go in the item

  function requestEdit(id, request) {
    setEditingId(id)
    setCaretRequest(request)
  }

  //save changes made to the checklist
  function commit(id, text) {
    setItems(list => list.map(it => it.id === id ? { ...it, content: text } : it))
  }

  function splitItem(id, before, after) {
    if (items.length >= 4) return

    const newId = crypto.randomUUID()

    setItems(list => {
      const i = list.findIndex(item => item.id === id)
      const currentItem = list[i]

      const newList = [...list]
      newList[i] = {...currentItem, content: before}
      newList.splice(i+1, 0, {id: newId, content: after, checked: false})

      return newList
    })

    setEditingId(newId)
    setCaretRequest({
      type: 'offset',
      value: 0
    })
  }

function mergeUp(id, text) {
  const index = items.findIndex(item => item.id === id)
  if (index <= 0) return // nothing above to merge into

  const prevItem = items[index - 1]
  const caretOffset = prevItem.content.length

  setItems(list => {
    const i = list.findIndex(item => item.id === id)
    if (i <= 0) return list
    const newList = [...list]
    newList[i - 1] = { ...newList[i - 1], content: newList[i - 1].content + text }
    newList.splice(i, 1)
    return newList
  })

  setEditingId(prevItem.id)
  setCaretRequest({ type: 'offset', value: caretOffset })
}

//set 'checked' of the item to true or false
  function toggleItem(id) {
    const newList = items.map((item) => {
      if (item.id === id) {
        const newItem = {...item, checked: !item.checked}
        return newItem
      }
      else return item
    })

    setItems(newList)
  }

  return (
    <div
    style={colorVars}
    className='bg-(--w-main)
    border border-(--w-border) 
    size-full rounded-md
      @container overflow-scroll
      '>
          <div className='text-(--w-text) text-[13cqw] p-[10cqw] '>
            {
              items.map((item) => (
                <ChecklistItem 
                key={item.id} 
                id={item.id} 
                isEditMode={isEditMode}
                content={item.content} 
                checked={item.checked} 
                onToggle={toggleItem}
                caretRequest={editingId === item.id ? caretRequest : null}
                onCommit={commit}
                onMergeUp={mergeUp}
                isEditing={editingId === item.id}
                onRequestEdit={requestEdit}
                onSplitItem={splitItem}/>
              ))
            }
          </div>
    </div>
  )
}

export default ChecklistWidget

