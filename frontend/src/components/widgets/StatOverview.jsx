import React from 'react'
import { getDisplayRows } from '../../utils/utils'
import MiniChart from '../MiniChart'
// not finished
const MAX_ROWS = 4

const StatOverview = ({title='', data=[]}) => {
    const rows = getDisplayRows(data, MAX_ROWS, {month: null, amount: null, comparison: null})

  return (
    <div className='bg-(--widget-color) rounded-md
    row-span-4 col-span-4
    @container'>
        <div className='px-[9cqw] py-[4cqw]'>
            <h1 className='text-[9cqw]'>{title}</h1>

            <div className='flex justify-between items-center'>
                <span className='text-[#7E7676] text-[4cqw]'>↑4.2% vs. last mo.</span>
                <span className='text-[7cqw]'>$18300.23</span>
            </div>

            {/* bar */}
            <div className='w-full border h-[6cqw] flex'>
                <div className='h-full bg-amber-200 w-1/2'></div>
                <div className='h-full bg-amber-400 w-1/4'></div>
                <div className='h-full bg-amber-800 w-1/4'></div>
            </div>

             {/* legend */}
            <div className='flex gap-x-4 gap-y-0 flex-wrap'>
                <div className='flex items-center gap-2'>
                    <div className='size-1.5 bg-amber-200 border'></div>
                    <span className='text-[5cqw]'>salary</span>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='size-1.5 bg-amber-200 border'></div>
                    <span className='text-[5cqw]'>salary</span>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='size-1.5 bg-amber-200 border'></div>
                    <span className='text-[5cqw]'>salary</span>
                </div>  

                <div className='flex items-center gap-2'>
                    <div className='size-1.5 bg-amber-200 border'></div>
                    <span className='text-[5cqw]'>salary</span>
                </div>    
            </div>

             {/* history table */}
            <span className='text-[6.5cqw]'>history</span>
            <table className='w-full border-collapse border'>
                <thead>
                    <tr>
                        <th className='border'>month</th>
                        <th className='border'>amount</th>
                        <th className='border'>vs.</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => {
                        const values = Object.values(row)
                        return (
                            <tr key={rowIndex} className='h-[8cqw]'>
                                {values.map((value, colIndex) => {
                                    if (colIndex === 1) {
                                        return (
                                            <td key={colIndex} className='border'>
                                                <span className='text-right'>{value}</span>
                                            </td>
                                        )
                                    }
                                    else {
                                        return (
                                            <td key={colIndex} className='border text-center'>
                                                {value}
                                            </td>
                                        )
                                    }
                                })}
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default StatOverview
