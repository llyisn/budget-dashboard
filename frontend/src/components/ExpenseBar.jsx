import React, { useContext } from 'react'
import { ColorVarsContext } from '../context/context'

const ExpenseBar = ({categoryKey, value, ratio, color, isLabelOverflowing, onRefsReady}) => {
    const colorVars = useContext(ColorVarsContext)

    const bar = (
            <div 
                ref={(node) => onRefsReady(categoryKey, 'bar', node)} 
                className='w-(--ratio) pr-3 h-[6cqw] flex items-center justify-end'
                style={{'--ratio': `${ratio * 100}%`, 
                        backgroundColor: color}}>

                {/* render label inside the bar if fits */}
                {!isLabelOverflowing && (
                    <p ref={(node) => onRefsReady(categoryKey, 'label', node)} className='pl-1.5 text-(--w-text-labels)'>{categoryKey}</p>
                )}
                
            </div>
    )

    return (
        <div className='flex text-[5cqw] px-[6cqw] mb-px'>
            {bar}

            {isLabelOverflowing && (
                <p ref={(node) => onRefsReady(categoryKey, 'label', node)} className='pl-1.5 text-(--w-text-labels)'>{categoryKey}</p>
            )}

            <p className='pl-3 text-(--w-text-amount)'>${value}</p>
        </div>
    )




}

export default ExpenseBar
