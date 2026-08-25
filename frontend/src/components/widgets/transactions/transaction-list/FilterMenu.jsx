import React from 'react'
import FilterChip from './FilterChip'
import { FloatingPortal } from '@floating-ui/react'

const FilterMenu = ({filter, openMenu, toggleMenu}) => {
    const {
        activeFilters,
        availableFilters,
        optionsByFilter,
        filterRules,

        toggleFilterOption,
        addActiveFilter,

        filterRefs,
        filterFloatingStyles,
        getFilterReferenceProps,
        getFilterFloatingProps,
    } = filter

  return (
        <div className='flex-1 overflow-x-auto'>
            <div className='flex items-center gap-2'>
                {activeFilters.map((filter) => {
                    const availableOptions = optionsByFilter[filter]
                    const menuId = `filter-${filter}`
                    
                    return <FilterChip 
                        key={filter} 
                        filter={filter} 
                        availableOptions={availableOptions} 
                        selectedOptions={filterRules[filter]}
                        onOptionToggle={toggleFilterOption}
                        isOpen={openMenu === menuId }
                        onToggle={() => toggleMenu(menuId)}/> 
                    })}

                        
                    <div>
                        {availableFilters.length > 0 &&
                        <button ref={filterRefs.setReference} 
                        {...getFilterReferenceProps()}
                        onClick={() => toggleMenu('filter')} className='text-nowrap'>
                            filter +
                        </button>}
                            
                        
                        {openMenu === 'filter' && (
                            <FloatingPortal>
                            <div 
                                ref={filterRefs.setFloating}
                                style={filterFloatingStyles}
                                {...getFilterFloatingProps()}
                                className='p-1 bg-white border rounded'>
                                    {availableFilters.map((filter) => {
                                        return (
                                            <div key={filter} 
                                            onClick={() => addActiveFilter(filter) }
                                            className=' bg-pink-50 px-1 mb-1 hover:bg-pink-100'>
                                                <span className='w-2/3 mx-3'>{filter}</span>
                                            </div>
                                        )
                                    })}
                            </div>
                            </FloatingPortal>
                        )}
                    </div>
                </div>
            </div>
  )
}

export default FilterMenu
