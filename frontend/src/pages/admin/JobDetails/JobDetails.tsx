import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { adminBlockJob, adminDeleteJob, adminToggleFlagJob, adminUnblockJob, getJobDetails } from '../../../services/adminServices'
import { BiBlock, BiFlag, BiMapPin, BiMessageSquare, BiRupee, BiTrash } from 'react-icons/bi'
import { BsClock, BsEye, BsLayers } from 'react-icons/bs'
import { LuUsers } from 'react-icons/lu'
import { AdminJobDetailsData } from '../../../types/entityTypes'
import { CiLocationOn } from 'react-icons/ci'
import { toast } from 'react-toastify'


export default function JobDetails(){

    const [jobdetails, setjobdetails] = useState<AdminJobDetailsData | null>(null)
    const params = useParams() //removed any
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

    // function formatDate(createdAt : Date | string) : string {
    //     const joined = new Date(createdAt)
    //     return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
    // }

    // async function blockUnblockJob(jobId : string, operation : string){
        
        
    //         const result = await blockJobUnblockJob(jobId, operation)
            
    //             Swal.fire({
    //                 icon:'success',
    //                 title:'Success',
    //                 text:result.message,
    //                 showConfirmButton:false,
    //                 showCancelButton:false,
    //                 timer:2000
    //             }).then(() => window.location.reload())
           
    // }

    const deleteJob = async (jobId: string) => {
        if(!jobId) return jobId
        Swal.fire({
            icon: 'question',
            title: 'Delete?',
            showConfirmButton: true,
            showCancelButton: true
        }).then(async (response) => {
            if(response.isConfirmed){
                await adminDeleteJob(jobId)
                Swal.fire({icon: 'success', title: 'Deleted', showConfirmButton: false, showCancelButton: false, timer: 2500}).then(() => navigate('/admin/jobs'))
            }else{
                return
            }
        })
    }

    const blockJob = async (id: string) => {
      if(!id) return
      
      const confirmResult = await Swal.fire({
        icon: 'question',
        title: "block this job?",
        showConfirmButton: true,
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      })

      if(!confirmResult.isConfirmed) return

      try {
        const result = await adminBlockJob(id)
        if(result.success){
          toast.success('Blocked')
          setjobdetails((prv: AdminJobDetailsData | null) => {
            if(!prv) return null
            return {
              ...prv,
              status: 'blocked'
            }
          })
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      }
    }

     const unblockJOb = async (id: string) => {
      if(!id) return
      
      const confirmResult = await Swal.fire({
        icon: 'question',
        title: "unblock this job?",
        showConfirmButton: true,
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      })

      if(!confirmResult.isConfirmed) return

      try {
        const result = await adminUnblockJob(id)
        if(result.success){
          toast.success('Unblocked')
          setjobdetails((prv: AdminJobDetailsData | null) => {
            if(!prv) return null
            return {
              ...prv,
              status: 'active'
            }
          })
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      }
    }

    async function toggleFlagJob(jobId: string, action: 'flag' | 'un-flag'){
      const confirmResult = await Swal.fire({
        icon: 'question',
        title: action === 'flag' ? "Flag This job?" : "Remove flag from job",
        showConfirmButton: true,
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      })

      if(!confirmResult.isConfirmed) return
      try {
        const result = await adminToggleFlagJob(jobId, action)
        if(result.success){
         if(action === 'flag'){
          toast.success('Job flagged succesfully')
          setjobdetails((job: AdminJobDetailsData | null) => {
            if(!job) return null
            return {
              ...job,
              isFlagged: true
            }
          })
         }else{
          toast.success('Job flag removed succesfully')
          setjobdetails((job: AdminJobDetailsData | null) => {
            if(!job) return null
            return {
              ...job,
              isFlagged: false
            }
          })
         }
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      }
    }
    return(
        <>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-700">
      {/* Header Area */}
      <div className="max-w-6xl mx-auto mb-4">
        <button onClick={() => navigate(-1)} className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1">
          ← Back to Jobs
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Top Header Section */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-start">
          <div>
            <p className="text-xl font-bold text-slate-900">{jobdetails?.jobTitle}</p>
            <p className="text-slate-500 mt-1">
              {jobdetails?.companyName ? jobdetails?.companyName : 'Freelancer'} • <span className="text-blue-600 cursor-pointer hover:underline">{jobdetails?.recruiterName}</span>
            </p>
          </div>
          
          <div className="relative">
            <p className="text-[10px] font-bold text-slate-400 mb-1 text-right uppercase tracking-wider">Job Status</p>
            <span 
              // onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="bg-green-100 text-green-700 px-4 py-1.5 text-xs rounded-lg font-normal flex items-center gap-2 min-w-[100px] justify-center border border-green-200"
            >
              {jobdetails?.status}
            </span>
            
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
            <p className="font-semibold text-lg mb-4">Job Details</p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge icon={<BiMapPin size={14}/>} text={jobdetails?.location} color="bg-blue-50 text-blue-600" />
              <Badge icon={<BiRupee size={14}/>} text={`${jobdetails?.minSalary} - ${jobdetails?.maxSalary}`} color="bg-green-50 text-green-600" />
              <Badge icon={<BsClock size={14}/>} text={jobdetails?.jobType} color="bg-purple-50 text-purple-600" />
              <Badge icon={<BsLayers size={14} />} text={jobdetails?.jobLevel} color="bg-orange-50 text-orange-600" />
              <Badge icon={<CiLocationOn size={14} />} text={jobdetails?.workMode} color="bg-red-50 text-red-600" />
            </div>

            <section className="mb-6">
              <h3 className="font-bold mb-2">Description</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {jobdetails?.description}
              </p>
            </section>

            <section className="mb-6">
              <h3 className="font-bold mb-2">Requirements</h3>
              <ul className='list-disc ps-5'>
                {jobdetails?.requirements.split(".").map((req: string, index: number) => (
                  <li className='text-sm leading-relaxed'>{req}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-bold mb-3">Responsibilities</h3>
              <ul className='list-disc ps-5'>
                {jobdetails?.responsibilities.split(".").map((req: string, index: number) => (
                  <li className='text-sm leading-relaxed'>{req}</li>
                ))}
              </ul>
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
          <div className="flex flex-col lg:flex-row gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              <BiMessageSquare size={18} /> Message Recruiter
            </button>
            {jobdetails?.isFlagged
              ? <button onClick={() => toggleFlagJob(jobdetails._id, 'un-flag')} className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-red-200 text-red-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-red-50 transition-colors">
              <BiFlag size={18} /> Remove flag
            </button>
              : <button onClick={() => toggleFlagJob(jobdetails?._id, 'flag')} className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-red-200 text-red-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-red-50 transition-colors">
              <BiFlag size={18} /> Flag Job
            </button>
            }
            {jobdetails?.status === 'blocked'
              ? <button onClick={() => unblockJOb(jobdetails._id)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-red-200 text-red-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-red-50 transition-colors">
              <BiBlock size={18} /> Un Block Job
            </button>
              : <button onClick={() => blockJob(jobdetails?._id)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-red-200 text-red-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-red-50 transition-colors">
              <BiBlock size={18} /> Block Job
            </button>
            }
            <button onClick={() => deleteJob(jobdetails?._id)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-red-200 text-red-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-red-50 transition-colors">
              <BiTrash size={18} /> Delete Post
            </button>
          </div>
        </div>
      </div>
    </div>
        </>
    )
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