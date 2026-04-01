import { BiChevronRight } from "react-icons/bi";
import { LuClock } from "react-icons/lu";
import { MdAutoAwesome } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function InterviewModeSelectionPage(){
    const location = useLocation()
    const {role, experienceLevel} = location.state || {}

    const navigate = useNavigate()

    const navigateToInterviewStartPage = () => {
        if(!role || !experienceLevel) return toast.warning('Can not attend interview now')
        
        navigate('/profile/aspiro-career/interview/start', {state: {role, experienceLevel}})
    }

    return(
        <>
            <div className="bg-gray-50 w-full min-h-screen px-5 lg:px-20 py-15">
                <p className="text-center font-semibold text-xl">Choose your practice mode</p>
                <div className="flex items-center justify-center gap-2 text-xs mt-3">
                    <p>Preparing for</p>
                    <p className="text-blue-500">{role}</p>
                    <BiChevronRight />
                    <p className="text-blue-500">{experienceLevel}</p>
                </div>
                <div className="mt-10 w-full">
                    {/* Mode */}
                    <div onClick={navigateToInterviewStartPage} className="cursor-pointer transition-all bg-white w-full border border-slate-200 rounded-md p-5">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-13 h-13 rounded-md flex items-center justify-center">
                            <MdAutoAwesome size={25} color="white" />
                        </div>
                        <p className="font-semibold text-sm mt-3">AI Mock Interview</p>
                        <p className="font-medium text-xs text-slate-500 mt-3">Have a conversation with our AI interviewer. Get real time feedback and questions.</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                            <LuClock />
                            <p>20 - 30 Minutes</p>
                        </div>
                        <div className="bg-green-100 text-green-600 w-fit text-xs px-3 rounded-full mt-3">
                            <p className="font-medium">Most Popular</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}