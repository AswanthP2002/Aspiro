import { useEffect, useState } from 'react'
import defaultProfileImage from '/default-img-instagram.png'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { adminDeleteJob, blockJobUnblockJob, getJobDetails, rejectJobUnrejectJob } from '../../../services/adminServices'
import { BiChevronDown, BiFlag, BiMapPin, BiMessageSquare, BiRupee, BiTrash } from 'react-icons/bi'
import { BsClock, BsEye } from 'react-icons/bs'
import { LuUsers } from 'react-icons/lu'
import { FiBarChart2 } from 'react-icons/fi'
import { AdminJobDetailsData } from '../../../types/entityTypes'
import { Notify } from 'notiflix'


export default function JobDetails(){

    const [jobdetails, setjobdetails] = useState<AdminJobDetailsData | null>(null)
    const params : any = useParams()
    const jobId = params.id

    const navigate = useNavigate()

    const [showStatusMenu, setShowStatusMenu] = useState(false)

    useEffect(() => {

        async function fetchJobDetails(){

            
                const result = await getJobDetails(jobId)
                
                    setjobdetails(result?.result)
                    console.log('job details from the server', result)
                
        }
        console.log('Received company id', jobId)
        
        fetchJobDetails()

    }, [])

    function formatDate(createdAt : Date | string) : string {
        const joined = new Date(createdAt)
        return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
    }

    async function blockUnblockJob(jobId : any, operation : string){
        
        
            const result = await blockJobUnblockJob(jobId, operation)
            
                Swal.fire({
                    icon:'success',
                    title:'Success',
                    text:result.message,
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:2000
                }).then(() => window.location.reload())
           
    }

    const deleteJob = async (jobId: string) => {
        if(!jobId) return jobId
        Swal.fire({
            icon: 'question',
            title: 'Delete?',
            showConfirmButton: true,
            showCancelButton: true
        }).then(async (response) => {
            if(response.isConfirmed){
                const result = await adminDeleteJob(jobId)
                Swal.fire({icon: 'success', title: 'Deleted', showConfirmButton: false, showCancelButton: false, timer: 2500}).then(() => navigate('/admin/jobs'))
            }else{
                return
            }
        })
    }

    async function rejectUnRejectJob(jobId : any, operation : string){
    
        const result = await rejectJobUnrejectJob(jobId, operation)
            
                Swal.fire({
                    icon:'success',
                    title:'Success',
                    text:result.message,
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:2000
                }).then(() => window.location.reload())
    }
    return(
        <>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-700">
      {/* Header Area */}
      <div className="max-w-6xl mx-auto mb-4">
        <button className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1">
          ← Back to Jobs
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Top Header Section */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{jobdetails?.jobTitle}</h1>
            <p className="text-slate-500 mt-1">
              {jobdetails?.companyName} • <span className="text-blue-600 cursor-pointer hover:underline">{jobdetails?.recruiterName}</span>
            </p>
          </div>
          
          <div className="relative">
            <p className="text-[10px] font-bold text-slate-400 mb-1 text-right uppercase tracking-wider">Job Status</p>
            <button 
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="bg-green-100 text-green-700 px-4 py-1.5 text-xs rounded-lg font-normal flex items-center gap-2 min-w-[100px] justify-between border border-green-200"
            >
              {jobdetails?.status} <BiChevronDown size={16} />
            </button>
            
            {showStatusMenu && (
              <div className="absolute right-0 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-10 py-1">
                {['active', 'block'].map((s) => (
                  <button 
                    key={s}
                    onClick={() => { setStatus(s); setShowStatusMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          
          {/* Left Column: Job Details */}
          <div className="lg:col-span-2 p-6 border-r border-slate-100">
            <h2 className="font-bold text-lg mb-4">Job Details</h2>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge icon={<BiMapPin size={14}/>} text={jobdetails?.location} color="bg-blue-50 text-blue-600" />
              <Badge icon={<BiRupee size={14}/>} text={`${jobdetails?.minSalary} - ${jobdetails?.maxSalary}`} color="bg-green-50 text-green-600" />
              <Badge icon={<BsClock size={14}/>} text={jobdetails?.jobType} color="bg-purple-50 text-purple-600" />
            </div>

            <section className="mb-6">
              <h3 className="font-bold mb-2">Description</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {jobdetails?.description}
              </p>
            </section>

            <section className="mb-6">
              <h3 className="font-bold mb-2">Requirements</h3>
              <p>{jobdetails?.requirements}</p>
            </section>

            <section>
              <h3 className="font-bold mb-3">Responsibilities</h3>
              <p>{jobdetails?.responsibilities}</p>
            </section>
          </div>

          {/* Right Column: Analytics & Reports */}
          <div className="bg-slate-50/50 p-6 space-y-6">
            <div>
              <h2 className="font-bold text-lg mb-4">Analytics</h2>
              <div className="space-y-4">
                <StatCard icon={<LuUsers className="text-blue-600"/>} label="Applicants" value={jobdetails?.applicationsCount} bgColor="bg-blue-50" />
                <StatCard icon={<BsEye className="text-emerald-600"/>} label="Views" value={jobdetails?.views} bgColor="bg-emerald-50" />
                {/* <StatCard icon={<FiBarChart2 className="text-purple-600"/>} label="Click-Through Rate" value="8.5%" bgColor="bg-purple-50" /> */}
              </div>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-4">Reports</h2>
              <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                <p className="text-slate-400 text-sm">No reports</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Admin Actions */}
        <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-slate-800">Admin Actions</h3>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              <BiMessageSquare size={18} /> Message Recruiter
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-red-200 text-red-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-red-50 transition-colors">
              <BiFlag size={18} /> Flag Job Post
            </button>
            <button onClick={() => deleteJob(jobdetails?._id)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-red-200 text-red-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-red-50 transition-colors">
              <BiTrash size={18} /> Delete Post
            </button>
          </div>
        </div>
      </div>
    </div>
        </>
    )

    // return(
    //     <>
    //     <h2 className="font-bold">Job Details</h2>
    //     <div className="p-6 bg-[#ffffff] min-h-screen w-full mt-5 rounded-2xl">
    //         {/* Company id / join date / found date :: details */}
    //         <div className="flex justify-between w-full">
    //             <div className="left">
    //                 <p className="text-gray-400 font-semibold">Job id</p>
    //                 <p className="text-sm font-semibold">{jobdetails?._id}</p>
    //             </div>
    //             <div className="right">
    //                 <p className="text-gray-400 font-semibold">Created Date : <span className="ms-5 text-black font-semibold">{formatDate(jobdetails.createdAt)}</span></p>
    //                 <p className="text-gray-400 font-semibold">Expires At : <span className="ms-5 text-black font-semibold">{formatDate(jobdetails?.expiresAt)}</span></p>
    //             </div>
    //         </div>

    //         {/* Company manifest details */}
    //         <div className="flex w-full justify-between mt-15">
    //             {/* Div one */}

    //             <div>
    //                 <p className="text-sm font-semibold mb-2">{jobdetails?.jobTitle}</p>
    //                 <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.jobType}</p>
    //                 <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.locationType ? jobdetails?.locationType : "not specified"}</p>
    //             </div>

    //             <div className='flex items-center gap-2'> 
    //                 <img src={jobdetails?.companyDetails?.logo ? jobdetails?.companyDetails?.logo : defaultProfileImage} alt="" style={{width:'58px', height:'60px'}} />
    //                 <div>
    //                     <p className="text-sm font-semibold mb-2">{jobdetails?.companyDetails?.companyName}</p>
    //                     <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.companyDetails?.industry}</p>
    //                     <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails.companyDetails?.location?.city}, {jobdetails?.companyDetails?.location?.country}</p>
    //                 </div>
    //             </div>

    //             {/* Div two */}
    //             <div>
    //                         <p className="text-sm text-gray-400 font-semibold mb-2">Job status</p>
    //                         {
    //                             jobdetails?.isBlocked 
    //                                 ? <p className="text-xs font-normal text-red-400">Blocked</p>
    //                                 : <p className="text-xs font-normal text-green-400">Active</p>
    //                         }
                            
    //             </div>
    //             <div>
    //                         <p className="text-sm text-gray-400 font-semibold mb-2">Job Activity Status</p>
    //                         {
    //                             jobdetails?.isRejected 
    //                                 ? <p className="text-xs font-normal text-red-400">Rejected</p>
    //                                 : <p className="text-xs font-normal text-green-400">On hiring</p>
    //                         }
                            
    //                 </div>

    //             <div>
    //                 <p className="text-sm font-semibold mb-2">{jobdetails?.minSalary} - {jobdetails?.maxSalary}</p>
    //                 <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.jobLevel}</p>
    //                 <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.experience}</p>
    //                 <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.qualification}</p>
    //             </div>
    //         </div>

    //         {/* Company about details */}
    //         <div className="w-full mt-15">
    //             <p className="text-sm font-semibold mb-2">Description</p>
    //             <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.description}</p>
    //         </div>

    //         <div className="w-full mt-15">
    //             <p className="text-sm font-semibold mb-2">Responsibilities</p>
    //             <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.responsibilities}</p>
    //         </div>

    //         {/* Company benefit details */}
    //         <div className="w-full mt-10">
    //             <p className="text-sm font-semibold mb-2">Requirements</p>
    //             <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.requirements}</p>
    //         </div>


    //         <hr className="mt-3" />
    //         <div className="actions w-full flex justify-end mt-3">
    //             <div>
    //                     {
    //                         jobdetails?.isRejected
    //                             ? <button onClick={() => rejectUnRejectJob(jobdetails?._id, 'Unreject')} type="button" className="btn-close-company bg-red-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Un Reject</button>
    //                             : <button onClick={() => rejectUnRejectJob(jobdetails?._id, 'Reject')} type="button" className="btn-close-company bg-red-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Reject</button>
    //                     }
    //                     {
    //                         jobdetails?.isBlocked
    //                             ? <button onClick={() => blockUnblockJob(jobdetails?._id, 'Unblock')} type="button" className="btn-block bg-gray-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Unblock</button>
    //                             : <button onClick={() => blockUnblockJob(jobdetails?._id, 'Block')} type="button" className="btn-block bg-gray-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Block</button>    
    //                     }
    //             </div>
    //         </div>
    //     </div>
    //     </>
    // )
}

const Badge = ({ icon, text, color }) => (
  <div className={`${color} flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold`}>
    {icon} {text}
  </div>
);

const StatCard = ({ icon, label, value, bgColor }) => (
  <div className={`${bgColor} p-4 rounded-xl flex items-center gap-4`}>
    <div className="bg-white p-2.5 rounded-lg shadow-sm">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</p>
      <p className="text-xl font-semibold text-slate-800 leading-none mt-1">{value}</p>
    </div>
  </div>
);