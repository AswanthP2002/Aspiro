import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getRecruiterDetails, handleRecruiterVerification, handleRecruiterPermissions } from '../../../services/recruiterServices'
import { deleteRecruiterData } from '../../../services/adminServices'
import { BiArrowBack, BiBriefcase, BiBuildings, BiCheckCircle, BiMessageSquare, BiUserPlus } from 'react-icons/bi'
import { LuShieldAlert, LuUser } from 'react-icons/lu'
import { AdminRecruiterDetailsData } from '../../../types/entityTypes'
import {TbBrandDaysCounter} from 'react-icons/tb'
import { Notify } from 'notiflix'
import moment from 'moment'
import { BsLinkedin, BsTrash2 } from 'react-icons/bs'
import { Modal, Box, Typography, Divider, Button } from '@mui/material'
import { FiAlertTriangle, FiX } from 'react-icons/fi'
import { FaFlag } from 'react-icons/fa'
import { GiSuspicious } from 'react-icons/gi'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'


export default function RecruiterDetails(){
  const location = useLocation()
  const {recruiterId} = location.state || {}
  const navigate = useNavigate()
  const [recruiterDetails, setRecruiterDetails] = useState<AdminRecruiterDetailsData | null>(null)
  const [isWarningModalOpened, setIsWarningModalOpened] = useState(false)

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
          <div className="bg-white rounded-xl border border-slate-200 p-8 flex items-center gap-6 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {recruiterDetails && recruiterDetails.fullName?.split(" ")[0][0]}{recruiterDetails && recruiterDetails.fullName?.split(" ")[1][0]}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-semibold">{recruiterDetails?.fullName}</h1>
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
              <p className="text-slate-400 text-sm mt-1">{recruiterDetails?.companyDetails?.name}</p>
            </div>
          </div>

          {/* 2. Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<BiBriefcase size={22} className="text-blue-500" />} label="Active Jobs" value={recruiterDetails?.totalJobs} color="bg-blue-50" />
            <StatCard icon={<BiMessageSquare size={22} className="text-green-500" />} label="Posts" value={recruiterDetails?.activeJobs} color="bg-green-50" />
            <StatCard icon={<LuUser size={22} className="text-purple-500" />} label="Applications" value={recruiterDetails?.totalApplications} color="bg-purple-50" />
          </div>
          
           <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <p className="font-bold text-lg mb-6">Details</p>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className='flex gap-3 items-center border border-slate-200 rounded-lg p-3'>
                <TbBrandDaysCounter color='blue' size={25} />
                <div>
                  <p className='text-sm font-semibold turncate'>Experience in years</p>
                  <p className='text-sm mt-1 text-gray-500'>{recruiterDetails?.yearOfExperience}</p>
                </div>
              </div>
              <div className='flex gap-3 items-center border border-slate-200 rounded-lg p-3'>
                <BsLinkedin color='blue' size={25} />
                <div>
                  <p className='text-sm font-semibold turncate'>LinkedIn</p>
                  <a href={recruiterDetails?.linkedinUrl} target='_blank' rel='noopener noreferrer' className='text-sm mt-1 text-underline text-blue-500'>LikedIn.com</a>
                </div>
              </div>
              {recruiterDetails?.recruiterType === 'corporate' && (
                <div className='flex gap-3 items-center border border-slate-200 rounded-lg p-3'>
                <BiBuildings color='blue' size={25} />
                <div>
                  <p className='text-sm font-semibold turncate'>Company</p>
                  <p className='text-sm mt-1 text-gray-500'>{recruiterDetails?.companyDetails?.name}</p>
                </div>
              </div>
              )}
            </div>
           </div>



          {/* 3. Verification History Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <h2 className="font-bold text-lg mb-6">Verification History</h2>
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
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-6">Actions</h2>
            
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
                onClick={() => handleRevokePermissions(recruiterDetails?._id as string, "Revoke")}
                className="bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-100"
              >
                Revoke Recruiter Permissions
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
    </>
  );
};

// --- Sub-Components for Clean Code ---

const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-white rounded-xl border border-slate-200 p-8 text-center shadow-sm flex flex-col items-center">
    <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <p className="text-2xl font-bold mb-1">{value}</p>
    <p className="text-slate-400 text-sm font-medium">{label}</p>
  </div>
);

const ActionButton = ({ children, className, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full py-3 rounded-lg text-sm font-bold transition-all active:scale-[0.98] ${className}`}
  >
    {children}
  </button>
);

const InfoRow = ({ label, value, color = "text-slate-900" }: any) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-slate-400 font-medium">{label}</span>
    <span className={`font-bold ${color}`}>{value}</span>
  </div>
);

//     const [companyDetails, setcompanydetails] = useState<any>({})
//     const params : any = useParams()
//     const companyId = params.id
//     const navigator = useNavigate()

//     useEffect(() => {

//         async function fetchCompanyDetails(){
            
//             const result = await getCompanyDetails(companyId)
                
//             setcompanydetails(result?.companyDetails)
//             console.log('Company details from the server', result?.companyDetails)
//         }
//         console.log('Received company id', companyId)
        
//         fetchCompanyDetails()

//     }, [])

//     function formatDate(createdAt : Date | string) : string {
//         const joined = new Date(createdAt)
//         return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
//     }

//     async function blockUnblockCompany(companyId : any, operation : string){
        
//         const result = await blockCompanyUnblockCompany(companyId, operation)
            
//                 Swal.fire({
//                     icon:'success',
//                     title:'Success',
//                     text:result.message,
//                     showConfirmButton:false,
//                     showCancelButton:false,
//                     timer:2000
//                 }).then(() => window.location.reload())
        
//     }

//     async function closeCompany(companyId : string){
        

//         Swal.fire({
//             icon:'warning',
//             title:'Confirm Company Closing?',
//             text:'Closing a company will erase all details about company. Once you closed a company, it can not be redo. Do you want to continue?',
//             showConfirmButton:true,
//             confirmButtonText:'Close Company',
//             showCancelButton:true,
//             allowOutsideClick:false
//         }).then(async (result) => {
//             if(result.isConfirmed){
                
//                     const result = await deleteCompany(companyId)
                    
//                         Swal.fire({
//                             icon:'success',
//                             title:'Success',
//                             text:result.message,
//                             showConfirmButton:false,
//                             showCancelButton:false,
//                             allowOutsideClick:false,
//                             timer:3500
//                         }).then(() => navigator('/admin/companies'))
//             }else{
//                 return
//             }
//         })

        
//     }

//     return(
//         <>
//         <h2 className="font-bold">Company Details</h2>
//         <div className="p-6 bg-[#ffffff] min-h-screen w-full mt-5 rounded-2xl">
//             {/* Company id / join date / found date :: details */}
//             <div className="flex justify-between w-full">
//                 <div className="left">
//                     <p className="text-gray-400 font-semibold">Company id</p>
//                     <p className="text-sm font-semibold">{companyDetails?._id}</p>
//                 </div>
//                 <div className="right">
//                     <p className="text-gray-400 font-semibold">Found In : <span className="ms-5 text-black font-semibold">{companyDetails?.foundIn}</span></p>
//                     <p className="text-gray-400 font-semibold">Joined At : <span className="ms-5 text-black font-semibold">{formatDate(companyDetails?.createdAt)}</span></p>
//                 </div>
//             </div>

//             {/* Company manifest details */}
//             <div className="flex w-full justify-between mt-15">
//                 {/* Div one */}
//                 <div className='flex items-center gap-2'> 
//                     <img src={companyDetails?.logo ? companyDetails?.logo : defaultProfileImage} alt="" style={{width:'58px', height:'60px'}} />
//                     <div>
//                         <p className="text-sm font-semibold mb-2">{companyDetails?.companyName}</p>
//                         <p className="text-xs font-normal text-gray-400 mb-1">{companyDetails?.industry}</p>
//                         <p className="text-xs font-normal text-gray-400 mb-1">{companyDetails?.location?.city}, {companyDetails?.location?.country}</p>
//                     </div>
//                 </div>

//                 {/* Div two */}
//                 <div>
//                     <p className="text-sm font-semibold mb-2">Company Type</p>
//                     <p className="text-xs font-normal text-gray-400 mb-1">{companyDetails?.companyType}</p>
//                 </div>

//                 {/* Div three */}
//                 <div>
//                     <p className="text-sm font-semibold mb-2">Team Strength</p>
//                     <p className="text-xs font-normal text-gray-400 mb-1">{companyDetails?.teamStrength} Employees</p>
//                 </div>

//                 {/* Div four */}
//                 <div>
//                     <p className="text-sm font-semibold mb-2">Total Job Openings</p>
//                     <p className="text-xs font-normal text-gray-400 mb-1">0</p>
//                 </div>

//                 {/* Div five */}
//                 <div>
//                     <p className="text-sm font-semibold mb-2">Average salary offering</p>
//                     <p className="text-xs font-normal text-gray-400 mb-1">Rs.33,000</p>
//                 </div>
//             </div>

//             {/* Company about details */}
//             <div className="w-full mt-15">
//                 <p className="text-sm font-semibold mb-2">About</p>
//                 <p className="text-xs font-normal text-gray-400 mb-1">{companyDetails?.about}</p>
//             </div>

//             {/* Company benefit details */}
//             <div className="w-full mt-10">
//                 <p className="text-sm font-semibold mb-2">Benefits</p>
//                 <p className="text-xs font-normal text-gray-400 mb-1">{companyDetails?.benefit}</p>
//             </div>

//             {/* company contact details */}
//             <div className="w-full mt-10">
//                 <p className="text-sm font-semibold mb-2">Contact Informations</p>
//                 <ul>
//                     <li className='text-xs font-normal text-gray-400 mb-1'>Email : sample@gmail.company</li>
//                     <li className='text-xs font-normal text-gray-400 mb-1'>Phone : {companyDetails?.phone}</li>
//                     {
//                         companyDetails?.website
//                             ? <li className='text-xs font-normal text-gray-400 mb-1'>Website : www.sample.in</li>
//                             : null
//                     }
//                 </ul>
//             </div>
//             <hr className="mt-3" />
//             <div className="activities w-full mt-5">
//                 <p className="font-bold">Activities</p>
//                 <div className="mt-3 flex w-full justify-between mt-10">
//                     <div className='contents flex gap-20'>
//                         <div>
//                             <p className="text-sm text-gray-400 font-semibold mb-2">Total Hirings</p>
//                             <p className="text-xs font-normal">0</p>
//                         </div>
//                         <div>
//                             <p className="text-sm text-gray-400 font-semibold mb-2">Total Amount Spendings</p>
//                             <p className="text-xs font-normal">Rs.5,700</p>
//                         </div>
//                         <div>
//                             <p className="text-sm text-gray-400 font-semibold mb-2">Current plan</p>
//                             <p className="text-xs font-normal">Standard</p>
//                             <p className="text-xs font-normal">plan id</p>
//                         </div>
//                         <div>
//                             <p className="text-sm text-gray-400 font-semibold mb-2">Company status</p>
//                             {
//                                 companyDetails?.isBlocked 
//                                     ? <p className="text-xs font-normal text-red-400">Blocked</p>
//                                     : <p className="text-xs font-normal text-green-400">Active</p>
//                             }
                            
//                         </div>
//                     </div>
//                     <div className='actions'>
//                         <button type="button" className="btn-export bg-gray-400 text-white text-xs px-4 py-1 rounded-full">Export</button>
//                         <button onClick={() => closeCompany(companyDetails?._id)} type="button" className="btn-close-company bg-red-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Close Company</button>
//                         {
//                             companyDetails?.isBlocked
//                                 ? <button onClick={() => blockUnblockCompany(companyDetails?._id, 'Unblock')} type="button" className="btn-block bg-orange-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Unblock</button>
//                                 : <button onClick={() => blockUnblockCompany(companyDetails?._id, 'Block')} type="button" className="btn-block bg-orange-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Block</button>    
//                         }
//                     </div>
//                 </div>
//             </div>

//             <hr className="mt-3" />
//             <div className="job-listing w-full mt-5">
//                 <p className="font-bold mb-10">Listed Jobs</p>
//                 <p className="text-gray-300 font-semibold text-center mt-10">No Jobs posted yet</p>
//                 {/* <table className='table w-full mt-10'>
//                     <thead>
//                         <tr>
//                             <th>Title</th>
//                             <th>Salary</th>
//                             <th>Opening Date</th>
//                             <th>Closing Date</th>
//                             <th>Vacancies</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                 </table> */}
//             </div>
//         </div>
//         </>
//     )
// }

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