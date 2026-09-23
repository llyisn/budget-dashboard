import React, { useContext, useImperativeHandle, useRef, useState } from 'react'
import { ColorVarsContext } from '../../context/context'

// drag and drop doesnt work
const ImageWidget = ({isEditMode, ref, widgetId}) => {
  const colorVars = useContext(ColorVarsContext)
  const [img, setImg] = useState(null)
  const inputId = `image-upload-${widgetId}`

  function handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()

    if (!isEditMode) return

    const file = e.dataTransfer.files[0]
    
    if (!file) return 
    const imgUrl = URL.createObjectURL(file)
    setImg(imgUrl)
  }

  function handleChange(e) {
    const file = e.target.files[0]
    
    if (!file) return 
    const imgUrl = URL.createObjectURL(file)
    setImg(imgUrl)
  }

  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    changeImage() {
      if (!isEditMode) return 
      inputRef.current?.click()
    }
  }), [isEditMode])

  return (
    <div 
    style={colorVars}
    className='
    border border-(--w-border)
    size-full rounded-md
      flex justify-center items-center overflow-hidden'
      
      onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}>
        <input 
          ref={inputRef}
          id={inputId}
          type="file"  accept='.png,.jpg,.jpeg,.gif' hidden
          onChange={handleChange} disabled={!isEditMode} />

        {!img ? (
          <label data-drag-ignore  htmlFor={inputId} className='size-[90%]'
        >
          
          <div className='flex h-full items-center justify-center'>
            <span>upload image</span>
          </div>
        </label>
        ) : (
          <img className='min-h-full min-w-full shrink-0' src={img} alt="uploaded image" draggable={false} />
        )}

    </div>
  )
}

export default ImageWidget
