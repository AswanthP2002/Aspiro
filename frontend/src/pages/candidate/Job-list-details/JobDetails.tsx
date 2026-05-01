import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { loadJobDetails } from "../../../services/commonServices"
import { checkIsJobApplied, checkIsSaved, saveJob, unsaveJob } from "../../../services/userServices"
import { formattedDateMoment } from "../../../services/util/formatDate"
import { Notify } from "notiflix"
import { BiBriefcase, BiChat, BiShare } from "react-icons/bi"
import { BsThreeDots } from "react-icons/bs"
import { CiBookmark } from "react-icons/ci"
import { LuBriefcase, LuBuilding2, LuFileText, LuGraduationCap, LuListChecks, LuShieldCheck } from "react-icons/lu"
import { JobDetailsForPublicData } from "../../../types/entityTypes"
import { FaHeart } from "react-icons/fa"
import { CgArrowLeft } from "react-icons/cg"
import { GoBookmarkSlash, GoReport } from "react-icons/go"
import { toast } from "react-toastify"
import { MdVerified } from "react-icons/md"
import { RiSpam2Fill } from "react-icons/ri"
import { Modal, Backdrop, Fade, Box } from "@mui/material"
import { HiOutlineExclamationTriangle, HiOutlineInformationCircle, HiOutlineShieldCheck } from "react-icons/hi2"
import moment from "moment"

export default function JObDetailsCandidateSide() {
    const [jobDetails, setjobDetails] = useState<JobDetailsForPublicData | null >(null)
    const [isJobApplid, setIsJobApplied] = useState(false)
    const [isJobSaved, setIsJobSaved] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [isJobOptionsMenuOpened, setIsJobOptionsMenuOpened] = useState(false)
    const [isAwarnessModalOpene, setIsAwarnessModalOpen] = useState(false)

    const openAwarenessModal = () => setIsAwarnessModalOpen(true)
    const closeAwarenessModal = () => setIsAwarnessModalOpen(false)


    const toggleJobOptionsMenuOpen = () => setIsJobOptionsMenuOpened(prv => !prv)
    
    const params = useParams()
    const jobId  = params?.id as string
    // const logedUser = useSelector((state : any) => {
    //     return state.userAuth.user
    // })

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

                    if(jobDetailsResult?.jobDetails?.isFlagged){
                        openAwarenessModal()
                    }else{
                        closeAwarenessModal()
                    }
                }else{
                   toast.error('Something went wrong')
                }

            } catch (error : unknown) {
                console.log(error)
                toast.error(error instanceof Error ? error.message : 'Something went wrong')
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

    return (
      <>
        <div className="w-full pt-12 lg:pt-0 px-2 lg:px-10 pb-10">
          <div>
            <button
              onClick={() => navigator(-1)}
              className="flex items-center justify-center text-xs gap-2 text-gray-500 hover:bg-gray-200 rounded-md p-2"
            >
              <CgArrowLeft size={20} />
              <p>Back to jobs</p>
            </button>
          </div>
          <div className="mt-2 p-5 lg:p-10 bg-white border border-slate-100 rounded-lg shadow-[0_0_30px_2px_rgba(100,0,250,0.1)]">
            <div className="flex gap-3">
              <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center shadow-xl shadow-blue-200">
                <BiBriefcase color="white" size={25} />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-xl tracking-wide truncate">
                  {jobDetails?.jobTitle}
                </p>
                <div className="flex items-center gap-2">
                  <LuBuilding2 color="gray" />
                  <p className="text-sm font-medium text-blue-600">
                    {jobDetails?.companyProfileDetails?.name}
                  </p>
                  <p className="text-gray-500">•</p>
                  <p className="text-gray-500 text-sm">{jobDetails?.workMode}</p>
                </div>
              </div>

              <div className="relative">
                <button onClick={toggleJobOptionsMenuOpen}>
                  <BsThreeDots />
                </button>
                {isJobOptionsMenuOpened && (
                  <div className="absolute bg-white rounded border w-30 right-0 border-slate-200">
                    <button className="text-xs flex items-center p-2 gap-2 hover:bg-gray-200 w-full">
                      <GoReport color="red" />
                      <p className="text-red-500">Report job</p>
                    </button>
                    {isJobSaved ? (
                      <>
                        <button
                          onClick={() => {
                            unsaveAJob(jobId as string);
                            setIsJobOptionsMenuOpened(false);
                          }}
                          className="text-xs flex items-center p-2 gap-2 hover:bg-gray-200 w-full"
                        >
                          <GoBookmarkSlash />
                          <p className="">Unsave Job</p>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            saveAJob(jobDetails?._id as string);
                            setIsJobOptionsMenuOpened(false);
                          }}
                          className="text-xs flex items-center p-2 gap-2 hover:bg-gray-200 w-full"
                        >
                          <CiBookmark />
                          <p className="">Save Job</p>
                        </button>
                      </>
                    )}
                    <button className="text-xs flex items-center p-2 gap-2 hover:bg-gray-200 w-full">
                      <BiShare />
                      <p className="">Share Job</p>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <span className="bg-blue-100 border border-blue-200 px-3 text-xs flex items-center justify-center  font-semibold uppercase text-blue-700 rounded-full">
                <p className="!m-0 !p-0">{jobDetails?.jobLevel}</p>
              </span>
              <span className="bg-gray-100 border border-gray-200 px-3 text-xs flex items-center justify-center  font-semibold uppercase text-gray-500 rounded-full">
                <p>{jobDetails?.jobType}</p>
              </span>
            </div>

            <div className="border-t border-slate-100 mt-7">
              <div className="flex gap-2">
                <div className="flex-1 flex gap-10 pt-5">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Salary Range</p>
                    <p className="font-bold">
                      {jobDetails?.minSalary} - {jobDetails?.maxSalary}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Experience</p>
                    <p className="font-bold">{jobDetails?.experienceInYears}</p>
                  </div>
                </div>
                <div className="mt-5">
                  {isJobApplid ? (
                    <>
                      <button
                        disabled
                        onClick={() => goToApplyPage(jobDetails?._id as string)}
                        className="border border-slate-300 text-green-500 text-sm font-semibold px-3 py-2 rounded-md"
                      >
                        Applied on {formattedDateMoment(isJobSaved.createdAt, 'MMM DD YYYY')}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => goToApplyPage(jobDetails?._id as string)}
                        className="text-sm font-semibold text-white bg-blue-600 px-5 py-2 rounded-lg shadow-xl shadow-blue-200 transition-color duration-300 hover:bg-blue-400"
                      >
                        Apply Now
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-3">
                  {/* <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md">{jobDetails?.recruiterProfileDetails?.recruiterType}</span> */}
                  {isJobSaved ? <FaHeart title="Favorite" color="blue" /> : null}
                </div>
              </div>
              <div className="mt-1 flex items-center">
                {/* <p className="text-xs ms-5 text-gray-500">{formatRelativeTime(jobDetails?.createdAt || new Date())}</p> */}
              </div>
            </div>
          </div>

          <div className="mt-5 p-5 lg:p-10 bg-white rounded-lg border border-slate-100 shadow-[0_0_30px_2px_rgba(100,0,250,0.1)]">
            <div>
              <div className="flex gap-2 items-center">
                <LuFileText color="blue" size={18} />
                <p className="font-bold text-gray-700 tracking-wide">Job Description</p>
              </div>
              <p className="mt-3 leading-relaxed text-sm text-gray-700">
                {jobDetails?.description}
              </p>
            </div>

            <div className="mt-5">
              <div className="flex gap-2 items-center">
                <LuListChecks color="blue" size={18} />
                <p className="font-bold text-gray-700 tracking-wide">Requirements</p>
              </div>
              <ul className="mt-3 list-disc space-y-2">
                {jobDetails?.requirements.split('.').map((s: string, index: number) => (
                    <li key={index} className="ms-5 text-sm leading-relaxed text-gray-700">{s}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <div className="flex gap-2 items-center">
                <LuBriefcase color="blue" size={18} />
                <p className="font-bold text-gray-700 tracking-wide">Responsibilities</p>
              </div>
              <ul className="mt-3 list-disc space-y-2">
                {jobDetails?.responsibilities.split('.').map((s: string, index: number) => (
                    <li key={index} className="ms-5 text-sm leading-relaxed text-gray-700">{s}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <div className="flex gap-2 items-center">
                <LuGraduationCap color="blue" size={18} />
                <p className="font-bold text-gray-700 tracking-wide">Education Qualification</p>
              </div>
              <p className="mt-3 leading-relaxed text-sm text-gray-700">
                {jobDetails?.qualification}
              </p>
            </div>

            <div className="mt-5">
              <div className="flex gap-2 items-center">
                <LuShieldCheck color="blue" size={18} />
                <p className="font-bold text-gray-700 tracking-wide">Required Skills</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {jobDetails?.requiredSkills.map((s: string, index: number) => (
                    <span className="bg-gray-50 border border-slate-200 text-xs p-2 rounded-lg text-gray-700" key={index}>{s}</span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex gap-2 items-center">
                <LuShieldCheck color="blue" size={18} />
                <p className="font-bold text-gray-700 tracking-wide">Optional Skills</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {jobDetails?.optionalSkills.map((s: string, index: number) => (
                    <span className="bg-gray-50 border border-slate-200 text-xs p-2 rounded-lg text-gray-700" key={index}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 p-5 lg:p-10 bg-white border border-slate-100 rounded-lg shadow-[0_0_30px_2px_rgba(100,0,250,0.1)]">
            <p className="font-semibold text-gray-700 tracking-wide">About Recruiter</p>
            <div className="flex gap-2 items-center mt-5">
              <div>
                <div className="bg-blue-100 w-15 h-15 flex items-center rounded-full justify-center">
                  <p className="text-blue-700 font-bold text-2xl">
                    {jobDetails?.recruiterProfileDetails?.name[0]}
                  </p>
                </div>
              </div>
              <div className="flex-1 h-fit">
                <p className="font-semibold flex items-center gap-1">
                  {jobDetails?.recruiterProfileDetails?.name}
                  {jobDetails?.recruiterProfileDetails?.isVerifiedRecruiter ? (
                    <span className="flex items-center text-xs text-green-700">
                      <MdVerified />
                      <p className="!ms-1">Verified</p>
                    </span>
                  ) : (
                    <span className="flex items-center text-xs text-red-500">
                      <RiSpam2Fill />
                      <p className="!ms-1">Not verified</p>
                    </span>
                  )}
                </p>
                <p className="font-normal text-xs text-gray-500">
                  {jobDetails?.recruiterProfileDetails?.professionalTitle}
                </p>
                {/* {jobDetails?.recruiterProfileDetails?.recruiterType === 'corporate' && (
                  <div className="mt-5">
                    <p className="text-sm text-gray-700">
                      Hiring for{' '}
                      <span className="font-semibold">
                        {jobDetails.companyProfileDetails?.name}
                      </span>
                    </p>
                  </div>
                )} */}
              </div>
              
            </div>
            <div className="w-full mt-5">
                <button className="flex w-full justify-center items-center text-sm gap-2 border border-slate-300 p-3 hover:bg-gray-200 rounded-lg font-semibold">
                  <BiChat size={20} />
                  Message Recruiter
                </button>
              </div>
          </div>
          <div className="mt-5 p-5 lg:p-10 bg-blue-950 rounded-lg shadow-[0_0_30px_2px_rgba(100,0,250,0.2)]">
            <p className="font-semibold text-slate-400">Job Overview</p>
            <div className="mt-3">
                <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                        <p className="text-slate-400 text-sm">Posted</p>
                        <p className="text-white text-sm font-medium">{moment(jobDetails?.createdAt, "YYYY-MM-DD").fromNow()}</p>
                    </li>
                    <li className="flex justify-between items-center">
                        <p className="text-slate-400 text-sm">Expiration</p>
                        <p className="text-white text-sm font-medium">{moment(jobDetails?.expiresAt).format("DD MMM YYYY")}</p>
                    </li>
                    <li className="flex justify-between items-center">
                        <p className="text-slate-400 text-sm">Applicants</p>
                        <p className="bg-blue-900 px-2 rounded-md text-blue-400">{jobDetails?.applicationsCount}</p>
                    </li>
                </ul>
            </div>
          </div>
        </div>

        {isAwarnessModalOpene && (
          <AwarenessModal
            isOpen={isAwarnessModalOpene}
            onClose={closeAwarenessModal}
            jobName={jobDetails?.jobTitle as string}
          />
        )}
      </>
    );
}


function AwarenessModal({isOpen, onClose, jobName}: {isOpen: boolean, onClose: () => void, jobName: string}){
    const navigate = useNavigate()
    return(
        <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          className: 'bg-slate-900/60 backdrop-blur-sm', // Professional dimming
        },
      }}
    >
      <Fade in={isOpen}>
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md outline-none">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            
            {/* Top Accent Bar */}
            <div className="h-1.5 bg-amber-400 w-full" />

            <div className="p-8">
              {/* Icon & Title */}
              <div className="flex items-center justify-center w-14 h-14 bg-amber-50 rounded-full mb-6 mx-auto">
                <HiOutlineExclamationTriangle className="text-amber-600 text-3xl" />
              </div>

              <div className="text-center">
                <h2 className="text-xl font-bold text-slate-900 leading-tight">
                  Flagged Job
                </h2>
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                  The job <span className="font-semibold text-slate-800">The Job @{jobName}</span> is currently flagged <span className="text-blue-600"></span> Cross check all the details before applying the job program. 
                </p>
              </div>

              {/* Safety Checklist */}
              <div className="mt-8 space-y-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Safety Guidelines
                </p>

                <div className="flex gap-3 items-start">
                  <div className="mt-0.5">
                    <HiOutlineInformationCircle className="text-blue-500 text-lg" />
                  </div>
                  <p className="text-xs text-slate-600">
                    Never share your bank details, OTPs, or pay any "security deposit" for a job interview.
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="mt-0.5">
                    <HiOutlineShieldCheck className="text-green-500 text-lg" />
                  </div>
                  <p className="text-xs text-slate-600">
                    Verified recruiters will have a blue badge next to their name. Look for official company emails.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col gap-3">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-slate-900 hover:bg-black text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-slate-200"
                >
                  I Understand, Proceed
                </button>
                <button
                  onClick={() => {onClose(); navigate(-1)}}
                  className="w-full py-3 bg-white hover:bg-slate-50 text-slate-500 text-sm font-medium rounded-xl transition-all"
                >
                  Go Back
                </button>
              </div>

              <p className="mt-6 text-center text-[10px] text-slate-400 italic">
                Your safety is our priority. Report suspicious activity to our support team.
              </p>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
    )
}