import React, { useEffect, useMemo, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { loadJobDetails } from "../../../services/commonServices"
import { candidateApplyJob } from "../../../services/userServices"
import { addUserResume, loadUserResumes } from "../../../services/resumeServices"
import { JobDetailsForPublicData, Resumes } from "../../../types/entityTypes"
import { BsArrowLeft, BsEye } from "react-icons/bs"
import { Notify } from "notiflix"
import { LuBriefcase, LuFileText, LuGraduationCap, LuIndianRupee, LuUpload } from "react-icons/lu"

export default function JobApplyPage() {
    
    const [resume, setResume] = useState<File | null>(null)
    const [myResumesList, setMyResumesList] = useState<Resumes[]>([])
    // const [resumeLoader, setResumeLoader] = useState(false)
    const [savedResumeId, setSavedResumeId] = useState("")
    const [filename, setFilename] = useState('')
    const [resumeNillError, setResumeNillError] = useState('') 
    console.log(resumeNillError)
    const [jobDetails, setJobDetails] = useState<JobDetailsForPublicData | null | undefined>()
    const [coverLetterContent, setCoverLetterContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [coverLetterContentNillError, setResumeCoverLetterContentNillError] = useState('')
    console.log(coverLetterContentNillError)
    const resumeFieldRef = useRef<HTMLInputElement | null>(null)

    const params = useParams()

    const selectOneResumeFromList = (resumeId: string) => {
        setSavedResumeId((prv) => {
            if(prv && prv === resumeId){
                return ""
            }else{
                return resumeId
            }
        })
    }

    const jobId = params.id

    const location = useLocation()
    const data = useMemo(() => {
      return location.state?.jobDetails || {}
    }, [location.state?.jobDetails])
    const navigatTo = useNavigate()
    console.log('--checking what is coming from the backend--', location.state)
    console.log('job details through location obj', data)

    function clickResumeField(){
        if(resumeFieldRef.current){
          resumeFieldRef.current.click()
        }
        
    }

    function selectResume(event : React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files ? event?.target?.files[0] : null
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
        let resumenillerror = false
        if(!savedResumeId && !resume){
            resumenillerror = true
        }else if(!resume && savedResumeId){
            resumenillerror = false
        }else if(!savedResumeId && resume){
            resumenillerror = false
        }
        
        const coverletternillerror = !coverLetterContent || !/^[a-zA-Z0-9\s.,!?;:'"@#$%&*()\-_/+=\r\n]{50,2000}$/.test(coverLetterContent) || false

        if(resumenillerror){
          setResumeNillError('Please select file first')
        }else {
          setResumeNillError('')
        }

        if(coverletternillerror){
          setResumeCoverLetterContentNillError('Write your cover letter')
        }else{
          setResumeCoverLetterContentNillError('')
        }
        // resumenillerror ? setResumeNillError('Please select file first') : setResumeNillError('')
        // coverletternillerror ? setResumeCoverLetterContentNillError('Write your cover letter') : setResumeCoverLetterContentNillError('')

        if(resumenillerror || coverletternillerror) return false

        return true
    }

    function confirmApplicationSubmit(){
        Swal.fire({
            icon: 'question',
            title: 'Confirm Submission?',
            showConfirmButton: true,
            confirmButtonText: 'Continue',
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then((response) => {
            if(response.isConfirmed){
                submitApplication()
            }else{
                return
            }
        })
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
            let resumeResult
            if(!savedResumeId){
                const formData = new FormData();
                formData.append('resume', resume as Blob);

                resumeResult = await addUserResume(formData);
                console.log('-- recently uploadred recume id response--', resumeResult, resumeResult?.result?._id)
                setSavedResumeId(resumeResult?.result?._id)
                if (!resumeResult?.success) {
                    throw new Error(resumeResult?.message || 'Failed to upload resume.');
                }
            }
            // toast.info('Testing done')

            const applicationResult = await candidateApplyJob(jobId || jobDetails?._id as string, coverLetterContent, savedResumeId || resumeResult?.result?._id);

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
                navigatTo('/job/application/success-state', {state: 
                    {
                        jobTitle: jobDetails?.jobTitle,
                        recruiterName: jobDetails?.recruiterProfileDetails?.name, 
                        companyName: jobDetails?.companyProfileDetails?.name,
                        workMode: jobDetails?.workMode, 
                        minSalary: jobDetails?.minSalary, 
                        maxSalary: jobDetails?.maxSalary,
                        applicationId: applicationResult?.result?._id || ''
                    }
                });
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

        async function fetchMyExistingResumes(){
            try {
                // setResumeLoader(true)
                const resumeResult = await loadUserResumes()
                console.log('--checking my resume list from backend--', resumeResult)
                Notify.success('Resume fetched succesfully')
                setMyResumesList(resumeResult.resumes)
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Failed to load resumes')
            } finally {
                // setResumeLoader(false)
            }
        }
        fetchMyExistingResumes()

    }, [data, jobId])

    return (
      <div className="">
        <div className="py-10 lg:py-10 bg-gray-50 rounded-lg px-5 lg:px-10">
          <button className="flex hover:bg-gray-200 p-2 rounded-md items-center gap-2 text-xs font-medium text-gray-500">
            <BsArrowLeft size={18} />
            <p>Back to job details</p>
          </button>
          <p className="text-2xl font-bold tracking-wide text-gray-900 mt-5">Apply for Position</p>
          <p className="text-sm mt-1 text-gray-500 font-normal">
            Submit your application for the role {jobDetails?.jobTitle}
          </p>
          <div className="mt-5 bg-white rounded-lg border border-slate-100 p-5 shadow-[0_0_30px_2px_rgba(100,0,250,0.1)]">
            <p className="uppercase text-sm font-bold text-gray-400 tracking-wide">
              choose a resume
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {myResumesList.map((resume: Resumes) => (
                <div
                  key={resume._id}
                  onClick={() => selectOneResumeFromList(resume._id as string)}
                  className={`group cursor-pointer transition-all border rounded-xl p-4 flex items-center gap-3 ${
                    savedResumeId === resume._id
                      ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                      savedResumeId === resume._id
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <LuFileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold truncate ${savedResumeId === resume._id ? 'text-blue-700' : 'text-slate-700'}`}
                    >
                      {resume.name}
                    </p>
                    <p className="text-xs text-slate-400">PDF Document</p>
                  </div>
                  <a
                    href={resume.resumeUrlCoudinary}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white rounded-full transition-colors"
                  >
                    <BsEye className="text-slate-400 group-hover:text-blue-500" size={14} />
                  </a>
                </div>
              ))}
            </div>
            <div className="my-5 flex items-center justify-center">
              <p className="text-xs text-gray-400 uppercase font-medium w-fit m-0 p-0">
                or upload new
              </p>
            </div>
            {!savedResumeId && (
              <div className="py-10 border-2 border-dashed group hover:bg-blue-50 transition-color duration-300 border-slate-200 hover:border-blue-500 bg-gray-50 rounded-lg flex flex-col items-center">
                <div className="border border-slate-100 w-12 h-12 rounded-lg shadow-sm bg-white flex items-center justify-center">
                  <LuUpload className="text-blue-500" size={20} />
                </div>
                {resume ? (
                  <div className="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 py-2 px-4 rounded-full w-fit mx-auto text-sm font-medium">
                    <span>{filename}</span>
                    <i
                      onClick={unselectResume}
                      className="fa-solid fa-circle-xmark cursor-pointer hover:text-red-500"
                    ></i>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={clickResumeField}
                      className="text-blue-600 font-bold hover:underline transition-all duration-300 mt-3"
                    >
                      Click to browse
                    </button>
                    <p className="text-slate-400 text-xs mt-1 font-medium tracking-wide">
                      Supported format: PDF (Max 5MB)
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mt-5 bg-white border border-slate-100 rounded-lg p-5 shadow-[0_0_30px_2px_rgba(100,0,250,0.1)]">
            <p className="font-semibold uppercase text-sm text-gray-400 tracking-wide">Cover Letter</p>
            <p className="text-xs font-normal text-gray-500 mt-1 ">
              Tell us, why you are great for this position?
            </p>
            <textarea
              value={coverLetterContent}
              onChange={(event) => setCoverLetterContent(event.target.value)}
              rows={13}
              className="mt-3 border border-slate-200 rounded w-full outline-0 focus:border-1 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-color duration-300 p-3 text-sm text-black-300"
              name=""
              id=""
            ></textarea>
            <div className="mt-2">
              <p className="text-gray-500 text-sm">{coverLetterContent.length} charecters</p>
            </div>
          </div>
          
          <input
            ref={resumeFieldRef}
            onChange={(event) => selectResume(event)}
            type="file"
            accept="application/pdf"
            className="border rounded px-3 py-2 mt-2 mb-2 hidden"
            name="resume"
            id="resume"
          />
          <button
            onClick={confirmApplicationSubmit}
            disabled={isSubmitting}
            className="mt-5 bg-blue-600 shadow-xl shadow-blue-200 transition-color duration-300 hover:bg-blue-700 text-white p-3 w-full text-sm font-semibold rounded-lg disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
          <div className="mt-5 p-5 lg:p-10 bg-blue-950 rounded-lg shadow-xl">
            <p className="uppercase text-slate-400 font-semibold tracking-wider">job summary</p>
            <div className="flex mt-3 gap-2">
                <div className="border border-slate-500 rounded-md px-2 py-1 bg-slate-700"><p className="uppercase text-xs text-white font-semibold">{jobDetails?.jobType || 'Contract'}</p></div>
                <div className="border border-green-500 rounded-md px-2 py-1"><p className="uppercase text-xs text-green-500 font-semibold">{jobDetails?.workMode || 'Hybrid'}</p></div>
                <div className="border border-indigo-500 rounded-md px-2 py-1"><p className="uppercase text-xs text-indigo-500 font-semibold">{jobDetails?.jobLevel || 'Entry-level'}</p></div>
            </div>
            <div className="mt-10 space-y-3">
                <div className="flex gap-3 items-center">
                    <LuIndianRupee className="text-slate-500" />
                    <p className="text-slate-300 font-medium text-sm">{jobDetails?.minSalary || '20000'} - {jobDetails?.maxSalary || '35000'}</p>
                </div>
                <div className="flex gap-3 items-center">
                    <LuBriefcase className="text-slate-500" />
                    <p className="text-slate-300 font-medium text-sm">{jobDetails?.experienceInYears || "0 years Exp."}</p>
                </div>
                <div className="flex gap-3 items-center">
                    <LuGraduationCap className="text-slate-500" />
                    <p className="text-slate-300 font-medium text-sm">{jobDetails?.qualification || 'Bachelors in Business Administration'}</p>
                </div>
            </div>
            <div className="mt-5 border-t border-slate-600 py-3">
                <p className="uppercase text-sm text-slate-500 font-bold tracking-wide">key requirements</p>
                <p className="text-xs mt-3 text-slate-400 font-medium tracking-wide leading-relaxed">{jobDetails?.requirements?.split(".")[0]}</p>
            </div>
          </div>
        </div>
      </div>
    );
}