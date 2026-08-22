import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Search, CalendarFold } from 'lucide-react'
import useTransactions from '../../hooks/useTransactions'

const TransactionList = () => {
    // data
    const  { transactions: data, addTransaction, deleteTransaction
     } = useTransactions()
    const sortedRows = [...data].sort((a, b) => b.date.localeCompare(a.date))
    
  return (
    <div className='bg-(--widget-color) rounded-md
    row-span-7 col-span-5 overflow-hidden
    @container'>
        <div className='px-[6cqw] py-[3cqw] flex flex-col h-full'>
            {/* header */}
            <div className='flex justify-between items-center mb-2'>
                <h1 className='text-[7cqw]'>transactions</h1>
                {/* btn */}
                <button className='text-[4cqw] leading-tight border rounded-2xl px-[4cqw] pt-0.5 cursor-pointer'>+ add</button>  
            </div>

            {/* search bar */}
            <div className='flex items-center'>
                <Search size={14} color='#B2A6A6'/>
                <span className='pl-2 text-[4cqw] text-[#B2A6A6]'>search</span>
            </div>
            <hr className='border w-2/3' />
        
            {/* sort and filter */}
            <div className='flex justify-between py-3'>
                <div className='flex items-center gap-2 text-[4cqw]'>
                    <button className='leading-tight border rounded-2xl px-[3cqw] cursor-pointer'>sort</button>

                    <div className='border-l h-full'></div>

                    {/* example filter tag */}
                    <span className='rounded bg-[#D5CFAE] leading-tight px-2'>food</span>
                    <span>filter +</span>
                </div>

                <CalendarFold size={18} />
            </div>

            {/* transactions mapping */}
            <div className='flex-1 min-h-0 overflow-y-auto'>
                {
        
                sortedRows.map((row, rowIndex) => {
                    const isExpense = row.type === 'expense'
                    const isSameDay = rowIndex > 0 && row.date === sortedRows[rowIndex-1].date
                
               
                  

                    const isFirstDay = rowIndex === 0
                    return (
                        <div key={row.id}>
                            {
                                !isSameDay &&
                                <div className={`flex gap-2 rounded-md text-[4cqw] ${isFirstDay ? '' : 'mt-4'}`}>
                                    <span>{row.date}</span>
                                    <span>|</span>
                                    <span className='text-[#A9B5A4]'>TODO + sum</span>
                                    <span className='text-[#B7A0A0]'>TODO - sum</span>
                                </div>
                            }
                            
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
                        </div>   
                    )
                })
            }
            </div>
            

            {/* pagination buttons */}
            <div className='flex gap-2 justify-center text-[4cqw]'>
                <button>
                    &lt;
                </button>
                <button>
                    1
                </button>
                <button>
                    2
                </button>
                <button>
                    &gt;
                </button>
            </div>
     
            {/* checking the functions */}
            {/* <button className='border m-5 px-3' onClick={() => addTransaction({id: 8, label: "gift", type: "expense", amount: 45.00, currency: "$", date: "20.08.26", category: "shopping", icon: "🎁" })}>
                add
            </button>

            <button className='border px-3'onClick={() => deleteTransaction(2)}> delete</button> */}
        </div>

        
        
    </div>
  )
}

export default TransactionList
