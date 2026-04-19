import React, { useEffect, useState } from "react";
import JobVerticalCard from "../../components/common/JobVerticalCard";
import { getSavedJobs, unsaveJob } from "../../services/userServices";
import { FavoriteJob, JobDetails, MySavedJobData } from "../../types/entityTypes";
import { Notify } from "notiflix";
import { BsArrowLeft, BsBookmarkFill, BsBriefcase } from "react-icons/bs";
import { LuCalendar, LuSearch, LuUsers } from "react-icons/lu";
import { BiBriefcase, BiChevronDown, BiDollar, BiRupee } from "react-icons/bi";
import { TbBriefcaseOff } from "react-icons/tb";
import { formattedDateMoment } from "../../services/util/formatDate";
import getReminingDays from "../../helpers/DateTime.helper";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function SavedJobs(){
    const [savedJobs, setSavedJobs] = useState<MySavedJobData[] | null | undefined>(null)
    const [isSavedJobsSortMenuOpened, setIsSavedJobsSortMenuOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState<'recently-saved' | 'expiry-order' | 'highest-salary'>('recently-saved')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [totalPages, setTotalPages] = useState(1)

    const navigate = useNavigate()

    const toggleSavedJobsSortMenu = () => setIsSavedJobsSortMenuOpen(prv => !prv)

    const searchJobs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)
    }

    function debounceSearch <T extends (...args: never[]) => void>(fn: T, delay: number){
        let timer: ReturnType<typeof setTimeout>;
        return function(...args: Parameters<T>){
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args)
            }, delay);
        }
    }

    const dSearch = debounceSearch(searchJobs, 600)

    const onUnsaveJob = (savedId: string) => {
        if(!savedId) return
        Swal.fire({
            icon: 'question',
            title: 'Unsave job ?',
            showConfirmButton: true,
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'Unsave'
        }).then(async (response) => {
            if(response.isConfirmed){
                const result = await unsaveJob(savedId)
                setSavedJobs((prv: MySavedJobData[] | null | undefined) => {
                    if(!prv) return null
                     return prv.filter((savedJob: MySavedJobData) => savedJob._id !== savedId)
                })
                Notify.success('Job removed from saving')
            }else{
                return
            }
        })
        
    }

    const navigateToJobDetailsPage = (jobId: string) => {
        if(jobId){
            return navigate(`/jobs/${jobId}`)
        }
    }

    useEffect(() => {
        (async function(){
            try {
                const result = await getSavedJobs(search, sort)
                console.log('-- result of saved jobs --', result)
                setSavedJobs(result.result.jobs)
                setTotalPages(result.result.totalPages)
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2500})
            }
        })()
    }, [search, sort])
    return(
        <div className="container px-5 py-15 lg:px-20 lg:py-10">
            <div>
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-medium text-gray-700 p-2 hover:bg-gray-200 rounded-md">
                    <BsArrowLeft />
                    <p>Back</p>
                </button>
            </div>
            <p className="mt-2 font-semibold text-xl">Favorites Jobs ({savedJobs ? savedJobs.length : 0})</p>
            
            <div className="mt-5 bg-white p-2 border border-slate-300 rounded-md grid grid-cols-12 gap-3">
                <div className="flex col-span-6 lg:col-span-8 items-center gap-2 text-xs bg-gray-100 p-2 rounded-md">
                    <LuSearch color="gray" />
                    <input onKeyUp={(e) => dSearch(e)} type="text" className="!text-xs w-full" placeholder="Search job title" />
                </div>
                <div className="flex col-span-6 relative lg:col-span-4 items-center gap-2 text-xs bg-gray-100 p-2 rounded-md">
                    <div className="flex w-full justify-between items-center">
                        <p>{sort}</p>
                        <button onClick={toggleSavedJobsSortMenu}><BiChevronDown size={20} /></button>
                    </div>
                    {isSavedJobsSortMenuOpened && (
                        <div className="absolute shadow-md flex flex-col items-start bg-white -bottom-25 left-0 w-full border border-slate-300 rounded-md">
                            <button onClick={() =>{setSort('recently-saved'); setIsSavedJobsSortMenuOpen(false)}} className="px-3 py-2 hover:bg-gray-200 w-full">Recently Saved</button>
                            <button onClick={() =>{setSort('expiry-order'); setIsSavedJobsSortMenuOpen(false)}} className="px-3 py-2 hover:bg-gray-200 w-full">Expiring Soon</button>
                            <button onClick={() =>{setSort('highest-salary'); setIsSavedJobsSortMenuOpen(false)}} className="px-3 py-2 hover:bg-gray-200 w-full">Higher Salary</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3">
                {savedJobs && savedJobs.length > 0
                    ? <>
                        {
                            savedJobs.map((savedJob: MySavedJobData) => (
                                <div key={savedJob._id} className="bg-white p-3 border border-slate-200 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:bg-gradient-to-br hover:from-blue-200 hover:to-indigo-300 rounded-md flex gap-2">
                                    <div>
                                        <div className="bg-blue-500 w-12 h-12 rounded-md flex items-center justify-center">
                                            <BsBriefcase color="white" size={20} />
                                        </div>
                                    </div>
                                    <div className="flex-1 cursor-pointer" onClick={() => navigateToJobDetailsPage(savedJob.jobDetails._id as string)}>
                                        <p className="font-semibold text-sm">{savedJob.jobDetails.jobTitle} <span className={`text-xs font-normal ms-5 ${getReminingDays(savedJob.jobDetails.expiresAt) <= 5 ? "text-red-500" : "text-gray-500"}`}>Expires in {getReminingDays(savedJob.jobDetails.expiresAt)} Days</span></p>
                                        <p className="text-xs text-gray-500 mt-2">{savedJob.companyDetails.name} | Posted by {savedJob.recruiterDetails.name}</p>
                                        <div className="flex gap-2 mt-3">
                                            <span className="bg-blue-500 text-white text-xs px-3 rounded-md">{savedJob.jobDetails.jobType}</span>
                                            <span className="bg-blue-500 text-white text-xs px-3 rounded-md">{savedJob.jobDetails.jobLevel}</span>
                                            <span className="bg-blue-500 text-white text-xs px-3 rounded-md">{savedJob.jobDetails.workMode}</span>
                                        </div>
                                        <div className="mt-3">
                                            <span className="flex items-center">
                                                {savedJob.jobDetails.salaryCurrency === 'INR' ? <BiRupee /> : <BiDollar />}
                                                <p className="font-semibold">{savedJob.jobDetails.minSalary} <span className="text-gray-500 font-normal text-xs">/{savedJob.jobDetails.salaryPeriod}</span></p>
                                            </span>
                                        </div>
                                        <div className="mt-5 flex items-center gap-5">
                                            <span className="text-xs flex items-center gap-2 text-gray-500"><LuUsers /> <p> {savedJob.jobDetails.applicationsCount} Applications</p></span>
                                            <span className="text-xs flex items-center gap-2 text-gray-500"><LuCalendar /> <p> Apply by {formattedDateMoment(savedJob.jobDetails.expiresAt, "MMM DD YYYY")}</p></span>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => onUnsaveJob(savedJob._id as string)}>
                                            <BsBookmarkFill color="blue" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="flex justify-between">
                            <p className="text-xs text-gray-500">Showing page {page} of {totalPages}</p>
                            <div className="space-x-2">
                                <button disabled={page === 1} className="border border-slate-200 px-3 bg-white py-2 rounded-md text-xs font-medium">Prev</button>
                                <button disabled={page >= totalPages} className="border border-slate-200 px-3 bg-blue-500 text-white py-2 rounded-md text-xs font-medium">Next</button>
                            </div>
                        </div>
                      </>
                    : <>
                        <div className="flex flex-col items-center">
                            <TbBriefcaseOff size={45} color="gray" />
                            <p className="text-xs text-gray-500">No saved jobs</p>
                        </div>
                      </>
                }
            </div>
        </div>

    )
}