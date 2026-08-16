import React from 'react'

const BudgetWidget = ({variant="", valueNow=0, valueMax=0}) => {

    const valueRatio = (valueNow / valueMax) > 1 ? 1 : (valueNow / valueMax)
    if (variant === 'inline')
  return (
    <div className='bg-(--widget-color) rounded-md
      row-span-1 
      col-span-3
      row-start-2
      @container-size
      flex flex-col'> 
    {/* row-start is temporary */}
        <div className='flex-1 flex justify-between items-center px-[8cqw] mb-[-10cqh]'>
            <p className='text-[10cqw]'>budget</p>
            <p className='text-[12cqw]'>${valueNow}k/{valueMax}k</p>
        </div>

        {/* progress bar */}
        <div className='h-1/4 w-full border-t rounded-b-md'>
            <div 
            className={`bg-[#CEA3B8] w-(--value-ratio) h-full rounded-bl-md
            ${valueRatio === 1 ? 'rounded-br-md' : ''}`}

            style={{'--value-ratio': `${valueRatio * 100}%`}}
            >
            </div>
        </div>
    </div>
    
  )

  else if (variant === 'detailed')
    return (
        <div className='bg-(--widget-color) rounded-md
        row-span-2 col-span-4'>
            {/* tbd */}
        </div>
    )
}

export default BudgetWidget
