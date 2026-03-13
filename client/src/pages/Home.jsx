import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsArrowRightShort,
  BsShieldCheck,
  BsLightningCharge,
  BsGraphUp,
  BsPlus,
  BsCpu,
  BsEyedropper
} from 'react-icons/bs'
import { HiSparkles, HiChevronDown } from 'react-icons/hi'
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
import mmImg from '../assets/MM.png'
import img1 from '../assets/img1.png'

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0 font-poppins">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-emerald-600 transition-colors"
      >
        <span className="text-lg font-bold text-gray-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-gray-400 bg-gray-50 p-2 rounded-full"
        >
          <BsPlus size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 font-medium leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stagger: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => { document.documentElement.style.scrollBehavior = 'auto' }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <div className='min-h-screen bg-white flex flex-col font-poppins overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900'>
      <motion.div className='fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-[0%] z-50' style={{ scaleX }} />
      <Navbar />

      {/* Hero Section */}
      <main className='flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6 pt-32 md:pt-40 pb-16 md:pb-24 relative overflow-hidden'>
        {/* Abstract Background Elements */}
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none z-0'>
          <div className='absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[120px] opacity-60 animate-pulse' />
          <div className='absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] opacity-40' />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='max-w-5xl flex flex-col items-center relative z-10'
        >
          {/* Tagline */}
          <motion.div
            variants={itemVariants}
            className='flex items-center gap-2 bg-emerald-50/80 border border-emerald-100 px-5 py-2 rounded-full shadow-sm mb-8 hover:scale-105 transition-transform cursor-default'
          >
            <HiSparkles className='text-emerald-500 text-base' />
            <span className='text-emerald-800 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]'>AI-Human Interview Frontier</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className='text-[2.2rem] sm:text-[3.5rem] md:text-[5.5rem] font-aeonik font-black text-gray-900 leading-[1.15] md:leading-[1.1] mb-6 md:mb-8 tracking-tighter'
          >
            Bridge the Gap Between<br />
            <span className='relative inline-block text-transparent bg-clip-text bg-linear-to-r from-emerald-600 via-emerald-500 to-emerald-400 py-1'>
              Skill & Opportunity.
              <motion.div
                className='absolute bottom-0 left-0 w-full h-1.5 bg-emerald-100/50 -z-10 rounded-full'
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 1 }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className='text-gray-500 text-base md:text-lg leading-relaxed max-w-xl mb-10 font-medium'
          >
            Prepare for elite roles with an AI mentor that understands your journey. 
            Experience industry-specific pressure and precise behavioral insights.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className='flex flex-wrap items-center justify-center gap-5'
          >
            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                navigate("/interview");
              }}
              className="group relative px-10 py-4 bg-gray-900 text-white rounded-3xl font-black text-base hover:bg-black transition-all shadow-2xl shadow-emerald-500/10 active:scale-95 flex items-center gap-2 overflow-hidden font-poppins"
            >
              <div className='absolute inset-0 bg-linear-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              <span className='relative z-10'>Start Your Session</span>
              <BsArrowRightShort className='relative z-10 text-xl group-hover:translate-x-1 transition-transform' />
            </button>
            <button
              onClick={() => {
                const gallery = document.getElementById('why-choose-us');
                gallery?.scrollIntoView({ behavior: 'smooth' });
              }}
              className='px-10 py-4 bg-white text-gray-900 rounded-3xl font-black text-base border-2 border-gray-100 hover:border-emerald-500/30 hover:bg-emerald-50/30 transition-all shadow-sm active:scale-95 font-poppins'
            >
              Explore Features
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Creative Assets */}
        <div className='absolute inset-0 pointer-events-none z-0 overflow-hidden'>
             <motion.img 
                src={mmImg} 
                className='absolute -left-20 top-1/4 w-64 h-64 object-contain opacity-10' 
                animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             />
             <motion.img 
                src={img1} 
                className='absolute -right-20 bottom-1/4 w-80 h-80 object-contain opacity-5' 
                animate={{ y: [0, -30, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
             />
        </div>

        {/* Dynamic Credibility Marquee (Static) */}
        <section className="w-full mt-40 max-w-7xl px-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-10 text-center font-poppins">Engineered for candidates targeting</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {['Google', 'Amazon', 'Meta', 'Netflix', 'Microsoft', 'NVIDIA'].map((brand) => (
              <span key={brand} className="text-2xl font-black text-gray-300 pointer-events-none select-none tracking-tighter font-aeonik">
                {brand}
              </span>
            ))}
          </div>
        </section>

        {/* AI Vision Section (New Creative Section) */}
        <section className='w-full max-w-7xl mt-52 px-4'>
           <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-20'>
              <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className='relative w-full'
              >
                 <div className='absolute inset-0 bg-emerald-500 rounded-[2.5rem] md:rounded-[4rem] blur-[80px] opacity-10 animate-pulse' />
                 <img src={img1} alt="AI Vision" className='relative w-full rounded-[2.5rem] md:rounded-[4rem] shadow-2xl z-10 border border-emerald-50' />
                 <div className='absolute -bottom-6 md:-bottom-10 -right-4 md:-right-10 bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[3rem] shadow-2xl z-20 border border-gray-50 flex items-center gap-3 md:gap-6'>
                    <div className='w-10 h-10 md:w-16 md:h-16 bg-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white'>
                       <BsCpu size={24} className="md:w-8 md:h-8" />
                    </div>
                    <div className='text-left'>
                       <p className='text-[8px] md:text-[10px] font-black text-emerald-500 uppercase tracking-widest'>Core Engine</p>
                       <h4 className='font-aeonik text-base md:text-xl font-bold'>Neural Response API</h4>
                    </div>
                 </div>
              </motion.div>
              
              <div className='text-left'>
                 <span className='text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block font-poppins'>Advanced Intelligence</span>
                 <h2 className='text-4xl md:text-5xl font-aeonik font-black text-gray-900 leading-tight mb-8'>
                    Beyond Surface Level <br />
                    <span className='text-emerald-500 italic'>Evaluations.</span>
                 </h2>
                 <p className='text-gray-500 text-lg font-medium leading-relaxed mb-10 font-poppins'>
                    Our deep-learning models don't just check keywords. We analyze the logical coherence of your technical explanations, the confidence curve of your delivery, and specific tone markers that correlate with professional seniority.
                 </p>
                 <div className='flex gap-4'>
                    <div className='flex-1 p-6 bg-emerald-50 rounded-3xl border border-emerald-100'>
                       <h5 className='font-aeonik text-xl font-black text-emerald-700 mb-2'>Logic Map</h5>
                       <p className='text-xs text-emerald-600 font-bold'>Dynamic pathing for answers.</p>
                    </div>
                    <div className='flex-1 p-6 bg-blue-50 rounded-3xl border border-blue-100'>
                       <h5 className='font-aeonik text-xl font-black text-blue-700 mb-2'>EQ Radar</h5>
                       <p className='text-xs text-blue-600 font-bold'>Sentiment analysis scoring.</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Why Choose InterviewIQ Section */}
        <section id="why-choose-us" className='w-full max-w-7xl mt-52 px-4 scroll-mt-24'>
          <div className='flex flex-col items-center mb-24 font-poppins'>
            <span className='text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4'>The Advantage</span>
            <h2 className='text-4xl md:text-5xl font-aeonik font-black text-gray-900 text-center leading-tight'>
              Why Top Candidates <br />Choose InterviewIQ
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                icon: BsLightningCharge,
                title: "Real-time Adaptation",
                desc: "Our AI adjusts the interview difficulty based on your previous answers, mimicking real human conversation flow.",
              },
              {
                icon: BsShieldCheck,
                title: "Psychological Insights",
                desc: "Measure communication metrics like filler words, pauses, and tone to build a boardroom-ready presence.",
              },
              {
                icon: BsRobot,
                title: "Domain Specialist",
                desc: "Switch between HR, Technical, or System Design modes with specialized prompt templates for each role.",
              },
              {
                icon: BsBarChart,
                title: "Success Analytics",
                desc: "Track your progress over time with visual performance charts and pinpoint exactly where you need improvement.",
              },
              {
                icon: BsFileEarmarkText,
                title: "Resume Deep-Sync",
                desc: "Don't just answer generic questions. Our AI builds prompts directly from the projects and skills in your CV.",
              },
              {
                icon: BsGraphUp,
                title: "Placement Ready",
                desc: "Receive feedback reports that can be directly shared with mentors or used for self-reflection before the big day.",
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className='p-10 bg-gray-50/50 rounded-[3rem] border border-transparent hover:border-emerald-100 hover:bg-white transition-all group font-poppins'
              >
                <div className='w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-all'>
                  <benefit.icon size={24} />
                </div>
                <h3 className='text-xl font-aeonik font-black text-gray-900 mb-4'>{benefit.title}</h3>
                <p className='text-gray-500 text-sm font-medium leading-relaxed'>{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MM Focus Section (MM.png usage) */}
        <section className='w-full max-w-7xl mt-32 md:mt-52 px-4'>
           <div className='bg-linear-to-br from-emerald-50 to-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 flex flex-col md:flex-row items-center gap-12 md:gap-20 border border-emerald-100 shadow-sm'>
              <div className='flex-1 text-left order-2 md:order-1'>
                 <h2 className='text-3xl md:text-5xl font-aeonik font-black text-gray-900 leading-tight mb-6 md:mb-8'>
                    Engineered for <br /><span className='text-emerald-500 italic'>Executive Maturity.</span>
                 </h2>
                 <p className='text-gray-500 text-base md:text-lg font-medium leading-relaxed font-poppins'>
                    Move beyond entry-level preparation. InterviewIQ is built to bridge the gap between technical competency and the executive presence required for senior leadership roles.
                 </p>
              </div>
              <div className='flex-1 order-1 md:order-2 container relative'>
                 <motion.img 
                    src={mmImg} 
                    alt="MM" 
                    className='w-full max-w-[300px] md:max-w-none mx-auto object-contain drop-shadow-2xl' 
                    whileHover={{ scale: 1.05, rotate: 2 }}
                 />
              </div>
           </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className='w-full max-w-7xl mt-52 px-4'>
          <div className='mb-24 text-center font-poppins'>
            <h2 className='text-4xl font-aeonik font-black text-gray-900 uppercase tracking-tighter mb-4'>The Engineering Flow</h2>
            <div className='w-20 h-1.5 bg-emerald-500 mx-auto rounded-full' />
          </div>

          <div className='relative'>
            {/* Connection Line (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 hidden md:block -z-10" />
            
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
              {[
                {
                  step: "01",
                  title: "Profile Ingestion",
                  desc: "Upload your PDF resume. Our AI extracts context, stack, and seniority levels.",
                  icon: BsFileEarmarkText,
                },
                {
                  step: "02",
                  title: "Persona Build",
                  desc: "Select your target role. We create a specialized interviewer persona for that domain.",
                  icon: BsRobot,
                },
                {
                  step: "03",
                  title: "Simulated Session",
                  desc: "Conduct the interview. Experience dynamic followup questions based on your depth.",
                  icon: BsMic,
                },
                {
                  step: "04",
                  title: "Logic Dashboard",
                  desc: "Get score-based evaluations on communication, confidence, and technical accuracy.",
                  icon: BsBarChart,
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className='bg-white p-8 rounded-[3rem] border border-gray-100 flex flex-col items-center text-center relative hover:shadow-xl transition-all font-poppins'
                >
                  <div className='absolute -top-4 -left-4 w-12 h-12 bg-gray-900 text-white flex items-center justify-center rounded-2xl font-black italic shadow-lg font-aeonik'>
                    {item.step}
                  </div>
                  <div className='bg-emerald-50 p-6 rounded-3xl text-emerald-600 mb-8 w-max transition-all group-hover:scale-110'>
                    <item.icon size={28} />
                  </div>
                  <h3 className='text-lg font-aeonik font-black text-gray-900 mb-3'>{item.title}</h3>
                  <p className='text-gray-400 text-xs leading-relaxed font-bold'>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className='w-full max-w-7xl mt-32 md:mt-52 px-4'>
          <div className="bg-gray-900 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 relative overflow-hidden">
             {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-64 -mt-64" />
            
            <div className="text-center mb-12 md:mb-20 relative z-10 font-poppins">
              <span className='text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block'>Success Stories</span>
              <h2 className="text-3xl md:text-5xl font-aeonik font-black text-white">Landed the Dream Role</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
              {[
                {
                  quote: "The technical persona was surprisingly deep. It caught me off guard with a system design question just like in my actual interview at Meta.",
                  author: "Sarah J.",
                  role: "SDE II @ Meta"
                },
                {
                  quote: "InterviewIQ helped me identify that I used too many filler words. Two weeks of practice later, my communication score hit 95%.",
                  author: "David K.",
                  role: "Product Manager"
                },
                {
                   quote: "The report generation is a game changer. I could see exactly where my logic failed in the coding explanation rounds.",
                   author: "Michael R.",
                   role: "Lead Frontend Eng."
                }
              ].map((t, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-lg p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10 flex flex-col justify-between font-poppins">
                  <p className="text-gray-300 italic mb-6 md:mb-8 text-sm md:text-base font-medium leading-relaxed">"{t.quote}"</p>
                  <div>
                    <h4 className="text-white font-black font-aeonik">{t.author}</h4>
                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='w-full max-w-4xl mt-52 px-4'>
           <div className='text-center mb-16 font-poppins'>
              <h2 className='text-4xl font-aeonik font-black text-gray-900 mb-4'>Frequently Asked Questions</h2>
              <p className='text-gray-500 font-medium'>Everything you need to know about the platform.</p>
           </div>
           
           <div className="bg-white rounded-[3rem] border border-gray-100 p-8 md:p-12 shadow-sm font-poppins">
             {[
               {
                 q: "How realistic are the interview questions?",
                 a: "Using Google Gemini's advanced LLM capabilities, questions are generated contextually based on your resume and target role, including industry-standard technical and behavioral queries."
               },
               {
                 q: "Will my data be secure?",
                 a: "Yes. We use Firebase for secure authentication and follow strict data encryption protocols. Your resumes and interview data are private and only accessible to you."
               },
               {
                 q: "Can I use InterviewIQ for specific technical stacks?",
                 a: "Absolutely. Whether it's React, System Design, Backend Engineering, or Data Science, our AI tailors the questions to the specific technical requirements of your domain."
               },
               {
                 q: "How do I get the performance reports?",
                 a: "After every session, a detailed analysis is generated. You can view it on your dashboard or download a professional PDF report to review at your convenience."
               }
             ].map((faq, i) => (
               <FAQItem key={i} question={faq.q} answer={faq.a} />
             ))}
           </div>
        </section>

        {/* Final CTA */}
        <section className='w-full max-w-7xl mt-32 md:mt-52 mb-32 md:mb-52 px-4'>
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-linear-to-r from-emerald-600 to-emerald-400 p-10 md:p-24 rounded-[2.5rem] md:rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-aeonik font-black mb-6 md:mb-10 leading-tight">Ready to Ace Your Next Interview?</h2>
              <p className="text-emerald-50 text-base md:text-xl font-poppins font-medium mb-8 md:mb-12 max-w-2xl mx-auto">Join thousands of candidates who are mastering their communication and technical skills with InterviewIQ.</p>
              <button 
                onClick={() => {
                   if (!userData) {
                     setShowAuth(true);
                     return;
                   }
                   navigate("/interview");
                }}
                className="bg-white text-emerald-600 px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-4xl font-black text-lg md:text-xl hover:bg-emerald-50 transition-all shadow-xl active:scale-95 flex items-center gap-3 mx-auto font-poppins"
              >
                Get Started for Free
                <BsArrowRightShort size={28} className="hidden sm:block" />
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

      <Footer />
    </div>
  )
}

export default Home