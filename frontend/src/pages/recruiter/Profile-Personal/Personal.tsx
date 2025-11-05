import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import defaultProfile from '/default-img-instagram.png'
import { getProfileOverview } from "../../../services/recruiterServices"


export default function RecruiterProfilePersonal(){
    const [recruiter, setrecruiter] = useState<any>({})
    const [jobs, setjobs] = useState<any[]>([])
    const [loading, setloading] = useState(false)

    const token = useSelector((state : any) => {
        return state.recruiterAuth.recruiterToken
    })

    const navigator = useNavigate()

    console.log('Token before sending recruiter ::: ', token)

    useEffect(() => {
        async function fetchRecruiterProfileData(){
            setloading(true)
            
    
                const result = await getProfileOverview()
                    console.log('details from the backend', result?.recruiterDetails)
                
                    if (!result.recruiterDetails.companyName) {
                        setloading(false)
                        navigator('/recruiter/introdetails')
                    } else {
                        setrecruiter(result.recruiterDetails)
                        setjobs(result.recruiterDetails.jobs)
                        console.log('result from the backend', result)
                        setloading(false)
                    }
            
        }

        fetchRecruiterProfileData()
    }, [])

    function getApplicantDetailsPage(jobId : string){
        navigator(`/recruiter/profile/applications/${jobId}`)
    }

    function getReminingDays(expDate : Date | string) : number {
        const expiryDate = new Date(expDate)
        const currentDate = new Date()

        const millSec = expiryDate.getTime() - currentDate.getTime()

        const days = Math.ceil(millSec / (1000 * 60 * 60 * 24))

        return days
    }

    return(
        <>
        <div className="container px-10 py-5">
            
            <p className="mt-2 text-xl font-bold">Hey {recruiter.companyName}</p>
            <p className="mt-2 text-xs">Here is the details of your daily activities</p>
            <div className="mt-4 metrics flex gap-10">
                <div className="bg-blue-400 w-full card p-3 flex gap-5 justify-between items-center shadow rounded-sm">
                    <div className="data">
                        <p className="font-bold">{recruiter?.jobs?.length}</p>
                        <p>Provided Opportunities</p>
                    </div>
                    <div className="icon bg-white p-5 flex justify-center items-center"><i className="fa-solid fa-briefcase"></i></div>
                </div>

                <div className="bg-orange-400 w-full card p-3 flex gap-5 justify-between items-center shadow rounded-sm">
                    <div className="data">
                        <p className="font-bold">0</p>
                        <p>Candidates Recruiterd</p>
                    </div>
                    <div className="icon bg-white p-5 flex justify-center items-center"><i className="fa-solid fa-bookmark"></i></div>
                </div>

                <div className="bg-green-400 w-full card p-3 flex gap-5 justify-between items-center shadow rounded-sm">
                    <div className="data">
                        <p className="font-bold">0</p>
                        <p>Alerts</p>
                    </div>
                    <div className="icon bg-white p-5 flex justify-center items-center"><i className="fa-solid fa-bell"></i></div>
                </div>
            </div>

                <div className="p-4 mt-4 bg-white rounded-xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Recently posted jobs</h2>
                        <a onClick={() => navigator('/recruiter/profile/my-jobs')} className="text-sm text-blue-600 hover:underline cursor-pointer">View All →</a>
                    </div>

                    <div className="space-y-4">
                        {
                            jobs.length > 0 ? jobs.map((job : any, index : number) => {
                                return <>
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <img src={job.logo ? job?.logo : defaultProfile} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-medium">{job.jobTitle}</p>
                                    <div className="flex items-center text-sm text-gray-500 gap-2">
                                        <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs">{job.locationType}</span>
                                        <span>{getReminingDays(job.expiresAt)} days remaining</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-green-600 font-medium flex items-center gap-1">
                                {
                                    job.isBlocked === false
                                        ? <>
                                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z" clip-rule="evenodd" />
                                </svg>
                                Active
                                        </>
                                        : <label htmlFor="" className="error-lable">Blocked</label>
                                }
                            </div>
                            <div className="text-gray-600 text-sm flex items-center gap-1">
                                <i className="fa-solid fa-user"></i>
                                {job?.applicantCount} Applicants
                            </div>
                            <button onClick={() => getApplicantDetailsPage(job?._id)} className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700">View Details</button>
                        </div>
                                </>
                            })
                        : <p className="text-center text-sm mt-10">No Jobs Created</p>
                        }
                    </div>
                </div>

        </div>
        </>
    )
}