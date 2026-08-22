import React, { useState } from 'react'

const fake_data = [
    { id: 1, label: "pizza", type: "expense", amount: 49.99, currency: "$", date: "2026-08-08", category: "food", icon: "🍕" },

    { id: 2, label: "work", type: "income", amount: 7000.23, currency: "$", date: "2026-08-18", category: "salary", icon: "💻" },

    { id: 3, label: "groceries", type: "expense", amount: 83.47, currency: "$", date: "2026-08-18", category: "food", icon: "🛒" },

    { id: 4, label: "bus pass", type: "expense", amount: 42.00, currency: "$", date: "2026-08-17", category: "transport", icon: "🚌" },

    { id: 5, label: "freelance", type: "income", amount: 450.00, currency: "$", date: "2026-08-17", category: "freelance", icon: "💻" },

    { id: 6, label: "movie tickets", type: "expense", amount: 28.50, currency: "$", date: "2026-08-17", category: "entertainment", icon: "🎬" },

    { id: 7, label: "coffee", type: "expense", amount: 5.80, currency: "$", date: "2026-08-16", category: "food", icon: "☕" },

    { id: 8, label: "rent", type: "expense", amount: 1200.00, currency: "$", date: "2026-08-16", category: "housing", icon: "🏠" },

    { id: 9, label: "pharmacy", type: "expense", amount: 32.75, currency: "$", date: "2026-08-15", category: "health", icon: "💊" },

    { id: 10, label: "concert", type: "expense", amount: 75.00, currency: "$", date: "2026-08-14", category: "entertainment", icon: "🎵" },
]

const useTransactions = () => {
    const [transactions, setTransactions] = useState(fake_data)

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
