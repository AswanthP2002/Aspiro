import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"
import defaultImage from '../../../../public/default-img-instagram.png'
import { candidateBlock, candidateUnblock, getCandidateDetails } from "../../../services/adminServices"
import { CandidatePersonalData } from "../../../types/entityTypes"
import { Notify } from "notiflix"

export default function CandidateDetails(){

    const [candidateDetails, setcandidatedetails] = useState<CandidatePersonalData>({
        name:"",
        about:"",
        currentSubscription:"",
        dateOfBirth:"",
        jobTitle:"",
        posts:[],
        socialLinks:[],
        userDetails:{
            _id:"",
            coverPhoto:{
                cloudinaryPublicId:"",
                cloudinarySecureUrl:""
            },
            profilePicture:{
                cloudinaryPublicId:"",
                cloudinarySecureUrl:""
            },
            email:"",
            createdAt:"",
            facebookid:"",
            googleid:"",
            phone:"",
            isBlocked:false
        },
        userId:""
    })
    const [experiences, setexperience] = useState<any[]>([])
    const [education, setEducation] = useState<any[]>([])
    const [skills, setskills] = useState<any[]>([])

    const {id} = useParams()

    useEffect(() => {
        async function fetchCandidateDetails(){
            
                const result = await getCandidateDetails(id)
                console.log('result from the backend', result)
                
                    setcandidatedetails(result.candidateDetails)
                    setexperience(result?.candidateDetails?.experience)
                    setskills(result?.candidateDetails?.skills)
                    setEducation(result?.candidateDetails?.education)
                    console.log('candidate details', result.candidateDetails)
                
        }
        
        fetchCandidateDetails()
    }, [])

    function formatDate(createdAt : Date | string) : string {
        const joined = new Date(createdAt)
        return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
    }

    async function blockCandidate(candidateId : string){
            Swal.fire({
                icon:'warning',
                title:'Block?',
                text:'Are you sure to unblock this candidate',
                showConfirmButton:true,
                confirmButtonText:'Block',
                showCancelButton:true
            }).then(async (result) => {
                if(result.isConfirmed){
                    const result = await candidateBlock(candidateId)
                    if(result?.success){
                        Notify.success('Candidate blocked', {timeout:1500})
                        setTimeout(() => {
                            setcandidatedetails((prv : CandidatePersonalData) => {
                                return {...prv, userDetails:{...prv.userDetails, isBlocked:true}}
                            })
                        }, 1500)
                    }else{
                        Notify.failure('Can not block candidate right now', {timeout:1500})
                    }
                }
                return
            })
    }

    async function unblockCandidate(candidateId : string){
            Swal.fire({
                icon:'warning',
                title:'Unblock?',
                text:'Are you sure to unblock this candidate',
                showConfirmButton:true,
                showCancelButton:true,
                confirmButtonText:'Unblock'
            }).then(async (result) => {
                if(result?.isConfirmed){
                    const result = await candidateUnblock(candidateId)
                    if(result?.success){
                        Notify.success('Unblocked', {timeout:1500})
                        setTimeout(() => {
                            setcandidatedetails((prv : CandidatePersonalData) => {
                            return {...prv, userDetails:{...prv.userDetails, isBlocked:false}}
                            })
                        }, 1500)
                    }else{
                        Notify.failure('Can not unblock candidate right now', {timeout:1500})
                    }
                }
                return
            })
            
    }

    function getExperienceDuration(startDate : Date, endDate : any) : number {
        let yearDifference, monthDifference
        if(!endDate){
            yearDifference = new Date().getFullYear() - startDate.getFullYear()
            monthDifference = new Date().getMonth() - startDate.getMonth()
        }else{
            yearDifference = endDate.getFullYear() - startDate.getFullYear()
            monthDifference = endDate.getMonth() - startDate.getMonth()
        }
        return yearDifference * 12 + monthDifference
    }

    // const onCandidateblock = () => {
    //     setcandidatedetails((prv : CandidatePersonalData) => {
    //         return {...prv, userDetails:{...prv.userDetails, isBlocked:true}}
    //     })
    // }

    // const onCandidateUnblock = () => {
    //     setcandidatedetails((prv : CandidatePersonalData) => {
    //         return {...prv, userDetails:{...prv.userDetails, isBlocked:false}}
    //     })
    // }

    return(
        <>
            <h2 className="font-bold">Candidate Details</h2>
            <div className="p-6 bg-[#ffffff] min-h-screen w-full mt-5 rounded-2xl">
                <div className="flex justify-between w-full">
                    <div className="left">
                        <p className="text-gray-400 font-semibold">Candidate id</p>
                        <p className="text-sm font-semibold">{candidateDetails?._id}</p>
                    </div>
                    <div className="right">
                        <p className="text-gray-400 font-semibold">Joined Date : <span className="ms-5 text-black font-semibold">{formatDate(candidateDetails?.createdAt as string)}</span></p>
                        <p className="text-gray-400 font-semibold">Status : {candidateDetails?.userDetails?.isBlocked ? <span className="text-red-500">Blocked</span> : <span className="text-green-500">Active</span>}</p>
                    </div>
                </div>

                <div className="flex w-full justify-between mt-15">
                    {/* Div one */}
                    <div className='flex items-center gap-2'>
                        <img className="rounded-full" src={candidateDetails?.userDetails?.profilePicture?.cloudinarySecureUrl ? candidateDetails?.userDetails?.profilePicture?.cloudinarySecureUrl : defaultImage} alt="" style={{ width: '58px', height: '60px', objectFit:'cover' }} />
                        <div>
                            <p className="text-sm font-semibold mb-2">{candidateDetails?.name}</p>
                            <p className="text-xs font-normal text-gray-400 mb-1">{candidateDetails?.jobTitle}</p>
                            {/* <p className="text-xs font-normal text-gray-400 mb-1">{candidateDetails?.username}</p> */}
                        </div>
                    </div>

                    {/* Div two */}
                    <div>
                        <p className="text-sm font-semibold mb-2">Location</p>
                        <p className="text-xs font-normal text-gray-400 mb-1">{candidateDetails?.location?.district}, {candidateDetails?.location?.state}, {candidateDetails?.location?.country}</p>
                    </div>

                    {/* Div three */}
                    <div>
                        <p className="text-sm font-semibold mb-2">Highest Education</p>
                        <p className="text-xs font-normal text-gray-400 mb-1">Not Provided</p>
                    </div>

                    {/* Div four */}
                    <div>
                        <p className="text-sm font-semibold mb-2">Total Applications</p>
                        <p className="text-xs font-normal text-gray-400 mb-1">Not provided</p>
                    </div>
                </div>

                <div className="w-full mt-15">
                    <p className="text-sm font-semibold mb-2">About</p>
                    <p className="text-xs font-normal text-gray-400 mb-1">{candidateDetails?.about}</p>
                </div>

                <div className="w-full mt-10">
                    <p className="text-sm font-semibold mb-2">Contact Informations</p>
                    <ul>
                        <li className='text-xs font-normal text-gray-400 mb-1'>Email : {candidateDetails?.userDetails?.email}</li>
                        {
                            candidateDetails?.userDetails?.phone
                                ? <li className='text-xs font-normal text-gray-400 mb-1'>Phone : {candidateDetails?.userDetails?.phone}</li>
                                : null
                        }
                    </ul>
                </div>
                <div className="border w-full border-gray-200 mt-3"></div>
                <section className="experience mt-7">
                    <div className="w-full">
                        <div><p className="font-bold">Experiences</p></div>
                    </div>
                    <div className="mt-5">
                        {
                            experiences.length > 0
                                ? <>
                                    <table className="table w-full">
                                        <thead className="w-full">
                                            <tr className="bg-gray-300">
                                                <th className="text-sm font-semibold py-1">Role</th>
                                                <th className="text-sm font-semibold py-1">From</th>
                                                <th className="text-sm font-semibold py-1">To</th>
                                                <th className="text-sm font-semibold py-1">Duration</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                experiences.map((exp: any, index: number) => {
                                                    return <>
                                                        <tr key={index} className="">
                                                            <td className="flex items-center gap-3">
                                                                <div><i className="fa-solid fa-building-user !text-3xl !text-gray-400"></i></div>
                                                                <div className="">
                                                                    <p className="font-semibold text-sm">{exp?.role} <span className="ms-2 rounded-full bg-blue-200 text-blue-500 text-xs font-semibold px-2">{exp?.locationtype}</span></p>
                                                                    <p className="mt-3 text-gray-400 text-xs">{exp.organization} <span><i className="fa-solid fa-location-dot !text-gray-400 me-2"></i>{exp.location}</span></p>
                                                                </div>
                                                            </td>
                                                            <td className="text-sm">{formatDate(exp?.startdate)}</td>
                                                            <td className="text-sm">{exp?.enddate ? formatDate(exp?.enddate) : "Present"}</td>
                                                            <td className="text-sm">
                                                                {
                                                                    exp?.enddate
                                                                        ? getExperienceDuration(new Date(exp?.startdate), new Date(exp.enddate))
                                                                        : getExperienceDuration(new Date(exp?.startdate), "")
                                                                } Months
                                                            </td>
                                                        </tr>
                                                    </>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </>
                                : <p className="text-center text-gray-300">No Experience provided</p>
                        }
                    </div>
                </section>
                
                <section className="education mt-7">
                    <div className="w-full">
                        <div><p className="font-bold">Education</p></div>
                    </div>
                    <div className="mt-5">
                        {
                            education.length > 0
                                ? <>
                                    <table className="table w-full">
                                        <thead className="w-full">
                                            <tr className="bg-gray-300">
                                                <th className="text-sm font-semibold py-1">Role</th>
                                                <th className="text-sm font-semibold py-1">From</th>
                                                <th className="text-sm font-semibold py-1">To</th>
                                                
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                education.map((edu: any, index: number) => {
                                                    return <>
                                                        <tr key={index} className="">
                                                            <td className="flex items-center gap-3">
                                                                <div><i className="fa-solid fa-school !text-3xl !text-gray-400"></i></div>
                                                                <div className="">
                                                                    <p className="font-semibold text-sm">{edu?.stream}</p>
                                                                    <p className="mt-3 text-gray-400 text-xs">{edu.level} <span><i className="fa-solid fa-location-dot !text-gray-400 me-2"></i>{edu.organization}</span></p>
                                                                </div>
                                                            </td>
                                                            <td className="text-sm">{edu?.startYear}</td>
                                                            <td className="text-sm">{edu?.endYear ? edu?.endYear : "Studying"}</td>
                                                        </tr>
                                                    </>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </>
                                : <p className="text-center text-gray-300">No Experience provided</p>
                        }
                    </div>
                </section>

                <section className="skills mt-7">
                    <div className="w-full">
                        <div><p className="font-bold">Skills</p></div>
                    </div>
                    <div className="mt-5">
                        {
                            skills.length > 0
                                ? <>
                                    <div className="flex flex-wrap gap-5">
                                        {
                                            skills?.map((skill: any, index: number) => {
                                                return (
                                                    <>
                                                        <div key={index} className="">
                                                            <div className="skill rounded-full px-3 py-2 flex items-center gap-2 border border-gray-300">
                                                                <p className="text-xs skill-name">{skill?.skill}</p>
                                                                <i className="fa-regular fa-circle-check"></i>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                  </>
                                : <p className="text-center mt-5">No Skills added</p>
                        }
                    </div>
                </section>

                <div className="flex justify-end">
                    {
                        candidateDetails?.userDetails?.isBlocked
                            ? <button onClick={() => unblockCandidate(candidateDetails?._id as string)} type="button" className="bg-blue-200 rounded-sm p-2 text-white">Unblock</button>
                            : <button onClick={() => blockCandidate(candidateDetails?._id as string)} type="button" className="bg-orange-400 rounded-sm p-2 text-white">Block</button>
                    }
                </div>
            </div>
        </>
    )
}