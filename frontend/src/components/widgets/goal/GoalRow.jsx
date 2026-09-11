import React from 'react'

const GoalRow = ({name="", current=0, target=0, currency="", deadline}) => {
    //for progress bar
    const valueRatio = (current / target) > 1 ? 1 : (current / target)

  return (
    <div>
        {/* goal name + values */}
        <div className='flex justify-between text-[10cqh]'>
            <p>{name}</p>
            <p>{currency}{current}/{target}</p>
        </div>
        
        {/* progress bar */}
        <div className='h-[10cqh] w-full border-[1cqh] rounded-[1cqh]'>
            <div className='bg-[#C09797] w-(--value-ratio) h-full'
            style={{'--value-ratio': `${valueRatio * 100}%`}} />
        </div>

        {/* extra info */}
        <div className='flex justify-between text-[7cqh] text-gray-600 pb-3'>
            <p>${target-current < 0 ?  `${current-target} over` : `${target-current} left`}</p>
            <p>due: {deadline}</p>
        </div>
    </div>
  )
}

export default GoalRow
