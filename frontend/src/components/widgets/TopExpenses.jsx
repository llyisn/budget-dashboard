import React, { useLayoutEffect, useRef, useState } from 'react'
import ExpenseBar from '../ExpenseBar'
import { ChevronDown } from 'lucide-react'

const CHART_COLORS = ['#CEA3A3', '#CEA3B8', '#A3B2CE']

// Minimum space required for a label to fit comfortably inside the bar: 12 px (from 'pr-3' in bar <div>) 
// + another 12 px as visual breathing room. 
const LABEL_MIN_HORIZONTAL_SPACE = 12 * 2

/**
 * Displays expense data as proportional horizontal bars.
 * Each bar receives a color from CHART_COLORS. Labels are rendered inside bars if there is enough space, otherwise outside.
 * @param {Record<string, number>} props.data - mapping of category names to spending amounts.
 */
const TopExpenses = ({data = {}}) => {
    const dataSum = Object.values(data).reduce((sum, val) => sum + val, 0)
    const sortedData = Object.entries(data).sort(sortByValueDesc)
    
    const rowsRef = useRef(new Map())
    const [overflowingKeys, setOverflowingKeys] = useState(null)


    function registerRowElem(key, type, node) {
    const existing = rowsRef.current.get(key) || {}
    
    rowsRef.current.set(key, {
        ...existing,
        [type]: node
    })
}

    useLayoutEffect(() => {
        let overflow = new Set()
        rowsRef.current.forEach((value, key, map) => {
            if (value.label.scrollWidth + LABEL_MIN_HORIZONTAL_SPACE > value.bar.clientWidth) {
                overflow.add(key)
            } 
        })
        setOverflowingKeys(overflow)
    }, [])

  return (
    <div className='bg-(--widget-color) rounded-md
      row-span-2 col-span-4
      @container'>
        {/* header and btn */}
      <div className='flex justify-between items-center px-[6cqw] py-[2cqw]'>
        <p className='text-[10cqw]'>top expenses</p>
        
        {/* select */}
        <div className='relative inline-block'>
            <select className="h-5 pr-5 px-2 text-[4cqw] appearance-none border rounded 
        " name="" id="">
            <option value="category">category</option>
            <option value="transactions">transactions</option>
        </select>
        <ChevronDown size={12} className='absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none'/>
        </div>
        
        
      </div>

        {/* horizontal bar chart */}
      <div>
        {
            sortedData.map(([key, val], index) => {
                const barColor = CHART_COLORS[index % CHART_COLORS.length]
                return (
                        <ExpenseBar key={key} categoryKey={key} value={val} ratio={val / dataSum} color={barColor} isLabelOverflowing={overflowingKeys?.has(key)} onRefsReady={registerRowElem} />
                    )
            }
            )
        }
      </div>
    </div>
  )
}

export default TopExpenses

function sortByValueDesc(a, b) {
    return b[1] - a[1]
}