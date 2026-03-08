import { BsArrowLeft } from "react-icons/bs";
import { LuCalendar, LuCheck, LuCircleX, LuFileUser } from "react-icons/lu";
import { formatRelativeTime, formattedDateMoment } from "../../../services/util/formatDate";
import { FaClock } from "react-icons/fa";
import { useState } from "react";
import { BiVideo } from "react-icons/bi";
import { Button, FormControl, FormHelperText, Modal, Switch } from "@mui/material";
import { CiWarning } from "react-icons/ci";
import { FaXmark } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import { Notify } from "notiflix";

export default function ApplicationTrack(){

    const [activeSection, setActiveSection] = useState<'notes' | 'interviews'>('notes')
    const [status, setStatus] = useState<'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'>('rejected')
    const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false)

    return(
        <>
        <div className="px-5 py-15 ">
            <button className="text-xs flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
                <BsArrowLeft color="gray" />
                <p className="font-medium text-gray-500">Back</p>
            </button>
            <div className="w-full flex flex-col items-center mt-5">
                <div className="w-15 h-15 bg-blue-500 flex items-center justify-center rounded-full">
                    <LuFileUser color="white" size={25} />
                </div>
                <p className="font-semibold mt-5">Track your application for the job</p>
                <p className="text-center text-xs text-gray-500 mt-2">Monitory your job application for the role <span className="text-sm font-medium text-gray-700">{"Senior Accountant"}</span></p>
                <div className="mt-5 rounded-md bg-white p-5 w-md lg:w-2xl lg:p-10 border border-slate-300 ring-1 ring-blue-500" style={{backgroundColor: 'white'}}>
                    <div className="flex justify-between">
                        <span className="bg-blue-200 text-blue-700 text-xs font-medium h-fit px-3 rounded-md">{status}</span>
                        <div>
                            <p className="text-xs text-gray-500">Applied on</p>
                            <div className="flex gap-2 items-center">
                                <FaClock size={12} color="gray" />
                                <p className="font-medium text-xs">{formatRelativeTime(new Date())}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="font-semibold text-sm">React Native Developer</p>
                        <p className="text-xs text-gray-500 mt-1">Aquila | Posted by Aswanth P</p>
                        <div className="mt-5 grid grid-cols-1 gap-5 bg-white">
                            <div className="flex gap-3">
                                <div className="">
                                    <div className={`w-8 h-8 ${status === 'applied' ? "bg-green-500 text-white" : "bg-green-500 text-white"} rounded-full flex items-center justify-center`}><LuCheck /></div>
                                    <div className={`w-1 ${status === 'applied' ? "bg-gray-300" : "bg-green-500"} h-full m-auto`}></div>
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Application submitted</p>
                                    <p className="text-xs text-gray-700">Your application has been send to the recruiter</p>
                                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                        <FaClock />
                                        <p>{formatRelativeTime(new Date())}</p>
                                    </p>
                                </div>
                            </div> 

                            <div className="flex gap-3">
                                <div className="">
                                    <div className={`w-8 h-8 ${status === 'screening' ? "bg-blue-200" : (status === 'applied' ? "bg-gray-300" : ((status === 'offer' || status === 'interview' || status === 'hired' || status === 'rejected') ? "bg-green-500" : "bg-gray-300"))} rounded-full flex items-center justify-center`}>
                                        {status === 'screening'
                                            ? <FaClock color="blue" />
                                            : (status === 'applied' ? <FaClock color="gray" /> : <LuCheck color="white" />)
                                        }
                                    </div>
                                    <div className={`w-1 ${status === 'screening' ? "bg-gray-300" : ((status === 'interview' || status === 'offer' || status === 'rejected' || status === 'hired') ? "bg-green-500" : "bg-gray-300")} h-full m-auto`}></div>
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Screening</p>
                                    <p className="text-xs text-gray-700">Your application moved for screening</p>
                                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                        <FaClock />
                                        {(status === 'screening' || status === 'interview' || status === 'offer' || status === 'hired' || status === 'rejected')
                                            ? <p>{formatRelativeTime(new Date())}</p>
                                            : <p>Expected by 1 day</p>
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="">
                                    <div className={`w-8 h-8 ${status === 'interview' ? "bg-blue-200" : ((status === 'applied' || status === 'screening') ? "bg-gray-300" : ((status === 'offer' || status === 'hired' || status === 'rejected') ? "bg-green-500" : "bg-gray-300"))} rounded-full flex items-center justify-center`}>
                                        {status === 'interview'
                                            ? <FaClock color="blue" />
                                            : ((status === 'applied' || status === 'screening') ? <FaClock color="gray" /> : <LuCheck color="white" />)
                                        }
                                    </div>
                                    <div className={`w-1 ${status === 'interview' ? "bg-gray-300" : ((status === 'offer' || status === 'hired' || status === 'rejected') ? "bg-green-500" : "bg-gray-300")} h-full m-auto`}></div>
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Interview</p>
                                    <p className="text-xs text-gray-700">Interview scheduled with the candidate</p>
                                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                        <FaClock />
                                        {(status === 'interview' || status === 'offer' || status === 'hired' || status === 'rejected')
                                            ? <p>{formatRelativeTime(new Date())}</p>
                                            : <p>Expected by 1 day</p>
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="">
                                    <div className={`w-8 h-8 ${status === 'offer' ? "bg-blue-200" : ((status === 'applied' || status === 'screening' || status === 'interview') ? "bg-gray-300" : ((status === 'hired' || status === 'rejected') ? "bg-green-500" : "bg-gray-300"))} rounded-full flex items-center justify-center`}>
                                        {status === 'offer'
                                            ? <FaClock color="blue" />
                                            : ((status === 'applied' || status === 'screening' || status === 'interview') ? <FaClock color="gray" /> : <LuCheck color="white" />)
                                        }
                                    </div>
                                    <div className={`w-1 ${status === 'offer' ? "bg-gray-300" : ((status === 'hired' || status === 'rejected') ? "bg-green-500" : "bg-gray-300")} h-full m-auto`}></div>
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Offer</p>
                                    <p className="text-xs text-gray-700">Offer has been send to the candidate</p>
                                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                        <FaClock />
                                        {(status === 'offer' || status === 'hired' || status === 'rejected')
                                            ? <p>{formatRelativeTime(new Date())}</p>
                                            : <p>Expected by 1 day</p>
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* <div className="flex gap-3">
                                <div className="">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"><LuCheck color="gray" /></div>
                                    <div className="w-1 bg-gray-300 h-full m-auto"></div>
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Application submitted</p>
                                    <p className="text-xs text-gray-700">Your application has been send to the recruiter</p>
                                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                        <FaClock />
                                        <p>{formatRelativeTime(new Date())}</p>
                                    </p>
                                </div>
                            </div> */}

                            <div className="flex gap-3">
                                <div className="">
                                    <div className={`w-8 h-8 ${status === 'hired' ? "bg-green-500" : ((status === 'applied' || status === 'screening' || status === 'interview' || status === 'offer') ? "bg-gray-300" : ((status === 'rejected') ? "bg-red-500" : "bg-gray-300"))} rounded-full flex items-center justify-center`}>
                                        {status === 'hired'
                                            ? <LuCheck color="white" />
                                            : ((status === 'applied' || status === 'screening' || status === 'interview' || status === 'offer') ? <FaClock color="gray" /> : (status === "rejected" ? <LuCircleX color="white" /> : <LuCheck />))
                                        }
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{status === 'hired' ? "Hired" : (status === 'rejected' ? "Rejected" : "Final Decision")}</p>
                                    <p className="text-xs text-gray-700">Application finalized</p>
                                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                        <FaClock />
                                        {(status === 'hired' || status === 'rejected')
                                            ? <p>{formatRelativeTime(new Date())}</p>
                                            : <p>Expected by 1 day</p>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border border-slate-200 w-full mt-5"></div>
                    <div className="mt-2 w-full grid grid-cols-2 gap-2">
                        <div className={`text-center ${activeSection === 'notes' ? "bg-blue-300" : ""} hover:bg-gray-200 p-2 rounded-md`}><button onClick={() => setActiveSection('notes')} className="font-medium text-xs">Notes</button></div>
                        <div className={`text-center ${activeSection === 'interviews' ? "bg-blue-300" : ""} hover:bg-gray-200 p-2 rounded-md`}><button onClick={() => setActiveSection('interviews')} className="font-medium text-xs">Interviews</button></div>
                    </div>
                    {activeSection === 'notes'
                        ? <div id="notes" className="mt-5">
                            <p className="text-xs mt text-gray-700">This candidate have strong communication skills</p>
                          </div>
                        : <div id="interviews" className="mt-5">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="border border-slate-300 rounded-md p-3">
                                    <div>
                                        <p className="text-xs font-medium">Technical Interview</p>
                                        <span className="text-xs text-gray-800 flex items-center gap-2 mt-2">
                                            <LuCalendar color="gray" />
                                            <p>{formattedDateMoment(new Date(), "MMM DD YYYY")}</p>
                                        </span>
                                        <span className="text-xs text-gray-800 flex items-center gap-2 mt-2">
                                            <FaClock color="gray" />
                                            <p>10.30 AM</p>
                                        </span>
                                    </div>
                                    <div>
                                        <a className="bg-blue-500 block flex items-center gap-2 justify-center px-2 py-2 rounded-md mt-2 text-white cursor-pointer hover:bg-blue-800">
                                            <p className="text-xs font-medium">Join Meeting</p>
                                            <BiVideo />
                                        </a>
                                    </div>
                                </div>

                                <div className="border border-slate-300 rounded-md p-3">
                                    <div>
                                        <p className="text-xs font-medium">Technical Interview</p>
                                        <span className="text-xs text-gray-800 flex items-center gap-2 mt-2">
                                            <LuCalendar color="gray" />
                                            <p>{formattedDateMoment(new Date(), "MMM DD YYYY")}</p>
                                        </span>
                                        <span className="text-xs text-gray-800 flex items-center gap-2 mt-2">
                                            <FaClock color="gray" />
                                            <p>10.30 AM</p>
                                        </span>
                                    </div>
                                    <div>
                                        <a className="bg-blue-500 block flex items-center gap-2 justify-center px-2 py-2 rounded-md mt-2 text-white cursor-pointer hover:bg-blue-800">
                                            <p className="text-xs font-medium">Join Meeting</p>
                                            <BiVideo />
                                        </a>
                                    </div>
                                </div>
                                
                            </div>
                          </div>
                    }
                    <div className="mt-5">
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-700">More</p>
                            <Switch onChange={() => setIsMoreOptionsOpen(prv => !prv)} checked={isMoreOptionsOpen} />
                        </div>
                        {isMoreOptionsOpen && (
                            <button className="bg-red-500 mt-2 text-white text-xs font-medium p-2 w-full rounded-md hover:bg-red-600">Withdraw application ?</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <WithdrawApplicationModal />
        </>
    )
}

function WithdrawApplicationModal(){
    
    type WithdrawFormInput = {
        captcha: string
    }

    const {watch, handleSubmit, formState: {errors}, control} = useForm<WithdrawFormInput>({defaultValues: {captcha: ''}})

    const submitApplicationWithdrawal = async (data: WithdrawFormInput) => {
        Notify.success(data.captcha)
    }

    return(
        <Modal open className="flex flex-col items-center justify-center">
            <div className="bg-white p-5 rounded-md w-md lg:w-lg">
                <div className="header flex justify-between">
                    <div className="flex items-start gap-2">
                        <CiWarning color="orange" size={30} />
                        <div>
                            <p className="font-semibold">Withdraw application</p>
                            <p className="text-xs text-gray-500">This action can not be undone</p>
                        </div>
                    </div>
                    <div>
                        <button className="p-2 hover:bg-gray-200 rounded-md"><FaXmark /></button>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="bg-orange-50 p-3 rounded-md ring-1 ring-orange-300">
                        <p className="text-sm text-gray-700">You are about to withdraw your application for</p>
                        <p className="font-semibold text-sm mt-3">React Native Developer</p>
                        <p className="text-xs text-gray-500">Aquila | Posted by Unai Emery</p>
                    </div>
                    <div className="mt-5">
                        <p className="text-sm font-medium">What happens when you withdraw?</p>
                        <ul className="mt-3 list-disc space-y-2">
                            <li className="ms-4 text-xs text-gray-500">Your application will be permanently removed</li>
                            <li className="ms-4 text-xs text-gray-500">You will need to re apply if you changed your mind</li>
                        </ul>
                    </div>
                    <div className="mt-5">
                        <p className="text-sm">Type <span className="text-red-500 font-medium uppercase">withdraw</span> to continue</p>
                        <form onSubmit={handleSubmit(submitApplicationWithdrawal)}>
                            <FormControl fullWidth error={Boolean(errors.captcha)}>
                                <Controller
                                    control={control}
                                    name="captcha"
                                    rules={{
                                        required: {value: true, message: 'This is a mandatory field'},
                                        validate: (data) => {
                                            return data !== 'WITHDRAW' || "Please enter the correct word to continue"
                                        }
                                    }}
                                    render={({field}) => (
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Enter the word"
                                            className="bg-gray-200 p-2 rounded-md border border-slate-300 mt-1"
                                        />
                                    )}
                                />
                                <FormHelperText>{errors.captcha?.message}</FormHelperText>
                            </FormControl>
                            <div className="w-full mt-3 flex justify-end gap-2">
                                <button type="button" className="text-xs font-medium px-2 py-2 border border-slate-300 rounded-md">Cancel</button>
                                <Button type="submit" variant="contained" className="!text-xs !font-medium">Withdraw</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}