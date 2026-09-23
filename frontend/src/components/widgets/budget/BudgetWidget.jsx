import React, { useContext, useRef, useState } from 'react'
import useTransactions from '../../../hooks/useTransactions'
import { countStat } from '../../../utils/transactionsUtils'
import { ColorVarsContext } from '../../../context/context'
import BudgetSettings from './BudgetSettings'
import { useBudgetContext } from '../../../context/BudgetContext'
import { useClickOutside } from '../../../hooks/useClickOutside'

const BudgetWidget = ({variant="", currency='$', preview=false, selectedBudgetId, onSettingsChange}) => {
  const colorVars = useContext(ColorVarsContext)

  const {transactions} = useTransactions(preview)
  const {budgets} = useBudgetContext()
  const selectedBudget = budgets.find(b => b.id === selectedBudgetId)

  const now = selectedBudget ? countStat(transactions, {category: selectedBudget.categories}, selectedBudget.period) : 0

  const max = selectedBudget?.limit ?? 0
  
  //for progress bar
  const valueRatio = max > 0
    ? Math.min(now / max, 1)
    : 0

  const displayMoney = formatMoneyDisplay()

  function formatMoneyDisplay() {
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

    // budget settings
    const [settings, setSettings] = useState(false)
    const settingsRef = useRef(null)
    useClickOutside(settingsRef, () => setSettings(false), settings)

   //3x1
    if (!selectedBudget) {
      return (
        <>
        <div 
    style={colorVars}
    className='bg-(--w-main) size-full rounded-md
      @container-size
      border border-(--w-border)
      flex flex-col
      relative'
    onClick={() => setSettings(prev => !prev)}
      > 
        <div className='flex-1 flex justify-between items-center px-[8cqw] mb-[-10cqh]'>
            <p className='text-[10cqw] text-(--w-text-label)'>select a budget</p>
            <p className='text-[11cqw] text-(--w-text-amount)'>0/0</p>
        </div>

        {/* progress bar */}
        <div className='h-1/4 w-full border-t rounded-b-md'/>
    </div>
        {settings && (
          <div ref={settingsRef}>
            <BudgetSettings selectedBudgetId={selectedBudgetId} onSelectBudget={id => onSettingsChange({selectedBudgetId: id})} />
          </div>
        )}
        </>

      )
    }

    if (variant === 'inline')
  return (
    <>
      <div 
    style={colorVars}
    className='bg-(--w-main) size-full rounded-md
      @container-size
      border border-(--w-border)
      flex flex-col
      relative'
    onClick={() => setSettings(prev => !prev)}
      > 
        <div className='flex-1 flex justify-between items-center px-[8cqw] mb-[-10cqh]'>
            <span className='text-[9cqw]'>{selectedBudget.icon}</span>
            <p className='text-[10cqw] text-(--w-text-label)'>{selectedBudget.name}</p>
            <p className='text-[11cqw] text-(--w-text-amount)'>{displayMoney}</p>
        </div>

        {/* progress bar */}
        <div className='h-1/4 w-full border-t rounded-b-md'>
            <div 
            className={`bg-(--w-bar) w-(--value-ratio) h-full rounded-bl-md
            ${valueRatio === 1 ? 'rounded-br-md' : ''}`}

            style={{'--value-ratio': `${valueRatio * 100}%`}}
            />
        
           
        </div>
    </div>

    {settings && (
          <div ref={settingsRef}>
            <BudgetSettings selectedBudgetId={selectedBudgetId} onSelectBudget={id => onSettingsChange({selectedBudgetId: id})} />
          </div>
        )}
    </>
    
    
  )
}

export default BudgetWidget
