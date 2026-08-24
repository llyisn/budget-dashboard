import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Search, CalendarFold, MoveUp, MoveDown } from 'lucide-react'
import useTransactions from '../../hooks/useTransactions'
import TransactionRow from '../TransactionRow'
import { getPageIndices, paginateByHeight } from '../../utils/utils'
import useElementHeight from '../../hooks/useElementHeight'
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import {arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import SortRule from '../SortRule'


const ROW_GAP = 12
const SORT_PROPERTIES = ['date', 'amount']

const TransactionList = () => {
   // data
   const  { transactions } = useTransactions()
  // const sortedTransactions = useMemo(() => [...transactions].sort((a, b) => b.date.localeCompare(a.date)))
    
  //dimensions
   // height available for displaying transactions rows
   const containerRef = useRef(null)
   const availableHeight = useElementHeight(containerRef)
   const rowRef = useRef(null)
   const dateHeaderRef = useRef(null)
   const [transactionRowHeight, setTransactionRowHeight] = useState(null)
   const [dateHeaderHeight, setDateHeaderHeight] = useState(null)

   useLayoutEffect(() => {
       setTransactionRowHeight(rowRef.current?.offsetHeight + ROW_GAP)
       setDateHeaderHeight(dateHeaderRef.current?.offsetHeight)
   }, [])



//    sorting
   const [isSortOpen, setIsSortOpen] = useState(false)
   const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)


   const [sortRules, setSortRules] = useState([
    {id: 0, field: 'date', direction: 'desc'},
   ]) 
   const availableSortProperties = SORT_PROPERTIES.filter(prop => !sortRules.some(rule => rule.field === prop))


   function toggleDirection(field) {
    setSortRules(prev => prev.map(rule =>
        rule.field === field ? {
            ...rule, direction: rule.direction === 'asc' ? 'desc' : 'asc'
        } : rule
    ))
    }
    function addSortRule(property) {
        setSortRules(prev => [
            ...prev,
            {id: sortRules.length, field: property, direction: 'asc'}
        ])
    }
    function deleteSortRule(field) {
        setSortRules(prev => prev.filter(rule => rule.field !== field))
    }


    const getRulePos = id => sortRules.findIndex(rule => rule.id === id)
    const handleDragEnd = event => {
        const {active, over} = event

        if (active.id === over.id) return

        setSortRules(sortRules => {
            const originalPos = getRulePos(active.id)
            const newPos = getRulePos(over.id)

            return arrayMove(sortRules, originalPos, newPos)
        })
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
    )

    const sortedTransactions = useMemo(() => sortTransactions(), [sortRules, transactions])
    
    function sortTransactions() {
        let updatedTransactions = [...transactions]
        for (let i = sortRules.length-1; i >= 0; i--) {
            const field = sortRules[i].field
            const direction = sortRules[i].direction

            updatedTransactions.sort((a,b) => compareValues(a[field], b[field], direction))
        }
        return updatedTransactions
    }

    function compareValues(a, b, direction) {
        let result

        if (typeof a === 'number' && typeof b === 'number') {
            result = a - b
        }
        else {
            result = a.localeCompare(b)
        }

        return direction === 'desc' ? -result : result
    }

//pagination
   const pages = useMemo(() => {
        if (availableHeight == null || transactionRowHeight == null || dateHeaderHeight == null) return []

        return paginateByHeight(sortedTransactions, availableHeight, transactionRowHeight, dateHeaderHeight)
   }, 
   [sortedTransactions, availableHeight, transactionRowHeight, dateHeaderHeight])


   const dailyTotals = useMemo(() => {
        const groups = new Map()

        transactions.forEach(row => {
            const group = groups.get(row.date) ?? { income: 0, expense: 0 }
            
            group[row.type] += row.amount
            groups.set(row.date, group)
        })

        return groups
   }, [transactions])

   const [currentPageIndex, setCurrentPageIndex] = useState(0)
   const currentRows = pages[currentPageIndex] ?? []

   const pageIndices = getPageIndices(currentPageIndex, pages.length)

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
                    {/* sort */}
                    <div className='relative'>
                        <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className='leading-tight border rounded-2xl px-[3cqw] cursor-pointer'>sort</button>

                    { isSortOpen && (
                        <DndContext 
                        sensors={sensors}
                        onDragEnd={handleDragEnd}
                        collisionDetection={closestCorners}
                        >
                            <div  className='absolute mt-1 p-2 rounded border left-0 bg-white'>
                            
                            <SortableContext items={sortRules.map(rule => rule.id)} strategy={verticalListSortingStrategy}>
                                { sortRules.map((rule) => (
                                
                                <SortRule key={rule.id} rule={rule} deleteSortRule={deleteSortRule} toggleDirection={toggleDirection}/>
                            ))}
                            </SortableContext>
                            
                            
                            <div className='relative'>
                                {availableSortProperties.length > 0 && 
                                <button onClick={() => setIsSortMenuOpen(!isSortMenuOpen)} className='text-[3.5cqw]'>+ add sort</button>
                                }

                                {isSortMenuOpen && (
                                    <div className='absolute bottom-full left-0 p-1 rounded border bg-white'>
                                        { availableSortProperties.map((property) => {
                                return (
                                    
                                <div onClick={() => {
                                    addSortRule(property)
                                    setIsSortMenuOpen(false)
                                    }} key={property} className=' bg-pink-50 px-1 mb-1 hover:bg-pink-100'>
                                    <span className='w-2/3 mx-3'>{property}</span>
                                </div>
                                )
                            })}
                                    </div>
                                )}
                            </div>
                               
                            </div>

                        </DndContext>

                            
                        )
                    }
                    </div>
                   
                   <div className='border-l h-full'></div>


                   {/* example filter tag */}
                   <span className='rounded bg-[#D5CFAE] leading-tight px-2'>food</span>
                   <span>filter +</span>
               </div>


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
                                   <span>{row.date}</span>
                                   <span>|</span>
                                   
                                   {totals?.income > 0 && (
                                        <span className='text-[#A9B5A4]'>+{row.currency}{totals.income}</span>
                                    )}
                                   {totals?.expense > 0 && (
                                        <span className='text-[#B7A0A0]'>-{row.currency}{totals.expense}</span>
                                    )}
                                   
                               </div>
                            }
                            
                            <TransactionRow row={row} />
                       </div>  
                   )

                })
            }
               
           
           </div>


           {/* pagination buttons */}
           <div className='flex gap-4 justify-center text-[4.5cqw]'>
                <button className='w-6 cursor-pointer' onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex-1))}>
                   &lt;
               </button>

               <div className='w-1/2 flex gap-4 justify-center mx-2'>
                    {
                pageIndices.map((ind, index) => {
                    if (ind === 'ellipsis') {
                        return <span key={index}>...</span>
                    }
                    return <button className={`cursor-pointer hover:text-purple-800 ${ind === currentPageIndex ? 'underline' : ''}`} key={index} onClick={() => setCurrentPageIndex(ind)}>
                        {ind+1}
                    </button>
                })
            }
               </div>
               
            <button className='w-6 cursor-pointer' onClick={() => setCurrentPageIndex(Math.min(pages.length-1, currentPageIndex+1))}>
                   &gt;
               </button>
           </div>
       </div>


      
      
   </div>
 )
}


export default TransactionList