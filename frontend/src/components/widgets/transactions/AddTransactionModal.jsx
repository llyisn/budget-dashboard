import React, { useRef, useState } from 'react'
import { motion } from 'motion/react'
import EmojiSelector from '../EmojiSelector'
import { useTransactionContext } from '../../../context/TransactionsContext'
import { useGridMetrics } from '../../../context/GridMetricsContext'

const CURRENCY = '$'
const WIDTH = 4
const HEIGHT = 5

const AddTransactionModal = ({onCancel, setAddTxWidget}) => {
  const {addTransaction} = useTransactionContext()
//transaction: id, type, amount, currency, description, date, user_id, saving_id, category_id
 //{ id: 1, label: "pizza", type: "expense", amount: 49.99, currency: "$", date: "2026-09-01", category: "food", icon: "🍕" },
  const { getPixelSize } = useGridMetrics()
  const style = getPixelSize(WIDTH, HEIGHT)

  const [type, setType] = useState('')
  const [date, setDate] = useState(new Date())
  const [openEmojiSelector, setOpenEmojiSelector] = useState(false)
  const [icon, setIcon] = useState('🍎')

  const dataRef = useRef({
    name: '',
    amount: '',
    category: '',
    notes: ''
  })

  const [errors, setErrors] = useState({})
  
  function clearError(field) {
    setErrors(prev => {
      const { [field]: _, ...rest } = prev
      return rest
    })
  }

  function handleAddTx() {
    const amount = Number(dataRef.current.amount)
    const newErrors = {}
    // rules
    if (!type.trim()) newErrors.type = 'fill this in'
    if (!dataRef.current.amount || !Number.isFinite(amount) || amount <= 0) {
      newErrors.amount = 'enter an amount >0'
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return false



    const transaction = {
      id: crypto.randomUUID(),
      type,
      amount,
      currency: CURRENCY,
      description: dataRef.current.notes,
      date: toDateInputValue(date),
      category: dataRef.current.category,
      icon,
      label: dataRef.current.name
    }

    addTransaction(transaction)

    return true
  }



  function handleChange(field, value) {
    dataRef.current[field] = value
  }

  return (
    <div 
    className='fixed inset-0 z-60 pointer-events-none flex items-center justify-center'>
      <motion.div
      style={style}
      className='pointer-events-auto  bg-white border rounded-md
      @container
      '
      drag
      dragMomentum={false}>
        <div className='flex justify-between px-2 text-2xl'>
          {/* CANCEL */}
          <button onClick={onCancel} className='cursor-pointer'>×</button>
          
          {/* SAVE */}
          <button className='cursor-pointer' onClick={() => {
            if (handleAddTx()) {
              setAddTxWidget(false)
            }
          }}>✓</button>
        </div>

        <div className='mx-4 my-2 text-[6cqw]'>
          <div className={` flex items-center text-[12cqw] ${errors.amount ? '-mb-2' : 'mb-2'}`}>
            {/* icon */}
            <div className='relative'>
              <p className='mr-3' onClick={() => setOpenEmojiSelector(prev => !prev)}>{icon}</p>
              {openEmojiSelector && (
                <EmojiSelector onChoose={emoji => {
                  setIcon(emoji)
                  setOpenEmojiSelector(false)
                }} />
              )}
            </div>
            
            
            {/* + or - , or nothing*/}
            <span>
              {type === 'expense' || type === 'savings' ? '-' : (
                type === 'income' ? '+' : ''
              )}
            </span> 

            <span>{CURRENCY}</span>

            {/* AMOUNT FIELD */}
            <input type="text" className=' outline-none w-30' onChange={e => {
              handleChange('amount', e.target.value)
              clearError('amount')
              }}/>

            
          </div>
          {errors.amount && (
             <span className='block mb-2 text-red-900/50'>{errors.amount}</span>
          )}
          
          {/* ---FIELDS--- */}

          {/* NAME FIELD */}
          <div className='flex items-center gap-3'>
            <label>name:</label>
            <input type="text" className=' outline-none h-5' onChange={e => {
              handleChange('name', e.target.value)
              }} />
          </div>
          <hr className='my-1' />

          {/* TYPE FIELD */}
          <div className='flex items-center gap-3'>
            <label>type:</label>
            <input type="text" className={`outline-none h-5 ${errors.type ? 'placeholder:text-red-900/50' : ''}`}  onChange={e => {
              setType(e.target.value)
              clearError('type')
              }} 
              placeholder={errors.type ?? ''}/>
          </div>
          <hr className='my-1' />
        
          {/* CATEGORY FIELD */}
          <div className='flex items-center gap-3'>
            <label>category:</label>
            <input type="text" className=' outline-none h-5' onChange={e => handleChange('category', e.target.value)} />
          </div>
          <hr className='my-1' />
          
          {/* DATE FIELD */}
          <div className='flex items-center gap-3'>
            <label>date:</label>
            <input type="text" className=' outline-none h-5' defaultValue={formatDate(date)} />
          </div>
          <hr className='my-1' />

          {/* NOTES FIELD */}
          <div className='flex items-base gap-3'>
            <label>notes:</label>
            <textarea className='outline-none resize-none h-35' onChange={e => handleChange('notes', e.target.value)} />
          </div>
          
        </div>
      </motion.div>
    </div>
  )
}

export default AddTransactionModal

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth()+1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

function toDateInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}