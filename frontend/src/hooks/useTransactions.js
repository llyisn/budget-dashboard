import { useState } from 'react'
import {fakeTransactions, previewTransactions} from '../data/fakeData'

const useTransactions = (preview=false) => {
    const [transactions, setTransactions] = useState(preview ? previewTransactions : fakeTransactions)

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
