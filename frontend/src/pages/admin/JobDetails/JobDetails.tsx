import { useEffect, useState } from 'react'
import defaultProfileImage from '/default-img-instagram.png'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useRefreshToken from '../../../hooks/refreshToken'
import Swal from 'sweetalert2'
import { adminServices } from '../../../services/commonServices'
import { blockJobUnblockJob, getJobDetails, rejectJobUnrejectJob } from '../../../services/adminServices'


export default function JobDetails(){

    const [jobdetails, setjobdetails] = useState<any>({})
    const params : any = useParams()
    const jobId = params.id
    const token = useSelector((state : any) => {
        return state.adminAuth.adminToken
    })
    const navigator = useNavigate()

    useEffect(() => {

        async function fetchJobDetails(){

            
                const result = await getJobDetails(jobId)
                
                    setjobdetails(result?.jobDetails)
                    console.log('job details from the server', result?.jobDetails)
                
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
        <h2 className="font-bold">Job Details</h2>
        <div className="p-6 bg-[#ffffff] min-h-screen w-full mt-5 rounded-2xl">
            {/* Company id / join date / found date :: details */}
            <div className="flex justify-between w-full">
                <div className="left">
                    <p className="text-gray-400 font-semibold">Job id</p>
                    <p className="text-sm font-semibold">{jobdetails?._id}</p>
                </div>
                <div className="right">
                    <p className="text-gray-400 font-semibold">Created Date : <span className="ms-5 text-black font-semibold">{formatDate(jobdetails.createdAt)}</span></p>
                    <p className="text-gray-400 font-semibold">Expires At : <span className="ms-5 text-black font-semibold">{formatDate(jobdetails?.expiresAt)}</span></p>
                </div>
            </div>

            {/* Company manifest details */}
            <div className="flex w-full justify-between mt-15">
                {/* Div one */}

                <div>
                    <p className="text-sm font-semibold mb-2">{jobdetails?.jobTitle}</p>
                    <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.jobType}</p>
                    <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.locationType ? jobdetails?.locationType : "not specified"}</p>
                </div>

                <div className='flex items-center gap-2'> 
                    <img src={jobdetails?.companyDetails?.logo ? jobdetails?.companyDetails?.logo : defaultProfileImage} alt="" style={{width:'58px', height:'60px'}} />
                    <div>
                        <p className="text-sm font-semibold mb-2">{jobdetails?.companyDetails?.companyName}</p>
                        <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.companyDetails?.industry}</p>
                        <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails.companyDetails?.location?.city}, {jobdetails?.companyDetails?.location?.country}</p>
                    </div>
                </div>

                {/* Div two */}
                <div>
                            <p className="text-sm text-gray-400 font-semibold mb-2">Job status</p>
                            {
                                jobdetails?.isBlocked 
                                    ? <p className="text-xs font-normal text-red-400">Blocked</p>
                                    : <p className="text-xs font-normal text-green-400">Active</p>
                            }
                            
                </div>
                <div>
                            <p className="text-sm text-gray-400 font-semibold mb-2">Job Activity Status</p>
                            {
                                jobdetails?.isRejected 
                                    ? <p className="text-xs font-normal text-red-400">Rejected</p>
                                    : <p className="text-xs font-normal text-green-400">On hiring</p>
                            }
                            
                    </div>

                <div>
                    <p className="text-sm font-semibold mb-2">{jobdetails?.minSalary} - {jobdetails?.maxSalary}</p>
                    <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.jobLevel}</p>
                    <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.experience}</p>
                    <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.qualification}</p>
                </div>
            </div>

            {/* Company about details */}
            <div className="w-full mt-15">
                <p className="text-sm font-semibold mb-2">Description</p>
                <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.description}</p>
            </div>

            <div className="w-full mt-15">
                <p className="text-sm font-semibold mb-2">Responsibilities</p>
                <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.responsibilities}</p>
            </div>

            {/* Company benefit details */}
            <div className="w-full mt-10">
                <p className="text-sm font-semibold mb-2">Requirements</p>
                <p className="text-xs font-normal text-gray-400 mb-1">{jobdetails?.requirements}</p>
            </div>


            <hr className="mt-3" />
            <div className="actions w-full flex justify-end mt-3">
                <div>
                        {
                            jobdetails?.isRejected
                                ? <button onClick={() => rejectUnRejectJob(jobdetails?._id, 'Unreject')} type="button" className="btn-close-company bg-red-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Un Reject</button>
                                : <button onClick={() => rejectUnRejectJob(jobdetails?._id, 'Reject')} type="button" className="btn-close-company bg-red-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Reject</button>
                        }
                        {
                            jobdetails?.isBlocked
                                ? <button onClick={() => blockUnblockJob(jobdetails?._id, 'Unblock')} type="button" className="btn-block bg-gray-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Unblock</button>
                                : <button onClick={() => blockUnblockJob(jobdetails?._id, 'Block')} type="button" className="btn-block bg-gray-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Block</button>    
                        }
                </div>
            </div>
        </div>
        </>
    )
}