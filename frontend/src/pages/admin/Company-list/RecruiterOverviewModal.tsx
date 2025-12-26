import { Modal } from "@mui/material"
import { useState } from "react"
import { BiBlock, BiCalendar, BiEnvelope } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
import { IoCall, IoCallOutline, IoLocation } from "react-icons/io5"
import { RecruiterProfileData } from "../../../types/entityTypes"
import formatDate from "../../../services/util/formatDate"
import { FaTrashCan } from "react-icons/fa6"
import Swal from "sweetalert2"
import { blockCompanyUnblockCompany } from "../../../services/adminServices"
import { Notify } from "notiflix"

interface OverviewModalProps {
    open: boolean,
    onclose: any,
    data: RecruiterProfileData,
    setRecruiters: any,
    setSelectedRecruiter: any
}
export default function RecruiterOverviewModal({open, onclose, data, setRecruiters, setSelectedRecruiter}: OverviewModalProps){
    const [section, setSection] = useState<'overview' | 'performance' | 'contact'>('overview')

    const suspendRecruiter = (id: string) => {
        if(!id) return

        Swal.fire({
            icon: 'question',
            title: 'Suspend?',
            text: 'Are you sure?, do you want to suspend this recruiter profile',
            showConfirmButton: true,
            confirmButtonText: 'Yes, Suspend',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                const container = Swal.getContainer()
                if(container) container.style.zIndex = '2000'
            }
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result = await blockCompanyUnblockCompany(id, 'Block')
                    setRecruiters((prv: RecruiterProfileData[]) => 
                        prv.map(r => r._id === id ? {...r, isSuspended: true} : r)
                    )
                    setSelectedRecruiter((prev: RecruiterProfileData) => ({...prev, isSuspended: true}))

                    Notify.success('Recruiter suspended', {timeout: 2000})
                    onclose()
                } catch (error: unknown) {
                    Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout: 2000})
                }
            }else{
                return
            }
        })
    }

    const unSuspendRecruiter = (id: string) => {
        if(!id) return

        Swal.fire({
            icon: 'question',
            title: 'UnSuspend?',
            text: 'Are you sure?, do you want to Unsuspend this recruiter profile',
            showConfirmButton: true,
            confirmButtonText: 'Yes',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                const container = Swal.getContainer()
                if(container) container.style.zIndex = '2000'
            }
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result = await blockCompanyUnblockCompany(id, 'Unblock')
                    setRecruiters((prv: RecruiterProfileData[]) => 
                        prv.map(r => r._id === id ? {...r, isSuspended: false} : r)
                    )
                    setSelectedRecruiter((prev: RecruiterProfileData) => ({...prev, isSuspended: false}))

                    Notify.success('Recruiter unsuspended', {timeout: 2000})
                    onclose()
                } catch (error: unknown) {
                    Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout: 2000})
                }
            }else{
                return
            }
        })
    }

    return(
        <>
            <Modal
                open={open}
                onClose={onclose}
                className="flex flex-col items-center justify-center"    
            >
                <div className="bg-white p-3 outline-none rounded-md w-md md:w-lg">
                    <div className="header flex justify-between items-start">
                        <div>
                            <p className="font-medium text-xl">Recruiter Details</p>
                            <p className="text-xs text-gray">View comprehencive information about this recruiter</p>
                        </div>
                        <button onClick={onclose}>
                            <CgClose />
                        </button>
                    </div>
                    <div id="section-seperator" className="bg-gray-200 mt-3 rounded-full p-1 flex gap-3 justify-between">
                        <button onClick={() => setSection('overview')} className={`flex-1 text-sm rounded-full ${section === 'overview' ? 'bg-white' : ''}`}>Overview</button>
                        <button onClick={() => setSection('performance')} className={`flex-1 text-sm rounded-full ${section === 'performance' ? 'bg-white' : ''}`}>Performance</button>
                        <button onClick={() => setSection('contact')} className={`flex-1 text-sm rounded-full ${section === 'contact' ? 'bg-white' : ''}`}>Contact Info</button>
                    </div>
                    <div className="body mt-5">
                        {
                            section === 'overview' && (
                                <>
                                <div className="flex items-center gap-3 border-b border-gray-300 py-3">
                                    <div className="bg-blue-100 text-blue-500 w-13 h-13 flex justify-center items-center rounded-full">{data.userProfile.name[0]}</div>
                                    <div>
                                        <p className="text-sm">{data.userProfile.name}</p>
                                        <p className="text-xs text-gray-500">{data.userProfile.email}</p>
                                    </div>
                                </div>
                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-gray-500 text-sm font-light">Employer Type</p>
                                        <p className="mt-1">{data.employerType}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm font-light">Status</p>
                                        <p className={`mt-1 ${data.isDeleted ? 'text-gray-500' : data.isSuspended ? 'text-red-500' : 'text-green-500'}`}>
                                            {data.isDeleted ? 'Closed' : data.isSuspended ? 'Suspended' : 'Active'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm font-light">Business</p>
                                        <p className="mt-1">
                                            {
                                                data.employerType === 'self'
                                                    ? "NA"
                                                    : data.organizationDetails?.organizationName
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm font-light">Profile creation date</p>
                                        <p className="mt-1">{formatDate(data.createdAt)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm font-light">Recruiting Focus</p>
                                        <div className="flex flex-wrap mt-1">
                                            {
                                                data.focusingIndustries?.map((industries: string, index: number) => (
                                                    <p key={index} className="text-xs text-blue-500">{industries}, </p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm font-light">Recruiting Experience</p>
                                        <p className="mt-1">{data.recruitingExperience}</p>
                                    </div>
                                </div>
                                </>
                            )
                        }

                        {
                            section === 'performance' && (
                                <>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="border bg-violet-100 border-violet-500 rounded-md p-5">
                                            <p className="font-light text-violet-500">Total Jobs</p>
                                            <p className="mt-2 text-violet-500 font-medium text-lg">0</p>
                                        </div>
                                        <div className="border border-green-500 bg-green-100 rounded-md p-5">
                                            <p className="font-light text-green-500">Active Jobs</p>
                                            <p className="mt-2 font-medium text-green-500 text-lg">0</p>
                                        </div>
                                        <div className="border border-orange-500 bg-orange-50 rounded-md p-5">
                                            <p className="font-light text-orange-500">Totla Hires</p>
                                            <p className="mt-2 font-medium text-orange-500 text-lg">0</p>
                                        </div>
                                        <div className="border border-blue-500 bg-blue-50 rounded-md p-5">
                                            <p className="font-light text-blue-500">Average Job Views</p>
                                            <p className="mt-2 font-medium text-lg text-blue-500">0</p>
                                        </div>
                                    </div>
                                    <div className="my-3">
                                        <div className="flex justify-between">
                                            <p className="text-xs text-gray-500">Hiring Rate</p>
                                            <p className="text-xs text-gray-500">70%</p>
                                        </div>
                                        <div className="w-full bg-gray-300 mt-1">
                                            <div className="bg-blue-500 w-[70%] p-1 rounded-full"></div>
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        {
                            section === 'contact' && (
                                <>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="border border-gray-300 p-3 flex items-center gap-2 rounded-md">
                                            <IoCallOutline color="gray" />
                                            <div>
                                                <p className="text-gray-500 text-xs">Phone</p>
                                                <p className="text-sm font-light mt-1">{data.userProfile.phone}</p>
                                            </div>
                                        </div>

                                        <div className="border border-gray-300 p-3 flex items-center gap-2 rounded-md">
                                            <BiEnvelope color="gray" />
                                            <div>
                                                <p className="text-gray-500 text-xs">Email</p>
                                                <p className="text-sm font-light mt-1">{data.userProfile.email}</p>
                                            </div>
                                        </div>

                                        <div className="border border-gray-300 p-3 flex items-center gap-2 rounded-md">
                                            <IoLocation color="gray" />
                                            <div>
                                                <p className="text-gray-500 text-xs">Location</p>
                                                <p className="text-sm font-light mt-1">{data.userProfile.location?.state}, {data.userProfile.location?.country}</p>
                                            </div>
                                        </div>

                                        <div className="border border-gray-300 p-3 flex items-center gap-2 rounded-md">
                                            <BiCalendar color="gray" />
                                            <div>
                                                <p className="text-gray-500 text-xs">Joined</p>
                                                <p className="text-sm font-light mt-1">{formatDate(data.userProfile.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        <div className="footer mt-8">
                            <div className="w-full flex justify-between gap-3">
                                <button onClick={onclose} className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-800">Close</button>
                                <div className="flex gap-2">
                                    <button className="rounded-md px-3 py-1 bg-blue-600 text-white text-xs">Send Message</button>
                                    {
                                        data.isSuspended ? (
                                            <button onClick={() => unSuspendRecruiter(data._id)} className="flex items-center gap-2 border border-green-500 rounded-md text-xs text-green-500 px-2">
                                                <BiBlock />
                                                Unsuspend
                                            </button>
                                        ) : (
                                            <button onClick={() => suspendRecruiter(data._id)} className="flex items-center gap-2 border border-red-500 rounded-md text-xs text-red-500 px-2">
                                                <BiBlock />
                                                Suspend
                                            </button>
                                        )
                                    }
                                    <button onClick={() => suspendRecruiter(data._id)} className="flex gap-2 items-center text-xs bg-red-500 rounded-md text-white px-2">
                                        <FaTrashCan />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}