import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { loadJobDetails } from "../../../services/commonServices"
import { candidateApplyJob, getSavedJobs } from "../../../services/userServices"
import { addUserResume, loadUserResumes } from "../../../services/resumeServices"
import { JobDetails, JobDetailsForPublicData, Resumes } from "../../../types/entityTypes"
import { BsArrowLeft, BsEye, BsUpload } from "react-icons/bs"
import { BiClipboard, BiRupee } from "react-icons/bi"
import { PiGraduationCapThin, PiSuitcase } from "react-icons/pi"
import { FaUserTie } from "react-icons/fa"
import { CiCircleCheck } from "react-icons/ci"
import { Notify } from "notiflix"
import { LuBriefcase, LuFileText, LuGraduationCap, LuIndianRupee, LuUpload } from "react-icons/lu"
import { toast } from "react-toastify"

export default function JobApplyPage() {
    
    const [resume, setResume] = useState<File | null>(null)
    const [myResumesList, setMyResumesList] = useState<Resumes[]>([])
    const [resumeLoader, setResumeLoader] = useState(false)
    const [savedResumeId, setSavedResumeId] = useState("")
    const [filename, setFilename] = useState('')
    const [resumeNillError, setResumeNillError] = useState('') 
    const [jobDetails, setJobDetails] = useState<JobDetailsForPublicData | null | undefined>()
    const [coverLetterContent, setCoverLetterContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [coverLetterContentNillError, setResumeCoverLetterContentNillError] = useState('')
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
    const data = location.state?.jobDetails || {}
    const navigatTo = useNavigate()
    console.log('--checking what is coming from the backend--', location.state)
    console.log('job details through location obj', data)

    function clickResumeField(){
        resumeFieldRef.current.click()
    }

    function selectResume(event : React.ChangeEvent<HTMLInputElement>){
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
        let resumenillerror = false
        if(!savedResumeId && !resume){
            resumenillerror = true
        }else if(!resume && savedResumeId){
            resumenillerror = false
        }else if(!savedResumeId && resume){
            resumenillerror = false
        }
        
        const coverletternillerror = !coverLetterContent || !/^[a-zA-Z0-9\s.,!?;:'"@#$%&*()\-_/+=\r\n]{50,2000}$/.test(coverLetterContent) || false

        resumenillerror ? setResumeNillError('Please select file first') : setResumeNillError('')
        coverletternillerror ? setResumeCoverLetterContentNillError('Write your cover letter') : setResumeCoverLetterContentNillError('')

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

            const applicationResult = await candidateApplyJob(jobId || jobDetails?._id, coverLetterContent, savedResumeId || resumeResult?.result?._id);

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
                setResumeLoader(true)
                const resumeResult = await loadUserResumes()
                console.log('--checking my resume list from backend--', resumeResult)
                Notify.success('Resume fetched succesfully')
                setMyResumesList(resumeResult.resumes)
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Failed to load resumes')
            } finally {
                setResumeLoader(false)
            }
        }
        fetchMyExistingResumes()

    }, [data, jobId])

    return (
      //         <div className="max-w-6xl mx-auto pt-8 pb-16 px-4 lg:px-8 bg-slate-50 min-h-screen">
      //     {/* Top Navigation */}
      //     <div className="flex items-center justify-between mb-8">
      //         <button className="flex hover:bg-slate-200 p-2 rounded-full items-center gap-2 text-sm font-medium text-slate-500 transition-all">
      //             <BsArrowLeft size={18} />
      //             <span>Back to job details</span>
      //         </button>
      //     </div>

      //     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

      //         {/* LEFT COLUMN: The Application Form (8 Columns) */}
      //         <div className="lg:col-span-8 space-y-6">
      //             <header className="mb-6">
      //                 <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Apply for Position</h1>
      //                 <p className="text-slate-500 mt-2">Submit your details for <span className="text-blue-600 font-semibold">{jobDetails?.jobTitle}</span></p>
      //             </header>

      //             {/* Resume Selection Section */}
      //             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      //                 <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Choose a Resume</h3>

      // <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      //     {myResumesList.map((resume: Resumes) => (
      //         <div
      //             key={resume._id}
      //             onClick={() => selectOneResumeFromList(resume._id as string)}
      //             className={`group cursor-pointer transition-all border rounded-xl p-4 flex items-center gap-3 ${
      //                 savedResumeId === resume._id
      //                 ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
      //                 : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
      //             }`}
      //         >
      //             <div className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
      //                 savedResumeId === resume._id ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-500"
      //             }`}>
      //                 <LuFileText size={20} />
      //             </div>
      //             <div className="flex-1 min-w-0">
      //                 <p className={`text-sm font-semibold truncate ${savedResumeId === resume._id ? "text-blue-700" : "text-slate-700"}`}>
      //                     {resume.name}
      //                 </p>
      //                 <p className="text-xs text-slate-400">PDF Document</p>
      //             </div>
      //             <a href={resume.resumeUrlCoudinary} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white rounded-full transition-colors">
      //                 <BsEye className="text-slate-400 group-hover:text-blue-500" size={14} />
      //             </a>
      //         </div>
      //     ))}
      // </div>

      //                 <div className="relative my-8 text-center">
      //                     <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
      //                     <span className="relative px-4 text-xs font-semibold text-slate-400 bg-white uppercase tracking-widest">or upload new</span>
      //                 </div>

      //                 {/* Upload Area */}
      //   {!savedResumeId && (
      //       <div className="group border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-8 transition-all text-center bg-slate-50/50">
      //           <div className="mx-auto bg-white shadow-sm border border-slate-100 text-blue-500 w-12 h-12 flex items-center justify-center rounded-xl mb-4 group-hover:scale-110 transition-transform">
      //               <BsUpload size={20} />
      //           </div>
      //   {resume ? (
      //       <div className="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 py-2 px-4 rounded-full w-fit mx-auto text-sm font-medium">
      //           <span>{filename}</span>
      //           <i onClick={unselectResume} className="fa-solid fa-circle-xmark cursor-pointer hover:text-red-500"></i>
      //       </div>
      //   ) : (
      //       <>
      //           <button onClick={clickResumeField} className="text-blue-600 font-bold hover:underline">Click to browse</button>
      //           <p className="text-slate-400 text-xs mt-1 font-medium tracking-wide">Supported format: PDF (Max 5MB)</p>
      //       </>
      //   )}
      //       </div>
      //   )}
      //             </div>

      //             {/* Cover Letter Section */}
      //             <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      //                 <div className="flex justify-between items-end mb-4">
      //                     <div>
      //                         <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Cover Letter</h3>
      //                         <p className="text-sm text-slate-500">Why are you the perfect fit?</p>
      //                     </div>
      //                     <span className={`text-xs font-mono font-medium ${coverLetterContent.length > 500 ? 'text-amber-600' : 'text-slate-400'}`}>
      //                         {coverLetterContent.length} chars
      //                     </span>
      //                 </div>
      //                 <textarea
      //                     value={coverLetterContent}
      //                     onChange={(event) => setCoverLetterContent(event.target.value)}
      //                     rows={10}
      //                     placeholder="Write something compelling..."
      //                     className="w-full border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-0 p-4 text-slate-700 transition-all leading-relaxed"
      //                 />
      //             </div>

      //             <button
      //                 onClick={confirmApplicationSubmit}
      //                 disabled={isSubmitting}
      //                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none"
      //             >
      //                 {isSubmitting ? 'Processing Application...' : 'Submit Application'}
      //             </button>
      //         </div>

      //         {/* RIGHT COLUMN: Sticky Job Overview (4 Columns) */}
      //         <div className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
      //             <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl shadow-slate-200">
      //                 <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Job Summary</h3>
      //                 <div className="space-y-4">
      //                     <div className="flex flex-wrap gap-2">
      //                         <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 uppercase tracking-tighter">{jobDetails?.jobType}</span>
      //                         <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded border border-emerald-500/20 uppercase tracking-tighter">{jobDetails?.workMode}</span>
      //                         <span className="bg-violet-500/20 text-violet-400 text-[10px] font-bold px-2 py-1 rounded border border-violet-500/20 uppercase tracking-tighter">{jobDetails?.jobLevel}</span>
      //                     </div>

      //                     <div className="space-y-3 pt-4">
      //                         <div className="flex items-center gap-3 text-slate-300">
      //                             <BiRupee className="text-slate-500" />
      //                             <p className="text-sm font-medium">{jobDetails?.minSalary} - {jobDetails?.maxSalary}</p>
      //                         </div>
      //                         <div className="flex items-center gap-3 text-slate-300">
      //                             <PiSuitcase className="text-slate-500" />
      //                             <p className="text-sm font-medium">{jobDetails?.experienceInYears} Years Exp.</p>
      //                         </div>
      //                         <div className="flex items-center gap-3 text-slate-300">
      //                             <PiGraduationCapThin className="text-slate-500" />
      //                             <p className="text-sm font-medium">{jobDetails?.qualification}</p>
      //                         </div>
      //                     </div>

      //                     <div className="border-t border-white/5 pt-4">
      //                         <p className="text-xs font-bold text-slate-500 uppercase mb-2">Key Requirements</p>
      //                         <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">{jobDetails?.requirements}</p>
      //                     </div>
      //                 </div>
      //             </div>

      //             {/* Recruiter Badge */}
      //             <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
      //                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
      //                     {jobDetails?.recruiterProfileDetails?.name[0]}
      //                 </div>
      //                 <div className="flex-1">
      //                     <p className="text-xs font-bold text-slate-800">{jobDetails?.recruiterProfileDetails?.name}</p>
      //                     <p className="text-[10px] text-slate-500">{jobDetails?.companyProfileDetails?.name}</p>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>

      //     <input ref={resumeFieldRef} onChange={(event) => selectResume(event)} type="file" accept="application/pdf" className="hidden" />
      // </div>
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

          {/* <div className="mt-3">
            <p className="text-sm font-semibold text-gray-700">
              Choose your resume({myResumesList?.length})
            </p>
            <div className="grid grid-cols-2 mt-2 gap-2">
              {myResumesList.map((resume: Resumes) => (
                <div
                  onClick={() => selectOneResumeFromList(resume._id as string)}
                  className={`cursor-pointer bg-white border border-slate-200 p-3 ${savedResumeId === resume._id ? 'ring-1 ring-blue-500 shadow-lg' : ''} rounded-md flex items-center gap-2`}
                >
                  <div
                    className={`${savedResumeId === resume._id ? 'bg-blue-500' : 'bg-red-200'} w-8 h-8 flex items-center justify-center rounded-md`}
                  >
                    <LuFileText color="white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs">{resume.name}</p>
                  </div>
                  <div>
                    <a
                      href={resume.resumeUrlCoudinary}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={resume.name}
                      className="cursor-pointer"
                    >
                      <BsEye color="gray" size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          {/* <div>
            <p className="text-sm text-center font-light text-gray-700 mt-5">Or browse one</p>
          </div> */}
          {/* {!savedResumeId ? (
            <>
              <div className="mt-5 bg-white rounded-md p-5 border border-gray-200 shadow-sm">
                <p className="font-light mb-2">Resume / CV</p>
                <p className="text-sm text-gray-500">Upload your resume / CV in pdf format</p>
                <div className="my-3">
                  <div>
                    {resume ? (
                      <div className="relative flex justify-start px-3 items-center border border-gray-200 w-[220px] h-[50px] mt-2 mb-2">
                        <p className="text-xs">{filename}</p>
                        <i className="fa-solid fa-file ms-2"></i>
                        <i
                          onClick={unselectResume}
                          className="fa-solid fa-circle-xmark absolute top-0 cursor-pointer right-0"
                        ></i>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="border-3 border-gray-500 border-dotted flex flex-col justify-center items-center p-5 rounded-md">
                  <div className="bg-blue-500 text-white w-13 h-13 flex items-center justify-center rounded-full">
                    <BsUpload color="white" size={22} />
                  </div>
                  <p
                    onClick={clickResumeField}
                    className="underline text-blue-500 mt-2 cursor-pointer"
                  >
                    Browse file
                  </p>
                  <p className="text-gray-500 text-xs">Supported format PDF only</p>
                </div>
              </div>
            </>
          ) : null} */}

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


          {/* <div className="mt-5 bg-white border border-gray-200 rounded-md p-5">
            <p className="font-light">Job Overview</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-xs text-blue-500 bg-blue-100 border border-blue-500 rounded-md px-2 py-1">
                {jobDetails?.jobType}
              </div>
              <div className="text-xs text-green-500 bg-green-100 border border-green-500 rounded-md px-2 py-1">
                {jobDetails?.workMode}
              </div>
              <div className="text-xs text-violet-500 bg-vioelt-100 border border-violet-500 rounded-md px-2 py-1">
                {jobDetails?.jobLevel}
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <BiRupee />
                <p className="text-sm">
                  {jobDetails?.minSalary} - {jobDetails?.maxSalary}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <PiSuitcase />
                <p className="text-sm">
                  <span className="font-semibold">Experience: </span>
                  {jobDetails?.experienceInYears} Year of experience
                </p>
              </div>
              <div className="flex items-center gap-3">
                <PiGraduationCapThin />
                <p className="text-sm">
                  <span className="font-semibold">Education: </span>
                  {jobDetails?.qualification}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaUserTie />
                <p className="text-sm">
                  <span className="font-semibold">Posted by: </span>
                  {jobDetails?.recruiterProfileDetails?.name} |{' '}
                  {jobDetails?.companyProfileDetails?.name}
                </p>
              </div>
            </div>
            <div className="my-3 border border-gray-200"></div>
            <div>
              <div className="font-light flex items-center gap-2">
                Requirements <CiCircleCheck color="green" />
              </div>
              <p className="mt-2 text-xs text-gray-500">{jobDetails?.requirements}</p>
            </div>
            <div className="my-3 border border-gray-200"></div>
            <div>
              <div className="font-light flex items-center gap-2">
                Responsibilties <BiClipboard color="orange" />
              </div>
              <p className="mt-2 text-xs text-gray-500">{jobDetails?.responsibilities}</p>
            </div>
          </div> */}
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
                <p className="text-xs mt-3 text-slate-400 font-medium tracking-wide leading-relaxed">{jobDetails?.requirements.split(".")[0]}</p>
            </div>
          </div>
        </div>
      </div>
    );
}