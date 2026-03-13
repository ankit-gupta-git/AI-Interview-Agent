import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUserAstronaut } from 'react-icons/fa'
import { RiRobot2Fill } from 'react-icons/ri'
import { BsCoin } from 'react-icons/bs'
import { HiOutlineLogout } from 'react-icons/hi'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { clearUser } from '../redux/userSlice'
import { ServerUrl } from '../App'
import AuthModel from './AuthModel'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const { userData } = useSelector((state) => state.user)
  const [showCreditPopup, setShowCreditPopup] = useState(false)
  const [showUserPopup, setShowUserPopup] = useState(false)
  const [showAuthModel, setShowAuthModel] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await axios.get(`${ServerUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(clearUser())
      setShowUserPopup(false)
      setShowAuthModel(true)
      setIsMobileMenuOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Interview', path: '/interview' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'History', path: '/history' },
  ]

  return (
    <>
      <div className={`fixed top-0 left-0 w-full flex justify-center py-4 z-50 transition-all duration-500 ${scrolled ? 'translate-y-0' : 'translate-y-2'}`}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`w-[95%] md:w-[85%] max-w-7xl flex items-center justify-between px-4 md:px-6 py-3 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/5' : 'bg-white/40 backdrop-blur-md shadow-lg shadow-black/2'
            } rounded-[2rem] border border-white/20`}
        >
          {/* Left Side: Logo and Title */}
          <div
            onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
            className='flex items-center gap-2 md:gap-3 cursor-pointer group'
          >
            <div className='bg-black p-1.5 md:p-2 rounded-xl group-hover:scale-110 transition-transform duration-300'>
              <RiRobot2Fill className='text-white text-lg md:text-xl' />
            </div>
            <h1 className='font-black text-lg md:text-xl tracking-tight text-gray-900 group-hover:text-emerald-600 transition-colors'>
              Interview<span className='text-emerald-500'>IQ</span>
            </h1>
          </div>

          {/* Center: Desktop Navigation */}
          <div className='hidden lg:flex items-center gap-8'>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`text-sm font-black uppercase tracking-widest transition-colors ${location.pathname === link.path ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-900'}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Side: Credits and User Profile */}
          <div className='flex items-center gap-2 md:gap-4 relative'>
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
                className='flex items-center gap-1.5 md:gap-2 bg-emerald-50/50 px-3 md:px-4 py-2 md:py-2.5 rounded-full border border-emerald-100/50 hover:bg-emerald-100 transition-all cursor-pointer'
              >
                <BsCoin className='text-emerald-600 text-base md:text-lg' />
                <span className='font-black text-emerald-900 text-xs md:text-sm'>{userData?.credits || 0}</span>
              </button>

              {/* Credits Popup */}
              <AnimatePresence>
                {showCreditPopup && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className='absolute right-0 mt-4 w-64 md:72 bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-[2.5rem] p-6 md:p-8 z-50 overflow-hidden'
                  >
                    <div className='absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-3xl -mr-12 -mt-12' />
                    <p className='text-gray-500 text-left text-xs md:text-sm leading-relaxed mb-6 font-medium relative z-10'>
                      Unlock more full-length AI interviews with extra credits.
                    </p>
                    <button
                      onClick={() => { navigate('/pricing'); setShowCreditPopup(false); }}
                      className='w-full py-3.5 md:py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs md:text-sm hover:bg-emerald-700 transition-all cursor-pointer shadow-xl shadow-emerald-600/20 active:scale-95 relative z-10'
                    >
                      Top Up Credits
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile / Avatar */}
            <div className='relative hidden sm:block'>
              <div
                onClick={() => {
                  setShowUserPopup(!showUserPopup);
                  setShowCreditPopup(false);
                }}
                className='h-10 w-10 md:h-11 md:w-11 bg-gray-900 rounded-2xl flex items-center justify-center text-white cursor-pointer hover:bg-black hover:rounded-xl transition-all shadow-lg active:scale-90 overflow-hidden'
              >
                {userData ? (
                  <span className='font-black text-xs md:text-sm uppercase tracking-tighter'>
                    {(userData?.name || '').slice(0, 1)}
                  </span>
                ) : (
                  <FaUserAstronaut size={16} />
                )}
              </div>

              {/* User Popup */}
              <AnimatePresence>
                {showUserPopup && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className='absolute right-0 mt-4 w-48 md:w-52 bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-[2.5rem] py-6 px-6 z-50'
                  >
                    {userData ? (
                      <div className='flex flex-col gap-4'>
                        <div>
                          <p className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1'>Welcome</p>
                          <h2 className='text-emerald-600 font-black text-lg md:text-xl leading-tight truncate'>{userData.name.split(' ')[0]}</h2>
                        </div>

                        <div className='h-px bg-gray-100 w-full' />

                        <button
                          onClick={() => { navigate('/history'); setShowUserPopup(false); }}
                          className='text-gray-600 text-left text-[14px] hover:text-emerald-600 transition-colors font-bold flex items-center gap-2 group'
                        >
                          <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform' />
                          My History
                        </button>

                        <button
                          onClick={handleLogout}
                          className='flex items-center gap-2 text-red-500 text-[14px] font-bold hover:text-red-700 transition-colors mt-2 group'
                        >
                          <HiOutlineLogout className='text-lg group-hover:-translate-x-1 transition-transform' />
                          Logout
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setShowAuthModel(true); setShowUserPopup(false); }}
                        className='w-full py-3.5 text-center text-sm font-black bg-black text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-xl active:scale-95'
                      >
                        Join Now
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='lg:hidden w-10 h-10 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-900 border border-gray-100 active:scale-90 transition-all'
            >
              <div className='w-5 h-4 flex flex-col justify-between overflow-hidden'>
                <motion.span 
                  animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 7 : 0 }}
                  className='w-full h-0.5 bg-current block origin-left' 
                />
                <motion.span 
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1, x: isMobileMenuOpen ? 20 : 0 }}
                  className='w-full h-0.5 bg-current block' 
                />
                <motion.span 
                  animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -7 : 0 }}
                  className='w-full h-0.5 bg-current block origin-left' 
                />
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='fixed top-[88px] left-0 w-full px-4 z-40 lg:hidden'
          >
            <div className='bg-white/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-2xl p-6'>
              <div className='flex flex-col gap-2'>
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => { navigate(link.path); setIsMobileMenuOpen(false); }}
                    className={`w-full text-left py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${location.pathname === link.path ? 'bg-emerald-50 text-emerald-600' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              <div className='h-px bg-gray-100 my-4' />

              {userData ? (
                <div className='flex items-center justify-between px-6 py-2'>
                  <div className='flex flex-col'>
                    <p className='text-[10px] font-black uppercase tracking-widest text-gray-400'>Profile</p>
                    <p className='text-gray-900 font-black text-base'>{userData.name.split(' ')[0]}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className='p-3 bg-red-50 text-red-500 rounded-xl active:scale-90 transition-all'
                  >
                    <HiOutlineLogout size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setShowAuthModel(true); setIsMobileMenuOpen(false); }}
                  className='w-full py-4 bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest'
                >
                  Join Protocol
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showAuthModel && <AuthModel onClose={() => setShowAuthModel(false)} />}
    </>
  )
}

export default Navbar