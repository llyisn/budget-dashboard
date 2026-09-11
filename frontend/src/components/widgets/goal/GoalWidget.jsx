import React, { useState } from 'react'
import GoalRow from './GoalRow'
import useSavings from '../../../hooks/useSavings'
import { ChevronDown } from 'lucide-react'

//maximum goals displayed in the widget
const MAX_GOALS = 1

//savings that have an end goal amount
const GoalWidget = ({ref, gridStyle}) => {
  const {goals} = useSavings()
  const slicedGoals = goals.slice(0, MAX_GOALS)

  const [selectedValue, setSelectedValue] = useState('category')
  


  return (
    <div 
    ref={ref}
    style={gridStyle}
    className='bg-(--widget-color) rounded-md
      @container-size
      flex flex-col overflow-hidden'>
        {/* header */}
        <div className='flex justify-between items-center px-[8cqw] pt-[5cqw]'>
            <p className='text-[12cqw]'>goals</p>
            
            {/* select */}
            <div className='relative inline-block'>
                <select className="h-5 pl-2 pr-5 text-[5cqw] appearance-none border rounded 
            " 
            value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
                <option value="category">amount</option>
                <option value="transactions">deadline</option>
            </select>
            <ChevronDown size={12} className='absolute right-1.5 top-1/2 -translate-y-1/3 pointer-events-none'/>
            </div>
        </div>

        {/* list of goals */}
        <div className='flex-1 px-[8cqw] overflow-y-auto'>
          {
            slicedGoals.map(goal => 
              <GoalRow key={goal.id} name={goal.name} current={goal.current_amount} target={goal.target_amount} currency={goal.currency} deadline={goal.deadline} />
            )
          }
        </div>
    </div>
  )
}

export default GoalWidget
