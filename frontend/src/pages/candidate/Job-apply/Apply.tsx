import { useEffect, useRef, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { candidateService } from "../../../services/apiServices"
import { useSelector } from "react-redux"
import { candidateApplyJob } from "../../../services/candidateServices"

export default function JobApplyPage() {
    
    const [resume, setResume] = useState<any>(null)
    const [filename, setFilename] = useState('')
    const [resumeNillError, setResumeNillError] = useState('') 
    const [jobDetails, setJobDetails] = useState<any>({})
    const [coverLetterContent, setCoverLetterContent] = useState('')
    const [coverLetterContentNillError, setResumeCoverLetterContentNillError] = useState('')
    const resumeFieldRef : any = useRef(null)

    const token = useSelector((state : any) => {
        return state.candidateAuth.token
    })

    const params : any = useParams()

    const jobId = params.id

    const location = useLocation()
    console.log('job details through location obj', location.state.jobDetails)

    function selectResume(event : any){
        const file = event.target.files[0]
        console.log('checking the file', file)
        if(file){
            setResume(file)
            setFilename(file?.name)
        }
    }

    function unselectResume(){
        setResume(null)
        if(resumeFieldRef.current){
            resumeFieldRef.current.value = ''
        }
    }

    function validateJobApply() : boolean{
        const resumenillerror = !resume || false
        const coverletternillerror = !coverLetterContent || !/^[a-zA-Z0-9\s.,!?;:'"@#$%&*()\-_/+=\r\n]{50,2000}$/.test(coverLetterContent) || false

        resumenillerror ? setResumeNillError('Please select file first') : setResumeNillError('')
        coverletternillerror ? setResumeCoverLetterContentNillError('Write your cover letter') : setResumeCoverLetterContentNillError('')

        if(resumenillerror || coverletternillerror) return false

        return true
    }

    async function applyJob() : Promise<void> {
        const isvalidateSuccess = validateJobApply()

        if(!isvalidateSuccess){
            Swal.fire({
                icon:'warning',
                title:'Denied',
                text:'Please fill the details'
            })
        }else{
            const formData = new FormData()
            formData.append('resume', resume)
            formData.append('coverLetterContent', coverLetterContent)

            //try {
                // let response = await candidateService.applyJob(token, jobId || jobDetails._id, formData)

                // if(response.status === 401){
                //     const newAccesstoken = await candidateService.refreshToken()
                //     response = await candidateService.applyJob(newAccesstoken, jobId || jobDetails?._id, formData)
                // }

                await candidateApplyJob(jobId || jobDetails?._id, formData)

                //if (result?.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Applied',
                        showCancelButton:false,
                        showConfirmButton:false,
                        timer:1300
                    }).then(() => window.location.reload())
                // }else{
                //     Swal.fire({
                //         icon:'error',
                //         title:'Oops!',
                //         text:result?.message
                //     })
                // }
            // } catch (error : unknown) {
            //     console.log('Error occured while applying the job', error)
            //     if(error instanceof Error){
            //         Swal.fire({
            //         icon:'error',
            //         title:'error',
            //         text:error?.message
            //     })
            //     }
            // }
        }
    }

    useEffect(() => {
        setJobDetails(location.state?.jobDetails)
    }, [])

    return(
        <div className="aspiro-container">
            <div className="py-10">
                <p className="text-xl font-semibold">Apply for {jobDetails?.jobTitle}</p>
                <div className="mt-10 row grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <p className="text-gray-500">Attach your resume <i className="fa-solid fa-paperclip"></i></p>
                        <div>
                            {
                                resume
                                    ? <div className="relative flex justify-start px-3 items-center border border-gray-200 w-[220px] h-[50px] mt-2 mb-2">
                                        <p className="text-xs">{filename}</p>
                                        <i className="fa-solid fa-file ms-2"></i>
                                        <i onClick={unselectResume} className="fa-solid fa-circle-xmark absolute top-0 cursor-pointer right-0"></i>
                                      </div>
                                    : null
                            }
                        </div>
                        <div>
                            <input ref={resumeFieldRef} onChange={(event) => selectResume(event)} type="file" accept="application/pdf" className="border rounded px-3 py-2 mt-2 mb-2" name="resume" id="resume" />
                            <label htmlFor="" className="block error-label text-xs">{resumeNillError}</label>
                        </div>
                        <div className="job-overview mt-5">
                            <p className="font-semibold">Job Overview</p>
                            <div className="details mt-5 mb-5">
                                <p className="text-sm">{jobDetails.jobTitle}</p>
                                <p><span className="bg-blue-300 text-xs px-2 rounded me-2">Location</span><span className="bg-green-300 px-2 text-xs rounded">Location Type</span></p>
                                <p className="mt-5 font-semibold">Rs.{jobDetails?.minSalary} - Rs.{jobDetails?.maxSalary}</p>
                                <div className="flex mt-5 gap-15">
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-school"></i>
                                        <div>
                                            <p className="text-xs font-semibold">Education</p>
                                            <p className="sm">{jobDetails?.qualification}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-school"></i>
                                        <div>
                                            <p className="text-xs font-semibold">Experience</p>
                                            <p className="sm">{jobDetails?.experience}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-school"></i>
                                        <div>
                                            <p className="text-xs font-semibold">Job Level</p>
                                            <p className="sm">{jobDetails?.jobLevel}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <p className="font-semibold">{jobDetails?.companyDetails?.companyName}</p>
                                    <p className="text-sm">{jobDetails?.companyDetails?.industry}</p>
                                    <p className="text-sm">{jobDetails?.companyDetails?.companyType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Covering Letter</p>
                        <label htmlFor="" className="error-label text-xs mt-3 mb-1">{coverLetterContentNillError}</label>
                        <textarea value={coverLetterContent} onChange={(event) => setCoverLetterContent(event.target.value)} className="mt-3 border border-gray-300 rounded w-full h-[600px] outline-0 p-3 text-sm text-black-300" name="" id=""></textarea>
                        <div className="mt-3 flex gap-5">
                            <button onClick={applyJob} className="bg-blue-500 text-white rounded px-3 py-2 text-sm">Apply</button>
                            <button className="bg-gray-300 rounded px-3 py-2 text-sm">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}