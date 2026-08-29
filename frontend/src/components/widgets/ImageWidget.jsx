import React from 'react'

const ImageWidget = ({ref, gridStyle}) => {
  return (
    <div 
    ref={ref}
    style={gridStyle}
    className='bg-(--widget-color) rounded-md
      flex justify-center items-center overflow-hidden'>
        <img className='min-h-full min-w-full shrink-0' src="" alt="" />
    </div>
  )
}

export default ImageWidget
