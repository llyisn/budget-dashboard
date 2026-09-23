export function getDisplayRows(data, maxRows, placeholder) {
    const emptyRows = maxRows - data.length
    let paddedData = []
    if (emptyRows === 0) {
        paddedData = data
    }
    else if (emptyRows > 0) {
        paddedData = [...data, ...Array.from({ length: emptyRows}, () => ({...placeholder}))]
    }
    else {
        paddedData = data.slice(-maxRows)
    }
    
    return paddedData
}

export function range(start, end) {
    return Array.from(
        { length: end - start + 1},
        (_, i) => start + i
    )
}

export function getPageIndices(currentPageIndex, pageCount) {
    if (pageCount <= 6) {
        return [...range(0, pageCount-1)]
    }

    if (currentPageIndex <= 3) {
        return [
            ...range(0, 4),
            'ellipsis',
            pageCount - 1
        ]
    }
    
    if (currentPageIndex >= pageCount - 4) {
        return [
            0,
            'ellipsis',
            ...range(pageCount - 5, pageCount - 1)
        ]
    }

    return [
        0,
        'ellipsis',
        ...range(currentPageIndex - 2, currentPageIndex + 2),
        'ellipsis',
        pageCount - 1
    ]
}


export function paginateByHeight(transactions, availableHeight, transactionRowHeight, dateHeaderHeight) {
    let paginatedData = []
    let currentPage = []
    let currentHeight = 0

    for (let i = 0; i < transactions.length; i++) {
       let rowTotalHeight = 0

        if (i === 0 || transactions[i].date !== transactions[i-1].date) {
           rowTotalHeight += dateHeaderHeight
        }
        
        rowTotalHeight += transactionRowHeight

           if (currentHeight + rowTotalHeight > availableHeight) {
               paginatedData.push(currentPage)
               currentPage = []
               currentPage.push(transactions[i])
               currentHeight = transactionRowHeight + dateHeaderHeight
           }
           else {
               currentPage.push(transactions[i])
               currentHeight += rowTotalHeight
           }
       }
       paginatedData.push(currentPage)
       return paginatedData
}

export function getDailyTotals(transactions) {
    const groups = new Map()

    transactions.forEach(row => {
        const group = groups.get(row.date) ?? { income: 0, expense: 0 }
            
        group[row.type] += Number(row.amount)
        groups.set(row.date, group)
    })

    return groups
}