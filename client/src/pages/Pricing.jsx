import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiCheck, HiSparkles, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineArrowRight } from 'react-icons/hi'
import { RiRobot2Fill } from 'react-icons/ri'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { ServerUrl } from '../App'

function Pricing() {
  const [activePlan, setActivePlan] = useState('Free')

  const plans = [
    {
      planId: 'plan_500',
      name: 'Starter',
      price: '5',
      credits: '500',
      description: 'Perfect for quick practice sessions.',
      features: ['500 Credits (10 Interviews)', 'Basic Performance Score', 'Standard Voice Bot', 'Community Support'],
      buttonText: 'Buy 500 Credits',
      icon: RiRobot2Fill,
      color: 'gray'
    },
    {
      planId: 'plan_1000',
      name: 'Pro',
      price: '9',
      credits: '1000',
      description: 'Dive deeper into your career prep.',
      features: ['1000 Credits (20 Interviews)', 'Detailed Skill Analytics', 'Premium Voice Options', 'PDF Report Exports'],
      buttonText: 'Buy 1000 Credits',
      icon: HiOutlineLightningBolt,
      color: 'emerald',
      popular: true
    },
    {
      planId: 'plan_2500',
      name: 'Enterprise',
      price: '20',
      credits: '2500',
      description: 'The elite choice for serious candidates.',
      features: ['2500 Credits (50 Interviews)', 'Real-time Confidence Radar', 'Deep Tech Analysis Mode', 'Priority Support'],
      buttonText: 'Buy 2500 Credits',
      icon: HiOutlineShieldCheck,
      color: 'black'
    }
  ]

  const handlePayment = async (planId) => {
    try {
      const response = await axios.post(`${ServerUrl}/api/payment/create-checkout-session`, { planId }, { withCredentials: true });
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  }

  return (
    <div className='min-h-screen bg-[#F8FAFB] flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900'>
      <Navbar />

      <main className='flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-32 md:pt-44 pb-20 md:pb-32 relative overflow-hidden'>
        {/* Background Ambient Elements */}
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none'>
          <div className='absolute top-1/4 left-1/4 w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-emerald-50 rounded-full blur-[80px] md:blur-[120px] opacity-40' />
          <div className='absolute bottom-1/4 right-1/4 w-[150px] h-[150px] md:w-[400px] md:h-[400px] bg-blue-50 rounded-full blur-[60px] md:blur-[100px] opacity-30' />
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20 relative z-10"
        >
          <div className='inline-flex items-center gap-2 bg-emerald-50 px-3 md:px-4 py-1 rounded-full border border-emerald-100 mb-6 md:mb-8 w-fit mx-auto'>
            <HiSparkles className='text-emerald-500 text-[10px] md:text-xs' />
            <span className='text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-emerald-800'>Strategic Credits</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-6">Invest in Your <br /><span className="text-emerald-500">Future Career.</span></h1>
          <p className="text-gray-400 text-sm md:text-lg font-medium max-w-xl mx-auto leading-relaxed px-4">
            Professional-grade AI interviews at a fraction of the cost. Choose a protocol that fits your mission.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto relative z-10">
          {plans.map((plan, idx) => {
            const isActive = activePlan === plan.name;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                onMouseEnter={() => setActivePlan(plan.name)}
                onClick={() => setActivePlan(plan.name)}
                className={`relative transition-all duration-500 cursor-pointer flex flex-col ${isActive ? 'scale-[1.02]' : ''}`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-0 right-10 -translate-y-1/2 bg-emerald-500 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/30 z-20"
                  >
                    MOST POPULAR
                  </motion.div>
                )}
                <div className={`flex flex-col h-full bg-white rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-12 border transition-all relative overflow-hidden group ${isActive
                    ? 'border-emerald-500 shadow-[0_40px_100px_rgba(16,185,129,0.08)]'
                    : 'border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] hover:border-emerald-200'
                  }`}>
                  <div className='absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-3xl opacity-40 -mr-12 -mt-12 transition-all group-hover:scale-150' />

                  <div className="mb-8 md:mb-12 relative z-10">
                    <span className="text-[10px] md:text-xs font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 md:px-4 py-1.5 rounded-full mb-6 inline-block">
                      {plan.name}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">{plan.credits}</span>
                      <span className="text-gray-400 font-bold text-xs md:text-sm">Credits</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-lg md:text-2xl font-black text-gray-900 tracking-tighter">${plan.price}</span>
                      <span className="text-gray-400 font-bold text-xs md:text-sm">/ {parseInt(plan.credits) / 50} sessions+</span>
                    </div>
                  </div>

                  <div className='flex-1 space-y-4 mb-10 relative z-10'>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className='flex items-center gap-3'>
                        <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-50 text-gray-300'
                          }`}>
                          <HiCheck size={12} />
                        </div>
                        <span className={`text-xs md:text-sm font-bold transition-colors ${isActive ? 'text-gray-800' : 'text-gray-400 group-hover:text-gray-600'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); handlePayment(plan.planId); }}
                    className={`w-full py-4 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-sm md:text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 relative z-20 ${isActive
                        ? 'bg-emerald-600 text-white shadow-2xl shadow-emerald-500/20 hover:bg-emerald-700'
                        : 'bg-gray-900 text-white hover:bg-black shadow-xl shadow-black/5'
                      }`}
                  >
                    <span>{plan.buttonText}</span>
                    <HiOutlineArrowRight size={20} className='translate-x-0 group-hover:translate-x-1 transition-transform' />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* FAQ Preview / Trust Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className='mt-24 md:mt-32 pt-16 md:pt-20 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10'
        >
          <div className='flex flex-col gap-2 text-center md:text-left'>
            <span className='text-emerald-500 font-black text-xs uppercase tracking-[0.2em]'>Trusted by 5000+ candidates</span>
            <h4 className='text-2xl font-black text-gray-900 tracking-tight'>Ready to secure your dream role?</h4>
          </div>
          <div className='flex items-center gap-6 md:gap-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all'>
            <RiRobot2Fill size={32} className="md:size-[40px]" />
            <HiOutlineLightningBolt size={32} className="md:size-[40px]" />
            <HiOutlineShieldCheck size={32} className="md:size-[40px]" />
            <HiSparkles size={32} className="md:size-[40px]" />
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

export default Pricing