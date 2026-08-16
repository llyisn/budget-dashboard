import React from 'react'

const ChecklistWidget = () => {
  return (
    <div className='bg-(--widget-color) rounded-md
      row-span-2 col-span-2 row-start-3
      @container
      '>
        <div className='text-[13cqw] p-[10cqw]'>
            <div className='flex items-center'>
                <input className='appearance-none peer' id='todo-1' type="checkbox" />

                <label htmlFor="todo-1"
                className="size-[10cqw] border border-gray-500 rounded-xs mr-[6cqw] cursor-pointer 
                after:content-['✓']
                after:text-[8cqw]
                after:scale-0
                grid place-items-center

                peer-checked:after:scale-100
                "
                />
                <label className='peer-checked:line-through' htmlFor="todo-1">order tv</label>
            </div>
        </div>

    </div>
  )
}

export default ChecklistWidget
