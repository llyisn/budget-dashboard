import { createContext, useContext } from "react";
import useTransactions from "../hooks/useTransactions";

const TransactionsContext = createContext(null)

export function TransactionsProvider({children}) {
    const {addTransaction, transactions, deleteTransaction, updateTransaction} = useTransactions()
    

    return (
        <TransactionsContext.Provider value={{addTransaction, transactions, deleteTransaction, updateTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactionContext() {
  return useContext(TransactionsContext)
}