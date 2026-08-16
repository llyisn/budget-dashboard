import React from 'react'

const GoalWidget = ({valueNow=0, valueMax=0}) => {

  const valueRatio = (valueNow / valueMax) > 1 ? 1 : (valueNow / valueMax)
  return (
    <div className='bg-(--widget-color) rounded-md
      row-span-2 col-span-3
      @container-size
      flex flex-col overflow-hidden'>
        {/* header */}
        <div className='px-[8cqw] pt-[5cqw]'>
            <p className='text-[12cqw]'>goals</p>
        </div>

        {/* list of goals */}
        <div className='flex-1 px-[8cqw] overflow-y-auto'>
            <div>
                {/* goal name + values */}
                <div className='flex justify-between text-[10cqh]'>
                    <p>Taiwan</p>
                    <p>${valueNow}/{valueMax}</p>
                </div>
                {/* progress bar */}
                <div className='h-[10cqh] w-full border-[1cqh] rounded-[1cqh]'>
                    <div 
                    className='bg-[#C09797] w-(--value-ratio) h-full
                   '

                    style={{'--value-ratio': `${valueRatio * 100}%`}}
                    >
                    </div>
                </div>
                {/* extra info */}
                <div className='flex justify-between text-[7cqh] text-gray-600'>
                    <p>${valueMax-valueNow < 0 ?  `${valueNow-valueMax} over` : `${valueMax-valueNow} left`}</p>
                    <p>due: Jun 2027</p>
                </div>

                
            </div>
        </div>
    </div>
  )
}

export default GoalWidget
