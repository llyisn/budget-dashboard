import React, { useContext } from 'react'
import useTransactions from '../../../hooks/useTransactions'
import { countStat } from '../../../utils/transactionsUtils'
import { ColorVarsContext } from '../../../context/context'

const BudgetWidget = ({variant="", currency='$', max=0, preview=false}) => {
  const colorVars = useContext(ColorVarsContext)

  const {transactions} = useTransactions(preview)
  const now = countStat(transactions, 'expense', 'month') + countStat(transactions, 'savings', 'month')
  
  //for progress bar
  const valueRatio = (now / max) > 1 ? 1 : (now / max)

  const displayMoney = formatMoneyDisplay()

    function formatMoneyDisplay(type) {
      let formattedNow = now
      let formattedMax = max
      if (now >= 1000) {
        formattedNow = ( now / 1000).toFixed(1) + 'k'
      }
      if (max >= 1000) {
        formattedMax = ( max / 1000).toFixed(1) + 'k'
      }
      return `${currency}${formattedNow}/${formattedMax}`
    }
   //3x1
    if (variant === 'inline')
  return (
    <div 
    style={colorVars}
    className='bg-(--w-main) size-full rounded-md
      @container-size
      flex flex-col'> 
        <div className='flex-1 flex justify-between items-center px-[8cqw] mb-[-10cqh]'>
            <p className='text-[10cqw] text-(--w-text-label)'>budget</p>
            <p className='text-[11cqw] text-(--w-text-amount)'>{displayMoney}</p>
        </div>

        {/* progress bar */}
        <div className='h-1/4 w-full border-t rounded-b-md'>
            <div 
            className={`bg-(--w-bar) w-(--value-ratio) h-full rounded-bl-md
            ${valueRatio === 1 ? 'rounded-br-md' : ''}`}

            style={{'--value-ratio': `${valueRatio * 100}%`}}
            >
            </div>
        </div>
    </div>
    
  )
}

export default BudgetWidget
