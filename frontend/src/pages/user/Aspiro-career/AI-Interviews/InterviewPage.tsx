import { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { IoMdSend } from "react-icons/io";
import { MdAutoAwesome, MdOutlineKeyboardVoice, MdSlowMotionVideo } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { getInterviewResponse } from "../../../../services/userServices";
import { toast } from "react-toastify";

export default function InterviewPage(){
    const [isStarted, setIsStarted] = useState(false)
    const [seconds, setSeconds] = useState(1200)
    const location = useLocation()
    const {role, experienceLevel} = location.state || {}

    const [chats, setChats] = useState<{role: 'user' | 'ai', message: string}[]>([
        {
            role: 'ai',
            message: 'Hi, I am your AI interviewer. Lets starts with an easy question. "Tell me about yourself".'
        },
        {
            role: 'user',
            message: 'I am aswanth from kannur, I am a fullstack Developer...'
        },
        {
            role: 'ai',
            message: 'Great answer, your response demonstrate good self awareness.'
        }
    ])
    const [personas, setPersonas] = useState<{role: 'system' | 'user' | 'assistant', content: string}[]>([
        {role: 'system', content: `
  Act as a professional job interviewer. Introduce yourself as “Apiro AI Interviewer” and 
  explain that you will ask a series of tailored questions based on the user’s role and experience. 
  The user is applying for ${role} with ${experienceLevel}. Ask one clear, 
  open-ended question at a time. After the user responds, acknowledge their answer and follow up with the next question. 
  Continue until all key areas relevant to the role have been covered or until the user explicity stop the interview.

  Once the interview is complete, provide a detailed evaluation in JSON format with the following structure:

{
  "overall_score": number,  //out of 100
  "content_quality_score": number, // Score for depth, relevance, and accuracy of answers
  "communication_score": number,  // Score for clarity, articulation, and language use
  "confidence_score": number,  // Score for confidence and poise during the interview
  "strengths": [string],  // List of major strengths observed
  "areas_to_improve": [string], // List of areas needing improvement
  "question_by_question_analysis": [
    {
      "question": "string",  // The question asked
      "response": "string",  // User’s answer
      "score": number  // Individual score out of 100
    }
  ]
}

Guidelines for the AI:

-Do not include any introductory text, markdown backticks (like \`\`\`json), or conversational filler.
-Evaluate each answer based on content, communication, and confidence.
-Assign a score out of 10 for each question and for overall performance.
-Summarize strengths and areas to improve clearly and concisely.
-Maintain a professional, supportive, and structured tone throughout.
`
        }
    ])

    const startInterview = () => setIsStarted(true)
    const stopInterview = () => setIsStarted(false)

    const start = async () => {
        try {
            const result = await getInterviewResponse(personas)
            startInterview()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
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

    return(
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
                            <button onClick={stopInterview} className="text-xs bg-white border border-slate-200 p-2 rounded-md text-slate-500">End Interview</button>
                        </div>
                    )}
                </header>
                <div className="mt-10">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white p-5 border border-slate-200 rounded-md flex flex-col items-center">
                            <p className="font-semibold text-sm">Question</p>
                            <p className="text-xs text-slate-500">0 out of 10</p>
                        </div>
                        <div className="bg-white p-5 border border-slate-200 rounded-md flex flex-col items-center">
                            <p className="font-semibold text-sm">Time</p>
                            <p className="text-xs text-slate-500">{Math.floor(seconds / 60)}:{seconds % 60} Minutes</p>
                        </div>
                        <div className="bg-white p-5 border border-slate-200 rounded-md flex flex-col items-center">
                            <p className="font-semibold text-sm">Score</p>
                            <p className="text-xs text-slate-500">0%</p>
                        </div>
                    </div>
                </div>
                {!isStarted && (
                    <div className="mt-5 bg-white px-10 py-20 border border-slate-200 rounded-md flex flex-col items-center">
                    <div className="bg-blue-200 w-15 h-15 rounded-full flex items-center justify-center">
                        <MdAutoAwesome size={25} />
                    </div>
                    <p className="font-semibold mt-3">Ready to start ?</p>
                    <p className="text-center text-xs text-slate-500 mt-1">Click "start Interview" to begin your AI mock interview</p>
                    <button onClick={start} className="bg-gradient-to-br from-blue-500 to-indigo-600 px-3 py-2 text-xs text-white flex items-center rounded-md gap-2 mt-3">
                        <MdSlowMotionVideo />
                        <p>Start Interview</p>
                    </button>
                </div>
                )}

                {isStarted && (
                    <>
                    <div className="mt-5 bg-white border border-slate-200 rounded-md">
                        <div className="p-5 space-y-4 h-[500px]">
                            {chats.map((chat: {role: 'ai' | 'user', message: string}, index: number) => (
                                chat.role === 'ai'
                                    ? <div className="flex justify-start gap-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full flex items-center justify-center">
                                            <MdAutoAwesome color="white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-gray-200 p-3 rounded-r-md rounded-b-md w-fit">
                                                <p className="text-xs text-gray-800">{chat.message}</p>
                                            </div>
                                        </div>
                                      </div>
                                    : <div className="flex justify-end gap-2">
                                        <div className="bg-blue-500 text-white p-3 rounded-b-md rounded-l-md w-fit">
                                            <p className="text-xs">{chat.message}</p>
                                        </div>
                                        <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                                            <p className="font-semibold">U</p>
                                        </div>
                                      </div>
                            ))}
                        </div>
                        <div className="border-t border-slate-200 p-5">
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <div className="w-full">
                                        <input type="text" className="bg-gray-100 w-full px-3 py-5 rounded-md border border-slate-200 focus:ring-1 focus:ring-blue-500 rouneded" placeholder="Enter your response..." />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <button className="w-8 h-8 border border-slate-200 flex items-center justify-center rounded-md">
                                        <IoMdSend />
                                    </button>
                                    <button className="w-8 h-8 border border-slate-200 flex items-center justify-center rounded-md">
                                        <MdOutlineKeyboardVoice />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center text-xs gap-1 mt-1">
                                <HiOutlineLightBulb color="orange" />
                                <p className="text-[10px] text-slate-500">Use star method to answer this question</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center mt-5">
                        <button className="text-sm bg-green-500 text-white px-4 py-2 rounded-md font-medium">Finish Interview & Get Feedback</button>
                    </div>
                    </>
                )}
            </div>
        </>
    )
}