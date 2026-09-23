import { createContext, useContext, useMemo, useState } from "react";

const BudgetContext = createContext(null)


const exampleBudgets = [
  {
    id: '1-existing',
    name: 'existing',
    period: 'week',
    limit: 2000,
    categories: ['transport',
      'entertainment',
      'housing',
      'health'],
    icon: '🥑',
  },
  {
    id: '2-travel',
    name: 'travel',
    period: 'year',
    limit: 8000,
    categories: ['travel'],
    icon: '🚗',
  },
  {
    id: '3-out',
    name: 'out',
    period: 'day',
    limit: 1000,
    categories: ['cafe'],
    icon: '🍷',
  },
]

export function BudgetProvider({children}) {
    const [budgets, setBudgets] = useState(exampleBudgets)

    function addBudget(budget) {
        setBudgets(prev => [...prev, budget])
    }

    function updateBudget(id, changes) {
    setBudgets(prev =>
        prev.map(budget =>
        budget.id === id
            ? { ...budget, ...changes }
            : budget
        )
    )
    }

    function deleteBudget(id) {
        setBudgets(prev => prev.filter(b => b.id !== id))
    }

    const value = {
            budgets,

            addBudget,
            deleteBudget,
            updateBudget
        }


    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    )
}

export function useBudgetContext() {
  return useContext(BudgetContext)
}