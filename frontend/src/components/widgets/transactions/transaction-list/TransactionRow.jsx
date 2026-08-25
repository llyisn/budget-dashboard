import React from 'react'

const TransactionRow = ({row}) => {
    const isExpense = row.type === 'expense'

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
