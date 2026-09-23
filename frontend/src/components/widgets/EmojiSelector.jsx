import React, { useMemo, useState } from 'react'
import { emojiCategories } from '../../data/emojiCategories'
import { Carrot, CircleCheck, FaceSlightlySmiling, Flag, Lightbulb, PlaneTakeoff, Sprout, User, Volleyball } from 'lucide-react'
import { autoUpdate, useFloating } from '@floating-ui/react'

const EmojiSelector = ({onChoose}) => {
    const [category, setCategory] = useState('smileys & emotion')
    const emojis = useMemo(() => emojiCategories.find(cat => cat.name === category), [emojiCategories, category])

    const {refs, floatingStyles} = useFloating({
      placement: 'bottom-start',
      strategy: 'fixed',
      whileElementsMounted: autoUpdate
    })
    

  return (
    <div
    ref={refs.setFloating}
    style={floatingStyles}
    className='z-60'>
      <div className='bg-white border rounded-md w-60 h-60 flex flex-col overflow-hidden'>
        <div className='flex justify-between bg-black px-2 py-1 text-amber-200'>
            <FaceSlightlySmiling className='size-4' onClick={() => setCategory('smileys & emotion')}/>
            <User className='size-4' onClick={() => setCategory('people & body')} />
            <Sprout className='size-4' onClick={() => setCategory('animals & nature')} />
            <Carrot className='size-4'onClick={() => setCategory('food & drink')} />
            <PlaneTakeoff className='size-4' onClick={() => setCategory('travel & places')}/>
            <Volleyball className='size-4' onClick={() => setCategory('activities')}/>
            <Lightbulb className='size-4' onClick={() => setCategory('objects')}/>
            <CircleCheck className='size-4' onClick={() => setCategory('symbols')}/>
            <Flag className='size-4' onClick={() => setCategory('flags')} />
        </div>

        <div className='flex-1 px-1 py-3 grid grid-cols-[repeat(auto-fit,24px)] justify-center gap-1 overflow-y-auto text-lg'>
            {emojis.emojis.map(emoji => {
                return (
                    <button key={emoji} className='hover:bg-fuchsia-200 rounded-xs' onClick={() => onChoose(emoji)}>{emoji}</button>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default EmojiSelector