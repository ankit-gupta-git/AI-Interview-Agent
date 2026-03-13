import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiOutlineBriefcase, HiOutlineClipboardList, HiOutlineClock } from "react-icons/hi";
import { ServerUrl } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function InterviewHistory() {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interviews", {
                    withCredentials: true
                });
                setInterviews(result.data);
            } catch (error) {
                console.log("Error fetching interviews:", error);
            } finally {
                setLoading(false);
            }
        };

        getMyInterviews();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFB] flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-32 md:pt-40 pb-20 md:pb-32">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16"
                >
                    <div className="flex items-start gap-6">
                        <button
                            onClick={() => navigate("/")}
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all text-gray-400 hover:text-emerald-600 border border-gray-100 cursor-pointer shrink-0"
                        >
                            <HiArrowLeft className="text-lg md:text-xl" />
                        </button>
                        <div>
                            <div className='flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 mb-3 md:mb-4 w-fit'>
                                <HiOutlineClock className='text-emerald-500 text-[10px]' />
                                <span className='text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800'>Career Log</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-3 md:mb-4">Interview <span className="text-emerald-500">History.</span></h1>
                            <p className="text-gray-400 text-sm md:text-lg font-medium max-w-md">Reflect on your past performance and track your growth over time.</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6 w-full md:w-auto">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Sessions</span>
                            <span className="text-xl md:text-2xl font-black text-gray-900 leading-none">{interviews.length}</span>
                        </div>
                        <div className="w-px h-10 bg-gray-100" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Status</span>
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Content Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-6"
                >
                    {loading ? (
                        <div className="col-span-full py-32 flex flex-col items-center justify-center bg-white/50 backdrop-blur-xl rounded-[3rem] border border-white">
                            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
                            <p className="text-gray-400 font-extrabold uppercase tracking-widest text-xs">Retrieving Data...</p>
                        </div>
                    ) : interviews.length === 0 ? (
                        <div className="col-span-full py-40 flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-xl rounded-[3rem] border border-white relative overflow-hidden">
                            <div className='absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-40 -mr-32 -mt-32' />
                            <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner">
                                <HiOutlineClipboardList className="text-5xl text-emerald-200" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tighter uppercase">No sessions logged</h3>
                            <p className="text-gray-400 mb-10 max-w-xs font-medium">Your career timeline is empty. Launch an AI interview to begin tracking performance.</p>
                            <button
                                onClick={() => navigate("/interview")}
                                className="bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-[2rem] font-black text-lg transition-all shadow-2xl active:scale-95 flex items-center gap-3"
                            >
                                <span>Start Journey</span>
                                <HiOutlineBriefcase />
                            </button>
                        </div>
                    ) : (
                        interviews.map((interview, index) => (
                            <motion.div
                                key={interview._id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.005, y: -2 }}
                                className="group bg-white/70 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 border border-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8"
                            >
                                <div className="flex items-center gap-4 md:gap-8">
                                    <div className="w-14 h-14 md:w-20 md:h-20 bg-emerald-50 rounded-xl md:rounded-[2rem] flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-inner shrink-0">
                                        <HiOutlineBriefcase className="text-2xl md:text-3xl text-emerald-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                                {interview.mode}
                                            </span>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100 px-3 py-1 rounded-full">
                                                {interview.experience}
                                            </span>
                                        </div>
                                        <h3 className="text-lg md:text-2xl font-black text-gray-900 tracking-tight group-hover:text-emerald-600 transition-colors truncate max-w-[200px] md:max-w-none">{interview.role}</h3>
                                        <div className="flex items-center gap-2 mt-2 text-gray-400">
                                            <HiOutlineClock className="text-lg" />
                                            <span className="text-[12px] font-bold">
                                                {new Date(interview.createdAt).toLocaleDateString(undefined, {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-10">
                                    <div className="text-left md:text-right">
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">Performance Index</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className={`text-3xl md:text-4xl font-black ${interview.finalScore >= 7 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                {interview.finalScore ? Math.round(interview.finalScore) : '0'}
                                            </span>
                                            <span className="text-gray-300 font-bold text-xs md:text-sm">/10</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/report/${interview._id}`)}
                                        className="bg-gray-900 group-hover:bg-emerald-600 text-white px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-[2rem] font-black text-sm md:text-lg transition-all shadow-xl active:scale-95 w-full md:w-auto"
                                    >
                                        Inspect Report
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}

export default InterviewHistory;