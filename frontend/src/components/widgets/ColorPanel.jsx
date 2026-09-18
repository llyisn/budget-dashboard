import React from 'react'
import ColorPicker from './ColorPicker'
import { getColorChanges } from '../../utils/colors/widgetColors'

const ColorPanel = ({colorSlots, setActiveColorKey, resolvedColors, activeColorKey, displayedColors, setPreviewColors, saveColor}) => {
  return (
    <div 
    className='absolute top-15 -right-42 z-40 bg-white border w-40 px-2 py-1.5
    @container'>
        <span className='text-[15cqw]'>colors</span>
        {/* color settings */}
            {colorSlots.map(slot => {
              return (
                <React.Fragment key={slot.key}>
                {/* one setting */}
                <div 
                className='text-[11cqw] my-1 flex justify-between items-center px-1 border'
                onClick={() => setActiveColorKey(prev => (prev === slot.key ? null : slot.key))}>
                  <span>{slot.label}</span>

                  {/* swatch */}
                  <button 
                  className="w-10 h-4 border border-black/20"
                  style={{backgroundColor: resolvedColors[slot.key]}}></button>
                </div>
                
                {/* color picker */}
                {activeColorKey === slot.key && 
                  <ColorPicker value={displayedColors[slot.key]}
                  
                  onChange={(newColor) => {
                    const changes = getColorChanges(colorSlots, slot.key, newColor)
                    setPreviewColors(prev => ({...prev, ...changes}))
                  }}
                  onSave={(color) => saveColor(color, slot.key)}
                  onCancel={() => {
                    setActiveColorKey(null)
                    setPreviewColors(prev => {
                      const { [slot.key]: _, ...rest } = prev ?? {}
                      return rest
                    })
                  }}/>}

                {slot.children?.map(child => (
                    <React.Fragment key={child.key}>
                      <div
                        className="text-[11cqw] my-1 flex justify-between items-center px-1 border cursor-pointer"
                        onClick={() => setActiveColorKey(prev => (prev === child.key ? null : child.key))}
                      >
                        <span className="pl-2">{child.label}</span>
                        <button
                          className="w-10 h-4 border border-black/20"
                          style={{ backgroundColor: resolvedColors[child.key] }}
                        />
                      </div>

                      {activeColorKey === child.key && (
                        <ColorPicker
                          value={displayedColors[child.key]}
                          onChange={newColor => setPreviewColors(prev => ({ ...prev, [child.key]: newColor }))}
                          onSave={color => saveColor(color, child.key)}
                          onCancel={() => {
                            setActiveColorKey(null)
                            setPreviewColors(prev => {
                              const { [child.key]: _, ...rest } = prev ?? {}
                              return rest
                            })
                          }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                
                </React.Fragment>
              )
             })}
          </div>
  )
}

export default ColorPanel
