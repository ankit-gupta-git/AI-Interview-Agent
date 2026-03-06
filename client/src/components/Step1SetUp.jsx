import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaBriefcase, FaUser, FaMicrophone, FaChartBar, FaCloudUploadAlt } from 'react-icons/fa'
import { HiX } from 'react-icons/hi'
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

            console.log(result.data);

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);

            setAnalyzing(false);

        } catch (error) {
            console.log(error)
        }
    }

    const handleStart = async () => {
        setLoading(true);
        try {
            const result = await axios.post(ServerUrl + "/api/interview/generate-questions", { role, experience, mode, resumeText, projects, skills }, { withCredentials: true })
            console.log(result.data);
            if (userData) {
                dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
            }
            setLoading(false);
            onStart(result.data);

        } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || "Failed to start interview. Please try again.");
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100/50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full "
            >
                {/* Left Panel: Feature Highlight */}
                <div className="md:w-1/2 bg-linear-to-br from-green-50 to-green-100 p-8 md:p-12 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                        Start Your AI Interview
                    </h1>
                    <p className="text-gray-600 mb-10 text-lg">
                        Practice real interview scenarios powered by AI. Improve communication, technical skills, and confidence.
                    </p>

                    <div className="space-y-6">
                        {[
                            { icon: FaUser, text: "Choose Role & Experience", color: "text-green-600 bg-white" },
                            { icon: FaMicrophone, text: "Smart Voice Interview", color: "text-green-600 bg-white" },
                            { icon: FaChartBar, text: "Performance Analytics", color: "text-green-600 bg-white" },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ x: 10 }}
                                className="flex items-center space-x-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100"
                            >
                                <div className={`p-3 rounded-lg ${item.color}`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-gray-700">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Form */}
                <div className="md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center relative">
                    {/* Close button if needed - added for UI completeness */}
                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <HiX className="w-6 h-6" />
                    </button>

                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Interview SetUp</h2>

                    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleStart(); }}>
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Enter role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none text-gray-800 placeholder:text-gray-400"
                                required
                            />
                        </div>

                        <div className="relative">
                            <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Experience (e.g. 2 years)"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none text-gray-800 placeholder:text-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <select
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none text-gray-800 appearance-none font-medium"
                                required
                            >
                                <option value="" disabled>Select Interview Mode</option>
                                <option value="technical">Technical Interview</option>
                                <option value="behavioral">Behavioral Interview</option>
                                <option value="hr">HR Interview</option>
                            </select>
                        </div>

                        {!analysisDone ? (
                            <div
                                onClick={triggerFileUpload}
                                className="mt-6 border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50/30 transition-all group"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept=".pdf,.doc,.docx"
                                />
                                <div className="p-4 rounded-full bg-green-50 text-green-600 mb-3 group-hover:scale-110 transition-transform">
                                    <FaCloudUploadAlt className="w-8 h-8" />
                                </div>
                                <span className="text-gray-600 font-medium text-center">
                                    {resumeFile ? resumeFile.name : "Click to upload resume (Optional)"}
                                </span>
                                {resumeFile && (
                                    <div className="mt-4 flex flex-col items-center space-y-2">
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); handleUploadResume(); }}
                                            disabled={analyzing}
                                            className={`px-6 py-2 rounded-lg font-semibold transition-all ${analyzing
                                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                : "bg-gray-800 text-white hover:bg-black shadow-md"
                                                }`}
                                        >
                                            {analyzing ? "Analyzing..." : "Analyze Resume"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setResumeFile(null); setAnalysisDone(false); }}
                                            className="text-sm text-red-500 hover:underline"
                                        >
                                            Remove file
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-6 bg-gray-50 border border-gray-100 rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-gray-800">Resume Analysis Result</h3>
                                    <button
                                        type="button"
                                        onClick={() => { setAnalysisDone(false); setResumeFile(null); }}
                                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                                    >
                                        Clear Result
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {projects.length > 0 && (
                                        <div>
                                            <p className="text-sm font-bold text-gray-700 mb-2">Projects:</p>
                                            <ul className="space-y-1">
                                                {projects.map((project, idx) => (
                                                    <li key={idx} className="text-xs text-gray-600 flex items-start space-x-2">
                                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                                                        <span>{project}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {skills.length > 0 && (
                                        <div>
                                            <p className="text-sm font-bold text-gray-700 mb-2">Skills:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 bg-green-100/50 text-green-700 rounded-full text-[10px] font-bold tracking-tight uppercase"
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

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading || !role || !experience || !mode || analyzing}
                            className={`w-full py-4 mt-6 rounded-xl font-bold text-lg transition-all shadow-lg ${loading || !role || !experience || !mode || analyzing
                                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                                : "bg-green-500 text-white hover:bg-green-600 shadow-green-200"
                                }`}
                        >
                            {loading ? "Starting Interview..." : "Start Interview"}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default Step1SetUp