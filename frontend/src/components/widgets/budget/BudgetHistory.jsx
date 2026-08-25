import React from 'react'
import { getDisplayRows } from '../../../utils/utils'

const MAX_ROWS = 5
const BORDER = 'border-black'

const BudgetHistory = ({data = []}) => {
  const rows = getDisplayRows(data, MAX_ROWS, {month: null, total: null, rent: null, food: null})

  return (
    <div className='bg-(--widget-color) rounded-md 
      row-span-2 col-span-4
      @container-size'>
      <table className='w-full border-separate border-spacing-0'>
        <thead>
            <tr className='h-[16cqh]'>
                <th className={`rounded-tl-md border-t border-l border-r border-b ${BORDER}`}>Month</th>
                <th className={`border-t border-r border-b ${BORDER}`}>Total</th>
                <th className={`border-t border-r border-b ${BORDER}`}>Rent</th>
                <th className={`rounded-tr-md border-t border-r border-b ${BORDER}`}>Food</th>
            </tr>
        </thead>

        <tbody>
            {rows.map((row, rowIndex) => {
                const isLastRow = rowIndex === rows.length - 1
                const values = Object.values(row)
                return (
                    <tr key={rowIndex} className='h-[17cqh]'>
                        {values.map((value, colIndex) => {
                            const isFirstCol = colIndex === 0
                            const isLastCol = colIndex === values.length - 1

                            let cornerClass = ''
                            if (isLastRow && isFirstCol) cornerClass = 'rounded-bl-md'
                            if (isLastRow && isLastCol) cornerClass = 'rounded-br-md'

                            const sideBorders = `border-b border-r ${BORDER} ${isFirstCol ? `border-l ${BORDER}` : ''}`
                            
                            return (
                                <td key={colIndex} className={`px-[3cqw] ${sideBorders} ${cornerClass}`}>
                                    {value}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
        </tbody>

      </table>
    </div>
  )
}

export default BudgetHistory

