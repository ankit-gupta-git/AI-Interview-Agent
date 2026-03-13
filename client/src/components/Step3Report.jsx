import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineDownload, HiOutlineChartBar, HiOutlineHome } from 'react-icons/hi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

function Step3Report({ report }) {
  const navigate = useNavigate();
  const reportRef = useRef();

  if (!report) return null;

  const { confidence, communication, correctness, questionWiseScore = [] } = report;

  // Prepare data for the trend chart
  const chartData = questionWiseScore.map((q, idx) => ({
    name: `Q${idx + 1}`,
    score: q.score || 0
  }));

  const finalScore = questionWiseScore.length > 0
    ? questionWiseScore.reduce((acc, curr) => acc + (curr.score || 0), 0) / questionWiseScore.length
    : 0;

  const getRecommendation = (score) => {
    if (score >= 8) return { title: "Excellent Performance!", subtitle: "Keep up the great work and maintain this level." };
    if (score >= 6) return { title: "Good Progress.", subtitle: "A bit more focus on specific technical parts will help." };
    return { title: "Significant improvement required.", subtitle: "Work on clarity and confidence." };
  };

  const recommendation = getRecommendation(finalScore);

  const downloadPDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Interview_Summary.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] p-4 sm:p-8 md:p-12" ref={reportRef}>
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-[#1a2b3b]">Interview Analytics Dashboard</h1>
            <p className="text-gray-400 text-sm">AI-powered performance insights</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={downloadPDF}
              className="flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-sm active:scale-95"
            >
              <HiOutlineDownload className="text-lg" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Stats */}
          <div className="lg:col-span-4 space-y-8">

            {/* Overall Performance Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <p className="text-gray-400 font-semibold mb-8">Overall Performance</p>
              <div className="w-40 h-40 mb-6 flex items-center justify-center relative">
                <CircularProgressbar
                  value={finalScore * 10}
                  text={`${Math.round(finalScore)}/10`}
                  styles={buildStyles({
                    pathColor: '#10b981',
                    textColor: '#1a2b3b',
                    trailColor: '#F3F4F6',
                    textSize: '20px',
                    strokeLinecap: 'round',
                  })}
                />
              </div>
              <p className="text-gray-400 text-xs font-bold mb-6">Out of 10</p>
              <h3 className="text-lg font-bold text-[#1a2b3b] mb-1">{recommendation.title}</h3>
              <p className="text-gray-400 text-sm">{recommendation.subtitle}</p>
            </div>

            {/* Skill Evaluation Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-md font-bold text-[#1a2b3b] mb-8">Skill Evaluation</h3>
              <div className="space-y-8">
                {[
                  { label: "Confidence", value: confidence },
                  { label: "Communication", value: communication },
                  { label: "Correctness", value: correctness }
                ].map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-600">{skill.label}</span>
                      <span className="text-sm font-bold text-[#059669]">{skill.value}</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(skill.value || 0) * 10}%` }}
                        className="h-full bg-emerald-500 rounded-full"
                        transition={{ duration: 1, delay: i * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Trend & Breakdown */}
          <div className="lg:col-span-8 space-y-8">

            {/* Performance Trend Chart */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-md font-bold text-[#1a2b3b] mb-8">Performance Trend</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      domain={[0, 10]}
                      ticks={[0, 3, 6, 10]}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ r: 6, fill: '#10B981', strokeWidth: 0 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/history")}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all active:scale-95"
              >
                <HiOutlineChartBar className="text-xl" />
                Full History
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95"
              >
                <HiOutlineHome className="text-xl" />
                Exit Dashboard
              </button>
            </div>

            {/* Question Breakdown */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-md font-bold text-[#1a2b3b] mb-8">Question Breakdown</h3>
              <div className="space-y-6">
                {questionWiseScore.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-gray-50/50 border border-gray-50">
                    <p className="text-gray-400 text-xs font-bold mb-2">Question {idx + 1}</p>
                    <h4 className="text-[#1a2b3b] font-bold mb-4">{item.question}</h4>
                    <div className="bg-white p-4 rounded-xl border border-emerald-50">
                      <p className="text-emerald-800 text-xs font-bold mb-2">AI Feedback</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.feedback || "No specific feedback available for this response."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step3Report;