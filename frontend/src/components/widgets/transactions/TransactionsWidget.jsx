import React, { useContext } from 'react'
import useTransactions from '../../../hooks/useTransactions'
import { getDailyTotals } from '../../../utils/utils'
import TransactionRow from './transaction-list/TransactionRow'
import { ColorVarsContext } from '../../../context/context'

const TransactionsWidget = ({preview=false}) => {
  const colorVars = useContext(ColorVarsContext)

  const {transactions} = useTransactions(preview)
  //for displaying total sum of income/expense per day on date header
  const dailyTotals = useMemo(() => getDailyTotals(transactions), [transactions])

  //sort by date desc
  const sortedTransactions = transactions.toSorted((a,b) => b.date.localeCompare(a.date))

  return (
    <div 
    style={colorVars}
    className='bg-(--w-main) size-full rounded-md
      flex flex-col overflow-hidden
      border border-(--w-border)
      @container'>
        {/* header */}
        <div className='text-(--w-text-title) px-[6cqw] pt-[4cqw] flex justify-between items-center'>
            <p className='text-[10cqw]'>transactions</p>
            <p className='text-[9cqw]'>+</p>
        </div>
        {/* transactions mapping */}
        <div className='flex-1 px-[6cqw] overflow-y-auto'>
            {
              sortedTransactions.map((row, rowIndex) => {
                const isSameDay = rowIndex > 0 && row.date === sortedTransactions[rowIndex-1].date
                const isFirstDay = rowIndex === 0
                
                const totals = dailyTotals.get(row.date)

                return (
                  <div key={row.id}>
                      {!isSameDay &&
                        <div className={`flex gap-2 rounded-md text-[4cqw] ${isFirstDay ? '' : 'mt-4'}`}>
                          <time className='text-(--w-text-date)' dateTime={row.date}>{row.date}</time>
                          <span>|</span>
                                      
                          {totals?.income > 0 && (
                            <span className='text-[#A9B5A4]'>+{row.currency}{totals.income}</span>
                          )}
                          {totals?.expense > 0 && (
                            <span className='text-[#B7A0A0]'>-{row.currency}{totals.expense}</span>
                          )}
                        </div>
                      }
                            
                      <TransactionRow row={row} detailed={false} />
                       </div> 
                )
              })
            }
        </div>
            
        
    </div>
  )
}

export default TransactionsWidget
