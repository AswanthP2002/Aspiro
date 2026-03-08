import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { loadJobDetails } from "../../../services/commonServices"
import { checkIsJobApplied, checkIsSaved, saveJob, unsaveJob } from "../../../services/userServices"
import { useSelector } from "react-redux"
import { formatRelativeTime, formattedDateMoment } from "../../../services/util/formatDate"
import { Notify } from "notiflix"
import { BiBriefcase, BiCalendar, BiChart, BiChat, BiRupee, BiShare } from "react-icons/bi"
import { BsThreeDots } from "react-icons/bs"
import { CiBookmark, CiClock2, CiMonitor } from "react-icons/ci"
import { LuBriefcase, LuFileText, LuGraduationCap, LuHistory, LuListCheck, LuShieldCheck, LuSparkles, LuUsers } from "react-icons/lu"
import { JobDetailsForPublicData } from "../../../types/entityTypes"
import { FaHeart } from "react-icons/fa"
import { CgArrowLeft } from "react-icons/cg"
import { GoBookmarkSlash, GoReport } from "react-icons/go"

export default function JObDetailsCandidateSide() {
    const [jobDetails, setjobDetails] = useState<JobDetailsForPublicData | null >(null)
    const [isJobApplid, setIsJobApplied] = useState(false)
    const [isJobSaved, setIsJobSaved] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [isJobOptionsMenuOpened, setIsJobOptionsMenuOpened] = useState(false)

    const toggleJobOptionsMenuOpen = () => setIsJobOptionsMenuOpened(prv => !prv)
    
    const params = useParams()
    const jobId  = params?.id as string
    const logedUser = useSelector((state : any) => {
        return state.userAuth.user
    })

    console.log('params is here', jobId)
    const navigator = useNavigate()

    useEffect(() => {
        async function fetchJobDetails(){
            
            try {
                const [
                    jobDetailsResult,
                    jobSavedResult,
                    jobAppliedResult
                ] = await Promise.all([loadJobDetails(jobId), checkIsSaved(jobId), checkIsJobApplied(jobId)])
                
                                
                if(jobDetailsResult.success){
                    console.log('job details fetched', jobDetailsResult)
                    console.log('job saved result', jobSavedResult)
                    console.log('job applied result', jobAppliedResult)
                    setjobDetails(jobDetailsResult?.jobDetails)
                    setIsJobApplied(jobAppliedResult.result ? jobAppliedResult.result : null)
                    setIsJobSaved(jobSavedResult ? true : false)
                    console.log('job details from the state', jobDetails)
                }else{
                    Notify.failure('Something went wrong', {timeout:2500})
                }

            } catch (error : unknown) {
                console.log(error)
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2500})
            }
        }

        fetchJobDetails()
        
    }, [])

    function goToApplyPage(jobId : string) {
        navigator(`/jobs/${jobId}/apply`, {state:{jobDetails}})
    }
    async function saveAJob(jobId : string) {
        if(!jobId) return
        try {
            setIsLoading(true)
            const result = await saveJob(jobId)
    
            if(result?.success){
                Notify.success('Saved', {timeout:1200})
                setIsJobSaved(true)
                setTimeout(() => setIsJobSaved(true), 1200)
            }else{
                Notify.failure('Can not save job', {timeout:1200})
            }
        } catch (error: unknown) {
            Notify.failure('Something went wrong', {timeout:1200})
        } finally {
            setIsLoading(false)
        }
    }

    async function unsaveAJob(jobId : string) {
        if(!jobId) return 
        try {
            setIsLoading(true)
            const result = await unsaveJob(jobId)
            if(result?.success){
                Notify.success('Unsaved', {timeout:1200})
                setIsJobSaved(false)
                setTimeout(() => setIsJobSaved(false), 1200)
            }else{
                Notify.failure('Something went wrong', {timeout:1200})
            }
        } catch (error: unknown) {
            Notify.failure('Something went wrong', {timeout:1200})   
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <>
            <div className="w-full pt-12 lg:pt-0 px-2 lg:px-10">
                <div>
                    <button onClick={() => navigator(-1)} className="flex items-center justify-center text-xs gap-2 text-gray-500 hover:bg-gray-200 rounded-md p-2">
                        <CgArrowLeft size={20} />
                        <p>Back to jobs</p>
                    </button>
                </div>
                <div className="mt-2 p-5 flex gap-2 bg-white border border-blue-200 ring-1 ring-blue-500 rounded-md">
                    <div>
                        <div className="bg-blue-500 w-12 h-12 rounded-md flex items-center justify-center">
                            <BiBriefcase color="white" size={25} />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">{jobDetails?.jobTitle}</p>
                            <div className="flex items-center gap-3">
                                <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md">{jobDetails?.recruiterProfileDetails?.recruiterType}</span>
                                {isJobSaved
                                    ? <FaHeart title="Favorite" color="blue" />
                                    : null
                                }
                            </div>
                        </div>
                        <div className="mt-1 flex items-center">
                            <p className="text-xs text-gray-500">{jobDetails?.companyProfileDetails?.name} | Posted by {jobDetails?.recruiterProfileDetails?.name}</p>
                            <p className="text-xs ms-5 text-gray-500">{formatRelativeTime(jobDetails?.createdAt || new Date())}</p>
                        </div>
                        <div className="mt-5 flex gap-5">
                            <p className="text-xs">Apply by <span className="font-semibold text-sm">{formattedDateMoment(jobDetails?.expiresAt, "MMM DD YYYY")}</span></p>
                            <span className="text-xs flex gap-2 items-center ">
                                <LuUsers color="gray" />
                                <p className="text-gray-500">{jobDetails?.applicationsCount} Applications</p>
                            </span>
                        </div>
                        <div className="mt-5">
                            {isJobApplid
                                ? <>
                                    <button disabled onClick={() => goToApplyPage(jobDetails?._id as string)} className="border border-slate-300 text-green-500 text-sm font-semibold px-3 py-2 rounded-md">Applied on {formattedDateMoment(isJobSaved.createdAt, "MMM DD YYYY")}</button>
                                  </>
                                : <>
                                    <button onClick={() => goToApplyPage(jobDetails?._id as string)} className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white text-sm font-semibold px-3 py-2 rounded-md">Apply Now</button>
                                  </>
                            }
                        </div>
                    </div>
                    <div className="relative">
                        <button onClick={toggleJobOptionsMenuOpen}><BsThreeDots /></button>
                        {isJobOptionsMenuOpened && (
                            <div className="absolute bg-white rounded border w-30 right-0 border-slate-200">
                            <button className="text-xs flex items-center p-2 gap-2 hover:bg-gray-200 w-full">
                                <GoReport color="red" />
                                <p className="text-red-500">Report job</p>
                            </button>
                            {isJobSaved
                                ? <>
                                    <button onClick={() => {unsaveAJob(jobId as string); setIsJobOptionsMenuOpened(false)}} className="text-xs flex items-center p-2 gap-2 hover:bg-gray-200 w-full">
                                        <GoBookmarkSlash />
                                        <p className="">Unsave Job</p>
                                    </button>
                                  </>
                                : <>
                                    <button onClick={() => {saveAJob(jobDetails?._id as string); setIsJobOptionsMenuOpened(false)}} className="text-xs flex items-center p-2 gap-2 hover:bg-gray-200 w-full">
                                        <CiBookmark />
                                        <p className="">Save Job</p>
                                    </button>
                                  </>
                            }
                            <button className="text-xs flex items-center p-2 gap-2 hover:bg-gray-200 w-full">
                                <BiShare />
                                <p className="">Share Job</p>
                            </button>
                        </div>
                        )}
                    </div>
                </div>
                <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 bg-white rounded-md border border-slate-200 ring-1 ring-blue-500 p-3">
                    <div className="flex gap-2 bg-white p-2 rounded-md border border-slate-300">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <BiRupee size={23} color="blue" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Pay</p>
                            <p className="text-sm font-semibold mt-1">{jobDetails?.minSalary} - {jobDetails?.maxSalary}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 bg-white p-2 rounded-md border border-slate-300">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <BiChart size={23} color="blue" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Job Level</p>
                            <p className="text-sm font-semibold mt-1">{jobDetails?.jobLevel}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 bg-white p-2 rounded-md border border-slate-300">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <BiCalendar size={23} color="blue" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Job Type</p>
                            <p className="text-sm font-semibold mt-1">{jobDetails?.jobType}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 bg-white p-2 rounded-md border border-slate-300">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <CiMonitor size={23} color="blue" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Work Mode</p>
                            <p className="text-sm font-semibold mt-1">{jobDetails?.workMode}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 bg-white p-2 rounded-md border border-slate-300">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <CiClock2 size={23} color="blue" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Duration</p>
                            <p className="text-sm font-semibold mt-1">{jobDetails?.duration ? jobDetails.duration : "N/A"}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 bg-white p-2 rounded-md border border-slate-300">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <LuUsers size={23} color="blue" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Vacancies</p>
                            <p className="text-sm font-semibold mt-1">{jobDetails?.vacancies}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 p-3 bg-white flex gap-3 rounded-md border border-slate-200 ring-1 ring-blue-500">
                    <div>
                        <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-md">
                            <LuFileText color="white" />
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Job Details</p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-700">{jobDetails?.description}</p>
                    </div>
                </div>

                <div className="mt-5 p-3 bg-white flex gap-3 rounded-md border border-slate-200 ring-1 ring-blue-500">
                    <div>
                        <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-md">
                            <LuListCheck color="white" />
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Requirements</p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-700">{jobDetails?.requirements}</p>
                    </div>
                </div>

                <div className="mt-5 p-3 bg-white flex gap-3 rounded-md border border-slate-200 ring-1 ring-blue-500">
                    <div>
                        <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-md">
                            <LuBriefcase color="white" />
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Responsibilities</p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-700">{jobDetails?.responsibilities}</p>
                    </div>
                </div>

                <div className="mt-5 p-3 bg-white flex gap-3 rounded-md border border-slate-200 ring-1 ring-blue-500">
                    <div>
                        <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-md">
                            <LuGraduationCap color="white" />
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Qualification</p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-700">{jobDetails?.qualification}</p>
                    </div>
                </div>

                <div className="mt-5 p-3 bg-white flex gap-3 rounded-md border border-slate-200 ring-1 ring-blue-500">
                    <div>
                        <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-md">
                            <LuHistory color="white" />
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Experience (In years)</p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-700">{jobDetails?.experienceInYears}</p>
                    </div>
                </div>

                <div className="mt-5 p-3 bg-white flex gap-3 rounded-md border border-slate-200 ring-1 ring-blue-500">
                    <div>
                        <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-md">
                            <LuShieldCheck color="white" />
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Required Skills</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {jobDetails?.requiredSkills.map((skill: string) => (
                                <span className="bg-blue-200 px-3 py-1 rounded-md text-xs font-medium text-gray-700">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-5 p-3 bg-white flex gap-3 rounded-md border border-slate-200 ring-1 ring-blue-500">
                    <div>
                        <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-md">
                            <LuSparkles color="white" />
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Optional Skills</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {jobDetails?.optionalSkills.map((skill: string) => (
                                <span className="bg-blue-200 px-3 py-1 rounded-md text-xs font-medium text-gray-700">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-5 p-3 bg-white border border-slate-200 ring-1 ring-blue-500 rounded-md">
                    <p className="font-semibold text-sm">About Recruiter</p>
                    <div className="flex gap-2 mt-5">
                        <div>
                            <div className="bg-blue-500 w-15 h-15 flex items-center rounded-full justify-center">
                                <p className="text-white font-bold text-2xl">{jobDetails?.recruiterProfileDetails?.name[0]}</p>
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{jobDetails?.recruiterProfileDetails?.name}</p>
                            <p className="font-normal text-xs text-gray-500">{jobDetails?.recruiterProfileDetails?.professionalTitle}</p>
                            {jobDetails?.recruiterProfileDetails?.recruiterType === 'corporate' && (
                                <div className="mt-5">
                                    <p className="text-sm text-gray-700">Hiring for <span className="font-semibold">{jobDetails.companyProfileDetails?.name}</span></p>
                                </div>
                            )}
                        </div>
                        <div>
                            <button className="flex items-center text-xs gap-2 border border-slate-300 p-2 hover:bg-gray-200 rounded-md">
                                <BiChat size={20} />
                                Message {jobDetails?.recruiterProfileDetails?.name.split(" ")[0]}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    // return (
    //     <>
    //         <div className="w-full">
    //             <div className="breadcrumbs-header bg-gray-100 w-full">
    //                 {/* <div className="">
    //                     <div className="flex justify-between py-3">
    //                         <div className="left"><p className="text-sm">Job Details</p></div>
    //                         <div className="right"><p className="text-sm">Home / Jobs / Job Details</p></div>
    //                     </div>
    //                 </div> */}
    //             </div>
    //             <section className="jobs mt-5 mb-5">
    //                 <div className="">
    //                     <div className="border border-gray-300 bg-white rounded-md !p-5">
    //                         <div className="flex gap-2">
    //                             <div>
    //                                 <div className="w-12 bg-blue-100 h-12 flex items-center justify-center rounded-full">
    //                                     <PiSuitcase color="blue" size={22} />
    //                                 </div>
    //                             </div>
    //                             <div className="flex-1">
    //                                 <p className="text-xl font-light">{jobDetails?.jobTitle}</p>
    //                                 <div className="flex gap-4 items-center">
    //                                     <p className="text-xs text-gray-500">Posted by: {jobDetails?.userProfile?.name}</p>,
    //                                     {jobDetails?.workMode === 'On-site' || jobDetails?.workMode === 'Hybrid' ? (jobDetails?.location) : null}
    //                                 </div>
    //                                 <div className="flex gap-2 mt-2">
    //                                     <div className="border border-blue-500 bg-blue-100 text-xs text-blue-500 rounded-md px-2 py-1">
    //                                         {jobDetails?.jobType}
    //                                     </div>
    //                                     <div className="border border-green-500 bg-green-100 text-xs text-green-500 rounded-md px-2 py-1">
    //                                         {jobDetails?.workMode}
    //                                     </div>
    //                                     <div className="border border-violet-500 bg-violet-100 text-xs text-violet-500 rounded-md px-2 py-1">
    //                                         {jobDetails?.jobLevel}
    //                                     </div>
    //                                 </div>
    //                                 <div className="flex items-center grid grid-cols-1 lg:grid-cols-2 mt-3 mb-3 gap-2">
    //                                     <div className="flex items-center gap-3">
    //                                         <CiCircleInfo color="blue" />
    //                                     <p className="text-xs text-blue-500">Apply  by {transformDate(jobDetails?.expiresAt)}</p>
    //                                     </div>
    //                                     <div className="flex items-center gap-3">
    //                                         <CiClock1 />
    //                                     <p className="text-xs text-gray-500">Posted {formatRelativeTime(jobDetails?.createdAt || new Date())}</p>
    //                                     </div>
    //                                 </div>
    //                                 <div className="mt-5">
    //                                     {
    //                                         jobDetails?.candidateIds.includes(logedUser.id) 
    //                                             ? <>
    //                                                 <button className="bg-gradient-to-br from-blue-500 text-sm to-indigo-600 text-white flex items-center gap-2 px-3 py-2 rounded-md">
    //                                                     Applied
    //                                                     <BiCheck color="white" size={21} />
    //                                                 </button>
    //                                               </>
    //                                             : <>
    //                                                 <button onClick={() => goToApplyPage(jobDetails?._id as string)} className="bg-gradient-to-br from-blue-500 text-sm to-indigo-600 text-white flex items-center gap-2 px-3 py-2 rounded-md">
    //                                                     Apply Now
    //                                                     <CiShare1 color="white" size={21} />
    //                                                 </button>
    //                                               </>

    //                                     }
    //                                 </div>
    //                             </div>
    //                             <div className="flex gap-2">
    //                                 {
    //                                     isJobSaved
    //                                         ? <>
    //                                             {
    //                                                 loading
    //                                                     ? <ButtonLoader />
    //                                                     : <>
    //                                                         <button onClick={() => unsaveAJob(jobDetails?._id as string)} className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-md gap-2">
    //                                                             <CiBookmarkCheck />
    //                                                         </button>
    //                                                       </>
    //                                             }
    //                                           </>
    //                                         : <>
    //                                             {
    //                                                 loading
    //                                                     ? <ButtonLoader />
    //                                                     : <>
    //                                                         <button onClick={() => saveAJob(jobDetails?._id as string)} className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-md gap-2">
    //                                                             <CiBookmark />
    //                                                         </button>
    //                                                       </>
    //                                             }
    //                                           </>
    //                                 }
    //                                 <button className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-md gap-2">
    //                                     <RiShareLine />
    //                                 </button>
    //                             </div>
    //                         </div>
    //                         {/* <div className="flex gap-3 items-center">
    //                             <div className="border border-gray-300 w-[40px] h-[40px] flex justify-center items-center rounded-full"><i className="!text-gray-300 fa-solid fa-briefcase"></i></div>
    //                             <div>
    //                                 <p className="font-semibold">Job title</p>
    //                                 <p className="text-sm text-gray-400 mt-2">Company name, locality, state</p>
    //                             </div>
    //                         </div> */}
    //                         {/* <div className="flex justify-between mt-5">
    //                             <div>
    //                                 <p className="text-blue-500 text-sm">Apply by {transformDate(jobDetails?.expiresAt)} | Posted {formatRelativeTime(jobDetails?.createdAt || new Date())}</p>
    //                             </div>
    //                             <div className="flex gap-5">
    //                                 {
    //                                 isJobSaved
    //                                     ? <button onClick={() => jobUnsave(jobDetails?._id)} type="button" className="save-button btn"><MdBookmarkAdded /></button>
    //                                     : <button onClick={() => addJobToFavorites(jobDetails?._id)} type="button" className="save-button btn"><i className={`fa-solid fa-bookmark !text-xl !text-gray-300`}></i></button>
    //                                 }
    //                                 <button><i className="fa-solid fa-share-nodes !text-xl"></i></button>
    //                                 <button onClick={() => goToApplyPage(jobDetails?._id)} className="text-sm bg-blue-500 rounded-md text-white !px-5 !py-2">Apply Now</button>
    //                             </div>
    //                         </div> */}
    //                     </div>

    //                     <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
    //                         <div className="bg-white border border-gray-300 rounded-md p-2">
    //                             <p className="text-xs text-gray-500 "><i className="!text-sm !text-gray-400 fa-solid fa-wallet me-2"></i>Pay</p>
    //                             <p className="text-sm mt-1">
    //                                 <p className="flex items-center">
    //                                     {jobDetails?.salaryCurrency === 'INR' ? <BiRupee /> : null}
    //                                     {jobDetails?.minSalary} - {jobDetails?.maxSalary}
    //                                 </p>
    //                             </p>
    //                         </div>
    //                         <div className="bg-white border border-gray-300 rounded-md p-2">
    //                             <p className="text-xs text-gray-500"><i className="!text-sm !text-gray-400 fa-solid fa-clock me-2"></i>Job Type</p>
    //                             <p className="text-sm mt-1">{jobDetails?.jobType}</p>
    //                         </div>
    //                         <div className="bg-white border border-gray-300 rounded-md p-2">
    //                             <p className="text-xs text-gray-500"><i className="!text-sm !text-gray-400 fa-solid fa-suitcase me-2"></i>Work Mode</p>
    //                             <p className="text-sm mt-1">{jobDetails?.workMode}</p>
    //                         </div>
    //                         <div className="bg-white border border-gray-300 rounded-md p-2">
    //                             <p className="text-xs text-gray-500"><i className="!text-sm !text-gray-400 fa-solid fa-users me-2"></i>Vacancies</p>
    //                             <p className="text-sm mt-1">{jobDetails?.vacancies} Openings</p>
    //                         </div>
    //                         <div className="bg-white border border-gray-300 rounded-md p-2">
    //                             <p className="text-xs text-gray-500"><i className="!text-sm !text-gray-400 fa-solid fa-location-dot me-2"></i>Office Location</p>
    //                             <p className="text-sm mt-1">{jobDetails?.workMode === 'On-site' || jobDetails?.workMode === 'Hybrid' ? jobDetails?.location : 'NA'}</p>
    //                         </div>
    //                         <div className="bg-white border border-gray-300 rounded-md p-2">
    //                             <p className="text-xs text-gray-500"><i className="!text-sm !text-gray-400 fa-solid fa-layer-group me-2"></i>Job Level</p>
    //                             <p className="text-sm mt-1">{jobDetails?.jobLevel}</p>
    //                         </div>
    //                     </div>
    //                     <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-12">
    //                         <div className="lg:col-span-8 grid grid-cols-1 gap-3">
    //                             <div className="border p-3 border-gray-200 bg-white roundded-md">
    //                                 <p className="font-light">Description</p>
    //                                 <p className="mt-3 text-xs leading-relaxed text-gray-500">{jobDetails?.description}</p>
    //                             </div>

    //                             <div className="border p-3 border-gray-200 bg-white roundded-md">
    //                                 <p className="font-light">Requirements</p>
    //                                 <p className="mt-3 text-xs leading-relaxed text-gray-500">{jobDetails?.description}</p>
    //                             </div>

    //                             <div className="border p-3 border-gray-200 bg-white roundded-md">
    //                                 <p className="font-light">Responsibilities</p>
    //                                 <p className="mt-3 text-xs leading-relaxed text-gray-500">{jobDetails?.description}</p>
    //                             </div>
    //                         </div>
    //                         <div className="lg:col-span-4 grid grid-cols-1 gap-3">
    //                             <div className="bg-white p-3 border border-gray-200 rounded-md">
    //                                     <p className="font-light">Required skills</p>
    //                                 <div className="flex flex-wrap gap-2 mt-3">
    //                                     {
    //                                         jobDetails?.requiredSkills?.map((skill : string, index : number) => {
    //                                             return <div key={index} className="bg-gray-200 rounded-full !px-3 !py-1">
    //                                                 <p className="text-xs text-gray-500">{skill}</p>
    //                                             </div>
    //                                         })
    //                                     }
    //                                 </div>
    //                                 </div>

    //                                 <div className="bg-white border p-3 border-gray-200 rounded-md">
    //                                             <p className="font-light">Optional</p>
    //                                             <div className="flex flex-wrap gap-2 mt-3">
    //                                                 {
    //                                                     jobDetails?.optionalSkills?.map((skill: string, index: number) => {
    //                                                         return <div key={index} className="bg-gray-200 rounded-full !px-3 !py-1">
    //                                                             <p className="text-xs text-gray-500">{skill}</p>
    //                                                         </div>
    //                                                     })
    //                                                 }
    //                                             </div>
    //                                 </div>

    //                                 <div className="border border-blue-500 p-3 bg-blue-100 rounded-md flex gap-2">
    //                                     <div className="bg-blue-500 rounded-md w-10 h-10 flex items-center justify-center">
    //                                         <LuUsers color="white" size={20} />
    //                                     </div>
    //                                     <div>
    //                                         <p>{jobDetails?.applicationsCount}</p>
    //                                         <p className="text-sm font-light">Total Applicants</p>
    //                                     </div>
    //                                 </div>
                                    
    //                                 <div className="border p-3 border-gray-200 bg-white rounded-md">
    //                                     <p className="font-light">About Recruiter</p>
    //                                     <div className="flex items-center mt-3 gap-2">
    //                                         <div>
    //                                             <FaUserTie />
    //                                         </div>
    //                                         <div>
    //                                             <p className="text-sm text-gray-700">{jobDetails?.userProfile?.name}</p>
    //                                             <p className="text-xs text-gray-500">{jobDetails?.userRecruiterProfile?.employerType} Recruiter</p>
    //                                         </div>
    //                                     </div>
    //                                     <div className="mt-5">
    //                                         <p className="text-sm text-gray-700">About</p>
    //                                         <p className="mt-2 text-xs text-gray-500">{jobDetails?.userRecruiterProfile.summary}</p>
    //                                     </div>
    //                                 </div>
    //                         </div>
    //                     </div>
    //                     {/*  */}
                        
    //                     {/* <div className="mt-5 grid grid-cols-12 gap-5">
    //                         <div className="col-span-7 bg-white border border-gray-300 rounded-md p-5">
    //                             <div>
    //                                 <p className="font-semibold">Description</p>
    //                                 <p className="mt-3 text-sm text-gray-500">{jobDetails?.description}</p>
    //                             </div>
    //                             <div className="mt-5">
    //                                 <p className="font-semibold">Requirements</p>
    //                                 <p className="mt-3 text-sm text-gray-500">{jobDetails?.requirements}</p>
    //                             </div>
    //                             <div className="mt-5">
    //                                 <p className="font-semibold">Responsibilties</p>
    //                                 <p className="mt-3 text-sm text-gray-500">{jobDetails?.responsibilities}</p>
    //                             </div>
    //                         </div>
    //                         <div className="col-span-5">
    //                             <div className="border bg-white border-gray-300 rounded-md !p-5">
    //                                 <div>
    //                                     <p className="font-semibold">Required skills</p>
    //                                 <div className="flex gap-3 mt-3">
    //                                     {
    //                                         jobDetails?.requiredSkills?.map((skill : string, index : number) => {
    //                                             return <div key={index} className="bg-gray-200 rounded-full !px-3 !py-1">
    //                                                 <p className="text-xs text-gray-500">{skill}</p>
    //                                             </div>
    //                                         })
    //                                     }
    //                                 </div>
    //                                 </div>
    //                                 {
    //                                     jobDetails?.optionalSkills?.length > 0 && (
    //                                         <div className="mt-5">
    //                                             <p className="font-semibold">Optional</p>
    //                                             <div className="flex gap-3 mt-3">
    //                                                 {
    //                                                     jobDetails?.optionalSkills?.map((skill: string, index: number) => {
    //                                                         return <div key={index} className="bg-gray-200 rounded-full !px-3 !py-1">
    //                                                             <p className="text-xs text-gray-500">{skill}</p>
    //                                                         </div>
    //                                                     })
    //                                                 }
    //                                             </div>
    //                                         </div>
    //                                     )
    //                                 }
    //                             </div>
    //                             <div className="border bg-white p-5 border-gray-300 mt-5 rounded-md">
    //                                 <p className="font-semibold">Benefits</p>
    //                                 <p className="text-sm text-gray-500 mt-3">{jobDetails?.companyDetails?.benefit}</p>
    //                             </div>
    //                         </div>
    //                     </div> */}
    //                     {/* <div className="mt-5 border bg-white border-gray-300 rounded-md p-5">
    //                         <div className="flex gap-3 items-center">
    //                             <div className="border border-gray-300 w-[40px] h-[40px] flex justify-center items-center rounded-full"><i className="!text-gray-300 fa-solid fa-building"></i></div>
    //                             <div>
    //                                 <p className="font-semibold">{jobDetails?.companyDetails?.companyName}</p>
    //                                 <p className="text-sm text-gray-400 mt-2">{jobDetails?.companyDetails?.industry}</p>
    //                             </div>
    //                         </div>
    //                     </div> */}

    //                     {/* Existing */}
    //                     {/* <div className="header w-full flex justify-between items-center">
    //                         <div className="company flex gap-4 items-center">
    //                             <img src={defaultImage} style={{width:'50px', height:'52px'}} alt="" />
    //                             <div>
    //                                 <p className="font-semibold">{jobDetails.jobTitle}</p>
    //                                 <p className="text-xs mt-2 text-gray-300">{jobDetails?.companyDetails?.companyName}
    //                                     <span className="ms-2 bg-green-100 text-green-400 text-xs rounded-sm px-2">{jobDetails?.jobType}</span>
    //                                     <span className="ms-2 bg-blue-100 text-blue-400 text-xs rounded-sm px-2">{jobDetails?.locationType}</span>
    //                                 </p>
    //                             </div>
    //                         </div>
    //                         <div className="actions flex gap-2">
    //                             {
    //                                 isJobSaved
    //                                     ? <button type="button" className="save-button btn"><i className={`fa-solid fa-bookmark !text-2xl !text-black"`}></i></button>
    //                                     : <button onClick={() => addJobToFavorites(jobDetails?._id)} type="button" className="save-button btn"><i className={`fa-solid fa-bookmark !text-2xl !text-gray-300`}></i></button>
    //                                 }
                                
    //                             <button onClick={() => goToApplyPage(jobDetails?._id)} type="button" className="btn bg-blue-500 text-white rounded-sm px-3 py-2 text-sm">Apply now</button>
    //                         </div>
    //                     </div> */}
    //                     {/* <div className="details w-full">
    //                         <div className="flex flex-col md:flex-row w-full">
    //                             <div className="col w-1/2">
    //                                 <div className="mt-10">
    //                                     <p className="font-semibold">Description</p>
    //                                     <p className="text-sm text-gray-400">{jobDetails?.description}</p>
    //                                 </div>

    //                                 <div className="mt-10">
    //                                     <p className="font-semibold">Requirements</p>
    //                                     <p className="text-sm text-gray-400">{jobDetails?.requirements}</p>
    //                                 </div>

    //                                 <div className="mt-10">
    //                                     <p className="font-semibold">Responsibilities</p>
    //                                     <p className="text-sm text-gray-400">{jobDetails?.responsibilities}</p>
    //                                 </div>

    //                                 <div className="mt-10">
    //                                     <p className="font-semibold">Why work with us? </p>
    //                                     <p className="text-sm text-gray-400">{jobDetails?.companyDetails?.benefit}</p>
    //                                 </div>
    //                             </div>
    //                             <div className="col w-1/2">
    //                                 <div className="border border-blue-100 rounded-sm flex items-center gap-5 p-5">
    //                                     <div className="w-1/2">
    //                                         <p className="text-center text-sm font-semibold">Salary (Monthly)</p>
    //                                         <p className="mt-3 text-center font-bold text-green-400">Rs.{jobDetails?.minSalary} - Rs.{jobDetails?.maxSalary}</p>
    //                                     </div>
    //                                     <div className="w-1/2 flex flex-col justify-center items-center">
    //                                         <i className="fa-solid fa-location-dot"></i>
    //                                         <p className="text-sm text-gray-300 font-semibold">Job Location</p>
    //                                         <p className="font-bold">{jobDetails?.location}</p>
    //                                     </div>
    //                                 </div>

    //                                 <div className="border border-blue-100 rounded-sm mt-5 p-5">
    //                                     <div className="flex justify-between">
    //                                         <div>
    //                                             <i className="fa-solid fa-calendar"></i>
    //                                             <p className="text-gray-400 text-xs">Job Posted</p>
    //                                             <p>{formatDate(jobDetails?.createdAt)}</p>
    //                                         </div>
    //                                         <div>
    //                                             <i className="fa-solid fa-hourglass-end"></i>
    //                                             <p className="text-gray-400 text-xs">Valid Untill</p>
    //                                             <p>{formatDate(jobDetails?.expiresAt)}</p>
    //                                         </div>
    //                                         <div>
    //                                             <i className="fa-solid fa-layer-group"></i>
    //                                             <p className="text-gray-400 text-xs">Job level</p>
    //                                             <p>{jobDetails?.jobLevel}</p>
    //                                         </div>
    //                                     </div>
    //                                     <hr className="mt-5" />
    //                                     <div className="flex mt-5 gap-20">
    //                                         <div>
    //                                             <i className="fa-solid fa-wallet"></i>
    //                                             <p className="text-gray-400 text-xs">Experience</p>
    //                                             <p>{jobDetails?.experience}</p>
    //                                         </div>
    //                                         <div>
    //                                             <i className="fa-solid fa-school"></i>
    //                                             <p className="text-gray-400 text-xs">Education</p>
    //                                             <p>{jobDetails?.qualification}</p>
    //                                         </div>
                                            
    //                                     </div>

    //                                     <div className="mt-5">
    //                                         <p className="font-semibold">Share this job</p>
    //                                         <div className="flex gap-2">
    //                                             <button type="button" className="btn bg-blue-100 rounded py-1 px-2 text-xs"><i className="fa-solid fa-link"></i>Copy Link</button>
    //                                             <button type="button" className="btn bg-blue-100 rounded px-2 py-1"><i className="fa-brands fa-linkedin"></i></button>
    //                                             <button type="button" className="btn bg-blue-100 rounded px-2 py-1"><i className="fa-brands fa-facebook"></i></button>
    //                                             <button type="button" className="btn bg-blue-100 rounded px-2 py-1"><i className="fa-solid fa-envelope"></i></button>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div className="mt-5 mb-5">
    //                             <div className="w-full border border-blue-100 rounded-sm p-5">
    //                                 <div className="flex items-center gap-10">
    //                                     <img src={defaultImage} style={{width:'60px', height:'63px'}} alt="" />
    //                                     <div>
    //                                         <p className="font-bold">{jobDetails?.companyDetails?.companyName}</p>
    //                                         <p className="text-sm font-normal">{jobDetails?.companyDetails?.industry}</p>
    //                                     </div>
    //                                 </div>

    //                                 <div className="mt-5">
    //                                     <p className="font-semibold">Found In : <span className="font-normal text-gray-400">{jobDetails?.companyDetails?.foundIn}</span></p>
    //                                     <p className="font-semibold">Organization Type : <span className="font-normal text-gray-400">{jobDetails?.companyDetails?.companyType}</span></p>
    //                                     <p className="font-semibold">Strength : <span className="font-normal text-gray-400">{jobDetails?.companyDetails?.teamStrength}</span></p>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div> */}
    //                 </div>
    //             </section>
    //         </div>
    //     </>
    // )
}