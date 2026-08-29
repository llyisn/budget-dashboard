import React from 'react'

const TextWidget = ({ref, gridStyle, text=""}) => {
  return (
    <div 
    ref={ref}
    style={gridStyle}
    className='bg-(--widget-color) rounded-md
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
