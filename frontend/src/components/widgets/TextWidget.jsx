import React from 'react'

const TextWidget = ({text=""}) => {
  return (
    <div className='bg-(--widget-color) rounded-md
      row-span-2 col-span-3
      @container
      flex items-center
      '>
        <div className='p-[10cqw]'>
            <p className='text-[10cqw]'>{text}</p>
        </div>
    </div>
  )
}

export default TextWidget
