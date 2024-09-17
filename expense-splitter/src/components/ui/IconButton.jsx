import React from 'react'

export default function IconButton({children, icon}) {
    const iconType = `fa-${icon}`
  return (
        <button className='flex flex-col text-white rounded-lg w-full max-w-[96px] h-[64px] py-[0.16rem] items-center mx-auto hover:bg-white hover:text-primary transition-all'>
            <i className={`fa-solid ${iconType} text-2xl`}></i>
            <div className='text-[18px] font-semibold'>{children}</div>
        </button>
  )
}
