import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaBriefcase, FaUser, FaMicrophone, FaChartBar, FaCloudUploadAlt, FaMagic } from 'react-icons/fa'
import { HiX, HiCheckCircle } from 'react-icons/hi'
import { BsArrowRightShort } from 'react-icons/bs'
import axios from 'axios'
import { ServerUrl } from '../App'
import { useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { useDispatch } from 'react-redux'

function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [role, setRole] = useState("")
    const [experience, setExperience] = useState("")
    const [mode, setMode] = useState("")
    const [resumeFile, setResumeFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [projects, setProjects] = useState([])
    const [skills, setSkills] = useState([])
    const [resumeText, setResumeText] = useState("")
    const [analysisDone, setAnalysisDone] = useState(false)
    const [analyzing, setAnalyzing] = useState(false)

    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setResumeFile(file)
        }
    }

    const triggerFileUpload = () => {
        fileInputRef.current?.click()
    }

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true);
        const formData = new FormData();
        formData.append("resume", resumeFile);

        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formData, { withCredentials: true })
            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);
            setAnalyzing(false);
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to analyze resume. Please try again.");
            setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true);
        try {
            const result = await axios.post(ServerUrl + "/api/interview/generate-questions", { role, experience, mode, resumeText, projects, skills }, { withCredentials: true })
            if (userData) {
                dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
            }
            setLoading(false);
            onStart(result.data);
        } catch (error) {
            console.log(error)
            const message = error.response?.data?.message || "Failed to start interview. Please try again.";
            if (message === "Insufficient credits") {
                if (window.confirm("You have insufficient credits. Would you like to top up now?")) {
                    navigate('/pricing');
                }
            } else {
                alert(message);
            }
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F8FAFB] p-4 sm:p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[120px] opacity-40 -mr-40 -mt-40' />
            <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] opacity-30 -ml-20 -mb-20' />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/80 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-white overflow-hidden flex flex-col md:flex-row max-w-6xl w-full h-auto min-h-[400px] md:h-auto md:max-h-[850px]"
            >
                {/* Left Panel: Feature Highlight (Desktop Only) */}
                <div className="hidden md:flex md:w-[42%] bg-emerald-50/50 p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
                    <div className='absolute top-0 right-0 p-10 text-9xl font-black text-white/40 pointer-events-none select-none'>
                        AI
                    </div>

                    <div>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className='inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-8'
                        >
                            <FaMagic className='text-emerald-500 text-xs' />
                            <span className='text-[10px] font-black uppercase tracking-widest text-emerald-800'>Onboarding Phase</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tighter">
                            Your Journey <br />Starts <span className='text-emerald-500'>Here.</span>
                        </h1>
                        <p className="text-gray-500 mb-12 text-lg font-medium leading-relaxed max-w-sm">
                            Tailor your interview experience in seconds. Our AI analyzes your background to challenge you effectively.
                        </p>

                        <div className="space-y-4">
                            {[
                                { icon: FaUser, text: "Role & Level Targeting" },
                                { icon: FaMicrophone, text: "Audio-First Interaction" },
                                { icon: FaChartBar, text: "High-Fidelity Analytics" },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 + (idx * 0.1) }}
                                    className="flex items-center space-x-4 p-5 rounded-3xl bg-white border border-emerald-100 shadow-sm group hover:scale-[1.02] transition-transform"
                                >
                                    <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-700 text-sm tracking-tight">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <p className='text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200 mt-12'>Powered by LLM v4.2</p>
                </div>

                {/* Right Panel: Form */}
                <div className="w-full md:w-[58%] p-8 md:p-14 bg-white flex flex-col justify-center relative overflow-y-auto custom-scrollbar">
                    {/* Close button */}
                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-10 right-10 p-3 text-gray-400 hover:text-gray-900 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer group"
                    >
                        <HiX className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                    </button>

                    <div className='mb-12'>
                        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">Configure Interview</h2>
                        <div className='w-12 h-1.5 bg-emerald-500 rounded-full' />
                    </div>

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleStart(); }}>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            <div className="relative group">
                                <label className='block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1'>Target Role</label>
                                <div className='relative'>
                                    <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Fullstack Dev"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/30 transition-all outline-none text-gray-900 font-bold placeholder:text-gray-300"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className='block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1'>Experience</label>
                                <div className='relative'>
                                    <FaBriefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="2+ Years"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/30 transition-all outline-none text-gray-900 font-bold placeholder:text-gray-300"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='group'>
                            <label className='block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1'>Interview Mode</label>
                            <select
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                                className="w-full px-6 py-4.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/30 transition-all outline-none text-gray-900 font-black appearance-none cursor-pointer"
                                required
                            >
                                <option value="" disabled>Select Core Focus</option>
                                <option value="technical">Technical Depth</option>
                                <option value="behavioral">HR & Soft Skills</option>
                                <option value="hr">Full Screening</option>
                            </select>
                        </div>

                        {/* Resume Section */}
                        <div className='pt-2'>
                            {!analysisDone ? (
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    onClick={triggerFileUpload}
                                    className={`relative border-2 border-dashed rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center cursor-pointer transition-all group overflow-hidden ${resumeFile ? 'border-emerald-300 bg-emerald-50/30' : 'border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/10'}`}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                    {analyzing && <motion.div
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                        className='absolute bottom-0 left-0 w-full h-1 bg-emerald-500'
                                    />}

                                    <div className={`p-5 rounded-3xl mb-4 transition-all ${resumeFile ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-50 text-gray-400 group-hover:text-emerald-500 group-hover:bg-emerald-50'}`}>
                                        <FaCloudUploadAlt className="w-8 h-8" />
                                    </div>
                                    <span className={`font-black text-sm text-center mb-1 group-hover:text-gray-900 transition-colors ${resumeFile ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {resumeFile ? resumeFile.name : "Smart PDF Sync"}
                                    </span>
                                    {!resumeFile && <p className='text-[10px] font-black uppercase tracking-widest text-gray-300'>Extraction & Auto-Fill</p>}

                                    {resumeFile && (
                                        <div className="mt-6 flex items-center gap-4 relative z-10">
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); handleUploadResume(); }}
                                                disabled={analyzing}
                                                className={`px-8 py-3 rounded-2xl font-black text-xs transition-all active:scale-95 ${analyzing
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : "bg-gray-900 text-white hover:bg-black shadow-xl"
                                                    }`}
                                            >
                                                {analyzing ? "Reading Resume..." : "Extract Data"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); setResumeFile(null); setAnalysisDone(false); }}
                                                className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                            >
                                                <HiX />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-8 shadow-sm"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className='flex items-center gap-2'>
                                            <HiCheckCircle className='text-emerald-500 text-xl' />
                                            <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight">Sync Completed</h3>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => { setAnalysisDone(false); setResumeFile(null); }}
                                            className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-500"
                                        >
                                            Reset Sync
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {projects.length > 0 && (
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-800/50 mb-3">Key Projects Targeted</p>
                                                <div className='flex flex-wrap gap-2'>
                                                    {projects.map((project, idx) => (
                                                        <span key={idx} className="px-4 py-2 bg-emerald-100/50 text-emerald-800 rounded-xl text-[11px] font-black border border-emerald-200/50">
                                                            {project}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {skills.length > 0 && (
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-800/50 mb-3">Skills Identified</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {skills.map((skill, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1.5 bg-white text-emerald-700 rounded-lg text-[10px] font-black border border-emerald-100 shadow-sm"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !role || !experience || !mode || analyzing}
                            className={`w-full py-5 mt-4 rounded-2xl font-black text-lg transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden ${loading || !role || !experience || !mode || analyzing
                                ? "bg-gray-100 cursor-not-allowed text-gray-400"
                                : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20 group"
                                }`}
                        >
                            {loading && <div className='absolute bottom-0 left-0 h-1.5 bg-white/20 w-full overflow-hidden'>
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className='w-1/2 h-full bg-white/40'
                                />
                            </div>}
                            <span>{loading ? "Generating Experience..." : "Launch Interview"}</span>
                            {!loading && <BsArrowRightShort size={28} className='group-hover:translate-x-1 transition-transform' />}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default Step1SetUp