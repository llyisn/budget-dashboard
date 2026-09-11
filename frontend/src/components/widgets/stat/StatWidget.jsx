import React from 'react'
import useTransactions from '../../../hooks/useTransactions'
import { countStat } from '../../../utils/transactionsUtils'

const StatWidget = ({ref, gridStyle, variant="", label="", currency="$", preview=false}) => {

  const {transactions} = useTransactions(preview)
  const amount = countStat(transactions, label)
  const delta = 0
  
  //to do: period button

  //3x2
  if (variant === "detailed")
  return (
    <div 
    ref={ref}
    style={gridStyle}
    className='bg-(--widget-color) rounded-md
    @container
    flex flex-col justify-center
    gap-1
    '>
      <div className='pl-[6cqw]'>
        <p className='text-[12cqw] leading-tight'>{label}</p>
        <p className='text-[16cqw] leading-tight'>{currency}{amount}</p>
        <p className='text-[8cqw] leading-tight text-gray-400'>{delta} last month</p>
      </div>
    </div>
  )

  //2x1
  else if (variant === "compact")
    return (
      <div
      ref={ref}
      style={gridStyle}
      className='bg-(--widget-color) rounded-md
      @container
      flex flex-col justify-center'>
        <div className='pl-[6cqw]'>
        <p className='text-[12cqw]'>{label}</p>
        <p className='text-[15cqw] leading-tight'>{currency}{amount}</p>
        </div>
      </div>
    )

    //3x1
  else if (variant === "inline")
    return (
      <div 
      ref={ref}
      style={gridStyle}
      className='bg-(--widget-color) rounded-md
      @container
      flex justify-between items-center
      '>
        <p className='text-[10cqw] pl-[8cqw]'>{label}</p>
        <p className='text-[12cqw] pr-[8cqw]'>{currency}{amount}</p>
      </div>
  )
}

export default StatWidget
