import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/transactions' element={<Transactions />}/>
    </Routes>
  )
}

export default App
