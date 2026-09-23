  //period: 'week', 'month', 'year', 'all time'
  //field: {type: expense, income, savings}, {category: groceries, rent etc.}

  export function filteredTransactions(transactions, field, period='month') {
    const key = Object.keys(field)[0]
    const value = field[key]

    let statList = transactions.filter(tran => {
      if (Array.isArray(value)) {
        return value.includes(tran[key])
      }
      return tran[key] === value})
    
    let boundary = new Date()

    switch (period) {
      case "day":
        boundary = new Date(boundary.getFullYear(), boundary.getMonth(), boundary.getDate(), 0, 0)
        break;
      case 'week':
        boundary = new Date(boundary.getFullYear(), boundary.getMonth(), boundary.getDate() - 7)
        break;
      case 'month':
        boundary = new Date(boundary.getFullYear(), boundary.getMonth(), 1)
        break;
      case 'year':
        boundary = new Date(boundary.getFullYear(), 0, 1)
        break;
      default:
        break;
    }

    if (period !== 'all time') {
      statList = statList.filter(tran => new Date(tran.date) >= boundary)
    }

    return statList
  }

  export function countStat(transactions, field, period='month') {
    const statList = filteredTransactions(transactions, field, period)

    const sum = statList.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)
    return Number(sum)
  }