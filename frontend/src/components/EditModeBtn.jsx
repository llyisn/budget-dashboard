import React from 'react'
import {motion} from 'motion/react'

const EditModeBtn = ({isEditMode, setIsEditMode}) => {
  return (
    <div>
        <input 
            className='hidden'
            type="checkbox" 
            id='editmode-toggle'
            onChange={(e) => setIsEditMode(e.target.checked)}
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
                select-none
                cursor-pointer
            '
        >
            <motion.span
            className='absolute right-3 text-md'
            initial={false}
            animate={{opacity: isEditMode ? 1 : 0}}>
                edit
            </motion.span>

            <motion.span
            className='absolute left-3 text-md'
            initial={false}
            animate={{opacity: isEditMode ? 0 : 1}}>
                lock
            </motion.span>

            <motion.span
            initial={false}
            className='absolute w-6 h-6 rounded-full bg-black z-10'
            animate={{left: isEditMode ? "0" : "calc(100% - 24px)"}}
            >
                {/* circle */}
            </motion.span>
        </label>
    </div>
    
  )
}

export default EditModeBtn
