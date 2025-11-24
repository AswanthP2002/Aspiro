import defaultProfilePicture from '/default-img-instagram.png'
import defaultCoverPhoto from '/default-cover-photo.jpg'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCandidateDetails } from '../../../services/commonServices'
import formatDate, { transformDate } from '../../../services/util/formatDate'
import { followUser, unfollowUser } from '../../../services/userServices'
import { Notify } from 'notiflix'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import GeneralModal from '../../../components/common/Modal'
import ChatApp from '../../common/Chat/Chat'
import { IoChatbubbleOutline, IoLocation } from 'react-icons/io5'
import { LuUserPlus, LuUsers } from 'react-icons/lu'
import { AiOutlineMessage, AiOutlineStar } from 'react-icons/ai'
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs'
import { FaGraduationCap, FaLinkedin } from 'react-icons/fa'
import { PiShareNetworkDuotone, PiSuitcase } from 'react-icons/pi'
import { CiCalendar, CiHeart } from 'react-icons/ci'
import claraImage from '/klara.jpg'

export default function UserPublicProfile() {
    const location = useLocation()
    const { candidateId } = location.state || {}
    const [candidateDetails, setCandidateDetails] = useState<any>({})

    const [openModal, setOpenModal] = useState(false)

    const modalOpen = () => setOpenModal(true)
    const modalClose = () => setOpenModal(false)
    

    const logedUser = useSelector((state : any) => {
        return state?.candidateAuth.user
    })

    const parsedLogedUser = JSON.parse(logedUser)

    const userFollow = async (userId : string) => {
        const result = await followUser(userId)
        if(result?.success){
            Notify.success('followed', {timeout:1000})
            setTimeout(() => window.location.reload(), 1000)
        }else{
            Notify.failure('Something went wrong', {timeout:1200})
        }
    }

    const userUnfollow = async (userId : string) => {
        Swal.fire({
            icon:'warning',
            title:'Unfollow?',
            text:'Do you want to unfollow this user?',
            showConfirmButton:true,
            confirmButtonText:'Unfollow',
            showCancelButton:true
        }).then(async (result) => {
            if(result?.isConfirmed){
                const unfollowResult = await unfollowUser(userId)
                if(unfollowResult?.success){
                    Notify.success('Unfollowed', {timeout:1000})
                    setTimeout(() => window.location.reload(), 1000)
                }else{
                    Notify.failure('Something went wrong', {timeout:1000})
                }
            }
            return
        })
    }

    console.log('This is lloged user id', parsedLogedUser?.id, typeof logedUser)
    console.log('thi is  followers list ', candidateDetails?.followers)
    useEffect(() => {
        (async function () {
            const result = await getCandidateDetails(candidateId)
            console.log('Candidate details from the backend', result)
            setCandidateDetails(result?.candidateDetails)
        })
    }, [])

    const isFollowing = (userId : string) => {
        const userFollowing = candidateDetails?.followers?.find((data : any) => {
            return data?.follower === userId
        })

        return Object.entries(userFollowing || []).length > 0
    }

    return (
        <>
        <div className="w-full min-h-screen">
            <div className="w-full h-40 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
            <div className='-mt-10'>
                <div className='px-5 md:px-10'>
                <div className="profile-card flex gap-3 border border-gray-300 bg-white rounded-md p-5">
                    <div className='shadow-lg rounded-full w-25 h-25 bg-white p-1 flex items-center justify-center'>
                        <div className='bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white w-full h-full rounded-full'>
                            <p className='text-2xl'>A</p>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <p className='text-xl'>Aswanth P</p>
                        <p className='text-gray-700'>Fullstack Developer</p>
                        <div className='flex gap-2 flex-col mt-3'>
                            <span className='flex text-xs text-gray-500 items-center gap-2'>
                                <IoLocation />
                                <p>Taliparamba, Kannur, Kerala</p>
                            </span>
                            <span className='flex text-xs text-gray-500 items-center gap-2'>
                                <LuUsers />
                                233 Connections
                            </span>
                        </div>
                        <p className='text-blue-500 text-xs mt-2'>23 mutual connections</p>
                        <div className="flex gap-2 items-center w-full mt-3">
                            <button className='flex w-1/3 items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
                                <LuUserPlus />
                                Connect
                            </button>
                            <button className='flex bg-black text-white w-1/3 items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
                                <AiOutlineStar />
                                Follow
                            </button>
                            <button className='flex w-1/3 items-center text-xs border border-gray-300 rounded-md justify-center gap-1 py-1'>
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
                            <p className='mt-3 text-sm text-gray-500'>I am a full stack developer who had a wide range of expertise in frontend and 
                            backend web solutions.
                            </p>
                        </div>
                        <div className="social-card mt-3 border border-gray-300 rounded-md p-5 bg-white">
                            <p className=''>Social Links</p>
                            <div className="mt-3 grid grid-cols-1 gap-5">
                                {
                                    Array.from(new Array(4).fill('test')).map((value: string, index: number) => (
                                        <div key={index} className='flex gap-2 items-center'>
                                            <div className='bg-blue-100 w-10 h-10 rounded-md flex items-center justify-center'>
                                                <FaLinkedin size={20} color='blue' />
                                            </div>
                                            <div>
                                                <p className='text-sm'>Domain</p>
                                                <p className='text-xs text-gray-700'>Url</p>
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
                                    Array.from(new Array(7).fill('skill')).map((value: string, index: number) => (
                                        <span className='bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1'><p>{value}</p></span>
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
                                    Array.from(new Array(4).fill('test')).map((value: string, index: number) => (
                                        <div key={index} className='flex gap-3 relative z-5'>
                                            <div className='bg-blue-100 relative z-7 w-8 h-8 rounded-md flex items-center justify-center'>
                                                <PiSuitcase size={18} color='blue' />
                                            </div>
                                            <div className="absolute border-l-2 h-[120%] left-4 border-gray-300">
                                                
                                            </div>
                                            <div>
                                                <p className='text-sm'>Full stack Developer</p>
                                                <p className="text-sm font-light">Aspiro</p>
                                                <div className="flex gap-2 items-center lg:flex-col lg:items-start mt-2">
                                                    <span className='flex items-center gap-1 text-xs text-gray-500'>
                                                        <IoLocation />
                                                        <p>Taliparamba, Kannur, Kerala</p>
                                                    </span>
                                                    <span className='flex items-center gap-1 text-xs text-gray-500'>
                                                        <CiCalendar />
                                                        <p>12/06/2024 - Present</p>
                                                    </span>
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
                                    Array.from(new Array(4).fill('test')).map((value: string, index: number) => (
                                        <div key={index} className='flex gap-3 relative z-5'>
                                            <div className='bg-orange-100 relative z-7 w-8 h-8 rounded-md flex items-center justify-center'>
                                                <FaGraduationCap size={18} color='red' />
                                            </div>
                                            <div className="absolute border-l-2 h-[120%] left-4 border-gray-300">
                                                
                                            </div>
                                            <div>
                                                <p className='text-sm'>BCA</p>
                                                <span className='text-xs text-gray-700 bg-gray-200 px-2 rounded-full'>Bachelors</span>
                                                <p className='text-sm font-light mt-2'>Indira Gandhi Open University</p>
                                                <div className="flex gap-2 items-center lg:flex-col lg:items-start mt-2">
                                                    <span className='flex items-center gap-1 text-xs text-gray-500'>
                                                        <IoLocation />
                                                        <p>Taliparamba, Kannur, Kerala</p>
                                                    </span>
                                                    <span className='flex items-center gap-1 text-xs text-gray-500'>
                                                        <CiCalendar />
                                                        <p>2022 - 2025</p>
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
                                    Array.from(new Array(2).fill('test')).map((value: string, index: number) => (
                                        <div key={index} className=" border border-gray-200 rounded-md bg-white">
                            
                            <div className="p-3">
                                <div className="flex gap-3">
                                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
                                        <p>A</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-light text-sm">Aswanth P</p>
                                        <p className="text-sm text-gray-700 font-light">Full stack Developer</p>
                                        <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                                    </div>
                                    <div>
                                        <button><BsThreeDotsVertical /></button>
                                    </div>
                                </div>
                            </div>
                            
                                    <div>
                                        <img className="w-full h-auto" src={claraImage} alt="" />
                                    </div>
                               
                            <div className="p-3 relative">
                                
                                <p className="text-sm font-light text-gray-700">Germany! 👀🌼</p>
                                 <button className="text-xs text-gray-500">Read More</button>
                            </div>
                            <div className="border t border-gray-200 text-xs text-gray-500 flex gap-2 p-3">
                                <div className="flex-1">
                                    <p>22 likes</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p>2 comments</p>
                                    <p>2 share</p>
                                </div>
                            </div>
                            <div className="border-t flex border-gray-200">
                    
                                            <button className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center">
                                                <CiHeart size={20} color="gray" />
                                                <p className="text-xs text-gray-500">Like</p>
                                            </button>
                                      
                                <button className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center">
                                    <IoChatbubbleOutline color="gray" />
                                    <p className="text-xs text-gray-500">Comment</p>
                                </button>
                                <button className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center">
                                    <PiShareNetworkDuotone color="gray" />
                                    <p className="text-xs text-gray-500">Share</p>
                                </button>
                            </div>
                            {
                                false && (
                            <div className="comment-box p-3 grid grid-cols-1 gap-3 border-t border-gray-200">
                                {
                                    post?.comments?.map((comment: Comments, index: number) => (
                                        <div key={index} className="flex gap-3">
                                            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                                                <p className="text-xs">{comment?.userDetails?.name ? comment?.userDetails?.name[0] : 'U'}</p>
                                            </div>
                                            <div className="flex-1">
                                                <div className="bg-gray-200 flex  rounded-md p-2">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium">{comment.userDetails?.name}</p>
                                                        <p className="text-xs text-gray-700">{comment.text}</p>
                                                    </div>
                                                    {
                                                        comment.userId === logedUser?.id && (
                                                            <button onClick={() => deleteCommentOnPost(post._id as string, comment._id as string)}>
                                                                <FaTrash color="gray" size={12} />
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                                <p className="text-xs text-gray-700">{formatRelativeTime(comment?.createdAt)}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="flex gap-3 mt-3 items-center">
                                    <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xs text-white">
                                        <p>Y</p>
                                    </div>
                                    <form onSubmit={handleSubmitComment(() => addCommentOnPost(post?._id as string))} className="flex flex-1 gap-2">
                                        <FormControl className="flex-1" error={Boolean(commentErrors.comment)}>
                                            <Controller 
                                                name="comment"
                                                control={commentControl}
                                                rules={{
                                                    required:{value:true, message:'Comment can not be empty'}
                                                }}
                                                render={({field}) => (
                                                    <div className=" bg-gray-100 rounded-md py-1 px-2">
                                                        <input {...field} type="text" placeholder="Write a comment" />
                                                    </div>
                                                )}      
                                            />
                                            <FormHelperText>{commentErrors.comment?.message}</FormHelperText>
                                        </FormControl>
                                    <button type="submit" className="bg-gray-500 p-2 rounded-md">
                                        <LuSend color="white" />
                                    </button>
                                    </form>
                                </div>
                            </div>
                            )
                        }
                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}