import React from 'react'
import EditModeBtn from './EditModeBtn'

const Header = ({title="", isEditMode, setIsEditMode, setIsLibraryOpen}) => {
  return (
    <div>
        <div className='flex justify-between items-center py-4
        @container 
        '>
          <div className='flex items-center'>
            <p className='text-[3cqw] pr-4'>=</p>
            <p className='text-[3cqw]'>{title}</p>
          </div>
          <div className='flex gap-4'>
            {isEditMode && (
              <button 
              onClick={() => setIsLibraryOpen(prev => !prev)}
              className='cursor-pointer hover:underline'>widgets</button>
            )}
            <EditModeBtn isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
          </div>
        </div>
    </div>
  )
}

export default Header
