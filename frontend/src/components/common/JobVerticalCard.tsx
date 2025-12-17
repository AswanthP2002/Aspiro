import Swal from 'sweetalert2'
import { unsaveJob } from '../../services/userServices'
import { isDateExpired } from '../../services/util/checkExpiry'
import getDaysLeftFromToday from '../../services/util/getDays'
import defaultProfile from '/default-img-instagram.png'
import {Document, Page, pdfjs} from 'react-pdf'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url'
import { Link } from 'react-router-dom'
import { PiSuitcase } from 'react-icons/pi'
import { CiBookmark, CiBookmarkCheck } from 'react-icons/ci'
import { IoInformation } from 'react-icons/io5'
import { BsClock, BsInfo } from 'react-icons/bs'
import { CgInfo, CgLock } from 'react-icons/cg'
import { FavoriteJob, JobDetails } from '../../types/entityTypes'
import formatDate, { formatRelativeTime, transformDate } from '../../services/util/formatDate'
import { Notify } from 'notiflix'
import { useEffect, useState } from 'react'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

export default function JobVerticalCard({jobData, onUnsaveJob} : {jobData: FavoriteJob, onUnsaveJob: Function}){
    console.log('job data fetched from the backend', jobData)
    const [jobDetails, setJobDetails] = useState<FavoriteJob | null | undefined>(null)
    const [isJobSaved, setIsJobSaved] = useState<boolean>(true)

    const jobUnsave = async (jobId: string) => {
        try {
            const result = await unsaveJob(jobId)
    
            if(result?.success){
                Notify.success('Unsaved', {timeout:1200})
                setTimeout(() => setIsJobSaved(false), 1200)
                onUnsaveJob(jobId)
                
            }else{
                Notify.failure('Something went wrong', {timeout:1200})
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:1200})
        }
    }

    return(
        <>
        
        <div className="border border-gray-200 bg-white rounded-md p-5">
            <div className="flex gap-3">
                <div>
                    <div className='bg-blue-100 w-13 h-13 rounded-full flex items-center justify-center'>
                        <PiSuitcase color='blue' size={23} />
                    </div>
                </div>
                
                <div className="flex-1">
                    <Link to={`/jobs/${jobData?.jobDetails?._id}`}>
                    <p className='text-lg font-light'>{jobData.jobDetails.jobTitle}</p>
                    <p className='text-xs text-gray-500'>Posted by {jobData?.postedBy?.name} | {jobData?.recruiterProfile?.organizationDetails?.organizationName}</p>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                        <div className='text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded-md border border-blue-500'>{jobData.jobDetails.jobType}</div>
                        <div className="text-xs text-green-500 bg-green-100 px-2 py-1 rounded-md border border-green-500">{jobData.jobDetails.workMode}</div>
                        <div className="text-xs text-violet-500 bg-violet-100 px-2 py-1 rounded-md border border-violet-500">{jobData.jobDetails.jobLevel}</div>
                        
                    </div>
                    <div className="mt-5 flex items-center gap-5">
                            <span>
                                {
                                    getDaysLeftFromToday(jobData.jobDetails.expiresAt as string) <= 5 && (
                                        <span className='text-xs text-red-500'>Expire in {getDaysLeftFromToday(jobData?.jobDetails?.expiresAt as string)} days</span>
                                    )
                                }
                                {
                                    getDaysLeftFromToday(jobData?.jobDetails?.expiresAt as string) > 5 && (
                                        <span className='text-xs text-blue-500'>Apply by {transformDate(jobData?.jobDetails?.expiresAt as string)}</span>
                                    )
                                }
                            </span>
                            <span className='flex items-center gap-2'>
                                <BsClock size={12} />
                                <p className='text-xs text-gray-500'>Posted {formatRelativeTime(jobData.jobDetails.createdAt)}</p>
                            </span>
                            {/* {
                            
                            jobData?.jobDetails?.expiresAt < new Date() 
                                ? <>
                                   <i className="fa-solid fa-circle-xmark"></i> 
                                   <span className='text-xs text-red-500 ms-2'>Expired</span>
                                 </>
                                : <span className='text-xs text-green-500'>{getDaysLeftFromToday(jobData?.jobDetails?.expiresAt || new Date())} Days left</span>
                            
                        } */}
                        </div>
                </div>
                <div className=''>
                    {
                        isJobSaved && (
                            <button onClick={() => jobUnsave(jobData.jobDetails._id as string)} className='w-8 h-8 bg-gray-100 flex items-center justify-center rounded-md'>
                                <CiBookmarkCheck />
                            </button>
                        )
                    }

                    {
                        !isJobSaved && (
                            <button className='w-8 h-8 bg-gray-100 flex items-center justify-center rounded-md'>
                                <CiBookmark />
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
        {/* <div className="p-2 flex bg-white justify-between items-center border-b border-gray-300">
            <div className="job flex gap-4">
                <div className='logo'>
                    <img src={defaultProfile} style={{width:'50px',height:'50px'}} alt="" />
                </div>

                <div className="details">
                    <p className="text-sm">{jobData?.jobDetails?.jobTitle || 'Job title'} <span className='bg-blue-200 rounded-full text-xs px-2'>{jobData?.jobDetails?.locationType || 'Remote'}</span></p>
                    <div className="flex gap-5">
                        <p><span className='text-xs text-gray-400'>{jobData?.jobDetails?.location || 'Kannur, Kerala, India'}</span> <span className='text-xs text-gray-400'>Rs. {jobData?.jobDetails?.minSalary || '500'} - Rs. {jobData?.jobDetails?.maxSalary || '1000'}</span></p>
                    <p>
                        
                        {
                            
                            jobData?.jobDetails?.expiresAt < new Date() 
                                ? <>
                                   <i className="fa-solid fa-circle-xmark"></i> 
                                   <span className='text-xs text-red-500 ms-2'>Expired</span>
                                 </>
                                : <span className='text-xs text-green-500'>{getDaysLeftFromToday(jobData?.jobDetails?.expiresAt || new Date())} Days left</span>
                            
                        }
                        
                        
                    </p>
                    </div>
                </div>
            </div>
            <div className="actions">
                <i className="fa-solid fa-bookmark !text-black" onClick={() => jobUnsave(jobData?.jobId, jobData?._id)}></i>
            </div>
            <p>Pdf viewer</p>
            
        </div> */}
        
        </>
        
    )
}