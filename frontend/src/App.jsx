import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import Dashboard from './pages/Dashboard'

const dashboardWidgets = [
   //{ id: 1, type: 'stat', w: 3, h: 1, x: 1, y: 1, settings: { variant: 'inline', label: 'income', colors: {}} },
   //{ id: 2, type: 'budget', w: 3, h: 1, x: 1, y: 2, settings: { variant: 'inline', max: 7000, colors: {} } },
   { id: 3, type: 'text', w: 3, h: 2, x: 4, y: 1, settings: { text: 'ugly consistency beats pretty perfection', colors: {} } },
 { id: 4, type: 'checklist', w: 2, h: 2, x: 1, y: 3, settings: { data: [
    { id: 1, content: 'order tv', checked: true },
    { id: 2, content: 'taxes', checked: false },
    { id: 3, content: 'docs', checked: false }
  ],
colors: {} } },
   { id: 5, type: 'transaction', w: 4, h: 6, x: 7, y: 1, settings: { date: '23.07.26', price: 192.34, colors: {} } },
//    { id: 6, type: 'budgetHistory', w: 4, h: 2, x: 11, y: 1, settings: { data: [
//     { month: 'Jul 26', total: 3484, rent: 2500, food: null }
//   ], colors: {} } },
   { id: 7, type: 'goal', w: 3, h: 2, x: 3, y: 3, settings: { valueNow: 4305, valueMax: 8000, colors: {} },  },
//  { id: 8, type: 'topExpenses', w: 4, h: 2, x: 11, y: 3, settings: { data: { rent: 439.35, food: 1823.88, transport: 331.66 }, colors: {} } }
]
const transactionsWidgets = [
  {id: 1, type: 'transactions list', w: 5, h: 8, x: 1, y: 1, settings: {colors: {}}},
  {id: 2, type: 'stat overview', w: 4, h: 4, x: 6, y: 1, settings: {title: 'income', data: [{month: '07.26', amount: "$16800.34", comparison: "↑10.4%"}], colors: {}}}
]

function App() {
  const [dashboards, setDashboards] = useState({
  dashboard: {
    id: 1,
    name: 'Dashboard',
    settings: {
      bgColor: '#ffffff'
    },
    widgetData: dashboardWidgets
  },

  transactions: {
    id: 2,
    name: 'Transactions',
    settings: {
      bgColor: '#ffffff'
    },
    widgetData: transactionsWidgets
  }
})

function updateDashboard(id, changes) {
  setDashboards(prev => {
    const key = Object.keys(prev).find(key => prev[key].id === id)
    if (!key) return prev

    return {...prev,
      [key]: {...prev[key], ...changes},
    }
  })
}



  return (
    <Routes>
      <Route path='/' element={<Dashboard widgetData={dashboardWidgets} dashboard={dashboards.dashboard} onUpdateDashboard={updateDashboard} />} />
      <Route path='/transactions' element={<Dashboard dashboard={dashboards.transactions} onUpdateDashboard={updateDashboard}widgetData={transactionsWidgets}/>}/>
    </Routes>
  )
}

export default App
