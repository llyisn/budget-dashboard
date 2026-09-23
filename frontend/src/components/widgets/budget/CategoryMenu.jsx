import { autoUpdate, useFloating } from '@floating-ui/react'
import React, { useState } from 'react'
import { fakeCategories } from '../../../data/fakeData'

const CategoryMenu = ({categories, onAdd, onDelete, categoryChosen, open, onOpen, error}) => {
    const {refs, floatingStyles} = useFloating({
    whileElementsMounted: autoUpdate,
    placement: 'bottom-start'
  })

  
  const availableCategories = fakeCategories.filter(cat => !categories.some(c => c === cat))

  


  return (
    <div className='mt-1 flex gap-1 text-[5cqw] items-center overflow-x-scroll'>
              {categories.map(category => {
              return (
                <div key={category} 
                className='border leading-tight px-1 shrink-0'>
                  <button 
                  onClick={() => {
                    onDelete(category)
                  }}
                  className='mr-1 cursor-pointer'>×</button>
                  <span>{category}</span>
                </div>
              )
            })}
        
        <div>
        <button
                ref={refs.setReference}
                onClick={() => onOpen(open)}
                className={`cursor-pointer ${error ? 'text-red-900 underline' : ''}`}>
            {categoryChosen ? '+' : 'choose category +'}
        </button>

        {open && (
            <div 
            ref={refs.setFloating}
            style={floatingStyles}
            className='flex flex-col items-center border bg-white w-30 max-h-60 overflow-scroll'>
                {availableCategories.map(cat => (
                    <p 
                    key={cat}
                    onClick={() => {
                        onAdd(cat)
                    onOpen(open)}}
                    className='mb-1.5 px-1 bg-amber-100 border w-[80%] cursor-pointer'>
                        {cat}
                    </p>
                ))}
            </div>
        )}
                    

        
    </div>
    </div>
    
  )
}

export default CategoryMenu
