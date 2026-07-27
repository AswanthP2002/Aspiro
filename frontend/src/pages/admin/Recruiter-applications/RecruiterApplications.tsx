import { useEffect, useState } from "react"
import { BsClock, BsLinkedin } from "react-icons/bs"
import { FaEye, FaFileAlt, FaUsersSlash } from "react-icons/fa"
import { FaRegCircleXmark, FaUserTie } from "react-icons/fa6"
import { loadRecruiterApplications, changeStatusToUnderReview, rejectRecruiterApplication, approveRecruiterApplication } from "../../../services/recruiterServices"
import { loadRecruiterAppicationDetails } from "../../../services/adminServices"
import { AdminRecruiterApplicationDetailsData, AdminRecruiterApplicationsData, RecruiterProfileData } from "../../../types/entityTypes"
import { Notify } from "notiflix"
import { Box, Button, IconButton, Modal, Skeleton, TextareaAutosize, Typography } from "@mui/material"
import { formatRelativeTime } from "../../../services/util/formatDate"
import { useNavigate } from "react-router-dom"
import ViewPDFDocument from "../../../components/common/PdfViewer"
import { Controller, useForm } from "react-hook-form"
import { CgClose } from "react-icons/cg"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

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
    const [totalPages, setTotalPages] = useState(0)
    const [isVerificationDocumentOpened, setIsVerificationDocuemtnOpened] = useState(false)
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [applicationSelect, setApplicationSelect] = useState(false)
    const navigate = useNavigate()

    const openRejectModal = () => setIsRejectModalOpen(true)
    const closeRejectModal = () => setIsRejectModalOpen(false)

    const openVerificationDocuemtn = () => setIsVerificationDocuemtnOpened(true)

    const onRejectApplication = () => {
      toast.success('Rejected')
      setRecruiterApplications((prv: AdminRecruiterApplicationsData[] | null) => {
        if(!prv) return null
        return prv.filter((app: AdminRecruiterApplicationsData) => app._id !== selectedApp?._id)
      })
      setSelectedApp(null)
      setApplicationSelect(false)
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
         try {
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
             })
           }
         } catch (error: unknown) {
              console.log('Error occured while approving recruiter application', error)
              toast.error(error instanceof Error ? error.message : 'Something went wrong')
         } finally {
          setRecruiterApplications((prv: AdminRecruiterApplicationsData[] | null) => {
                 if(!prv) return null
                 return prv.filter((app: AdminRecruiterApplicationsData) => app._id !== applicationId)
               })
               setSelectedApp(null)
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
  const [selectedApp, setSelectedApp] = useState<AdminRecruiterApplicationDetailsData | null>(null)

  const selectAnApplication = async (application: AdminRecruiterApplicationsData) => {
    //setSelectedApp(application)
    setApplicationSelect(true)
    setLoading(true)
    if(application.profileStatus === 'pending') {
      try {
        const result: RecruiterApplicationUpdateResponsePayload = await changeStatusToUnderReview(application._id as string)
        if(result.success){
          toast.info('Application is currently under review')
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

    try {
      const selectedApplicationDetails = await loadRecruiterAppicationDetails(application._id as string)
      if(selectedApplicationDetails.success){
        setSelectedApp(selectedApplicationDetails.result)
      }else{
        setSelectedApp(null)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch recruiter application details')
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    }
  }

  useEffect(() => {
        (async () => {
            //Notify.failure(search, {timeout:1000})
            try {
                const result: RecruiterApplicationsFetchResponsePayload = await loadRecruiterApplications(page, 7)

                if(result?.success){
                  console.log('applications list', result.result.applications)
                    setRecruiterApplications(result?.result.applications)
                    setTotalPages(result.result.totalPages)
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
          <p className="font-semibold text-lg text-gray-900 tracking-wide">Pending Applications</p>
          <p className="text-sm text-gray-500">{recruiterApplications?.length} Applications awaiting review</p>
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
        {applicationSelect && (
          <>
            <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              {loading ? <Skeleton width={250} /> : <h1 className="text-2xl font-semibold tracking-wide text-gray-900">{selectedApp?.fullName}</h1>}
              {loading ? <Skeleton height={15} /> : <p className="text-gray-700 mt-1 text-sm">{selectedApp?.email}</p>}
              {loading ? <Skeleton sx={{marginTop: '10px'}} width={150} height={10} /> : <p className="text-xs text-gray-500 mt-2">Submitted {formatRelativeTime(selectedApp?.createdAt || new Date())}</p>}
            </div>
            {!loading && <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded">
                {selectedApp?.profileStatus}
            </span>}
          </div>

          {/* Profile Links */}
          {loading
            ? <Skeleton height={250} />
            : <>
                <div className="bg-white rounded-xl border border-slate-100 shadow-xl p-6 mb-6">
            <p className="font-semibold uppercase mb-4 text-gray-900">Profile Links</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="bg-blue-600 p-2 rounded text-white"><BsLinkedin size={20} /></div>
                <div className="overflow-hidden">
                  <a href={selectedApp?.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold">LinkedIn Profile</a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                <div className={`p-2 rounded text-white ${'blue'}`}><FaUserTie size={20} color="blue" /></div>
                <div className="overflow-hidden">
                  <button onClick={() => navigate(`/admin/users/details/${selectedApp?.userProfile?._id}`)} className="text-xs font-bold">Inspect full profile</button>
                </div>
              </div>
            </div>
          </div>
              </>
          }

          {/* Info Card */}
          {loading
            ? <Skeleton />
            : <>
                <div className="bg-white rounded-xl border border-slate-100 shadow-xl p-6 mb-10">
            <p className="uppercase tracking-wide font-semibold mb-6 text-gray-900">{selectedApp?.recruiterType} Information</p>
            
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
              </>
          }

          {loading
            ? <Skeleton />
            : <>
                <div className="mt-5 bg-white border border-slate-100 rounded-xl shadow-xl p-5">
            <p className="font-semibold uppercase tracking-wide text-gray-900">Verification Document</p>
            <div className="grid grid-cols-2 gap-2 mt-3 cursor-pointer">
              <div className="border flex justify-between items-center gap-2 border-gray-200 rounded-md p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-300"><FaFileAlt color="white" /></div>
                    <p onClick={openVerificationDocuemtn} className="text-sm font-medium">{selectedApp?.verificationDocument?.publicId?.split("/")[2].split(" ")[0]}</p>
                  </div>
                  <div>
                    <button onClick={openVerificationDocuemtn}><FaEye color="blue" /></button>
                  </div>
              </div>
            </div>
          </div>
              </>
          }

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8 pt-8 border-t border-gray-100">
            {loading
              ? <Skeleton width={100} height={50} />
              : <button onClick={openRejectModal} className="px-6 py-2.5 border border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-50 transition-colors">
                  Reject with reason
                </button>
            }
            {loading
              ? <Skeleton width={100} height={50} />
              : <button onClick={() => onApproveApplication(selectedApp?._id as string)} className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
                  Verify & Approve Recruiter
                </button>
            }
          </div>
        </div>
          </>
        )}
        {!selectedApp && (
          <>
            <div className="bg-white p-5 flex flex-col py-10 items-center rounded-lg border border-slate-100 shadow-xl">
              <FaUsersSlash className="text-gray-400" size={45} />
              <p className="font-semibold text-lg mt-2 text-gray-900 tracking-wide">No Selected Application</p>
              {applications.length > 0 && (<p className="text-sm text-gray-700 mt-2">select one application for view details</p>)}
              <p className="text-xs !mt-2 text-gray-500">Application details will show here</p>
            </div>
          </>
        )}
      </div>
    </div>
    {isVerificationDocumentOpened && (
      <Modal className="flex items-center justify-center" open={isVerificationDocumentOpened}>
                                  <div className="bg-white rounded-lg max-h-[90vh] overflow-auto outline-none p-4 w-full max-w-4xl">
                                      <div className="flex justify-end sticky top-0 z-50 mb-2">
                                          <button onClick={() => setIsVerificationDocuemtnOpened(false)} className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100"><CgClose /></button>
                                      </div>
                                      <div className="flex justify-center">
                                          <ViewPDFDocument
                                              fileUrl={selectedApp?.verificationDocument?.url as string}
                                              docWidth={700}
                                          />
                                      </div>
                                  </div>
                              </Modal>
    )}

    {isRejectModalOpen && (
      <DeclineApplicationModal isOpen={isRejectModalOpen} onClose={closeRejectModal} applicantData={selectedApp as RecruiterProfileData} onConfirmDecline={onRejectApplication} />
    )}


    </>
  );


function DeclineApplicationModal({ isOpen, onClose, applicantData, onConfirmDecline }: Props) {
  const { control, handleSubmit, watch, setValue } = useForm<DeclineFormInputs>({
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
        })
      }
    } catch (error: unknown) {
      console.log(error)
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      onConfirmDecline()
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
}