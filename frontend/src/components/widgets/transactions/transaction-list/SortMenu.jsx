import { PointerActivationConstraints } from '@dnd-kit/dom'
import { DragDropProvider, PointerSensor } from '@dnd-kit/react'
import React from 'react'
import SortRule from './SortRule'


const SortMenu = ({sort, openMenu, toggleMenu}) => {
    const {
        handleDragEnd, 
        sortRefs, 
        getSortFloatingProps, 
        sortFloatingStyles, 
        sortRules, 
        deleteSortRule, 
        toggleDirection, 
        availableSortProperties, 
        addSortRule
    } = sort

  return (
    <DragDropProvider
        onDragEnd={handleDragEnd}
        sensors={(defaults) => [
            ...defaults.filter((sensor) => sensor !== PointerSensor),
            PointerSensor.configure({
                activationConstraints(event, source) {
                    if (event.pointerType === 'touch') {
                        return [ new PointerActivationConstraints.Delay({value: 50, tolerance: 10})]
                    }
                    return [ new PointerActivationConstraints.Distance({value: 10})]
                    }
                })
            ]}
    >
        <div 
            ref={sortRefs.setFloating}
            {...getSortFloatingProps()}
            style={sortFloatingStyles}
            className=' mt-1 p-2 rounded border bg-white'>
                {sortRules.map((rule, index) => (
                    <SortRule 
                        key={rule.id}
                        rule={rule}
                        index={index}
                        deleteSortRule={deleteSortRule}
                        toggleDirection={toggleDirection}
                    />
                ))}

                <div className='relative'>
                    {availableSortProperties.length > 0 && 
                        <button onClick={() => toggleMenu('sort-add')} className='text-[3.5cqw]'>+ add sort</button>
                    }

                    {openMenu === 'sort-add' && (
                        <div className='absolute bottom-full left-0 p-1 rounded border bg-white'>
                    
                    { availableSortProperties.map((property) => {
                        return (   
                            <div onClick={() => addSortRule(property)} key={property} className=' bg-pink-50 px-1 mb-1 hover:bg-pink-100'>
                                <span className='w-2/3 mx-3'>{property}</span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    </div>   
    </DragDropProvider>
  )
}

export default SortMenu
