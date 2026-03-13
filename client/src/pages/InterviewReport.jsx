import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiOutlineDownload, HiOutlineChartBar, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineChatAlt2 } from "react-icons/hi";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ServerUrl } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function InterviewReport() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const reportRef = useRef();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await axios.get(`${ServerUrl}/api/interview/report/${id}`, {
          withCredentials: true
        });
        setReport(result.data);
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const downloadPDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`InterviewIQ_Report_${id}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFB] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-8"></div>
        <p className="text-gray-400 font-extrabold uppercase tracking-[0.3em] text-xs">Synthesizing Analytics...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#F8FAFB] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Payload Missing</h2>
          <p className="text-gray-400 mb-10 max-w-xs font-medium">The diagnostic report for this session cannot be retrieved from the server.</p>
          <button onClick={() => navigate("/history")} className="bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black hover:bg-black transition-all shadow-2xl active:scale-95">Back to Logs</button>
        </div>
      </div>
    );
  }

  const { confidence, communication, correctness, questionWiseScore } = report;

  const chartData = questionWiseScore.map((q, idx) => ({
    name: `Q${idx + 1}`,
    score: q.score
  }));

  const finalScore = questionWiseScore.reduce((acc, curr) => acc + curr.score, 0) / questionWiseScore.length;

  const getRecommendation = (score) => {
    if (score >= 8) return {
      title: "Elite Status Achieved",
      subtitle: "Your technical depth and articulation are industry-leading. Maintain this trajectory.",
      tag: "EXCELLENT"
    };
    if (score >= 6) return {
      title: "Strong Competency",
      subtitle: "Solid foundational knowledge. Focus on structural clarity for technical edge.",
      tag: "GOOD"
    };
    return {
      title: "Development Required",
      subtitle: "Focus on precision and confidence. More simulations are highly recommended.",
      tag: "IMPROVE"
    };
  };

  const rec = getRecommendation(finalScore);

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-40 pb-32" ref={reportRef}>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-10 mb-12 md:mb-16"
        >
          <div className="flex items-start gap-4 md:gap-6">
            <button
              onClick={() => navigate("/history")}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all text-gray-400 hover:text-emerald-600 border border-gray-100 cursor-pointer shrink-0"
            >
              <HiArrowLeft className="text-lg md:text-xl" />
            </button>
            <div>
              <div className='flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-100 mb-3 md:mb-4 w-fit'>
                <HiOutlineChartBar className='text-emerald-500 text-[10px]' />
                <span className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-500'>Performance Diagnostic</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">Diagnostic <br /><span className="text-emerald-500">Dashboard.</span></h1>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <button
              onClick={downloadPDF}
              className="flex-1 lg:flex-none flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white px-6 md:px-8 py-4 md:py-4.5 rounded-xl md:rounded-[2rem] font-black text-xs md:text-sm transition-all shadow-2xl active:scale-95 shadow-black/10"
            >
              <HiOutlineDownload className="text-lg md:text-xl" />
              <span>EXPORT PDF</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column: Primary Stats */}
          <div className="lg:col-span-4 space-y-8 lg:space-y-12">

            {/* Overall Performance Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center relative overflow-hidden group"
            >
              <div className='absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50 -mr-16 -mt-16 transition-all group-hover:scale-150' />

              <div className="w-16 h-1 bg-emerald-100 rounded-full mb-10 group-hover:w-24 transition-all duration-700" />

              <div className="w-40 h-40 md:w-48 md:h-48 mb-6 md:mb-10 flex items-center justify-center relative">
                <CircularProgressbar
                  value={finalScore * 10}
                  text={`${Math.round(finalScore)}/10`}
                  strokeWidth={10}
                  styles={buildStyles({
                    pathColor: '#10b981',
                    textColor: '#1a2b3b',
                    trailColor: '#F8FAFB',
                    textSize: '24px',
                    strokeLinecap: 'butt',
                  })}
                />
                <div className='absolute inset-0 border-4 md:border-8 border-white rounded-full shadow-inner pointer-events-none' />
              </div>

              <div className="relative z-10">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block ${finalScore >= 7 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {rec.tag} PERFORMANCE
                </span>
                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tighter leading-none">{rec.title}</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs">{rec.subtitle}</p>
              </div>
            </motion.div>

            {/* Multi-Dimensional Skill Matrix */}
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-gray-50">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em]">Skill Metrics</h3>
                <HiOutlineLightningBolt className="text-emerald-500" />
              </div>
              <div className="space-y-12">
                {[
                  { label: "Confidence", value: confidence, icon: HiOutlineShieldCheck, color: "emerald" },
                  { label: "Communication", value: communication, icon: HiOutlineChatAlt2, color: "emerald" },
                  { label: "Technical depth", value: correctness, icon: HiOutlineLightningBolt, color: "emerald" }
                ].map((skill, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <skill.icon className="text-emerald-500" size={18} />
                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">{skill.label}</span>
                      </div>
                      <span className="text-lg font-black text-gray-900">{skill.value}/10</span>
                    </div>
                    <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.value * 10}%` }}
                        className="h-full bg-linear-to-r from-emerald-500 via-emerald-400 to-emerald-300 rounded-full"
                        transition={{ duration: 1.5, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Execution Trend & Granular Breakdown */}
          <div className="lg:col-span-8 space-y-8 lg:space-y-12">

            {/* Performance Flow Chart */}
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-gray-50 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 md:mb-12 relative z-10">
                <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em]">Performance Flow</h3>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">REAL-TIME TREND</span>
              </div>

              <div className="h-[350px] w-full relative z-10 px-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#F1F5F9" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#CBD5E1', fontSize: 10, fontWeight: 'bold' }}
                      dy={15}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#CBD5E1', fontSize: 10, fontWeight: 'bold' }}
                      domain={[0, 10]}
                      ticks={[0, 5, 10]}
                    />
                    <Tooltip
                      cursor={{ stroke: '#10B981', strokeWidth: 2, strokeDasharray: '4 4' }}
                      contentStyle={{
                        borderRadius: '24px',
                        border: '1px solid #F1F5F9',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                        padding: '16px',
                        fontWeight: '900',
                        fontSize: '14px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#10B981"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorScore)"
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className='absolute bottom-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[100px] opacity-20 -mr-32 -mb-32' />
            </div>

            {/* Granular Feedback Matrix */}
            <div className="bg-transparent space-y-8">
              <div className="flex items-center justify-between px-4">
                <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em]">Granular Payload</h3>
                <div className="h-px bg-gray-100 flex-1 mx-8" />
              </div>

              <div className="space-y-8">
                {questionWiseScore.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.02)] border border-gray-50 hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] transition-all relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-xl text-xs font-black shadow-lg shadow-black/10 transition-transform group-hover:rotate-12">
                          {idx + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">Target Dimension</span>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${item.score >= 7 ? 'text-emerald-500' : 'text-amber-500'}`}>
                            {item.score >= 7 ? 'HIGH ALIGNMENT' : 'MODERATE SYNC'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Score</p>
                        <p className={`text-2xl font-black ${item.score >= 7 ? 'text-emerald-500' : 'text-amber-500'}`}>{item.score}/10</p>
                      </div>
                    </div>

                    <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-6 md:mb-8 tracking-tight leading-tight max-w-2xl">{item.question}</h4>

                    <div className="bg-emerald-50/30 p-5 md:p-8 rounded-xl md:rounded-[2rem] border border-emerald-100/50 group-hover:bg-emerald-50/50 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
                          <HiOutlineChatAlt2 size={14} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">Agent Intelligence Response</span>
                      </div>
                      <p className="text-gray-600 text-[13px] md:text-sm font-medium leading-relaxed italic">
                        "{item.feedback || "Strategic alignment confirmed. No critical refinements required for this specific dimension."}"
                      </p>
                    </div>

                    <div className='absolute bottom-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-40 -mr-16 -mb-16' />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default InterviewReport;