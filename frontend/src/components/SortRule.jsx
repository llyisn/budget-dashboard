import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MoveDown, MoveUp } from 'lucide-react'
import React from 'react'

const SortRule = ({ rule, deleteSortRule, toggleDirection}) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: rule.id})
    
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

  return (
    <div
        ref={setNodeRef} {...attributes} style={style}
        key={rule.field} className='flex items-center justify-between'>
        
        <div className='flex items-center bg-pink-50 px-2 mb-1 w-full touch-none'>
            <span {...listeners} className='cursor-pointer hover:bg-pink-200 '>⠿</span>
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
