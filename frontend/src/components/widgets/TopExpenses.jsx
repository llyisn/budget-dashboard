import React, { useContext, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ExpenseBar from '../ExpenseBar'
import { ChevronDown } from 'lucide-react'
import useTransactions from '../../hooks/useTransactions'
import { filteredTransactions } from '../../utils/transactionsUtils'
import { ColorVarsContext } from '../../context/context'

const CHART_COLORS = ['#CEA3A3', '#CEA3B8', '#A3B2CE']
//maximum bars displayed in the widget
const MAX_BARS = 3

// Minimum space required for a label to fit comfortably inside the bar: 12 px (from 'pr-3' in bar <div>) 
// + another 12 px as visual breathing room. 
const LABEL_MIN_HORIZONTAL_SPACE = 12 * 2

/**
 * Displays expense data (for current month) as proportional horizontal bars.
 * Each bar receives a color from CHART_COLORS. Labels are rendered inside bars if there is enough space, otherwise outside.
 */
const TopExpenses = ({preview=false}) => {
  const colorVars = useContext(ColorVarsContext)

  const [selectedValue, setSelectedValue] = useState('category')

  const {transactions} = useTransactions(preview)
  const expenses = useMemo(() => filteredTransactions(transactions, 'expense', 'month'), [transactions]) 
  const topExpenses = useMemo(() => getTopExpenses(expenses, selectedValue), [expenses, selectedValue]) 
  const sortedTopExpenses = useMemo(() => [...topExpenses.entries()].sort(sortByValueDesc).slice(0, MAX_BARS), [topExpenses]) 

  const total = getTotal(sortedTopExpenses)
    
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
        rowsRef.current.forEach((value, key) => {
            if (value?.label?.scrollWidth + LABEL_MIN_HORIZONTAL_SPACE > value?.bar?.clientWidth) {
                overflow.add(key)
            } 
        })

        setOverflowingKeys(overflow)
    }, [sortedTopExpenses])

  return (
    <div 
    style={colorVars}
    className='bg-(--w-main) size-full rounded-md
    border border-(--w-border)
      @container'>
        {/* header and btn */}
      <div className='flex justify-between items-center px-[6cqw] py-[2cqw]'>
        <p className='text-[10cqw] text-(--w-text-title)'>top expenses</p>
        
        {/* select */}
        <div className='relative inline-block'>
            <select className="h-5 px-2 text-[4cqw] appearance-none border border-(--w-border) rounded bg-(--w-buttons)
        " 
        value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
            <option value="category">category</option>
            <option value="transactions">transactions</option>
        </select>
        <ChevronDown size={12} className='absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none'/>
        </div>
        
        
      </div>

        {/* horizontal bar chart */}
      <div>
        {
            sortedTopExpenses.map(([key, val], index) => {
                const barColor = CHART_COLORS[index % CHART_COLORS.length]
                return (
                        <ExpenseBar key={key} categoryKey={key} value={val} ratio={val / total} color={barColor} isLabelOverflowing={overflowingKeys?.has(key)} onRefsReady={registerRowElem} />
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

function getTopExpenses(expenses=[], by='category') {
   const top = new Map()

    if (by === 'transactions') {
      const sorted = expenses.toSorted((a, b) => b.amount - a.amount)

      for (const expense of sorted) {
        if (top.has(expense.label) && top.get(expense.label) > expense.amount) continue
        
        top.set(expense.label, expense.amount)
      }
    }

    else if (by === 'category') {
      expenses.map(expense => {
        if (!top.has(expense[by])) {
          top.set(expense[by], 0)
        }
        const acc = top.get(expense[by])
        top.set(expense[by], acc + expense.amount)
      })
    }
   
    return top
  }

  function getTotal(expenses) {
    let total = 0
    for (const expense of expenses) {
      total += expense[1]
    }
    return total
  }