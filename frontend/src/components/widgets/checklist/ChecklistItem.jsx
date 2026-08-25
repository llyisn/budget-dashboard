import React from 'react'

const ChecklistItem = ({id, content, checked, onToggle, isLineThrough=true}) => {
    
  return (
    <div className='flex items-center'>
            
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
                <label className={isLineThrough ? 'peer-checked:line-through' : ''} htmlFor={`todo-${id}`}>{content}</label>
            </div>
  )
}

export default ChecklistItem
