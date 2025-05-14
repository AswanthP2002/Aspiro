import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"


export default function PostAJobForm(){

    const [details, setdetails] = useState({
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
        responsibilities:""
    })
    const [titleError, settitlerror] = useState("")
    const [locationError, setlocationerror] = useState("")
    const [minsalaryError, setminsalaryerror] = useState("")
    const [maxsalaryError, setmaxsalaryerror] = useState("")
    const [vacanicesError, setvacancieserror] = useState("")
    const [qualificationError, setqualificationerror] = useState("")
    const [experienceError, setexperienceerror] = useState("")
    const [expiresAtError, setexpiresaterror] = useState("")
    const [descriptionError, setdescriptionerror] = useState("")
    const [requirementsError, setrequirementserror] = useState("")
    const [responsibilitiesError, setresponsibilitieserror] = useState("")
    
    const token = useSelector((state : any) => {
        return state.recruiterAuth.recruiterToken
    })

    const navigator = useNavigate()

    function handleData(event : any){
        setdetails((prevState) => {
            return{
                ...prevState,
                [event.target.name]:event.target.value
            }
        })
    }

    function submitJob(event : any){
        event?.preventDefault()

        const titlerror = !details.jobTitle || !/^[A-Za-z0-9\s\-.,]{2,100}$/.test(details.jobTitle) || false
        const locationerror = !details.location || !/^[A-Za-z\s,.-]{2,100}$/.test(details.location) || false
        const minsalaryerror = !details.minSalary || !/^\d{1,7}$/.test(details.minSalary)  || false
        const maxsalaryerror = !details.maxSalary || !/^\d{1,7}$/.test(details.maxSalary) || false
        const vacancyerror = !details.vacancies || !/^\d{1,3}$/.test(details.vacancies) || false
        const qualificationerror = !details.qualification || !/^[A-Za-z0-9\s,'-]{2,100}$/.test(details.qualification) || false
        const experienceerror = !details.experience || !/^\d{1,2}\s?(-\s?\d{1,2})?\s?(years?|year)?$/.test(details.experience) || false
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


        if(expiresaterror || titlerror || locationerror || minsalaryerror || maxsalaryerror || vacancyerror || qualificationerror || experienceerror || descriptionerror ||requirementserror|| responsibilitieserror){
            return
        }

        fetch('http://localhost:5000/recruiter/job/create', {
            method:'POST',
            headers:{
                authorization:`Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(details)
        })
        .then((response) => {
            if(response.status === 500) throw new Error('Internal server error, please try again after some time')
            return response.json()
        })
        .then((result) => {
            if(result.success){
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
            }else{
                Swal.fire({
                    icon:'error',
                    text:'Something went wrong'
                })
            }
        })
        .catch((error : any) => {
            console.log('Error occured while creating the job', error)
            Swal.fire({
                icon:'error',
                title:'!Oops',
                text:'Internal server error, please try again after some time',
                showConfirmButton:true
            }).then((result) => {
                if(result.isConfirmed) navigator('/recruiter')
            })
        })
    
    }

    return(
        <>
        <div className="container px-10 py-5">
            
            <p className="text-2xl font-bold">Post a Job</p>
            <form className="job-post-form mt-5" onSubmit={(event) => submitJob(event)}>
                <div className="mt-2">
                    <label htmlFor="">Job Title</label>
                    <input value={details.jobTitle} onChange={(event) => handleData(event)} type="text" name="jobTitle" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                    <label htmlFor="" className="error-label">{titleError}</label>
                </div>
                <div className="mt-2">
                    <label htmlFor="">Job Type</label>
                    <select  name="jobType" id="" className="w-full p-2 rounded-sm border border-gray-400" value={details.jobType} onChange={(event) => handleData(event)}>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
                <div className="mt-2 flex justify-between gap-20">
                    <div className="w-full">
                        <label htmlFor="">Location</label>
                        <input value={details.location} onChange={(event)  => handleData(event)} type="text" name="location" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                        <label htmlFor="" className="error-label">{locationError}</label>
                    </div>
                    <div className="w-full">
                        <label htmlFor="">Location Type</label>
                        <select name="locationType" id="" className="w-full p-2 rounded-sm border border-gray-400" value={details.locationType} onChange={(event) => handleData(event)}>
                            <option value="In-Office">In-Office</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                </div>
                <div className="mt-2 flex justify-between gap-20">
                    <div className="w-full">
                        <label htmlFor="">Minimum Salary</label>
                        <input value={details.minSalary} onChange={(event) => handleData(event)} type="number" name="minSalary" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                        <label htmlFor="" className="error-label">{minsalaryError}</label>
                    </div>
                    <div className="w-full">
                        <label htmlFor="">Maximum Salary</label>
                        <input value={details.maxSalary} onChange={(event) => handleData(event)} type="number" name="maxSalary" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                        <label htmlFor="" className="error-label">{maxsalaryError}</label>
                    </div>
                </div>
                <div>
                    <label htmlFor="">Vacancies</label>
                    <input value={details.vacancies} onChange={(event) => handleData(event)} type="number" name="vacancies" id="" className="w-full p-2 rounded-sm border border-gray-400" />
                    <label htmlFor="" className="error-label">{vacanicesError}</label>
                </div>
                <div>
                    <label htmlFor="">Qualification</label>
                    <textarea value={details.qualification} onChange={(event) => handleData(event)} name="qualification" id="" className="w-full p-2 rounded-sm border border-gray-400"></textarea>
                    <label htmlFor="" className="error-label">{qualificationError}</label>
                </div>
                <div>
                    <label htmlFor="">Experience</label>
                    <textarea value={details.experience} onChange={(event) => handleData(event)} name="experience" id="" className="w-full p-2 rounded-sm border border-gray-400"></textarea>
                    <label htmlFor="" className="error-label">{experienceError}</label>
                </div>
                <div className="mt-2 flex justify-between gap-20">
                    <div className="w-full">
                        <label htmlFor="">Job Level</label>
                        <select name="jobLevel" id="" className="w-full p-2 rounded-sm border border-gray-400" value={details.jobLevel} onChange={(event) => handleData(event)}>
                            <option value="Entry Level">Entry Level</option>
                            <option value="Experienced">Experienced</option>
                        </select>
                    </div>
                    <div className="w-full">
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
                <div className="mt-3">
                    <button type="submit" className="bg-blue-400 rounded-sm p-2 w-[120px]">Post</button>
                </div>
            </form>
        </div>
        </>
    )
}