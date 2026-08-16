import React from 'react'

const CHART_COLORS = ['#CEA3A3', '#CEA3B8', '#A3B2CE']
const THRESHOLD = 0.15

const TopExpenses = ({data = {}}) => {
    const dataSum = Object.values(data).reduce((sum, val) => sum + val, 0)

  return (
    <div className='bg-(--widget-color) rounded-md
      row-span-2 col-span-4
      @container'>
        {/* header and btn */}
      <div className='flex justify-between items-center px-[6cqw] py-[2cqw]'>
        <p className='text-[10cqw]'>top expenses</p>
        <select className="h-5 px-2 text-[4cqw] appearance-none border rounded" name="" id="">
            <option value="">category</option>
            <option value="">transactions</option>
        </select>
      </div>

        {/* horizontal bar chart */}
      <div>
        {/* single cat */}
        {
            Object.entries(data).map(([key, val], index) => {
                const ratio = val / dataSum
                const barColor = CHART_COLORS[index % CHART_COLORS.length]
                const isSmall = ratio < THRESHOLD

                if (isSmall) {
                    return (
                        <div key={key} className='flex text-[5cqw] px-[6cqw] mb-px'>
                        <div className='w-(--ratio) pr-3 h-[6cqw] flex items-center justify-end'
                        style={{'--ratio': `${ratio * 100}%`, 
                        backgroundColor: barColor}} />
                        <p className='pl-3'>{key}</p>
                        <p className='pl-3'>${val}</p>
                    </div>
                    )
                }
                else {
                return (
                    <div key={key} className='flex text-[5cqw] px-[6cqw] mb-px'>
                        <div className='w-(--ratio) pr-3 h-[6cqw] flex items-center justify-end'
                        style={{'--ratio': `${ratio * 100}%`, 
                        backgroundColor: barColor}}>
                            <p>{key}</p>
                        </div>
                        <p className='pl-3'>${val}</p>
                    </div>
                )
            }
            })
        }
      </div>
    </div>
  )
}

export default TopExpenses
