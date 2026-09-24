import React, { useRef, useState } from 'react'
import { motion } from 'motion/react'
import EmojiSelector from '../EmojiSelector'
import { useTransactionContext } from '../../../context/TransactionsContext'
import { useGridMetrics } from '../../../context/GridMetricsContext'
import { Trash } from 'lucide-react'

const CURRENCY = '$'
const WIDTH = 4
const HEIGHT = 5



//todo: search for type and category (filtered on type) -- select existing or create new. assign color
const TransactionModal = ({transaction, onCancel}) => {
  const {addTransaction, updateTransaction, deleteTransaction} = useTransactionContext()
//transaction: id, type, amount, currency, description, date, user_id, saving_id, category_id
 //{ id: 1, label: "pizza", type: "expense", amount: 49.99, currency: "$", date: "2026-09-01", category: "food", icon: "🍕" },
  const { getPixelSize } = useGridMetrics()
  const style = getPixelSize(WIDTH, HEIGHT)

  const [type, setType] = useState(transaction?.type ?? '')
  const [date, setDate] = useState(transaction ? parseTransactionDate(transaction.date) : new Date())
  const [openEmojiSelector, setOpenEmojiSelector] = useState(false)
  const [icon, setIcon] = useState(transaction?.icon ?? '🍎')

  const dataRef = useRef({
    name: transaction?.label ?? '',
    amount: transaction?.amount.toString() ?? '',
    category: transaction?.category ?? '',
    notes: transaction?.description ?? ''
  })

  const [errors, setErrors] = useState({})
  
  function clearError(field) {
    setErrors(prev => {
      const { [field]: _, ...rest } = prev
      return rest
    })
  }

  function handleSave() {
    const amount = Number(dataRef.current.amount)
    const newErrors = {}
    // rules
    if (!type.trim()) newErrors.type = 'fill this in'
    if (!dataRef.current.amount || !Number.isFinite(amount) || amount <= 0) {
      newErrors.amount = 'enter an amount >0'
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return false

    const changes = {
      type,
      amount,
      currency: CURRENCY,
      description: dataRef.current.notes,
      date: toDateInputValue(date),
      category: dataRef.current.category,
      icon,
      label: dataRef.current.name
    }

    if (transaction) {
      updateTransaction(transaction.id, changes)
    } else {
      //new
      addTransaction({
        id: crypto.randomUUID(),
        ...changes
      })
    }
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
          {/* CANCEL & DELETE */}
          <div className='flex gap-2 items-center'>
            <button onClick={onCancel} className='cursor-pointer translate-y-0.5'>×</button>
            <Trash size={16} className='cursor-pointer' onClick={() => {
              deleteTransaction(transaction.id)
              onCancel()
              }}/>
          </div>
          
          
          {/* SAVE */}
          <button className='cursor-pointer text-xl' onClick={() => {
            if (handleSave()) {
              onCancel()
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
              }}
              defaultValue={dataRef.current.amount}/>

            
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
              }} 
              defaultValue={dataRef.current.name}/>
          </div>
          <hr className='my-1' />

          {/* TYPE FIELD */}
          <div className='flex items-center gap-3'>
            <label>type:</label>
            <input type="text" className={`outline-none h-5 ${errors.type ? 'placeholder:text-red-900/50' : ''}`}  onChange={e => {
              setType(e.target.value)
              clearError('type')
              }} 
              placeholder={errors.type ?? ''}
              defaultValue={type}/>
          </div>
          <hr className='my-1' />
        
          {/* CATEGORY FIELD */}
          <div className='flex items-center gap-3'>
            <label>category:</label>
            <input type="text" className=' outline-none h-5' onChange={e => handleChange('category', e.target.value)}
            defaultValue={dataRef.current.category} />
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
            <textarea className='outline-none resize-none h-35' onChange={e => handleChange('notes', e.target.value)}
            defaultValue={dataRef.current.notes} />
          </div>
          
        </div>
      </motion.div>
    </div>
  )
}

export default TransactionModal

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

function parseTransactionDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)

  return new Date(year, month - 1, day)
}