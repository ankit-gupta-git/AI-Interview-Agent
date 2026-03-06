import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IoClose } from 'react-icons/io5'
import Auth from '../pages/Auth'

function AuthModel({ onClose }) {
    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        if (userData) {
            onClose();
        }
    }, [userData, onClose])

    return (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-4 transition-all duration-300'>
            <div className='relative w-full max-w-md transform transition-all'>
                {/* Close button positioned to be part of the Auth card's corner */}
                <button
                    onClick={onClose}
                    className='absolute top-6 right-6 z-[101] text-gray-400 hover:text-black transition-colors cursor-pointer'
                >
                    <IoClose size={24} />
                </button>
                <Auth isModel={true} />
            </div>
        </div>
    )
}

export default AuthModel