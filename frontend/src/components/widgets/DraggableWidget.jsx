import React, { useEffect } from 'react'
import {useDraggable} from '@dnd-kit/react';
import StatWidget from './stat/StatWidget';
import BudgetWidget from './budget/BudgetWidget';
import TextWidget from './TextWidget';
import ChecklistWidget from './checklist/ChecklistWidget';
import TransactionsWidget from './transactions/TransactionsWidget';
import BudgetHistory from './budget/BudgetHistory';
import GoalWidget from './GoalWidget';
import TopExpenses from './TopExpenses';

//component map
const widgetTypes = {
  stat: StatWidget,
  budget: BudgetWidget,
  text: TextWidget,
  checklist: ChecklistWidget,
  transaction: TransactionsWidget,
  budgetHistory: BudgetHistory,
  goal: GoalWidget,
  topExpenses: TopExpenses
}

const DraggableWidget = ({widget}) => {
    const { ref } = useDraggable({id: widget.id, data: widget})
    const Component = widgetTypes[widget.type]
    
    const gridStyle = { gridColumn: `${widget.x} / span ${widget.w}`, 
                gridRow: `${widget.y} / span ${widget.h}` }

  return (
    <Component ref={ref} {...widget.settings} gridStyle={gridStyle} />
  )
}

export default DraggableWidget
