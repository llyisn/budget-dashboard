import { useSortable } from '@dnd-kit/react/sortable'
import { MoveDown, MoveUp } from 'lucide-react'
import React from 'react'

const SortRule = ({index, rule, deleteSortRule, toggleDirection}) => {
    const { ref, handleRef} = useSortable({id: rule.id, index})
    
  return (
    <div
        ref={ref}
        className='flex items-center justify-between select-none'>
        
        <div className='flex items-center bg-pink-50 px-2 mb-1 w-full'>
            <span ref={handleRef} className='cursor-pointer touch-none hover:bg-pink-200'>⠿</span>
            <span className='w-2/3 mx-3'>{rule.field}</span>
            
            { rule.direction === 'asc' ? 
                <MoveUp onClick={() => toggleDirection(rule.field)} size={14} className='hover:bg-pink-200' /> : 
                <MoveDown onClick={() => toggleDirection(rule.field)} size={14} className='hover:bg-pink-200' />
            }
                                        
        </div>
                                        
        <button onClick={() => deleteSortRule(rule.field)}
            className={`mx-2 ${rule.field === 'date' ? 'invisible' : ''}`}>×</button>
    
    </div>
                                        
  )
}

export default SortRule
