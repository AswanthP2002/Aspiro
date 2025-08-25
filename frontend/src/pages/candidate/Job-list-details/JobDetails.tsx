import { useEffect, useState } from "react"
import defaultImage from '../../../../public/default-img-instagram.png'
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { loadJobDetails } from "../../../services/commonServices"
import { checkIsSaved, saveJob, unsaveJob } from "../../../services/candidateServices"
import { useSelector } from "react-redux"

export default function JObDetailsCandidateSide() {
    const [jobDetails, setjobDetails] = useState<any>({})
    const [isJobSaved, setIsJobSaved] = useState(false)
    
    const params = useParams()
    const jobId  = params?.id as string
    const logedCandidate = useSelector((state : any) => {
        return state.candidateAuth.token
    })

    console.log('params is here', jobId)
    const navigator = useNavigate()

    useEffect(() => {
        async function fetchJobDetails(){
            
            try {

                const result = await loadJobDetails(jobId)
                

                if(result.success){
                    console.log('job details fetched', result)
                    
                    setjobDetails(result?.jobDetails)
                }else{
                    Swal.fire({
                        icon:'error',
                        title:'Oops',
                        text:result?.message
                    })
                }

                if(logedCandidate){
                    const isSaved = await checkIsSaved(jobId)
                    setIsJobSaved(isSaved)
                }

            } catch (error : unknown) {
                if(error instanceof Error){
                    console.log('error occured while geting job details', error)
                    Swal.fire({
                        icon:'error',
                        title:'Error',
                        text:error?.message,
                    })
                }
            }
        }

        fetchJobDetails()
        
    }, [])

    function formatDate(createdAt: Date | string): string {
        const joined = new Date(createdAt)
        return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
    }

    function goToApplyPage(jobId : string) {
        navigator(`apply`, {state:{jobDetails}})
    }
    async function addJobToFavorites(jobId : string) {
        const result = await saveJob(jobId)

        if(result?.success){
            Swal.fire({
                icon:'success',
                title:'Saved',
                showConfirmButton:false,
                showCancelButton:false,
                timer:2400
            }).then(() => window.location.reload())
        }else{
            Swal.fire({
                icon:'error',
                title:'Oops',
                text:result?.message,
                showCancelButton:false,
            })
        }
    }

    async function jobUnsave(jobId : string, id : string) {
        const result = await unsaveJob(jobId, id)

        if(result?.success){
            Swal.fire({
                icon:'success',
                title:'Unsaved',
                showConfirmButton:false,
                showCancelButton:false,
                timer:2400
            }).then(() => window.location.reload())
        }else{
            Swal.fire({
                icon:'error',
                title:'Oops',
                text:result?.message,
                showCancelButton:false,
            })
        }
    }

    return (
        <>
            <div className="job-listing-container w-full">
                <div className="breadcrumbs-header bg-gray-100 w-full">
                    <div className="aspiro-container">
                        <div className="flex justify-between py-3">
                            <div className="left"><p className="text-sm">Job Details</p></div>
                            <div className="right"><p className="text-sm">Home / Jobs / Job Details</p></div>
                        </div>
                    </div>
                </div>
                <section className="jobs mt-5">
                    <div className="aspiro-container">
                        <div className="header w-full flex justify-between items-center">
                            <div className="company flex gap-4 items-center">
                                <img src={defaultImage} style={{width:'50px', height:'52px'}} alt="" />
                                <div>
                                    <p className="font-semibold">{jobDetails.jobTitle}</p>
                                    <p className="text-xs mt-2 text-gray-300">{jobDetails?.companyDetails?.companyName}
                                        <span className="ms-2 bg-green-100 text-green-400 text-xs rounded-sm px-2">{jobDetails?.jobType}</span>
                                        <span className="ms-2 bg-blue-100 text-blue-400 text-xs rounded-sm px-2">{jobDetails?.locationType}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="actions flex gap-2">
                                {
                                    isJobSaved
                                        ? <button type="button" className="save-button btn"><i className={`fa-solid fa-bookmark !text-2xl !text-black"`}></i></button>
                                        : <button onClick={() => addJobToFavorites(jobDetails?._id)} type="button" className="save-button btn"><i className={`fa-solid fa-bookmark !text-2xl !text-gray-300`}></i></button>
                                    }
                                
                                <button onClick={() => goToApplyPage(jobDetails?._id)} type="button" className="btn bg-blue-500 text-white rounded-sm px-3 py-2 text-sm">Apply now</button>
                            </div>
                        </div>
                        <div className="details w-full">
                            <div className="flex flex-col md:flex-row w-full">
                                <div className="col w-1/2">
                                    <div className="mt-10">
                                        <p className="font-semibold">Description</p>
                                        <p className="text-sm text-gray-400">{jobDetails?.description}</p>
                                    </div>

                                    <div className="mt-10">
                                        <p className="font-semibold">Requirements</p>
                                        <p className="text-sm text-gray-400">{jobDetails?.requirements}</p>
                                    </div>

                                    <div className="mt-10">
                                        <p className="font-semibold">Responsibilities</p>
                                        <p className="text-sm text-gray-400">{jobDetails?.responsibilities}</p>
                                    </div>

                                    <div className="mt-10">
                                        <p className="font-semibold">Why work with us? </p>
                                        <p className="text-sm text-gray-400">{jobDetails?.companyDetails?.benefit}</p>
                                    </div>
                                </div>
                                <div className="col w-1/2">
                                    <div className="border border-blue-100 rounded-sm flex items-center gap-5 p-5">
                                        <div className="w-1/2">
                                            <p className="text-center text-sm font-semibold">Salary (Monthly)</p>
                                            <p className="mt-3 text-center font-bold text-green-400">Rs.{jobDetails?.minSalary} - Rs.{jobDetails?.maxSalary}</p>
                                        </div>
                                        <div className="w-1/2 flex flex-col justify-center items-center">
                                            <i className="fa-solid fa-location-dot"></i>
                                            <p className="text-sm text-gray-300 font-semibold">Job Location</p>
                                            <p className="font-bold">{jobDetails?.location}</p>
                                        </div>
                                    </div>

                                    <div className="border border-blue-100 rounded-sm mt-5 p-5">
                                        <div className="flex justify-between">
                                            <div>
                                                <i className="fa-solid fa-calendar"></i>
                                                <p className="text-gray-400 text-xs">Job Posted</p>
                                                <p>{formatDate(jobDetails?.createdAt)}</p>
                                            </div>
                                            <div>
                                                <i className="fa-solid fa-hourglass-end"></i>
                                                <p className="text-gray-400 text-xs">Valid Untill</p>
                                                <p>{formatDate(jobDetails?.expiresAt)}</p>
                                            </div>
                                            <div>
                                                <i className="fa-solid fa-layer-group"></i>
                                                <p className="text-gray-400 text-xs">Job level</p>
                                                <p>{jobDetails?.jobLevel}</p>
                                            </div>
                                        </div>
                                        <hr className="mt-5" />
                                        <div className="flex mt-5 gap-20">
                                            <div>
                                                <i className="fa-solid fa-wallet"></i>
                                                <p className="text-gray-400 text-xs">Experience</p>
                                                <p>{jobDetails?.experience}</p>
                                            </div>
                                            <div>
                                                <i className="fa-solid fa-school"></i>
                                                <p className="text-gray-400 text-xs">Education</p>
                                                <p>{jobDetails?.qualification}</p>
                                            </div>
                                            
                                        </div>

                                        <div className="mt-5">
                                            <p className="font-semibold">Share this job</p>
                                            <div className="flex gap-2">
                                                <button type="button" className="btn bg-blue-100 rounded py-1 px-2 text-xs"><i className="fa-solid fa-link"></i>Copy Link</button>
                                                <button type="button" className="btn bg-blue-100 rounded px-2 py-1"><i className="fa-brands fa-linkedin"></i></button>
                                                <button type="button" className="btn bg-blue-100 rounded px-2 py-1"><i className="fa-brands fa-facebook"></i></button>
                                                <button type="button" className="btn bg-blue-100 rounded px-2 py-1"><i className="fa-solid fa-envelope"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 mb-5">
                                <div className="w-full border border-blue-100 rounded-sm p-5">
                                    <div className="flex items-center gap-10">
                                        <img src={defaultImage} style={{width:'60px', height:'63px'}} alt="" />
                                        <div>
                                            <p className="font-bold">{jobDetails?.companyDetails?.companyName}</p>
                                            <p className="text-sm font-normal">{jobDetails?.companyDetails?.industry}</p>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <p className="font-semibold">Found In : <span className="font-normal text-gray-400">{jobDetails?.companyDetails?.foundIn}</span></p>
                                        <p className="font-semibold">Organization Type : <span className="font-normal text-gray-400">{jobDetails?.companyDetails?.companyType}</span></p>
                                        <p className="font-semibold">Strength : <span className="font-normal text-gray-400">{jobDetails?.companyDetails?.teamStrength}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}