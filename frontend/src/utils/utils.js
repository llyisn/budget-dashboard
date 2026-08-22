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