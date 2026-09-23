import { createContext, useContext } from "react";
import useTransactions from "../hooks/useTransactions";

const TransactionsContext = createContext(null)

export function TransactionsProvider({children}) {
    const {addTransaction, transactions, deleteTransaction} = useTransactions()

    return (
        <TransactionsContext.Provider value={{addTransaction, transactions, deleteTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactionContext() {
  return useContext(TransactionsContext)
}