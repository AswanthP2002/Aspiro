import { BiBriefcase, BiCheckCircle } from "react-icons/bi";
import illustration from '/applied-illustration.jpg'
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ApplySuccessPage(){
    const location = useLocation()
    const navigateTo = useNavigate()
    const [info, setInfo] = useState([
        {
            no: 1,
            title: 'Application Review',
            description: 'The recruiter will review your application'
        },
        {
            no: 2,
            title: 'Interview Invitation',
            description: 'If you selected, you will get an interview invitation through email and In app notification'
        },
        {
            no: 3,
            title: 'Stay Connected',
            description: 'We will notifi'
        }
    ])
    const {jobTitle, recruiterName, companyName, workMode, minSalary, maxSalary} = location.state ||  {}
    if(!jobTitle){
        navigateTo('/')
    }
    return(
        <div className="px-5 lg:px-100 w-full m-h-screen">
            <div className="flex flex-col w-full items-center mt-10">
                <div className="bg-green-100 w-15 h-15 rounded-full flex items-center justify-center">
                    <BiCheckCircle color="green" size={36} />
                </div>
                <p className="mt-5 font-bold text-2xl text-center">Application submitted succesfully</p>
                <p className="text-center text-sm my-2">Your application for the job <span className="font-bold">{jobTitle}</span> has been send to the recruiter</p>
                <img src={illustration} className="max-w-100" alt="" />
                <div className="bg-blue-100 w-full rounded-md ring-1 ring-blue-500 p-5">
                    <div className="flex justify-between border-b pb-3 border-slate-400">
                        <div className="">
                            <p className="font-semibold">{jobTitle || "React Native Developer"}</p>
                            <p className="text-xs text-gray-500">{companyName} | Posted by {recruiterName}</p>
                        </div>
                        <div className="bg-blue-500 w-12 h-12 rounded-md flex items-center justify-center">
                            <BiBriefcase color="white" size={23} />
                        </div>
                    </div>
                    <div className="flex justify-between pt-3">
                        <div className="flex flex-col items-start">
                            <p className="text-xs text-gray-500">Work Mode</p>
                            <p className="font-medium text-sm">{workMode}</p>
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="text-xs text-gray-500">Salary</p>
                            <p className="font-medium text-sm">{minSalary} - {maxSalary}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 bg-white p-5 border border-slate-300 rounded-md w-full">
                    <p className="font-semibold text-sm">What happen next ?</p>
                    <div className="mt-3 grid grid-cols-1 gap-5">
                        {info.map((info) => (
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
                                    <p>{info.no}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{info.title}</p>
                                    <p className="text-xs text-gray-600 mt-1">{info.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border mt-5 w-full text-center border-slate-200 ring-1 ring-blue-500 rounded-md bg-blue-100 p-2">
                    <p className="text-xs font-semibold text-blue-700">Tip: <span className="text-xs font-normal text-blue-700">Keep your profile updated and check your email regularly or updates from the recruiterName</span></p>
                </div>
                <button onClick={() => navigateTo('/profile/my-applications')} className="text-sm font-semibold text-white bg-blue-500 hover:bg-blue-800 w-full mt-5 p-3 rounded-md">Track my application</button>
                <div className="grid grid-cols-2 gap-5 w-full mt-5">
                    <div className="w-full"><button onClick={() => navigateTo('/jobs')} className="hover:bg-gray-100 border border-slate-300 w-full text-xs font-semibold p-3 rounded-md">Browse more jobs</button></div>
                    <div className="w-full"><button onClick={() => navigateTo('/')} className="hover:bg-gray-100 border border-slate-300 w-full text-xs font-semibold p-3 rounded-md">Home</button></div>
                </div>
            </div>
        </div>
    )
}