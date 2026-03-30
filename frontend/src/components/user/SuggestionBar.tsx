import dummyUserImage from '/recejames.jpg'
import dummyCompany from '/company.jpg'
import shculler from '/schuller.jpg'
import klara from '/klara.jpg'
import hektor from '/hektor.jpg'
import lucas from '/lucas.jpg'
import { Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { LuUserPlus } from 'react-icons/lu'
import { PiSuitcase } from 'react-icons/pi'
import { RecommendedJobsData, SimilarSkillUserData } from '../../types/entityTypes'
import { similarUseers } from '../../services/userServices'
import { getRecommendedJobs } from '../../services/jobServices'
import { toast } from 'react-toastify'
import { BiSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const suggestedUsers = [
    {name:"Le Schuller", role:"Project Manager",image:shculler},
    {name:"Hektor Fort", role:"Graphic Desginer",image:hektor},
    {name:'Klara', role:'Prompt Engineer', image:klara},
    {name:'Lucas Bergvel', role:'HR Manager', image:lucas}
]

const suggestedJobs = [
    {name:"Node Js Developer", company:"Konami",image:dummyCompany},
    {name:"Sales Executive", company:"Nabraz",image:dummyCompany},
    {name:"English Tutor", company:"Pragathi",image:dummyCompany},
    {name:"Python Intern", company:"Mosch",image:dummyCompany}
]

export default function SuggessionBar(){
    const [familiarUsers, setFamiliarUsers] = useState<SimilarSkillUserData[]>([])
    const [recommendedJobs, setRecommendedJobs] = useState<RecommendedJobsData[]>([])
    const [suitableJobs, setSuitableJobs] = useState<any>(suggestedJobs)
    const [loading, setLoading] = useState(true)
    const [loadingFamiliarUsers, setLodingFamiliarUsers] = useState(true)
    const [loadingSuitableJobs, setLoadingSuitableJobs] = useState(true)
    const navigate = useNavigate()

    const navigateToJobsPage = (jobId: string) => {
      if(!jobId){
        toast.warn('Cant redirect to jobs')
        return
      }

      navigate(`/jobs/${jobId}`, {state: {jobId}})
    }

    const navigateToUsers = (userId: string) => {
      if(!userId){
        toast.warn('Cant redirect to users')
        return
      }

      navigate(`/users/${userId}`, {state: {userId}})
    }



    useEffect(() => {
        (async function(){
          setLoading(true)
          try {
            const [
              similarUserResult,
              recommendedJobsResult
            ] = await Promise.all([similarUseers(), getRecommendedJobs()])
            const result = await similarUseers()
            console.log('--result --', result)
            console.log('recommended jobs', recommendedJobsResult)

            setRecommendedJobs(recommendedJobsResult.result)
            setFamiliarUsers(similarUserResult.result)
          // if(result?.success){
          //   setFamiliarUsers(result?.result)
          // }
          } catch (error) {
            console.log(error)
            toast.error(error instanceof Error ? error.message : 'Can not fetch suggestions')
          } finally {
            setLoading(false)
          }
        })()

    }, [])

    return(
        <div className="suggestions px-3 flex flex-col gap-4 fixed w-[350px]">
  {/* Section 1: People Suggestions */}
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
    <div className="p-4 border-b border-gray-50">
      <h3 className="font-semibold text-sm text-gray-800">People you might interested</h3>
    </div>
    
    <div className="p-4 flex flex-col gap-5">
      {familiarUsers.map((person: SimilarSkillUserData, index: number) => (
        <div key={index} className="flex items-center justify-between group">
          <div className="flex gap-3 items-center">
            {/* Avatar with subtle shadow */}
            <div className="flex-shrink-0 flex justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-10 h-10 rounded-full shadow-md font-bold text-sm">
              <img className='w-full h-full rounded-full object-cover' src={person.profilePicture} alt="" />
            </div>
            <div onClick={() => navigateToUsers(person._id)} className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate hover:text-blue-600 cursor-pointer transition-colors">
                {person.name}
              </p>
              <p className="text-[11px] text-gray-500 truncate leading-tight">
                {person.headline}
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-blue-50 rounded-full transition-all active:scale-90">
            <LuUserPlus className="text-blue-600" size={18} />
          </button>
        </div>
      ))}

      {familiarUsers.length > 0
        ? <div className="p-3 bg-gray-50/50 border-t border-gray-50">
      <button className="w-full text-sm font-semibold py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100">
        Find more people
      </button>
    </div>
        : <div className='flex flex-col items-center py-10'>
        <BiSearch color='gray' />
        <p className='text-slate-500 text-xs'>No suggested users</p>
      </div>
      }
    </div>

    
  </div>

  {/* Section 2: Job Opportunities */}
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
    <div className="p-4 border-b border-gray-50">
      <h3 className="font-semibold text-sm text-gray-800">Opportunities for you</h3>
    </div>

    <div className="p-5 flex flex-col gap-5">
      {recommendedJobs.map((job: RecommendedJobsData, index: number) => (
        <div key={index} className="flex items-center justify-between group">
          <div className="flex gap-3 items-center">
            {/* Job Icon Wrapper */}
            <div className="flex-shrink-0 flex justify-center items-center bg-blue-50 text-blue-600 w-10 h-10 rounded-lg border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <PiSuitcase size={20} />
            </div>
            <div onClick={() => navigateToJobsPage(job._id as string)} className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 cursor-pointer">
                {job.jobTitle}
              </p>
              <p className="text-[11px] text-gray-500 truncate">
                {job.companyDetails.name
                  ? <span>{job.companyDetails.name}</span>
                  : <span>Posted by {job.recruiterDetails.name}</span>
                }
              </p>
            </div>
          </div>
          <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-all uppercase tracking-tighter">
            View
          </button>
        </div>
      ))}
    </div>

    {recommendedJobs.length > 0
      ? <div className="p-3 bg-gray-50/50 border-t border-gray-50">
      <button className="w-full text-sm font-semibold py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100">
        Browse more
      </button>
    </div>
      : <div className='flex flex-col items-center py-10'>
        <BiSearch color='gray' />
        <p className='text-slate-500 text-xs'>No suggested jobs</p>
      </div>
    }
  </div>
</div>
    )
}