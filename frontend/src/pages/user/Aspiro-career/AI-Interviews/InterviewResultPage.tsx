import { useEffect, useState } from "react"
import { BiChart, BiCheckCircle, BiInfoCircle, BiRefresh, BiShareAlt, BiTrendingUp } from "react-icons/bi"
import { BsArrowRight } from "react-icons/bs"
import { useLocation, useNavigate } from "react-router-dom"

type InterviewResultType = {
    areas_to_improve: string[]
    communication_score: number
    confidence_score: number
    content_quality_score: number
    overall_score: number
    question_by_question_analysis: {question: string, response: string, feedback: string, score: number}[]
    strengths: string[]
}

export default function InterviewCompletePage(){

    const location = useLocation()
    const result = location.state || {}
    const [resultData, setResultData] = useState<InterviewResultType | null>(null)
    const navigate = useNavigate()

    console.log('Checking result from the interview ', result)
    

    const [questionFeedback, setQuestionFeedback] = useState<{q: String, f: string, s: number}[]>([
        {
            q: 'Tell me about yourself',
            f: 'Strong self awareness and presentation skills',
            s: 80
        },
        {
            q: 'Why did you leaved your previous job',
            f: 'Lack of clarity and phillar words',
            s: 60
        },
        {
            q: 'Tell me about your strength and weekness',
            f: 'Strong self awareness and presentation skills',
            s: 90
        },
        {
            q: 'How do you manage time?',
            f: 'Lack of clarity and phillar words',
            s: 60
        }
    ])
    
    useEffect(() => {
        if(result) {
            setResultData(result?.result)
        }
    }, [])

    return(
        <>
            <div className="w-full min-h-screen bg-gray-50 px-5 py-15 lg:px-20">
                <p className="font-semibold text-xl">Interview Completed Result</p>
                <p className="text-xs text-slate-600 mt-2">Here is your detailed performance and analysis</p>
                <div className="mt-10 w-full bg-gradient-to-br from-blue-50 flex flex-col items-center to-indigo-100 ring-1 ring-blue-500 p-10 rounded-md">
                    <p className="font-semibold text-3xl text-green-500">{resultData?.overall_score}%</p>
                    <p className="text-sm font-normal">Overall score</p>
                    <p className="bg-green-500 text-white text-xs px-2 rounded-full mt-2">Good Performance</p>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 md:gap-5 lg:gap-10">
                    <div className="bg-white p-3 border border-slate-200 rounded-md">
                        <div className="flex justify-between items-end mb-1">
                            <p className="text-xs font-medium text-gray-700">Content Quality</p>
                            <p className="text-xs font-medium text-gray-700">{resultData?.content_quality_score}%</p>
                        </div>
                        <div className="w-full h-3 bg-gray-300 rounded-full">
                            <div style={{width: `${resultData?.content_quality_score}%`}} className={`h-full bg-black rounded-full`}></div>
                        </div>
                    </div>
                    <div className="bg-white p-3 border border-slate-200 rounded-md">
                        <div className="flex justify-between items-end mb-1">
                            <p className="text-xs font-medium text-gray-700">Communication</p>
                            <p className="text-xs font-medium text-gray-700">{resultData?.communication_score}%</p>
                        </div>
                        <div className="w-full h-3 bg-gray-300 rounded-full">
                            <div style={{width: `${resultData?.communication_score}%`}} className={`h-full bg-black rounded-full`}></div>
                        </div>
                    </div>
                    <div className="bg-white p-3 border border-slate-200 rounded-md">
                        <div className="flex justify-between items-end mb-1">
                            <p className="text-xs font-medium text-gray-700">Confidence</p>
                            <p className="text-xs font-medium text-gray-700">{resultData?.confidence_score}%</p>
                        </div>
                        <div className="w-full h-3 bg-gray-300 rounded-full">
                            <div style={{width: `${resultData?.confidence_score}%`}} className={`h-full bg-black rounded-full`}></div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-white border border-slate-200 rounded-md p-5">
                        <p className="font-semibold text-sm">Strengths</p>
                        <ul className="mt-3 space-y-2">
                            {resultData?.strengths?.map((v: string) => (
                                <li className="text-xs flex items-center gap-2">
                                    <BiCheckCircle color="green" size={15} />
                                    <p>{v}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-md p-5">
                        <p className="font-semibold text-sm">Areas to improve</p>
                        <ul className="mt-3 space-y-2">
                            {resultData?.areas_to_improve?.map((v: string) => (
                                <li className="text-xs flex items-center gap-2">
                                    <BiInfoCircle color="red" size={15} />
                                    <p>{v}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-5 bg-white border border-slate-200 p-5 rounded-md">
                    <p className="text-sm font-semibold">Question by Question Analysis</p>
                    <div className="mt-5 space-y-3">
                        {resultData?.question_by_question_analysis?.map((q) => (
                            <div className="flex items-center bg-gray-100 rounded-md p-3">
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{q.question}</p>
                                    <p className="text-xs mt-2 text-slate-500">{q.response.slice(0, 50)}...</p>
                                    <p className="text-xs mt-2 text-slate-400 leading-relaxed">{q.feedback}</p>
                                </div>
                                <p className="font-medium text-sm">{q.score}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    <button className="text-sm font-medium text-white bg-blue-500 p-2 rounded-md flex items-center justify-center gap-2">
                        <BiShareAlt />
                        Share acheivment on feed
                    </button>
                    <button className="flex items-center justify-center gap-2 text-sm font-medium text-slate-800 border border-slate-300 bg-white p-2 rounded-md">
                        <BiRefresh />
                        practice again
                    </button>
                    <button onClick={() => navigate('/profile/aspiro-career/interview/dashboard')} className="flex items-center justify-center gap-2 text-sm font-medium text-slate-800 border border-slate-300 bg-white p-2 rounded-md">
                        <BiTrendingUp />
                        View Dashboard
                    </button>
                    <button className="flex items-center justify-center gap-2 text-sm font-medium text-slate-800 border border-slate-300 bg-white p-2 rounded-md">
                        <BsArrowRight />
                        Continue Practicing
                    </button>
                </div>
            </div>
        </>
    )
}