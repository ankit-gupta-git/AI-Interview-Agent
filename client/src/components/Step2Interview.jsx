import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Timer from './Timer'
import femaleVideo from '../assets/Videos/female-ai.mp4'
import maleVideo from '../assets/Videos/male-ai.mp4'
import { HiMicrophone } from "react-icons/hi2";
import { BsArrowRightCircleFill, BsFillRecordFill, BsSoundwave } from "react-icons/bs"
import { RiRobot2Fill } from 'react-icons/ri'
import axios from 'axios';
import { ServerUrl } from '../App';

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData || { questions: [] }
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const userAnsweringRef = useRef(true);
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

      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const videoSource = voiceGender === "female" ? femaleVideo : maleVideo;

  // Declare mic control functions early so they can be used by speakText
  const startMic = () => {
    if (recognitionRef.current && !isAIPlaying) {
      try {
        // Stop first to reset state, then start fresh
        recognitionRef.current.stop();
        setTimeout(() => {
          recognitionRef.current.start();
          console.log("Microphone started");
        }, 100);
      } catch (e) {
        console.log("Mic start error:", e);
      }
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        console.log("Microphone stopped");
      } catch (e) {
        console.log("Mic stop error:", e);
      }
    }
  };

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();
      const humanText = text.replace(/,/g, ", ... ").replace(/\./g, ". ... ");
      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic();
        videoRef.current?.play();
      };

      utterance.onend = () => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
        setIsAIPlaying(false);
        if (isMicOn) startMic();
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300)
      };

      utterance.onerror = (e) => {
        console.error("SpeechSynthesis error:", e);
        setIsAIPlaying(false);
        if (isMicOn) startMic();
        resolve();
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };

  useEffect(() => {
    if (!selectedVoice) return;
    const runIntro = async () => {
      if (isIntroPhase) {
        // Request microphone permission at the beginning
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (error) {
          console.error("Microphone permission denied:", error);
          setSubtitle("Please allow microphone access to continue with the interview.");
        }
        
        await speakText(`Hi ${userName.split(' ')[0]}, I'm your AI interviewer. It's great to have you here today.`);
        await speakText("We'll go through a few targeted questions. Just speak naturally into your microphone. Let's start.");
        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise(r => setTimeout(r, 600));
        if (currentIndex === questions.length - 1) {
          await speakText("For our final round, let's look at something a bit more advanced.");
        }
        await speakText(currentQuestion.question);
        if (isMicOn) startMic();
      }
    };
    runIntro();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000)
    return () => clearInterval(timer);
  }, [isIntroPhase, currentQuestion])

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  }, [currentIndex]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSubtitle("Browser does not support voice recognition. Please use Chrome or Edge.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsMicOn(true);
      console.log("Microphone started listening...");
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsMicOn(false);
      
      // Auto-restart listening if user should still be answering
      if (userAnsweringRef.current) {
        console.log("Auto-restarting speech recognition...");
        setTimeout(() => {
          try {
            if (recognitionRef.current) {
              recognitionRef.current.start();
            }
          } catch (e) {
            console.log("Error restarting recognition:", e);
          }
        }, 300);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsMicOn(false);
      
      if (event.error === "no-speech") {
        setSubtitle("No speech detected. Please speak clearly.");
      } else if (event.error === "network") {
        setSubtitle("Network error. Please check your connection.");
      } else if (event.error === "not-allowed" || event.error === "permission-denied") {
        setSubtitle("Microphone permission denied. Please allow access and try again.");
      } else {
        setSubtitle(`Microphone error: ${event.error}`);
      }
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript.trim();
        
        if (event.results[i].isFinal) {
          if (transcript) {
            finalTranscript += transcript + " ";
          }
        } else {
          if (transcript) {
            interimTranscript += transcript;
          }
        }
      }
      
      // Update answer with final transcript
      if (finalTranscript.trim()) {
        console.log("Final transcript detected:", finalTranscript.trim());
        setAnswer((prev) => {
          const trimmedPrev = prev.trim();
          const trimmedNew = finalTranscript.trim();
          // Avoid duplicate appends if the same transcript is reported twice rapidly
          if (trimmedPrev.endsWith(trimmedNew)) return prev;
          return trimmedPrev ? `${trimmedPrev} ${trimmedNew}` : trimmedNew;
        });
      }
      
      // Show interim results as subtitle for real-time feedback
      if (interimTranscript && !finalTranscript) {
        setSubtitle(`📝 Hearing: "${interimTranscript}"`);
      }
    };
    
    recognitionRef.current = recognition;
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          console.log("Error aborting recognition:", e);
        }
      }
    };
  }, []);

  useEffect(() => {
    // Update the flag based on interview state
    userAnsweringRef.current = !isAIPlaying && !isIntroPhase && !feedback && !isSubmitting;
  }, [isAIPlaying, isIntroPhase, feedback, isSubmitting]);

  const toggleMic = () => {
    if (isMicOn) stopMic(); else startMic();
  };

  // Automatically start mic after AI finishes speaking
  useEffect(() => {
    if (!isAIPlaying && !isIntroPhase && !feedback && !isSubmitting) {
      if (!isMicOn) {
        const timer = setTimeout(() => {
          console.log("Auto-starting microphone after AI finished speaking");
          startMic();
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [isAIPlaying, isIntroPhase, feedback, isSubmitting]);

  const submitAnswer = async () => {
    if (isSubmitting || !answer.trim()) {
      console.log("Cannot submit - isSubmitting:", isSubmitting, "answer empty:", !answer.trim());
      return;
    }
    
    console.log("Submitting answer:", answer);
    stopMic();
    setIsSubmitting(true);
    
    try {
      const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
        interviewId,
        questionIndex: currentIndex,
        answer: answer.trim(),
        timeTaken: currentQuestion.timeLimit - timeLeft,
      }, { withCredentials: true })
      console.log("Answer submitted, feedback:", result.data.feedback);
      setFeedback(result.data.feedback);
      setIsSubmitting(false);
    } catch (error) {
      console.log("Submit error:", error);
      setIsSubmitting(false);
      // Auto-restart mic on error
      if (!isAIPlaying) {
        setTimeout(() => startMic(), 500);
      }
    }
  }

  const handleNext = async () => {
    setAnswer("");
    setFeedback("");
    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }
    await speakText("Great. Let's move to the next one.");
    setCurrentIndex(currentIndex + 1);
  };

  const finishInterview = async () => {
    stopMic();
    setIsMicOn(false);
    try {
      const result = await axios.post(ServerUrl + "/api/interview/finish-interview", { interviewId }, { withCredentials: true })
      onFinish(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col md:items-center md:justify-center p-0 md:p-8 lg:p-12 selection:bg-emerald-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-7xl bg-white/70 backdrop-blur-3xl md:rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.08)] border-b md:border border-gray-100 flex flex-col lg:flex-row overflow-hidden min-h-screen md:min-h-[700px] md:h-[90vh]"
      >

        {/* Left Section: Immersion Panel (Top on Mobile) */}
        <div className="w-full lg:w-[32%] bg-white/40 p-4 md:p-6 flex flex-col border-b lg:border-r border-gray-100/50 relative overflow-hidden">
          <div className='absolute top-0 left-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-40 -ml-16 -mt-16' />

          <div className='flex items-center gap-3 mb-4 md:mb-6 relative z-10'>
            <div className='bg-emerald-600 p-1.5 rounded-lg shadow-lg shadow-emerald-600/20'>
              <RiRobot2Fill className='text-white text-sm md:text-base' />
            </div>
            <div>
              <h3 className='text-[10px] font-black text-gray-900 tracking-tighter uppercase leading-none mb-0.5'>Elite AI Bot</h3>
              <p className='text-[8px] font-black text-emerald-500 uppercase tracking-widest leading-none'>v2.0 Active</p>
            </div>
          </div>

          {/* Avatar Video Container */}
          <div className='relative w-full aspect-video md:aspect-auto md:h-48 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl mb-4 md:mb-6 border-4 border-white group'>
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {isAIPlaying && (
              <div className='absolute top-3 right-3 flex items-center gap-2 bg-emerald-500/90 backdrop-blur-md px-2 py-1 rounded-full shadow-lg'>
                <BsSoundwave className='text-white text-xs animate-pulse' />
                <span className='text-[8px] font-black text-white uppercase tracking-widest'>AI Speaking</span>
              </div>
            )}
          </div>

          {/* Progress & Stats Card */}
          <div className='w-full bg-white rounded-2xl md:rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] p-4 md:p-5 flex flex-col border border-gray-100/50 relative z-10'>
            <div className='flex justify-between items-center mb-4'>
              <p className='text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]'>Environment Ready</p>
              <div className='flex items-center gap-2'>
                <div className='w-1 h-1 rounded-full bg-emerald-500 animate-ping' />
                <span className='text-[8px] font-black text-emerald-600 uppercase tracking-widest'>Secured</span>
              </div>
            </div>

            <div className='flex flex-row md:flex-col items-center justify-between md:justify-center gap-4'>
              <div className="scale-75 md:scale-90 origin-left md:origin-center">
                <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit || 60} />
              </div>

              <div className='flex-1 md:w-full grid grid-cols-2 gap-2 md:gap-3'>
                <div className='bg-gray-50/50 py-2 md:py-3 rounded-xl md:rounded-2xl border border-gray-100 flex flex-col items-center'>
                  <span className='text-base md:text-lg font-black text-gray-900 leading-none mb-1'>{currentIndex + 1}</span>
                  <span className='text-[8px] font-black text-gray-400 uppercase tracking-tighter'>Progress</span>
                </div>
                <div className='bg-gray-50/50 py-2 md:py-3 rounded-xl md:rounded-2xl border border-gray-100 flex flex-col items-center'>
                  <span className='text-base md:text-lg font-black text-gray-900 leading-none mb-1'>{questions.length}</span>
                  <span className='text-[8px] font-black text-gray-400 uppercase tracking-tighter'>Targets</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Command Center */}
        <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 relative bg-white overflow-y-auto">
          <div className='absolute bottom-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-30 -mr-32 -mb-32' />

          <AnimatePresence mode='wait'>
            {isIntroPhase ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className='flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto py-12'
              >
                <div className='w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-5 shadow-inner'>
                  <RiRobot2Fill size={28} className='animate-bounce' />
                </div>
                <h2 className='text-xl md:text-2xl font-black text-gray-900 mb-3 leading-tight tracking-tighter uppercase'>Calibrating Interview Protocol...</h2>
                <p className='text-gray-500 font-medium leading-relaxed text-xs md:text-sm italic'>"Sit straight, check your mic, and breathe. You've got this."</p>
              </motion.div>
            ) : (
              <motion.div
                key="interview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex-1 flex flex-col'
              >
                {/* Question Area */}
                <div className='mb-6'>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className='w-6 h-0.5 bg-emerald-500 rounded-full' />
                    <span className='text-[8px] md:text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]'>Question Payload {currentIndex + 1}</span>
                  </div>
                  <h2 className='text-lg md:text-2xl font-black text-gray-900 leading-[1.3] tracking-tighter mb-4'>
                    {currentQuestion?.question}
                  </h2>

                  {subtitle && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 flex items-start gap-3'
                    >
                      <div className='min-w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 animate-pulse' />
                      <p className='text-emerald-900/70 text-[10px] md:text-xs font-bold italic leading-relaxed'>{subtitle}</p>
                    </motion.div>
                  )}
                </div>

                {/* Input Area */}
                <div className='flex-1 flex flex-col relative mb-6 min-h-[150px]'>
                  <div className='absolute top-3 right-3 z-10'>
                    {isMicOn && !isAIPlaying && (
                      <div className='flex items-center gap-1.5 bg-emerald-100 px-2 py-1 rounded-full border border-emerald-200'>
                        <BsFillRecordFill className='text-red-500 animate-pulse text-[8px]' />
                        <span className='text-[8px] font-black text-emerald-700 uppercase tracking-widest'>Listening</span>
                      </div>
                    )}
                  </div>
                  <textarea
                    placeholder="Speak naturally or start typing your professional response here..."
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer}
                    className={`flex-1 w-full p-6 pt-10 rounded-2xl resize-none outline-none border-2 transition-all text-sm md:text-lg font-medium text-gray-800 placeholder:text-gray-300 custom-scrollbar ${
                      isMicOn && !isAIPlaying 
                        ? 'bg-emerald-50/30 border-emerald-200 shadow-lg shadow-emerald-500/5 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10'
                        : 'bg-gray-50/50 border-gray-100 shadow-inner focus:bg-white focus:border-emerald-200 focus:ring-4 focus:ring-emerald-500/5'
                    }`}
                  />
                </div>

                {/* Interaction Bar */}
                <div className='flex items-center gap-3 md:gap-4'>
                  <button
                    onClick={toggleMic}
                    title={isMicOn ? "Click to stop listening" : "Click to start listening"}
                    className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl md:rounded-2xl transition-all shadow-md active:scale-95 relative group ${isMicOn ? 'bg-emerald-600 text-white shadow-emerald-500/30' : 'bg-gray-100 text-gray-400 border border-gray-200'}`}
                  >
                    <HiMicrophone size={24} />
                    {isMicOn && (
                      <>
                        <motion.div layoutId='pulse' className='absolute inset-0 rounded-xl md:rounded-2xl border-2 border-emerald-300 group-hover:animate-pulse' />
                        <motion.div 
                          className='absolute inset-1 rounded-lg border border-emerald-400/50 animate-pulse'
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1.1 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </>
                    )}
                  </button>

                  {!feedback ? (
                    <button
                      onClick={submitAnswer}
                      disabled={isSubmitting || !answer.trim()}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 md:py-6 rounded-xl md:rounded-2xl font-black text-sm md:text-lg transition-all shadow-lg active:scale-[0.98] ${isSubmitting || !answer.trim()
                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20'}`}
                    >
                      {isSubmitting && <div className='w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin' />}
                      <span>{isSubmitting ? "Submitting..." : "Submit Response"}</span>
                      {!isSubmitting && <BsArrowRightCircleFill className='text-lg md:text-xl' />}
                    </button>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={handleNext}
                      className="flex-1 flex items-center justify-center gap-2 py-3 md:py-6 bg-black text-white rounded-xl md:rounded-2xl font-black text-sm md:text-lg hover:bg-emerald-600 transition-all shadow-lg active:scale-[0.98] shadow-black/10"
                    >
                      <span>{currentIndex + 1 === questions.length ? "Finish & Review" : "Next Question"}</span>
                      <BsArrowRightCircleFill className="text-lg md:text-xl" />
                    </motion.button>
                  )}
                </div>

                {/* Feedback Area */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className='mt-6 bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200'
                    >
                      <div className='flex items-center gap-2 mb-3'>
                        <div className='bg-emerald-500 p-1 rounded-lg text-white'>
                           <RiRobot2Fill size={14} />
                        </div>
                        <span className='text-[10px] font-black uppercase tracking-widest text-emerald-800'>AI Feedback</span>
                      </div>
                      <p className='text-gray-700 text-xs md:text-sm font-medium leading-relaxed italic'>"{feedback}"</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default Step2Interview
