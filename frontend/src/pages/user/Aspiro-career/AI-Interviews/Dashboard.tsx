import { BiMedal, BiStar, BiTrophy } from "react-icons/bi";
import { IoMedalSharp, IoSunnyOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import {ResponsiveContainer, XAxis, LineChart, Line, YAxis, Tooltip, CartesianGrid} from 'recharts'

export default function InterviewDashboardPage(){
    const chartData = [
      { attempt: 1, score: 65 },
      { attempt: 2, score: 22 },
      { attempt: 3, score: 70 },
      { attempt: 4, score: 78 },
      { attempt: 5, score: 12 },
      { attempt: 6, score: 82 },
      { attempt: 7, score: 72 },
      { attempt: 8, score: 94 },
      { attempt: 9, score: 91 },
      { attempt: 10, score: 98 },
    ];
    return(
        <>
            <div className="px-5 lg:px-20 py-15">
                <p className="font-semibold text-xl">Your progress dashboard</p>
                <p className="text-xs mt-2 text-slate-700">Track your improvements and stay motivated</p>
                <div className="mt-10 grid grid-cols-2 gap-5 gap-y-5 md:grid-cols-4">
                    <div className="flex items-start gap-2 border border-slate-200 p-5 rounded-md bg-white">
                        <div className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-md"><LuUsers color="white" /></div>
                        <div>
                            <p className="font-semibold">12</p>
                            <p className="text-xs">Interviews</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 border border-slate-200 p-5 rounded-md bg-white">
                        <div className="w-10 h-10 bg-green-500 flex items-center justify-center rounded-md"><IoMedalSharp color="white" /></div>
                        <div>
                            <p className="font-semibold">78%</p>
                            <p className="text-xs">Average Score</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 border border-slate-200 p-5 rounded-md bg-white">
                        <div className="w-10 h-10 bg-yellow-500 flex items-center justify-center rounded-md"><IoSunnyOutline color="white" /></div>
                        <div>
                            <p className="font-semibold">5</p>
                            <p className="text-xs">Day streak</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 border border-slate-200 p-5 rounded-md bg-white">
                        <div className="w-10 h-10 bg-violet-500 flex items-center justify-center rounded-md"><LuUsers color="white" /></div>
                        <div>
                            <p className="font-semibold">2h 30m</p>
                            <p className="text-xs">Total practice time</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="bg-white border border-slate-200 rounded-md p-3">
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
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <div className="bg-white border border-slate-200 p-5">
                        <p className="font-semibold text-sm">History</p>
                        <div className="mt-3 space-y-2">
                            {Array.from(new Array(5).fill(0)).map((v) => (
                                <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                                    <div>
                                        <p className="text-sm font-medium">AI Mocke Interview</p>
                                        <p className="text-xs text-slate-700">Today</p>
                                    </div>
                                    <p className="text-xs font-medium">78</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 p-5">
                        <p className="font-semibold text-sm">Acheivments</p>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <div className="border border-slate-200 rounded-md flex flex-col items-center gap-2 p-3">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}