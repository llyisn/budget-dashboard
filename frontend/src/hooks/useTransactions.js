import { useState } from 'react'
import fakeTransactions from '../data/fakeData'

const useTransactions = () => {
    const [transactions, setTransactions] = useState(fakeTransactions)

    function addTransaction(newTransaction) {
        const updatedTransactions = [...transactions, newTransaction]
        setTransactions(updatedTransactions)
    }

    function deleteTransaction(id) {
        const updatedTransactions = transactions.filter(tr => tr.id !== id)
        setTransactions(updatedTransactions)
    }

    return { transactions, addTransaction, deleteTransaction }
}

export default useTransactions
