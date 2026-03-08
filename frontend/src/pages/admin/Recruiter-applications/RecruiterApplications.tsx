import { useEffect, useState } from "react"
import { BsCheckCircle, BsClock, BsEye, BsFilter, BsGlobe, BsLinkedin, BsSearch } from "react-icons/bs"
import { CiCircleCheck } from "react-icons/ci"
import { FaFileAlt, FaSearch, FaUsersSlash } from "react-icons/fa"
import { FaCircleXmark, FaRegCircleXmark } from "react-icons/fa6"
import { approveRecruiterApplication, changeStatusToUnderReview, loadRecruiterApplications, rejectRecruiterApplication } from "../../../services/adminServices"
import { AdminRecruiterApplicationsData, RecruiterProfileData } from "../../../types/entityTypes"
import { Notify } from "notiflix"
import { Box, Button, IconButton, Modal, Table, TableHead, TextareaAutosize, Typography } from "@mui/material"
import formatDate, { formatRelativeTime } from "../../../services/util/formatDate"
import { useNavigate } from "react-router-dom"
import { BiGlobe } from "react-icons/bi"
import moment from "moment"
import ViewPDFDocument from "../../../components/common/PdfViewer"
import { Controller, useForm } from "react-hook-form"
import { CgClose } from "react-icons/cg"
import Swal from "sweetalert2"

interface DeclineFormInputs {
  reason: string;
  feedback: string;
  applicationId: string
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  applicantData: RecruiterProfileData;
  onConfirmDecline: () => void;
}

const reasons = [
  "Invalid LinkedIn Profile",
  "Unverifiable Company",
  "Suspicious Activity",
  "Incomplete Documentation",
  "Company not registered",
  "Duplicate Application",
  "Does not meet requirements",
  "Other"
];

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
        case 'under-review' :
            return(
                <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-medium rounded uppercase">
                    {status}
                </span>
            )
        case 'pending' :
            return(
                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded uppercase">
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
    type RecruiterApplicationsFetchResponsePayload = {
      success: boolean;
      message: string;
      result: {
        applications: AdminRecruiterApplicationsData[],
        totalPages: number
      }
    }

    type RecruiterApplicationUpdateResponsePayload = {
      success: boolean,
      message: string,
      result: AdminRecruiterApplicationsData
    }

    const [recruiterApplications, setRecruiterApplications] = useState<AdminRecruiterApplicationsData[] | null>(null)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(7)
    const [totalPages, setTotalPages] = useState(0)
    const [isVerificationDocumentOpened, setIsVerificationDocuemtnOpened] = useState(false)
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)

    const openRejectModal = () => setIsRejectModalOpen(true)
    const closeRejectModal = () => setIsRejectModalOpen(false)

    const openVerificationDocuemtn = () => setIsVerificationDocuemtnOpened(true)

    const onRejectApplication = () => {
      Notify.info('Rejected')
      setRecruiterApplications((prv: AdminRecruiterApplicationsData[] | null) => {
        if(!prv) return null
        return prv.filter((app: AdminRecruiterApplicationsData) => app._id !== selectedApp?._id)
      })
      setSelectedApp(null)
    }

    const onApproveApplication = async (applicationId: string) => {
      if(!applicationId) return
      Swal.fire({
        icon: 'question',
        title: 'Approve?',
        text: 'Approve this application?. This recruiter will be able to Post and Manage jobs',
        showConfirmButton: true,
        confirmButtonText: 'Verify & Approve',
        showCancelButton: true
      }).then(async (response) => {
        if(response.isConfirmed){
          const result = await approveRecruiterApplication(applicationId)
          if(result?.success){
            Swal.fire({
              icon: 'success',
              title: 'Recruiter Verified',
              showConfirmButton: false,
              showCancelButton: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
              timer: 2000
            }).then(() => {
              setRecruiterApplications((prv: AdminRecruiterApplicationsData[] | null) => {
                if(!prv) return null
                return prv.filter((app: AdminRecruiterApplicationsData) => app._id !== applicationId)
              })
              setSelectedApp(null)
            })
          }
        }
      })
    }

    const applications = [
    { 
        id: 1, 
        name: "Luma Solutions Inc.", 
        email: "hr@lumasolutions.com", 
        type: "Company", 
        status: "New", 
        time: "2 hours ago", 
        initial: "LS", 
        color: "bg-purple-600",
        industries: "Software, Design, Marketing",
        specialization: "Product Development",
        summary: "Luma Solutions is a premier software agency focusing on high-end UI/UX and scalable backend systems."
    },
    { 
        id: 2, 
        name: "Hana Hampton", 
        email: "hana.hampton@gmail.com", 
        type: "Freelance", 
        status: "Under Review", 
        time: "4 hours ago", 
        initial: "HH", 
        color: "bg-purple-400",
        industries: "Technology, Engineering, Teaching",
        specialization: "Information Technology",
        summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    { 
        id: 3, 
        name: "GetCandy Solutions Inc.", 
        email: "hr@getcandy.com", 
        type: "Company", 
        status: "New", 
        time: "5 hours ago", 
        initial: "GC", 
        color: "bg-blue-500",
        industries: "E-commerce, Retail",
        specialization: "Shopify Development",
        summary: "Specializing in sweetening the e-commerce experience for global brands."
    }
  ];

  // 2. State to track which application is selected
  const [selectedApp, setSelectedApp] = useState(recruiterApplications && recruiterApplications?.length > 0 ? recruiterApplications[1] : null); // Default to Hana

  const selectAnApplication = async (application: AdminRecruiterApplicationsData) => {
    setSelectedApp(application)
    if(application.profileStatus === 'pending') {
      try {
        const result: RecruiterApplicationUpdateResponsePayload = await changeStatusToUnderReview(application._id as string)
        if(result.success){
          Notify.success('Application is currently under Review')
          setSelectedApp((app: AdminRecruiterApplicationsData | null) => {
            if(!app) return null
            return {...app, profileStatus: 'under-review'}
          })

          setRecruiterApplications((applications: AdminRecruiterApplicationsData[] | null) => {
            if(!applications) return null
            return applications?.map((app: AdminRecruiterApplicationsData) => {
              if(app._id === application._id){
                return {...app, profileStatus: 'under-review'}
              }else{
                return app
              }
            })
          })
        }
      } catch (error) {
        Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
      }
    }
  }

  useEffect(() => {
        (async () => {
            //Notify.failure(search, {timeout:1000})
            try {
                const result: RecruiterApplicationsFetchResponsePayload = await loadRecruiterApplications(page, limit)

                if(result?.success){
                  console.log('applications list', result.result.applications)
                    setRecruiterApplications(result?.result.applications)
                    setTotalPages(result.result.totalPages)
                    //setSelectedApp(result.result.applications[0]); // Default to Hana

                    // setTotalApplications(result?.result?.length)
                    // setPendingApplications(result?.result?.filter((application: RecruiterProfileData) => application.profileStatus === 'pending').length)
                    // setApprovedApplications(result?.result?.filter((application: RecruiterProfileData) => application.profileStatus === 'approved').length)
                    // setRejectedApplications(result?.result?.filter((application: RecruiterProfileData) => application.profileStatus === 'rejected').length)
                }
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:3000})
                // setError('Oops!, Something went wrong please try again after some time')
            }
        })()
    }, [page])

  return (
    <>
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      
      {/* Sidebar - Application List */}
      <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-3 border-b border-gray-100">
          <p className="font-medium text-lg">Pending Applications</p>
          <p className="text-xs text-gray-500">{recruiterApplications?.length} Applications awaiting review</p>
        </div>

        <div className="overflow-y-auto flex-1">
            {recruiterApplications?.map((app: AdminRecruiterApplicationsData) => (
            <div 
                key={app._id} 
                onClick={() => selectAnApplication(app)} // 3. Update state on click
                className={`p-3 flex items-start gap-4 border-b border-gray-200 cursor-pointer transition-all duration-200 ${
                    selectedApp?._id === app._id ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                }`}
            >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0 bg-blue-500`}>
                {app?.fullName?.split(' ')[0][0]}{app?.fullName?.split(' ')[1][0]}
                </div>
                <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{app?.fullName}</h3>
                <p className="text-xs text-gray-500 mb-2 truncate">{app.email}</p>
                <div className="flex gap-2 mb-2">
                    <ApplicationStatusPills status={app.profileStatus as string} />
                    <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-medium rounded uppercase">{app.recruiterType}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <BsClock size={12} /> {formatRelativeTime(app?.createdAt || new Date())}
                </div>
                </div>
            </div>
            ))}
            {recruiterApplications?.length === 0 && (
            <div className="flex flex-col items-center mt-10">
              <FaUsersSlash color="gray" size={45} />
              <p className="font-medium text-lg mt-2">No Recruiter Applications</p>
              <p className="text-xs !mt-2 text-gray-500">New Applications Will be listed here</p>
            </div>
            )}
        </div>
        <div className="bg-white p-2 border border-gray-200 flex justify-between items-center">
          <p className="text-xs text-gray-500">Showing page {page} of {totalPages} pages</p>
          <div className="space-x-2">
            <button onClick={() => setPage(prv => prv - 1)} disabled={page === 1} className={`text-xs ${page === 1 ? "text-gray-300" : ""} font-medium px-3 py-2 border border-gray-300 rounded-md`}>Prev</button>
            <button onClick={() => setPage(prv => prv + 1)} disabled={page >= totalPages} className={`text-xs font-medium px-3 py-2 bg-blue-500 text-white rounded-md`}>Next</button>
          </div>
        </div>
      </div>

      {/* Stopped here, just focus more on the backend */}

      {/* Main Content - Dynamic Details */}
      <div className="flex-1 p-10 overflow-y-auto">
        {selectedApp && (
          <>
            <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-medium">{selectedApp?.fullName}</h1>
              <p className="text-gray-500 text-sm">{selectedApp?.email}</p>
              <p className="text-sm text-gray-400 mt-2">Submitted {formatRelativeTime(selectedApp?.createdAt || new Date())}</p>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded">
                {selectedApp?.profileStatus}
            </span>
          </div>

          {/* Profile Links */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
            <p className="font-semibold mb-4">Profile Links</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="bg-blue-600 p-2 rounded text-white"><BsLinkedin size={20} /></div>
                <div className="overflow-hidden">
                  <a href={selectedApp?.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold">LinkedIn Profile</a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-400 truncate">https://linkedin.com/in/{selectedApp?.fullName?.toLowerCase().replace(/\s/g, '')}</a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                <div className={`p-2 rounded text-white ${'blue'}`}><BsGlobe size={20} color="blue" /></div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold">Portfolio Website</p>
                  <p className="text-[10px] text-gray-400 truncate">https://www.{selectedApp?.fullName?.toLowerCase().replace(/\s/g, '')}.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-10">
            <p className="font-semibold mb-6">{selectedApp?.recruiterType} Information</p>
            
            {
              selectedApp?.recruiterType === 'corporate'
                ? <>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Company Name</p>
                    <p className="text-sm font-medium">{selectedApp?.companyDetails?.name}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Slogan</p>
                    <p className="text-sm font-medium">{selectedApp?.companyDetails?.slogan}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Focusing Industries</p>
                    <p className="text-sm font-medium">{selectedApp?.companyDetails?.industry}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Specialization</p>
                    <p className="text-sm font-medium">{selectedApp?.companyDetails?.industry}</p>
                </div>
            </div>

            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Summary</p>
              <p className="text-xs text-gray-600 leading-relaxed italic">
                "{selectedApp?.companyDetails?.description}"
              </p>
            </div>
                  </>
                : <>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Full Name</p>
                    <p className="text-sm font-medium">{selectedApp?.fullName}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Professional Title</p>
                    <p className="text-sm font-medium">{selectedApp?.professionalTitle}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Email</p>
                    <p className="text-sm font-medium">{selectedApp?.email}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Phone</p>
                    <p className="text-sm font-medium">{selectedApp?.phone}</p>
                </div>
            </div>

            {/* <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Summary</p>
              <p className="text-xs text-gray-600 leading-relaxed italic">
                "{selectedApp?.userProfile?.summary}"
              </p>
            </div> */}
                  </>
            }
          </div>

          <div className="mt-5 bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <p className="font-semibold">Verification Document</p>
            <div className="grid grid-cols-2 gap-2 mt-3 cursor-pointer">
              <div className="border flex items-center gap-2 border-gray-200 rounded-md p-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-300"><FaFileAlt color="white" /></div>
                  <p onClick={openVerificationDocuemtn} className="text-sm font-medium">{selectedApp?.verificationDocument?.publicId?.split("/")[2].split(" ")[0]}</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8 pt-8 border-t border-gray-100">
            <button onClick={openRejectModal} className="px-6 py-2.5 border border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-50 transition-colors">
              Reject with reason
            </button>
            <button onClick={() => onApproveApplication(selectedApp?._id as string)} className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
              Verify & Approve Recruiter
            </button>
          </div>
        </div>
          </>
        )}
        {!selectedApp && (
          <>
            <div className="bg-white p-5 flex flex-col py-10 items-center rounded-md border border-gray-200">
              <FaUsersSlash color="gray" size={45} />
              <p className="font-medium text-lg mt-2">No Selected Application</p>
              {applications.length > 0 && (<p className="text-xs mt-2">select one application for view details</p>)}
              <p className="text-xs !mt-2 text-gray-500">Application details will show here</p>
            </div>
          </>
        )}
      </div>
    </div>
    {/* {isVerificationDocumentOpened && (
      <div className="!absolute w-full min-h-screen left-0 top-"><ViewPDFDocument fileUrl={selectedApp?.verificationDocument?.url as string} docWidth={300} /></div>
    )} */}

    {isRejectModalOpen && (
      <DeclineApplicationModal isOpen={isRejectModalOpen} onClose={closeRejectModal} applicantData={selectedApp as RecruiterProfileData} onConfirmDecline={onRejectApplication} />
    )}
    </>
  );


function DeclineApplicationModal({ isOpen, onClose, applicantData, onConfirmDecline }: Props) {
  const { control, handleSubmit, watch, setValue, formState: { isValid } } = useForm<DeclineFormInputs>({
    defaultValues: {
      reason: '',
      feedback: ''
    }
  });

  const selectedReason = watch('reason');

  const onSubmit = async (data: DeclineFormInputs) => {
    Swal.fire({
      icon: 'question',
      title: 'Reject This application ?',
      text: 'This action cant be undo',
      showConfirmButton: true,
      confirmButtonText: 'Reject',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      willOpen: () => {
        const container = Swal.getContainer()
        if(container){
          container.style.zIndex = '9999'
        }
      }
    }).then(async (response) => {
      if(response.isConfirmed){
        try {
      const result = await rejectRecruiterApplication(applicantData._id as string, data.reason, data.feedback)
      if(result.success){
        Swal.fire({
          icon: "success",
          title: 'Application Rejected',
          showConfirmButton: false,
          showCancelButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer: 3000
        }).then(() => {
          onConfirmDecline()
        })
      }
    } catch (error: unknown) {
      console.log(error)
      Notify.failure(error instanceof Error ? error.message : 'Can not reject application')
    } finally {
      onClose()
    }
      }
    })
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 500 },
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        outline: 'none'
      }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">Decline Application</Typography>
          <IconButton onClick={onClose} size="small">
            <CgClose />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Applicant : <span style={{ fontWeight: 500 }}>{applicantData.fullName}</span>
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Reason Selection Grid */}
          <Typography variant="subtitle2" fontWeight="bold" mb={2}>
            Select reason for decline <span style={{ color: 'red' }}>*</span>
          </Typography>
          
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.5} mb={4}>
            {reasons.map((reason) => (
              <Button
                key={reason}
                variant="outlined"
                onClick={() => setValue('reason', reason, { shouldValidate: true })}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  py: 1,
                  color: selectedReason === reason ? 'white' : 'text.secondary',
                  bgcolor: selectedReason === reason ? '#ef4444' : 'transparent', // Red when selected
                  borderColor: selectedReason === reason ? '#ef4444' : '#e5e7eb',
                  '&:hover': {
                    bgcolor: selectedReason === reason ? '#dc2626' : '#f9fafb',
                    borderColor: '#d1d5db'
                  }
                }}
              >
                {reason}
              </Button>
            ))}
          </Box>

          {/* Feedback Area */}
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
            Additional Feedback (Optional)
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
            This message will be send to the applicant to help them understand the decision
          </Typography>
          
          <Controller
            name="feedback"
            control={control}
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                minRows={4}
                placeholder="Bring additional context or specific information for rejection"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  outlineColor: '#3b82f6'
                }}
              />
            )}
          />

          {/* Action Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
            <Button 
              onClick={onClose} 
              variant="outlined" 
              sx={{ textTransform: 'none', borderColor: '#d1d5db', color: 'text.primary', fontWeight: 'bold' }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={!selectedReason}
              sx={{ 
                textTransform: 'none', 
                bgcolor: '#ff0000', 
                '&:hover': { bgcolor: '#cc0000' },
                fontWeight: 'bold'
              }}
            >
              Confirm Decline
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
    
    // const [totalapplications, setTotalApplications] = useState<number>(0)
    // const [pendingApplications, setPendingApplications] = useState<number>(0)
    // const [approvedApplications, setApprovedApplications] = useState<number>(0)
    // const [rejectedApplications, setRejectedApplications] = useState<number>(0)

    // const [recruiterApplications, setRecruiterApplications] = useState<RecruiterProfileData[] | null | undefined>(null)
    // const [search, setSearch] = useState<string>('')
    // const [profileStatus, setProfileStatus] = useState<string>('All')
    // const [error, setError] = useState<string>('')


    // const tileData = [
    //     {id:1, title:'Total Applications', count:totalapplications, icon: <BsFilter color="gray" />, customClass: 'bg-white border-gray-300', customTitleClass:'text-black'},
    //     {id:2, title:'Pending', count:pendingApplications, icon: <BsClock color="orange" />, customClass: 'bg-orange-100 border-orange-300', customTitleClass:'text-orange-500'},
    //     {id:3, title:'Approved', count:approvedApplications, icon: <BsCheckCircle color="green" />, customClass: 'bg-green-100 border-green-300', customTitleClass:'text-green-500'},
    //     {id:4, title:'Rejected', count:rejectedApplications, icon: <FaRegCircleXmark color="red" />, customClass: 'bg-red-100 border-red-300', customTitleClass:'text-red-500'}
    // ]

    // const navigate = useNavigate()

    // const searchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     //console.log(e.target.value)
    //     setSearch(e.target.value)
    // }

    // const debaouncedSearch = (fn: Function, delay: number) => {
    //     let timer: any
    //     return (...args: any) => {
    //         clearTimeout(timer)
    //         timer = setTimeout(() => {
    //             fn(...args)
    //         }, delay)
    //     }
    // }

    // const finalSearch = debaouncedSearch(searchValue, 600)

    // const goToApplicationDetailsPage = (applicationDetails: RecruiterProfileData) => {
    //     return navigate('/admin/recruiter/applications/details', {state: {applicationDetails}})
    // }

    // useEffect(() => {
    //     (async () => {
    //         //Notify.failure(search, {timeout:1000})
    //         try {
    //             const result = await loadRecruiterApplications(search, profileStatus)

    //             if(result?.success){
    //                 setRecruiterApplications(result?.result)
    //                 setTotalApplications(result?.result?.length)
    //                 setPendingApplications(result?.result?.filter((application: RecruiterProfileData) => application.profileStatus === 'pending').length)
    //                 setApprovedApplications(result?.result?.filter((application: RecruiterProfileData) => application.profileStatus === 'approved').length)
    //                 setRejectedApplications(result?.result?.filter((application: RecruiterProfileData) => application.profileStatus === 'rejected').length)
    //             }
    //         } catch (error: unknown) {
    //             Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:3000})
    //             setError('Oops!, Something went wrong please try again after some time')
    //         }
    //     })()
    // }, [search, profileStatus])

    // return (
    //     <div className="w-full min-h-screen p-5 lg:px-20">
    //         <p className="text-xl">Recruiter Applications</p>
    //         <div className="mt-3 text-sm font-light">Review and manage Recruiter applications</div>
    //         <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-4">
    //             {
    //                 tileData.map((data: any, index: number) => (
    //                     <ProfileStatusTileCard key={index} data={data} />
    //                 ))
    //             }
    //         </div>

    //         <div className="mt-5 bg-white p-3 border border-gray-200 grid grid-cols-1 lg:grid-cols-2 gap-3 rounded-md">
    //             <div className="border border-gray-300 rounded-md p-2 flex gap-2 items-center">
    //                 <BsSearch color="gray" />
    //                 <input onKeyUp={(event) => finalSearch(event)} type="text" className="flex-1 text-gray-500" placeholder="Search by recruiter name, company name, email" />
    //             </div>
    //             <div className="flex gap-2">
    //                 <button onClick={() => setProfileStatus('All')} className={`text-xs px-2 py-2 rounded-md ${profileStatus === 'All' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>All</button>
    //                 <button onClick={() => setProfileStatus('Pending')} className={`text-xs px-2 py-2 rounded-md ${profileStatus === 'Pending' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>Pending</button>
    //                 <button onClick={() => setProfileStatus('Approved')} className={`text-xs px-2 py-2 rounded-md ${profileStatus === 'Approved' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>Approved</button>
    //                 <button onClick={() => setProfileStatus('Rejected')} className={`text-xs px-2 py-2 rounded-md ${profileStatus === 'Rejected' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>Rejected</button>
    //                 {/* <button className="flex px-2 py-2 rounded-md text-white bg-green-600 items-center gap-2 text-xs">
    //                     <CiCircleCheck />
    //                     Bulk Approve
    //                 </button> */}
    //             </div>
    //         </div>
            
    //         <div className="overflow-x-auto w-full border border-gray-200 rounded-md mt-10">
    //             <table className="w-full min-w-[800px]">
    //             <thead className="bg-gray-50">
    //                 <tr>
    //                     <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Applicant</th>
    //                     <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Type</th>
    //                     <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Business Name</th>
    //                     <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Experience</th>
    //                     <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Focus</th>
    //                     <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Status</th>
    //                     <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Submitted</th>
    //                     <th className="text-sm px-4 py-3 font-medium text-gray-600 text-left whitespace-nowrap">Actions</th>
    //                 </tr>
    //             </thead>
    //             <tbody className="divide-y divide-gray-200">
    //                 {
    //                     recruiterApplications && 
    //                     recruiterApplications.length > 0 && (
    //                         recruiterApplications.map((recruiterAppliation: RecruiterProfileData, index) => (
    //                             <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
    //                                 <td className="px-4 py-3 align-middle whitespace-nowrap">
    //                                     <div>
    //                                         <p className="text-sm font-light">{recruiterAppliation.userProfile?.name}</p>
    //                                         <p className="text-xs text-gray-500 mt-1">{recruiterAppliation.userProfile.headline}</p>
    //                                     </div>
    //                                 </td>
    //                                 <td className="text-sm px-4 py-3 text-gray-700 align-middle whitespace-nowrap">{recruiterAppliation.employerType}</td>
    //                                 <td className="text-sm px-4 py-3 text-gray-700 align-middle whitespace-nowrap">
    //                                     {recruiterAppliation.employerType === 'company' ? recruiterAppliation.organizationDetails?.organizationName : 'NA'}
    //                                 </td>
    //                                 <td className="px-4 py-3 text-gray-700 text-sm align-middle whitespace-nowrap">{recruiterAppliation.recruitingExperience}</td>
    //                                 <td className="px-4 py-3 align-middle">
    //                                     <div className="flex flex-wrap gap-1">
    //                                         {
    //                                             recruiterAppliation.focusingIndustries?.map((industry: string, index: number) => (
    //                                                 <span key={index} className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{industry}</span>
    //                                             ))
    //                                         }
    //                                     </div>
    //                                 </td>
    //                                 <td className="px-4 py-3 align-middle whitespace-nowrap"><ApplicationStatusPills status={recruiterAppliation.profileStatus as string} /></td>
    //                                 <td className="px-4 py-3 text-sm text-gray-700 align-middle whitespace-nowrap">{formatDate(recruiterAppliation.createdAt)}</td>
    //                                 <td className="px-4 py-3 align-middle whitespace-nowrap">
    //                                     <div className="flex items-center gap-2">
                                            
    //                                                     <button onClick={() => goToApplicationDetailsPage(recruiterAppliation)}><BsEye color="blue" size={20} /></button>
    //                                                     {/* <button><CiCircleCheck color="green" size={20} /></button>
    //                                                     <button><FaRegCircleXmark color="red" /></button> */}
                                                
    //                                     </div>
    //                                 </td>
    //                             </tr>
    //                         ))
    //                     )
    //                 }
    //             </tbody>
    //         </table>
    //         </div>
        
    //     </div>
    // )
}