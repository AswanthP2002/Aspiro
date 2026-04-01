import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function InterviewPersonalizationPage(){
    const [selectedRole, setSelectedRole] = useState('')
    const [experienceLevel, setExperienceLevel] = useState<'Entry Level' | 'Mid Level' | 'Senior'>('Entry Level')
    
    const toggleRoleSelection = (r: string) => {
        setSelectedRole((prv) => {
            if(prv){
                return ''
            }else {
                return r
            }
        })
    }

    const navigate = useNavigate()
    
    const navigateToModeSelectionPage = async () => {
        const confirmationResult = await Swal.fire({
            icon: 'question',
            title: 'Continue?',
            text: `Are you sure to continue with the selected role ${selectedRole} and experience level as ${experienceLevel}`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Continue',
            allowOutsideClick: false,
            allowEscapeKey: false
        })

        if(!confirmationResult.isConfirmed) return

        navigate('/profile/aspiro-career/interview/mode-select', {state: {role: selectedRole, experienceLevel: experienceLevel}})
    }


    return(
        <>
            <div className="bg-gray-50 min-h-screen px-5 py-15">
                <div className="flex flex-col items-center">
                    <header className="w-full"></header>
                    <div>
                        <p className="text-center font-semibold text-xl">Lets personalize your practice</p>
                        <p className="mt-2 text-sm text-slate-500">Tell us about your preference to get the most relevant questions</p>
                        <div className="w-md lg:w-xl lg:p-10 bg-white p-5 border border-slate-200 rounded-md mt-5">
                            <p className="font-semibold text-sm">What role you are looking for</p>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                {[
                                    'Software Developer',
                                    'Project Manager',
                                    'Data Scientist',
                                    'UI/UX Designer',
                                    'Marketing Manager',
                                    'Sales Executive',
                                    'HR Manager',
                                    'Business Analyst',
                                    'Financial Analyst',
                                    'Content Writer',
                                    'Teacher',
                                    'Accountant'
                                ].map((role: string, index: number) => (
                                    <div onClick={() => toggleRoleSelection(role)} key={index} className={`text-xs cursor-pointer border border-slate-300 p-2 ${selectedRole === role ? "ring-2 ring-blue-500 text-blue-500 font-semibold" : ""} text-center rounded`}><p>{role}</p></div>
                                ))}
                            </div>
                            {!selectedRole && (
                                <div className="mt-5">
                                    <p className="text-sm font-medium">Didn't find your desired role ?</p>
                                    <input type="text" className="bg-gray-100 w-full p-2 mt-2 rounded-md border border-slate-200 focus:ring-1 focus:ring-blue-400 focus:shadow" placeholder="Enter your role" />
                                </div>
                            )}
                            <div className="my-5 border-t border-slate-300 w-full"></div>
                            <p className="text-sm font-semibold">Experience Level</p>
                            <div className="mt-5 gap-2 grid grid-cols-3">
                                <div onClick={() => setExperienceLevel('Entry Level')} className={`${experienceLevel === 'Entry Level' ? "ring-2 ring-blue-500" : ""}border border-slate-200 cursor-pointer rounded-md flex flex-col items-center p-3`}>
                                    <p className="font-medium text-sm">Entry Level</p>
                                    <p className="text-xs text-slate-500">0 - 2 years</p>
                                </div>

                                <div onClick={() => setExperienceLevel('Mid Level')} className={`${experienceLevel === 'Mid Level' ? "ring-2 ring-blue-500" : ""}border border-slate-200 cursor-pointer rounded-md flex flex-col items-center p-3`}>
                                    <p className="font-medium text-sm">Mide Level</p>
                                    <p className="text-xs text-slate-500">3- 6 years</p>
                                </div>

                                <div onClick={() => setExperienceLevel('Senior')} className={`${experienceLevel === 'Senior' ? "ring-2 ring-blue-500" : ""}border border-slate-200 cursor-pointer rounded-md flex flex-col items-center p-3`}>
                                    <p className="font-medium text-sm">Senior</p>
                                    <p className="text-xs text-slate-500">6+ years</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-10">
                            <button disabled={!selectedRole} onClick={navigateToModeSelectionPage} className={`${selectedRole ? "bg-blue-500" : "bg-gray-300"} text-white p-2 rounded-md text-sm font-medium`}>Continue</button>
                            <button onClick={() => navigate(-1)} className="bg-white text-slate-800 p-2 rounded-md text-sm font-medium border border-slate-300">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )   
}