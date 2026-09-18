import React, { useState } from 'react'
import EditModeBtn from './EditModeBtn'
import ColorPicker from './widgets/ColorPicker'

const Header = ({title="", isEditMode, setIsEditMode, setIsLibraryOpen, bgColor, setPreviewBgColor, onSaveBgColor}) => {
  const [openColorPicker, setOpenColorPicker] = useState(false)

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
              <>
                <button 
                  onClick={() => setIsLibraryOpen(prev => !prev)}
                  className='cursor-pointer hover:underline'>widgets</button>

                <div className='relative'>
                  <button onClick={() => setOpenColorPicker(prev => !prev)}
                  className='cursor-pointer hover:underline'>background color</button>
                  {openColorPicker && (
                    <div className='absolute left-0 top-full mt-2 z-30'>
                      <ColorPicker 
                      value={bgColor}
                      onChange={color => setPreviewBgColor(color)}
                      onSave={color => {
                        onSaveBgColor(color)
                        setOpenColorPicker(false)
                      }}
                      onCancel={() => {
                        setOpenColorPicker(false)
                        setPreviewBgColor(null)
                      }}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
            <EditModeBtn isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
          </div>
        </div>
    </div>
  )
}

export default Header
