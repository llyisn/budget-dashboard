import { useDraggable } from '@dnd-kit/react'
import React from 'react'
import LibraryItem from './LibraryItem'
import { previewWidgets } from '../../data/previewWidgets'


const WidgetLibrary = ({position, close, isDraggingWidget}) => {
    const {ref, handleRef} = useDraggable({id: 'library', data: {type: 'library'}})

  return (
 <div 
    ref={ref} 
    
    className='fixed z-20 w-2/3 h-2/3  bg-[#937878]/95 px-4 pt-2  border rounded-lg  @container flex flex-col transition-transform duration-300 ease-out'
    
    style={{
        left: '16.67%',
        top: '16.67%',
        transform: isDraggingWidget
          ? 'translate(calc(33.33vw - 50%), calc(83.33vh - 15%))'
          : `translate(${position.x}px, ${position.y}px)`
        }}
    >
        

        {/* header */}
        <div className='flex items-center  leading-tight text-white text-[4cqw]'>
            <button
            className='cursor-pointer'
            onClick={() => close(false)}>×</button>
            <div ref={handleRef} className='flex-1'>
              <span className='text-center '>widgets</span>
            </div>
        </div>

        {/* list of widgets to choose from */}
        <div className='flex-1 text-[3cqw] p-2 overflow-scroll'>
                {
                    Object.entries(previewWidgets).map(([category, widgets]) => (
                        <div key={category}>
                        <span className=' text-white'>{category}</span>
                        <div className='flex gap-4 items-start'>
                        {
                            widgets.map((widget, index) => (
                        <div key={index} className='flex flex-col gap-1 items-center'>
                            <LibraryItem id={`library-${category}-${index}`} type={widget.type} settings={widget.settings} w={widget.w} h={widget.h} />
                            <span className='text-[2cqw] text-(--widget-color)'>{widget.w}x{widget.h}</span>
                        </div>))
                        }
                        </div>
                        </div>
                    ))
                }
        </div>  
   </div>
  )
}

export default React.memo(WidgetLibrary)
