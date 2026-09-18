import React, { useContext } from 'react'
import useTransactions from '../../../hooks/useTransactions'
import { countStat } from '../../../utils/transactionsUtils'
import { ColorVarsContext } from '../../../context/context'

const StatWidget = ({variant="", label="", currency="$", preview=false}) => {
  const colorVars = useContext(ColorVarsContext)

  const {transactions} = useTransactions(preview)
  const amount = countStat(transactions, label)
  const delta = 0
  
  //to do: period button

  //3x2
  if (variant === "detailed")
  return (
    <div 
   style={colorVars}
    className='bg-(--w-main) size-full rounded-md
    @container
    flex flex-col justify-center
    gap-1
    '>
      <div className='pl-[6cqw]'>
        <p className='text-[12cqw] text-(--w-label) leading-tight'>{label}</p>
        <p className='text-[16cqw] text-(--w-text-amount) leading-tight'>{currency}{amount}</p>
        <p className='text-[8cqw] text-(--w-text-add-info) leading-tigh'>{delta} last month</p>
      </div>
    </div>
  )

  //2x1
  else if (variant === "compact")
    return (
      <div
      style={colorVars}
      className='bg-(--w-main) size-full rounded-md
      @container
      flex flex-col justify-center'>
        <div className='pl-[6cqw]'>
        <p className='text-[12cqw] text-(--w-label)'>{label}</p>
        <p className='text-[15cqw] text-(--w-text-amount) leading-tight'>{currency}{amount}</p>
        </div>
      </div>
    )

    //3x1
  else if (variant === "inline")
    return (
      <div 
      style={colorVars}
      className='bg-(--w-main)  size-full  rounded-md
      @container
      flex justify-between items-center
      '>
        <p className='text-[10cqw] text-(--w-label) pl-[8cqw]'>{label}</p>
        <p className='text-[12cqw] text-(--w-text-amount) pr-[8cqw]'>{currency}{amount}</p>
      </div>
  )
}

export default StatWidget
