import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import StatWidget from '../components/widgets/StatWidget'
import BudgetWidget from '../components/widgets/BudgetWidget'
import TextWidget from '../components/widgets/TextWidget'
import ChecklistWidget from '../components/widgets/ChecklistWidget'
import TransactionsWidget from '../components/widgets/TransactionsWidget'
import ImageWidget from '../components/widgets/ImageWidget'
import GoalWidget from '../components/widgets/GoalWidget'
import BudgetHistory from '../components/widgets/BudgetHistory'
import TopExpenses from '../components/widgets/TopExpenses'
import useCellSize from '../hooks/useCellSize'

const Dashboard = () => {
    const gridContainerRef = useRef(null)
    const { cellSize, gapSize } = useCellSize(gridContainerRef)

  return (
    <div className='bg-linear-to-b from-[#F6CECE] to-[#C7B5C6] '>
      <div className="h-screen px-12 py-4">
        <Header title="Dashboard" />
        <div ref={gridContainerRef}
            className="grid 
                    grid-cols-14 
                    gap-(--gap-size)
                    auto-rows-(--cell-size)"
        
            style={{'--cell-size': `${cellSize}px`,
                    '--gap-size': `${gapSize}px`}}
        >
            
            <StatWidget variant="inline" label="savings" value="$86 347" delta='↑12,4% vs. last month'/>
            <BudgetWidget variant='inline' valueNow={5.3} valueMax={7} />
            <TextWidget text='ugly consistency beats pretty perfection' />
            <ChecklistWidget data={[{ id: 1, content: "order tv", checked: true }, 
              { id: 2, content: "taxes", checked: false }, 
              { id: 3, content: "docs", checked: false }]}/>
            <TransactionsWidget date={"23.07.26"} price={192.34} />
            <BudgetHistory data={[{month: "Jul 26", total: 3484, rent:2500, food: null}]} />
            <GoalWidget  valueNow={4305} valueMax={8000}/>
            <TopExpenses data={{rent: 439.35, food: 1823.88, transport: 331.66}}/>
        </div>
        
      </div>
    </div>
  )
}

export default Dashboard
