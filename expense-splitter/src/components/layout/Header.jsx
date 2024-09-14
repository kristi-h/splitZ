import React from 'react'
import IconButton from '../ui/IconButton'

export default function Header() {
  return (
    <div className='flex flex-col pt-16 pb-3 h-[200px] bg-accent text-white'>
            <h1 className='text-center text-[40px] uppercase font-extrabold'>Let's Split It</h1>
            <nav className='mt-auto mx-4'>
              <div className='flex justify-between gap-2'>
                <IconButton icon={'house'}>Home</IconButton>
                <IconButton icon={'people-group'}>Groups</IconButton>
                <IconButton icon={'address-book'}>Friends</IconButton>
                <IconButton icon={'credit-card'}>Expenses</IconButton>
              </div>
            </nav>
        </div>
  )
}
