import React from 'react'
import { getPageIndices } from '../utils/utils'

const PaginationBtns = ({numSize, pageCount, currentPageIndex, setCurrentPageIndex}) => {
    const pageIndices = getPageIndices(currentPageIndex, pageCount)

  return (
    <div className={`flex gap-4 justify-center`}
    style={{
        fontSize: `${numSize}cqw`
    }}>
        <button className='w-6 cursor-pointer' onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex-1))}>
            &lt;
        </button>

        <div className='w-1/2 flex gap-4 justify-center mx-2'>
            { pageIndices.map((ind, index) => {
                if (ind === 'ellipsis') {
                        return <span className='cursor-none' key={index}>...</span>
                    }
                    return <button className={`cursor-pointer hover:text-purple-800 ${ind === currentPageIndex ? 'underline' : ''}`} key={index} onClick={() => setCurrentPageIndex(ind)}>
                        {ind+1}
                    </button>
                })
            }
               </div>
               
            <button className='w-6 cursor-pointer' onClick={() => setCurrentPageIndex(Math.min(pageCount-1, currentPageIndex+1))}>
                   &gt;
               </button>
           </div>
  )
}

export default PaginationBtns
