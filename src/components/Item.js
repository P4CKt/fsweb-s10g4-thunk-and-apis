import React from 'react'


function Item({ data }) {
  return (
    <div className='shadow-md bg-[#FFFBF5] text-center border-solid border-[4px] rounded-xl'>
      <p className='text-2xl p-10'>{data.fact}</p>
      <p className='text-2xl p-10'>{data.length}</p>
    </div>
  )
}

export default Item