import React, { useState } from 'react'

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
              <div key={item.id} className='flex items-center'>
            
                <input onChange={() => toggleItem(item.id)} checked={item.checked} className='sr-only peer' id={`todo-${item.id}`} type="checkbox" />

                <label htmlFor={`todo-${item.id}`}
                className="size-[10cqw] border border-gray-500 rounded-xs mr-[6cqw] cursor-pointer 
                after:content-['✓']
                after:text-[8cqw]
                after:scale-0
                grid place-items-center

                peer-checked:after:scale-100
                "
                />
                <label className='peer-checked:line-through' htmlFor={`todo-${item.id}`}>{item.content}</label>
            </div>
            ))
          }
           
        </div>

    </div>
  )
}

export default ChecklistWidget

