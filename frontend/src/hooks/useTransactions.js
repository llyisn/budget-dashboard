import { useState } from 'react'
import {fakeTransactions, previewTransactions} from '../data/fakeData'

const useTransactions = (preview=false) => {
    const [transactions, setTransactions] = useState(preview ? previewTransactions : fakeTransactions)

    function addTransaction(newTransaction) {
        setTransactions(prev => [...prev, newTransaction])
    }

    function deleteTransaction(id) {
        setTransactions(prev => prev.filter(tr => tr.id !== id))
    }

    function updateTransaction(id, changes) {
        setTransactions(prev => prev.map(tr =>
            tr.id === id ? 
            {...tr, ...changes} : tr
        ))
    }

    return { transactions, addTransaction, deleteTransaction, updateTransaction}
}

export default useTransactions
