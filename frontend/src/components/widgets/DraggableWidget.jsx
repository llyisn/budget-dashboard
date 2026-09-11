import React, { useEffect } from 'react'
import {useDraggable} from '@dnd-kit/react';
import StatWidget from './stat/StatWidget';
import BudgetWidget from './budget/BudgetWidget';
import TextWidget from './TextWidget';
import ChecklistWidget from './checklist/ChecklistWidget';
import TransactionsWidget from './transactions/TransactionsWidget';
import BudgetHistory from './budget/BudgetHistory';
import GoalWidget from './goal/GoalWidget';
import TopExpenses from './TopExpenses';
import {motion} from 'motion/react'
import StatOverview from './stat/StatOverview';
import TransactionList from './transactions/transaction-list/TransactionList';

//component map
const widgetTypes = {
  stat: motion.create(StatWidget),
  budget: motion.create(BudgetWidget),
  text: motion.create(TextWidget),
  checklist: motion.create(ChecklistWidget),
  transaction: motion.create(TransactionsWidget),
  budgetHistory: motion.create(BudgetHistory),
  goal: motion.create(GoalWidget),
  topExpenses: motion.create(TopExpenses),
  'stat overview': motion.create(StatOverview),
  'transactions list': motion.create(TransactionList)
}

const DraggableWidget = ({widget, disabled, onSettingsChange, isEditMode}) => {
    const { ref } = useDraggable({id: widget.id, data: widget, disabled})
    const Component = widgetTypes[widget.type]
    
    const gridStyle = { gridColumn: `${widget.x} / span ${widget.w}`, 
                gridRow: `${widget.y} / span ${widget.h}` }

    

  return (
    <Component ref={ref} {...widget.settings} gridStyle={gridStyle}
    onSettingsChange={onSettingsChange}
    isEditMode={isEditMode}
    layout />
  )
}

export default DraggableWidget
