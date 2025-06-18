import React from 'react'
import { ModeToggle } from '../mode-toggle'

const Navber = () => {
    return (
        <nav className='flex lg:justify-around justify-between px-4 py-4'>
            <div className='text-2xl font-bold text-green-500 dark:text-green-500 '>
                FinupsBD
            </div>
            <div className='text-2xl font-bold  dark:text-gray-200'>
                <ModeToggle />
            </div>
        </nav>
    )
}

export default Navber
