import React, { useRef } from 'react'
import useCellSize from '../hooks/useCellSize'
import Header from '../components/Header'
import TransactionsWidget from '../components/widgets/TransactionsWidget'
import TransactionList from '../components/widgets/TransactionList'
import StatOverview from '../components/widgets/StatOverview'
import MiniChart from '../components/MiniChart'

const Transactions = () => {
 const gridContainerRef = useRef(null)
 const { cellSize, gapSize } = useCellSize(gridContainerRef)

  return (
    <div className='bg-linear-to-b from-[#F6CECE] to-[#C7B5C6] '>
      <div className="h-screen px-12 py-4">
        <Header title='Transactions' />
        <div ref={gridContainerRef}
            className="grid 
                    grid-cols-14 
                    gap-(--gap-size)
                    auto-rows-(--cell-size)"
        
            style={{'--cell-size': `${cellSize}px`,
                    '--gap-size': `${gapSize}px`}}
        >
            <TransactionList />
            <StatOverview title='income' data={[
                {month: '07.26', amount: "$16800.34", comparison: "↑10.4%"},
                ]} />
        
        </div>
        
      </div>
    </div>
  )
}

export default Transactions
