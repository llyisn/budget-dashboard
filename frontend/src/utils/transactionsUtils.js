  //period: 'week', 'month', 'year', 'all time'
  //type: expense, income, savings

  export function filteredTransactions(transactions, type, period='month') {
    let statList = transactions.filter(tran => tran.type === type)

    let boundary = new Date()

    switch (period) {
      case 'week':
        boundary = new Date(boundary.getFullYear(), boundary.getMonth(), boundary.getDate() - 7)
        break;
      case 'month':
        boundary = new Date(boundary.getFullYear(), boundary.getMonth(), 1)
        break;
      case 'year':
        boundary = new Date(boundary.getFullYear(), 1, 1)
      default:
        break;
    }

    if (period !== 'all time') {
      statList = statList.filter(tran => new Date(tran.date) >= boundary)
    }

    return statList
  }

  export function countStat(transactions, type, period='month') {
    const statList = filteredTransactions(transactions, type, period)

    const sum = statList.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)
    return Number(sum)
  }