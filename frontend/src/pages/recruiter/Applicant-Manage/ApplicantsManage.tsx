import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import defaultProfile from '../../../../public/default-img-instagram.png'
import { finalizeShortList, getApplicationDetails, rejectJobApplication, scheduleInterview, updateCandidateNotes, updateJobApplicationStatus } from "../../../services/recruiterServices"
import ApplicantCard from "../../../components/recruiter/ApplicantCard"
import Swal from "sweetalert2"
import Loader from "../../../components/candidate/Loader"
import { Notify } from "notiflix"
import { LuMessageCircle, LuPhone, LuUser, LuUsers } from "react-icons/lu"
import { BiCalendar, BiEnvelope, BiSend, BiTrash } from "react-icons/bi"
import { FaRegCircleXmark, FaXmark } from "react-icons/fa6"
import { CiCircleCheck } from "react-icons/ci"
import formatDate from "../../../services/util/formatDate"
import { PiSuitcase } from "react-icons/pi"
import { FaFile, FaGraduationCap } from "react-icons/fa"
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, MenuItem, Modal, TextField } from "@mui/material"
import { IoCall, IoCloseCircle, IoLocation } from "react-icons/io5"
import dayjs, { Dayjs } from "dayjs"
import { Controller, useForm } from "react-hook-form"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { DateField } from "@mui/x-date-pickers/DateField"
import { ApplicationsAggregated, Education, Experience, Skills } from "../../../types/entityTypes"
import ViewPDFDocument from "../../../components/common/PdfViewer"
import { HiPaperClip } from "react-icons/hi2"

interface Application {
    _id: string;
    applicantDetails: {
        _id: string;
        name: string;
        headline: string;
        profilePicture: { cloudinarySecureUrl: string };
    };
    // Add other application properties as needed
}


export default function ApplicantManagePage(){
    const location = useLocation()
    const [selectedCards, setSelectedCards] = useState<any[]>([])
    const [selectionMode, setSelectionMode] = useState(false)
    const [loading, setLoading] = useState(false);
    const [jobDetails, setJobDetails] = useState<any>(null);
    const params : any = useParams()
    const jobId = params.jobId || location.state.jobId || {}
    const [controlBarOpen, setControlBarOpen] = useState<Boolean>(false)
    const [scheduleInterviewModalOpen, setScheduleInterviewModalOpen] = useState<boolean>(false)
    const navigator = useNavigate()
    const [pdfViewerOpened, SetPdfViewerOpen] = useState(false)


    type InterviewFormData = {
  date: Dayjs | null;
  time: Dayjs | null;
  interviewType: string;
  gmeetUrl: string;
  interviewerName: string;
  note: string;
  sendEmail: boolean;
};

    type EmailContents = {
        to: string,
        subject: string,
        body: string
    }
    const [emailAttachment, setEmailAttachment] = useState(null)
    const [emailModalOpen, setEmailModalOpen] = useState(false)
    const {
        control: EmailContentsControl,
        formState:{errors: EmailContentsErrors},
        handleSubmit: handleEmailContentsSubmit,
        watch: EmailWatch
    } = useForm<EmailContents>({
        defaultValues:{to: '', body: ''}
    })

const interviewTypes = [
  "Technical",
  "HR",
  "Managerial",
  "General"
];

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
    Notify.info('called', {timeout:2000})
    console.log("Form Data:", {
      ...data,
      date: dayjs(data.date).format("DD-MM-YYYY")
    //   time: data.time instanceof Dayjs ? data.time?.format("HH:mm") : '02:22'
    });
    reset();
    setScheduleInterviewModalOpen(false)

    try {
        const result = await scheduleInterview(
            '', '', 
            data.interviewType, data.interviewerName,
            dayjs(data.date).format("DD-MM-YYYY"),
            data.interviewerName, data.gmeetUrl,
            data.note
        )

        if(result.success){
            Notify.success('Interview Scheduled', {timeout:2000})
        }
    } catch (error: unknown) {
        
    }
  };

    function rejectIndividualCandidate(candidateId : string, applicationId : string){
        Swal.fire({
            title: 'Reject Candidate',
            html: ` 
      <label class="text-sm">Reason</label>
      <select id="reasonSelect" class="">
        <option value="">-- Select reason --</option>
        <option value="Does not meet basic qualification">Does not meet basic qualification</option>
        <option value="Insufficient experience">Insufficient experience</option>
        <option value="Skill mismatch">Skill mismatch</option>
        <option value="Education criteria not met">Education criteria not met</option>
      
        </select>
      <textarea id="rejectionMessage" class="w-full swal2-textarea" placeholder="Write rejection message"></textarea>
    `,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                const reason = (document.getElementById('reasonSelect') as HTMLSelectElement).value;
                const message = (document.getElementById('rejectionMessage') as HTMLTextAreaElement).value;

                if (!reason) {
                    Swal.showValidationMessage('Please select a reason');
                }
                return { reason, message };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { reason, message } = result.value as { reason: string; message: string };

                rejectJobApplication(candidateId, applicationId, reason, message)
                    .then((res) => {
                        if (!res?.success) return Notify.failure(res?.message);
                        Swal.fire({
                            icon:'success',
                            title:'Rejected',
                            text:'Application rejected successfully',
                            showConfirmButton:false,
                            showCancelButton:false,
                            timer:1500
                        });
                        setApplications(prev => prev.filter(app => app._id !== applicationId));
                    })
                
            }
        });
    }

    const toggleCardSelection = (id : string) => { //toggle individual cards
        if(selectedCards.includes(id)){
            setSelectedCards(prev => prev.filter(x => x !== id))
        }else{
            setSelectedCards(prev => [...prev, id])
        }
    }

    const handleShortlistSingle = (id : string) => {
        const foundedApplication = applications.find((app) => app._id === id);

        setShortList((prev) => {
            if (prev.some((p) => p._id === id)) return prev;
            return [...prev, foundedApplication];
        })

        setApplications((prev) => {
            return prev.filter((app) => app._id !== id)
        })

    }

    const handleRemoveFromShortList = (id : string) => {
        const foundApplication = shortList.find((app) => app._id === id);

        setApplications((prev) => [...prev, foundApplication])
        setShortList((prev) => prev.filter((app) => app._id !== id))
    }

    const handleShortlistAll = () => {
        if (selectedCards.length === 0) return Notify.info('Please select candidates to shortlist.');
        const allSelectedApplications = applications.filter((item) => selectedCards.includes(item._id))
        setShortList(allSelectedApplications);

        setApplications(prev => prev.filter(app => !selectedCards.includes(app._id)));
    }

    const selectFromOption = (id : string) => {
        setSelectionMode(true)
        setSelectedCards([id])
    }

    const selectAllCard = () => {
        setSelectionMode(true)
        setSelectedCards(applications.map((application : any) => application?._id))
    }

    const unselectAllCard = () => {
        setSelectionMode(false)
        setSelectedCards([])
    }

    //reusable code for filtering applications
    const filterApplications = (
        applications: ApplicationsAggregated[],
        status: 'applied' | 'screening' | 'interview' | 'rejected' | 'hired' | 'offer'
    ) => {
        const filteredApplications = applications.filter((application: ApplicationsAggregated) => application.status === status)
        return filteredApplications
    }

    const [job, setJob] = useState<string>('')
    const [applications, setApplications] = useState<ApplicationsAggregated[]>([])
    
    // const [applied, setApplied] = useState<ApplicationsAggregated[]>([])
    const [applied, setApplied] = useState<ApplicationsAggregated[]>([])
    const [screening, setScreening] = useState<ApplicationsAggregated[]>([])
    const [interview, setInterview] = useState<ApplicationsAggregated[]>([])
    const [offer, setOffer] = useState<ApplicationsAggregated[]>([])
    const [hired, setHired] = useState<ApplicationsAggregated[]>([])
    const [rejected, setRejected] = useState<ApplicationsAggregated[]>([])

    const [selectedCandidateForManaging, setSelectedCandidateForManaging] = useState<ApplicationsAggregated | null | undefined>(null)

    const [shortList, setShortList] = useState<any[]>([])
    const [apppCount, setAppCount] = useState(0)

    const [notes, setNotes] = useState<string>('')

    //function for seting notes locally
    const updateNoteStateLocally = (e: any) => {
        setNotes(e.target.value)
        //console.log('--testing data--', e.target.value)
        Notify.info(`Update note ${notes}`)
    }

    const debounced = (fn: Function, delay: number) => {
        let timer: any
        return function(...args: any){
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }

    const updateCandidateNote = debounced(updateNoteStateLocally, 2000)

    const selectOneFromApplied = (id: string) => {
        const candidate = applied.find((app: ApplicationsAggregated) => {
            if(app._id === id){
                return app
            }
        })
        //seting selected candidate
        setSelectedCandidateForManaging(candidate)
        setControlBarOpen(true)
    }

    const selectOneFromScreening = (id: string) => {
        const candidate = screening.find((app: ApplicationsAggregated) => {
            if(app._id === id){
                return app
            }
        })
        //seting selected candidate
        setSelectedCandidateForManaging(candidate)
        setControlBarOpen(true)
    }

    const selectOneFromInterview = (id: string) => {
        const candidate = interview.find((app: ApplicationsAggregated) => {
            if(app._id === id){
                return app
            }
        })
        //seting selected candidate
        setSelectedCandidateForManaging(candidate)
        setControlBarOpen(true)
    }

    const selectOneFromOffer = (id: string) => {
        const candidate = offer.find((app: ApplicationsAggregated) => {
            if(app._id === id){
                return app
            }
        })
        //seting selected candidate
        setSelectedCandidateForManaging(candidate)
        setControlBarOpen(true)
    }

    const selectOneFromHired = (id: string) => {
        const candidate = hired.find((app: ApplicationsAggregated) => {
            if(app._id === id){
                return app
            }
        })
        //seting selected candidate
        setSelectedCandidateForManaging(candidate)
        setControlBarOpen(true)
    }

    const selectOneFromRejected = (id: string) => {
        const candidate = rejected.find((app: ApplicationsAggregated) => {
            if(app._id === id){
                return app
            }
        })
        //seting selected candidate
        setSelectedCandidateForManaging(candidate)
        setControlBarOpen(true)
    }

    const navigateToUserPublicProfile = (userId: string) => {
        navigator(`/users/${userId}`, {state:{userId: userId}})
    }

    const updateStatus = async (e: any) => {
        const existingStatus = selectedCandidateForManaging?.status
        const status = e.target.value
        Notify.info(`Checking new Status ${status}`, {timeout:2000})
        try {
            const result = await updateJobApplicationStatus(
                selectedCandidateForManaging?._id as string, status,
                selectedCandidateForManaging?.applicant.name as string, selectedCandidateForManaging?.applicant.email as string,
                job
            )
            Notify.success(result?.message, {timeout:2000})
            setSelectedCandidateForManaging((prv: ApplicationsAggregated | null | undefined) => {
                if(!prv) return null

                return {
                    ...prv,
                    status:status
                }
            })

            //update status based arrays to add selected application  status based array
            switch(status){
                case 'applied' :
                    setApplied((prv: ApplicationsAggregated[]) => {
                        return [...prv, selectedCandidateForManaging as ApplicationsAggregated]
                    })
                    break
                case 'screening' :
                    setScreening((prv: ApplicationsAggregated[]) => {
                        return [...prv, {...selectedCandidateForManaging, status:status} as ApplicationsAggregated]
                    })
                    break
                case 'interview' :
                    setInterview((prv: ApplicationsAggregated[]) => {
                        return [...prv, {...selectedCandidateForManaging, status:status} as ApplicationsAggregated]
                    })
                    break
                case 'offer' :
                    setOffer((prv: ApplicationsAggregated[]) => {
                        return [...prv, {...selectedCandidateForManaging, status:status} as ApplicationsAggregated]
                    })
                    break
                case 'hired' :
                    setHired((prv: ApplicationsAggregated[]) => {
                        return [...prv, {...selectedCandidateForManaging, status:status} as ApplicationsAggregated]
                    })
                    break
                case 'rejected' :
                    setRejected((prv: ApplicationsAggregated[]) => {
                        return [...prv, {...selectedCandidateForManaging, status:status} as ApplicationsAggregated]
                    })
                    break
                default :
                    return
                
            }

            //update current status based arrays to removed selected application from current status based array
            switch(existingStatus){
                case 'applied':
                    setApplied((prv: ApplicationsAggregated[]) => {
                        return prv.filter((app: ApplicationsAggregated) => app._id !== selectedCandidateForManaging?._id)
                    })
                    break
                case 'screening':
                    setScreening((prv: ApplicationsAggregated[]) => {
                        return prv.filter((app: ApplicationsAggregated) => app._id !== selectedCandidateForManaging?._id)
                    })
                    break
                case 'interview':
                    setInterview((prv: ApplicationsAggregated[]) => {
                        return prv.filter((app: ApplicationsAggregated) => app._id !== selectedCandidateForManaging?._id)
                    })
                    break
                case 'offer':
                    setOffer((prv: ApplicationsAggregated[]) => {
                        return prv.filter((app: ApplicationsAggregated) => app._id !== selectedCandidateForManaging?._id)
                    })
                    break
                case 'hired':
                    setHired((prv: ApplicationsAggregated[]) => {
                        return prv.filter((app: ApplicationsAggregated) => app._id !== selectedCandidateForManaging?._id)
                    })
                    break
                case 'rejected':
                    setRejected((prv: ApplicationsAggregated[]) => {
                        return prv.filter((app: ApplicationsAggregated) => app._id !== selectedCandidateForManaging?._id)
                    })
                    break
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:3000})
        }
    }

    async function finalizeShortlistMethod(){
        const shortlistedIds = shortList.map((app) => {
            return app._id
        })

        const result = await finalizeShortList(jobId, shortlistedIds)
        if(result?.success){
            Swal.fire({
                icon:'success',
                title:'Finalized',
                text:'You will redirected to the details page',
                showConfirmButton:false,
                showCancelButton:false,
                timer:2400
            }).then(() => {
                navigator('finalized', {state:{jobId}})
            })
        }else{
            Swal.fire({
                icon:'error',
                title:'Oops',
                text:result?.message
            })
        }
    }

    


    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const [appResult] = await Promise.all([
                    getApplicationDetails(jobId),
                    //getJobDetails(jobId)
                ]);

                if (appResult?.success) {
                    console.log('--checking inner value of data--', appResult.result)
                    setJob(appResult?.result[0].job.jobTitle)
                    setApplications(appResult.result);
                    setApplied(filterApplications(appResult.result, "applied"))
                    setScreening(filterApplications(appResult.result, "screening"))
                    setInterview(filterApplications(appResult?.result, "interview"))
                    setOffer(filterApplications(appResult?.result, "offer"))
                    setHired(filterApplications(appResult?.result, "hired"))
                    setRejected(filterApplications(appResult?.result, "rejected"))
                    setAppCount(appResult?.result?.length)
                } else {
                    Notify.failure(appResult?.message || "Could not fetch applications.");
                }

               // if (jobResult?.success) {
                    setJobDetails([]);
               // } else {
               //     Notify.failure(jobResult?.message || "Could not fetch job details.");
                //}
            } catch (error) {
                Notify.failure("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        })()
    }, [])
    //checking problem here..............
    useEffect(() => {
        if(selectedCandidateForManaging?._id){
            (async function(){
            try {
                await updateCandidateNotes(selectedCandidateForManaging?._id as string, notes)
            } catch (error: unknown) {
                console.log('-- error occured while adding note for the candidate --', error)
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout: 3000})
            }
        })()
        }
    }, [notes])

    return(
        <>
        {/* <div className="absolute border top-20 left-2 border-gray-200 rounded-md shadow-lg bg-white w-md h-400px">
            <p>status: {selectedCandidateForManaging?.status || 'null'}</p>
        </div> */}
        {loading && <Loader />}
        <div className="bg-gray-50 min-h-screen p-5 lg:px-10">
            <p className="font-light">Manage Candidate</p>
            <p className="text-xs text-gray-500 mt-1">{job} {applications.length} candiadates</p>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                <div className="border border-gray-200 bg-white rounded-md shadow-sm p-3 flex">
                    <div className="flex-1">
                        <LuUser />
                        <p className="mt-3">Applied</p>
                    </div>
                    <div>
                        <p>{applications.length}</p>
                    </div>
                </div>
                <div className="border border-gray-200 bg-white rounded-md shadow-sm p-3 flex">
                    <div className="flex-1">
                        <LuPhone color="gray" />
                        <p className="mt-3">Screening</p>
                    </div>
                    <div>
                        <p>{screening.length}</p>
                    </div>
                </div>
                <div className="border border-gray-200 bg-white rounded-md shadow-sm p-3 flex">
                    <div className="flex-1">
                        <LuMessageCircle />
                        <p className="mt-3">Interview</p>
                    </div>
                    <div>
                        <p>{interview.length}</p>
                    </div>
                </div>
                <div className="border border-gray-200 bg-white rounded-md shadow-sm p-3 flex">
                    <div className="flex-1">
                        <BiSend />
                        <p className="mt-3">Offer</p>
                    </div>
                    <div>
                        <p>{offer.length}</p>
                    </div>
                </div>
                <div className="border border-gray-200 bg-white rounded-md shadow-sm p-3 flex">
                    <div className="flex-1">
                        <CiCircleCheck />
                        <p className="mt-3">Hired</p>
                    </div>
                    <div>
                        <p>{hired.length}</p>
                    </div>
                </div>
                <div className="border border-gray-200 bg-white rounded-md shadow-sm p-3 flex">
                    <div className="flex-1">
                        <FaRegCircleXmark />
                        <p className="mt-3">Rejected</p>
                    </div>
                    <div>
                        <p>{rejected.length}</p>
                    </div>
                </div>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">
                <div className="bg-gray-100 border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                            <LuUsers />
                            <p>Applied</p>
                        </div>
                        <div className="border border-gray-200 bg-white w-6 h-6 rounded-full flex items-center justify-center">{applied.length}</div>
                    </div>
                    {
                        applied.map((app: ApplicationsAggregated) => (
                            <div onClick={() => selectOneFromApplied(app._id as string)} className="mt-3 bg-white border border-gray-200 rounded-md p-3">
                        <div className="flex gap-2">
                            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center text-sx rounded-full">U</div>
                            <div className="flex-1">
                                <p className="text-sm font-light">{app.applicant.name}</p>
                                <p className="text-xs text-gray-500">{app.applicant.headline}</p>
                            </div>
                            
                        </div>
                        <div className="mt-3">
                                <p className="text-xs font-medium text-gray-700">{app.applicant.email}</p>
                                <p className="text-xs text-gray-500">{app.applicant.location?.city}, {app.applicant.location.state}</p>
                                <p>Status: {app.status}</p>
                            </div>
                        <div className="border border-gray-200 my-2"></div>
                        <div className="mt-3 flex justify-end">
                            <p className="text-xs text-gray-500">
                                {formatDate(app.createdAt)}
                            </p>
                        </div>
                    </div>
                        ))
                    }
                </div>
{/* che................ */}
                {/* screening */}
                
                <div className="bg-gray-100 border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                            <LuUsers />
                            <p>Screening</p>
                        </div>
                        <div className="border border-gray-200 bg-white w-6 h-6 rounded-full flex items-center justify-center">{screening.length}</div>
                    </div>
                    {
                        screening.map((app: ApplicationsAggregated) => (
                            <div onClick={() => selectOneFromScreening(app._id as string)} className="mt-3 bg-white border border-gray-200 rounded-md p-3">
                        <div className="flex gap-2">
                            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center text-sx rounded-full">U</div>
                            <div className="flex-1">
                                <p className="text-sm font-light">{app.applicant.name}</p>
                                <p className="text-xs text-gray-500">{app.applicant.headline}</p>
                                <p>Status: {app.status}</p>
                            </div>
                            
                        </div>
                        <div className="mt-3">
                                <p className="text-xs font-medium text-gray-700">{app.applicant.email}</p>
                                <p className="text-xs text-gray-500">{app.applicant.location?.city}, {app.applicant.location.state}</p>
                            </div>
                        <div className="border border-gray-200 my-2"></div>
                        <div className="mt-3 flex justify-end">
                            <p className="text-xs text-gray-500">
                                {formatDate(app.createdAt)}
                            </p>
                        </div>
                    </div>
                        ))
                    }
                </div>

                {/* interview */}

                <div className="bg-gray-100 border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                            <LuUsers />
                            <p>Interview</p>
                        </div>
                        <div className="border border-gray-200 bg-white w-6 h-6 rounded-full flex items-center justify-center">{interview.length}</div>
                    </div>
                    {
                        interview.map((app: ApplicationsAggregated) => (
                            <div onClick={() => selectOneFromInterview(app._id as string)} className="mt-3 bg-white border border-gray-200 rounded-md p-3">
                        <div className="flex gap-2">
                            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center text-sx rounded-full">U</div>
                            <div className="flex-1">
                                <p className="text-sm font-light">{app.applicant.name}</p>
                                <p className="text-xs text-gray-500">{app.applicant.headline}</p>
                            </div>
                            
                        </div>
                        <div className="mt-3">
                                <p className="text-xs font-medium text-gray-700">{app.applicant.email}</p>
                                <p className="text-xs text-gray-500">{app.applicant.location?.city}, {app.applicant.location.state}</p>
                                <p>Status: {app.status}</p>
                            </div>
                        <div className="border border-gray-200 my-2"></div>
                        <div className="mt-3 flex justify-end">
                            <p className="text-xs text-gray-500">
                                {formatDate(app.createdAt)}
                            </p>
                        </div>
                    </div>
                        ))
                    }
                </div>

                {/* offer */}

                <div className="bg-gray-100 border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                            <LuUsers />
                            <p>Offer</p>
                        </div>
                        <div className="border border-gray-200 bg-white w-6 h-6 rounded-full flex items-center justify-center">{offer.length}</div>
                    </div>
                    {
                        offer.map((app: ApplicationsAggregated) => (
                            <div onClick={() => selectOneFromOffer(app._id as string)} className="mt-3 bg-white border border-gray-200 rounded-md p-3">
                        <div className="flex gap-2">
                            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center text-sx rounded-full">U</div>
                            <div className="flex-1">
                                <p className="text-sm font-light">{app.applicant.name}</p>
                                <p className="text-xs text-gray-500">{app.applicant.headline}</p>
                            </div>
                            
                        </div>
                        <div className="mt-3">
                                <p className="text-xs font-medium text-gray-700">{app.applicant.email}</p>
                                <p className="text-xs text-gray-500">{app.applicant.location?.city}, {app.applicant.location.state}</p>
                                <p>Status: {app.status}</p>
                            </div>
                        <div className="border border-gray-200 my-2"></div>
                        <div className="mt-3 flex justify-end">
                            <p className="text-xs text-gray-500">
                                {formatDate(app.createdAt)}
                            </p>
                        </div>
                    </div>
                        ))
                    }
                </div>

                {/* hired */}

                <div className="bg-gray-100 border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                            <LuUsers />
                            <p>Hired</p>
                        </div>
                        <div className="border border-gray-200 bg-white w-6 h-6 rounded-full flex items-center justify-center">{hired.length}</div>
                    </div>
                    {
                        hired.map((app: ApplicationsAggregated) => (
                            <div onClick={() => selectOneFromHired(app._id as string)} className="mt-3 bg-white border border-gray-200 rounded-md p-3">
                        <div className="flex gap-2">
                            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center text-sx rounded-full">U</div>
                            <div className="flex-1">
                                <p className="text-sm font-light">{app.applicant.name}</p>
                                <p className="text-xs text-gray-500">{app.applicant.headline}</p>
                            </div>
                            
                        </div>
                        <div className="mt-3">
                                <p className="text-xs font-medium text-gray-700">{app.applicant.email}</p>
                                <p className="text-xs text-gray-500">{app.applicant.location?.city}, {app.applicant.location.state}</p>
                                <p>Status: {app.status}</p>
                            </div>
                        <div className="border border-gray-200 my-2"></div>
                        <div className="mt-3 flex justify-end">
                            <p className="text-xs text-gray-500">
                                {formatDate(app.createdAt)}
                            </p>
                        </div>
                    </div>
                        ))
                    }
                </div>

                {/* Rejected  */}
                
                <div className="bg-gray-100 border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                            <LuUsers />
                            <p>Rejected</p>
                        </div>
                        <div className="border border-gray-200 bg-white w-6 h-6 rounded-full flex items-center justify-center">{rejected.length}</div>
                    </div>
                    {
                        rejected.map((app: ApplicationsAggregated) => (
                            <div onClick={() => selectOneFromRejected(app._id as string)} className="mt-3 bg-white border border-gray-200 rounded-md p-3">
                        <div className="flex gap-2">
                            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center text-sx rounded-full">U</div>
                            <div className="flex-1">
                                <p className="text-sm font-light">{app.applicant.name}</p>
                                <p className="text-xs text-gray-500">{app.applicant.headline}</p>
                            </div>
                            
                        </div>
                        <div className="mt-3">
                                <p className="text-xs font-medium text-gray-700">{app.applicant.email}</p>
                                <p className="text-xs text-gray-500">{app.applicant.location?.city}, {app.applicant.location.state}</p>
                            </div>
                        <div className="border border-gray-200 my-2"></div>
                        <div className="mt-3 flex justify-end">
                            <p className="text-xs text-gray-500">
                                {formatDate(app.createdAt)}
                            </p>
                        </div>
                    </div>
                        ))
                    }
                </div>
                
                
                
            </div>
            {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"> */}
                {/* Header */}
                {/* <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">{jobDetails?.jobTitle || 'Loading...'}</h1>
                    <p className="text-gray-500">{jobDetails?.location}</p>
                    <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                        <span className="font-medium">Total Applicants: <span className="text-blue-600">{applications.length + shortList.length}</span></span>
                        <span className="font-medium">Shortlisted: <span className="text-green-600">{shortList.length}</span></span>
                    </div>
                </div> */}

                {/* Main Content Grid */}
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
                    {/* New Applications Column */}
                    {/* <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-700">New Applicants ({applications.length})</h2>
                            <div className="flex items-center gap-2">
                                <button onClick={selectAllCard} className="text-xs font-medium text-blue-600 hover:underline">Select All</button>
                                {selectionMode && <button onClick={unselectAllCard} className="text-xs font-medium text-red-600 hover:underline">Cancel</button>}
                            </div>
                        </div>
                        {selectionMode && (
                            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 flex items-center justify-between">
                                <p className="text-sm font-medium text-blue-800">{selectedCards.length} selected</p>
                                <button onClick={handleShortlistAll} className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-blue-700">
                                    Shortlist Selected
                                </button>
                            </div>
                        )} */}
                        {/* <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {applications.length > 0 ? applications.map((applicant, index) => (
                                <ApplicantCard 
                                    key={index} 
                                    isSelected={selectedCards.includes(applicant?._id)} 
                                    selectionMode={selectionMode} 
                                    applicationData={applicant} 
                                    defaultProfile={defaultProfile} 
                                    selectFromOption={() => selectFromOption(applicant?._id)}
                                    toggleCardSelection={() => toggleCardSelection(applicant?._id)}
                                    shortList={() => handleShortlistSingle(applicant._id)}
                                    buttonOptions={['Add to shortlist', 'Select tile', 'Reject application']}
                                    flag={'applicationList'}
                                    reject={() => rejectIndividualCandidate(applicant?.applicantDetails._id, applicant._id)} 
                                />
                            )) : (
                                <div className="text-center py-10">
                                    <i className="fa-solid fa-inbox text-3xl text-gray-400"></i>
                                    <p className="mt-2 text-sm text-gray-500">No new applications.</p>
                                </div>
                            )}
                        </div>
                    </div> */}

                    {/* Shortlisted Column */}
                    {/* <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-700">Shortlisted ({shortList.length})</h2>
                            {shortList.length > 0 && (
                                <button onClick={finalizeShortlistMethod} className="bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-green-700">
                                    Finalize Shortlist
                                </button>
                            )}
                        </div>
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {shortList.length > 0 ? shortList.map((application, index) => (
                                <ApplicantCard 
                                    key={index} 
                                    applicationData={application} 
                                    defaultProfile={defaultProfile}
                                    buttonOptions={['Remove','Interview email', 'Reject']} 
                                    flag={'shortList'}
                                    removeFromShortlist={() => handleRemoveFromShortList(application._id)} 
                                />
                            )) : (
                                <div className="text-center py-10">
                                    <i className="fa-solid fa-star text-3xl text-gray-400"></i>
                                    <p className="mt-2 text-sm text-gray-500">No candidates shortlisted yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div> */}
        </div>

       {/* Controlbar */}
       {controlBarOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setControlBarOpen(false)}
            className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity"
            aria-hidden="true"
          ></div>

          {/* Panel */}
          <div className="bg-white fixed right-0 top-0 shadow-xl w-90 h-screen overflow-y-auto z-50 flex flex-col">
            {/* Panel Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                <h2 className="text-lg font-semibold text-gray-800">Applicant Details</h2>
                <button 
                    onClick={() => setControlBarOpen(false)} 
                    className="text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <FaRegCircleXmark size={22} />
                </button>
            </div>
            {/* Panel Body (Your content goes here) */}
            <div className="p-4">
                <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-sm">
                        <p className="text-white">U</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-700 font-light">{selectedCandidateForManaging?.applicant.name}</p>
                        <p className="text-xs text-gray-500">{selectedCandidateForManaging?.applicant.headline}</p>
                    </div>
                </div>

                <div className="mt-5">
                    <select onChange={(e) => updateStatus(e)} className="border border-blue-500 rounded-md p-2 w-full text-sm bg-blue-100">
                        {
                            <option value={selectedCandidateForManaging?.status}>{`${selectedCandidateForManaging?.status[0].toUpperCase()}${selectedCandidateForManaging?.status.slice(1)}`}</option>
                        }
                        {
                            selectedCandidateForManaging?.status === 'applied' && (<option value="applied">Applied</option>)
                        }
                        {
                            (selectedCandidateForManaging?.status === 'applied' ||
                            selectedCandidateForManaging?.status === 'screening') && (
                                <option value="screening">Screening</option>
                            )
                        }
                        {
                            (selectedCandidateForManaging?.status === 'applied' ||
                            selectedCandidateForManaging?.status === 'screening' ||
                            selectedCandidateForManaging?.status === 'interview'
                            ) && (
                                <option value="interview">Interview</option>
                            )
                        }
                        {
                            (selectedCandidateForManaging?.status === 'applied' ||
                            selectedCandidateForManaging?.status === 'screening' ||
                            selectedCandidateForManaging?.status === 'interview' ||
                            selectedCandidateForManaging?.status === 'offer'
                            ) && (
                                <option value="offer">Offer</option>
                            )
                        }
                        {
                            (selectedCandidateForManaging?.status === 'applied' ||
                            selectedCandidateForManaging?.status === 'screening' ||
                            selectedCandidateForManaging?.status === 'interview' ||
                            selectedCandidateForManaging?.status === 'offer' ||
                            selectedCandidateForManaging?.status === 'rejected'
                            ) && (
                                <option value="rejected">Rejected</option>
                            )
                        }
                        {
                            (selectedCandidateForManaging?.status === 'applied' ||
                            selectedCandidateForManaging?.status === 'screening' ||
                            selectedCandidateForManaging?.status === 'interview' ||
                            selectedCandidateForManaging?.status === 'offer' ||
                            selectedCandidateForManaging?.status === 'hired'
                            ) && (
                                <option value="hired">Hired</option>
                            )
                        }
                        
                    </select>
                </div>

                <div className="mt-5">
                    <p className="font-light">Contact Information</p>
                    <div className="mt-2 space-y-2">
                        <div className="flex gap-2">
                            <BiEnvelope color="gray" />
                            <div>
                                <p className="text-sm font-light">Email</p>
                                <p className="text-xs text-gray-700">{selectedCandidateForManaging?.applicant.email}</p>
                            </div>
                            
                        </div>
                        <div className="flex gap-2">
                            <IoCall color="gray" />
                            <div>
                                <p className="text-sm font-light">Phone</p>
                                <p className="text-xs text-gray-700">{selectedCandidateForManaging?.applicant.phone}</p>
                            </div>
                            
                        </div>
                        <div className="flex gap-2">
                            <IoLocation color="gray" />
                            <div>
                                <p className="text-sm font-light">Location</p>
                                <p className="text-xs text-gray-700">{selectedCandidateForManaging?.applicant.location?.district}, {selectedCandidateForManaging?.applicant.location?.state}</p>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <p className="font-light">Professional Details</p>
                    <div className="mt-2 space-y-2">
                        <div>
                            <p className="font-medium text-sm">Expreiences</p>
                            <div className="mt-1 space-y-2">
                                {
                                    selectedCandidateForManaging?.experiences &&
                                    selectedCandidateForManaging?.experiences?.length > 0 && (
                                        selectedCandidateForManaging?.experiences?.map((exp: Experience) => (
                                            <>
                                                <div key={exp._id} className="flex gap-2">
                                                    <PiSuitcase />
                                                    <div>
                                                        <p className="text-sm font-light">{exp.jobRole}</p>
                                                        <p className="text-xs text-gray-500">{exp.organization}</p>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    )
                                }{
                                    selectedCandidateForManaging?.experiences &&
                                    selectedCandidateForManaging?.experiences?.length === 0 && (
                                        <p>No experiences</p>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <p className="font-medium text-sm">Educations</p>
                            <div className="mt-1 space-y-2">
                                {
                                    selectedCandidateForManaging?.educations &&
                                    selectedCandidateForManaging?.educations?.length > 0 && (
                                        selectedCandidateForManaging?.educations?.map((edu: Education) => (
                                            <>
                                                <div key={edu._id} className="flex gap-2">
                                                    <FaGraduationCap />
                                                    <div>
                                                        <p className="text-sm font-light">{edu.educationStream}</p>
                                                        <p className="text-xs text-gray-500">{edu.institution}</p>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="font-medium text-sm">Skills</p>
                            <div className="flex flex-wrap mt-2 gap-2">
                                {
                                    selectedCandidateForManaging?.skills &&
                                    selectedCandidateForManaging?.skills?.length > 0 && (
                                        selectedCandidateForManaging.skills.map((s: Skills) => (
                                            <>
                                                <span className="text-xs text-blue-500 bg-blue-100 rounded-md px-3 py-1" key={s._id}>
                                                    {s.skill}
                                                </span>
                                            </>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <p className="font-light">Notes</p>
                    <textarea onKeyUp={(e) => updateCandidateNote(e)} placeholder="Write notes about this candidate" className="text-xs mt-2  p-3 border border-gray-300 rounded-md w-full outline-none" rows={5} ></textarea>
                </div>
                <div className="mt-5 space-y-2">
                    <div onClick={() => setScheduleInterviewModalOpen(true)} className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-xs justify-center bg-blue-500 text-white"><BiCalendar /> Schedule Interview</div>
                    <button onClick={() => setEmailModalOpen(true)} className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-xs justify-center border border-gray-300"><BiEnvelope /> Send Email</button>
                    <div onClick={() => SetPdfViewerOpen(true)} className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-xs justify-center border border-gray-300"><FaFile /> View Resume</div>
                    <div onClick={() => navigateToUserPublicProfile(selectedCandidateForManaging?.candidateId as string)} className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-xs justify-center border border-gray-300"><LuUser /> Inspect Profile</div>
                </div>
            </div>
          </div>
        </>
      )}

      {
        scheduleInterviewModalOpen && (
            <Modal className="flex flex-col items-center justify-center" open={scheduleInterviewModalOpen} onClose={() => setScheduleInterviewModalOpen(false)}>
                <div className="p-5 bg-white shadow-xl rounded-md w-md lg:w-lg">
                    <div className="header w-full items-center flex justify-between">
                        <p>Schedule Interview</p>
                        <button onClick={() => setScheduleInterviewModalOpen(false)}>
                            <FaRegCircleXmark />
                        </button>
                    </div>
                    <div className="mt-2 bg-blue-100 flex gap-3 w-full p-3">
                        <div className="bg-blue-500 w-10 h-10 flex items-center justify-center text-sm text-white rounded-full">
                            <p>U</p>
                        </div>
                        <div>
                            <p className="text-sm">Name of the can</p>
                            <p className="text-xs">Headline if</p>
                        </div>
                    </div>

                    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 500, mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}
    >
      {/* Date */}
      <FormControl error={Boolean(errors.date)}>
        <Controller
        name="date"
        control={control}
        rules={{ required: "Date is required" }}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']}>
                <DateField
            label="Interview Date"
            {...field}
            error={Boolean(errors.date)}
            onChange={(fieldVAlue) => field.onChange(fieldVAlue)} value={field.value}
            slotProps={{
              textField: { fullWidth: true }
            }}
          />
            </DemoContainer>
          </LocalizationProvider>
        )}
      />
      <FormHelperText>{errors.date?.message}</FormHelperText>
      </FormControl>

      {/* Time */}
      <FormControl>
        <Controller
        name="time"
        control={control}
        rules={{ required: "Time is required" }}
        render={({ field }) => (
          <TextField
                label="Interview Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...field}
                error={Boolean(errors.time)}
                helperText={errors.time?.message}
              />
        )}
      />
      </FormControl>

      {/* Interview Type */}
      <FormControl error={Boolean(errors.interviewType)}>
        <Controller
        name="interviewType"
        control={control}
        rules={{ required: "Interview type is required" }}
        render={({ field }) => (
          <TextField select label="Interview Type" fullWidth {...field} error={Boolean(errors.interviewType)} helperText={errors.interviewType?.message}>
            {interviewTypes.map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      </FormControl>

      {/* Google Meet URL */}
      <FormControl error={Boolean(errors.gmeetUrl)}>
        <Controller
        name="gmeetUrl"
        control={control}
        rules={{ required: "Google Meet URL is required" }}
        render={({ field }) => (
          <TextField
            label="Google Meet URL"
            fullWidth
            {...field}
            error={Boolean(errors.gmeetUrl)}
            helperText={errors.gmeetUrl?.message}
          />
        )}
      />
      </FormControl>

      {/* Interviewer Name */}
      <FormControl error={Boolean(errors.interviewerName)}>
        <Controller
        name="interviewerName"
        control={control}
        rules={{ required: "Interviewer name is required" }}
        render={({ field }) => (
          <TextField
            label="Interviewer Name"
            fullWidth
            {...field}
            error={Boolean(errors.interviewerName)}
            helperText={errors.interviewerName?.message}
          />
        )}
      />
      </FormControl>

      {/* Note */}
      <Controller
        name="note"
        control={control}
        render={({ field }) => (
          <TextField
            label="Note"
            multiline
            rows={4}
            fullWidth
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
            control={<Checkbox {...field} checked={field.value} />}
            label="Send email invitation to the email also"
          />
        )}
      />

      {/* Submit Button */}
      <Button variant="contained" type="submit" fullWidth>
        Submit
      </Button>
    </Box>
                </div>
            </Modal>
        )
      }


      {/* Modal for viewing resume */}

      {
        pdfViewerOpened && (
            <Modal className="flex flex-col items-center justify-center" open={pdfViewerOpened} onClose={() => SetPdfViewerOpen(false)}>
                <div className="bg-white p-5 overflow-y-scroll max-h-lg w-2xl rounded-md shadow-lg">
                    <div className="header flex justify-end">
                        <button onClick={() => SetPdfViewerOpen(false)}><FaRegCircleXmark /></button>
                    </div>
                    <ViewPDFDocument fileUrl={selectedCandidateForManaging?.resume?.resumeUrlCoudinary} />
                </div>
            </Modal>
        )
      }


      {/* Modal for email  */}
      {
        emailModalOpen && (
            <Modal className="flex flex-col items-center justify-center" open={true} onClose={() => setEmailModalOpen(false)}>
                <div className="bg-white shadow-xl rounded-md w-md md:w-lg">
                    <div className="header p-3 bg-blue-50 rounded-md flex justify-between">
                        <p className="font-medium text-sm text-gray-700">Send Email</p>
                        <button onClick={() => setEmailModalOpen(false)}><FaXmark color="black" /></button>
                    </div>
                    <div className="body bg-white p-3 rounded-b-md">
                        <form onSubmit={handleEmailContentsSubmit(() => console.log(''))}>
                            <FormControl fullWidth>
                               <Controller
                                    name="to"
                                    control={EmailContentsControl} 
                                    render={({field}) => (
                                        <div className="border-b w-full border-gray-300">
                                            <input {...field} className="!text-xs text-gray-700 w-full" placeholder="To: example@gmail.com" type="text" />
                                        </div>
                                    )}
                               />
                            </FormControl>

                            <FormControl fullWidth className="!mt-3">
                                <Controller 
                                    name="subject"
                                    control={EmailContentsControl}
                                    render={({field}) => (
                                        <div className="border-b w-full border-gray-300">
                                            <input {...field} type="text" placeholder="Subject" className="!text-xs text-gray-700 w-full" />
                                        </div>
                                    )}
                                />
                            </FormControl>

                            <FormControl className="!mt-5" fullWidth>
                                <Controller 
                                    name="body"
                                    control={EmailContentsControl}
                                    render={({field}) => (
                                        <div>
                                            <textarea placeholder="Dear name,.." {...field} className="w-full outline-none text-xs text-gray-700" rows={20} />
                                        </div>
                                    )}
                                />
                            </FormControl>
                            <div className="file-attachments"></div>
                            <div className="flex items-center gap-3">
                                <button type="submit" className="flex items-center gap-2 bg-blue-700 text-white text-sm font-light px-3 py-1 rounded-full">
                                    <p>Send</p>
                                    <BiSend />
                                </button>
                                <button className="text-gray-700">
                                    <HiPaperClip />
                                </button>
                                <button className="text-gray-700">
                                    <BiTrash />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        )
      }
        </>
    )
}