import React from 'react'

const StatWidget = ({variant="", label="", value="$0", delta=""}) => {
  if (variant === "detailed")
  return (
    <div className='bg-(--widget-color) rounded-md
    row-span-2 col-span-3 
    @container
    flex flex-col justify-center
    gap-1
    '>
      <div className='pl-[6cqw]'>
        <p className='text-[12cqw] leading-tight'>{label}</p>
        <p className='text-[16cqw] leading-tight'>{value}</p>
        <p className='text-[8cqw] leading-tight text-gray-400'>{delta}</p>
      </div>
    </div>
  )

  else if (variant === "compact")
    return (
      <div className='bg-(--widget-color) rounded-md
      row-span-1 col-span-2
      @container
      flex flex-col justify-center'>
        <div className='pl-[6cqw]'>
        <p className='text-[12cqw]'>{label}</p>
        <p className='text-[15cqw] leading-tight'>{value}</p>
        </div>
      </div>
    )

  else if (variant === "inline")
    return (
      <div className='bg-(--widget-color) rounded-md
      row-span-1 col-span-3
      @container
      flex justify-between items-center
      '>
        <p className='text-[10cqw] pl-[8cqw]'>{label}</p>
        <p className='text-[12cqw] pr-[8cqw]'>{value}</p>
      </div>
  )
}

export default StatWidget
