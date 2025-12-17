import { useEffect, useState } from "react"
import { BsCheckCircle, BsClock, BsEye, BsFilter, BsSearch } from "react-icons/bs"
import { CiCircleCheck } from "react-icons/ci"
import { FaSearch } from "react-icons/fa"
import { FaCircleXmark, FaRegCircleXmark } from "react-icons/fa6"
import { loadRecruiterApplications } from "../../../services/adminServices"
import { RecruiterProfileData } from "../../../types/entityTypes"
import { Notify } from "notiflix"
import { Table, TableHead } from "@mui/material"
import formatDate from "../../../services/util/formatDate"
import { useNavigate } from "react-router-dom"

function ProfileStatusTileCard({data}: {data: {title: string, icon: any, count: number, customClass: string, customTitleClass: string}}){
    return (
        <div className={`border border-gray-200 rounded-md p-5 ${data.customClass}`}>
            <div className="flex justify-between">
                <div>
                   <p className={`font-light text-sm ${data.customTitleClass}`}>{data.title}</p>
                    <p className="text-lg mt-2">{data.count}</p>
                </div>
                <div>
                    {data.icon}
                </div>
            </div>
        </div>
    )
}

function ApplicationStatusPills({status}: {status: string}){
    switch(status){
        case 'pending' :
            return(
                <span className="bg-orange-100 text-xs flex items-center gap-2 px-2 py-1 rounded-full text-orange-500">
                    <BsClock />
                    {status}
                </span>
            )
        case 'approved' :
            return(
                <span className="bg-green-100 text-xs flex items-center gap-2 px-2 py-1 rounded-full text-green-500">
                    <BsCheckCircle />
                    {status}
                </span>
            )
        case 'rejected' :
            return(
                <span className="bg-red-100 text-xs flex items-center gap-2 px-2 py-1 rounded-full text-red-500">
                    <FaRegCircleXmark />
                    {status}
                </span>
            )

        default:
            return
    }
}

export default function RecruiterApplications(){
    
    const [totalapplications, setTotalApplications] = useState<number>(0)
    const [pendingApplications, setPendingApplications] = useState<number>(0)
    const [approvedApplications, setApprovedApplications] = useState<number>(0)
    const [rejectedApplications, setRejectedApplications] = useState<number>(0)

    const [recruiterApplications, setRecruiterApplications] = useState<RecruiterProfileData[] | null | undefined>(null)
    const [search, setSearch] = useState<string>('')
    const [profileStatus, setProfileStatus] = useState<string>('All')
    const [error, setError] = useState<string>('')


    const tileData = [
        {id:1, title:'Total Applications', count:totalapplications, icon: <BsFilter color="gray" />, customClass: 'bg-white border-gray-300', customTitleClass:'text-black'},
        {id:2, title:'Pending', count:pendingApplications, icon: <BsClock color="orange" />, customClass: 'bg-orange-100 border-orange-300', customTitleClass:'text-orange-500'},
        {id:3, title:'Approved', count:approvedApplications, icon: <BsCheckCircle color="green" />, customClass: 'bg-green-100 border-green-300', customTitleClass:'text-green-500'},
        {id:4, title:'Rejected', count:rejectedApplications, icon: <FaRegCircleXmark color="red" />, customClass: 'bg-red-100 border-red-300', customTitleClass:'text-red-500'}
    ]

    const navigate = useNavigate()

    const searchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        //console.log(e.target.value)
        setSearch(e.target.value)
    }

    const debaouncedSearch = (fn: Function, delay: number) => {
        let timer: any
        return (...args: any) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }

    const finalSearch = debaouncedSearch(searchValue, 600)

    const goToApplicationDetailsPage = (applicationDetails: RecruiterProfileData) => {
        return navigate('/admin/recruiter/applications/details', {state: {applicationDetails}})
    }

    useEffect(() => {
        (async () => {
            //Notify.failure(search, {timeout:1000})
            try {
                const result = await loadRecruiterApplications(search, profileStatus)

                if(result?.success){
                    setRecruiterApplications(result?.result)
                    setTotalApplications(result?.result?.length)
                    setPendingApplications(result?.result?.filter((application: RecruiterProfileData) => application.profileStatus === 'pending').length)
                    setApprovedApplications(result?.result?.filter((application: RecruiterProfileData) => application.profileStatus === 'approved').length)
                    setRejectedApplications(result?.result?.filter((application: RecruiterProfileData) => application.profileStatus === 'rejected').length)
                }
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:3000})
                setError('Oops!, Something went wrong please try again after some time')
            }
        })()
    }, [search, profileStatus])

    return (
        <div className="w-full min-h-screen p-5 lg:px-20">
            <p className="text-xl">Recruiter Applications</p>
            <div className="mt-3 text-sm font-light">Review and manage Recruiter applications</div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-4">
                {
                    tileData.map((data: any, index: number) => (
                        <ProfileStatusTileCard key={index} data={data} />
                    ))
                }
            </div>

            <div className="mt-5 bg-white p-3 border border-gray-200 grid grid-cols-1 lg:grid-cols-2 gap-3 rounded-md">
                <div className="border border-gray-300 rounded-md p-2 flex gap-2 items-center">
                    <BsSearch color="gray" />
                    <input onKeyUp={(event) => finalSearch(event)} type="text" className="flex-1 text-gray-500" placeholder="Search by recruiter name, company name, email" />
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setProfileStatus('All')} className={`text-xs px-2 py-2 rounded-md ${profileStatus === 'All' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>All</button>
                    <button onClick={() => setProfileStatus('Pending')} className={`text-xs px-2 py-2 rounded-md ${profileStatus === 'Pending' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>Pending</button>
                    <button onClick={() => setProfileStatus('Approved')} className={`text-xs px-2 py-2 rounded-md ${profileStatus === 'Approved' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>Approved</button>
                    <button onClick={() => setProfileStatus('Rejected')} className={`text-xs px-2 py-2 rounded-md ${profileStatus === 'Rejected' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>Rejected</button>
                    <button className="flex px-2 py-2 rounded-md text-white bg-green-600 items-center gap-2 text-xs">
                        <CiCircleCheck />
                        Bulk Approve
                    </button>
                </div>
            </div>
            
            <div className="overflow-x-auto w-full border border-gray-200 rounded-md mt-10">
                <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Applicant</th>
                        <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Type</th>
                        <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Business Name</th>
                        <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Experience</th>
                        <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Focus</th>
                        <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Status</th>
                        <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Submitted</th>
                        <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {
                        recruiterApplications && 
                        recruiterApplications.length > 0 && (
                            recruiterApplications.map((recruiterAppliation: RecruiterProfileData, index) => (
                                <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 align-middle whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-light">{recruiterAppliation.userProfile?.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">{recruiterAppliation.userProfile.headline}</p>
                                        </div>
                                    </td>
                                    <td className="text-sm px-4 py-3 text-gray-700 align-middle whitespace-nowrap">{recruiterAppliation.employerType}</td>
                                    <td className="text-sm px-4 py-3 text-gray-700 align-middle whitespace-nowrap">
                                        {recruiterAppliation.employerType === 'company' ? recruiterAppliation.organizationDetails?.organizationName : 'NA'}
                                    </td>
                                    <td className="px-4 py-3 text-gray-700 text-sm align-middle whitespace-nowrap">{recruiterAppliation.recruitingExperience}</td>
                                    <td className="px-4 py-3 align-middle">
                                        <div className="flex flex-wrap gap-1">
                                            {
                                                recruiterAppliation.focusingIndustries?.map((industry: string, index: number) => (
                                                    <span key={index} className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{industry}</span>
                                                ))
                                            }
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 align-middle whitespace-nowrap"><ApplicationStatusPills status={recruiterAppliation.profileStatus as string} /></td>
                                    <td className="px-4 py-3 text-sm text-gray-700 align-middle whitespace-nowrap">{formatDate(recruiterAppliation.createdAt)}</td>
                                    <td className="px-4 py-3 align-middle whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            
                                                        <button onClick={() => goToApplicationDetailsPage(recruiterAppliation)}><BsEye color="blue" size={20} /></button>
                                                        {/* <button><CiCircleCheck color="green" size={20} /></button>
                                                        <button><FaRegCircleXmark color="red" /></button> */}
                                                
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
            </div>
        
        </div>
    )
}