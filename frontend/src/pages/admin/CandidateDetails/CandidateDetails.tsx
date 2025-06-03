import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"
import defaultImage from '../../../../public/default-img-instagram.png'

export default function CandidateDetails(){

    const [candidateDetails, setcandidatedetails] = useState<any>({})
    const [experiences, setexperience] = useState<any[]>([])

    const {id} = useParams()
    const token = useSelector((state : any) => {
        return state.adminAuth.adminToken
    })

    useEffect(() => {
        fetch(`http://localhost:5000/admin/candidate/details?candidateId=${id}`, {
            method:'GET',
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            if(result.success){
                setcandidatedetails(result.candidateDetails)
                setexperience(result?.candidateDetails?.experience)
                console.log('candidate details', result.candidateDetails)
            }else{
                Swal.fire({
                    icon:'error',
                    title:'oops',
                    text:result.message
                })
            }
        })
        .catch((error : any) => {
            // console.log('error occured', error)
            Swal.fire({
                icon:'error',
                title:'oops',
                text:error.message
            })
        })
    }, [])

    function formatDate(createdAt : Date | string) : string {
        const joined = new Date(createdAt)
        return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
    }

    async function blockCandidate(){
        try {
            const response = await fetch('http://localhost:5000/admin/candidate/block', {
                method:'POST',
                headers:{
                    authorization:`Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({id:candidateDetails._id})
            })

            const result = await response.json()
            if(result.success){
                Swal.fire({
                    icon:'success',
                    title:'Blocked',
                    text:result.message
                }).then(() => window.location.reload())
            }else{
                Swal.fire({
                    icon:'error',
                    title:'Oops',
                    text:result.message
                })
            }
        } catch (error : any) {
            console.log('error occured block', error),
            Swal.fire({
                icon:'error',
                title:'Oops',
                text:error.message
            })
        }
    }

    async function unblockCandidate(){
        try {
            const response = await fetch('http://localhost:5000/admin/candidate/unblock', {
                method:'POST',
                headers:{
                    authorization:`Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({id:candidateDetails._id})
            })

            const result = await response.json()
            if(result.success){
                Swal.fire({
                    icon:'success',
                    title:'Blocked',
                    text:result.message
                }).then(() => window.location.reload())
            }else{
                Swal.fire({
                    icon:'error',
                    title:'Oops',
                    text:result.message
                })
            }
        } catch (error : any) {
            console.log('error occured block', error),
            Swal.fire({
                icon:'error',
                title:'Oops',
                text:error.message
            })
        }
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
                        <p className="text-gray-400 font-semibold">Joined Date : <span className="ms-5 text-black font-semibold">{candidateDetails?.createdAt}</span></p>
                        <p className="text-gray-400 font-semibold">Date of birth : <span className="ms-5 text-black font-semibold">NA</span></p>
                    </div>
                </div>

                <div className="flex w-full justify-between mt-15">
                    {/* Div one */}
                    <div className='flex items-center gap-2'>
                        <img src={candidateDetails?.profilePicture ? candidateDetails?.profilePicture : defaultImage} alt="" style={{ width: '58px', height: '60px' }} />
                        <div>
                            <p className="text-sm font-semibold mb-2">{candidateDetails?.name}</p>
                            <p className="text-xs font-normal text-gray-400 mb-1">{candidateDetails?.role}</p>
                            <p className="text-xs font-normal text-gray-400 mb-1">{candidateDetails?.username}</p>
                        </div>
                    </div>

                    {/* Div two */}
                    <div>
                        <p className="text-sm font-semibold mb-2">Location</p>
                        <p className="text-xs font-normal text-gray-400 mb-1">{candidateDetails?.location?.city}, {candidateDetails?.location?.state}, {candidateDetails?.location?.country}</p>
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
                        <li className='text-xs font-normal text-gray-400 mb-1'>Email : {candidateDetails?.email}</li>
                        {
                            candidateDetails?.phone
                                ? <li className='text-xs font-normal text-gray-400 mb-1'>Phone : {candidateDetails?.phone}</li>
                                : null
                        }
                    </ul>
                </div>
                <hr />
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
                                                        <tr className="">
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
            </div>
        </>
    //     <div className="flex gap-6 p-6 bg-[#fff7f1] min-h-screen">
    //         <div className="max-w-5xl mx-auto p-4 space-y-6">
    //   {/* Header Card */}
    //   <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <div className="flex items-center space-x-4">
    //       <img
    //         src={candidateDetails?.profilePicture ? candidateDetails.profilePicture : defaultImage}
    //         alt="Aswanth P"
    //         className="w-16 h-16 rounded-full object-cover"
    //       />
    //       <div>
    //         <h2 className="text-xl font-semibold">{candidateDetails.name}</h2>
    //         <p className="text-sm text-gray-500">{candidateDetails.role}</p>
    //         <p className="text-sm text-gray-400">{candidateDetails.username}</p>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
    //       <div><strong>Location:</strong> {candidateDetails?.location?.city}, {candidateDetails?.location?.state}, {candidateDetails?.location?.country}</div>
    //       <div><strong>Highest Education:</strong>Not added yet</div>
    //       <div><strong>Total Applications:</strong> 0</div>
    //       <div><strong>Status {candidateDetails.isBlocked ? <p className="inline text-red-400">Blocked</p> : <p className="inline text-green-400">Active</p>}</strong></div>
    //       <div>
    //         <strong>Joined:</strong> {formatDate(candidateDetails.createdAt)}<br />
    //         <strong>DOB:</strong> Not added
    //       </div>
    //     </div>
    //   </div>

    //   {/* About Section */}
    //   <div className="bg-white shadow rounded-lg p-6">
    //     <h3 className="text-lg font-semibold mb-2">About</h3>
    //     <p className="text-sm text-gray-600">
    //       {candidateDetails?.about ? candidateDetails?.about : "Not added"}
    //     </p>
    //   </div>

    //   {/* Contact Info */}
    //   <div className="bg-white shadow rounded-lg p-6">
    //     <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
    //     {/* <p className="text-sm text-gray-600">Website: https://Getcandy.Com</p> */}
    //     <p className="text-sm text-gray-600">Email: {candidateDetails.email}</p>
    //     <p className="text-sm text-gray-600">Mobile: {candidateDetails.phone}</p>
    //   </div>

    //   {/* Experience */}
    //   <div className="bg-white shadow rounded-lg p-6">
    //     <h3 className="text-lg font-semibold mb-2">Experience</h3>
    //     {/* {
    //         candidateDetails?.experience.length > 0
    //             ? <>
    //                 <div className="border p-4 rounded-lg">
    //                 <p className="text-sm font-medium">Network Engineer - Intern</p>
    //                 <p className="text-sm text-gray-500">@ Rocket — Mumbai, India</p>
    //                 <p className="text-sm text-gray-500">Feb 2024 - Feb 2024 (1 year)</p>
    //                 </div>
    //             </> */}
    //             : <p>Not added yet</p>
        
        
    //   </div>

    //   {/* Education */}
    //   <div className="bg-white shadow rounded-lg p-6">
    //     <h3 className="text-lg font-semibold mb-2">Education</h3>
    //     {/* {
    //         candidateDetails.education.length > 0 
    //         ? 
    //             <>
    //                     <div className="space-y-2">
    //                     <div className="border p-4 rounded-lg">
    //                         <p className="font-medium">B-Tech in Computer Science</p>
    //                         <p className="text-sm text-gray-500">KTU - College of Science & Technology, Thottada (2019 - 2023)</p>
    //                     </div>
    //                     <div className="border p-4 rounded-lg">
    //                         <p className="font-medium">Science (Higher Secondary)</p>
    //                         <p className="text-sm text-gray-500">Tagore Vidyaniketan GHSS, Kannur (2017 - 2019)</p>
    //                     </div>
    //                     </div>
    //             </> */}
    //         : <p>Not added yet</p>
        
    //   </div>

    //   {/* Skills */}
    //   {/* <div className="bg-white shadow rounded-lg p-6">
    //     <h3 className="text-lg font-semibold mb-2">Technical Skills</h3>
    //     <div className="flex flex-wrap gap-2">
    //       {["HTML", "CSS", "JavaScript", "NodeJS", "ExpressJS", "React", "MongoDB"].map((skill) => (
    //         <span key={skill} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded">
    //           {skill}
    //         </span>
    //       ))}
    //     </div>
    //   </div> */}
    //   <div className="flex justify-end">
    //     {
    //         candidateDetails.isBlocked
    //             ? <button onClick={unblockCandidate} type="button" className="bg-blue-200 rounded-sm p-2 text-white">Unblock</button>
    //             : <button onClick={blockCandidate} type="button" className="bg-orange-400 rounded-sm p-2 text-white">Block</button>
    //     }
    //   </div>
    // </div>
    //     </div>
    )
}