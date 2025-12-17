import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { loadJobDetails } from "../../../services/commonServices"
import { addCandidateResume, candidateApplyJob, getSavedJobs } from "../../../services/userServices"
import { JobDetails } from "../../../types/entityTypes"
import { BsUpload } from "react-icons/bs"
import { BiClipboard, BiRupee } from "react-icons/bi"
import { PiGraduationCapThin, PiSuitcase } from "react-icons/pi"
import { FaUserTie } from "react-icons/fa"
import { CiCircleCheck } from "react-icons/ci"
import { Notify } from "notiflix"

export default function JobApplyPage() {
    
    const [resume, setResume] = useState<any>(null)
    const [savedResumeId, setSavedResumeId] = useState("")
    const [filename, setFilename] = useState('')
    const [resumeNillError, setResumeNillError] = useState('') 
    const [jobDetails, setJobDetails] = useState<JobDetails | null | undefined>()
    const [coverLetterContent, setCoverLetterContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [coverLetterContentNillError, setResumeCoverLetterContentNillError] = useState('')
    const resumeFieldRef : any = useRef(null)

    const params : any = useParams()

    const jobId = params.id

    const location = useLocation()
    const data = location.state?.jobDetails || {}
    const navigatTo = useNavigate()
    console.log('--checking what is coming from the backend--', location.state)
    console.log('job details through location obj', data)

    function clickResumeField(){
        resumeFieldRef.current.click()
    }

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

    async function submitApplication(): Promise<void> {
        if (!validateJobApply()) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Application',
                text: 'Please fill all the required details before submitting.'
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('resume', resume);

            const resumeResult = await addCandidateResume(formData);

            if (!resumeResult?.success) {
                throw new Error(resumeResult?.message || 'Failed to upload resume.');
            }

            const applicationResult = await candidateApplyJob(jobId || jobDetails?._id, coverLetterContent, resumeResult?.resumeId);

            if (!applicationResult?.success) {
                throw new Error(applicationResult?.message || 'Failed to submit application.');
            }

            Swal.fire({
                icon: 'success',
                title: 'Successfully Applied!',
                text: 'Your application has been submitted.',
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                navigatTo('/profile/my-applications');
            });
        } catch (error: unknown) {
            Swal.fire({ icon: 'error', title: 'Submission Failed', text: error instanceof Error ? error.message : 'An unexpected error occurred.' });
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            setJobDetails(data)
        } else if (jobId) {
            (async () => {
                const result = await loadJobDetails(jobId);
                if (result.success) {
                    setJobDetails(result.jobDetails);
                }
            })();
        }
    }, [data, jobId])

    return(
        <div className="">
            <div className="py-10">
                <p className="text-xl font-semibold">Apply for Position</p>
                <p className="text-sm mt-2 text-gray-500">Submit your application for the role {jobDetails?.jobTitle}</p>
                <div className="mt-5 bg-white rounded-md p-5 border border-gray-200 shadow-sm">
                    <p className="font-light mb-2">Resume / CV</p>
                    <p className="text-sm text-gray-500">Upload your resume / CV in pdf format</p>
                    <div className="my-3">
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
                    </div>
                    <div className="border-3 border-gray-500 border-dotted flex flex-col justify-center items-center p-5 rounded-md">
                        <div className="bg-blue-500 text-white w-13 h-13 flex items-center justify-center rounded-full">
                            <BsUpload color="white" size={22} />
                        </div>
                        <p onClick={clickResumeField} className="underline text-blue-500 mt-2 cursor-pointer">Browse file</p>
                        <p className="text-gray-500 text-xs">Supported format PDF only</p>
                    </div>
                </div>

                <div className="mt-5 bg-white border border-gray-200 rounded-md p-5">
                    <p className="font-light">Cover Letter</p>
                    <p className="text-xs text-gray-500 mt-2">Tell us, why you are great for this position?</p>
                    <textarea value={coverLetterContent} onChange={(event) => setCoverLetterContent(event.target.value)} rows={13} className="mt-3 border border-gray-300 rounded w-full outline-0 p-3 text-sm text-black-300" name="" id=""></textarea>
                    <div className="mt-2">
                        <p className="text-gray-500 text-sm">{coverLetterContent.length} charecters</p>
                    </div>
                </div>

                <div className="mt-5 bg-white border border-gray-200 rounded-md p-5">
                    <p className="font-light">Job Overview</p>
                    <div className="mt-2 flex items-center gap-2">
                        <div className="text-xs text-blue-500 bg-blue-100 border border-blue-500 rounded-md px-2 py-1">{jobDetails?.jobType}</div>
                        <div className="text-xs text-green-500 bg-green-100 border border-green-500 rounded-md px-2 py-1">{jobDetails?.workMode}</div>
                        <div className="text-xs text-violet-500 bg-vioelt-100 border border-violet-500 rounded-md px-2 py-1">{jobDetails?.jobLevel}</div>
                    </div>
                    <div className="mt-3 flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <BiRupee />
                            <p className="text-sm">{jobDetails?.minSalary} - {jobDetails?.maxSalary}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <PiSuitcase />
                            <p className="text-sm"><span className="font-semibold">Experience: </span>{jobDetails?.experienceInYears} Year of experience</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <PiGraduationCapThin />
                            <p className="text-sm"><span className="font-semibold">Education: </span>{jobDetails?.qualification}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaUserTie />
                            <p className="text-sm"><span className="font-semibold">Posted by: </span>{jobDetails?.userProfile?.name} | {jobDetails?.userRecruiterProfile?.organizationDetails?.organizationName}</p>
                        </div>
                        
                    </div>
                    <div className="my-3 border border-gray-200"></div>
                    <div>
                        <div className="font-light flex items-center gap-2">Requirements <CiCircleCheck color="green" /></div>
                        <p className="mt-2 text-xs text-gray-500">{jobDetails?.requirements}</p>
                    </div>
                    <div className="my-3 border border-gray-200"></div>
                    <div>
                        <div className="font-light flex items-center gap-2">Responsibilties <BiClipboard color="orange" /></div>
                        <p className="mt-2 text-xs text-gray-500">{jobDetails?.responsibilities}</p>
                    </div>
                </div>
                <input ref={resumeFieldRef} onChange={(event) => selectResume(event)} type="file" accept="application/pdf" className="border rounded px-3 py-2 mt-2 mb-2 hidden" name="resume" id="resume" />
                <button onClick={submitApplication} disabled={isSubmitting} className="mt-3 bg-blue-500 text-white px-3 py-2 w-full text-sm rounded-md disabled:bg-gray-400">
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
                
                {/* <div className="mt-10 row grid grid-cols-1 md:grid-cols-2 gap-5">
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
                            
                            <label htmlFor="" className="block error-label text-xs">{resumeNillError}</label>
                        </div>
                        <div className="job-overview mt-5">
                            <p className="font-semibold">Job Overview</p>
                            <div className="details mt-5 mb-5">
                                <p className="text-sm">{jobDetails?.jobTitle}</p>
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
                                            <p className="sm">{jobDetails?.experienceInYears}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-school"></i>
                                        <div>
                                            <p className="text-xs font-semibold">Job Level</p>
                                            <p className="sm">{jobDetails?.jobLevel}</p>
                                        </div>
                                    </div>
                                </div> */}

                                {/* <div className="mt-5"> */}
                                    {/* <p className="font-semibold">{jobDetails?.companyDetails?.companyName}</p>
                                    <p className="text-sm">{jobDetails?.companyDetails?.industry}</p>
                                    <p className="text-sm">{jobDetails?.companyDetails?.companyType}</p> */}
                                {/* </div>
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
                </div>*/}
            </div>
        </div>
    )
}