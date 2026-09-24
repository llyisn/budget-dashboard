import React, { useMemo, useRef, useState } from 'react'
import { useGridMetrics } from '../../../context/GridMetricsContext'
import { useTransactionContext } from '../../../context/TransactionsContext'
import { countStat, filteredTransactions } from '../../../utils/transactionsUtils'
import TransactionRow from '../transactions/transaction-list/TransactionRow'
import EmojiSelector from '../EmojiSelector'
import CategoryMenu from './CategoryMenu'
import { useBudgetContext } from '../../../context/BudgetContext'
import { useClickOutside } from '../../../hooks/useClickOutside'

const HEIGHT = 5
const WIDTH = 4
const CURRENCY = '$'


function validateBudget(budget) {
  const errors = {}

  if (Number.isNaN(Number(budget.limit)) || Number(budget.limit) <= 0) errors.limit = true
  if (budget.categories.length === 0) errors.categories = true

  return errors
}

const BudgetSettings = ({selectedBudgetId, onSelectBudget, onClose}) => {
  //UI
  const { getPixelSize } = useGridMetrics()
  const style = getPixelSize(WIDTH, HEIGHT)

  //DATA (no preview, popup for existing budget widget)
  const { transactions } = useTransactionContext()
  //sort by date desc
  const sortedTransactions = useMemo(() => transactions.toSorted((a,b) => b.date.localeCompare(a.date)), [transactions]) 


  //saved/existing budgets
  const {budgets, deleteBudget, addBudget, updateBudget} = useBudgetContext()

  const [drafts, setDrafts] = useState({})
  const [newBudgetDraft, setNewBudgetDraft] = useState(null) //uses id '__new__'
  const [editBudgetId, setEditBudgetId] = useState(null)

  //for "show transactions" option
  const [showTranId, setShowTranId] = useState(null)

  const [emojiSelectorId, setEmojiSelectorId] = useState(false)
  const [categoryMenuId, setCategoryMenuId] = useState(null)

  const [errors, setErrors] = useState({})

  //create a draft when budget is edited (start)
  function createDraft(budgetId, changes = {}) {
    setDrafts(prev => {
      if (prev[budgetId]) return {...prev,
        [budgetId]: {...prev[budgetId], ...changes}
      }

      const budget = budgets.find(b => b.id === budgetId)
      if (!budget) return prev

      return {...prev, [budgetId]: {...budget, ...changes, categories: changes.categories ?? [...budget.categories]}}
    })
  }
  
  //save draft, changes
  function finishExistingBudget(budgetId) {
    const draft = drafts[budgetId]
    if (!draft) return 

    //validate draft
    const newErrors = validateBudget(draft)

    //invalid
    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({...prev, [budgetId]: newErrors}))
      return false
    }

    //valid
    const savedBudget = {...draft, limit: Number(draft.limit)}
    updateBudget(budgetId, savedBudget)

    //clean
    setDrafts(prev => {
      const {[budgetId]: _, ...rest} = prev
      return rest
    })
    setErrors(prev => {
      const {[budgetId]: _, ...rest} = prev
      return rest
    })
    return true
  }


//validate + save new budget
  function finishNewBudget() {
    if (!newBudgetDraft) return true

    //validate
    const newErrors = validateBudget(newBudgetDraft)

    // invalid
    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({...prev, __new__: newErrors}))
      return false
    }

    //valid
    const newBudget = {
      ...newBudgetDraft,
      id: crypto.randomUUID(),
      limit: Number(newBudgetDraft.limit)
    }

    addBudget(newBudget)

    //clean
    setNewBudgetDraft(null)
    setErrors(prev => {
      const {__new__: _, ...rest } = prev
      return rest
    })

    return true
  }

  //changes are saved when user switches their focus on another budget (or on other thing)
    function switchBudget(nextId) {
    if (nextId === editBudgetId) return

    if (editBudgetId === '__new__') finishNewBudget()
    else if (editBudgetId) finishExistingBudget(editBudgetId)

    if (nextId === null) {
      setEditBudgetId(null)
      return
    }

    //new budget
    if (nextId === '__new__') {
      if (!newBudgetDraft) {
        setNewBudgetDraft({
          id: '__new__',
          name: 'name',
          period: 'month',
          limit: 0,
          categories: [],
          icon: 'i',
        })
      }
      setEditBudgetId('__new__')
      return 
    }

    // existing budget
    createDraft(nextId)
    setEditBudgetId(nextId)
  }

function updateDraft(budgetId, changes) {
  setDrafts(prev => {
    const draft = prev[budgetId]

    if (!draft) {
      const savedBudget = budgets.find(b => b.id === budgetId)
      if (!savedBudget) return prev

      const newDraft = {
        ...savedBudget,
        categories: [...savedBudget.categories],
      }

      const updated =
        typeof changes === 'function'
          ? changes(newDraft)
          : changes

      return {
        ...prev,
        [budgetId]: {
          ...newDraft,
          ...updated,
        },
      }
    }

    const updated =
      typeof changes === 'function'
        ? changes(draft)
        : changes

    return {
      ...prev,
      [budgetId]: {
        ...draft,
        ...updated,
      },
    }
  })
}

  function updateNewBudget(changes) {
    setNewBudgetDraft(prev => ({
      ...prev, ...changes
    }))
  }

  function clearError(budgetId, field) {
      setErrors(prev => {
        const budgetErrors = prev[budgetId]
        if (!budgetErrors) return prev

        const {[field]: _, ...remainingErrors} = budgetErrors

        if (Object.keys(remainingErrors).length === 0) {
          const {[budgetId]: _, ...rest} = prev
          return rest
        }

        return {...prev, [budgetId]: remainingErrors}
      })
  }

  function changeEmoji(budgetId, emoji) {
    updateDraft(budgetId, { icon: emoji })
    setEmojiSelectorId(null) //close it
  }

  function changeName(budgetId, value) {
    updateDraft(budgetId, { name: value})
  }

  function changeLimit(budgetId, value) {
    updateDraft(budgetId, { limit: value })
    clearError(budgetId, 'limit')
  }

  function changePeriod(budgetId, value) {
    updateDraft(budgetId, { period: value })
  }

function addCategory(budgetId, cat) {
  updateDraft(budgetId, prevDraft => ({
    categories: [...prevDraft.categories, cat],
  }))

  clearError(budgetId, 'categories')
}

function deleteCategory(budgetId, cat) {
  updateDraft(budgetId, prevDraft => ({
    categories: prevDraft.categories.filter(c => c !== cat)
  }))
}
  
  function handleDelete(budgetId) {
    deleteBudget(budgetId)

    setDrafts(prev => {
      const {[budgetId]: _, ...rest} = prev
      return rest
    })

    setErrors(prev => {
      const {[budgetId]: _, ...rest} = prev
      return rest
    })

    if (editBudgetId === budgetId) setEditBudgetId(null)
    if (categoryMenuId === budgetId) setCategoryMenuId(null)
    if (emojiSelectorId === budgetId) setEmojiSelectorId(null)
  }

  const tranList = useMemo(() => {
    if (!showTranId) return []

    const savedBudget = budgets.find(budget => budget.id === showTranId)
    if (!savedBudget) return []

    const budget = drafts[showTranId] ?? savedBudget

    return filteredTransactions(sortedTransactions, {category: budget.categories}, budget.period)
  }, [sortedTransactions, showTranId, budgets, drafts])

  const settingsRef = useRef(null)
  useClickOutside(settingsRef, () => {
      if (editBudgetId) {
        switchBudget(null)
        return
      }
      onClose()
    }, true)
  
  
  return (
    <div
    ref={settingsRef}
    style={{...style,
      top: getPixelSize(1, 1) 
    }}
    className='flex flex-col absolute z-45 left-0 bg-white border rounded-md @container px-4 py-2'>
      {/* TITLE */}
      <span className='text-[10cqw]'>budget</span>

      <div className='flex-1 overflow-scroll'>
      {budgets.map(savedBudget => {
        //the budget shows a draft ?? last saved version
        const budget = drafts[savedBudget.id] ?? savedBudget
        const budgetErrors = errors[savedBudget.id] ?? {}
        
        //for progress bar
        const now = countStat(sortedTransactions, {category: budget.categories}, budget.period)

        const numericLimit = Number(budget.limit)
        const valueRatio = numericLimit > 0
          ? Math.min(now / numericLimit, 1)
          : 0
        
      
        return (
          <React.Fragment key={savedBudget.id}>
          <div className='flex justify-between text-[6cqw]'>
              <div className='flex gap-1 items-center'>
                <button
                  onClick={() => onSelectBudget(savedBudget.id)}
                  className={selectedBudgetId === savedBudget.id ? 'text-black' : ''}
                >
                  {selectedBudgetId === savedBudget.id ? '✓' : '○'}
                </button>

                {/* ICON */}
                <div className='relative'>
                  <span 
                  className={`${budget.icon === 'i' ? ' px-2 py-0.5 border rounded-full' : ''}`}
                  onClick={() => {
                    switchBudget(savedBudget.id)
                    setEmojiSelectorId(prev => prev === budget.id ? null : budget.id)
                  }}
                  >{budget.icon}</span>


                  {emojiSelectorId === savedBudget.id && (
                    <EmojiSelector onChoose={emoji => changeEmoji(savedBudget.id, emoji) }/>
                  )}
                </div>


                {/* NAME */}
                <input type="text" className='h-[1.2em] w-17 p-0 outline-none'
                value={budget.name}

                onFocus={() => {
                  switchBudget(savedBudget.id)
                }}

                onChange={e => {
                  switchBudget(savedBudget.id)
                  changeName(savedBudget.id, e.target.value)}}
                />
              </div>

                
              <div>
                {/* PERIOD SELECT */}
                <select className='appearance-none outline-none underline' dir='rtl'
                value={budget.period} 
                
                onFocus={() => {
                  switchBudget(savedBudget.id)
                }}
                
                onChange={e => {
                  switchBudget(savedBudget.id)
                  changePeriod(savedBudget.id, e.target.value)
                }}>
                  <option value="year">year</option>
                  <option value="month">.mo</option>
                  <option value="week">week</option>
                  <option value="day">daily</option>
                </select>

                {/* LIMIT */}
                <span className={`${budgetErrors.limit ? 'text-red-900' : ''}`}> limit: {CURRENCY}</span>


                <input type="text" 
                
                className={`border-b h-[1.2em] w-12 p-0 outline-none ${budgetErrors.limit ? 'text-red-900' : ''}`}

                value={budget.limit}

                onFocus={() => {
                  switchBudget(savedBudget.id)
                }}

                onChange={e => {
                  switchBudget(savedBudget.id)
                  changeLimit(savedBudget.id, e.target.value)
                }}
                />
              </div>

             
            </div>
             {/* PROGRESS BAR */}
            <div className='h-2 w-full border rounded-xs'>
                <div 
                className={`bg-black w-(--value-ratio) h-full rounded-l-xs
                ${valueRatio === 1 ? 'rounded-r-xs' : ''}`}

                style={{'--value-ratio': `${valueRatio * 100}%`}}/>
            </div>

            {/* CATEGORIES */}
            <CategoryMenu
            onDelete={cat => {
              switchBudget(savedBudget.id)
              deleteCategory(savedBudget.id, cat)}}

            onAdd={cat => {
              switchBudget(savedBudget.id)
              addCategory(savedBudget.id, cat)
            }}
            categories={budget.categories}

            categoryChosen={budget.categories.length > 0} 
            
            open={categoryMenuId === savedBudget.id}
            
            onOpen={open => {
              switchBudget(savedBudget.id)
              setCategoryMenuId(open ? null : savedBudget.id)
            }} 

            error={!!budgetErrors.categories}/>

            

            {/* SHOW TRANSACTIONS & DELETE */}
        <div className='flex justify-between text-[5cqw] text-black/40'>

              <button onClick={() => setShowTranId(prev => prev === budget.id ? null : budget.id)}
              className='cursor-pointer'
              >
                {showTranId === budget.id ? 
                'hide transactions' : 
                'show transactions'}
              </button>
            
              
              
              <button 
              onClick={() => handleDelete(savedBudget.id)}
              className='cursor-pointer'>delete</button>
        </div>

        {showTranId === budget.id && (
          <div className='max-h-[60%] w-full border p-3 mb-3 overflow-scroll'>
            {tranList.map((row, rowIndex) => {
              const isSameDay = rowIndex > 0 && row.date === tranList[rowIndex-1].date

              return (
                <div key={row.id}>
                  {!isSameDay && (
                    <div>
                      <time dateTime={row.date}>{row.date}</time>
                    </div>
                  )}

                  <TransactionRow row={row} detailed={false}/>
                </div>
              )
            })}
          </div>
        )}
          </React.Fragment>
            
        )
      })}


    {/* NEW BUDGET */}
      {newBudgetDraft && (
        <div>
          <div className='flex justify-between text-[6cqw]'>
            <div className='flex gap-1 items-center'>
              {/* ICON */}
              <div className='relative'>
                <span
                  className={newBudgetDraft.icon === 'i' ? 'px-2 py-0.5 border rounded-full' : ''}

                  onClick={() =>
                    {
                      switchBudget('__new__')
                      setEmojiSelectorId(prev =>
                      prev === '__new__' ? null : '__new__')}}
                >
                  {newBudgetDraft.icon}
                </span>

                {emojiSelectorId === '__new__' && (
                  <EmojiSelector
                    onChoose={emoji => {
                      updateNewBudget({icon: emoji})
                      setEmojiSelectorId(null)
                    }}
                  />
                )}

              </div>
              {/* NAME */}
              <input
                type='text'
                className='h-[1.2em] w-20 p-0 outline-none'
                value={newBudgetDraft.name}

                onFocus={() => {
                  switchBudget('__new__')
                }}

                onChange={e => {
                  switchBudget('__new__')
                  updateNewBudget({name: e.target.value})}
                }
              />
            </div>
            <div>
              {/* PERIOD */}
              <select
                className='appearance-none outline-none underline'
                dir='rtl'
                value={newBudgetDraft.period}

                onFocus={() => {
                  switchBudget('__new__')
                }}

                onChange={e => {
                  switchBudget('__new__')
                  updateNewBudget({period: e.target.value})}
                }
              >
                <option value='year'>year</option>
                <option value='month'>.mo</option>
                <option value='week'>week</option>
                <option value='day'>daily</option>
              </select>

              {/* LIMIT */}
              <span className={errors.__new__?.limit ? 'text-red-900' : ''}>
                limit: {CURRENCY}
              </span>


              <input
                type='text'
                className={`border-b h-[1.2em] w-12 p-0 outline-none
                ${errors.__new__?.limit ? 'text-red-900' : ''}`}

                value={newBudgetDraft.limit}

                onFocus={() => {
                  switchBudget('__new__')
                }}

                onChange={e => { 
                  switchBudget('__new__')
                  updateNewBudget({limit: e.target.value})
                  clearError('__new__', 'limit')
                }}
              />
            </div>
          </div>


          {/* CATEGORIES */}
          <CategoryMenu
            categories={newBudgetDraft.categories}

            categoryChosen={newBudgetDraft.categories.length > 0}

            open={categoryMenuId === '__new__'}

            onOpen={open => {
              switchBudget('__new__')
              setCategoryMenuId(open ? null : '__new__')
            }}

            onAdd={cat => {
              if (newBudgetDraft.categories.includes(cat)) return

              updateNewBudget({
                categories: [
                  ...newBudgetDraft.categories,
                  cat,
                ],
              })

              clearError('__new__', 'categories')
            }}

            onDelete={cat => {
              updateNewBudget({ categories:
                  newBudgetDraft.categories.filter(c => c !== cat)})
            }}

            error={!!errors.__new__?.categories}
          />


          {/* NEW BUDGET ACTION */}
          <div className='flex justify-end text-[5cqw] text-black/40'>

            <button
              className='cursor-pointer'
              onClick={() => {
                setNewBudgetDraft(null)
                setErrors(prev => {
                  const {__new__: _, ...rest} = prev
                  return rest
                })

                setEditBudgetId(null)
                setCategoryMenuId(null)
                setEmojiSelectorId(null)
              }}
            >
              delete
            </button>

          </div>

        </div>
      )}

      {!newBudgetDraft && (
        <button
          className='text-[8cqw]'
          onClick={() => switchBudget('__new__')}
        >
          +
        </button>
      )}
      </div>
    </div>
  )
}

export default BudgetSettings
