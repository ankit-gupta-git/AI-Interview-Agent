import React from 'react'
import { useSelector } from 'react-redux'
import { FaUserAstronaut } from 'react-icons/fa'
import { RiRobot2Fill } from 'react-icons/ri'
import { BsCoin, BsPlusCircle } from 'react-icons/bs'
import { HiOutlineLogout } from 'react-icons/hi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { clearUser } from '../redux/userSlice'
import { ServerUrl } from '../App'
import AuthModel from './AuthModel'


function Navbar() {
  const { userData } = useSelector((state) => state.user)
  const [showCreditPopup, setShowCreditPopup] = useState(false)
  const [showUserPopup, setShowUserPopup] = useState(false)
  const [showAuthModel, setShowAuthModel] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await axios.get(`${ServerUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(clearUser())
      setShowUserPopup(false)
      setShowAuthModel(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='fixed top-0 left-0 w-full flex justify-center py-4 z-50 bg-[#f3f3f3]/80 backdrop-blur-md transition-all'>
        <div className='w-[90%] md:w-[80%] max-w-7xl flex items-center justify-between px-6 py-3 bg-white shadow-lg rounded-2xl border border-gray-100/50'>
          {/* Left Side: Logo and Title */}
          <div className='flex items-center gap-3'>
            <div className='bg-black p-1.5 rounded-lg'>
              <RiRobot2Fill className='text-white text-xl' />
            </div>
            <h1 className='font-bold text-lg tracking-tight text-gray-800'>InterviewIQ.AI</h1>
          </div>

          {/* Right Side: Credits and User Profile */}
          <div className='flex items-center gap-4 relative'>
            {/* Credits Display */}
            <div className='relative'>
              <button
                onClick={() => {
                  if (!userData) {
                    setShowAuthModel(true)
                    return
                  }
                  setShowCreditPopup(!showCreditPopup);
                  setShowUserPopup(false);
                }}
                className='flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 hover:bg-gray-100 transition-all cursor-pointer'
              >
                <BsCoin className='text-yellow-500 text-lg' />
                <span className='font-semibold text-gray-700 text-sm'>{userData?.credits || 0}</span>
              </button>

              {/* Credits Popup */}
              {showCreditPopup && (
                <div className='absolute right-0 mt-3 w-64 bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-3xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200'>
                  <p className='text-gray-500 text-left text-[15px] leading-snug mb-5 font-medium'>
                    Need more credits to continue interviews?
                  </p>
                  <button
                    onClick={() => { navigate('/pricing'); setShowCreditPopup(false); }}
                    className='w-full py-3.5 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-900 transition-colors cursor-pointer shadow-lg'
                  >
                    Buy more credits
                  </button>
                </div>
              )}
            </div>

            {/* User Profile / Avatar */}
            <div className='relative'>
              <div
                onClick={() => {
                  setShowUserPopup(!showUserPopup);
                  setShowCreditPopup(false);
                }}
                className='h-10 w-10 bg-black rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-gray-900 transition-all shadow-sm'
              >
                {userData ? (
                  <span className='font-bold text-sm'>
                    {(userData?.name || '').slice(0, 1).toUpperCase()}
                  </span>
                ) : (
                  <FaUserAstronaut size={18} />
                )}
              </div>

              {/* User Popup */}
              {showUserPopup && (
                <div className='absolute right-0 mt-3 w-48 bg-white border border-gray-100 shadow-xl rounded-2xl py-4 px-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200'>
                  {userData ? (
                    <div className='flex flex-col gap-3'>
                      <h2 className='text-[#4B8EE3] font-semibold text-lg leading-tight truncate'>{userData.name}</h2>

                      <button
                        onClick={() => { navigate('/history'); setShowUserPopup(false); }}
                        className='text-gray-400 text-left text-sm hover:text-gray-600 transition-colors font-medium'
                      >
                        InterView History
                      </button>

                      <button
                        onClick={handleLogout}
                        className='flex items-center gap-2 text-[#D35F5F] text-sm font-medium hover:text-red-700 transition-colors mt-1'
                      >
                        <HiOutlineLogout className='text-lg' />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setShowAuthModel(true); setShowUserPopup(false); }}
                      className='w-full py-2 text-center text-sm font-bold bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
                    >
                      Login / Sign Up
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAuthModel && <AuthModel onClose={() => setShowAuthModel(false)} />}
    </>
  )
}

export default Navbar