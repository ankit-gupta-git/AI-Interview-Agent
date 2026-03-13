import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaRobot } from 'react-icons/fa';
import { HiSparkles, HiShieldCheck } from 'react-icons/hi';
import { auth, provider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { ServerUrl } from '../App';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { RiRobot2Fill } from 'react-icons/ri';

function Auth({ isModel = false, onClose }) {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(`${ServerUrl}/api/auth/google`, { name, email }, { withCredentials: true })
            dispatch(setUserData(result.data))
            if (isModel && onClose) onClose();
        } catch (error) {
            console.log(error)
            dispatch(setUserData(null))
        }
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        },
    };

    const content = (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`w-full max-w-md bg-white/70 backdrop-blur-3xl flex flex-col items-center text-center relative overflow-hidden ${isModel ? 'p-10 pb-14 rounded-[3rem]' : 'p-12 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-white'}`}
        >
            {/* Background Glow */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50 -mr-16 -mt-16' />
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-full blur-3xl opacity-40 -ml-12 -mb-12' />

            {/* Logo Section */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-10 relative z-10">
                <div className="bg-black text-white p-2.5 rounded-2xl shadow-xl shadow-black/10">
                    <RiRobot2Fill size={26} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tighter">Interview<span className='text-emerald-500'>IQ</span></h2>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-10 relative z-10">
                <div className='flex items-center gap-2 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100'>
                    <HiSparkles className='text-emerald-500 text-xs' />
                    <span className='text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800'>Secure Authentication</span>
                </div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">Elevate Your <br /><span className='text-emerald-500'>Profile.</span></h1>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-gray-400 text-sm font-medium leading-relaxed mb-12 max-w-[280px] relative z-10">
                Sync your career data to unlock high-fidelity AI simulations and real-time performance tracking.
            </motion.p>

            {/* Auth Button */}
            <motion.button
                variants={itemVariants}
                onClick={handleGoogleAuth}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-900 text-white flex items-center justify-center gap-4 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-black/10 transition-all hover:bg-black group relative z-10"
            >
                <div className='bg-white/10 p-1.5 rounded-lg group-hover:bg-white/20 transition-colors'>
                    <FaGoogle size={18} className="text-white" />
                </div>
                <span className="tracking-tight">Sign In with Google</span>
            </motion.button>

            {/* Trust Indicator */}
            <motion.div variants={itemVariants} className='mt-10 flex items-center gap-2 relative z-10'>
                <HiShieldCheck className='text-emerald-500 text-lg' />
                <span className='text-[10px] font-black uppercase tracking-widest text-gray-300'>Enterprise Edge Security</span>
            </motion.div>
        </motion.div>
    );

    if (isModel) return content;

    return (
        <div className="w-full min-h-screen bg-[#F8FAFB] flex items-center justify-center px-6 py-20 font-sans relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none'>
                <div className='absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[120px] opacity-40' />
                <div className='absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] opacity-30' />
            </div>
            {content}
        </div>
    );
}

export default Auth;