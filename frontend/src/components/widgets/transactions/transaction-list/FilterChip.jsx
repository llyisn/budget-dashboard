import { FloatingPortal, useDismiss, useFloating, useInteractions } from '@floating-ui/react'
import React, { useContext } from 'react'
import ChecklistItem from '../../checklist/ChecklistItem'
import { ColorVarsContext } from '../../../../context/context'

const FilterChip = ({filter, availableOptions, isOpen, onToggle, selectedOptions, onOptionToggle}) => {
    const colorVars = useContext(ColorVarsContext)
    
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: (open) => {
            if (!open) {
                onToggle()
            }
        },
        placement: 'bottom-start'
    })

    const dismiss = useDismiss(context)
    const {getReferenceProps, getFloatingProps} = useInteractions([dismiss])

  return (
    <>
        <button
        style={colorVars}
        ref={refs.setReference} {...getReferenceProps({
            onClick: onToggle
        })}
        className='rounded bg-(--w-filters) leading-tight px-2'
        >
        {filter}
        </button>

        {isOpen && (
            <FloatingPortal>
                <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className='p-1 bg-white border rounded'>
                    {availableOptions.map(option =>
                        (
                        <ChecklistItem 
                        key={option}
                        id={option} 
                        content={option} 
                        checked={selectedOptions.includes(option)} 
                        onToggle={() => onOptionToggle(filter, option)}
                        isLineThrough={false} />
                    ))}
                </div>
            </FloatingPortal>
        )}
    </>
    
  )
}

export default FilterChip
