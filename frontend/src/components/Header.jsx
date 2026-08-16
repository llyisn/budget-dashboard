import React from 'react'
import EditModeBtn from './EditModeBtn'

const Header = () => {
  return (
    <div>
        <div className='flex justify-between items-center py-2
        @container
        '>
          <div className='flex items-center'>
            <p className='text-[3cqw] pr-4'>=</p>
            <p className='text-[3cqw]'>Dashboard</p>
          </div>
          <EditModeBtn />
        </div>
    </div>
  )
}

export default Header
