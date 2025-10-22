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

export default function CandidatePublicProfile() {
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
        })()
    }, [])

    const isFollowing = (userId : string) => {
        const userFollowing = candidateDetails?.followers?.find((data : any) => {
            return data?.follower === userId
        })

        return Object.entries(userFollowing || []).length > 0
    }

    return (
        <>
        <div className="candidate-details-container w-full">
            <div className="breadcrumbs-header bg-gray-100 w-full">
                <div className="aspiro-container">
                    <div className="flex justify-between py-3">
                        <div className="left"><p className="text-sm">Job Details</p></div>
                        <div className="right"><p className="text-sm">Home / Candidates / Candidate Details</p></div>
                    </div>
                </div>
            </div>
            <div className="section-details">
                <div className="aspiro-container">
                    <div className="relative w-full">
                        <div className="coverphoto bg-green-400">
                            <img className='w-full h-[200px]' style={{ objectFit: 'cover' }}
                                src={candidateDetails?.profilePicture?.cloudinarySecureUrl ? candidateDetails?.coverPhoto?.cloudinarySecureUrl : defaultProfilePicture} alt=""
                            />
                        </div>
                        <div className="flex justify-center bottom-[-50px] absolute w-full">
                            <div className="flex justify-between items-center bg-white p-5 w-3/4 border border-gray-200">
                                <div className="flex gap-3 profile items-center">
                                    <img
                                        src={candidateDetails?.coverPhoto?.cloudinarySecureUrl ? candidateDetails?.profilePicture?.cloudinarySecureUrl : defaultCoverPhoto}
                                        className='w-[80px] h-[80px] rounded-full' style={{objectFit:'cover'}} alt=""
                                    />
                                    <div>
                                        <p className='font-semibold'>{candidateDetails?.name}</p>
                                        <p className='text-sm text-gray-500 mt-1'>{candidateDetails?.role}</p>
                                    </div>
                                </div>
                                <div className="actions flex gap-5">
                                    {
                                        isFollowing(parsedLogedUser?.id)
                                            ? <button onClick={() => userUnfollow(candidateDetails?._id)} className='bg-blue-500 text-white text-sm !px-5 rounded'>Following</button>
                                            : <button onClick={() => userFollow(candidateDetails?._id)} className='bg-blue-500 text-white text-sm !px-5 rounded'>Follow</button>
                                    }
                                    <button onClick={modalOpen}><i className="fa-solid fa-message !text-2xl"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 mb-10">
                        <div className="grid grid-cols-2 gap-10">
                            <div className="about">
                                <p className="text-sm font-semibold">About</p>
                                <p className="mt-4 text-xs text-gray-500">
                                    {candidateDetails?.about}
                                </p>
                            </div>
                            <div className='border border-gray-300 rounded-md p-4'>
                                <div className="w-full flex justify-between">
                                    
                                    <div>
                                        <p className="font-semibold text-sm mt-3">{candidateDetails?.followers?.length}</p>
                                        <p className="text-xs text-gray-500 mt-1">Followers</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm mt-3">{candidateDetails?.following?.length}</p>
                                        <p className="text-xs text-gray-500 mt-1">Following</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm mt-3">{candidateDetails?.posts?.length}</p>
                                        <p className="text-xs text-gray-500 mt-1">Posts</p>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-timeline !text-2xl"></i>
                                        <p className='font-semibold text-sm mt-3'>Joined</p>
                                        <p className='text-xs text-gray-500 mt-1'>{transformDate(candidateDetails?.createdAt)}</p>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-location-dot !text-2xl"></i>
                                        <p className='font-semibold text-sm mt-3'>Location</p>
                                        <p className='text-xs text-gray-500 mt-1'>{candidateDetails?.location?.state}, {candidateDetails?.location?.country}</p>
                                    </div>

                                </div>
                                <div className='mt-3'>
                                    <i className="fa-solid fa-envelope"></i>
                                    <label htmlFor="" className='text-xs ms-3'>{candidateDetails?.email}</label>
                                </div>
                                <div className="mt-4">
                                    <p className='font-semibold text-sm'>Quick links</p>
                                    <div className="flex gap-4 mt-2">
                                        {
                                            candidateDetails?.socialLinks?.map((socialmedia: any, index: number) => {
                                                return (
                                                    <button key={index}>
                                                        {socialmedia?.domain.includes('linkedin') && <i className={`!text-xl fa-brands fa-linkedin`}></i>}
                                                        {socialmedia?.domain.includes('facebook') && <i className={`!text-xl fa-brands fa-facebook`}></i>}
                                                        {socialmedia?.domain.includes('instagram') && <i className={`!text-xl fa-brands fa-instagram`}></i>}
                                                        {socialmedia?.domain.includes('twitter') && <i className={`!text-xl fa-brands fa-twitter`}></i>}
                                                    </button>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10 mt-5">
                            <div>
                                <div className='w-full'>
                                    <p className='font-semibold text-sm'>Experience</p>
                                    {
                                        candidateDetails?.experience?.length > 0
                                            ? <>
                                                <table className="mt-3 w-full">
                                                    <thead>
                                                        <tr className='bg-gray-300'>
                                                            <td className='text-xs p-1'>Role</td>
                                                            <td className='text-xs p-1'>From</td>
                                                            <td className='text-xs p-1'>To</td>
                                                            <td className='text-xs p-1'>Duration</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            candidateDetails?.experience.map((exp : any, index : number) => {
                                                                return(
                                                                    <tr key={index} className='border-b border-gray-300'>
                                                            <td className='p-1'>
                                                                <div className="flex gap-3">
                                                                    <div className="bg-blue-100 w-[50px] h-[50px]"></div>
                                                                    <div className=''>
                                                                        <p className='text-xs font-semibold'>{exp?.role} <span className='font-normal bg-blue-200 px-2 rounded-full ms-2'>{exp?.role?.locationType}</span></p>
                                                                        <p className='mt-3 text-xs text-gray-500'><span>{exp?.organization}</span> <span className='ms-5'><i className="fa-solid fa-location-dot !text-xs me-1"></i>{exp?.location}</span></p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='text-xs'>{exp?.startdate}</td>
                                                            <td className='text-xs'>{exp?.isPresent ? "Present" : exp?.endDate}</td>
                                                            <td className='text-xs'>2 years</td>
                                                        </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </>
                                            : <p className='text-center text-gray-400 text-sm'>No experience added</p>
                                    }
                                </div>
                                <div className='mt-5'>
                                    <p className='font-semibold text-sm'>Education</p>
                                    {
                                        candidateDetails?.education?.length > 0
                                            ? <>
                                                <div className="border-b border-gray-300 mt-2 flex items-center gap-3">
                                                    {
                                                        candidateDetails?.education?.map((edu : any, index : any) => {
                                                            return(
                                                                <>
                                                                    <div key={index} className='bg-blue-100 w-[50px] h-[50px]'></div>
                                                                    <div>
                                                                        <p className="text-xs font-bold">{edu?.stream}</p>
                                                                        <p className="text-xs text-gray-500">{edu?.level}</p>
                                                                        <p className='text-xs text-gray-500'>{edu?.organization}, {edu?.location}</p>
                                                                        <p className="text-xs text-gray-500">{edu?.startYear}-{edu?.isPresent ? "Present" : edu?.endYear}</p>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </>
                                            : <p className="text-center text-sm text-gray-400">No Education added</p>
                                    }
                                </div>
                                <div className="mt-5">
                                    <p className="font-semibold text-sm">Technical Skills</p>
                                    {
                                        candidateDetails?.skills?.length > 0
                                            ? <>
                                                <div className="flex gap-3 mt-3">
                                                    {
                                                        candidateDetails?.skills?.map((skill : any, index : number) => {
                                                            return<>{skill?.type === 'Technical-Skill' && (<span key={index} className='text-xs border border-gray-400 px-2 py-1 rounded-full'>{skill?.skill}</span>)}</>
                                                        })
                                                    }
                                                </div>
                                              </>
                                            : <p className='text-center text-sm text-gray-400'>No skills added</p>
                                    }
                                </div>
                                <div className="mt-5">
                                    <p className="font-semibold text-sm">Soft Skills</p>
                                    {
                                        candidateDetails?.skills?.length > 0
                                            ? <>
                                                <div className="flex gap-3 mt-3">
                                                    {
                                                        candidateDetails?.skills?.map((skill : any, index : number) => {
                                                            return<>{skill?.type === 'Soft-Skill' && (<span key={index} className='text-xs border border-gray-400 px-2 py-1 rounded-full'>{skill?.skill}</span>)}</>
                                                        })
                                                    }
                                                </div>
                                              </>
                                            : <p className='text-center text-sm text-gray-400'>No skills added</p>
                                    }
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Related Candidates</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <GeneralModal
            openModal={openModal}
            children={<ChatApp />}
            closeModal={modalClose}
            size='medium'
        />
        </>
    )
}