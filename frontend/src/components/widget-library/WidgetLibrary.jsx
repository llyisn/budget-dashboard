import { useDraggable } from '@dnd-kit/react'
import React from 'react'
import LibraryItem from './LibraryItem'

//{type: str, settings: {}, w: int, h: int}
const previewWidgets = {
    income: [
        {
    type: 'stat',
    settings: {
      variant: 'compact',
      label: 'income',
      preview: true
    },
    w: 2,
    h: 1
  },
        {
    type: 'stat',
    settings: {
      variant: 'inline',
      label: 'income',
      preview: {
        amount: '1234.56',
        delta: '+2.4%',
      }
    },
    w: 3,
    h: 1
  },
  {
    type: 'stat',
    settings: {
      variant: 'detailed',
      label: 'income',
      preview: {
        amount: '1234.56',
        delta: '+2.4%',
      }
    },
    w: 3,
    h: 2
  }
    ],
    expense: [
        {
    type: 'stat',
    settings: {
      variant: 'compact',
      label: 'expense',
      preview: true
    },
    w: 2,
    h: 1
  },
        {
    type: 'stat',
    settings: {
      variant: 'inline',
      label: 'expense',
      preview: {
        amount: '1234.56',
        delta: '+2.4%',
      }
    },
    w: 3,
    h: 1
  },
  {
    type: 'stat',
    settings: {
      variant: 'detailed',
      label: 'expense',
      preview: {
        amount: '1234.56',
        delta: '+2.4%',
      }
    },
    w: 3,
    h: 2
  }
    ],
    savings: [
        {
    type: 'stat',
    settings: {
      variant: 'compact',
      label: 'savings',
      preview: true
    },
    w: 2,
    h: 1
  },
        {
    type: 'stat',
    settings: {
      variant: 'inline',
      label: 'savings',
      preview: {
        amount: '1234.56',
        delta: '+2.4%',
      }
    },
    w: 3,
    h: 1
  },
  {
    type: 'stat',
    settings: {
      variant: 'detailed',
      label: 'savings',
      preview: {
        amount: '1234.56',
        delta: '+2.4%',
      }
    },
    w: 3,
    h: 2
  }
    ],
    budget: [
        {
            type: 'budget',
            settings: {
                variant: 'inline',
                preview: true,
                max: 1000
            },
            w: 3,
            h: 1
        }
    ],
    transactions: [
        {
            type: 'transaction',
            settings: {
                preview: true
            },
            w: 4,
            h: 6
        },
        {
            type: 'transactions list',
            settings: {
                preview: true
            },
            w: 5,
            h: 7
        }
    ],
    text: [
        {
            type: 'text',
            settings: {
                text: 'i close my eyes and i see this image floating beside me'
            },
            w: 3,
            h: 2
        }
    ]
    
}

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
