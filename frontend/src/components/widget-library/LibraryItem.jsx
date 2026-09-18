import React from 'react'
import { widgetTypes } from '../../config/widgetTypes'
import { useDraggable } from '@dnd-kit/react'
import { globalColors, resolveWidgetColors } from '../../utils/colors/widgetColors'
import { ColorVarsContext } from '../../context/context'


const LibraryItem = ({id, type, settings, w, h, pixelSize}) => {

  const {ref} = useDraggable({
    id,
    data: {
      type: 'library-widget',
      widget: {
        type,
        settings,
        w,
        h
      }
    }
  })
  const Component = widgetTypes[type]
  const style = pixelSize ? { width: pixelSize.width, height: pixelSize.height} 
    : { width: `${w * 8}cqw`, height: `${h * 8}cqw`}

  const resolvedColors = resolveWidgetColors(type, {}, globalColors)
  const colorVars = Object.fromEntries(
      Object.entries(resolvedColors).map(([key, color]) => [`--w-${key}`, color])
     )

  return (
    <div ref={ref} style={style} >
      <ColorVarsContext.Provider value={colorVars}>
        <Component {...settings} />
      </ColorVarsContext.Provider>
    </div>
  )
}

export default React.memo(LibraryItem)
