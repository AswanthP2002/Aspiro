import { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { IoMdSend } from "react-icons/io";
import { MdAutoAwesome, MdKeyboardVoice, MdOutlineKeyboardVoice, MdSlowMotionVideo } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { getInterviewResponse } from "../../../../services/userServices";
import { toast } from "react-toastify";
import {} from 'spinners-react'
import BouncingLoader from "../../../../components/common/Bouncing.loader";
import { LuSpeech } from "react-icons/lu";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import {useSpeech} from 'react-text-to-speech'
import Swal from "sweetalert2";
import { Modal } from "@mui/material";

export default function InterviewPage(){
    const [isStarted, setIsStarted] = useState(false)
    const [seconds, setSeconds] = useState(1200)
    const location = useLocation()
    const [conversations, setConversations] = useState<{role: 'ai' | 'user', message: string}[]>([])
    const [message, setMessage] = useState('')
    const {role, experienceLevel} = location.state || {}
    const [loading, setLoading] = useState(false)
    const [isAiResponding, setIsAiResponding] = useState(false)
    const [isInterviewStoped, setIsInterviewStoped] = useState(false)
    const [sepeachableText, setSpeachableText] = useState('')
    const [isInterviewResultCalculating, setIsInterviewResultCalculating] = useState(false)


    const navigate = useNavigate()
    // const {start: StartSpeeking, speechStatus, stop, pause} = useSpeech({
    //   rate: 0.93,
    //   pitch: 1,
    //   text: sepeachableText,
    //   voiceURI: 'Google UK English Female'
    // })

    const [personas, setPersonas] = useState<{role: string, content: string}[]>([
        {role: 'system', content: `
          # ROLE
          You are "Apiro AI Interviewer," a professional, supportive, and structured job recruiter.
          # CONTEXT
          Target Role: ${role} Experience Level: ${experienceLevel}
          # OPERATIONAL RULES
          1. ASK ONE QUESTION AT A TIME. Never double-ask.
          2. Structure: Acknowledge the user's previous answer briefly -> Ask the next relevant question.
          3. Tone: Professional but encouraging. Keep it "genuine" and avoid "robotic" filler.
          4. Scope: Focus on technical skills, past projects, and behavioral fit for the ${role}.
          5. Termination: If the user says "stop", "exit", or "I'm done", say a professional goodbye and nothing else.
          # STRICT NEGATIVE CONSTRAINTS
          - DO NOT provide scores or feedback during the interview.
          - DO NOT output any JSON or code blocks.
          - DO NOT explain your internal logic.
          - Keep responses concise (under 3 sentences).
          Let's begin the interview.`
        }
    ])

    const startInterview = () => setIsStarted(true)
    const stopInterview = () => setIsStarted(false)

    const start = async () => {
        setLoading(true)
        setIsAiResponding(true)
        startInterview()
        try {
            const result = await getInterviewResponse(personas, isInterviewStoped)
            setPersonas((prv) => [...prv, {role: "assistant", content: result?.result}])
            setConversations((prv) => {
                return [...prv, {role: 'ai', message: result.result} ]
            })
            // setSpeachableText(result.result)
            
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        } finally {
            setLoading(false)
            setIsAiResponding(false)
        }
    }

    useEffect(() => {
        let interval: any
        if(!isStarted){
            return () => clearTimeout(interval)
        }
        
        interval = setInterval(() => {
            setSeconds((prv) => prv <= 0 ? 0 : prv - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [isStarted])

    const sendMessage = async () => {
        if(!message) return
        const msgData = message
        setMessage('')
        const updatedPerona = [...personas, {role: "user", content: msgData}]
        setPersonas(updatedPerona)
        setConversations((prv) => [...prv, {role: 'user', message: msgData}])
        setIsAiResponding(true)
        try {
            const result = await getInterviewResponse(updatedPerona, isInterviewStoped)
            if(result.success){
                setPersonas((prv) => [...prv, {role: "assistant", content: result.result}])
                setConversations((prv) => ([...prv, {role: 'ai', message: result?.result}]))
                // setSpeachableText(result?.result)
            }
        } catch (error) {
            console.log(error)
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        } finally {
            setIsAiResponding(false)
        }


    }

    const endInterview = async () => {
      const confirmResult = await Swal.fire({
        icon: 'question',
        title: 'Stop Interview?',
        text: 'Are you sure to stop this interview process?. This will terminate the inteview and you will be given the score you achived yet.',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Stop Interview',
        allowOutsideClick: false,
        allowEscapeKey: false
      })

      if(!confirmResult.isConfirmed) return
      setIsInterviewResultCalculating(true) 
      setIsInterviewStoped(true)
      setLoading(true)
      setIsAiResponding(true)
      
      try {
        const result = await getInterviewResponse(personas, true)
        if(result?.success){
          // setLoading(false)
          setIsAiResponding(false)
          setIsInterviewResultCalculating(false)
          navigate('/profile/aspiro-career/interview/completed-result', {state: {result: result?.result}})
        }
      } catch (error) {
        setIsInterviewResultCalculating(false)
        console.log('Error occured while ', error)
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      }
    }

    // useEffect(() => {
    //   console.log('Checking speechable notification', sepeachableText)
    //   if(!sepeachableText) return
    //   if(speechStatus === 'started'){
    //     stop()
    //   }

    //   const timer = setTimeout(() => {
    //     StartSpeeking()
    //   }, 180);

    //   return () => clearTimeout(timer)
    // }, [sepeachableText])

    return (
      <>
        <div className="bg-gray-50 w-full min-h-screen px-5 lg:px-20 py-15">
          <header className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-xl">AI Mock Interview</p>
              <div className="flex items-center text-xs font-medium gap-2">
                <p>Preparing for</p>
                <p className="text-blue-500">Software Engineer</p>
                <BiChevronRight />
                <p className="text-blue-500">Entry Level</p>
              </div>
            </div>
            {isStarted && ( 
              <div>
                <button
                  onClick={endInterview}
                  className="text-xs bg-white border border-slate-200 p-2 rounded-md text-slate-500"
                >
                  End Interview
                </button>
              </div>
            )}
          </header>
          {/* <div>
            <BouncingLoader />
          </div> */}
          <div className="mt-10">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-5 border border-slate-200 rounded-md flex flex-col items-center">
                <p className="font-semibold text-sm">Question</p>
                <p className="text-xs text-slate-500">0 out of 10</p>
              </div>
              <div className="bg-white p-5 border border-slate-200 rounded-md flex flex-col items-center">
                <p className="font-semibold text-sm">Time</p>
                <p className="text-xs text-slate-500">
                  {Math.floor(seconds / 60)}:{seconds % 60} Minutes
                </p>
              </div>
              {/* <div className="bg-white p-5 border border-slate-200 rounded-md flex flex-col items-center">
                <p className="font-semibold text-sm">Score</p>
                <p className="text-xs text-slate-500">0%</p>
              </div> */}
            </div>
          </div>
          {!isStarted && (
            <div className="mt-5 bg-white px-10 py-20 border border-slate-200 rounded-md flex flex-col items-center">
              <div className="bg-blue-200 w-15 h-15 rounded-full flex items-center justify-center">
                <MdAutoAwesome size={25} />
              </div>
              <p className="font-semibold mt-3">Ready to start ?</p>
              <p className="text-center text-xs text-slate-500 mt-1">
                Click "start Interview" to begin your AI mock interview
              </p>
              <button
                onClick={start}
                className="bg-gradient-to-br from-blue-500 to-indigo-600 px-3 py-2 text-xs text-white flex items-center rounded-md gap-2 mt-3"
              >
                <MdSlowMotionVideo />
                <p>Start Interview</p>
              </button>
            </div>
          )}

          {isStarted && (
            <>
              <div className="mt-5 bg-white border border-slate-200 rounded-md">
                <div className="p-5 space-y-4 h-[500px] overflow-y-auto">
                  
                  {conversations.map(
                    (conv: { role: 'ai' | 'user'; message: string }, index: number) =>
                      conv.role === 'ai' ? (
                          <div className="flex justify-start gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full flex items-center justify-center">
                              <MdAutoAwesome color="white" />
                            </div>
                            <div className="flex-1">
                              <div className="bg-gradient-to-br from-indigo-400 to-violet-500 p-3 rounded-r-md rounded-b-md max-w-[230px] lg:max-w-[500px]">
                                <p className="text-sm text-white leading-relaxed">{conv.message}</p>
                              </div>
                            </div>
                          </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <div className="bg-blue-500 text-white p-3 rounded-b-md rounded-l-md max-w-[230px] lg:max-w-[500px]">
                            <p className="text-sm leading relaxed">{conv.message}</p>
                          </div>
                          <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                            <p className="font-semibold">U</p>
                          </div>
                        </div>
                      )
                  )}
                  {isAiResponding && (<BouncingLoader />)}
                  {/* {loading && <p className="text-xs text-slate-400">Loading response...</p>} */}
                </div>
                <div className="border-t border-slate-200 p-5">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="w-full">
                        <input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          type="text"
                          className="bg-gray-100 w-full px-3 py-5 rounded-md border border-slate-200 focus:ring-1 focus:ring-blue-500 rouneded"
                          placeholder="Enter your response..."
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <button
                        disabled={!message}
                        onClick={sendMessage}
                        className="w-8 h-8 border border-slate-200 flex items-center justify-center rounded-md"
                      >
                        <IoMdSend />
                      </button>
                      <button className="w-8 h-8 border border-slate-200 flex items-center justify-center rounded-md">
                        <MdOutlineKeyboardVoice />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center text-xs gap-1 mt-1">
                    <HiOutlineLightBulb color="orange" />
                    <p className="text-[10px] text-slate-500">
                      Use star method to answer this question
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-center mt-5">
                <button onClick={endInterview} className="text-sm bg-green-500 text-white px-4 py-2 rounded-md font-medium">
                  Finish Interview & Get Feedback
                </button>
              </div>
            </>
          )}
        </div>

        {/* Testing voice recognition */}
        {/* <SpeechComponent /> */}
        {/* <TextToSpeech /> */}

        {isInterviewResultCalculating && (
          <Modal className="flex flex-col items-center justify-center backdrop-blur-lg" open>
            <div className="flex flex-col items-center">
              <BouncingLoader />
              <p className="text-sm text-white text-center">Calculating result...</p>
            </div>
          </Modal>
        )}
      </>
    );
}

// function TextToSpeech(){
//   const {Text, start, pause, stop, speechStatus} = useSpeech({
//     text: "Hello, I’m the Aspiro AI Interviewer. I’ll be guiding you through a structured interview for the Business Development Excecutive position to help us understand your technical background and problem-solving approach. I’ll ask one question at a time. Are you ready to begin?",
//     stableText: true,
//     voiceURI: 'Google UK English Female',
//     pitch: 1,
//     rate: 0.9
//   })


//   // useEffect(() => {
//   //   const voices = window.speechSynthesis.getVoices()
//   //   console.log("checking available voices", voices)
//   //   voices.forEach((voice) => {
//   //     console.log(voice.voiceURI)
//   //   })
//   // }, [])

//   return(
//     <div>
//       <Text />
//       <div>
//         {speechStatus !== "started"
//           ? <button className="bg-white border border-slate-200 rounded-md p-2 block" onClick={start}>Start</button>
//           : <button className="bg-white border border-slate-200 rounded-md p-2 block" onClick={pause}>Pause</button>
//         }
//         <button className="bg-white border border-slate-200 rounded-md p-2 block" onClick={stop}>Stop</button>
//       </div>
//     </div>
//   )
// }

// function SpeechComponent(){
//     const [isRecording, setIsRecording] = useState(false)
//     const [result, setResult] = useState('')

//    const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition()

//     if(!browserSupportsSpeechRecognition){
//         return <div><p>Browser does not support speech recognition</p></div>
//     }

//     const startListening = () => {
//         setIsRecording(true)
//         SpeechRecognition.startListening({continuous: true, language: 'en-US', interimResults: true})
//     }

//     const stopListening = () => {
//         setIsRecording(false)
//         SpeechRecognition.stopListening()
//     }

//     return(
//         <>
//             <div className="p-5">
//                 <p>Speech</p>
//                 {isRecording
//                     ? <button onClick={stopListening} className="bg-white border border-slate-200 rounded-md p-5"><LuSpeech /></button>
//                     : <button onClick={startListening} className="bg-white border border-slate-200 rounded-md p-5"><MdKeyboardVoice /></button>
//                 }
//                 <p>{transcript}</p>
//             </div>
//         </>
//     )
// }