import React from 'react'

const ImageWidget = () => {
  return (
    <div className='bg-(--widget-color) rounded-md
      row-span-4 col-span-4
      row-start-3
      flex justify-center items-center overflow-hidden'>
        <img className='min-h-full min-w-full shrink-0' src="" alt="" />
    </div>
  )
}

export default ImageWidget
