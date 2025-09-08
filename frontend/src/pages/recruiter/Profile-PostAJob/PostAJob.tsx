import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { postJob } from "../../../services/recruiterServices"

interface JobDetails {
    jobTitle: string,
    jobType: string,
    location: string,
    locationType: string,
    minSalary: string,
    maxSalary: string,
    vacancies: string,
    qualification: string,
    experience: string,
    jobLevel: string,
    expiresAt: string,
    description: string
    requirements: string
    responsibilities: string
    duration: string
    requiredSkills: string[],
    optionalSkills: string[]
}
export default function PostAJobForm(){

    const [requiredSkills, setRequiredSkills] = useState<any[]>([])
    const requiredSkillRef = useRef<HTMLInputElement | null>(null)
    const [optionalSkills, setOptionalSkills] = useState<any[]>([])
    const optionalSkillRef = useRef<HTMLInputElement | null>(null)

    const [details, setdetails] = useState<JobDetails>({
        jobTitle:"",
        jobType:"",
        location:"",
        locationType:"",
        minSalary:"",
        maxSalary:"",
        vacancies:"",
        qualification:"",
        experience:"",
        jobLevel:"",
        expiresAt:"",
        description:"",
        requirements:"",
        responsibilities:"",
        duration:"",
        requiredSkills:[],
        optionalSkills:[]
    })

    

    const addRequiredSkill = (event : any) => {
        event.preventDefault()
        const skill = requiredSkillRef.current?.value
        if(!skill) return
        setdetails(prv => {
            return {...prv, requiredSkills:[...prv.requiredSkills, skill]}
        })
        if(requiredSkillRef.current) requiredSkillRef.current.value = ""
    }
    
    const removeRequiredSkill = (event : any, skill : string) => {
        event.preventDefault()
        setdetails(prv => {
            return {...prv, requiredSkills:prv.requiredSkills.filter((s : string) => s !== skill)}
        })
    }

    const addOptionalSkill = (event : any) => {
        event.preventDefault()
        const skill = optionalSkillRef.current?.value
        if(!skill) return
        setdetails(prv => {
            return {...prv, optionalSkills:[...prv.optionalSkills, skill]}
        })
        if(optionalSkillRef.current) optionalSkillRef.current.value = ""
        
    }

    const removeOptionalSkill = (event : any, skill : string) => {
        event.preventDefault()
        setdetails(prv => {
            return {...prv, optionalSkills:prv.optionalSkills.filter((s : string) => s !== skill)}
        })
    }

    const [titleError, settitlerror] = useState("")
    const [jobTypeError, setjobtyperror] = useState("")
    const [locationError, setlocationerror] = useState("")
    const [locationTypeError, setlocationtypeerror] = useState("")
    const [durationError, setDurationError] = useState("")
    const [minsalaryError, setminsalaryerror] = useState("")
    const [maxsalaryError, setmaxsalaryerror] = useState("")
    const [vacanicesError, setvacancieserror] = useState("")
    const [qualificationError, setqualificationerror] = useState("")
    const [experienceError, setexperienceerror] = useState("")
    const [expiresAtError, setexpiresaterror] = useState("")
    const [descriptionError, setdescriptionerror] = useState("")
    const [requirementsError, setrequirementserror] = useState("")
    const [responsibilitiesError, setresponsibilitieserror] = useState("")
    
    const navigator = useNavigate()

    function handleData(event : any){
        setdetails((prevState) => {
            return{
                ...prevState,
                [event.target.name]:event.target.value
            }
        })
    }

    async function submitJob(event : any){
        event?.preventDefault()

        const titlerror = !details.jobTitle || !/^[A-Za-z0-9\s\-.,]{2,100}$/.test(details.jobTitle) || false
        const jobtyperror = !details.jobType || false
        const locationerror = !details.location || !/^[A-Za-z\s,.-]{2,100}$/.test(details.location) || false
        const joblevelerror = !details.jobLevel || false
        const locationtyperror = !details.locationType || false
        const minsalaryerror = !details.minSalary || !/^\d{1,7}$/.test(details.minSalary)  || false
        const maxsalaryerror = !details.maxSalary || !/^\d{1,7}$/.test(details.maxSalary) || false
        const vacancyerror = !details.vacancies || !/^\d{1,3}$/.test(details.vacancies) || false
        const qualificationerror = !details.qualification || !/^(?!\d+$)(?!.*\d$)[A-Za-z.,()\-]+(?:\s[A-Za-z.,()\-]+)*$/.test(details.qualification) || false
        const experienceerror = !details.experience || !/^(?!\d+$)(?!.*\d$)[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/i.test(details.experience) || false
        const descriptionerror = !details.description || !/^.{10,1000}$/.test(details.description) || false
        const requirementserror = !details.requirements || !/^.{10,1000}$/.test(details.requirements) || false
        const responsibilitieserror = !details.responsibilities || !/^.{10,1000}$/.test(details.responsibilities) || false
        const expiresaterror = !details.expiresAt

        titlerror ? settitlerror('Enter valid job title') : settitlerror("")
        locationerror ? setlocationerror('Enter valid location') : setlocationerror("")
        minsalaryerror ? setminsalaryerror('Enter a valid salary') : setminsalaryerror('')
        maxsalaryerror ? setmaxsalaryerror('Enter valid salary') : setmaxsalaryerror('')
        vacancyerror ? setvacancieserror('Enter valid vacancies') : setvacancieserror('')
        qualificationerror ? setqualificationerror('Enter qualifications') : setqualificationerror('')
        experienceerror ? setexperienceerror('Enter valid experience') : setexperienceerror('')
        descriptionerror ? setdescriptionerror('Enter valid description') : setdescriptionerror('')
        requirementserror ? setrequirementserror('Enter valid requirements') : setrequirementserror('')
        responsibilitieserror ? setresponsibilitieserror('Enter valid responsiblities') : setresponsibilitieserror("")
        expiresaterror ? setexpiresaterror('Enter expiry date') : setexpiresaterror("")
        jobtyperror ? setjobtyperror('Select Job type') : setjobtyperror("")
        locationtyperror ? setlocationtypeerror('select location type') : setlocationtypeerror("")


        if(expiresaterror || jobtyperror || locationtyperror || titlerror || locationerror || minsalaryerror || maxsalaryerror || vacancyerror || qualificationerror || experienceerror || descriptionerror ||requirementserror|| responsibilitieserror){
            return
        }
        console.log('required skills', requiredSkills)
        console.log('optional skills', optionalSkills)

        //check the values that are going to backend
            await postJob(details)
            
                Swal.fire({
                    icon:'success',
                    title:'Posted',
                    text:'Job created successfully',
                    showConfirmButton:true,
                    confirmButtonText:'Jobs'
                }).then((result) => {
                    if(result.isConfirmed){
                        navigator('/recruiter/profile/overview') 
                    }
                })
    
    }

    return(
        <>
        <div className="container px-10 py-5">
            
            <p className="text-2xl font-bold">Post a Job</p>
            <form className="job-post-form mt-5" onSubmit={(event) => submitJob(event)}>
                <div className="flex w-full gap-10">
                <div className="w-1/3">
                    <label htmlFor="">Job Title</label>
                    <input value={details.jobTitle} onChange={(event) => handleData(event)} type="text" name="jobTitle" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                    <label htmlFor="" className="error-label">{titleError}</label>
                </div>
                <div className="w-1/3">
                    <label htmlFor="">Job Type</label>
                    <select  name="jobType" id="" className="w-full p-2 rounded-sm border border-gray-200 text-sm" value={details.jobType} onChange={(event) => handleData(event)}>
                        <option value="">--Select Job Type--</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Internship">Internship</option>
                    </select>
                    <label htmlFor="" className="error-label">{jobTypeError}</label>
                </div>
                <div className="w-1/3">
                    <label htmlFor="">Duration</label>
                    <input disabled={details?.jobType === 'Internship' ? false : true} value={details.duration} onChange={(event) => handleData(event)} type="text" name="duration" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                    <label htmlFor="" className="error-label">{titleError}</label>
                </div>
                </div>
                <div className="mt-2 flex justify-between gap-10">
                    <div className="w-1/3">
                        <label htmlFor="">Office Location</label>
                        <input value={details.location} onChange={(event)  => handleData(event)} type="text" name="location" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                        <label htmlFor="" className="error-label">{locationError}</label>
                    </div>
                    <div className="w-1/3">
                        <label htmlFor="">Work Mode</label>
                        <select name="locationType" id="" className="w-full p-2 text-sm rounded-sm border border-gray-200" value={details.locationType} onChange={(event) => handleData(event)}>
                            <option value="">--Select Location Type--</option>
                            <option value="In-Office">In-Office</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                    <div className="w-1/3">
                        <label htmlFor="">Vacancies</label>
                        <input value={details.vacancies} onChange={(event) => handleData(event)} type="number" name="vacancies" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                        <label htmlFor="" className="error-label">{vacanicesError}</label>
                    </div>
                </div>
                <div className="mt-2 w-full flex justify-between gap-10">
                    <div className="w-1/3">
                        <label htmlFor="">Minimum Salary</label>
                        <input value={details.minSalary} onChange={(event) => handleData(event)} type="number" name="minSalary" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                        <label htmlFor="" className="error-label">{minsalaryError}</label>
                    </div>
                    <div className="w-1/3">
                        <label htmlFor="">Maximum Salary</label>
                        <input value={details.maxSalary} onChange={(event) => handleData(event)} type="number" name="maxSalary" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                        <label htmlFor="" className="error-label">{maxsalaryError}</label>
                    </div>
                    <div className="w-1/3">
                        <label htmlFor="">Job Level</label>
                        <select name="jobLevel" id="" className="w-full p-2 rounded-sm border text-sm border-gray-200" value={details.jobLevel} onChange={(event) => handleData(event)}>
                            <option value="">--Select job level--</option>
                            <option value="Entry Level">Entry Level</option>
                            <option value="Experienced">Experienced</option>
                        </select>
                    </div>
                </div>
                <div className="flex mt-2 gap-10 w-full">
                    <div className="w-1/3">
                        <label htmlFor="">Qualification</label>
                        <input type="text" value={details.qualification} onChange={(event) => handleData(event)} name="qualification" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                        <label htmlFor="" className="error-label">{qualificationError}</label>
                    </div>
                    <div className="w-1/3">
                        <label htmlFor="">Experience</label>
                        <input type="" value={details.experience} onChange={(event) => handleData(event)} name="experience" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                        <label htmlFor="" className="error-label">{experienceError}</label>
                    </div>
                    <div className="w-1/3">
                        <label htmlFor="">Expires At</label>
                        <input value={details.expiresAt} onChange={(event) => handleData(event)} type="date" name="expiresAt" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                        <label htmlFor="" className="error-label">{expiresAtError}</label>
                    </div>
                </div>
                <div className="mt-2">
                    <label htmlFor="">Job Description</label>
                    <textarea value={details.description} onChange={(event) => handleData(event)} name="description" id="" className="w-full p-2 rounded-sm border border-gray-400"></textarea>
                    <label htmlFor="" className="error-label">{descriptionError}</label>
                </div>
                <div className="mt-2">
                    <label htmlFor="">Requirements</label>
                    <textarea value={details.requirements} onChange={(event) => handleData(event)} name="requirements" id="" className="w-full p-2 rounded-sm border border-gray-400"></textarea>
                    <label htmlFor="" className="error-label">{requirementsError}</label>
                </div>
                <div className="mt-2">
                    <label htmlFor="">Responsibilities</label>
                    <textarea value={details.responsibilities} onChange={(event) => handleData(event)} name="responsibilities" id="" className="w-full p-2 rounded-sm border border-gray-400"></textarea>
                    <label htmlFor="" className="error-label">{responsibilitiesError}</label>
                </div>
                <div className="mt-2">
                    <div>
                        <label htmlFor="">Required Skills</label>
                        <div className="flex gap-2">
                            <input ref={requiredSkillRef} id="required-skill" type="text" className="border border-gray-200 rounded-sm !p-2" />
                            <button onClick={(event) => addRequiredSkill(event)} className="text-sm text-blue-500 border border-blue-500 rounded-sm px-3 py-1">Add</button>
                        </div>
                        <div className="flex skill-preview gap-3 mt-3">
                            {details.requiredSkills.map((skill : string) => {
                                return <div className="flex gap-2 items-center bg-gray-200 rounded-full !px-3 !py-1">
                                            <p className="text-xs text-gray-500">{skill}</p>
                                            <button onClick={(event) => removeRequiredSkill(event, skill)}><i className="!text-gray-400 fa-solid fa-circle-xmark"></i></button>
                                        </div>
                                })
                            }
                        </div>
                        <label htmlFor="" className="error-label"></label>
                    </div>
                </div>
                <div className="mt-2">
                    <div>
                        <label htmlFor="">Optional Skills</label>
                        <div className="flex gap-2">
                            <input ref={optionalSkillRef} id="optional-skill" type="text" className="border border-gray-200 rounded-sm !p-2" />
                            <button onClick={(event) => addOptionalSkill(event)} className="text-sm text-blue-500 border border-blue-500 rounded-sm px-3 py-1">Add</button>
                        </div>
                        <div className="flex skill-preview gap-3 mt-3">
                            {details.optionalSkills.map((skill : string) => {
                                return <div className="flex gap-2 items-center bg-gray-200 rounded-full !px-3 !py-1">
                                            <p className="text-xs text-gray-500">{skill}</p>
                                            <button onClick={(event) => removeOptionalSkill(event, skill)}><i className="!text-gray-400 fa-solid fa-circle-xmark"></i></button>
                                        </div>
                                })
                            }
                        </div>
                        <label htmlFor="" className="error-label"></label>
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit" className="bg-blue-400 rounded-sm p-2 w-[120px]">Post</button>
                </div>
            </form>
        </div>
        </>
    )
}