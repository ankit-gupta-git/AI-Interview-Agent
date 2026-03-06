import React from 'react';
import { motion } from 'motion/react';
import { FaGoogle, FaRobot } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { auth, provider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { ServerUrl } from '../App';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({ isModel = false }) {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(`${ServerUrl}/api/auth/google`, { name, email }, { withCredentials: true })
            dispatch(setUserData(result.data))
            console.log(result.data)
        } catch (error) {
            console.log(error)
            dispatch(setUserData(null))
        }
    }
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className={isModel ? "w-full flex items-center justify-center font-sans" : "w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20 font-sans"}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`w-full max-w-md bg-white flex flex-col items-center text-center ${isModel ? 'p-8 pb-12 rounded-[2.5rem]' : 'p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100'}`}
            >
                {/* Logo Section */}
                <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-8">
                    <div className="bg-black text-white p-2 rounded-xl shadow-lg">
                        <FaRobot size={22} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800 tracking-tight">InterviewIQ.AI</h2>
                </motion.div>

                {/* Main Heading */}
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 mb-8">
                    <h1 className="text-gray-500 text-sm font-medium tracking-wide uppercase">Continue with</h1>
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-[#e8fbf3] text-[#059669] rounded-full border border-[#d1fae5]/50">
                        <HiSparkles size={18} className="text-[#10b981]" />
                        <span className="text-lg font-bold tracking-tight">AI Smart Interview</span>
                    </div>
                </motion.div>

                {/* Description */}
                <motion.p variants={itemVariants} className="text-gray-400 text-[14px] leading-relaxed mb-10 max-w-[300px] px-2">
                    Sign in to start AI-powered mock interviews, track your progress, and unlock detailed performance insights.
                </motion.p>

                {/* Auth Button */}
                <motion.button
                    variants={itemVariants}
                    onClick={handleGoogleAuth}
                    whileHover={{ scale: 1.01, backgroundColor: '#1a1a1a' }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-black text-white flex items-center justify-center gap-3 py-4 rounded-full font-bold text-[16px] shadow-lg transition-all"
                >
                    <FaGoogle size={18} className="text-white" />
                    <span className="tracking-tight">Continue with Google</span>
                </motion.button>
            </motion.div>
        </div>
    );
}

export default Auth;