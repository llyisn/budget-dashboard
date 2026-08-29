import React from 'react'

const StatWidget = ({ref, gridStyle, variant="", label="", value="$0", delta=""}) => {
  //3x2
  if (variant === "detailed")
  return (
    <div 
    ref={ref}
    style={gridStyle}
    className='bg-(--widget-color) rounded-md
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

  //2x1
  else if (variant === "compact")
    return (
      <div
      ref={ref}
      style={gridStyle}
      className='bg-(--widget-color) rounded-md
      @container
      flex flex-col justify-center'>
        <div className='pl-[6cqw]'>
        <p className='text-[12cqw]'>{label}</p>
        <p className='text-[15cqw] leading-tight'>{value}</p>
        </div>
      </div>
    )

    //3x1
  else if (variant === "inline")
    return (
      <div 
      ref={ref}
      style={gridStyle}
      className='bg-(--widget-color) rounded-md
      @container
      flex justify-between items-center
      '>
        <p className='text-[10cqw] pl-[8cqw]'>{label}</p>
        <p className='text-[12cqw] pr-[8cqw]'>{value}</p>
      </div>
  )
}

export default StatWidget
