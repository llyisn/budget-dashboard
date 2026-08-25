import React, { useState } from 'react'
import ChecklistItem from './ChecklistItem'

const ChecklistWidget = ({data = []}) => {
  const [list, setList] = useState(data)

  function toggleItem(id) {
    const newList = list.map((item) => {
      if (item.id === id) {
        const newItem = {...item, checked: !item.checked}
        return newItem
      }
      else return item
    })

    setList(newList)
  }

  return (
    <div className='bg-(--widget-color) rounded-md
      row-span-2 col-span-2 row-start-3
      @container
      '>
        <div className='text-[13cqw] p-[10cqw]'>
          {
            list.map((item) => (
              <ChecklistItem key={item.id} id={item.id} content={item.content} checked={item.checked} onToggle={toggleItem}/>
            ))
          }
           
        </div>

    </div>
  )
}

export default ChecklistWidget

