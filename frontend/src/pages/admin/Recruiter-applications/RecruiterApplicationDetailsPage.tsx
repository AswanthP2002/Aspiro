import { useEffect, useState } from "react"
import { RecruiterProfileData } from "../../../types/entityTypes"
import { useLocation, useNavigate } from "react-router-dom"
import { FaArrowLeft, FaFile, FaGlobe, FaLinkedin } from "react-icons/fa"
import { BsCheckCircle, BsClock } from "react-icons/bs"
import formatDate from "../../../services/util/formatDate"
import { LuUser } from "react-icons/lu"
import { CiFileOn } from "react-icons/ci"
import { FaRegCircleXmark } from "react-icons/fa6"
import Swal from "sweetalert2";
import { approveRecruiterApplication, rejectRecruiterApplication } from "../../../services/adminServices"
import { Notify } from "notiflix"

export default function RecruiterApplicationDetailsPage(){

    const navigate = useNavigate()

    const [applicationDetails, setApplicationDetails] = useState<RecruiterProfileData | null | undefined>(null)
    
    const location = useLocation()


    useEffect(() => {
        setApplicationDetails(location.state.applicationDetails || {})
    }, [])

    const handleRejectApplication = async () => {
        const { value: reason, isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: "You are about to reject this application.",
            icon: 'warning',
            input: 'textarea',
            inputLabel: 'Reason for Rejection',
            inputPlaceholder: 'Please provide a reason for rejecting this application...',
            inputAttributes: {
                'aria-label': 'Type your reason here'
            },
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reject it!',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to provide a reason for rejection!'
                }
            }
        });
    
        if (isConfirmed && reason) {
            try {
                // Here you would call your service to reject the application
                const result = await rejectRecruiterApplication(applicationDetails?._id as string, reason)
                console.log('Application rejected with reason:', reason);
                // You can also show a success message
                Swal.fire('Rejected!', 'The application has been rejected.', 'success');
                setApplicationDetails((prv: RecruiterProfileData | null | undefined) => {
                    if(!prv){
                        return null
                    }

                    return {
                        ...prv,
                        profileStatus:'rejected'
                    }
                })
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:3000})
            }
        }
    }

    const handleApproveApplication = async () => {
        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to approve this recruiter application?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!'
        });

        if (isConfirmed) {
            try {
                const result = await approveRecruiterApplication(applicationDetails?._id as string);
                if (result?.success) {
                    Swal.fire('Approved!', 'The application has been approved.', 'success');
                    setApplicationDetails((prev: RecruiterProfileData | null | undefined) => {
                        if (!prev) return null;
                        return { ...prev, profileStatus: 'approved' };
                    });
                } else {
                    Notify.failure(result?.message || 'Approval failed', { timeout: 3000 });
                }
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong', { timeout: 3000 });
            }
        }
    }

    return(
        <div className="w-full min-h-screen flex items-center jusityf-center flex-col">
            <div className="w-md md:w-lg lg:w-xl mt-10 mb-10">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500">
                    <p>Back</p>
                    <FaArrowLeft />
                </button>
                <div className="bg-white border border-gray-200 rounded-md mt-5">
                    <div className="w-full p-3 border-b border-gray-200">
                        <p className="text-lg font-light">Application Details</p>
                        <p className="mt-1 text-xs text-gray-500">Review and manage application</p>
                    </div>
                    <div className="p-3">
                        <div className="flex items-center gap-5">
                            {
                                applicationDetails?.profileStatus === 'pending' && (
                                    <span className="bg-orange-100 px-3 py-1 rounded-md flex items-center gap-2">
                                <BsClock color="orange" />
                                <p className="text-xs text-orange-500">{applicationDetails?.profileStatus}</p>
                            </span>
                                )
                            }
                            {
                                applicationDetails?.profileStatus === 'approved' && (
                                    <span className="bg-green-100 px-3 py-1 rounded-md flex items-center gap-2">
                                <BsClock color="green" />
                                <p className="text-xs text-green-500">{applicationDetails?.profileStatus}</p>
                            </span>
                                )
                            }
                            {
                                applicationDetails?.profileStatus === 'rejected' && (
                                    <span className="bg-red-100 px-3 py-1 rounded-md flex items-center gap-2">
                                <BsClock color="red" />
                                <p className="text-xs text-red-500">{applicationDetails?.profileStatus}</p>
                            </span>
                                )
                            }
                            <p className="text-xs text-gray-500">Submitted on {formatDate(applicationDetails?.createdAt)}</p>
                        </div>
                        <div className="mt-3">
                            <div className="flex items-center gap-2">
                                <LuUser color="blue" />
                                <p className="text-sm font-light">Personal Information</p>
                            </div>
                            <div className="mt-3 bg-gray-100 rounded-md p-3 grid grid-cols-2 gap-5">
                                <div>
                                    <p className="text-xs text-gray-500">Full Name</p>
                                    <p className="text-sm mt-1">{applicationDetails?.userProfile?.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Contact Number</p>
                                    <p className="text-sm mt-1">{applicationDetails?.userProfile?.phone}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Contact Email</p>
                                    <p className="text-sm mt-1">{applicationDetails?.userProfile?.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="flex items-center gap-2">
                                <LuUser color="blue" />
                                <p className="text-sm font-light">Professional Information</p>
                            </div>
                            {
                                applicationDetails?.employerType === 'selft' && (
                                    <div className="mt-3 bg-gray-100 rounded-md p-3 grid grid-cols-2 gap-5">
                                <div>
                                    <p className="text-xs text-gray-500">Employer Type</p>
                                    <p className="text-sm mt-1">{applicationDetails?.employerType}</p>
                                </div>
                            </div>
                                )
                            }
                            {
                                applicationDetails?.employerType === 'company' && (
                                    <div className="mt-3 bg-gray-100 rounded-md p-3 grid grid-cols-2 gap-5">
                                <div>
                                    <p className="text-xs text-gray-500">Employer Type</p>
                                    <p className="text-sm mt-1">{applicationDetails?.employerType}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Business Name</p>
                                    <p className="text-sm mt-1">{applicationDetails?.organizationDetails?.organizationName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Industry</p>
                                    <p className="text-sm mt-1">{applicationDetails?.organizationDetails?.industry}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Recruting Experience</p>
                                    <p className="text-sm mt-1">{applicationDetails?.recruitingExperience}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 flex items-center gap-2"><FaLinkedin /> Linkedin</p>
                                    <a className="text-blue-500 text-sm" href={applicationDetails?.organizationDetails?.linkedinUrl}>View Profile</a>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 flex items-center gap-2"><FaGlobe /> Website</p>
                                    <a className="text-blue-500 text-sm" href={applicationDetails?.organizationDetails?.website}>Go to Website</a>
                                </div>
                            </div>
                                )
                            }
                        </div>

                         <div className="mt-3">
                            <div className="flex items-center gap-2">
                                <CiFileOn color="blue" />
                                <p className="text-sm font-light">Summary</p>
                            </div>
                            <div className="mt-3 bg-gray-100 rounded-md p-3 ">
                                <p className="text-xs leading-relaxed">{applicationDetails?.summary}</p>
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="text-sm font-light">Industry Focus</p>
                            <div className="flex gap-1 flex-wrap mt-3">
                                {
                                    applicationDetails?.focusingIndustries?.map((industry: string, index: number) => (
                                        <span key={index} className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-md">{industry}</span>

                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="footer p-3 border-t border-gray-200">
                        <div className="p-3 flex items-center">
                            <div>
                                <button onClick={() => navigate(-1)} className="border border-gray-300 text-sm font-light px-3 py-1 rounded-md">Close</button>
                            </div>
                            <div className="flex-1 flex justify-end gap-3">
                                {
                                    applicationDetails?.profileStatus === 'pending' && (
                                        <button onClick={handleRejectApplication} className="text-xs flex items-center gap-2 py-2 bg-red-500 text-white rounded-md px-2">
                                            <FaRegCircleXmark />
                                            Reject Application
                                        </button>
                                    )
                                }
                                {
                                    applicationDetails?.profileStatus === 'pending' && (
                                        <button onClick={handleApproveApplication} className="text-xs bg-green-500 text-white rounded-md px-2 py-2 flex items-center gap-2 py-2">
                                    <BsCheckCircle />
                                    Approve Application
                                </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}