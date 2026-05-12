import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getRecruiterDetails, handleRecruiterVerification, handleRecruiterPermissions, manageRecruiterPermissions } from '../../../services/recruiterServices'
import { deleteRecruiterData } from '../../../services/adminServices'
import { BiArrowBack, BiBriefcase, BiCheckCircle, BiMessageSquare } from 'react-icons/bi'
import { LuBuilding2, LuShieldAlert, LuUser, LuX } from 'react-icons/lu'
import { AdminRecruiterDetailsData } from '../../../types/entityTypes'
import {TbBrandDaysCounter} from 'react-icons/tb'
import { Notify } from 'notiflix'
import moment from 'moment'
import { BsLinkedin, BsTrash2 } from 'react-icons/bs'
import { Modal, Box, Typography, Divider, Button } from '@mui/material'
import { FiAlertTriangle, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { IoWarning } from 'react-icons/io5'


export default function RecruiterDetails(){
  const location = useLocation()
  const {recruiterId} = location.state || {}
  const navigate = useNavigate()
  const [recruiterDetails, setRecruiterDetails] = useState<AdminRecruiterDetailsData | null>(null)
  const [isWarningModalOpened, setIsWarningModalOpened] = useState(false)
  const [isRevocationModalOpened, setIsRevocationModalOpened] = useState(false)


  const openWarningModal = () => setIsWarningModalOpened(true)
  const closeWarningModal = () => setIsWarningModalOpened(false)


  const handleRevokeVerification = (recruiterId: string, action: "Verified" | "Revoked") => {
    if(!recruiterId) return

    Swal.fire({
        icon: "question",
        title: "Revoke Verification?",
        showConfirmButton: true,
        confirmButtonText: "Revoke",
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false
    }).then(async (response) => {
        if(response.isConfirmed){
            try {
                const result = await handleRecruiterVerification(recruiterId, action)
                if(result?.success){
                    toast.success('Recruiter verification Revoked')
                    setRecruiterDetails((prv: AdminRecruiterDetailsData | null) => {
                        if(!prv) return null
                        return {
                            ...prv,
                            isVerified: false,
                            verificationTimeline: result?.result?.verificationTimeline
                        }
                    })
                }
            } catch (error: unknown) {
                toast.error(error instanceof Error ? error.message : 'Something went wrong')
            }
        }
    })
  };

  const handleUnRevokeRecruiter = (recruiterId: string, action: "Verified" | "Revoked") => {
    if(!recruiterId) return

    Swal.fire({
        icon: "question",
        title: "UnRevoke Verification?",
        showConfirmButton: true,
        confirmButtonText: "UnRevoke",
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false
    }).then(async (response) => {
        if(response.isConfirmed){
            try {
                const result = await handleRecruiterVerification(recruiterId, action)
                if(result?.success){
                    toast.success('Verification Unrevoked')
                    setRecruiterDetails((prv: AdminRecruiterDetailsData | null) => {
                        if(!prv) return null
                        return {
                            ...prv,
                            isVerified: true,
                            verificationTimeline: result?.result?.verificationTimeline
                        }
                    })
                }
            } catch (error: unknown) {
               toast.success(error instanceof Error ? error.message : 'Something went wrong')
            }
        }
    })
  };

  const handleMoveCompany = () => {
    console.log("Trigger API: Move to Different Company");
  };
  
  const openHandleRecruiterPermissionsModal = () => {
    setIsRevocationModalOpened(true)
  }

  const handleRevokePermissions = (recruiterId: string, action: "Revoke" | "Un-Revoke") => {
        if(!recruiterId) return

    Swal.fire({
        icon: "question",
        title: "Revoke Permissions?",
        showConfirmButton: true,
        confirmButtonText: "Revoke",
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false
    }).then(async (response) => {
        if(response.isConfirmed){
            try {
                const result = await handleRecruiterPermissions(recruiterId, action)
                if(result?.success){
                    toast.success('Permissions Revoked')
                    setRecruiterDetails((prv: AdminRecruiterDetailsData | null) => {
                        if(!prv) return null
                        return {
                            ...prv,
                            isPermissionRevoked: true,
                        }
                    })
                }
            } catch (error: unknown) {
                toast.error(error instanceof Error ? error.message : 'somethng went wrong')
            }
        }
    })
  };

  const onManagingPermissions = (updatedRecruiterData: Partial<AdminRecruiterDetailsData>) => {
    setRecruiterDetails((prv: AdminRecruiterDetailsData | null) => {
      if(!prv) return null
      return {
        ...prv,
        isAllJobsHidden: updatedRecruiterData.isAllJobsHidden,
        allowPostJobs: updatedRecruiterData.allowPostJobs,
        allowEditJobs: updatedRecruiterData.allowEditJobs,
        allowDeletePosts: updatedRecruiterData.allowDeletePosts,
        allowManageApplications: updatedRecruiterData.allowManageApplications,
        allowScheduleInterviews: updatedRecruiterData.allowScheduleInterviews
      }
    })
  }

//permission verification -> left

  const handleUnRevokePermisson = (recruiterId: string, action: "Revoke" | "Un-Revoke") => {
        if(!recruiterId) return

    Swal.fire({
        icon: "question",
        title: "Un Revoke Permissions?",
        showConfirmButton: true,
        confirmButtonText: "Un Revoke",
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false
    }).then(async (response) => {
        if(response.isConfirmed){
            try {
                const result = await handleRecruiterPermissions(recruiterId, action)
                if(result?.success){
                    toast.success('Permissions Un Revoked')
                    setRecruiterDetails((prv: AdminRecruiterDetailsData | null) => {
                        if(!prv) return null
                        return {
                            ...prv,
                            isPermissionRevoked: false,
                        }
                    })
                }
            } catch (error: unknown) {
                toast.error(error instanceof Error ? error.message : 'somethng went wrong')
            }
        }
    })
  };


  const deleteThisRecruiterData = async (recruiterId: string) => {
    if(!recruiterId) return
    const confirmDelete = await Swal.fire({
      icon: 'question',
      title: 'Delete this recruiter?',
      text: 'Are you sure to delete this recruiter data?. This action can not be redo and it will clear all data related to the recruiter',
      showConfirmButton: true,
      confirmButtonText: 'Delete',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen:() => {
        const container = Swal.getContainer()
        if(container){
          container.style.zIndex = '99999'
        }
      }
    })

    if(!confirmDelete.isConfirmed || confirmDelete.isDismissed) return

    try {
      const deleteResult = await toast.promise(
        deleteRecruiterData(recruiterId),
        {
          pending: 'Deleting recruiter...',
          success: 'Deleted',
          error:{
            render(props) {
              const data = props.data as AxiosError<{message: string}>
              return data.message
            },
          }
        }
      )
      if(deleteResult?.success){
        setTimeout(() => {
        navigate(-1)
      }, 2000)
      }else{
        toast.error('Can not delete recruiter now')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    }
  }


      useEffect(() => {

        async function fetchCompanyDetails(){
            try {
                 const result = await getRecruiterDetails(recruiterId)
                console.log('-- result from the server --', result)
                if(result?.success){
                    setRecruiterDetails(result?.result)
                    if(result.result.isOrphan){
                      openWarningModal()
                    }else{
                      closeWarningModal()
                    }
                    console.log('recruiter details from the server', result?.result)
                    // Notify.success(result?.message)
                }
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'something went wrong')
            }
        }        
        fetchCompanyDetails()

    }, [])

  return (
    <>
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans text-slate-900">
      {/* Back Navigation */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-medium">
        <BiArrowBack size={18} />
        Back to Recruiters
      </button>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        
        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* 1. Profile Header Card */}
          <div className="bg-white rounded-lg border border-slate-100 p-8 flex flex-col gap-6 shadow-[0_0_30px_2px_rgba(200,0,200,0.1)]">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {recruiterDetails && recruiterDetails.fullName?.split(" ")[0][0]}{recruiterDetails && recruiterDetails.fullName?.split(" ")[1][0]}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-semibold tracking-wide">{recruiterDetails?.fullName}</h1>
                {recruiterDetails?.isVerified
                    ? <>
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded uppercase">
                            <BiCheckCircle size={12} /> Verified
                        </span>
                      </>
                    : <>
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded uppercase">
                            <BiCheckCircle size={12} /> Not Verified
                        </span>
                      </>
                }
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 text-[10px] font-bold rounded uppercase">
                  {recruiterDetails?.recruiterType}
                </span>
              </div>
              <p className="text-slate-500 text-sm">{recruiterDetails?.email}</p>
              <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                <LuBuilding2 />
                {recruiterDetails?.companyDetails?.name}
              </p>
            </div>
          </div>

          {/* 2. Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<BiBriefcase size={22} className="text-blue-500" />} label="Active Jobs" value={recruiterDetails?.totalJobs} color="bg-blue-50" />
            <StatCard icon={<BiMessageSquare size={22} className="text-green-500" />} label="Posts" value={recruiterDetails?.activeJobs} color="bg-green-50" />
            <StatCard icon={<LuUser size={22} className="text-purple-500" />} label="Applications" value={recruiterDetails?.totalApplications} color="bg-purple-50" />
          </div>
          
           <div className="bg-white rounded-lg border border-slate-100 p-8 shadow-[0_0_30px_2px_rgba(200,0,200,0.1)]">
            <p className="font-semibold text-lg uppercase text-gray-700 tracking-wide mb-6">Details</p>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className='flex gap-3 items-center border border-slate-200 rounded-lg p-3'>
                <TbBrandDaysCounter color='blue' size={25} />
                <div>
                  <p className='text-sm font-semibold turncate text-gray-600'>Experience in years</p>
                  <p className='text-sm mt-1 text-gray-500'>{recruiterDetails?.yearOfExperience}</p>
                </div>
              </div>
              <div className='flex gap-3 items-center border border-slate-200 rounded-lg p-3'>
                <BsLinkedin color='blue' size={25} />
                <div>
                  <p className='text-sm font-semibold turncate text-gray-600'>LinkedIn</p>
                  <a href={recruiterDetails?.linkedinUrl} target='_blank' rel='noopener noreferrer' className='text-sm mt-1 text-underline text-blue-500'>LikedIn.com</a>
                </div>
              </div>
              {recruiterDetails?.recruiterType === 'corporate' && (
                <div className='flex gap-3 items-center border border-slate-200 rounded-lg p-3'>
                <LuBuilding2 color='blue' size={25} />
                <div>
                  <p className='text-sm font-semibold turncate text-gray-600'>Company</p>
                  <p className='text-sm mt-1 text-gray-500'>{recruiterDetails?.companyDetails?.name}</p>
                </div>
              </div>
              )}
            </div>
           </div>



          {/* 3. Verification History Card */}
          <div className="bg-white rounded-lg border border-slate-100 p-8 shadow-[0_0_30px_2px_rgba(200,0,200,0.1)]">
            <p className="font-semibold text-lg mb-6 uppercase text-gray-700 tracking-wide">Verification History</p>
            <div className="space-y-4">
              {recruiterDetails?.verificationTimeline && recruiterDetails?.verificationTimeline.map((item, idx) => (
                <div key={idx} className={`flex items-center justify-between p-4 bg-${item.action === 'Verified' ? "green" : "red"}-50 border-l-4 border-l-${item.action === 'Verified' ? "green" : "red"}-500 rounded-r-lg`}>
                  <div>
                    <p className={`${item.action === 'Verified' ? "text-green-800" : "text-red-800"} font-semibold text-sm`}>{item.action}</p>
                    <p className={`${item.action === 'Verified' ? "text-green-800" : "text-red-800"} font-normal text-xs`}>by: {item.actor}</p>
                  </div>
                  <span className="text-slate-400 text-xs font-medium">{moment(recruiterDetails?.updatedAt).format("MMM DD YYYY")}</span>
                </div>
              ))}
              {recruiterDetails?.verificationTimeline?.length === 0 && (
                <div>
                  <p className='text-center text-sm text-gray-600 italic'>No History found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white rounded-lg border border-slate-100 p-6 shadow-[0_0_30px_2px_rgba(200,0,200,0.1)]">
            <p className="font-semibold text-lg mb-6 uppercase text-gray-700 tracking-wide">Actions</p>
            
            <div className="flex flex-col gap-3 mb-8">
              {recruiterDetails?.isVerified
                    ? <>
                        <ActionButton 
                onClick={() => handleRevokeVerification(recruiterDetails?._id as string, "Revoked")}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100"
              >
                Revoke Verification
              </ActionButton>
                     </>
                   : <>
                        <ActionButton 
                onClick={() => handleUnRevokeRecruiter(recruiterDetails?._id as string, "Verified")}
                className="bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-100"
              >
                Un Revoke Verification
              </ActionButton>
                    </>
              }
              
              {!recruiterDetails?.isOrphan && (
                <button 
                onClick={handleMoveCompany} 
                className="bg-gray-200 text-gray-400 p-2 rounded-md !cursor-not-allowed shadow-md shadow-indigo-100">
                    Move to different Company
             </button>
              )}
              
              {
                !recruiterDetails?.isOrphan && recruiterDetails?.isPermissionRevoked
                    ? <>
                        <ActionButton 
                onClick={() => handleUnRevokePermisson(recruiterDetails?._id as string, "Un-Revoke")}
                className="bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-100"
              >
                Un Revoke Recruiter Permissions
              </ActionButton>
                      </>
                    : (!recruiterDetails?.isOrphan
                        ? <ActionButton 
                onClick={openHandleRecruiterPermissionsModal}
                className="bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-100"
              >
                Manage Recruiter Permissions
              </ActionButton>
                    : null
                    )
              }

              {recruiterDetails?.isOrphan && (
                <ActionButton
                onClick={() => deleteThisRecruiterData(recruiterDetails._id as string)}
                  className="bg-white border border-red-500 ring-1 ring-red-500 text-red-500"
                >
                  Delete Record
                </ActionButton>
              )}
            </div>

            <hr className="border-slate-100 mb-6" />

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-900">Account Info</h3>
              <InfoRow label="Joined" value={moment(recruiterDetails?.createdAt).format("MMM DD YYYY")} />
              <InfoRow label="Type" value={recruiterDetails?.recruiterType} />
              {
                recruiterDetails?.isVerified
                    ? <InfoRow label="Status" value={'Verified'} color="text-green-600" />
                    : <InfoRow label="Status" value={'Not Verified'} color="text-red-600" />
              }
            </div>
          </div>
        </div>

      </div>
    </div>
    {(recruiterDetails && isWarningModalOpened ) && (
      <TestModal open={isWarningModalOpened} recruiter={recruiterDetails} onClose={closeWarningModal} onDelete={() => deleteThisRecruiterData(recruiterDetails._id as string)} />
    )}

    {(recruiterDetails && isRevocationModalOpened) && (
      <RevokeRecruiterPermissionsModal recruiterData={recruiterDetails} revocationModalOpen={isRevocationModalOpened} closeRevocationModal={() => setIsRevocationModalOpened(false)} recruiterId={recruiterDetails._id as string} onManagingRecruiterPermissions={onManagingPermissions} />
    )}
    </>
  );
};

// --- Sub-Components for Clean Code ---

const StatCard = ({ icon, label, value, color }: {icon: React.ReactNode, label: string, value: string | number | undefined, color: string}) => (
  <div className="bg-white rounded-lg border border-slate-100 p-8 text-center shadow-[0_0_30px_2px_rgba(200,0,200,0.1)] flex flex-col items-center">
    <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <p className="text-2xl font-bold mb-1">{value}</p>
    <p className="text-slate-400 text-sm font-medium">{label}</p>
  </div>
);

const ActionButton = ({ children, className, onClick }: {children: React.ReactNode, className: string, onClick: () => void}) => (
  <button 
    onClick={onClick}
    className={`w-full py-3 rounded-lg text-sm font-bold transition-all active:scale-[0.98] ${className}`}
  >
    {children}
  </button>
);

const InfoRow = ({ label, value, color = "text-slate-900" }: {label: string, value: string | number | undefined, color: string}) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-slate-400 font-medium">{label}</span>
    <span className={`font-bold ${color}`}>{value}</span>
  </div>
);

function TestModal({open, onClose, recruiter, onDelete}: {open: boolean, onClose: () => void, recruiter: AdminRecruiterDetailsData, onDelete: () => void}){
  return(
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="orphaned-profile-title"
      className="flex items-center justify-center p-4"
    >
      <Box className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl outline-none overflow-hidden">
        
        {/* Close Button - top right */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
        >
          <FiX size={20} />
        </button>

        {/* Header Section */}
        <div className="p-6 pb-0 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-4 border border-amber-100">
            <FiAlertTriangle className="text-amber-500 w-8 h-8" />
          </div>
          <Typography id="orphaned-profile-title" variant="h6" className="font-bold text-slate-900">
            Orphaned Recruiter Profile
          </Typography>
          <Typography className="text-slate-500 text-sm mt-1">
            The linked user account no longer exists in the system.
          </Typography>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-5">
          {/* Target Profile Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recruiter Identity</p>
              <p className="font-semibold text-slate-800">{recruiter.fullName || 'Unidentified Profile'}</p>
            </div>
            <div className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded uppercase">
              No User Link
            </div>
          </div>

          {/* Action Options */}
          <div className="grid grid-cols-1 gap-3">
            <p className="text-xs font-bold text-slate-400 uppercase ml-1"> preferred Administrative Actions</p>
            
            {/* Suspend Option */}
            <button 
              //onClick={() => onAction('suspend')}
              className="group flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/30 transition-all text-left"
            >
              <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100">
                <LuShieldAlert className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Revoke Verification</p>
                <p className="text-xs text-slate-500">Keep data but hide all job listings.</p>
              </div>
            </button>

            {/* Reassign Option */}
            {/* <button 
              //onClick={() => onAction('relink')}
              className="group flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50/30 transition-all text-left"
            >
              <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100">
                <GiSuspicious className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Flag Account</p>
                <p className="text-xs text-slate-500">Mark this recruiter as flagged. Keeps the jobs for users marked as flagged</p>
              </div>
            </button> */}
          </div>
        </div>

        {/* Footer Actions */}
        <Divider />
        <div className="bg-slate-50/80 p-4 px-6 flex items-center justify-between gap-3">
          <Button 
            onClick={onDelete}
            startIcon={<BsTrash2 size={16} />}
            className="text-red-600 hover:bg-red-50 capitalize font-bold text-sm"
          >
            Delete Record
          </Button>
          
          <Button 
            onClick={onClose}
            variant="contained"
            disableElevation
            className="bg-slate-800 hover:bg-slate-900 capitalize px-6 rounded-lg text-sm"
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

const RevokeRecruiterPermissionsModal = ({recruiterData, revocationModalOpen, closeRevocationModal, recruiterId, onManagingRecruiterPermissions}: {recruiterData: AdminRecruiterDetailsData, revocationModalOpen: boolean, closeRevocationModal: () => void, recruiterId: string, onManagingRecruiterPermissions: (data: Partial<AdminRecruiterDetailsData>) => void}) => {
  
  const [isAllJobHidden, setIsAllJobHidden] = useState<boolean>(false)
  const [allowPostingJobs, setAllowPostingJobs] = useState<boolean>(true)
  const [allowEditingJobs, setAllowEditingJobs] = useState<boolean>(true)
  const [allowDeletingJobs, setAllowDeletingJobs] = useState<boolean>(true)
  const [allowManagingApplications, setAllowManagingApplications] = useState<boolean>(true)
  const [allowSchedulingInterviews, setAllowSchedulingInterviews] = useState<boolean>(true)

  const revokeRecruiterPermission = async (recruiterId: string) => {
    const conformation = await Swal.fire({
      icon: 'question',
      title: 'Confirm Changes?',
      text: 'Are you sure to confirm to update recruiter permissions?',
      showConfirmButton: true,
      confirmButtonText: 'Confirm',
      showCancelButton: true,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        const container = Swal.getContainer()
        if(container) {
          container.style.zIndex = '9999'
        }
      }
    })

    if(!conformation.isConfirmed) return

    try {
      const result = await manageRecruiterPermissions(
        recruiterId, 
        isAllJobHidden, 
        allowPostingJobs, 
        allowEditingJobs, 
        allowDeletingJobs, 
        allowManagingApplications, 
        allowSchedulingInterviews
      )

      if(result.success){
        toast.success('Permissions Updated')
        onManagingRecruiterPermissions({
          isAllJobsHidden: result.result.isAllJobsHidden,
          allowPostJobs: result.result.allowPostJobs,
          allowEditJobs: result.result.allowEditJobs,
          allowDeletePosts: result.result.allowDeletePosts,
          allowManageApplications: result.result.allowManageApplications,
          allowScheduleInterviews: result.result.allowScheduleInterviews
        })
      }
      
  //     isAllJobsHidden?: boolean;
  // allowPostJobs?: boolean;
  // allowEditJobs?: boolean;
  // allowDeletePosts?: boolean;
  // allowManageApplications?: boolean;
  // allowScheduleInterviews?: boolean;
      
    } catch (error: unknown) {
      const err = error as AxiosError<{message: string}>
      const finalMesage = err.response?.data.message || err.message || 'Something went wrong'
      toast.error(finalMesage)
    }

  }

  useEffect(() => {
    console.log('-- checking recruiter data --', recruiterData)
    if(recruiterData){
      setIsAllJobHidden(recruiterData.isAllJobsHidden as boolean)
      setAllowPostingJobs(recruiterData.allowPostJobs as boolean)
      setAllowEditingJobs(recruiterData.allowEditJobs as boolean)
      setAllowDeletingJobs(recruiterData.allowEditJobs as boolean)
      setAllowManagingApplications(recruiterData.allowManageApplications as boolean)
      setAllowSchedulingInterviews(recruiterData.allowScheduleInterviews as boolean)
    }
  }, [recruiterData])



  return(
    <>
      <Modal className='flex flex-col items-center justify-center' open={revocationModalOpen} onClose={closeRevocationModal}>
          <div className='bg-white rounded-lg shadow-xl w-md lg:w-2xl'>
              <div className="header flex items-center transition-all duration-300 gap-3 p-5 lg:p-5 bg-amber-50 rounded-t-lg">
                <div className='flex-1 flex gap-3'>
                  <div className='bg-red-700 text-white w-10 h-10 flex items-center justify-center rounded-full'>
                    <IoWarning size={22} />
                  </div>
                  <div>
                    <p className='font-semibold text-xl text-gray-900'>Manage Recruiter Permissions</p>
                    <p className='mt-1 text-xs text-gray-700'>This action will decide the controls & permissions of a recriuiter.</p>
                  </div>
                </div>
                <div>
                  <button onClick={closeRevocationModal}><LuX size={18} className='text-gray-700' /></button>
                </div>
              </div>
              <div className="bg-white p-5 lg:p-10 max-h-[600px] overflow-y-auto">
                  <div className="border-2 border-slate-300 rounded-lg p-3 bg-gray-100 shadow-[0_0_30px_2px_rgba(100,0,200,0.1)] flex justify-between">
                    <div>
                      <p className='text-xs font-medium text-gray-600'>Revoking Permissions for</p>
                      <p className='font-semibold text-gray-900 mt-1'>{recruiterData?.fullName}</p>
                    </div>
                    <div>
                      <p className='text-xs font-medium text-gray-600'>Active jobs</p>
                      <p className='text-red-600 font-semibold mt-1 text-center'>12</p>
                    </div>
                  </div>
                  <div className="mt-5 bg-orange-500 ps-1">
                      <div className='bg-amber-50 p-3 flex gap-2'>
                        <div>
                          <IoWarning size={22} className='text-orange-800' />
                        </div>
                        <div>
                          <p className='font-semibold text-sm text-orange-800'>Important Decision Required</p>
                          <p className='text-xs text-orange-700 mt-2 leading-relaxed'>The recruiter has 12 active job postings. You must decide what happens to these listing</p>
                        </div>
                      </div>
                  </div>

                  <div className="mt-5">
                    <p className='font-semibold text-sm text-gray-900'>What should happen to their active jobs?</p>
                    <div className="mt-3 border-2 border-slate-200 rounded-lg p-3 flex gap-3">
                      <div>
                        <input checked={isAllJobHidden} onChange={() => setIsAllJobHidden(prv => !prv)} type="checkbox" />
                      </div>
                      <div>
                        <p className='font-semibold text-sm'>Hide All Jobs</p>
                        <p className='mt-2 text-xs font-medium text-gray-700 leading-relaxed'>Immediately hide all 12 job posting from the post.
                          Jobs will not be visible to users. Recommended for security issues
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className='font-semibold text-gray-900'>Permissions</p>
                    <ul className="mt-3 space-y-2">
                      <li className='flex items-center gap-3'>
                        <input checked={allowPostingJobs} onChange={() => setAllowPostingJobs(prv => !prv)} type="checkbox" />
                        <p className='text-sm font-medium text-gray-700'>Allow post new jobs</p>
                      </li>
                      <li className='flex items-center gap-3'>
                        <input checked={allowEditingJobs} onChange={() => setAllowEditingJobs(prv => !prv)} type="checkbox" />
                        <p className='text-sm font-medium text-gray-700'>Allow edit existing jobs</p>
                      </li>
                      <li className='flex items-center gap-3'>
                        <input checked={allowDeletingJobs} onChange={() => setAllowDeletingJobs(prv => !prv)} type="checkbox" />
                        <p className='text-sm font-medium text-gray-700'>Allow delete existing jobs</p>
                      </li>
                      {/* <li className='flex items-center gap-3'>
                        <input type="checkbox" />
                        <p className='text-sm font-medium text-gray-700'>Deny posting jobs</p>
                      </li> */}
                      <li className='flex items-center gap-3'>
                        <input checked={allowManagingApplications} onChange={() => setAllowManagingApplications(prv => !prv)} type="checkbox" />
                        <p className='text-sm font-medium text-gray-700'>Allow Managing applications</p>
                      </li>
                      <li className='flex items-center gap-3'>
                        <input checked={allowSchedulingInterviews} onChange={() => setAllowSchedulingInterviews(prv => !prv)} type="checkbox" />
                        <p className='text-sm font-medium text-gray-700'>Allow Scheduling interviews</p>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5 p-5 border rounded-lg border-blue-300 ring-2 ring-blue-100 bg-blue-50">
                        <p className='font-semibold text-blue-700 text-sm'>What happens after revoking : </p>
                        <ul className="mt-3 space-y-2">
                          {/* <li className='text-xs'>Verification badge will be removed</li> */}
                          {isAllJobHidden && (<li className='text-xs'>Hide all exisitng jobs</li>)}
                          {!allowPostingJobs && (<li className='text-xs'>Can not post new jobs</li>)}
                          {!allowEditingJobs && (<li className='text-xs'>Can not edit existing jobs</li>)}
                          {!allowDeletingJobs && (<li className='text-xs'>Can not delete existing jobs manually</li>)}
                          {!allowManagingApplications && (<li className='text-xs'>Can not manage job applications</li>)}
                          {!allowSchedulingInterviews && (<li className='text-xs'>Can not schedule interview</li>)}
                        </ul>
                  </div>
                  <div className="mt-8 flex justify-end gap-3">
                    <button className='border border-slate-300 rounded-lg p-3 text-sm font-semibold text-gray-700'>Cancel</button>
                    <button onClick={() => revokeRecruiterPermission(recruiterId)} className='border border-transparent bg-red-600 p-3 rounded-lg text-sm font-semibold text-white shadow-xl shadow-red-300 transition-color duration-300 hover:bg-red-400'>Confirm Updates</button>
                  </div>
              </div>
          </div>
      </Modal>
    </>
  )
}