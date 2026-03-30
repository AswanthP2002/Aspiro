import { useCallback, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { getUserDetails } from "../../../services/userServices"
import { userBlock, userUnblock, deleteUser, banUser } from "../../../services/userServices"
import { resetUserPassword, requestReset,  } from "../../../services/adminServices"
import { AdminUserDetailsData, Education, Experience, Skills } from "../../../types/entityTypes"
import { Notify } from "notiflix"
import { FaArrowLeft, FaLinkedin, FaInstagram, FaTwitter, FaGithub} from "react-icons/fa"
import { LuUser } from "react-icons/lu"
import { CgClose} from "react-icons/cg"
import { formattedDateMoment } from "../../../services/util/formatDate"
import { Button, Modal, ModalProps } from "@mui/material"
import { BiEnvelope } from "react-icons/bi"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { AxiosError } from "axios"


export default function CandidateDetails(){

    const navigate = useNavigate()

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
    
    const [userDetails, setUserDetails] = useState<AdminUserDetailsData | null>(null)
    const [experiences, setexperience] = useState<Experience[]>([])
    const [education, setEducation] = useState<Education[]>([])
    const [skills, setskills] = useState<Skills[]>([])
    const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState<boolean>(false)

    const openPasswordResetModal = () => setIsPasswordResetModalOpen(true)
    const closePasswordResetModal = () => setIsPasswordResetModalOpen(false)

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
                    toast.error(error instanceof Error ? error.message : 'Something went wrong')
                }
        }
       fetchCandidateDetails()
    }, [])

    async function deleteSingleUser(userId: string){
        Swal.fire({
            icon:'warning',
            title:'Delete?',
            text:'Are you sure to delete this user',
            showConfirmButton:true,
            confirmButtonText:'Delete',
            showCancelButton:true,
            allowOutsideClick:false,
            allowEscapeKey:false,
            allowEnterKey:false
        }).then(async (result) => {
            if(result?.isConfirmed){
                const deleteResult = await toast.promise(
                    deleteUser(userId),
                    {
                        pending: 'Deleting User...',
                        success: 'User Deleted',
                        error:{
                            render(props) {
                                const data = props.data as AxiosError<{message: string}>
                                return data.message
                            },
                        }
                    }
                )

                if(!deleteResult?.success){
                    toast.error('Can not delete user now')
                }else{
                    setTimeout(() => {
                        navigate('/admin/users')
                    }, 1600)
                }
            }
        })
    }

    const bloackUser = async (userId: string) => {
        if(!userId) return
    
        Swal.fire({
          icon: 'warning',
          title: 'Block ?',
          text: 'Are you sure, you want to block this user ?',
          showConfirmButton: true, 
          confirmButtonText: 'Block',
          showCancelButton: true,
          cancelButtonText: 'No',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(async (response) => {
          if(response.isConfirmed){
            try {
          await userBlock(userId)
          toast.success('User blocked Successfully')
          setUserDetails((userData: AdminUserDetailsData | null) => {
            if(!userData) return null
            return {
                ...userData,
                isBlocked: true
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

    const unblockUser = async (id: string) => {
        if(!id) return
    
        Swal.fire({
          icon:'warning',
          title: 'Unblock ?',
          text: 'Are you sure, you want to unblock this user ?',
          showConfirmButton: true, 
          confirmButtonText: 'Unblock',
          showCancelButton: true,
          cancelButtonText: 'No',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(async (response) => {
          if(response.isConfirmed){
            try {
          const result = await userUnblock(id)
          console.log('-- checking result from backend after unsuspending--', result.result)
          toast.success('User unblocked succesfully')
          setUserDetails((data: AdminUserDetailsData | null) => {
            if(!data) return null
            return {
                ...data,
                isBlocked: false
            }
          })
        } catch (error: unknown) {
          toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
          }else {
            return
          }
        })
    }

    const banUserPermanently = async (userId: string) => {
        if(!userId) return
    
        Swal.fire({
          icon: 'warning',
          title: 'Ban ?',
          text: 'Are you sure, you want to ban this user permanently?. This action can not be undone',
          showConfirmButton: true, 
          confirmButtonText: 'Ban',
          showCancelButton: true,
          cancelButtonText: 'No',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(async (response) => {
          if(response.isConfirmed){
            try {
          const result = await banUser(userId)
          toast.success(result.message)
          setUserDetails((data: AdminUserDetailsData | null) => {
            if(!data) return null
            return {
                ...data,
                isBanned: true
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

    return(
        <>
        <div className="w-full min-h-screen p-5 lg:p-10">
            <div className="w-full">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-light text-gray-700 hover:bg-gray-200 rounded-md !p-2">
                    <FaArrowLeft />
                    Back to users
                </button>

                {/* Profile card */}
                <section>
                    <p className="text-lg">User Management</p>
                    <p className="text-xs mt-1">Detailed user information and account management</p>

                    <div className="grid grid-cols-12 gap-5 mt-5">
                        <div className="col-span-12 lg:col-span-8 space-y-5">
                            <div className="border border-gray-200 rounded-md bg-white p-5">
                                <div className="flex justify-between">
                                    <div className="flex gap-2">
                                        {userDetails?.profilePicture?.cloudinarySecureUrl
                                            ? <div className="w-18 h-18 rounded-full border border-slate-300 p-1">
                                                <img className="h-full w-full rounded-full object-cover" src={userDetails.profilePicture.cloudinarySecureUrl} alt="" />
                                              </div>
                                            : <div className="w-15 h-15 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                                                <p className="text-white text-xl">S</p>
                                              </div>
                                        }
                                        <div>
                                            <p className="font-semibold">{userDetails?.name}</p>
                                            <p className="text-xs">{userDetails?.email}</p>
                                            <p className="text-xs font-light mt-2">Joined {formattedDateMoment(userDetails?.createdAt, "MMM DD YYYY")}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-xs bg-blue-200 text-blue-500 px-2 py-1 rounded-md border border-blue-300">{userDetails?.role[0]}</span>
                                        {userDetails?.role && userDetails.role.length > 1 && (
                                            <span className="block text-xs bg-blue-200 text-blue-500 px-2 py-1 rounded-md border border-blue-300">{userDetails?.role[1]}</span>
                                        )}
                                        {userDetails?.isBanned && (<span className="block text-xs bg-red-200 text-red-500 px-2 py-1 rounded-md border border-red-300">Banned</span>)}
                                        {userDetails?.isBlocked && (<span className="block text-xs bg-orange-200 text-orange-500 px-2 py-1 rounded-md border border-orange-300">Suspended</span>)}
                                        {!userDetails?.isBlocked && (<span className="block text-xs bg-green-200 text-green-500 px-2 py-1 rounded-md border border-green-300">Active</span>)}
                                    </div>
                                    
                                </div>
                                <div className="mt-5">
                                    <p className="text-xs leading-relaxed">{userDetails?.summary}</p>
                                </div>
                            </div>
                            {userDetails?.educations && userDetails.educations.length > 0 && (
                                <div className="bg-white p-5 rounded-md border border-gray-200">
                                <p className="font-semibold">Educations</p>
                                <div className="mt-5 space-y-2">
                                    {
                                        userDetails.educations.map((education: Education) => (
                                            <div className="border-l-3 border-blue-500 px-2 py-1">
                                        <p className="text-sm font-medium">{education.educationStream}</p>
                                        <p className="text-xs text-gray-700">{education.institution}</p>
                                        <div className="mt-2 text-xs text-gray-500">{education.startYear} - {education.endYear}</div>
                                    </div>
                                        ))
                                    }
                                </div>
                                </div>
                            )}
                            {userDetails?.experiences && userDetails.experiences.length > 0 && (
                                <div className="bg-white p-5 rounded-md border border-gray-200">
                                <p className="font-semibold">Experiences</p>
                                <div className="mt-5 space-y-2">
                                    {userDetails.experiences.map((experience: Experience) => (
                                        <div className="border-l-3 border-blue-500 px-2 py-1">
                                        <p className="text-sm font-medium">{experience.jobRole}</p>
                                        <p className="text-xs text-gray-700">{experience.jobType}</p>
                                        <p className="text-xs text-gray-700">{experience.organization} | {experience.location}</p>
                                        <div className="mt-2 text-xs text-gray-500">{formattedDateMoment(experience.startDate as string, "MMM DD YYYY")} - {experience.isPresent ? "Present" : formattedDateMoment(experience.endDate, "MMM DD YYYY")}</div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                            )}
                            <div className="bg-white p-5 rounded-md border border-gray-200">
                                <p className="font-semibold">Technical Skills</p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {userDetails?.skills.map((skill: Skills) => {
                                            return <span className="bg-gray-200 text-gray-500 px-2 py-1 text-xs rounded-md">{skill.skill}</span>
                                    })}
                                </div>
                                <p className="font-semibold mt-5">Soft Skills</p>
                                <div className="mt-5">
                                    {/* <span className="bg-gray-200 text-gray-500 px-2 py-1 text-xs rounded-md">MongoDB</span> */}
                                </div>
                            </div>
                            {userDetails?.posts && userDetails.posts.length > 0 && (
                                <div className="bg-white p-5 rounded-md border border-gray-200">
                                <p className="font-semibold">Posts</p>
                                <div className="mt-5">
                                    <div className="border border-gray-300 bg-gray-100 p-3 rounded-md">
                                        <p className="mb-2 text-xs font-medium">Exited to share about my new achivement</p>
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-xs font-light text-gray-500">2 days ago</p>
                                            </div>
                                            <div className="flex gap-3 text-xs text-gray-500">
                                                <p>45 likes</p>
                                                <p>12 comments</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                        <div className="col-span-12 lg:col-span-4 space-y-5">
                            <div className="bg-white p-5 rounded-md border border-gray-200">
                                <p className="font-semibold">Account Actions</p>
                                <div className="mt-3 space-y-2">
                                    <button disabled={userDetails?.googleId ? true : false} onClick={openPasswordResetModal} className={`${userDetails?.googleId ? "bg-gray-300" : "bg-blue-500"} block w-full rounded-md py-2 text-sm ${userDetails?.googleId ? "text-gray-400" : "text-white"}`}>Reset Password</button>
                                    {userDetails?.isBlocked
                                        ? <button onClick={() => unblockUser(userDetails._id as string)} className="bg-orange-500 block w-full rounded-md py-2 text-sm text-white">Unsuspend Account</button>
                                        : <button onClick={() => bloackUser(userDetails?._id as string)} className="bg-orange-500 block w-full rounded-md py-2 text-sm text-white">Suspend Account</button>
                                    }
                                    {!userDetails?.isBanned && (<button onClick={() => banUserPermanently(userDetails?._id as string)} className="bg-red-500 block w-full rounded-md py-2 text-sm text-white">Permanent Ban</button>)}
                                </div>
                                <div className="border border-gray-200 w-full mt-3 mb-2"></div>
                                <button onClick={() => deleteSingleUser(userDetails?._id as string)} className="bg-white border border-red-500 w-full py-2 text-sm text-red-500 rounded-md">Delete User</button>
                                <div className="border border-gray-200 w-full mt-3 mb-2"></div>
                                <div className="mt-2">
                                    <p className="font-medium text-gray-500">Security Status</p>
                                    <ul className="mt-2 space-y-2">
                                        <li className="flex justify-between text-xs">
                                            <p>Email Status</p>
                                            <p className="text-green-500">Verified</p>
                                        </li>
                                        <li className="flex justify-between text-xs">
                                            <p>Last Login</p>
                                            <p className="">{formattedDateMoment(new Date(), "MMM DD YYYY")}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-md border border-slate-200">
                                <p className="font-semibold">Account action History</p>
                                {userDetails?.accountActions && userDetails?.accountActions?.length > 0 
                                    ? <>
                                        <div className="grid grid-cols-1 gap-2 mt-5">
                                            {userDetails.accountActions.map((history: {action: string, actor: string, date: string}, index: number) => (
                                                <div className={`${history.action === 'Blocked' ? "bg-red-500" : (history.action === 'Un blocked' ? "bg-green-500" : "bg-blue-500")} ps-1 rounded-md`}>
                                                    <div className={`flex gap-2 p-2 rounded-md ${history.action === 'Blocked' ? "bg-red-100" : (history.action === 'Un blocked' ? "bg-green-100" : "bg-blue-100")}`}>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-semibold">{history.action}</p>
                                                        <p className="text-sm mt-2">Acted by : <span className="font-semibold">{history.actor}</span></p>
                                                    </div>
                                                    <div className="flex items-end text-xs text-gray-700">
                                                        <p>{formattedDateMoment(history.date, "MMM DD YYYY")}</p>
                                                    </div>
                                                </div>
                                                </div>
                                            ))}
                                        </div>
                                      </>
                                    : <>
                                        <p className="text-xs text-center italic text-gray-500 mt-5">No history available</p>
                                      </>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        {/* Password reset modal */}
        {isPasswordResetModalOpen && (<PasswordResetModal data={userDetails} openModal={isPasswordResetModalOpen} closeModal={closePasswordResetModal} />)}
        </>
    )
}

export const PasswordResetModal = ({data, openModal, closeModal}: {data: any, openModal: boolean, closeModal: () => void}) => {
    type PasswordResetFormInputs = {
        newPassword: string,
        confirmPasswor: string
    }
    console.log('--data from the child component--', data)
    const {watch, handleSubmit, formState:{errors}, control} = useForm<PasswordResetFormInputs>({defaultValues: {newPassword: "", confirmPasswor: ""}})
    
    const [userDetails, setUserDetails] = useState<AdminUserDetailsData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [token, setToken] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [isCodeSend, setIsCodeSend] = useState<boolean>(false)

    const handleModalClose: ModalProps['onClose'] = (event, reason) => {
        if(reason === 'backdropClick' || reason === 'escapeKeyDown'){
            return
        }

        closeModal()
    }

    const requestAReset = async (action: 'request' | 'send') => {
        if(action === 'request'){
            Swal.fire({
            icon:'question',
            title: "Request Password Reset ?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Continue",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                const container = Swal.getContainer()
                if(container){
                    container.style.zIndex = '2000'
                }
            }
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    setLoading(true)
                    const result = await requestReset(userDetails?.email as string)
                    if(result.success){
                        setIsCodeSend(true)
                        setToken(result.result.token)
                    }

                } catch (error: unknown) {
                    Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
                } finally {
                    setLoading(false)
                }
            }else {
                return
            }
        })
        }else if(action === 'send'){
            try {
                setLoading(true)
                const result = await resetUserPassword(code, token, userDetails?._id as string, userDetails?.email as string)
                if(!result.success){
                    Notify.failure(result.message)
                    return
                }
                Notify.success("Password reset link send to user")
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
            } finally {
                setLoading(false)
                setToken("")
                setCode("")
                setIsCodeSend(false)
                closeModal()
            }
        }else {
            return
        }
    }
    
    useEffect(() => {
        if(data){
            setUserDetails(data)
        }
    }, [data])

    const logedAdmin = useSelector((state: any) => {
        return state.userAuth.user
    })
    
    return(
        <>
            <Modal  className="flex items-center justify-center" open={openModal} onClose={handleModalClose}>
                <div className="bg-white p-5 rounded-md w-md">
                    <div className="flex justify-between">
                        <p>Reset Password</p>
                        <button onClick={closeModal}><CgClose /></button>
                    </div>
                    <div className="mt-5 bg-blue-200 p-3 rounded-md flex gap-2">
                        <div className="rounded-full flex justify-center items-center w-15 h-15 border border-blue-500 bg-blue-300">
                            <p className="text-xl font-semibold text-gray-700">{userDetails?.name[0]}</p>
                        </div>
                        <div>
                            <p>{data.name}</p>
                            <span className="flex items-center gap-2 text-xs mt-2"><BiEnvelope /> <p>{userDetails?.email}</p></span>
                            <span className="flex items-center gap-2 text-xs"><LuUser /> <p>User ID: {userDetails?._id}</p></span>
                        </div>
                    </div>
                    <div className="my-3">
                        <p className="text-xs leading-relaxed text-start text-red-700">This action will generate a secure verification code. Once you enter the code, 
                            a password reset link will be emailed to {logedAdmin.email}. The user's current password 
                            will remain active until they complete the reset process Continue. Do you want to continue ?</p>
                        {
                            isCodeSend && (
                                <div className="my-2 w-full">
                                <p className="text-xs text-gray-700 text-center mb-2 !mt-2">Check your email for the code. The code will expire after 5 minutes</p>
                                <input value={code} onChange={(e) => setCode(e.target.value)} type="number" className="border border-gray-200 rounded-md w-full p-3" placeholder="Enter 6 digit code" />
                                <Button onClick={() => requestAReset("send")} variant="contained" fullWidth loading={loading} className="!mt-5">SEND RESET LINK</Button>
                                </div>
                            )
                        }
                        {!isCodeSend && (<Button onClick={() => requestAReset("request")} variant="contained" fullWidth loading={loading} className="!mt-5">PROCEED</Button>)}
                    </div>
                    
                </div>
            </Modal>
        </>
    )
}