import { useLayoutEffect, useMemo, useRef, useState } from "react"
import useElementHeight from "./useElementHeight"
import { paginateByHeight } from "../utils/utils"

const ROW_GAP = 12

const usePagination = (transactions) => {
// height available for displaying transactions rows
   const containerRef = useRef(null)
   const availableHeight = useElementHeight(containerRef)
   const rowRef = useRef(null)
   const dateHeaderRef = useRef(null)
   const [transactionRowHeight, setTransactionRowHeight] = useState(null)
   const [dateHeaderHeight, setDateHeaderHeight] = useState(null)

   useLayoutEffect(() => {
       setTransactionRowHeight(rowRef.current?.offsetHeight + ROW_GAP)
       setDateHeaderHeight(dateHeaderRef.current?.offsetHeight)
   }, [])

    const pages = useMemo(() => {
        if (availableHeight == null || transactionRowHeight == null || dateHeaderHeight == null) return []
        return paginateByHeight(transactions, availableHeight, transactionRowHeight, dateHeaderHeight)
    }, 
    [transactions, availableHeight, transactionRowHeight, dateHeaderHeight])

    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const currentRows = pages[currentPageIndex] ?? []

    return {
        containerRef,
        dateHeaderRef,
        rowRef,

        pages,
        currentRows,
        currentPageIndex, 
        setCurrentPageIndex
    }

}

export default usePagination
