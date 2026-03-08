import { useEffect, useState } from 'react'
import { formatRelativeTime, transformDate } from '../../services/util/formatDate'
import {CiBookmark, CiMonitor} from 'react-icons/ci'
import {MdBookmarkAdded} from 'react-icons/md'
import { checkIsSaved, saveJob, unsaveJob } from '../../services/userServices'
import { Notify } from 'notiflix'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { JobAggregatedData, LoadJobsForPublicData } from '../../types/entityTypes'
import { BiBriefcase, BiCalendar, BiChart, BiDollar, BiShare } from 'react-icons/bi'
import moment from 'moment'
import { BsClock } from 'react-icons/bs'
import { BarChart } from 'recharts'
import { currencyFormatter } from '../../helpers/Currency.helper'


export default function JobListTile({data} : {data : LoadJobsForPublicData}){
    const navigateTo = useNavigate()
    const [isJobSave, setIsJobSaved] = useState<boolean>(false)

    const logedUser = useSelector((state : any) => {
        return state.userAuth
    })

    function viewJobDetails(jobId : string) {
        navigateTo(`/jobs/${jobId}`, {state:{jobDetails:data}})
    }

    async function saveTheJob(jobId : string){
        const result = await saveJob(jobId)
        if(result?.success){
            Notify.success('Job Saved', {timeout:1500})
            setTimeout(() => window.location.reload(), 1500)
        }else{
            Notify.failure('Can not save job', {timeout:1500})
        }
        
    }

    async function unSaveJob(jobId : string){
        const result = await unsaveJob(jobId)

        if(result?.success){
            Notify.success('Unsaved', {timeout:1500})
            setTimeout(() => window.location.reload(), 1500)
        }else{
            Notify.failure('Something went wrong', {timeout:1500})
        }
    }

    function goToJobApplyPage(jobId: string){
        navigateTo(`/jobs/${jobId}/apply`, {state:{jobDetails:data}})
    }

    useEffect(() => {
        if (logedUser) {
            (async function () {
                const result = await checkIsSaved(data._id as string)
                setIsJobSaved(result)
            })()
            return
        }
    }, [])

    return(
        <>
            <div className={`w-full bg-white rounded-xl border-2 border-blue-500 p-6 mb-4 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:bg-gradient-to-br hover:from-blue-500 hover:to-indigo-50 ${
      data.status === 'active' ? 'border-blue-500 ring-1 ring-blue-500' : ''
    }`}>
      {/* Top Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            <BiBriefcase size={24} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-bold text-slate-900">{data.jobTitle}</h3>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                data.recruiterDetail?.recruiterType === 'corporate' ? 'bg-blue-100 text-blue-600' : 'bg-blue-500 text-white'
              }`}>
                {data.recruiterDetail?.recruiterType}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{data.companyDetails?.name}</span>
              <span>•</span>
              <span>{data.location}</span>
              <span>•</span>
              <span>{moment(data.createdAt).format("MMM DD YYYY")}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3 text-slate-400">
          <button className="hover:text-blue-500 transition-colors"><BiShare size={20} /></button>
          <button className="hover:text-blue-500 transition-colors"><CiBookmark size={20} /></button>
        </div>
      </div>

      {/* Skills Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.requiredSkills.map((skill, index) => (
          <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-medium rounded-full">
            {skill}
          </span>
        ))}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 pt-4 border-t border-slate-50">
        <InfoItem icon={<BiDollar size={16} className="text-green-500" />} label="Pay" value={`${currencyFormatter(data.minSalary.toString(), "INR")}`} bgColor="bg-green-50" />
        <InfoItem icon={<BsClock size={16} className="text-blue-500" />} label="Duration" value={data.duration ? data.duration : "NA"} bgColor="bg-blue-50" />
        <InfoItem icon={<BiChart size={16} className="text-purple-500" />} label="Level" value={data.jobLevel} bgColor="bg-purple-50" />
        <InfoItem icon={<BiCalendar size={16} className="text-orange-500" />} label="Type" value={data.jobType} bgColor="bg-orange-50" />
        <InfoItem icon={<CiMonitor size={16} className="text-rose-500" />} label="Workmode" value={data.workMode} bgColor="bg-rose-50" />
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
        <p className="text-sm text-slate-600">
          Apply by <span className="font-semibold text-slate-900">{moment(data.expiresAt).format("MMM DD YYYY")}</span>
        </p>
        <div className="flex gap-3">
          <button onClick={() => viewJobDetails(data._id as string)} className="px-6 py-2 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors">
            View Details
          </button>
          <button onClick={() => goToJobApplyPage(data._id as string)} className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
            Apply Now
          </button>
        </div>
      </div>
    </div>
        </>
    )
}

const InfoItem = ({ icon, label, value, bgColor }: { icon: React.ReactNode, label: string, value: any, bgColor: string }) => (
  <div className="flex items-center gap-3">
    <div className={`w-8 h-8 ${bgColor} rounded flex items-center justify-center shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-slate-400 font-medium uppercase">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  </div>
);

// /**
//  * <div className="relative tile border border-gray-300 cursor-pointer rounded-sm p-3">
//             {/* <div className="absoute text-xs border border-gray-300 w-fit !px-3 !py-1 rounded-sm"><p>{data.jobLevel}</p></div>
//             <div className="absoute text-xs border border-gray-300 w-fit !px-3 !py-1 rounded-sm "><p>In-office</p></div> */}
//             <div className='flex gap-3 items-center'>
//                 <div className='border border-gray-200 w-[40px] h-[40px] flex justify-center items-center rounded-full'>
//                     <i className="fa-solid fa-briefcase !text-gray-300"></i>
//                 </div>
//                 <div className=''>
//                     <p className="font-semibold text-start">{data?.jobTitle}</p>
//                     <p className="text-sm text-gray-500">
//                         {data?.recruiterProfile?.employerType === 'company' ? data.recruiterProfile.organizationDetails?.organizationName : data?.userDetails?.name}
//                     </p>
//                 </div>
//             </div>
//             {/* skills */}
//             <div className='flex flex-wrap gap-2 mt-5'>
//                 {
//                     data.requiredSkills.map((skill : string, index : number) => {
//                         return <div key={index} className='bg-gray-200 rounded-full !px-3 !py-1'><p className="text-xs text-gray-500">{skill}</p></div>
//                     })
//                 }
//             </div>
//             <div className='flex gap-2 mt-5'>
//             <div className='flex-grow-1 border-r border-gray-300'>
//                 <p className="text-xs text-gray-500 text-start"><i className="fa-solid fa-wallet !text-xs !text-gray-400"></i> Pay</p>
//                 <p className="text-start font-semibold text-sm">&#8377; {data.minSalary} - {data.maxSalary}</p>
//             </div>

//             <div className='flex-grow-1 border-r border-gray-300'>
//                 <p className="text-xs text-gray-500 text-start"><i className="fa-solid fa-clock !text-xs !text-gray-400"></i> Duration</p>
//                 <p className="text-start font-semibold text-sm">{data.duration ? data.duration : "NA"}</p>
//             </div>

//             <div className='flex-grow-1'>
//                 <p className="text-xs text-gray-500 text-start"><i className="fa-solid fa-laptop !text-xs !text-gray-400"></i> Work Mode</p>
//                 <p className="text-start font-semibold text-sm">{data.workMode}</p>
//             </div>
            
//             </div>
//             <div className='mt-5'>
//                 <p className=" text-start text-xs text-blue-400">Apply by {transformDate(data.expiresAt as string)} | Posted {formatRelativeTime(data.createdAt)}</p>
//             </div>
//             <div className='flex justify-between !mt-5'>
//                 <div className="flex gap-5">
//                     <button onClick={() => viewJobDetails(data._id as string)} className='text-xs border border-gray-300 rounded-md !px-4 !py-2 text-blue-500'>View Details</button>
//                     <button onClick={() => goToJobApplyPage(data._id as string)} className='text-xs bg-blue-500 text-white rounded-md !px-4 !py-2'>Apply Now</button>
//                 </div>
//                 <div className="flex justify-end gap-5">
//                     {
//                         isJobSave
//                             ? <button onClick={() => unSaveJob(data._id as string)}><MdBookmarkAdded /></button>
//                             : <button onClick={() => saveTheJob(data._id as string)}><i className="fa-solid fa-bookmark !text-gray-400"></i></button>
//                     }
//                     <button><i className="!text-gray-400 fa-solid fa-share-nodes"></i></button>
//                 </div>
//             </div>
//         </div>
//  */