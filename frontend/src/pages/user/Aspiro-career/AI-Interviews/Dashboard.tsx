import { BiMedal, BiStar, BiTrophy } from "react-icons/bi";
import { IoMedalSharp, IoSunnyOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import {ResponsiveContainer, XAxis, LineChart, Line, YAxis, Tooltip, CartesianGrid} from 'recharts'
import firstInterview from '/first-interview-removebg-preview.png'
import fiveDayStreak from '/five-day-streak-removebg-preview.png'
import tenDayStreak from '/ten-day-streak-removebg-preview.png'
import tenInterviews from '/public/ten-interviews-removebg-preview.png'
import scoreNinetyAbove from '/ninety-above-score-removebg-preview.png'
import { useEffect, useState } from "react";
import { loadInterviewDashboard } from "../../../../services/userServices";
import { toast } from "react-toastify";
import { InterviewDashboardData } from "../../../../types/entityTypes";
import moment from "moment";
import { MdOutlineEventBusy } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


export default function InterviewDashboardPage(){
    const [dashboardData, setDashboarData] = useState<InterviewDashboardData | null>(null)
    const [chartData, setChartData] = useState<{attempt: number, score: number}[]>([
        {attempt: 1, score: 0},
        {attempt: 2, score: 0},
        {attempt: 3, score: 0},
        {attempt: 4, score: 0},
        {attempt: 5, score: 0},
        {attempt: 6, score: 0},
        {attempt: 7, score: 0}
    ])

    const navigate = useNavigate()

    useEffect(() => {
        async function loadDashboardDetails(){
            try {
                const result = await loadInterviewDashboard()
                if(result.success){
                    setDashboarData(result?.result)
                    setChartData(result?.result?.performance)
                    console.log('-- checking result from the backend--', result?.result)
                }
            } catch (error: unknown) {
                console.log('error occured while loading dashboard', error)
                toast.error(error instanceof Error ? error.message : 'Something went wrong')
            }
        }

        loadDashboardDetails()
    }, [])

    return(
        <>
            <div className="px-5 lg:px-20 py-15">
                <div className="mb-2">
                    <button onClick={() => navigate(-1)} className="text-xs flex items-center gap-2 p-2 rounded-md hover:bg-gray-200">
                        <BsArrowLeft />
                        <p>Back</p>
                    </button>
                </div>
                <p className="font-semibold text-xl">Your progress dashboard</p>
                <p className="text-xs mt-2 text-slate-700">Track your improvements and stay motivated</p>
                <div className="mt-10 grid grid-cols-2 gap-5 gap-y-5 md:grid-cols-4">
                    <div className="flex items-start gap-2 border border-slate-200 p-5 rounded-md bg-white">
                        <div className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-md"><LuUsers color="white" /></div>
                        <div>
                            <p className="font-semibold">{dashboardData?.totalInterviews}</p>
                            <p className="text-xs">Interviews</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 border border-slate-200 p-5 rounded-md bg-white">
                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center rounded-md"><IoMedalSharp color="white" /></div>
                        <div>
                            <p className="font-semibold">{dashboardData?.averageScore}%</p>
                            <p className="text-xs">Average Score</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 border border-slate-200 p-5 rounded-md bg-white">
                        <div className="w-10 h-10 bg-yellow-500 flex items-center justify-center rounded-md"><IoSunnyOutline color="white" /></div>
                        <div>
                            <p className="font-semibold">{dashboardData?.streak}</p>
                            <p className="text-xs">Day streak</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 border border-slate-200 p-5 rounded-md bg-white">
                        <div className="w-10 h-10 bg-violet-500 flex items-center justify-center rounded-md"><LuUsers color="white" /></div>
                        <div>
                            <p className="font-semibold">{dashboardData?.totalPracticeTime}</p>
                            <p className="text-xs">Total practice time</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    {dashboardData?.performance.length > 0
                        ? <div className="bg-white border border-slate-200 rounded-md p-3">
                        <p className="font-semibold text-sm">Performance Overtime</p>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={chartData} margin={{left: -10, top: 30}}>
                                <CartesianGrid strokeDasharray="4 4" vertical={false} />
                                <XAxis dataKey="attempt" tickLine={false} />
                                <YAxis dataKey="score" tickLine={false} />
                                <Tooltip />
                                <Line type="monotone" dataKey="score" dot={{r: 4}} activeDot={{r: 7}} strokeWidth={3} stroke="#224ef0" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                      : <div className="bg-white p-5 rounded-md border border-slate-200 flex flex-col items-center">
                            <p className="text-lg font-semibold text-slate-700">Quite in here</p>
                            <p className="text-sm text-center mt-2">No interview records found. Dont worry your journey just starting.</p>
                            <MdOutlineEventBusy size={25} color="gray" className="mt-2" />
                      </div>
                    }
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <div className="bg-white border border-slate-200 p-5">
                        <p className="font-semibold text-sm">History</p>
                        <div className="mt-3 space-y-2">
                            {dashboardData?.history.map((h: {title: string, score: number, createdAt: string}) => (
                                <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                                    <div>
                                        <p className="text-sm font-medium">{h.title}</p>
                                        <p className="text-xs text-slate-700 mt-2">{moment(h.createdAt).format("MMM DD YYYY")}</p>
                                    </div>
                                    <p className="text-sm font-medium">{h.score}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 p-5">
                        <p className="font-semibold text-sm">Acheivments</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                            <div>
                                <img className="w-17 h-17 object-cover grayscale contrast-30" src={firstInterview} alt="" />
                            </div>
                            <div>
                                <img className="w-17 h-17 object-cover grayscale contrast-30" src={fiveDayStreak} alt="" />
                            </div>
                            <div>
                                <img className="w-17 h-17 object-cover grayscale contrast-30" src={tenDayStreak} alt="" />
                            </div>
                            <div>
                                <img className="w-17 h-17 object-cover grayscale contrast-30" src={tenInterviews} alt="" />
                            </div>
                            <div>
                                <img className="w-17 h-17 object-cover grayscale contrast-30" src={scoreNinetyAbove} alt="" />
                            </div>
                            {/* <div className="border border-slate-200 rounded-md flex flex-col items-center gap-2 p-3">
                                <BiStar size={25} />
                                <p className="text-xs font-medium">First Interview</p>
                            </div>

                            <div className="border border-slate-200 rounded-md flex flex-col items-center gap-2 p-3">
                                <IoSunnyOutline size={25} />
                                <p className="text-xs font-medium">5 days streak</p>
                            </div>

                            <div className="border border-slate-200 rounded-md flex flex-col items-center gap-2 p-3">
                                <BiMedal size={25} />
                                <p className="text-xs font-medium">Score 90 above</p>
                            </div>

                            <div className="border border-slate-200 rounded-md flex flex-col items-center gap-2 p-3">
                                <BiTrophy size={25} />
                                <p className="text-xs font-medium">10 Interviews</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}