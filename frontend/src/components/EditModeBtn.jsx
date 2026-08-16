import React from 'react'

const EditModeBtn = () => {
  return (
    <div>
        <input 
            className='hidden'
            type="checkbox" 
            id='editmode-toggle'
        />
        <label 
            htmlFor="editmode-toggle"
            className='
                relative
                flex
                items-center
                justify-between
                w-18
                h-6
                rounded-2xl
                border
            '
        >
            <span className='pl-3 text-md'>lock</span>
            <span className='w-6 h-6 rounded-full bg-black'></span>
        </label>
    </div>
    
  )
}

export default EditModeBtn
