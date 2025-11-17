import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"
import defaultImage from '/default-img-instagram.png'
import { userBlock, userUnblock, getUserDetails,  } from "../../../services/adminServices"
import { CandidatePersonalData, Education, Experience, Post, Skills, UserProfileAggrgatedAdmin } from "../../../types/entityTypes"
import { Notify } from "notiflix"
import { FaArrowLeft, FaRegEdit, FaGraduationCap, FaSuitcase, FaLinkedin, FaInstagram, FaTwitter, FaGithub} from "react-icons/fa"
import { IoCall, IoLocation } from "react-icons/io5"
import { MdBlock } from "react-icons/md"
import {BsThreeDotsVertical} from 'react-icons/bs'
import { HiOutlineEnvelope } from "react-icons/hi2"
import { IoCallOutline } from "react-icons/io5"
import { CiCalendar, CiGlobe, CiHeart } from "react-icons/ci"
import { LuUser } from "react-icons/lu"
import { GoLocation } from "react-icons/go"
import { AiOutlineComment } from "react-icons/ai"


export default function CandidateDetails(){

    const getSocialPhills = useCallback((domain: string) => {
        switch(domain){
            case 'linkedin':
                return <button className="bg-gray-200 p-1 rounded-md"><FaLinkedin color="gray" /></button>
            case 'instagram':
                return <button className="bg-gray-200 p-1 rounded-md"><FaInstagram color="gray" /></button>
            case 'github':
                return <button className="bg-gray-200 p-1 rounded-md"><FaGithub color="gray" /></button>
            case 'twitter':
                return <button className="bg-gray-200 p-1 rounded-md"><FaTwitter color="gray" /></button>
            default:
                return 
        }
    }, [])

    const [userDetails, setUserDetails] = useState<UserProfileAggrgatedAdmin | null>(null)
    const [experiences, setexperience] = useState<Experience[]>([])
    const [education, setEducation] = useState<Education[]>([])
    const [skills, setskills] = useState<Skills[]>([])
    const [activeSection, setActiveSection] = useState<'about' | 'experience' | 'education' | 'posts'>('about')

    const {id} = useParams()

    useEffect(() => {
        async function fetchCandidateDetails(){
            
                try {
                    const result = await getUserDetails(id)
                    console.log('result from the backend', result)
                    
                        setUserDetails(result.result)
                        setexperience(result?.result?.experiences)
                        setskills(result?.result?.skills)
                        setEducation(result?.result?.educations)
                        console.log('user details', result.candidateDetails)
                } catch (error: unknown) {
                    console.log('Erorr occured while geting user details', error)
                    Notify.failure(error instanceof Error ? error?.message : 'An Error occured', {timeout:1500})
                }
                
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
        <>
        <div className="w-full min-h-screen p-5">
            <div className="w-full">
                <button className="flex items-center gap-2 text-sm font-light text-gray-700 hover:bg-gray-200 rounded-md !p-2">
                    <FaArrowLeft />
                    Back to users
                </button>

                {/* Profile card */}
                <div className="mt-5 rounded-md bg-white w-full border border-gray-200">
                    <div className="banner bg-gradient-to-br from-orange-300 to-orange-500 rounded-t-md w-full h-30">
                        {/* <p>Banner will appear here ie; default this orange banner</p> */}
                    </div>
                    <div className="flex flex-col lg:flex-row w-full gap-3" style={{marginTop:'-50px'}}>
                        <div className="px-3 w-fit">
                            <div className="w-25 h-25 flex items-center shadow-lg justify-center p-1 rounded-full bg-white border border-gray-200">
                                <div className="w-full h-full bg-gray-100 rounded-full  flex justify-center items-center">
                                    <p className="font-light text-xl">{userDetails?.name ? userDetails?.name[0] : 'U'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 flex flex-col justify-end">
                            <div className="flex gap-2 items-center">
                                <p className="text-sm">{userDetails?.name || 'Sharmi Rajendran'}</p>
                                <span className="text-xs font-light text-green-600 bg-green-100 rounded-full !px-2">Active</span>
                            </div>
                            <p className="text-sm font-light mt-1">{userDetails?.role || 'Full stack Developer'}</p>
                            <p className="mt-1 flex items-center gap-1 text-gray-700 text-xs">
                                <IoLocation color="gray" />
                                {userDetails?.location?.city || 'Olavankod'}, {userDetails?.location?.state || 'Palakkad'}, {userDetails?.location?.country || 'India'}
                            </p>
                        </div>
                        <div className="flex gap-2 flex-1 justify-start lg:justify-end items-end px-3">
                            <button className="flex text-gray-700 items-center gap-2 text-xs border border-gray-200 rounded-md px-2 py-1">
                                <FaRegEdit />
                                Edit Profile
                            </button>
                            <button className="flex text-red-500 items-center gap-2 text-xs border border-gray-200 rounded-md px-2 py-1">
                                <MdBlock color="red" />
                                Block User
                            </button>
                            <button className="flex items-center gap-2 text-xs border border-gray-200 rounded-md px-2 py-1">
                                <BsThreeDotsVertical color="gray" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-2 p-3 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-md bg-gray-100 p-2 flex gap-2">
                            <HiOutlineEnvelope color="gray" />
                            <div>
                                <p className="text-xs font-light text-gray-500">Email</p>
                                <p className="text-sm font-light">{userDetails?.email || 'sharmi@gmail.com'}</p>
                            </div>
                        </div>

                        <div className="rounded-md bg-gray-100 p-2 flex gap-2">
                            <IoCallOutline color="gray" />
                            <div>
                                <p className="text-xs font-light text-gray-500">Phone</p>
                                <p className="text-sm font-light">{userDetails?.phone || '7560856614'}</p>
                            </div>
                        </div>

                        <div className="rounded-md bg-gray-100 p-2 flex gap-2">
                            <CiCalendar color="gray" />
                            <div>
                                <p className="text-xs font-light text-gray-500">Joined</p>
                                <p className="text-sm font-light">{formatDate(userDetails?.createdAt as string) || '11-11-2025'}</p>
                            </div>
                        </div>

                        <div className="rounded-md bg-gray-100 p-2 flex gap-2">
                            <CiGlobe color="gray" />
                            <div>
                                <p className="text-xs font-light text-gray-500">Webiste</p>
                                <p className="text-sm font-light"><a href="#">https://mxplora.com</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="flex items-center gap-2 p-3">
                        <p className="text-xs text-gray-500">Social : </p>
                        <div className="flex gap-1 items-center">
                            {
                               userDetails?.socialLinks && userDetails?.socialLinks.length > 0 && userDetails?.socialLinks.map((socialLinks: {domain: string, url: string}, index: number) => (
                                    getSocialPhills(socialLinks.domain)
                                ))
                            }
                            {
                                !userDetails?.socialLinks?.length > 0 && (<p className="text-xs text-gray-500">No social links added</p>)
                            }
                            {/* <button className="bg-gray-200 p-1 rounded-md"><FaLinkedin color="gray" /></button>
                            <button className="bg-gray-200 p-1 rounded-md"><FaInstagram color="gray" /></button>
                            <button className="bg-gray-200 p-1 rounded-md"><FaTwitter color="gray" /></button>
                            <button className="bg-gray-200 p-1 rounded-md"><FaGithub color="gray" /></button> */}
                        </div>
                    </div>
                </div>

                {/* Different section directors */}
                <div className="w-full grid grid-cols-4 mt-5 border-b border-gray-300">
                    <div onClick={() => setActiveSection('about')} className={`cursor-pointer ${activeSection === 'about' ? 'border border-red-500' : ''}`}>
                        <p className={`text-sm flex items-center justify-center py-1 ${activeSection === 'about' ? 'text-red-500 font-medium' : ''}`}>About</p>
                    </div>
                    <div onClick={() => setActiveSection('experience')} className={`cursor-pointer ${activeSection === 'experience' ? 'border border-red-500' : ''}`}>
                        <p className={`text-sm flex items-center justify-center py-1 ${activeSection === 'experience' ? 'text-red-500 font-medium' : ''}`}>Experience</p>
                    </div>
                    <div onClick={() => setActiveSection('education')} className={`cursor-pointer ${activeSection === 'education' ? 'border border-red-500' : ''}`}>
                        <p className={`text-sm flex items-center justify-center py-1 ${activeSection === 'education' ? 'text-red-500 font-medium' : ''}`}>Education</p>
                    </div>
                    <div onClick={() => setActiveSection('posts')} className={`cursor-pointer ${activeSection === 'posts' ? 'border border-red-500' : ''}`}>
                        <p className={`text-sm flex items-center justify-center py-1 ${activeSection === 'posts' ? 'text-red-500 font-medium' : ''}`}>Posts</p>
                    </div>
                </div>

                {/* About section */}
                {
                    activeSection === 'about' && (
                        <section id="about" className="mt-5">
                    <div className="w-full grid grid-cols-12 gap-3">
                        <div className="col-span-12 lg:col-span-9">
                            <div className="bg-white border border-gray-200 rounded-md p-3">
                                <p className="font-medium text-sm">Headline</p>
                                <p className="text-xs font-light text-gray-700 mt-2 mb-3">{userDetails?.headline || 'Not added'}</p>
                            
                                <p className="font-medium text-sm">Summary</p>
                                <p className="text-xs font-light text-gray-700 mt-2">
                                    {userDetails?.summary || 'Not added'}
                                </p>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-md p-3 mt-3">
                                <p className="font-medium text-sm">Skills</p>
                                <div className="mt-3 flex gap-2">
                                    {
                                        userDetails?.skills?.map((skill: Skills, index: number) => (
                                            <span key={index} className="bg-orange-100 rounded-full !px-3 text-xs text-orange-700 !py-1">{skill?.skill}</span>
                                        ))
                                    }
                                    {
                                        userDetails?.skills?.length < 1 && (
                                            <p className="text-gray-500 text-xs">
                                                No skills added
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-3">
                            <div className="bg-white border border-gray-200 rounded-md p-3">
                                <p className="font-medium text-sm">Personal Information</p>
                                <div className="mt-2">
                                    <div className="flex gap-2">
                                        <CiCalendar color="gray" />
                                        <div>
                                            <p className="text-xs font-light">Age</p>
                                            <p className="text-sm">24 years</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-3">
                                        <LuUser color="gray" />
                                        <div>
                                            <p className="text-xs font-light">Gender</p>
                                            <p className="text-sm">Female</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-3">
                                        <IoLocation color="gray" />
                                        <div>
                                            <p className="text-xs font-light">Loction</p>
                                            <p className="text-sm">Kannur, Kerala, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-md p-3 mt-3">
                                <p className="font-medium text-sm">Account Information</p>
                                <div className="mt-3">
                                    <div>
                                        <p className="text-xs font-light">User ID</p>
                                        <p className="text-sm">{userDetails?._id}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-light mt-3">Joined Date</p>
                                        <p className="text-sm">{formatDate(userDetails?.createdAt as string)}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-light mt-3">Status</p>
                                        <span className="text-xs text-green-600 bg-green-100 rounded-md !px-2">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                    )
                }

                {
                    activeSection === 'experience' && (
                        <section id="experience" className="mt-5">
                            <div className="grid grid-cols-1 gap-3">
                                {
                                    userDetails?.experiences?.map((exp: Experience, index: number) => (
                                        <div key={index} className="border border-gray-200 rounded-md p-3 flex gap-2 bg-white">
                                            <div>
                                                <div className="w-10 h-10 rounded-md bg-orange-100 flex justify-center items-center">
                                                    <FaSuitcase color="red" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{exp.role}</p>
                                                <p className="text-sm font-light mt-1">{exp.organization}</p>
                                                <div className="flex gap-2 items-center mt-2">
                                                    <span className="flex items-center gap-1 text-xs text-gray-700"><IoLocation color="gray" /> {exp.location}</span>
                                                    <span className="flex items-center gap-1 text-xs text-gray-700"><CiCalendar color="gray" /> {exp.startDate} - {exp.endDate || 'Present'}</span>
                                                </div>
                                                <p className="mt-2 text-xs text-gray-500">This will be sample description about the job expereince.
                                                    Users can add about  their role and their responsiblities for more clarity. It will give a good
                                                    overview about your proficiency in each role
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    userDetails?.experiences?.length === 0 && (<p className="text-center text-gray-500 text-xs">No experience added</p>)
                                }
                            </div>
                        </section>
                    )
                }

                {
                    activeSection === 'education' && (
                        <section id="education" className="mt-5">
                            <div className="grid grid-cols-1 gap-3">
                                {
                                    userDetails?.educations.map((education: Education, index: number) => (
                                        <div key={index} className="border border-gray-200 rounded-md p-3 flex gap-2 bg-white">
                                            <div>
                                                <div className="w-10 h-10 rounded-md bg-blue-100 flex justify-center items-center">
                                                    <FaGraduationCap color="blue" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{education.educationStream}</p>
                                                <p className="text-sm font-light mt-1">{education.institution}</p>
                                                <div className="flex gap-2 items-center mt-2">
                                                    <span className="flex items-center gap-1 text-xs text-gray-700"><IoLocation color="gray" /> {education.location}</span>
                                                    <span className="flex items-center gap-1 text-xs text-gray-700"><CiCalendar color="gray" /> {education.startYear} - {education.endYear}</span>
                                                </div>
                                                <p className="mt-2 text-xs text-gray-500">Description if any!
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    userDetails?.educations.length === 0 && (<p className="text-center text-gray-500 text-xs">No education added</p>)
                                }
                            </div>
                        </section>
                    )
                }

                {
                    activeSection === 'posts' && (
                        <section id="posts" className="mt-5">
                            <div className="grid grid-cols-1 gap-3">
                                {
                                    userDetails?.posts?.map((post: Post, index: number) => (
                                        <div key={index} className="border border-gray-200 rounded-md bg-white p-3">
                                            <div className="border-b pb-2 border-gray-200 flex justify-between gap-2">
                                                <div>
                                                    <p className="text-sm">Post Caption</p>
                                                    <p className="text-xs text-gray-700 mt-2">Post Description</p>
                                                </div>
                                                <div>
                                                    <button><BsThreeDotsVertical color="gray"  size={14}/></button>
                                                </div>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center text-gray-500 gap-1">
                                                        <CiHeart size={18} />
                                                        <p className="text-xs">12 likes</p>
                                                    </div>
                                                    <div className="flex items-center text-gray-500 gap-1">
                                                        <AiOutlineComment size={18} />
                                                        <p className="text-xs">12 comments</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Relative time</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    userDetails?.posts?.length === 0 && (<p className="text-center text-gray-500 text-xs">No posts added</p>)
                                }
                            </div>
                        </section>
                    )
                }
            </div>
        </div>
        </>
        // <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
        //     <div className="bg-white rounded-lg shadow-md border border-gray-200">
        //         {/* Header Section */}
        //         <div className="p-6 border-b border-gray-200">
        //             <div className="flex flex-col md:flex-row justify-between items-start">
        //                 <div className="flex items-center gap-4">
        //                     <img 
        //                         className="rounded-full w-20 h-20 object-cover border-2 border-gray-200" 
        //                         src={userDetails?.profilePicture?.cloudinarySecureUrl || defaultImage} 
        //                         alt="Candidate Profile" 
        //                     />
        //                     <div>
        //                         <h1 className="text-2xl font-bold text-gray-800">{userDetails?.name}</h1>
        //                         <p className="text-md text-gray-600">{userDetails?.headline || 'No job title provided'}</p>
        //                         <p className="text-sm text-gray-500 mt-1">
        //                             <i className="fa-solid fa-location-dot text-xs mr-1"></i>
        //                             {userDetails?.location ? `${userDetails.location.city}, ${userDetails.location.state}` : 'Location not provided'}
        //                         </p>
        //                     </div>
        //                 </div>
        //                 <div className="text-left md:text-right mt-4 md:mt-0">
        //                     <div className="flex items-center md:justify-end gap-4">
        //                         {userDetails?.isBlocked ? (
        //                             <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-medium px-2.5 py-1 rounded-full">
        //                                 <span className="w-2 h-2 bg-red-500 rounded-full"></span>Blocked
        //                             </span>
        //                         ) : (
        //                             <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
        //                                 <span className="w-2 h-2 bg-green-500 rounded-full"></span>Active
        //                             </span>
        //                         )}
        //                         {userDetails?.isBlocked ? (
        //                             <button onClick={() => unblockCandidate(userDetails?._id as string)} type="button" className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">Unblock</button>
        //                         ) : (
        //                             <button onClick={() => blockCandidate(userDetails?._id as string)} type="button" className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">Block</button>
        //                         )}
        //                     </div>
        //                     <p className="text-xs text-gray-500 mt-2">Joined on: {formatDate(userDetails?.createdAt as string)}</p>
        //                 </div>
        //             </div>
        //         </div>

        //         {/* Main Content Grid */}
        //         <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        //             {/* Left Column */}
        //             <div className="lg:col-span-2 space-y-6">
        //                 {/* About Section */}
        //                 <div className="p-5 border border-gray-200 rounded-lg">
        //                     <h3 className="text-lg font-semibold text-gray-800 mb-3">About</h3>
        //                     <p className="text-sm text-gray-600 leading-relaxed">{userDetails?.summary || 'No information provided.'}</p>
        //                 </div>

        //                 {/* Recruiter Profile Section */}
        //                 {userDetails?.recruiterProfile && (
        //                     <div className="p-5 border border-gray-200 rounded-lg">
        //                         <h3 className="text-lg font-semibold text-gray-800 mb-4">Recruiter Activity</h3>
        //                         <div className="space-y-3">
        //                             <div className="flex items-center gap-3">
        //                                 <i className="fa-solid fa-building text-gray-500"></i>
        //                                 <p className="text-sm text-gray-700">
        //                                     <span className="font-semibold">Organization:</span> {userDetails.recruiterProfile.organizationDetails?.organizationName}
        //                                 </p>
        //                             </div>
        //                             <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
        //                                 <div>
        //                                     <p className="text-xs text-gray-500">Total Jobs Posted</p>
        //                                     <p className="text-xl font-bold text-blue-600">{userDetails.jobs?.length || 0}</p>
        //                                 </div>
        //                                 <div>
        //                                     <p className="text-xs text-gray-500">Active Jobs</p>
        //                                     <p className="text-xl font-bold text-green-600">{userDetails.jobs?.filter(job => job.status === 'active').length || 0}</p>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 )}

                                               
        //                 {/* Experience Section */}
        //                 <div className="p-5 border border-gray-200 rounded-lg">
        //                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Experience</h3>
        //                     {experiences.length > 0 ? (
        //                         <div className="space-y-4">
        //                             {experiences.map((exp: Experience, index: number) => (
        //                                 <div key={index} className="flex gap-4">
        //                                     <div className="mt-1"><i className="fa-solid fa-briefcase text-xl text-gray-400"></i></div>
        //                                     <div>
        //                                         <p className="font-semibold text-md text-gray-700">{exp.role}</p>
        //                                         <p className="text-sm text-gray-600">{exp.organization} · {exp.jobtype}</p>
        //                                         <p className="text-xs text-gray-500 mt-1">{formatDate(exp.startDate)} - {exp.ispresent ? 'Present' : formatDate(exp.endDate)}</p>
        //                                     </div>
        //                                 </div>
        //                             ))}
        //                         </div>
        //                     ) : <p className="text-sm text-gray-500">No experience provided.</p>}
        //                 </div>

        //                 {/* Education Section */}
        //                 <div className="p-5 border border-gray-200 rounded-lg">
        //                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Education</h3>
        //                     {education.length > 0 ? (
        //                         <div className="space-y-4">
        //                             {education.map((edu: Education, index: number) => (
        //                                 <div key={index} className="flex gap-4">
        //                                     <div className="mt-1"><i className="fa-solid fa-graduation-cap text-xl text-gray-400"></i></div>
        //                                     <div>
        //                                         <p className="font-semibold text-md text-gray-700">{edu.institution}</p>
        //                                         <p className="text-sm text-gray-600">{edu.educationLevel}, {edu.educationStream}</p>
        //                                         <p className="text-xs text-gray-500 mt-1">{edu.startYear} - {edu.isPresent ? 'Present' : edu.endYear}</p>
        //                                     </div>
        //                                 </div>
        //                             ))}
        //                         </div>
        //                     ) : <p className="text-sm text-gray-500">No education details provided.</p>}
        //                 </div>

        //                 <div className="p-5 border border-gray-200 rounded-lg">
        //                     <h3 className="text-lg font-semibold text-gray-800 mb-4">User Posts</h3>
        //                     {userDetails?.posts && userDetails.posts.length > 0 ? (
        //                         <div className="space-y-4">
        //                             {userDetails.posts.map((post) => (
        //                                 <div key={post._id} className="p-4 border border-gray-100 rounded-md bg-gray-50">
        //                                     {post.media && (
        //                                         <img src={post.media?.cloudUrl} alt="Post image" className="w-80 h-auto rounded-lg mb-3 object-cover !mx-auto" />
        //                                     )}
        //                                     <p className="text-sm text-gray-700 mb-2">{post.description}</p>
        //                                     <p className="text-xs text-gray-400">
        //                                         Posted on {formatDate(post.createdAt as string)}
        //                                     </p>
        //                                 </div>
        //                             ))}
        //                         </div>
        //                     ) : <p className="text-sm text-gray-500">This user has not made any posts.</p>}
        //                 </div>

        //             </div>

        //             {/* Right Column */}
        //             <div className="space-y-6">
        //                 {/* Contact Info Section */}
        //                 <div className="p-5 border border-gray-200 rounded-lg">
        //                     <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
        //                     <div className="space-y-2 text-sm">
        //                         <div className="flex items-center gap-2 text-gray-600">
        //                             <i className="fa-solid fa-envelope w-4 text-center"></i>
        //                             <span>{userDetails?.email}</span>
        //                         </div>
        //                         {userDetails?.phone && (
        //                             <div className="flex items-center gap-2 text-gray-600">
        //                                 <i className="fa-solid fa-phone w-4 text-center"></i>
        //                                 <span>{userDetails.phone}</span>
        //                             </div>
        //                         )}
        //                     </div>
        //                 </div>

        //                 {/* Skills Section */}
        //                 <div className="p-5 border border-gray-200 rounded-lg">
        //                     <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills</h3>
        //                     {skills.length > 0 ? (
        //                         <div className="flex flex-wrap gap-2">
        //                             {skills.map((skill: Skills, index: number) => (
        //                                 <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
        //                                     {skill.skill}
        //                                 </span>
        //                             ))}
        //                         </div>
        //                     ) : <p className="text-sm text-gray-500">No skills added.</p>}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}