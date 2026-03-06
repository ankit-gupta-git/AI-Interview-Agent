import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'motion/react'
import { useSelector } from 'react-redux'
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import AuthModel from '../components/AuthModel'
import Footer from '../components/Footer'

// Asset Imports
import aiAnsImg from '../assets/ai-ans.png'
import resumeImg from '../assets/resume.png'
import pdfImg from '../assets/pdf.png'
import historyImg from '../assets/history.png'
import hrImg from '../assets/HR.png'
import techImg from '../assets/tech.png'
import confiImg from '../assets/confi.png'
import creditImg from '../assets/credit.png'

function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <div className='min-h-screen bg-[#f3f3f3] flex flex-col font-sans overflow-x-hidden'>
      <Navbar />

      <main className='flex-1 flex flex-col items-center justify-center text-center px-6 pt-52 pb-20'>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='max-w-4xl flex flex-col items-center'
        >
          {/* Tagline */}
          <motion.div
            variants={itemVariants}
            className='flex items-center gap-2 bg-white/50 border border-gray-100 px-4 py-1.5 rounded-full shadow-sm mb-10'
          >
            <HiSparkles className='text-[#10b981]' />
            <span className='text-gray-500 text-[11px] font-bold uppercase tracking-widest'>AI Powered Smart Interview Platform</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className='text-[2.8rem] md:text-[4rem] font-extrabold text-[#1a1a1a] leading-[1.15] mb-6 tracking-tight'
          >
            Practice Interviews with<br />
            <span className='inline-block px-6 py-1.5 bg-[#e8fbf3] text-[#10b981] rounded-full mt-2'>
              AI Intelligence
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className='text-gray-500 text-base md:text-lg leading-relaxed max-w-xl mb-10'
          >
            Role-based mock interviews with smart follow-ups, adaptive difficulty and real-time performance evaluation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className='flex flex-wrap items-center justify-center gap-4'
          >
            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                navigate("/interview");
              }}
              className="px-8 py-3.5 bg-black text-white rounded-full font-bold text-base hover:bg-gray-800 hover:scale-105 transition-all shadow-xl shadow-black/10 cursor-pointer"
            >
              Start Interview
            </button>
            <button onClick={() => {
              if (!userData) {
                setShowAuth(true);
                return;
              }
              navigate("/history");
            }} className='px-8 py-3.5 bg-white text-gray-700 rounded-full font-bold text-base border border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all shadow-sm cursor-pointer'>
              View History
            </button>
          </motion.div>
        </motion.div>

        {/* How it Works Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className='w-full max-w-6xl mt-32 grid grid-cols-1 md:grid-cols-3 gap-12'
        >
          {/* Step 1 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, rotate: -1 }}
            className='relative bg-white p-8 pt-12 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center -rotate-1 transition-all'
          >
            <div className='absolute -top-6 bg-white p-3 rounded-2xl shadow-lg border border-[#e8fbf3] text-[#10b981]'>
              <BsRobot size={24} />
            </div>
            <span className='text-[10px] font-bold text-[#10b981] uppercase tracking-[0.2em] mb-4'>Step 1</span>
            <h3 className='text-xl font-bold text-gray-800 mb-3'>Role & Experience Selection</h3>
            <p className='text-gray-400 text-sm leading-relaxed'>AI adjusts difficulty based on selected job role.</p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, rotate: 1 }}
            className='relative bg-white p-8 pt-12 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center transition-all'
          >
            <div className='absolute -top-6 bg-white p-3 rounded-2xl shadow-lg border border-[#e8fbf3] text-[#10b981]'>
              <BsMic size={24} />
            </div>
            <span className='text-[10px] font-bold text-[#10b981] uppercase tracking-[0.2em] mb-4'>Step 2</span>
            <h3 className='text-xl font-bold text-gray-800 mb-3'>Smart Voice Interview</h3>
            <p className='text-gray-400 text-sm leading-relaxed'>Dynamic follow-up questions based on your answers.</p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, rotate: -1 }}
            className='relative bg-white p-8 pt-12 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center rotate-1 transition-all'
          >
            <div className='absolute -top-6 bg-white p-3 rounded-2xl shadow-lg border border-[#e8fbf3] text-[#10b981]'>
              <BsClock size={24} />
            </div>
            <span className='text-[10px] font-bold text-[#10b981] uppercase tracking-[0.2em] mb-4'>Step 3</span>
            <h3 className='text-xl font-bold text-gray-800 mb-3'>Timer Based Simulation</h3>
            <p className='text-gray-400 text-sm leading-relaxed'>Real interview pressure with time tracking.</p>
          </motion.div>
        </motion.div>

        {/* Capabilities Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className='mt-40 mb-10 flex items-center gap-3'
        >
          <h2 className='text-3xl md:text-4xl font-extrabold text-[#1a1a1a]'>Advanced AI</h2>
          <span className='px-6 py-1.5 bg-[#e8fbf3] text-[#10b981] rounded-full text-3xl md:text-4xl font-extrabold'>
            Capabilities
          </span>
        </motion.div>

        {/* Capabilities Section */}
        <div className='w-full max-w-6xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* AI Answer Evaluation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='bg-white p-8 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center gap-6 text-left group hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all'
          >
            <img src={aiAnsImg} alt="AI evaluation" className='w-32 h-32 object-contain group-hover:scale-105 transition-transform' />
            <div>
              <div className='bg-[#e8fbf3] text-[#10b981] p-1.5 rounded-lg w-fit mb-3'>
                <BsRobot size={18} />
              </div>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>AI Answer Evaluation</h3>
              <p className='text-gray-400 text-[13px] leading-relaxed'>Scores communication, technical accuracy and confidence.</p>
            </div>
          </motion.div>

          {/* Resume Based Interview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='bg-white p-8 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center gap-6 text-left group hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all'
          >
            <img src={resumeImg} alt="Resume interview" className='w-32 h-32 object-contain group-hover:scale-105 transition-transform' />
            <div>
              <div className='bg-[#e8fbf3] text-[#10b981] p-1.5 rounded-lg w-fit mb-3'>
                <BsFileEarmarkText size={18} />
              </div>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>Resume Based Interview</h3>
              <p className='text-gray-400 text-[13px] leading-relaxed'>Project specific questions based on uploaded resume.</p>
            </div>
          </motion.div>

          {/* Downloadable PDF Report */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='bg-white p-8 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center gap-6 text-left group hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all'
          >
            <img src={pdfImg} alt="PDF report" className='w-32 h-32 object-contain group-hover:scale-105 transition-transform' />
            <div>
              <div className='bg-[#e8fbf3] text-[#10b981] p-1.5 rounded-lg w-fit mb-3'>
                <BsFileEarmarkText size={18} />
              </div>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>Downloadable PDF Report</h3>
              <p className='text-gray-400 text-[13px] leading-relaxed'>Detailed strengths, weaknesses and improvement insights.</p>
            </div>
          </motion.div>

          {/* History & Analytics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='bg-white p-8 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center gap-6 text-left group hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all'
          >
            <img src={historyImg} alt="History analytics" className='w-32 h-32 object-contain group-hover:scale-105 transition-transform' />
            <div>
              <div className='bg-[#e8fbf3] text-[#10b981] p-1.5 rounded-lg w-fit mb-3'>
                <BsBarChart size={18} />
              </div>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>History & Analytics</h3>
              <p className='text-gray-400 text-[13px] leading-relaxed'>Track progress with performance graphs and topic analysis.</p>
            </div>
          </motion.div>
        </div>

        {/* Interview Modes Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className='mt-32 mb-10 flex items-center gap-3'
        >
          <h2 className='text-2xl md:text-3xl font-extrabold text-[#1a1a1a]'>Multiple Interview</h2>
          <span className='px-5 py-1.5 bg-[#e8fbf3] text-[#10b981] rounded-full text-2xl md:text-3xl font-extrabold'>
            Modes
          </span>
        </motion.div>

        {/* Interview Modes Grid */}
        <div className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-32'>
          {/* HR Interview Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='bg-white p-8 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center justify-between group hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all'
          >
            <div className='text-left max-w-[200px]'>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>HR Interview Mode</h3>
              <p className='text-gray-400 text-[12px] leading-relaxed'>Behavioral and communication based evaluation.</p>
            </div>
            <img src={hrImg} alt="HR mode" className='w-24 h-24 object-contain group-hover:scale-105 transition-transform' />
          </motion.div>

          {/* Technical Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='bg-white p-8 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center justify-between group hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all'
          >
            <div className='text-left max-w-[200px]'>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>Technical Mode</h3>
              <p className='text-gray-400 text-[12px] leading-relaxed'>Deep technical questioning based on selected role.</p>
            </div>
            <img src={techImg} alt="Technical mode" className='w-24 h-24 object-contain group-hover:scale-105 transition-transform' />
          </motion.div>

          {/* Confidence Detection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='bg-white p-8 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center justify-between group hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all'
          >
            <div className='text-left max-w-[200px]'>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>Confidence Detection</h3>
              <p className='text-gray-400 text-[12px] leading-relaxed'>Real-time tone and voice analysis insights.</p>
            </div>
            <img src={confiImg} alt="Confidence detection" className='w-24 h-24 object-contain group-hover:scale-105 transition-transform' />
          </motion.div>

          {/* Credits System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='bg-white p-8 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center justify-between group hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all'
          >
            <div className='text-left max-w-[200px]'>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>Credits System</h3>
              <p className='text-gray-400 text-[12px] leading-relaxed'>Unlock premium interview sessions easily.</p>
            </div>
            <img src={creditImg} alt="Credits system" className='w-24 h-24 object-contain group-hover:scale-105 transition-transform' />
          </motion.div>
        </div>
      </main>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

      <Footer />
    </div>
  )
}

export default Home