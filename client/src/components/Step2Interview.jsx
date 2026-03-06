import React, { useState } from 'react'
import Timer from './Timer'
import femaleVideo from '../assets/Videos/female-ai.mp4'
import { HiMicrophone } from "react-icons/hi2";

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData || { questions: [] }
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  );
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex] || { question: "First Question" }

  useEffect(() => {

    const loadVoices = () => {

      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      // Try known female voices first
      const femaleVoice = voices.find(v =>
        v.name.toLowerCase().includes("zina") ||
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("female")
      );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      //try known male voices 
      const maleVoice = voices.find(v =>
        v.name.toLowerCase().includes("david") ||
        v.name.toLowerCase().includes("mark") ||
        v.name.toLowerCase().includes("male")
      );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      // Fallback to first available voice
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

  }, []);

  const videoSource = voiceGender === "female" ? femaleVideo : maleVideo;

  /* -------------------- SPEAK FUNCTION -------------------- */

  const speakText = (text) => {
    return new Promise((resolve) => {

      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      // Add natural pauses after commas and periods
      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;

      //human-like pacing
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current?.currentTime = 0;
        setIsAIPlaying(false);

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300)
      };

      setSubtitle(text);

      window.speechSynthesis.speak(utterance);

    });
  };

  //speak function
  useEffect(() => {
    if (!selectedVoice) {
      return;
    }

    const runIntro = async () => {

      if (isIntroPhase) {

        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        );

        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        );

        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise(r => setTimeout(r, 800));

        //if last question (hard level)
        if (currentIndex === questions.length - 1) {
          await speakText(
            "Alright, this one might be a bit more challenging."
          );
        } else {
          await speakText(
            `Question ${currentIndex + 1}: ${currentQuestion.question}`
          );
        }


      }

    };

    runIntro();

  }, [selectedVoice, isIntroPhase, currentIndex]);

  



  // Mock states for demonstration if not provided in interviewData
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  // const [timeLeft, setTimeLeft] = useState(30)
  // const [totalTime, setTotalTime] = useState(60)

  // const currentQuestion = questions[currentQuestionIndex] || { question: "First Question" }

  return (
    <div className="min-h-screen bg-emerald-50/30 flex items-center justify-center p-4 sm:p-6 md:p-8">

      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col lg:flex-row overflow-hidden min-h-[650px]">

        {/* Left Section: Video & Status */}
        <div className="w-full lg:w-[35%] bg-white flex flex-col p-8 border-r border-gray-100">

          {/* Avatar Video */}
          <div className='w-full aspect-4/3 rounded-2xl overflow-hidden shadow-lg mb-8'>
            <video
              src={videoSource}
              key={voiceSource}
              ref={videoRef}
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* subtitle */}

          {subtitle && (
            <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">

              <p className="text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed">
                {subtitle}
              </p>

            </div>
          )}

          {/* interview status */}
          <div className='w-full bg-white border border-gray-100 rounded-3xl shadow-sm p-6 flex flex-col flex-1'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Interview Status
              </span>
              <span className='text-xs font-bold text-emerald-500 flex items-center gap-1'>
                {isAIPlaying && <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>}
                AI Speaking
              </span>
            </div>

            <div className='h-px bg-gray-50 mb-6'></div>

            {/* Timer Section */}
            <div className='flex-1 flex items-center justify-center py-4'>
              <Timer
                timeLeft={timeLeft}
                totalTime={totalTime}
              />
            </div>

            <div className='h-px bg-gray-50 mt-6 mb-6'></div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 leading-none mb-1">
                  {currentQuestionIndex + 1}
                </div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-tight">
                  Current Questions
                </div>
              </div>

              <div className="text-center border-l border-gray-50">
                <div className="text-2xl font-bold text-emerald-600 leading-none mb-1">
                  {questions.length || 5}
                </div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-tight">
                  Total Questions
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Content */}
        <div className="flex-1 flex flex-col p-8 md:p-10">

          <h2 className="text-2xl font-bold text-emerald-600 mb-8">
            AI Smart Interview
          </h2>

          {/* Question Box */}
          {isIntroPhase ? null : <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 mb-6">
            <p className='text-xs font-semibold text-gray-400 mb-2'>
              Question {currentQuestionIndex + 1} of {questions.length || 5}
            </p>
            <div className="text-lg font-bold text-gray-800 leading-snug">
              {currentQuestion?.question}
            </div>
          </div>}

          {/* Answer Input */}
          <div className="flex-1 flex flex-col mb-6">
            <textarea
              placeholder="Type your answer here..."
              className="flex-1 w-full bg-gray-50/50 p-6 rounded-2xl resize-none outline-none border border-gray-100 focus:border-emerald-200 focus:ring-4 focus:ring-emerald-500/5 transition-all text-gray-700 placeholder:text-gray-300"
            />
          </div>

          {/* Footer Bar */}
          <div className='flex items-center gap-4'>
            <button className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition-colors shadow-lg shrink-0">
              <HiMicrophone className="text-xl" />
            </button>

            <button
              onClick={() => onFinish?.()}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
            >
              Submit Answer
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Step2Interview
