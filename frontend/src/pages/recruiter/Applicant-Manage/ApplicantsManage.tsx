import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { recruiterService } from "../../../services/apiServices"
import { useSelector } from "react-redux"

import defaultProfile from '../../../../public/default-img-instagram.png'
import { getApplicationDetails } from "../../../services/recruiterServices"

export default function ApplicantManagePage(){
    const params : any = useParams()
    const jobId = params.jobId

    const token = useSelector((state : any) => {
        return state.recruiterAuth.recruiterToken
    })

    const [applications, setApplications] = useState<any[]>([])
    const [applicants, setApplicants] = useState<any[]>([])
    const [jobDetails, setJobDetails] = useState<any>({})

    useEffect(() => {
        (async () => {
          
                const result = await getApplicationDetails(jobId)
                
                    console.log('Application details from the backen', result?.result)
                    setApplications(result?.result)
                    setApplicants(result.result[0].candidateDetails)
                
        })()
    }, [])
    return(
        <div className="container px-5 py-10">
            <p className="font-semibold tex-sm">Applications ({applications.length})</p>
            <section className="total-application mt-5">
                <div className="w-full grid grid-cols-5">
                    {
                        applications?.length > 0
                            ? <>
                                {
                                    applicants.map((applicant, index) => {
                                        return <div key={index} className="col-1 border border-gray-300 rounded p-3">
                                            <div className="flex metadata-candidate gap-3">
                                                <div className="profile rounded-full w-[50px] h-[50px]">
                                                    <img src={defaultProfile} className="w-full h-full" alt="" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{applicant?.name}</p>
                                                    <p className="text-gray-300 font-normal text-xs">{applicant?.role}</p>
                                                </div>
                                            </div>
                                            <hr className="mt-2 mb-2" />
                                            <div>
                                                <ul>
                                                    <li><p className="text-gray-400">Experience : {applicant?.experience}</p></li>
                                                    <li><p className="text-gray-400">Education : {applicant?.qualification}</p></li>
                                                </ul>
                                                <p className="text-blue-500 text-xs font-semibold">View Resume</p>
                                            </div>
                                        </div>
                                    })
                                }
                            </>
                            : <p className="text-sm text-center text-gray-400 mt-3">No Applications received</p>
                    }
                </div>
            </section>
        </div>
    )
}