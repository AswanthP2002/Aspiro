import { BiTrendingUp } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { IoMdPaper, IoMdVideocam } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { MdAutoAwesome } from "react-icons/md";
import { TbBuildingSkyscraper } from "react-icons/tb";

export default function InterviewOverviewPage(){
    return(
        <>
            <div className="min-h-screen bg-gray-50 px-5 py-15 lg:px-20">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-10 flex flex-col items-center">
                    <p className="text-white text-2xl font-bold text-center leading-relaxed">Level up your career with smart AI interviews by <span className="text-yellow-300">Aspiro</span></p>
                    <p className="text-white text-center mt-3 text-xs leading-relaxed">
                        Practice real-world interview scenarios tailored to your industry 
                        and get instant feedback powered by AI.
                    </p>
                    <button className="flex items-center gap-2 text-sm font-medium bg-white p-2 rounded-md mt-3 text-indigo-500 hover:bg-gray-200 shadow-xl">
                        <MdAutoAwesome />
                        Start preperations
                    </button>
                </div>
                <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="bg-white border border-slate-200 rounded-md flex flex-col items-center text-center p-5">
                        <div className="rounded-md w-13 h-13 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                            <MdAutoAwesome size={20} />
                        </div>
                        <p className="font-semibold text-sm mt-3">AI-Driven mock interviews</p>
                        <p className="text-xs font-medium mt-2 text-gray-700">Realestic interview simulation with ai interviewr that adapts your answers</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-md flex flex-col items-center text-center p-5">
                        <div className="bg-gradient-to-br from-rose-500 to-violet-600 text-white rounded-md w-13 h-13 flex items-center justify-center">
                            <TbBuildingSkyscraper size={20} />
                        </div>
                        <p className="font-semibold text-sm mt-3">Interview Specific practice</p>
                        <p className="text-xs font-medium mt-2 text-gray-700">Tailored questions for your role, industry and experience level</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-md flex flex-col items-center text-center p-5">
                        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-md w-13 h-13 flex items-center justify-center">
                            <BiTrendingUp size={20} />
                        </div>
                        <p className="font-semibold text-sm mt-3">Instant feedback and scoring</p>
                        <p className="text-xs font-medium mt-2 text-gray-700">Get detailed analysis of your answers with actionable improvement tips</p>
                    </div>
                </div>
                <div className="mt-5 bg-white border border-slate-200 p-5 rounded-md">
                    <p className="text-center font-semibold">Everything you need to ace your interview</p>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 m">
                        <div className="flex items-start gap-2">
                            <div className="bg-blue-200 text-blue-500 w-10 h-10 flex items-center justify-center rounded-md">
                                <IoMdVideocam />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">Video practice recording</p>
                                <p className="text-xs text-slate-500">Record yourself and review your body language and postures</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="bg-violet-200 text-violet-500 w-10 h-10 flex items-center justify-center rounded-md">
                                <TbBuildingSkyscraper />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">Company specific preperations</p>
                                <p className="text-xs text-slate-500">Record yourself and review your body language and postures</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="bg-green-200 text-green-500 w-10 h-10 flex items-center justify-center rounded-md">
                                <IoMdPaper />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">Question bank library</p>
                                <p className="text-xs text-slate-500">Question papers across different categories and dificult level</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="bg-red-200 text-red-500 w-10 h-10 flex items-center justify-center rounded-md">
                                <LuUsers />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">Community tips and insights</p>
                                <p className="text-xs text-slate-500">Learn from others interview experience and success stories</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 mt-5 p-10 rounded-md flex flex-col items-center text-center">
                    <p className="text-white font-semibold text-lg">"Train smarte. Interview smarter. Get Placed fast!"</p>
                    <p className="text-xs text-slate-200 mt-3">Join thousands of candidate who prepared with asprio</p>
                    <button className="mt-3 text-indigo-500 px-3 py-2 rounded text-sm font-medium bg-white flex items-center">
                        <p>Get started</p>
                        <BsArrowRight />
                    </button>
                </div>
            </div>
        </>
    )
}