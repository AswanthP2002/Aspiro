import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import formatDate from '../../../services/util/formatDate'
import { cancelConnectionRequest, removeConnection, sendConnectionRequest } from '../../../services/connectionServices'
import { followUser, loadUserPublicProfile, unfollowUser, updateUserProfileView } from '../../../services/userServices'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { IoLocation } from 'react-icons/io5'
import { LuUserCheck, LuUserPlus, LuUsers } from 'react-icons/lu'
import { AiOutlineCheck, AiOutlineMessage, AiOutlineStar } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { FaLinkedin } from 'react-icons/fa'
import { PiSuitcase } from 'react-icons/pi'
import { CiCalendar } from 'react-icons/ci'
import Post from '../../../components/common/Post'
import { ConnectionRequests, Experience, Follow, UserPosts, UserPublicProfileData } from '../../../types/entityTypes'
import { FaShareNodes } from 'react-icons/fa6'
import { BiBlock, BiCopy } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { Modal } from '@mui/material'
import { FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import FollowersModal from '../../../components/user/Followers.modal'
import FollowingsModal from '../../../components/user/Followings.modal'

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
    // const {userMetaData} = useContext(appContext)

    const [userDetails, setUserDetails] = useState<UserPublicProfileData | undefined>()
    const logedUser = useSelector((state: {userAuth: {user: {_id: string, name: string, profilePicture: string}}}) => {
        return state?.userAuth?.user
    })
    const [followed, setFollowed] = useState<boolean>(false)

    const navigateTo = useNavigate()
    const [isUserOptionsMenuOpened, setIsUserOptionsMenuOpened] = useState(false)
    const [isProfilePhotoClicked, setIsProfilePhotoClicked] = useState(false)

    const viewProfilePhoto = () => setIsProfilePhotoClicked(true)
    const closeProfilePhoto = () => setIsProfilePhotoClicked(false)

    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)

    const openFollowersModal = () => setIsFollowersModalOpen(true)
    const closeFollowersModal = () => setIsFollowersModalOpen(false)

    const openFollowingModal = () => setIsFollowingModalOpen(true)
    const closeFollowingModal = () => setIsFollowingModalOpen(false)


    const location = useLocation()
    const fallbackUserId = useParams<{userId: string}>().userId
    const {userId} = location.state || {}
    console.log(userId)
    console.log('---checking data for testability---', location)
    //Notify.success(`get userid from the recruiter side page ${userId || fallbackUserId}`)
    
    const followAUser = async () => {
        setFollowed(true)
        try {
            const result = await followUser(userDetails?._id as string, logedUser.name, logedUser.profilePicture)

            if(!result?.success){
                toast.error(result?.message)
                return
            }

            toast.success('Followed')
            setUserDetails((details: UserPublicProfileData | undefined) => {
                if(!details) return undefined
                return {
                    ...details,
                    followers:[...details.followers, result?.result]
                }
            })

        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
    }

    const navigateToUserChat = () => {
       return navigateTo(`/chats`, {state:{_id: userDetails?._id, name: userDetails?.name, email: userDetails?.email, profilePicture: userDetails?.profilePicture?.cloudinarySecureUrl}})
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
                toast.success('Connection request send')
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
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
            }else{
                return
            }
        })
    }

    const removeFromMyConnection = async (userId: string, name: string) => {
        if(!userId) return toast.error('Something went wrong')
        const confirmation = await Swal.fire({
          icon: 'question',
          title: 'Break Connection ?',
          text: `Are you sure to remove ${name} from your connection?.`,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Remove',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
    
        if(!confirmation.isConfirmed) return
    
        try {
          const result = await removeConnection(userId)
          if(result.success){
            toast.info(`${name} removed from your connection`)
            setUserDetails((data: UserPublicProfileData | undefined) => {
                if(!data) return undefined
                return {
                    ...data,
                    connections: data.connections.filter((connection: string) => connection !== logedUser._id)
                }
            })
          }
        } catch (error: unknown) {
          toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
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
                        toast.info('Request canceled')
                        setUserDetails((prv: UserPublicProfileData | undefined) => {
                            if(!prv) return undefined
                            return {
                                ...prv,
                                connectionRequests:prv.connectionRequests.filter((request: ConnectionRequests) => request._id !== result.result._id)
                            }
                            
                        })
                    }
                } catch (error: unknown) {
                    toast.error(error instanceof Error ? error.message: 'something went wrong')
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
                toast.error(result?.message)
                return
            }

            toast.success(result?.message)

            //update ui
            setUserDetails((details: UserPublicProfileData | undefined) => {
                if(!details) return undefined
                
                return {
                    ...details,
                    followers: details.followers.filter((followers: Follow) => followers._id === logedUser._id)
                }
            })
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
            }else{
                return
            }
        })
        
    }

    const isMeFollowsThisUser = (myId: string): boolean => {
        for(let i = 0; i < (userDetails?.followers ? userDetails.followers.length : 0); i++){
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
        for(let i = 0; i < (userDetails?.connectionRequests ? userDetails?.connectionRequests.length : 0); i++){
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
           // Notify.info(userId, {timeout:3000})
            try {
                //Notify.info(`Fallback userid is here ${fallbackUserId}`)
                const result: UserPublicProfileResponsePayload = await loadUserPublicProfile(fallbackUserId as string)

                if(!result?.success){
                    toast.success(result?.message)
                    return
                }
                console.log('----user detail----', result?.result)
                setUserDetails(result?.result)
            } catch (error: unknown) {
                toast.error(error instanceof Error ? error.message : 'Something went wrong')
            }
        })()
    }, [fallbackUserId]) //updating dependancy array due to lint error. previously empty

    useEffect(() => {
        async function userProfileViewd(){
            try {
                await updateUserProfileView(userDetails?._id as string)
                
            } catch (error: unknown) {
                console.log('Error occured while updating user profile view')
                toast.error(error instanceof Error ? error.message : 'Something went wrong')
            }
        }

        if(userDetails?._id && logedUser._id !== userDetails?._id){
            userProfileViewd()
        }
    }, [userDetails, logedUser._id]) //updating dependancy due to lint error. previous userDetails,

    return (
        <>
        <div className="w-full min-h-screen bg-gray-50 pb-12">
  {/* Banner - More sophisticated gradient */}
  <div className="w-full h-48 bg-gradient-to-br rounded-md from-blue-500 via-blue-600 to-indigo-600 shadow-inner">
    {userDetails?.coverPhoto?.cloudinarySecureUrl && (
        <img className='w-full md:hidden rounded-md h-full object-cover' src={userDetails.coverPhoto.cloudinarySecureUrl} alt="" />
    )}
  </div>

  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="-mt-20">
      {/* Header Profile Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="shadow-xl rounded-full w-32 h-32 bg-white p-1.5 ring-4 ring-white">
                <div onClick={viewProfilePhoto} className="cursor-pointer bg-blue-100 flex items-center justify-center text-blue-600 w-full h-full rounded-full overflow-hidden transition-transform hover:scale-[1.02]">
                  {userDetails?.profilePicture?.cloudinarySecureUrl ? (
                    <img className="w-full h-full object-cover" src={userDetails.profilePicture.cloudinarySecureUrl} alt="" />
                  ) : (
                    <p className="text-4xl font-bold">{userDetails?.name ? userDetails?.name[0] : 'A'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* User Info Section */}
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start w-full">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{userDetails?.name}</h1>
                  <p className="text-lg text-gray-600 font-medium leading-tight mt-1">{userDetails?.headline}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <IoLocation className="text-gray-400" size={16} />
                      {userDetails?.location?.district}, {userDetails?.location?.state}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-blue-600">
                      <LuUsers size={16} />
                      233 Connections
                    </span>
                    <span onClick={openFollowingModal} className="text-gray-500 cursor-pointer hover:font-medium hover:text-blue-500">{userDetails?.following?.length || 0} Following</span>
                    <span onClick={openFollowersModal} className="text-gray-500 cursor-pointer hover:font-medium hover:text-blue-500">{userDetails?.followers.length} Followers</span>
                  </div>
                </div>

                <div className="relative">
                  <button onClick={() => setIsUserOptionsMenuOpened(prv => !prv)} className="p-2 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
                    <BsThreeDots size={20} className="text-gray-600" />
                  </button>
                  {isUserOptionsMenuOpened && (
                    <div className="absolute right-0 top-12 w-52 bg-white shadow-xl rounded-xl p-2 border border-gray-200 z-50">
                      <ul className="space-y-1">
                        <li className="flex items-center gap-3 p-2 text-[13px] hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                          <FaShareNodes className="text-gray-400" /> Share profile
                        </li>
                        <li className="flex items-center gap-3 p-2 text-[13px] hover:bg-gray-50 rounded-md cursor-pointer">
                          <BiCopy className="text-gray-400" /> Copy URL
                        </li>
                        <li className="flex items-center gap-3 p-2 text-[13px] hover:bg-red-50 text-red-600 rounded-md cursor-pointer">
                          <BiBlock /> Block user
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                {isConnectedThisUser(logedUser._id) ? (
                  <button onClick={() => removeFromMyConnection(userDetails?._id as string, userDetails?.name as string)} className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full border border-gray-200 cursor-default">
                    <LuUserCheck /> Connected
                  </button>
                ) : isConnectionIsPending(logedUser._id) ? (
                  <button onClick={() => cancelThisConnectionRequest(userDetails?._id as string)} className="px-6 py-2 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full border border-blue-100 hover:bg-blue-100 transition-colors">
                    Pending
                  </button>
                ) : (
                  <button onClick={() => sendConnectionRequestToUser(userDetails?._id as string)} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 shadow-md transition-all active:scale-95">
                    <LuUserPlus /> Connect
                  </button>
                )}

                {isMeFollowsThisUser(logedUser._id) || followed ? (
                  <button onClick={unfollowAUser} className="px-6 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <AiOutlineCheck /> Following
                  </button>
                ) : (
                  <button onClick={followAUser} className="px-6 py-2 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-colors flex items-center gap-2">
                    <AiOutlineStar /> Follow
                  </button>
                )}

                {isConnectedThisUser(logedUser._id) && (
                  <button onClick={navigateToUserChat} className="p-2 border border-blue-200 text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                    <AiOutlineMessage size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: About & Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              {userDetails?.summary || "No description provided."}
            </p>
          </div>

          {userDetails?.socialLinks && userDetails?.socialLinks?.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Social Presence</h3>
              <div className="space-y-4">
                {userDetails.socialLinks.map((link: {domain: string, url: string}, i: number) => (
                  <div key={i} className="flex gap-3 items-center group cursor-pointer">
                    <div className="bg-blue-50 w-10 h-10 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <FaLinkedin size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{link.domain.split('.')[1]}</p>
                      <p className="text-sm text-blue-600 truncate font-medium underline-offset-2 group-hover:underline">{link.url}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {userDetails?.skills && userDetails?.skills.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userDetails.skills.map((skill: {skill: string}, i: number) => (
                  <span key={i} className="bg-gray-100 text-gray-700 text-[12px] font-semibold rounded-full px-4 py-1.5 hover:bg-gray-200 transition-colors cursor-default">
                    {skill.skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Experience, Education & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Experience Section */}
          {userDetails?.experiences && userDetails?.experiences.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <PiSuitcase size={22} className="text-gray-400" />
                <h3 className="text-lg font-bold text-gray-900">Experience</h3>
              </div>
              <div className="space-y-8">
                {userDetails.experiences.map((exp: Experience, i: number) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-50 w-10 h-10 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100">
                        <PiSuitcase size={20} />
                      </div>
                      {i !== userDetails.experiences.length - 1 && <div className="w-[2px] h-full bg-gray-100 mt-2"></div>}
                    </div>
                    <div className="pb-2">
                      <p className="font-bold text-gray-900">{exp.jobRole}</p>
                      <p className="text-gray-600 font-medium text-sm">{exp.organization}</p>
                      <div className="flex flex-wrap gap-3 mt-2 text-[12px] text-gray-500 font-medium">
                        <span className="flex items-center gap-1"><IoLocation /> {exp.location}</span>
                        <span className="flex items-center gap-1"><CiCalendar /> {formatDate(exp.startDate as string)} - {exp.isPresent ? 'Present' : formatDate(exp.endDate as string)}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">{exp.workMode}</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">{exp.jobType}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {userDetails?.posts && userDetails?.posts.length > 0 ? (
                userDetails.posts.map((post: UserPosts) => (
                  <Post key={post._id} postData={post} />
                ))
              ) : (
                <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-xl">
                  <p className="text-gray-400 text-sm">No posts to show yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        {isProfilePhotoClicked && (
            <ProfilePictureViewModal open={isProfilePhotoClicked} url={userDetails?.profilePicture?.cloudinarySecureUrl as string} onClose={closeProfilePhoto} />
        )}

        {isFollowersModalOpen && (
            <FollowersModal isOpen={isFollowersModalOpen} onClose={closeFollowersModal} onFollowerRemoval={() => console.log('')} userId={userDetails?._id as string} />
        )}

        {isFollowingModalOpen && (
            <FollowingsModal isOpen={isFollowingModalOpen} onClose={closeFollowingModal} onUnFollow={unfollowAUser} userId={userDetails?._id as string} />
        )}
        </>
    )
}

function ProfilePictureViewModal({open, onClose, url}: {open: boolean, onClose: () => void, url: string}){
    return(
        <Modal className='flex items-center justify-center backdrop-blur' open={open} onClose={onClose}>
            <div className='w-50 h-50 bg-white rounded-full shadow-xl relative'>
                {url
                    ? <img className='w-full h-full object-cover rounded-full' src={url} alt="" />
                    : <div className='w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-indigo-400'>
                        <p className='text-gray-700 font-medium text-slate-600'>No profile picture</p>
                    </div>
                }
                <button onClick={onClose} className="absolute top-0 right-0">
                    <FiX size={25} color='white' />
                </button>
            </div>
        </Modal>
    )
}