import React from 'react'
import { RiRobot2Fill } from 'react-icons/ri'
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Footer() {
    return (
        <footer className='w-full bg-[#F8FAFB] border-t border-gray-100 pt-24 pb-12 relative overflow-hidden'>
            <div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[120px] opacity-40 -mr-40 -mb-40 pointer-events-none' />

            <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10'>
                {/* Brand Section */}
                <div className='col-span-1 md:col-span-1 flex flex-col gap-6 text-left'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-black p-2 rounded-xl shadow-lg'>
                            <RiRobot2Fill className='text-white text-xl' />
                        </div>
                        <h2 className='font-black text-xl tracking-tight text-gray-900'>Interview<span className='text-emerald-500'>IQ</span></h2>
                    </div>
                    <p className='text-gray-400 text-sm leading-relaxed max-w-[240px] font-medium'>
                        The professional frontier for AI-driven mock interviews and career-changing insights.
                    </p>
                    <div className='flex items-center gap-5 mt-4'>
                        {[FaGithub, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                whileHover={{ y: -3, color: '#10b981' }}
                                className='text-gray-300 transition-colors'
                            >
                                <Icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className='flex flex-col gap-6 text-left'>
                    <h3 className='font-black text-gray-900 text-[10px] uppercase tracking-[0.3em]'>Ecosystem</h3>
                    <div className='flex flex-col gap-4'>
                        {[
                            { name: "Terminal Home", path: "/" },
                            { name: "Launch Interview", path: "/interview" },
                            { name: "Pricing Tiers", path: "/pricing" },
                            { name: "Career History", path: "/history" }
                        ].map((link, i) => (
                            <Link
                                key={i}
                                to={link.path}
                                className='text-gray-400 hover:text-emerald-600 text-sm font-bold transition-all hover:translate-x-1 inline-block w-fit'
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Company */}
                <div className='flex flex-col gap-6 text-left'>
                    <h3 className='font-black text-gray-900 text-[10px] uppercase tracking-[0.3em]'>Protocol</h3>
                    <div className='flex flex-col gap-4'>
                        {["Our Vision", "Privacy Layer", "Candidate Terms", "Direct Hotline"].map((item, i) => (
                            <a
                                key={i}
                                href="#"
                                className='text-gray-400 hover:text-emerald-600 text-sm font-bold transition-all hover:translate-x-1 inline-block w-fit'
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Newsletter / CTA */}
                <div className='flex flex-col gap-6 text-left'>
                    <h3 className='font-black text-gray-900 text-[10px] uppercase tracking-[0.3em]'>Briefings</h3>
                    <p className='text-gray-400 text-sm leading-relaxed font-medium'>Subscribe for secret AI tactics and early access to new modes.</p>
                    <div className='flex gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 group focus-within:ring-4 focus-within:ring-emerald-500/5 transition-all'>
                        <input
                            type="email"
                            placeholder="agent@email.com"
                            className='bg-transparent border-none outline-none px-4 py-2 text-sm text-gray-700 w-full placeholder:text-gray-200 font-bold'
                        />
                        <button className='bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95'>
                            JOIN
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='max-w-7xl mx-auto px-6 mt-24 pt-10 border-t border-gray-100/50 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10'>
                <p className='text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]'>
                    &copy; {new Date().getFullYear()} InterviewIQ.AI &bull; Advanced Career Logic
                </p>
                <div className='flex items-center gap-6'>
                    <p className='text-gray-300 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2'>
                        Made with <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className='text-emerald-400'>&hearts;</motion.span> for the future.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
