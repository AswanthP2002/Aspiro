import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"
import defaultImage from '/default-img-instagram.png'
import { userBlock, userUnblock, getUserDetails,  } from "../../../services/adminServices"
import { CandidatePersonalData, Education, Experience, Skills, UserProfileAggrgatedAdmin } from "../../../types/entityTypes"
import { Notify } from "notiflix"

export default function CandidateDetails(){

    const [userDetails, setUserDetails] = useState<UserProfileAggrgatedAdmin | null>(null)
    const [experiences, setexperience] = useState<Experience[]>([])
    const [education, setEducation] = useState<Education[]>([])
    const [skills, setskills] = useState<Skills[]>([])

    const {id} = useParams()

    useEffect(() => {
        async function fetchCandidateDetails(){
            
                const result = await getUserDetails(id)
                console.log('result from the backend', result)
                
                    setUserDetails(result.result)
                    setexperience(result?.result?.experiences)
                    setskills(result?.result?.skills)
                    setEducation(result?.result?.educations)
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
                    const result = await userBlock(candidateId)
                    if(result?.success){
                        Notify.success('Candidate blocked', {timeout:1500})
                        setTimeout(() => {
                            setUserDetails((prv) => {
                                if(!prv){
                                    return null
                                }
                                return {...prv, isBlocked:true}
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
                    const result = await userUnblock(candidateId)
                    if(result?.success){
                        Notify.success('Unblocked', {timeout:1500})
                        setTimeout(() => {
                            setUserDetails((prv) => {
                            if(!prv){
                                return null
                            }
                            return {...prv, isBlocked:false}
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
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
                {/* Header Section */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-start">
                        <div className="flex items-center gap-4">
                            <img 
                                className="rounded-full w-20 h-20 object-cover border-2 border-gray-200" 
                                src={userDetails?.profilePicture?.cloudinarySecureUrl || defaultImage} 
                                alt="Candidate Profile" 
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{userDetails?.name}</h1>
                                <p className="text-md text-gray-600">{userDetails?.headline || 'No job title provided'}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    <i className="fa-solid fa-location-dot text-xs mr-1"></i>
                                    {userDetails?.location ? `${userDetails.location.city}, ${userDetails.location.state}` : 'Location not provided'}
                                </p>
                            </div>
                        </div>
                        <div className="text-left md:text-right mt-4 md:mt-0">
                            <div className="flex items-center md:justify-end gap-4">
                                {userDetails?.isBlocked ? (
                                    <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>Blocked
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>Active
                                    </span>
                                )}
                                {userDetails?.isBlocked ? (
                                    <button onClick={() => unblockCandidate(userDetails?._id as string)} type="button" className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">Unblock</button>
                                ) : (
                                    <button onClick={() => blockCandidate(userDetails?._id as string)} type="button" className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">Block</button>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Joined on: {formatDate(userDetails?.createdAt as string)}</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About Section */}
                        <div className="p-5 border border-gray-200 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">About</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{userDetails?.summary || 'No information provided.'}</p>
                        </div>

                        {/* Recruiter Profile Section */}
                        {userDetails?.recruiterProfile && (
                            <div className="p-5 border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recruiter Activity</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-building text-gray-500"></i>
                                        <p className="text-sm text-gray-700">
                                            <span className="font-semibold">Organization:</span> {userDetails.recruiterProfile.organizationDetails?.organizationName}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                                        <div>
                                            <p className="text-xs text-gray-500">Total Jobs Posted</p>
                                            <p className="text-xl font-bold text-blue-600">{userDetails.jobs?.length || 0}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Active Jobs</p>
                                            <p className="text-xl font-bold text-green-600">{userDetails.jobs?.filter(job => job.status === 'active').length || 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                                               
                        {/* Experience Section */}
                        <div className="p-5 border border-gray-200 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Experience</h3>
                            {experiences.length > 0 ? (
                                <div className="space-y-4">
                                    {experiences.map((exp: Experience, index: number) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="mt-1"><i className="fa-solid fa-briefcase text-xl text-gray-400"></i></div>
                                            <div>
                                                <p className="font-semibold text-md text-gray-700">{exp.role}</p>
                                                <p className="text-sm text-gray-600">{exp.organization} · {exp.jobtype}</p>
                                                <p className="text-xs text-gray-500 mt-1">{formatDate(exp.startDate)} - {exp.ispresent ? 'Present' : formatDate(exp.endDate)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : <p className="text-sm text-gray-500">No experience provided.</p>}
                        </div>

                        {/* Education Section */}
                        <div className="p-5 border border-gray-200 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Education</h3>
                            {education.length > 0 ? (
                                <div className="space-y-4">
                                    {education.map((edu: Education, index: number) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="mt-1"><i className="fa-solid fa-graduation-cap text-xl text-gray-400"></i></div>
                                            <div>
                                                <p className="font-semibold text-md text-gray-700">{edu.institution}</p>
                                                <p className="text-sm text-gray-600">{edu.educationLevel}, {edu.educationStream}</p>
                                                <p className="text-xs text-gray-500 mt-1">{edu.startYear} - {edu.isPresent ? 'Present' : edu.endYear}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : <p className="text-sm text-gray-500">No education details provided.</p>}
                        </div>

                        <div className="p-5 border border-gray-200 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Posts</h3>
                            {userDetails?.posts && userDetails.posts.length > 0 ? (
                                <div className="space-y-4">
                                    {userDetails.posts.map((post) => (
                                        <div key={post._id} className="p-4 border border-gray-100 rounded-md bg-gray-50">
                                            {post.media && (
                                                <img src={post.media?.cloudUrl} alt="Post image" className="w-80 h-auto rounded-lg mb-3 object-cover !mx-auto" />
                                            )}
                                            <p className="text-sm text-gray-700 mb-2">{post.description}</p>
                                            <p className="text-xs text-gray-400">
                                                Posted on {formatDate(post.createdAt as string)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : <p className="text-sm text-gray-500">This user has not made any posts.</p>}
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Contact Info Section */}
                        <div className="p-5 border border-gray-200 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <i className="fa-solid fa-envelope w-4 text-center"></i>
                                    <span>{userDetails?.email}</span>
                                </div>
                                {userDetails?.phone && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <i className="fa-solid fa-phone w-4 text-center"></i>
                                        <span>{userDetails.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="p-5 border border-gray-200 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills</h3>
                            {skills.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill: Skills, index: number) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                                            {skill.skill}
                                        </span>
                                    ))}
                                </div>
                            ) : <p className="text-sm text-gray-500">No skills added.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}