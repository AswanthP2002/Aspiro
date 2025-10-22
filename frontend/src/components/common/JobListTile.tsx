import { useEffect, useState } from 'react'
import { formatRelativeTime, transformDate } from '../../services/util/formatDate'
import {CiBookmark} from 'react-icons/ci'
import {MdBookmarkAdded} from 'react-icons/md'
import { checkIsSaved, saveJob, unsaveJob } from '../../services/userServices'
import { Notify } from 'notiflix'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function JobListTile({data} : any){
    const navigateTo = useNavigate()
    const [isJobSave, setIsJobSaved] = useState<boolean>(false)

    const logedUser = useSelector((state : any) => {
        return state.candidateAuth.token
    })

    function viewJobDetails(jobId : string) {
        navigateTo(`${jobId}`)
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

    useEffect(() => {
        if (logedUser) {
            (async function () {
                const result = await checkIsSaved(data._id)
                setIsJobSaved(result)
            })()
            return
        }
    }, [])

    return(
        <>
        <div className="relative tile border border-gray-300 cursor-pointer rounded-sm p-3">
            {/* <div className="absoute text-xs border border-gray-300 w-fit !px-3 !py-1 rounded-sm"><p>{data.jobLevel}</p></div>
            <div className="absoute text-xs border border-gray-300 w-fit !px-3 !py-1 rounded-sm "><p>In-office</p></div> */}
            <div className='flex gap-3 items-center'>
                <div className='border border-gray-200 w-[40px] h-[40px] flex justify-center items-center rounded-full'>
                    <i className="fa-solid fa-briefcase !text-gray-300"></i>
                </div>
                <div className=''>
                    <p className="font-semibold text-start">{data?.jobTitle}</p>
                    <p className="text-sm text-gray-500">{data?.companyDetails.companyName} | {data.companyDetails.location.city}, {data.companyDetails?.location.state}</p>
                </div>
            </div>
            {/* skills */}
            <div className='flex flex-wrap gap-2 mt-5'>
                {
                    data.requiredSkills.map((skill : number, index : number) => {
                        return <div key={index} className='bg-gray-200 rounded-full !px-3 !py-1'><p className="text-xs text-gray-500">{skill}</p></div>
                    })
                }
            </div>
            <div className='flex gap-2 mt-5'>
            <div className='flex-grow-1 border-r border-gray-300'>
                <p className="text-xs text-gray-500 text-start"><i className="fa-solid fa-wallet !text-xs !text-gray-400"></i> Pay</p>
                <p className="text-start font-semibold text-sm">&#8377; {data.minSalary} - {data.maxSalary}</p>
            </div>

            <div className='flex-grow-1 border-r border-gray-300'>
                <p className="text-xs text-gray-500 text-start"><i className="fa-solid fa-clock !text-xs !text-gray-400"></i> Duration</p>
                <p className="text-start font-semibold text-sm">{data.duration ? data.duration : "NA"}</p>
            </div>

            <div className='flex-grow-1'>
                <p className="text-xs text-gray-500 text-start"><i className="fa-solid fa-laptop !text-xs !text-gray-400"></i> Work Mode</p>
                <p className="text-start font-semibold text-sm">{data.locationType}</p>
            </div>
            
            </div>
            <div className='mt-5'>
                <p className=" text-start text-xs text-blue-400">Apply by {transformDate(data.expiresAt)} | Posted {formatRelativeTime(data.createdAt)}</p>
            </div>
            <div className='flex justify-between !mt-5'>
                <div className="flex gap-5">
                    <button onClick={() => viewJobDetails(data._id)} className='text-xs border border-gray-300 rounded-md !px-4 !py-2 text-blue-500'>View Details</button>
                    <button className='text-xs bg-blue-500 text-white rounded-md !px-4 !py-2'>Apply Now</button>
                </div>
                <div className="flex justify-end gap-5">
                    {
                        isJobSave
                            ? <button onClick={() => unSaveJob(data._id)}><MdBookmarkAdded /></button>
                            : <button onClick={() => saveTheJob(data._id)}><i className="fa-solid fa-bookmark !text-gray-400"></i></button>
                    }
                    <button><i className="!text-gray-400 fa-solid fa-share-nodes"></i></button>
                </div>
            </div>
        </div>
        </>
    )
}