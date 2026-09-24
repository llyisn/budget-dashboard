import React, { useContext, useMemo, useState } from 'react'
import { Search, CalendarFold } from 'lucide-react'
import TransactionRow from './TransactionRow'
import { getDailyTotals } from '../../../../utils/utils'
import useSortRules from '../../../../hooks/useSortRules'
import useFilterRules from '../../../../hooks/useFilterRules'
import usePagination from '../../../../hooks/usePagination'
import PaginationBtns from '../../../PaginationBtns'
import SortMenu from './SortMenu'
import FilterMenu from './FilterMenu'
import { ColorVarsContext } from '../../../../context/context'
import { useTransactionContext } from '../../../../context/TransactionsContext'
import { previewTransactions } from '../../../../data/fakeData'

const TransactionList = ({preview=false, setTransactionModal}) => {
    const colorVars = useContext(ColorVarsContext)
    
   // DATA
   const { transactions: liveTransactions} = useTransactionContext()
   const transactions = preview ? previewTransactions : liveTransactions

   //for displaying total sum of income/expense per day on date header
   const dailyTotals = useMemo(() => getDailyTotals(transactions), [transactions])

   //DROPDOWN STATE 
   //keep only one dropdown menu open
   const [openMenu, setOpenMenu] = useState(null)

   function toggleMenu(menuId) {
    setOpenMenu(prev => prev === menuId ? null : menuId)
   }

    //SORTING
    const sort = useSortRules(transactions, openMenu, setOpenMenu, toggleMenu)
  
    //FILTERING
    const filter = useFilterRules(sort.sortedTransactions, openMenu, setOpenMenu, toggleMenu)
    
    //PAGINATION
    const {
        containerRef,
        dateHeaderRef,
        rowRef,
        pages,

        currentRows,
        currentPageIndex,
        setCurrentPageIndex
    } = usePagination(filter.filteredTransactions)

 return (
   <div 
   style={colorVars}
   className='bg-(--w-main) size-full rounded-md
   border border-(--w-border)
    overflow-hidden
   @container'>
       <div className='px-[6cqw] py-[3cqw] flex flex-col h-full'>
           {/* header */}
           <div className='flex justify-between items-center mb-2'>
               <h1 className='text-[7cqw] text-(--w-title)'>transactions</h1>
               {/* add tx */}
               <button className='bg-(--w-buttons)
               text-[4cqw] leading-tight border rounded-2xl px-[4cqw] pt-0.5 cursor-pointer'
               onClick={() => { setTransactionModal({
                mode: 'add',
                transaction: null
               })}}>+ add</button> 
           </div>


           {/* search bar */}
           <div className='flex items-center'>
               <Search size={14} color='(--w-search)'/>
               <span className='pl-2 text-[4cqw] text-(--w-search)'>search</span>
           </div>
           <hr className='border w-2/3' />
      
           {/* toolbar */}
           <div className='flex justify-between py-3'>
               <div className='flex items-center gap-2 text-[4cqw] w-full'>
                    {/* sort */}
                    <div className=''>
                        <button
                        ref={sort.sortRefs.setReference}
                        {...sort.getSortReferenceProps({
                            onClick: () => toggleMenu('sort')
                        })}
                        
                        className='bg-(--w-buttons)
                        leading-tight border rounded-2xl px-[3cqw] cursor-pointer'>sort</button>

                    { (openMenu === 'sort' || openMenu === 'sort-add')  &&
                        <SortMenu sort={sort} openMenu={openMenu} toggleMenu={toggleMenu} />    
                    }
                    </div>
                   
                   <div className='border-l h-full' />


                   {/* filter */}
                   <FilterMenu filter={filter} openMenu={openMenu} toggleMenu={toggleMenu} />                   
               </div>

                <div className='border-l h-full mx-2' />

                {/* calendar */}
                <CalendarFold size={18} />
           </div>


           {/* transactions mapping */}
           <div ref={containerRef} className='flex-1 min-h-0 '>
            {/* invinsible rendered row used for calculating rowTransactionHeight and dateHeaderHeight, needed for pages */}
               <div className='absolute invisible pointer-events-none'>
                    <div ref={dateHeaderRef} className='text-[4cqw] mt-4'>
                        <span>24.01.1999</span>
                    </div>

                    <div ref={rowRef} className='bg-white p-[2cqw] mb-1.5'>
                        <div className='flex gap-2 text-[4cqw]'>
                                   <span>🌸</span>
                                   <span>flowers</span>
                        </div>
                        
                    </div>
               </div>
            
            {/* actual displaying rows */}
            {
                currentRows.map((row, rowIndex) => {
                const isSameDay = rowIndex > 0 && row.date === currentRows[rowIndex-1].date
                const isFirstDay = rowIndex === 0
                
                const totals = dailyTotals.get(row.date)

                   return (
                       <div key={row.id}>
                           {!isSameDay &&
                               <div className={`flex gap-2 rounded-md text-[4cqw] ${isFirstDay ? '' : 'mt-4'}`}>
                                   <time dateTime={row.date}>{row.date}</time>
                                   <span>|</span>
                                   
                                   {totals?.income > 0 && (
                                        <span className='text-(--w-text-amount-pos)/50'>+{row.currency}{totals.income.toFixed(2)}</span>
                                    )}
                                   {totals?.expense > 0 && (
                                        <span className='text-(--w-text-amount-neg)/50'>-{row.currency}{totals.expense.toFixed(2)}</span>
                                    )}
                                   
                               </div>
                            }
                            
                            <TransactionRow row={row} detailed={true}
                            onClick={() => setTransactionModal({
                                mode: 'edit',
                                transaction: row
                            })} />
                       </div>  
                   )
                })
            }
           </div>

           {/* pagination buttons */}
           <PaginationBtns numSize={4.5} pageCount={pages.length}
           currentPageIndex={currentPageIndex} setCurrentPageIndex={setCurrentPageIndex}/>
           
       </div>
   </div>
 )
}

export default TransactionList