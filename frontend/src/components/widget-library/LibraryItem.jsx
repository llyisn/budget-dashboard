import React from 'react'
import StatWidget from '../widgets/stat/StatWidget'
import BudgetWidget from '../widgets/budget/BudgetWidget'
import TextWidget from '../widgets/TextWidget'
import ChecklistWidget from '../widgets/checklist/ChecklistWidget'
import TransactionsWidget from '../widgets/transactions/TransactionsWidget'
import BudgetHistory from '../widgets/budget/BudgetHistory'
import GoalWidget from '../widgets/goal/GoalWidget'
import TopExpenses from '../widgets/TopExpenses'
import StatOverview from '../widgets/stat/StatOverview'
import TransactionList from '../widgets/transactions/transaction-list/TransactionList'
import { useDraggable } from '@dnd-kit/react'

//component map
const widgetTypes = {
  stat: StatWidget,
  budget: BudgetWidget,
  text: TextWidget,
  checklist: ChecklistWidget,
  transaction: TransactionsWidget,
  budgetHistory: BudgetHistory,
  goal: GoalWidget,
  topExpenses: TopExpenses,
  'stat overview': StatOverview,
  'transactions list': TransactionList
}

const LibraryItem = ({id, type, settings, w, h, pixelSize}) => {
  const {ref} = useDraggable({
    id,
    data: {
      type: 'library-widget',
      widget: {
        type,
        settings,
        w,
        h
      }
    }
  })
  const Component = widgetTypes[type]
  const style = pixelSize ? { width: pixelSize.width, height: pixelSize.height} 
    : { width: `${w * 8}cqw`, height: `${h * 8}cqw`}

  return (
    <div ref={ref} style={style} >
      <Component {...settings} gridStyle={{width: '100%', height: '100%'}} />
    </div>
  )
}

export default React.memo(LibraryItem)
