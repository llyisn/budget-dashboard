import React from 'react'

const TransactionRow = ({row, detailed=false}) => {
    const isExpense = row.type === 'expense'

    if (!detailed) {
      return (
<div className='flex justify-between bg-white px-[4cqw] py-[2cqw] rounded-xs text-[6cqw] mb-[2cqw]'>
      <div className='flex items-center'>
          <p className='text-[5cqw]'>{row.icon}</p>
          <p className='pl-[3cqw]'>{row.label}</p>
    </div>
      
      <span className=''>{isExpense ? '-' : '+'}{row.currency}{row.amount}</span>
            </div>
      )
    }


  return (
    <div className='bg-white grid grid-cols-[1fr_auto_auto] p-[2cqw] mb-1.5'>
            <div className='flex gap-2 text-[4cqw]'>
                <span>{row.icon}</span>
                <span>{row.label}</span>
            </div>

            {/* tags */}
            <div className='flex justify-end items-center gap-2 text-[3.5cqw]'>
                <span className='rounded-md bg-amber-100 px-2'>{row.category}</span>
                <span className='rounded-md bg-red-100 px-2'>{row.type}</span>
            </div>

            <span className='text-right pl-4 text-[4cqw]'>{isExpense ? '-' : '+'}{row.currency}{row.amount}</span>
    </div>
  )
}

export default TransactionRow
