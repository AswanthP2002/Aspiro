import defaultProfilePicture from '/default-img-instagram.png'
import defaultCoverPhoto from '/default-cover-photo.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { getCandidateDetails } from '../../../services/commonServices'
import formatDate, { transformDate } from '../../../services/util/formatDate'
import { followUser, loadUserPublicProfile, unfollowUser } from '../../../services/userServices'
import { Notify } from 'notiflix'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import GeneralModal from '../../../components/common/Modal'
import ChatApp from '../../common/Chat/Chat'
import { IoChatbubbleOutline, IoLocation } from 'react-icons/io5'
import { LuUserCheck, LuUserPlus, LuUsers } from 'react-icons/lu'
import { AiOutlineCheck, AiOutlineMessage, AiOutlineStar } from 'react-icons/ai'
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs'
import { FaGraduationCap, FaLinkedin } from 'react-icons/fa'
import { PiShareNetworkDuotone, PiSuitcase } from 'react-icons/pi'
import { CiCalendar, CiHeart } from 'react-icons/ci'
import claraImage from '/klara.jpg'
import Post from '../../../components/common/Post'
import { Education, Experience, Skills, SocialLinks, UserPosts, UserProfileAggregated } from '../../../types/entityTypes'
import { appContext } from '../../../context/AppContext'

export default function UserPublicProfile() {
    const {userMetaData} = useContext(appContext)

    const [userDetails, setUserDetails] = useState<UserProfileAggregated | undefined>()
    const logedUser = useSelector((state: any) => {
        return state?.userAuth?.user
    })
    const [followed, setFollowed] = useState<boolean>(false)

    const navigateTo = useNavigate()

    const location = useLocation()
    const {userId} = location.state || {}
    console.log('---checking data for testability---', location)
    Notify.success(`get userid from the recruiter side page ${userId}`)
    const followAUser = async () => {
        setFollowed(true)

        try {
            //call api first: since no other feedback showing 
            // in the frontend like count expect connections
            const result = await followUser(userDetails?._id as string, userMetaData.name, userMetaData.profilePicture.cloudinarySecureUrl)

            if(!result?.success){
                Notify.failure(result?.message, {timeout:2000})
                return
            }

            Notify.success(result?.message, {timeout:2000})
            //update ui without refresh
            setUserDetails((details: UserProfileAggregated | undefined) => {
                if(!details) return undefined
                return {
                    ...details,
                    followers:[...details.followers, logedUser.id]
                }
            })

        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:5000})
        }
    }

    const navigateToUserChat = () => {
       return navigateTo(`/chats`, {state:{_id: userDetails?._id, name: userDetails?.name, email: userDetails?.email}})
    }

    const unfollowAUser = async () => {
        setFollowed(false)

        try {
            const result = await unfollowUser(userDetails?._id as string, userMetaData.name, userMetaData.profilePicture.cloudinarySecureUrl)
        
            if(!result?.success){
                Notify.failure(result?.message, {timeout:2000})
                return
            }

            Notify.success(result?.message, {timeout:2000})

            //update ui
            setUserDetails((details: UserProfileAggregated | undefined) => {
                if(!details) return undefined
                
                return {
                    ...details,
                    followers: details.followers.filter((id: string) => id !== logedUser.id)
                }
            })
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:5000})
        }
    }

    useEffect(() => {
        //Notify.success(userId as string, {timeout:3000})
        (async function(){
            // console.log('user id', userId)
            Notify.info(userId, {timeout:3000})
            try {
                const result = await loadUserPublicProfile(userId)

                if(!result?.success){
                    Notify.failure(result?.message, {timeout:3000})
                    return
                }
                console.log('----user detail----', result?.result)
                setUserDetails(result?.result)
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:10000})
            }
        })()
    }, [])

    return (
        <>
        <div className="w-full min-h-screen">
            <div className="w-full h-40 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
            <div className='-mt-10'>
                <div className='px-5 md:px-10'>
                <div className="profile-card flex gap-3 border border-gray-300 bg-white rounded-md p-5">
                    <div className='shadow-lg rounded-full w-25 h-25 bg-white p-1 flex items-center justify-center'>
                        <div className='bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white w-full h-full rounded-full'>
                            <p className='text-2xl'>{userDetails?.name ? userDetails?.name[0] : 'A'}</p>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <p className='text-xl'>{userDetails?.name}</p>
                        <p className='text-gray-700'>{userDetails?.headline}</p>
                        <div className='flex gap-2 flex-col mt-3'>
                            <span className='flex text-xs text-gray-500 items-center gap-2'>
                                <IoLocation />
                                <p>{userDetails?.location?.district}, {userDetails?.location?.state}</p>
                            </span>
                            <span className='flex text-xs text-gray-500 items-center gap-2'>
                                <LuUsers />
                                233 Connections
                            </span>
                        </div>
                        <p className='text-blue-500 text-xs mt-2'>23 mutual connections</p>
                        <div className="flex gap-2 items-center w-full mt-3">
                            {
                                userDetails?.connections?.includes(logedUser?.id)
                                    ? <>
                                        <button className='flex hover:bg-gray-100 text-gray-500 items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
                                            <LuUserCheck color='gray' />
                                            Connected
                                        </button>
                                      </>
                                    : <>
                                        <button className='flex hover:bg-gray-100 text-black flex-1 items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
                                            <LuUserPlus color='black' />
                                            Connect
                                        </button>
                                      </>
                            }
                            {
                                userDetails?.followers?.includes(logedUser.id) || followed
                                    ? <>
                                        <button onClick={unfollowAUser} className='flex bg-gray-500 hover:bg-black flex-1 text-white items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
                                            <AiOutlineCheck />
                                            Following
                                        </button>
                                      </>
                                    : <>
                                        <button onClick={followAUser} className='flex bg-black hover:bg-gray-500 flex-1 text-white items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
                                            <AiOutlineStar />
                                            Follow
                                        </button>
                                      </>
                            }
                            <button onClick={navigateToUserChat} className='flex flex-1 items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
                                <AiOutlineMessage />
                                Message
                            </button>
                        </div>
                        <button className='mt-2 border border-gray-300 text-xs rounded-md flex items-center justify-center px-2 py-1'>
                            <BsThreeDots />
                        </button>
                    </div>
                </div>
                </div>

                <div className="w-full mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className=''>
                        <div className="about-card h-fit border border-gray-300 rounded-md p-5 bg-white">
                            <p className=''>About</p>
                            <p className='mt-3 text-sm text-gray-500'>
                                {userDetails?.summary}
                            </p>
                        </div>
                        <div className="social-card mt-3 border border-gray-300 rounded-md p-5 bg-white">
                            <p className=''>Social Links</p>
                            <div className="mt-3 grid grid-cols-1 gap-5">
                                {
                                    userDetails?.socialLinks?.map((socialLink: SocialLinks, index: number) => (
                                        <div key={index} className='flex gap-2 items-center'>
                                            <div className='bg-blue-100 w-10 h-10 rounded-md flex items-center justify-center'>
                                                <FaLinkedin size={20} color='blue' />
                                            </div>
                                            <div>
                                                <p className='text-sm'>{socialLink.domain.split('.')[1]}</p>
                                                <p className='text-xs text-gray-700'>{socialLink.url}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="skills-card mt-3 border border-gray-300 rounded-md p-5 bg-white">
                            <p>Skills</p>
                            <div className="mt-3 flex flex-wrap gap-1">
                                {
                                    userDetails?.skills?.map((skill: Skills, index: number) => (
                                        <span key={index} className='bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1'><p>{skill.skill}</p></span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <div className="experience-card border border-gray-300 rounded-md p-5 bg-white">
                            <div className='flex items-center gap-2'>
                                <PiSuitcase size={20} />
                                <p>Experiences</p>
                            </div>
                            <div className="mt-5 grid grid-cols-1 gap-5">
                                {
                                    userDetails?.experiences?.map((experience: Experience, index: number) => (
                                        <div key={index} className='flex gap-3 relative z-5'>
                                            <div className='bg-blue-100 relative z-7 w-8 h-8 rounded-md flex items-center justify-center'>
                                                <PiSuitcase size={18} color='blue' />
                                            </div>
                                            <div className="absolute border-l-2 h-[120%] left-4 border-gray-300">
                                                
                                            </div>
                                            <div>
                                                <p className='text-sm'>{experience.jobRole}</p>
                                                <p className="text-sm font-light">{experience.organization}</p>
                                                <div className="flex gap-2 items-center lg:flex-col lg:items-start mt-2">
                                                    <span className='flex items-center gap-1 text-xs text-gray-500'>
                                                        <IoLocation />
                                                        <p>{experience.location}</p>
                                                    </span>
                                                    <span className='flex items-center gap-1 text-xs text-gray-500'>
                                                        <CiCalendar />
                                                        <p>
                                                            {formatDate(experience.startDate as string)} - {experience.isPresent ? 'Present' : formatDate(experience.endDate as string)}
                                                        </p>
                                                    </span>
                                                </div>
                                                <div className="flex gap-2 items-center mt-2">
                                                    <span className='text-xs bg-blue-100 text-blue-600 px-2 rounded-md'>{experience.workMode}</span>
                                                    <span className='text-xs bg-blue-100 text-blue-600 px-2 rounded-md'>{experience.jobType}</span>
                                                </div>
                                                <p className='text-xs text-gray-700 mt-2'>Descriptions if any</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="experience-card border border-gray-300 rounded-md p-5 bg-white">
                            <div className='flex items-center gap-2'>
                                <FaGraduationCap size={20} />
                                <p>Education</p>
                            </div>
                            <div className="mt-5 grid grid-cols-1 gap-5">
                                {
                                    userDetails?.educations?.map((education: Education, index: number) => (
                                        <div key={index} className='flex gap-3 relative z-5'>
                                            <div className='bg-orange-100 relative z-7 w-8 h-8 rounded-md flex items-center justify-center'>
                                                <FaGraduationCap size={18} color='red' />
                                            </div>
                                            <div className="absolute border-l-2 h-[120%] left-4 border-gray-300">
                                                
                                            </div>
                                            <div>
                                                <p className='text-sm'>{education.educationStream}</p>
                                                <span className='text-xs text-gray-700 bg-gray-200 px-2 rounded-full'>{education.educationLevel}</span>
                                                <p className='text-sm font-light mt-2'>{education.institution}</p>
                                                <div className="flex gap-2 items-center lg:flex-col lg:items-start mt-2">
                                                    <span className='flex items-center gap-1 text-xs text-gray-500'>
                                                        <IoLocation />
                                                        <p>{education.location}</p>
                                                    </span>
                                                    <span className='flex items-center gap-1 text-xs text-gray-500'>
                                                        <CiCalendar />
                                                        <p>{education.startYear} - {education.endYear ? education.endYear : 'Present'}</p>
                                                    </span>
                                                </div>
                                                <p className='text-xs text-gray-700 mt-2'>Descriptions if any</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            
                        </div>
                        <div className='activities mt-3'>
                            <p>Activities</p>
                            <div className="grid grid-cols-1 gap-2">
                                {
                                    userDetails && userDetails?.posts.length > 0 && (
                                    userDetails?.posts?.map((post: UserPosts, index: number) => (
                                        <Post key={index} postData={post} loading={false} />
                                    ))
                                )
                                }
                            </div>
                            {
                                userDetails?.posts.length === 0 && <div className="w-full border border-gray-300 bg-white rounded-md p-5 flex justify-center">
                                    <p className='text-xs text-gray-500'>No posts yet</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}