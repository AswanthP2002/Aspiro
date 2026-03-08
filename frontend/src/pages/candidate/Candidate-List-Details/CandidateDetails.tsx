import defaultProfilePicture from '/default-img-instagram.png'
import defaultCoverPhoto from '/default-cover-photo.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { getCandidateDetails } from '../../../services/commonServices'
import formatDate, { transformDate } from '../../../services/util/formatDate'
import { cancelConnectionRequest, followUser, loadUserPublicProfile, sendConnectionRequest, unfollowUser } from '../../../services/userServices'
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
import { ConnectionRequests, Education, Experience, Follow, Skills, SocialLinks, UserPosts, UserProfileAggregated, UserPublicProfileData } from '../../../types/entityTypes'
import { appContext } from '../../../context/AppContext'
import { FaShareNodes } from 'react-icons/fa6'
import { BiBlock, BiCopy } from 'react-icons/bi'
import { MdOutlineReport } from 'react-icons/md'
import { useParams } from 'react-router-dom'

interface UserPublicProfileResponsePayload {
    success: boolean
    message: string
    result: UserPublicProfileData
}

interface SendConnectionRequestResponsePayload {
    success: boolean
    message: string
    result: ConnectionRequests
}

interface CancelConnectionRequestResponsePayload {
    success: boolean
    message: string
    result: ConnectionRequests
}

export default function UserPublicProfile() {
    const {userMetaData} = useContext(appContext)

    const [userDetails, setUserDetails] = useState<UserPublicProfileData | undefined>()
    const logedUser = useSelector((state: any) => {
        return state?.userAuth?.user
    })
    const [followed, setFollowed] = useState<boolean>(false)

    const navigateTo = useNavigate()
    const [isUserOptionsMenuOpened, setIsUserOptionsMenuOpened] = useState(false)

    const location = useLocation()
    const fallbackUserId = useParams<{userId: string}>().userId
    const {userId} = location.state || {}
    console.log('---checking data for testability---', location)
    Notify.success(`get userid from the recruiter side page ${userId || fallbackUserId}`)
    
    const followAUser = async () => {
        setFollowed(true)
        try {
            const result = await followUser(userDetails?._id as string, logedUser.name, logedUser.profilePicture)

            if(!result?.success){
                Notify.failure(result?.message, {timeout:2000})
                return
            }

            Notify.success(result?.message, {timeout:2000})
            setUserDetails((details: UserPublicProfileData | undefined) => {
                if(!details) return undefined
                return {
                    ...details,
                    followers:[...details.followers, logedUser._id]
                }
            })

        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:5000})
        }
    }

    const navigateToUserChat = () => {
       return navigateTo(`/chats`, {state:{_id: userDetails?._id, name: userDetails?.name, email: userDetails?.email}})
    }

    const sendConnectionRequestToUser = async (userId: string) => {
        if(!userId) return

        Swal.fire({
            icon: 'question',
            title: 'Send Request ?',
            text: `Your request will be pending until ${userDetails?.name} accepts your request`,
            showConfirmButton: true,
            confirmButtonText: 'Send',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
            const result: SendConnectionRequestResponsePayload = await sendConnectionRequest(userId, logedUser.name, logedUser.profilePicture)
            if(result.success){
                Notify.success('Connection request send')
                //update state
                setUserDetails((prv: UserPublicProfileData | undefined) => {
                    if(!prv) return undefined
                    return {
                        ...prv,
                        connectionRequests:[...prv.connectionRequests, result.result]
                    }
                })
            }

        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
        }
            }else{
                return
            }
        })
    }

    const cancelThisConnectionRequest = async (userId: string) => {
        if(!userId) return

        Swal.fire({
            icon: 'question',
            title: 'Cancel Request?',
            showConfirmButton: true,
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'No'
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result: CancelConnectionRequestResponsePayload = await cancelConnectionRequest(userId)
                    if(result.success){
                        Notify.info('Request canceled')
                        setUserDetails((prv: UserPublicProfileData | undefined) => {
                            if(!prv) return undefined
                            return {
                                ...prv,
                                connectionRequests:prv.connectionRequests.filter((request: ConnectionRequests) => request._id !== result.result._id)
                            }
                            
                        })
                    }
                } catch (error: unknown) {
                    Notify.failure(error instanceof Error ? error.message: 'something went wrong')
                }
            }else { 
                return
            }
        })
    }

    const unfollowAUser = async () => {
        Swal.fire({
            icon: 'question',
            title: `Unfollow ${userDetails?.name}`,
            showCancelButton: true,
            cancelButtonText: 'No',
            showConfirmButton: true,
            confirmButtonText: 'Unfollow',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(async (response) => {
            if(response.isConfirmed){
                setFollowed(false)

        try {
            const result = await unfollowUser(userDetails?._id as string, logedUser.name, logedUser.profilePicture)
        
            if(!result?.success){
                Notify.failure(result?.message, {timeout:2000})
                return
            }

            Notify.success(result?.message, {timeout:2000})

            //update ui
            setUserDetails((details: UserPublicProfileData | undefined) => {
                if(!details) return undefined
                
                return {
                    ...details,
                    followers: details.followers.filter((followers: Follow) => followers._id === logedUser.id)
                }
            })
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:5000})
        }
            }else{
                return
            }
        })
        
    }

    const isMeFollowsThisUser = (myId: string): boolean => {
        for(let i = 0; i < userDetails?.followers.length; i++){
            if(userDetails?.followers[i].follower === myId) return true
        }
        return false
    }

    const isConnectedThisUser = (myId: string): boolean => {
        if(userDetails?.connections.includes(myId)){
            return true
        } else {
            return false
        }
    }

    const isConnectionIsPending = (myId: string) => {
        for(let i = 0; i < userDetails?.connectionRequests.length; i++){
            if(userDetails?.connectionRequests[i].sender === myId && userDetails.connectionRequests[i].status === 'PENDING'){
                return true
            }
        }

        return false
    }

    useEffect(() => {
        //Notify.success(userId as string, {timeout:3000})
        (async function(){
            // console.log('user id', userId)
            Notify.info(userId, {timeout:3000})
            try {
                Notify.info(`Fallback userid is here ${fallbackUserId}`)
                const result: UserPublicProfileResponsePayload = await loadUserPublicProfile(fallbackUserId as string)

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
                            {
                                userDetails?.profilePicture?.cloudinarySecureUrl && (
                                    <img style={{objectFit:'cover'}} className='w-full h-full rounded-full' src={userDetails.profilePicture.cloudinarySecureUrl} alt="" />
                                )
                            }
                            {
                                !userDetails?.profilePicture?.cloudinarySecureUrl && (
                                    <p className='text-2xl'>{userDetails?.name ? userDetails?.name[0] : 'A'}</p>
                                )
                            }
                        </div>
                    </div>
                    <div className='flex-1'>
                        <div className='relative flex justify-between items-start'>
                          <div>
                            <p className='text-xl'>{userDetails?.name}</p>
                            <p className='text-gray-700'>{userDetails?.headline}</p>
                          </div>
                          <button onClick={() => setIsUserOptionsMenuOpened(prv => !prv)} className='mt-2 border border-gray-300 text-xs rounded-md flex items-center justify-center px-2 py-1'>
                            <BsThreeDots />
                          </button>
                          {
                            isUserOptionsMenuOpened && (
                                <div className="absolute bg-white shadow-xl rounded-md p-3 border border-gray-300 right-0 !top-10">
                                    <ul className='space-y-3'>
                                        <li className='text-xs flex items-center gap-2'>
                                            <FaShareNodes />
                                            <p>Share this profile</p>
                                        </li>
                                        <li className='text-xs flex items-center gap-2'>
                                            <BiCopy />
                                            <p>Copy profile URL</p>
                                        </li>
                                        <li className='text-xs flex items-center gap-2 text-red-500'>
                                            <BiBlock />
                                            <p>Block this user</p>
                                        </li>
                                        <li className='text-xs flex items-center gap-2'>
                                            <MdOutlineReport />
                                            <p>Report this user</p>
                                        </li>
                                    </ul>
                                </div>
                            )
                          }
                        </div>
                        <div className='flex gap-2 flex-col mt-3'>
                            <span className='flex text-xs text-gray-500 items-center gap-2'>
                                <IoLocation />
                                <p>{userDetails?.location?.district}, {userDetails?.location?.state}</p>
                            </span>
                           <div className="flex gap-2">
                             <span className='flex text-xs text-gray-500 items-center gap-2'>
                                <LuUsers />
                                233 Connections
                            </span>
                             <span className='flex text-xs text-gray-500 items-center gap-2'>
                                <LuUsers />
                                {userDetails?.followers.length} Followers
                            </span>
                           </div>
                        </div>
                        <p className='text-blue-500 text-xs mt-2'>23 mutual connections</p>
                        <div className="flex gap-2 items-center w-full mt-3">
                            {
                                isConnectedThisUser(logedUser._id) && (
                                    <button className='flex hover:bg-gray-100 px-2 text-gray-500 items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
                                            <LuUserCheck color='gray' />
                                            Connected
                                        </button>
                                )
                            }
                            {
                                isConnectionIsPending(logedUser._id) && (
                                    <button onClick={() => cancelThisConnectionRequest(userDetails?._id as string)} className='flex hover:bg-gray-100 text-gray-500 px-3 items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
                                            Pending
                                        </button>
                                )
                            }
                            {
                                (!isConnectedThisUser(logedUser._id) && !isConnectionIsPending(logedUser._id)) && (
                                   <button onClick={() => sendConnectionRequestToUser(userDetails?._id as string)} className='flex hover:bg-gray-100 text-black flex-1 items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
                                            <LuUserPlus color='black' />
                                            Connect
                                        </button> 
                                )
                            }
                            {/* {
                                userDetails?.connections?.includes(logedUser?.id)
                                    ? <>
                                        <button className='flex hover:bg-gray-100 text-gray-500 items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
                                            <LuUserCheck color='gray' />
                                            Connected
                                        </button>
                                      </>
                                    : <>
                                        <button onClick={() => sendConnectionRequestToUser(userDetails?._id as string)} className='flex hover:bg-gray-100 text-black flex-1 items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
                                            <LuUserPlus color='black' />
                                            Connect
                                        </button>
                                      </>
                            } */}
                            {
                                isMeFollowsThisUser(logedUser._id) || followed
                                    ? <>
                                        <button onClick={unfollowAUser} className='flex bg-white flex-1 text-black items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
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
                            {
                                isConnectedThisUser(logedUser._id) && (
                                    <button onClick={navigateToUserChat} className='flex flex-1 items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
                                        <AiOutlineMessage />
                                        Message
                                    </button>
                                )
                            }
                        </div>
                        
                    </div>
                </div>
                </div>

                <div className="w-full mt-5 grid grid-cols-1 gap-3">
                    <div className=''>
                        <div className="about-card h-fit border border-gray-300 rounded-md p-5 bg-white">
                            <p className=''>About</p>
                            <p className='mt-3 text-xs leading-relaxed text-gray-500'>
                                {userDetails?.summary}
                            </p>
                        </div>
                        {
                            userDetails?.socialLinks?.length > 0 && (
                        
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
                            )}
                        {
                            userDetails?.skills.length > 0 && (
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
                            )}
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        {
                            userDetails?.experiences.length > 0 && (
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
                        )}

                        {
                            userDetails?.educations.length > 0 && (
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
                        )}
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