import React from 'react'
import { RiRobot2Fill } from 'react-icons/ri'
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='w-full bg-white border-t border-gray-100 pt-16 pb-12'>
            <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12'>
                {/* Brand Section */}
                <div className='col-span-1 md:col-span-1 flex flex-col gap-4 text-left'>
                    <div className='flex items-center gap-2.5'>
                        <div className='bg-black p-1.5 rounded-lg'>
                            <RiRobot2Fill className='text-white text-lg' />
                        </div>
                        <h2 className='font-bold text-lg tracking-tight text-gray-800'>InterviewIQ.AI</h2>
                    </div>
                    <p className='text-gray-400 text-sm leading-relaxed max-w-[240px]'>
                        Empowering your career with AI-driven mock interviews and real-time performance insights.
                    </p>
                    <div className='flex items-center gap-4 mt-2'>
                        <a href="#" className='text-gray-400 hover:text-black transition-colors'><FaGithub size={18} /></a>
                        <a href="#" className='text-gray-400 hover:text-black transition-colors'><FaTwitter size={18} /></a>
                        <a href="#" className='text-gray-400 hover:text-black transition-colors'><FaLinkedin size={18} /></a>
                        <a href="#" className='text-gray-400 hover:text-black transition-colors'><FaInstagram size={18} /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className='flex flex-col gap-5 text-left'>
                    <h3 className='font-bold text-gray-800 text-sm uppercase tracking-widest'>Product</h3>
                    <div className='flex flex-col gap-3'>
                        <Link to="/" className='text-gray-400 hover:text-black text-[15px] transition-colors'>Home</Link>
                        <Link to="/interview" className='text-gray-400 hover:text-black text-[15px] transition-colors'>Start Interview</Link>
                        <Link to="/pricing" className='text-gray-400 hover:text-black text-[15px] transition-colors'>Pricing</Link>
                        <Link to="/history" className='text-gray-400 hover:text-black text-[15px] transition-colors'>Interview History</Link>
                    </div>
                </div>

                {/* Company */}
                <div className='flex flex-col gap-5 text-left'>
                    <h3 className='font-bold text-gray-800 text-sm uppercase tracking-widest'>Company</h3>
                    <div className='flex flex-col gap-3'>
                        <a href="#" className='text-gray-400 hover:text-black text-[15px] transition-colors'>About Us</a>
                        <a href="#" className='text-gray-400 hover:text-black text-[15px] transition-colors'>Privacy Policy</a>
                        <a href="#" className='text-gray-400 hover:text-black text-[15px] transition-colors'>Terms of Service</a>
                        <a href="#" className='text-gray-400 hover:text-black text-[15px] transition-colors'>Contact</a>
                    </div>
                </div>

                {/* Newsletter / CTA */}
                <div className='flex flex-col gap-5 text-left'>
                    <h3 className='font-bold text-gray-800 text-sm uppercase tracking-widest'>Stay Updated</h3>
                    <p className='text-gray-400 text-sm leading-relaxed'>Join our newsletter for latest updates and AI interview tips.</p>
                    <div className='flex gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100'>
                        <input
                            type="email"
                            placeholder="Email address"
                            className='bg-transparent border-none outline-none px-3 py-2 text-sm text-gray-700 w-full'
                        />
                        <button className='bg-black text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-800 transition-all cursor-pointer'>
                            Join
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4'>
                <p className='text-gray-400 text-xs'>
                    &copy; {new Date().getFullYear()} InterviewIQ.AI. All rights reserved.
                </p>
                <p className='text-gray-300 text-xs flex items-center gap-1'>
                    Made with <span className='text-red-400'>&hearts;</span> for career growth.
                </p>
            </div>
        </footer>
    )
}

export default Footer
