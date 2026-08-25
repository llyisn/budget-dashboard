import React from 'react'

const TransactionsWidget = ({date, price=0}) => {
  return (
    <div className='bg-(--widget-color) rounded-md
      row-span-6 col-span-4
      col-start-7
      flex flex-col overflow-hidden
      @container'>
        {/* header */}
        <div className='px-[6cqw] pt-[4cqw] flex justify-between items-center'>
            <p className='text-[10cqw]'>transactions</p>
            <p className='text-[9cqw]'>+</p>
        </div>
        {/* history of transactions */}
        <div className='flex-1 px-[6cqw] overflow-y-auto'>
            <time className='text-[5cqw]' dateTime={date}>{date}</time>
            <div className='flex justify-between bg-white px-[4cqw] py-[2cqw] rounded-xs text-[6cqw] mb-[2cqw]'>
                <div className='flex items-center'>
                    <p className='text-[5cqw]'>🍣</p>
                    <p className='pl-[3cqw]'>hotpot</p>
                </div>
                <p>-${price}</p>
            </div>
        </div>
            
        
    </div>
  )
}

export default TransactionsWidget
