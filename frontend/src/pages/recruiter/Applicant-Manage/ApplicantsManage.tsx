import React, { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { getApplicationDetails, getSingleApplicationDetails, scheduleInterview, updateCandidateNotes, updateJobApplicationStatus, verifyBeforeManageApplications } from "../../../services/recruiterServices"
// import ApplicantCard from "../../../components/recruiter/ApplicantCard"
import Swal from "sweetalert2"
import { Notify } from "notiflix"
import { LuCalendar, LuCircleX, LuFileArchive, LuFileUser, LuGraduationCap, LuMapPin, LuPhone, LuSearch, LuSend, LuSparkles, LuUser, LuUserCheck, LuUserX } from "react-icons/lu"
import { BiBriefcase, BiCalendar, BiChevronDown, BiChevronUp, BiEnvelope, BiStar } from "react-icons/bi"
import { FaRegCircleXmark } from "react-icons/fa6"
import { formattedDateMoment } from "../../../services/util/formatDate"
import { FaFile, FaUsersSlash } from "react-icons/fa"
import { Box, Button, Checkbox, FormControlLabel, MenuItem, Modal, TextField } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { Controller, useForm } from "react-hook-form"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateField } from "@mui/x-date-pickers/DateField"
import { Education, Experience, JobApplicationsListForRecruiter, SingleJobApplicationDetailsData } from "../../../types/entityTypes"
import ViewPDFDocument from "../../../components/common/PdfViewer"
import { BsArrowLeft } from "react-icons/bs"
import { toast } from "react-toastify"
import { AxiosError } from "axios"


export default function ApplicantManagePage(){
    const location = useLocation()
    const [selectedApplication, setSelectedApplication] = useState<string | null>(null)
    const [isFilterMenuOpened, setIsFilterMenuOpened] = useState(false)
    const [filter, setFilter] = useState<'all' | 'applied' | 'screening' | 'rejected' | 'hired' | 'offer' | string>('all')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
   
    console.log(setPage, setTotalPages)
    const params = useParams()
    const jobId = useMemo(() => {
        return params.jobId || location.state.jobId || {}
    }, [location.state.jobId, params.jobId])
    const [isAllowedToManageApplications, setIsAllowedToManageApplications] = useState<boolean>(true)
    // const navigator = useNavigate()

    const [isControlBarMenuOpen, setIsControlBarMenuOpen] = useState(false)

    const openControlBarMenu = (applicationId: string) => {
        setSelectedApplication(applicationId)
        setIsControlBarMenuOpen(true)
    }
    const closeControlBarMenu = () => setIsControlBarMenuOpen(false)

    // const toggleFilterMenuOpen = () => setIsFilterMenuOpened(prv => !prv)

//     type InterviewFormData = {
//   date: Dayjs | null;
//   time: Dayjs | null;
//   interviewType: string;
//   gmeetUrl: string;
//   interviewerName: string;
//   note: string;
//   sendEmail: boolean;
// };

    // type EmailContents = {
    //     to: string,
    //     subject: string,
    //     body: string
    // }
    // const [emailAttachment, setEmailAttachment] = useState(null)
    // const [emailModalOpen, setEmailModalOpen] = useState(false)
    // const {
    //     control: EmailContentsControl,
    //     formState:{errors: EmailContentsErrors},
    //     handleSubmit: handleEmailContentsSubmit,
    //     watch: EmailWatch
    // } = useForm<EmailContents>({
    //     defaultValues:{to: '', body: ''}
    // })

// const interviewTypes = [
//   "Technical",
//   "HR",
//   "Managerial",
//   "General"
// ];

//     const {
//     control,
//     handleSubmit,
//     reset,
//     formState:{errors}
//   } = useForm<InterviewFormData>({
//     defaultValues: {
//       date: null,
//       time: null,
//       interviewType: "",
//       gmeetUrl: "",
//       interviewerName: "",
//       note: "",
//       sendEmail: false
//     }
//   });


    // const [job, setJob] = useState<string>('')
    const [applications, setApplications] = useState<JobApplicationsListForRecruiter[]>([])
    
    // const [applied, setApplied] = useState<ApplicationsAggregated[]>([])
    const [applied, setApplied] = useState(0)
    const [screening, setScreening] = useState(0)
    const [interview, setInterview] = useState(0)
    const [offer, setOffer] = useState(0)
    const [hired, setHired] = useState(0)
    const [rejected, setRejected] = useState(0)

    // const [selectedCandidateForManaging, setSelectedCandidateForManaging] = useState<ApplicationsAggregated | null | undefined>(null)

    // const [shortList, setShortList] = useState<any[]>([])
    // const [apppCount, setAppCount] = useState(0)

    const [notes, setNotes] = useState<string>('')

    //function for seting notes locally
    

    const searchApplicant = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)
    }

    const updateNoteStateLocally = (e: React.ChangeEvent<HTMLInputElement>) => {
        //toast.info(e.target.value)
        setNotes(e.target.value)
        //console.log('--testing data--', e.target.value)
        // toast.success('Note updated')
    }
    
    const debounced = <T extends (...args: never[]) => void>(fn: T, delay: number) => {
        let timer: ReturnType<typeof setTimeout>
        return function(...args: Parameters<T>){
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }

    const updateCandidateNote = debounced(updateNoteStateLocally, 2000)
    const dSearch = debounced(searchApplicant, 500)

    
    const onApplicationStatusUpdate = (applicationId: string, status: string) => {
        setApplications((prv: JobApplicationsListForRecruiter[]) => {
            return prv.map((app: JobApplicationsListForRecruiter) => {
                if(app._id === applicationId){
                    return {...app, status: status}
                }else{
                    return app
                }
            })
        })
    }


    useEffect(() => {
        (async () => {
            // setLoading(true);
            try {
                const [appResult] = await Promise.all([
                    getApplicationDetails(jobId, search, page, 5, filter)
                    //getJobDetails(jobId)
                ]);

                const permissionForApplicationManageResult = await verifyBeforeManageApplications()

                if (appResult?.success) {
                    console.log('--checking inner value of data--', appResult.result)
                    setApplications(appResult.result.applications)
                    setApplied(appResult?.result?.applied)
                    setScreening(appResult?.result?.screening)
                    setInterview(appResult?.result?.interview)
                    setOffer(appResult.result?.offer)
                    setHired(appResult?.result?.hired)
                    setRejected(appResult?.result?.rejected)
                } else {
                    Notify.failure(appResult?.message || "Could not fetch applications.");
                }

                if(permissionForApplicationManageResult.success){
                    setIsAllowedToManageApplications(permissionForApplicationManageResult.result)
                }

               // if (jobResult?.success) {
                    // setJobDetails([]);
               // } else {
               //     Notify.failure(jobResult?.message || "Could not fetch job details.");
                //}
            } catch (error) {
                console.log('Checking error while fetching data --', error)
                Notify.failure("An error occurred while fetching data.");
            } finally {
                // setLoading(false);
            }
        })()
    }, [search, page, filter, jobId]) //newly added jobid
    
    useEffect(() => {
        if(selectedApplication){
            
            (async function(){
            try {
                await updateCandidateNotes(selectedApplication as string, notes)
                toast.success('Note updated')
            } catch (error: unknown) {
                console.log('-- error occured while adding note for the candidate --', error)
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout: 3000})
            }
        })()
        }
    }, [notes, selectedApplication]) //previoulsy notes only
    
    return (
        <>
        <div className="px-5 py-15 lg:px-20 py-10">
            <div>
                <button className="flex items-center gap-2 text-xs font-medium text-gray-500 px-3 py-1 rounded-md hover:bg-gray-200">
                    <BsArrowLeft />
                    <p>Back</p>
                </button>
            </div>
            <div>
                <p className="font-semibold text-xl">Manage Candidates</p>
                <p className="text-xs text-gray-500 mt-1"><span className="text-sm font-semibold text-black">Senior Accountant</span> 15 candidates applied for this role</p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                <div className="bg-white p-3 border border-slate-200 rounded-md shadow">
                    <div className="flex items-center gap-2">
                        <LuFileArchive color="blue" />
                        <p className="text-xl">{applied}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Applied</p>
                    </div>
                </div>

                <div className="bg-white p-3 border border-slate-200 rounded-md shadow">
                    <div className="flex items-center gap-2">
                        <LuPhone  color="blue"/>
                        <p className="text-xl">{screening}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Screening</p>
                    </div>
                </div>

                <div className="bg-white p-3 border border-slate-200 rounded-md shadow">
                    <div className="flex items-center gap-2">
                        <LuCalendar color="blue" />
                        <p className="text-xl">{interview}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Interview</p>
                    </div>
                </div>

                <div className="bg-white p-3 border border-slate-200 rounded-md shadow">
                    <div className="flex items-center gap-2">
                        <LuSend color="blue" />
                        <p className="text-xl">{offer}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Offer</p>
                    </div>
                </div>

                <div className="bg-white p-3 border border-slate-200 rounded-md shadow">
                    <div className="flex items-center gap-2">
                        <LuUserCheck color="blue" />
                        <p className="text-xl">{hired}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Hired</p>
                    </div>
                </div>

                <div className="bg-white p-3 border border-slate-200 rounded-md shadow">
                    <div className="flex items-center gap-2">
                        <LuUserX color="blue" />
                        <p className="text-xl">{rejected}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Rejected</p>
                    </div>
                </div>
            </div>

            <div className="mt-5 bg-white border border-slate-200 rounded-md p-2 grid grid-cols-12 gap-2">
                <div className="col-span-12 lg:col-span-6 bg-gray-100 p-2 rounded flex items-center gap-2">
                    <LuSearch color="gray" />
                    <input onChange={(e) => dSearch(e)} className="w-full !text-xs" type="text" placeholder="Search name, email" />
                </div>
                <div className="col-span-12 lg:col-span-3 relative">
                    <div className="flex items-center justify-between w-full bg-gray-100 rounded-md p-2">
                        <p className="text-xs font-medium">{filter}</p>
                        {isFilterMenuOpened
                            ? <button onClick={() => setIsFilterMenuOpened(false)}><BiChevronUp size={20} /></button>
                            : <button onClick={() => setIsFilterMenuOpened(true)}><BiChevronDown size={20} /></button>
                        }
                    </div>
                    {isFilterMenuOpened && (
                        <div className="absolute border w-full border border-slate-200 rounded-md bg-white">
                            {Array.from(['all', 'applied', 'screening', 'interview', 'offer', 'hired', 'rejected']).map((item, index) => (
                                <button key={index} onClick={() => {setFilter(item); setIsFilterMenuOpened(false)}} className="w-full text-xs font-medium p-2 hover:bg-gray-100">{item}</button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="col-span-12 lg:col-span-3">
                    <button disabled className="flex w-full justify-center p-2 border border-slate-300 rounded-md hover:bg-blue-100 items-center gap-2 text-xs font-medium">
                        <LuSparkles color="blue" size={18} />
                        <p className="text-indigo-500">Smart Filter</p>
                    </button>
                </div>
            </div>

            <div className="mt-5">
                {applications && applications.length > 0 
                    ? <>
                        <div className="grid grid-cols-1 gap-3">
                            {applications.map((application: JobApplicationsListForRecruiter) => (
                                <div onClick={() => openControlBarMenu(application._id as string)} key={application._id} className="bg-white p-5 cursor-pointer hover:ring-1 hover:ring-blue-500 hover:shadow rounded-md border border-slate-200 flex gap-3">
                                    <div>
                                        <div className="bg-gradient-to-br from-blue-400 to-indigo-500 w-12 h-12 rounded-full flex items-center justify-center">
                                            <LuFileUser color="white" size={22} />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{application.candidateDetails?.name}</p>
                                        <p className="text-sm text-gray-500">{application.candidateDetails?.headline}</p>
                                        <div className="flex flex-col md:flex-row mt-3 gap-2">
                                            <span className="flex items-center gap-1">
                                                <BiEnvelope size={12} color="gray" />
                                                <p className="text-xs text-gray-500">{application.candidateDetails?.email}</p>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <LuMapPin size={12} color="gray" />
                                                <p className="text-xs text-gray-500">{application.candidateDetails?.location}</p>
                                            </span>
                                        </div>
                                        <span className="!mt-5 flex items-center gap-2 block">
                                            <LuCalendar size={13} color="gray" />
                                            <p className="text-xs text-gray-500">Applied on {formattedDateMoment(application.createdAt as string, "MMM DD YYYY")}</p>
                                        </span>
                                    </div>
                                    <div>
                                        <StatusPhills status={application.status as string} />
                                        <p className="flex items-center gap-1 text-xs mt-2">
                                            <BiStar size={16} />
                                            {application.candidateDetails?.match} % Match
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-xs text-gray-700">Showing page {page} of {totalPages} pages</p>
                            <div className="space-x-2">
                                <button className="bg-white border border-slate-300 px-3 py-2 text-xs rounded-md" disabled={page === 1}>Prev</button>
                                <button className="bg-blue-500 px-3 py-2 text-xs text-white rounded-md" disabled={page >= totalPages}>Next</button>
                            </div>
                        </div>
                      </>
                    : <>
                        <div className="flex flex-col items-center">
                            <FaUsersSlash size={40} color="gray" />
                            <p className="text-xs text-gray-500 mt-3">No Applications Received</p>
                        </div>
                      </>
                }
            </div>
        </div>
        {isControlBarMenuOpen && (
            <ControlBarModal open={isControlBarMenuOpen} applicationId={selectedApplication as string} onClose={closeControlBarMenu} onApplicationStatusUpdate={(id: string, status: string) => onApplicationStatusUpdate(id, status)} updateCandidateNote={(e) => updateCandidateNote(e)} />
        )}

        {!isAllowedToManageApplications && (
            <CanNotProceedModal open={!isAllowedToManageApplications} />
        )}
        
        </>
    )
}

export function StatusPhills({status}: {status: string}){
  switch (status) {
    case 'applied':
      return <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-0.5 rounded-full">Applied</span>;
    case 'screening':
      return <span className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-0.5 rounded-full">Screening</span>;
    case 'interview':
      return <span className="bg-orange-100 text-orange-700 text-xs font-medium px-3 py-0.5 rounded-full">Interview</span>;
    case 'offer':
      return <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-0.5 rounded-full">Offer</span>;
    case 'hired':
      return <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-0.5 rounded-full">Hired</span>;
    case 'rejected':
      return <span className="bg-red-100 text-red-700 text-xs font-medium px-3 py-0.5 rounded-full">Rejected</span>;
    default:
      return <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-0.5 rounded-full">{status || 'Unknown'}</span>;
  }
}

export function ControlBarModal({open, applicationId, onClose, onApplicationStatusUpdate, updateCandidateNote}: {open: boolean, applicationId: string, onClose: () => void, onApplicationStatusUpdate: (id: string, status: string) => void, updateCandidateNote: (e: React.ChangeEvent<HTMLInputElement>) => void}){
    
    type InterviewFormData = {
  date: Dayjs | null;
  time: Dayjs | null;
  interviewType: string;
  gmeetUrl: string;
  interviewerName: string;
  note: string;
  sendEmail: boolean;
};

const interviewTypes = [
  "Technical",
  "HR",
  "Managerial",
  "General"
];

    const [isEmailModalOpen, setEmailModalOpen] = useState<boolean>(false)
    console.log(isEmailModalOpen)
    const [isStatusMenuOpened, setIsStatusMenuOpened] = useState(false)
    const [applicationDetails, setApplicationDetails] = useState<SingleJobApplicationDetailsData | null>(null)
    // const [loading, setLoading] = useState(false)
    const [pdfViewerOpened, SetPdfViewerOpen] = useState(false)
    const [scheduleInterviewModalOpen, setScheduleInterviewModalOpen] = useState(false)

    // const openInterviewScheduleModal = () => setScheduleInterviewModalOpen(true)
    // const closeInterviewScheduleModal = () => setScheduleInterviewModalOpen(false)

    const {
    control,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm<InterviewFormData>({
    defaultValues: {
      date: null,
      time: null,
      interviewType: "",
      gmeetUrl: "",
      interviewerName: "",
      note: "",
      sendEmail: false
    }
  });

  const onSubmit = async (data: InterviewFormData) => {
    console.log("Form Data:", {
      ...data,
      date: dayjs(data.date).format("DD-MM-YYYY")
    //   time: data.time instanceof Dayjs ? data.time?.format("HH:mm") : '02:22'
    });
    reset();
    setScheduleInterviewModalOpen(false)

    try {
        const result = await scheduleInterview(
            applicationDetails?.candidateDetails?._id as string,
            applicationDetails?.jobDetails?._id as string,
            data.interviewType, data.interviewerName,
            dayjs(data.date).format("YYYY-MM-DD"),
            data.interviewerName, data.gmeetUrl,
            data.note
        )

        if(result.success){
            toast.success('Interview Scheduled')
        }
    } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
    }
  };

    const navigate = useNavigate()

    const navigateToUserPublicProfile = (userId: string) => {
        if(!userId) return
        navigate(`/users/${userId}`, {state:{userId: userId}})
    }

    const updateACandidateApplicationStatus = async (applicationId: string, status: string, name: string, email: string, jobTitle: string) => {
        if(!applicationId) return
        const result = await Swal.fire({
            icon: 'question',
            title: `Update status to ${status}`,
            showConfirmButton: true,
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen:() => {
                const container = Swal.getContainer()
                if(container){
                    container.style.zIndex = '999999'
                }
            }
        })

        if(!result.isConfirmed) return
        try {
            const result = await toast.promise(
                updateJobApplicationStatus(applicationId, status, name, email, jobTitle),
                {
                    pending: 'Updating...',
                    success: 'Updated',
                    error:{
                        render(props) {
                            const data = props.data as AxiosError<{message: string}>
                            return data.message
                        },
                    }
                }
            )

            if(result?.success){
                setApplicationDetails((prv: SingleJobApplicationDetailsData | null) => {
                if(!prv) return null
                return {
                    ...prv,
                    status: result.result?.status || status
                }
            })
            onApplicationStatusUpdate(applicationId, status)
            }else{
                toast.warn('Can not update status now')
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
    }

    useEffect(() => {
        async function fetchSingleApplicationDetails(){
            // setLoading(true)
            try {
                const result = await getSingleApplicationDetails(applicationId)
                if(result.success){
                    toast.success('Application details loaded')
                    setApplicationDetails(result.result)
                }

            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Something went wrong')
            } finally {
                // setLoading(false)
            }
        }

        if(applicationId){
            fetchSingleApplicationDetails()
        }
    }, [applicationId])
    
    
    // const toggleStatusMenu = () => setIsStatusMenuOpened(prv => !prv)

    return(
        <>
            <Modal className="flex flex-col items-end" open={open} onClose={onClose}>
                <div className="bg-white min-h-screen overflow-y-auto w-100 p-5">
                    <div className="header flex justify-between items-center">
                        <p className="font-semibold text-md">Applicant Details</p>
                        <button onClick={onClose} className="hover:bg-gray-100"><LuCircleX size={20} /></button>
                    </div>
                    {applicationDetails && (
                    <div className="body mt-5">
                        <div className="flex gap-2">
                            <div className="w-13 h-13 bg-blue-500 text-white flex items-center justify-center rounded-full">
                                <LuUser color="white" size={25} />
                            </div>
                            <div>
                                <p className="font-medium text-sm">{applicationDetails.candidateDetails?.name}</p>
                                <p className="text-xs text-gray-500">{applicationDetails.candidateDetails?.headline}</p>
                            </div>
                        </div>
                        <div className="div mt-5">
                            <p className="text-xs text-gray-700">Application Status</p>
                            <div className="relative">
                                <div className="flex items-center justify-between bg-blue-200 px-2 py-2 rounded-md border border-blue-400 mt-1">
                                    <p className="text-xs font-medium">{applicationDetails.status}</p>
                                    {isStatusMenuOpened
                                        ? <button onClick={() => setIsStatusMenuOpened(false)}><BiChevronUp size={20} /></button>
                                        : <button onClick={() => setIsStatusMenuOpened(true)}><BiChevronDown size={20} /></button>
                                    }
                                </div>
                                {isStatusMenuOpened && (
                                    <div className="bg-white w-full rounded-md border border-slate-200 shadow">
                                        {/* {Array.from(["applied", "screening", "interview", "offer", "hired", "rejected"]).map((status, index) => (
                                            <button className="w-full py-2 hover:bg-blue-100 text-xs font-medium text-gray-700">{status}</button>
                                        ))} */}
                                        {applicationDetails.status === 'applied' && (
                                            <button onClick={() => {updateACandidateApplicationStatus(applicationDetails._id as string, 'applied', applicationDetails.candidateDetails?.name as string, applicationDetails.candidateDetails?.email as string, ''); setIsStatusMenuOpened(false) }} className="w-full py-2 hover:bg-blue-100 text-xs font-medium text-gray-700">applied</button>
                                        )}
                                        {(applicationDetails.status === 'applied' ||
                                            applicationDetails.status === 'screening'
                                        ) && (<button onClick={() => {updateACandidateApplicationStatus(applicationDetails._id as string, 'screening', applicationDetails.candidateDetails?.name as string, applicationDetails.candidateDetails?.email as string, ''); setIsStatusMenuOpened(false) }} className="w-full py-2 hover:bg-blue-100 text-xs font-medium text-gray-700">screening</button>)}
                                        {(applicationDetails.status === 'applied' ||
                                            applicationDetails.status === 'screening' ||
                                            applicationDetails.status === 'interview'
                                        ) && (<button onClick={() => {updateACandidateApplicationStatus(applicationDetails._id as string, 'interview', applicationDetails.candidateDetails?.name as string, applicationDetails.candidateDetails?.email as string, ''); setIsStatusMenuOpened(false) }} className="w-full py-2 hover:bg-blue-100 text-xs font-medium text-gray-700">interview</button>)}
                                        {(applicationDetails.status === 'applied' ||
                                            applicationDetails.status === 'screening' ||
                                            applicationDetails.status === 'interview' || 
                                            applicationDetails.status === 'offer'
                                        ) && (<button onClick={() => {updateACandidateApplicationStatus(applicationDetails._id as string, 'offer', applicationDetails.candidateDetails?.name as string, applicationDetails.candidateDetails?.email as string, ''); setIsStatusMenuOpened(false) }} className="w-full py-2 hover:bg-blue-100 text-xs font-medium text-gray-700">offer</button>)}
                                        {(applicationDetails.status === 'applied' ||
                                            applicationDetails.status === 'screening' ||
                                            applicationDetails.status === 'interview' || 
                                            applicationDetails.status === 'offer' || 
                                            applicationDetails.status === 'hired'
                                        ) && (<button onClick={() => {updateACandidateApplicationStatus(applicationDetails._id as string, 'hired', applicationDetails.candidateDetails?.name as string, applicationDetails.candidateDetails?.email as string, ''); setIsStatusMenuOpened(false) }} className="w-full py-2 hover:bg-blue-100 text-xs font-medium text-gray-700">hired</button>)}
                                        {(applicationDetails.status === 'applied' ||
                                            applicationDetails.status === 'screening' ||
                                            applicationDetails.status === 'interview' || 
                                            applicationDetails.status === 'offer' || 
                                            applicationDetails.status === 'rejected'
                                        ) && (<button onClick={() => {updateACandidateApplicationStatus(applicationDetails._id as string, 'rejected', applicationDetails.candidateDetails?.name as string, applicationDetails.candidateDetails?.email as string, ''); setIsStatusMenuOpened(false) }} className="w-full py-2 hover:bg-blue-100 text-xs font-medium text-gray-700">hired</button>)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-5 bg-orange-100 p-5 rounded-md ring-1 ring-orange-500">
                            <div className="flex justify-between items-center text-xs font-medium w-full">
                                <p>Profile Match</p>
                                <p>86%</p>
                            </div>
                            <div className="border border-slate-200 rounded-md w-full h-3 mt-1 bg-white">
                                <div className="h-full bg-orange-500 rounded-md w-[86%]"></div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="text-sm font-semibold">Contact Information</p>
                            <div className="mt-1 space-y-2">
                                <div className="border border-slate-200 rounded-md flex gap-2 p-3">
                                    <div><BiEnvelope size={20} color="gray" /></div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email</p>
                                        <p className="text-xs">{applicationDetails.candidateDetails?.email}</p>
                                    </div>
                                </div>
                                <div className="border border-slate-200 rounded-md flex gap-2 p-3">
                                    <div><LuPhone size={20} color="gray" /></div>
                                    <div>
                                        <p className="text-xs text-gray-500">Phone</p>
                                        <p className="text-xs">{applicationDetails.candidateDetails?.phone}</p>
                                    </div>
                                </div>
                                <div className="border border-slate-200 rounded-md flex gap-2 p-3">
                                    <div><LuMapPin size={20} color="gray" /></div>
                                    <div>
                                        <p className="text-xs text-gray-500">Location</p>
                                        <p className="text-xs">{applicationDetails.candidateDetails?.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="text-sm font-semibold">Professional Informations</p>
                            <p className="text-xs uppercase text-gray-600">experience</p>
                            <div className="mt-1 space-y-2">
                                {applicationDetails.experiences && applicationDetails.experiences.length > 0 && (
                                    applicationDetails.experiences.map((experience: Experience) => (
                                        <div key={experience._id} className="border border-slate-200 rounded-md flex gap-2 p-3">
                                    <div><BiBriefcase size={20} color="gray" /></div>
                                    <div>
                                        <p className="text-xs">{experience.jobRole}</p>
                                        <p className="text-xs text-gray-500">{experience.organization}</p>
                                        <p className="text-xs font-semibold mt-1">2 Years</p>
                                    </div>
                                </div>
                                    ))
                                )}
                                {applicationDetails.experiences?.length === 0 && (
                                    <p className="text-xs text-gray-500 text-center">No Experience Added</p>
                                )}
                            </div>
                        </div>

                         <div className="mt-5">
                            <p className="text-xs uppercase text-gray-600">education</p>
                            <div className="mt-1 space-y-2">
                                {applicationDetails.educations && applicationDetails.educations.length > 0 && (
                                    applicationDetails.educations.map((education: Education) => (
                                        <div key={education._id} className="border border-slate-200 rounded-md flex gap-2 p-3">
                                    <div><LuGraduationCap size={20} color="gray" /></div>
                                    <div>
                                        <p className="text-xs">{education.educationStream}</p>
                                        <p className="text-xs text-gray-500">{education.institution}</p>
                                    </div>
                                </div>
                                    ))
                                )}
                                {applicationDetails.educations?.length === 0 && (
                                    <p className="text-xs text-gray-500 text-center">No Education Added</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="text-xs uppercase text-gray-600">skills</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {applicationDetails.skills && applicationDetails.skills.length > 0 && (
                                    applicationDetails.skills.map((skill) => (
                                    <span key={skill._id} className="text-xs px-3 bg-blue-200 text-blue-700 rounded-md">{skill.skill}</span>
                                ))
                                )}
                                
                            </div> 
                            {applicationDetails.skills?.length === 0 && (
                                    <p className="text-xs text-center text-gray-500">No Skills added</p>
                                )}
                        </div>

                        <div className="mt-5">
                     <p className="font-light">Notes</p>
                     <textarea value={applicationDetails.notes} onChange={(e) => updateCandidateNote(e)} placeholder="Write notes about this candidate" className="text-xs mt-2  p-3 border border-gray-300 rounded-md w-full outline-none" rows={5} ></textarea>
                 </div>
                 <div className="mt-5 space-y-2">
                     <div onClick={() => setScheduleInterviewModalOpen(true)} className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-xs justify-center bg-blue-500 text-white"><BiCalendar /> Schedule Interview</div>
                     <button onClick={() => setEmailModalOpen(true)} className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-xs justify-center border border-gray-300"><BiEnvelope /> Send Email</button>
                     <div onClick={() => SetPdfViewerOpen(true)} className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-xs justify-center border border-gray-300"><FaFile /> View Resume</div>
                     <div onClick={() => navigateToUserPublicProfile(applicationDetails.candidateDetails?._id as string)} className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-xs justify-center border border-gray-300"><LuUser /> Inspect Profile</div>
                 </div>
                    </div>
                    )}
                    {!applicationDetails && (
                        <p className="text-center text-xs text-gray">No Application details found</p>
                    )}
                 {/**This is body ending */}
                </div>
            </Modal>

            {
        pdfViewerOpened && (
            <Modal className="flex flex-col items-center justify-center" open={pdfViewerOpened} onClose={() => SetPdfViewerOpen(false)}>
                <div className="bg-white p-5 overflow-y-scroll max-h-lg w-2xl rounded-md shadow-lg">
                    <div className="header flex justify-end">
                        <button onClick={() => SetPdfViewerOpen(false)}><FaRegCircleXmark /></button>
                    </div>
                    <ViewPDFDocument fileUrl={applicationDetails?.resumeDetails?.url as string} />
                </div>
            </Modal>
        )
      }

      {
        scheduleInterviewModalOpen && (
            <Modal 
  open={scheduleInterviewModalOpen} 
  onClose={() => setScheduleInterviewModalOpen(false)}
  className="flex items-center justify-center"
>
  <div className="bg-white rounded-xl shadow-2xl w-[450px] overflow-hidden outline-none">
    
    {/* Header */}
    <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
      <h2 className="text-lg font-bold text-gray-800">Schedule Interview</h2>
      <button 
        onClick={() => setScheduleInterviewModalOpen(false)}
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        <FaRegCircleXmark size={20} />
      </button>
    </div>

    {/* Candidate Info - Soft & Professional */}
    <div className="mx-6 mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-3">
      <div className="bg-blue-600 w-10 h-10 flex items-center justify-center text-white font-bold rounded-full shadow-sm">
        {applicationDetails?.candidateDetails?.name?.charAt(0) || 'U'}
      </div>
      <div>
        <p className="text-sm font-bold text-blue-900 leading-tight">
          {applicationDetails?.candidateDetails?.name || "Candidate Name"}
        </p>
        <p className="text-xs text-blue-700 font-medium">
          {applicationDetails?.candidateDetails?.headline || "Headline/Role"}
        </p>
      </div>
    </div>

    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 flex flex-col gap-4"
    >
      {/* Date */}
      <Controller
        name="date"
        control={control}
        rules={{ required: "Date is required" }}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Interview Date"
              {...field}
              fullWidth
              size="small"
              error={Boolean(errors.date)}
              helperText={errors.date?.message}
            />
          </LocalizationProvider>
        )}
      />

      {/* Time */}
      <Controller
        name="time"
        control={control}
        rules={{ required: "Time is required" }}
        render={({ field }) => (
          <TextField
            label="Interview Time"
            type="time"
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
            {...field}
            error={Boolean(errors.time)}
            helperText={errors.time?.message}
          />
        )}
      />

      {/* Interview Type */}
      <Controller
        name="interviewType"
        control={control}
        rules={{ required: "Interview type is required" }}
        render={({ field }) => (
          <TextField 
            select 
            label="Interview Type" 
            fullWidth 
            size="small"
            {...field} 
            error={Boolean(errors.interviewType)} 
            helperText={errors.interviewType?.message}
          >
            {interviewTypes.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Google Meet URL */}
      <Controller
        name="gmeetUrl"
        control={control}
        rules={{ required: "Google Meet URL is required" }}
        render={({ field }) => (
          <TextField
            label="Google Meet URL"
            placeholder="https://meet.google.com/..."
            fullWidth
            size="small"
            {...field}
            error={Boolean(errors.gmeetUrl)}
            helperText={errors.gmeetUrl?.message}
          />
        )}
      />

      {/* Interviewer Name */}
      <Controller
        name="interviewerName"
        control={control}
        rules={{ required: "Interviewer name is required" }}
        render={({ field }) => (
          <TextField
            label="Interviewer Name"
            fullWidth
            size="small"
            {...field}
            error={Boolean(errors.interviewerName)}
            helperText={errors.interviewerName?.message}
          />
        )}
      />

      {/* Note */}
      <Controller
        name="note"
        control={control}
        render={({ field }) => (
          <TextField
            label="Note"
            multiline
            rows={3}
            fullWidth
            size="small"
            {...field}
          />
        )}
      />

      {/* Checkbox */}
      <Controller
        name="sendEmail"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            className="text-gray-600"
            control={<Checkbox {...field} checked={field.value} size="small" />}
            label={<span className="text-sm">Send email invitation</span>}
          />
        )}
      />

      {/* Submit Button */}
      <Button 
        variant="contained" 
        type="submit" 
        fullWidth 
        className="bg-blue-600 hover:bg-blue-700 py-2.5 rounded-lg font-bold capitalize shadow-none"
      >
        Schedule Now
      </Button>
    </Box>
  </div>
</Modal>
        )
      }
        </>
    )
}


export const CanNotProceedModal = ({open}: {open: boolean}) => {
    const navigate = useNavigate()

    const navigateToDashboard = () => {
        return navigate('/profile/recruiter/overview')
    }

    return(
        <>
            <Modal className="backdrop-blur-md flex flex-col items-center justify-center" open={open}>
                <div className="bg-white p-5 lg:p-10 rounded-lg w-md max-w-[90%] shadow-xl">
                    <p className="font-semibold text-lg tracking-wide text-gray-900">Permission Denied</p>
                    <p className="text-sm font-medium  text-gray-700 mt-1">Your are not allowed to manage applications</p>
                    <div className="my-5 p-3 border-2 border-dashed border-slate-300 rounded-lg">
                        <p className="text-xs leading-relaxed text-gray-600">Your account permissions are updated by the admin. Currently you are not allowed to manage applications</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button onClick={navigateToDashboard} className="bg-blue-600  text-white  shadow-[0_0_30px_2px_rgba(100,0,250,0.2)] transition-color duration-300 hover:bg-blue-700 w-full p-3 text-sm font-semibold rounded-lg">Understood</button>
                        <button disabled={true} className="border border-slate-400 text-slate-700 transition-color duration-300 hover:bg-slate-300 disabled:bg-gray-300 disabled:text-gray-400 disabled:shadow-none hover:shadow-xl w-full p-3 text-sm font-semibold rounded-lg">Help</button>
                    </div>           
                </div>
            </Modal>
        </>
    )
}