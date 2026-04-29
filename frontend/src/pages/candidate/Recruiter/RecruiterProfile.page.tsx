import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Job, RecruiterProfileData } from "../../../types/entityTypes";
import { getProfileOverview } from "../../../services/recruiterServices";
import { Notify } from "notiflix";
import getReminingDays from "../../../helpers/DateTime.helper";
import ThreeDotLoading from "../../../components/common/ThreeDotLoading";
import { PiClock, PiEye, PiSuitcase } from "react-icons/pi";
import { BsGlobe, BsLinkedin, BsThreeDotsVertical } from "react-icons/bs";
import { FaUsersGear } from "react-icons/fa6";
import { LuBriefcase, LuCirclePlus, LuClock, LuEye, LuUserCheck } from "react-icons/lu";
import { IoLocation } from "react-icons/io5";
import { FaFileAlt, FaPlus } from "react-icons/fa";
import { CgCheck } from "react-icons/cg";
import { BiBuildings, BiEnvelope, BiPhone, BiShieldQuarter } from "react-icons/bi";
import { FiAlertCircle, FiArrowRightCircle } from "react-icons/fi";
import moment, { Moment } from "moment";
import { TbBrandDaysCounter } from "react-icons/tb";

export default function RecruiterProfilePage(){
    const navigateTo = useNavigate();
    const [profileData, setProfileData] = useState<RecruiterProfileData | null>(null)
    const [isRecruiterProfileExist, setIsRecruiterProfileExist] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<boolean>(false)

    const getStatusPill = (status: Job['status']) => {
        switch (status) {
            case 'active':
                return <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Active</span>;
            case 'expired':
                return <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 text-xs font-medium px-2.5 py-1 rounded-full"><span className="w-2 h-2 bg-yellow-500 rounded-full"></span>Expired</span>;
            case 'closed':
                return <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full"><span className="w-2 h-2 bg-gray-500 rounded-full"></span>Closed</span>;
            case 'blocked':
            case 'rejected':
                return <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-medium px-2.5 py-1 rounded-full"><span className="w-2 h-2 bg-red-500 rounded-full"></span>Blocked</span>;
            default:
                return <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full"><span className="w-2 h-2 bg-purple-500 rounded-full"></span>Draft</span>;
        }
    };

    const goToApplicantManagePage = (jobId: string) => {
        return navigateTo(`/profile/recruiter/applications/${jobId}`, {state:{jobId}})
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const result = await getProfileOverview()
                console.log('---checking recruiter profile oveervei data---', result)
                if(result?.success){
                    if(!result?.result){
                        return navigateTo('/profile/recruiter/register')
                    }
                    setIsRecruiterProfileExist(true)
                   setProfileData(result?.result)
                }else{
                    setIsRecruiterProfileExist(false)
                    setProfileData(null)
                    Notify.failure(result?.message, {timeout:2000})
                }
            } catch (error: unknown) {
                setError(true)
                Notify.failure('Something went wrong', {timeout:2000})
            } finally {
                setLoading(false)
            }
        })()
    }, [])
    return(
        <>
        {loading && (<ThreeDotLoading />)}
        {!loading && (
            <section className="p-5 lg:p-10">
                {
                    profileData?.profileStatus === "pending" || profileData?.profileStatus === "under-review"
                    ? <>
                        <div className="max-w-md mx-auto mt-10 p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
  <div className="text-center mb-8">
    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Application under review</h2>
    <p className="text-xs text-gray-500 mt-2 font-medium">Hang tight! Our team is carefully reviewing your credentials.</p>
  </div>

  <div className="relative space-y-8">
    {/* The Vertical Connecting Line */}
    <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-400 -translate-x-1/2">
        <div className={`bg-green-500 w-full -translate-x-1/2 ${profileData.profileStatus === 'under-review' ? "h-[50%]" : "h-0"}`}></div>
    </div>

    {/* Step 1: Application Sent */}
    <div className="relative flex gap-5 group">
      <div className={`z-10 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-colors ${profileData.profileStatus !== 'pending' ? 'bg-green-500' : 'bg-blue-600'}`}>
        <CgCheck className="text-white" size={32} />
      </div>
      <div>
        <h4 className={`text-sm font-bold ${profileData.profileStatus !== 'pending' ? 'text-gray-900' : 'text-blue-600'}`}>Application Sent</h4>
        <p className="text-xs text-gray-500 mt-0.5">Your application has been successfully received.</p>
        <p className="text-[10px] text-gray-400 mt-2 font-mono uppercase tracking-wider">{moment(profileData.createdAt).format("MMM DD, YYYY • h:mm a")}</p>
      </div>
    </div>

    {/* Step 2: Admin Verification */}
    <div className="relative flex gap-5 group">
      {/* Dynamic line color for the active segment */}
      {/* <div className={`absolute -left-6 -top-8 w-0.5 h-8 -translate-x-1/2 ${profileData.profileStatus !== 'pending' ? 'bg-green-500' : 'bg-gray-100'}`} /> */}
      
      <div className={`z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
        profileData.profileStatus === 'under-review' ? 'bg-blue-600 ring-4 ring-blue-50' : 
        profileData.profileStatus === 'verified' ? 'bg-green-500' : 'bg-gray-100'
      }`}>
        <BiShieldQuarter className={profileData.profileStatus === 'pending' ? 'text-gray-400' : 'text-white'} size={24} />
      </div>
      <div>
        <h4 className={`text-sm font-bold ${profileData.profileStatus === 'under-review' ? 'text-blue-600' : (profileData.profileStatus === 'pending' ? 'text-gray-400' : 'text-gray-900')}`}>Admin Verification</h4>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">Our team is verifying your profile for industrial standards.</p>
        {profileData.profileStatus === 'under-review' && (
          <span className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" /> In Progress
          </span>
        )}
      </div>
    </div>

    {/* Step 3: Final Decision */}
    <div className="relative flex gap-5 group">
       <div className={`absolute -left-6 -top-8 w-0.5 h-8 -translate-x-1/2 ${profileData.profileStatus === 'verified' ? 'bg-green-500' : 'bg-gray-100'}`} />
      
      <div className="z-10 w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
        <FaUsersGear className="text-gray-300" size={20} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-400">Final Decision</h4>
        <p className="text-xs text-gray-400 mt-0.5">You will be notified via email once the process is complete.</p>
      </div>
    </div>
  </div>
</div>
                        {/* <div>
                            <p className="text-center text-2xl">Application under review</p>
                            <p className="text-xs text-center mt-1">Hang tight! our team is carefully reviewing your credentials</p>
                            <div className="mt-5 p-5 relative bg-white space-y-5 rounded-md w-md lg:w-lg m-auto">
                                <div className="flex gap-3">
                                    <div className={`${profileData.profileStatus === 'pending' ? "bg-blue-500" : "bg-green-500"} w-12 h-12 rounded-md flex items-center justify-center`}>
                                        <CgCheck color="white" size={50} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className={`${profileData.profileStatus === "pending" ? "text-blue-500" : "text-black"} text-sm font-medium`}>Application send</p>
                                        <p className={`${profileData.profileStatus === "pending" ? "text-blue-500" : "text-black"} text-xs`}>Your application has been received</p>
                                        {
                                            profileData.profileStatus === "pending" && (<span className="mt-2 flex items-center gap-2 w-fit bg-blue-200 rounded-md px-2 text-xs text-blue-500" style={{fontSize: '.65rem'}}><div className="rounded-full w-2 h-2 bg-blue-500"></div> In Progress</span>)
                                        }
                                        <p className="text-xs text-gray-500">{moment(profileData.createdAt).format("MMMM DD YYYY h:mm a")}</p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3">
                                    <div className={`${profileData.profileStatus === "under-review" ? "bg-blue-500" : (profileData.profileStatus === "pending" ? "bg-gray-300" : "bg-green-500")} w-12 h-12 rounded-md flex items-center justify-center`}>
                                        <BiShieldQuarter color="white" size={40} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className={`${profileData.profileStatus === "under-review" ? "text-blue-500" : (profileData.profileStatus === "pending" ? "text-gray-300" : "text-green-500")}`}>Admin Verification</p>
                                        <p className={`${profileData.profileStatus === "under-review" ? "text-blue-500" : (profileData.profileStatus === "pending" ? "text-gray-300" : "text-green-500")} text-xs`}>Our team is verifying your application</p>
                                        {
                                            profileData.profileStatus === "under-review" && (<span className="mt-2 flex items-center gap-2 w-fit bg-blue-200 rounded-md px-2 text-xs text-blue-500" style={{fontSize: '.65rem'}}><div className="rounded-full w-2 h-2 bg-blue-500"></div> In Progress</span>)
                                        }
                                        <p className="text-xs text-gray-500">{moment(profileData.updatedAt).format("MMMM DD YYYY h:mm a")}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className={`bg-gray-300 w-12 h-12 rounded-md flex items-center justify-center`}>
                                        <FaUsersGear color="white" size={30} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className={`text-gray-400 text-sm font-medium`}>Final Descision</p>
                                        <p className={`text-xs text-gray-400`}>You will be notified of the outcome</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                      </>
                    : <></>
                }
                {
                    profileData?.profileStatus === 'rejected' && (
                        <CooldownScreen recruiterData={profileData} />
                    )
                }
                {
                    profileData?.profileStatus === 'approved' && (
                        <>
                            <p className="text-2xl font-semibold mt-10 lg:mt-0 tracking-wide text-gray-900">Dashboard</p>
                    <p className="text-sm text-gray-700 mt-2">Welcome back!, Here is an overview of your recruiting activity</p>
                    <div className="mt-5 border border-slate-100 bg-white rounded-lg shadow-xl">
                        <div className="w-full p-5 flex jusityf-between">
                            <div className="flex gap-3">
                                <div className="w-13 bg-gradient-to-br text-white text-lg from-blue-500 to-indigo-600 h-13 flex items-center justify-center rounded-md">
                                    <p>{profileData?.userProfile?.name ? profileData?.userProfile?.name[0] : 'U'}</p>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold flex gap-2 items-center tracking-wide">
                                        {profileData?.userProfile?.name}
                                        <span className="text-xs bg-blue-200 text-violet-700 !font-normal px-3 rounded-full">{profileData?.recruiterType} Recruiter</span>
                                    </p>
                                    {profileData.recruiterType === 'corporate' && (
                                        <p className="text-xs text-gray-700">{profileData.companyDetails?.name} ~ {profileData.companyDetails?.slogan}</p>
                                    )}
                                    {profileData.recruiterType === 'freelance' && (
                                        <p>{profileData?.profiessionalTitle}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                            {
                                profileData?.recruiterType === 'corporate' && (
                                    <>
                                        <div className="border border-slate-100 transition-all duration-300 hover:-translate-y-1 rounded-lg p-5 shadow-xl flex items-center gap-2">
                                            <BiBuildings size={25} color="blue" />
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Company Name</p>
                                                <p className="text-xs font-semibold text-gray-700 mt-1">{profileData?.companyDetails?.name}</p>
                                            </div>
                                        </div>
                                        <div className="border border-slate-100 shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-lg p-5 flex items-center gap-2">
                                            <BiEnvelope size={25} color="blue" />
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Email</p>
                                                <p className="text-xs font-semibold text-gray-700 mt-1">{profileData?.email}</p>
                                            </div>
                                        </div>
                                        <div className="border border-slate-100 transition-all duration-300 shadow-xl hover:-translate-y-1 rounded-lg p-5 flex items-center gap-2">
                                            <BsLinkedin size={25} color="blue" />
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">LinkedIn</p>
                                                <a href={profileData.linkedinUrl} className="text-xs font-semibold text-blue-500 mt-1">LinkedIn.com</a>
                                            </div>
                                        </div>
                                        <div className="border border-slate-100 shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-lg p-5 flex items-center gap-2">
                                            <TbBrandDaysCounter size={25} color="blue" />
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Years of Experience</p>
                                                <p className="text-xs font-semibold text-gray-700 mt-1">{profileData?.yearOfExperience}</p>
                                            </div>
                                        </div>
                                        <div className="border border-slate-100 shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-lg p-5 flex items-center gap-2">
                                            <BsGlobe size={25} color="blue" />
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Website</p>
                                                <a href={profileData.companyDetails?.website} className="text-xs font-semibold text-blue-500 mt-1">Go to website</a>
                                            </div>
                                        </div>
                                       <div className="border border-slate-100 shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-lg p-5 flex items-center gap-2">
                                            <BiPhone size={25} color="blue" />
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Contact</p>
                                                <p className="text-xs font-semibold text-gray-700 mt-1">{profileData?.phone}</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            {
                                profileData?.recruiterType === 'freelance' && (
                                    <>
                                        <div className="border border-slate-100 shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-lg p-5 flex items-center gap-2">
                                            <BiEnvelope size={25} color="blue" />
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Email</p>
                                                <p className="text-xs font-semibold text-gray-700 mt-1">{profileData?.email}</p>
                                            </div>
                                        </div>
                                        <div className="border border-slate-100 shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-lg p-5 flex items-center gap-2">
                                            <BsLinkedin size={25} color="blue" />
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">LinkedIn</p>
                                                <a href={profileData.linkedinUrl} className="text-xs font-semibold text-blue-500 mt-1">LinkedIn.com</a>
                                            </div>
                                        </div>
                                        <div className="border border-slate-100 shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-lg p-5 flex items-center gap-2">
                                            <TbBrandDaysCounter size={25} color="blue" />
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Years of Experience</p>
                                                <p className="text-xs font-semibold text-gray-700 mt-1">{profileData?.yearOfExperience}</p>
                                            </div>
                                        </div>
                                       <div className="border border-slate-100 shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-lg p-5 flex items-center gap-2">
                                            <BiPhone size={25} color="blue" />
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Contact</p>
                                                <p className="text-xs font-semibold text-gray-700 mt-1">{profileData?.phone}</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        <div className="p-5">
                            <div>
                                <p className="font-semibold uppercase text-gray-700 tracking-wide">Security</p>
                                <div className="mt-2">
                                    <p className="text-xs text-gray-500 font-medium">Verification</p>
                                    <p className={`text-xs font-semibold ${profileData.isVerified ? "text-green-600" : "text-red-600"} mt-1`}>{profileData.isVerified ? "Verified" : "Not Verified"}</p>
                                </div>
                            </div>
                            {profileData.verificationTimeline && profileData?.verificationTimeline?.length > 0 && (
                                <div className="mt-5">
                                <p className="font-semibold">Verification History</p>
                                <div className={`space-y-2 mt-2 max-h-500 overflow-y-auto`}>
                                    {profileData.verificationTimeline?.map((history: {action: string, actor: string}, index: number) => (
                                        <div className={`${history.action === 'Verified' ? "bg-green-100" : "bg-red-100"} p-2 rounded-md`} key={index}>
                                            <p className={`text-sm font-medium ${history.action === 'Verified' ? "text-green-700" : "text-red-700"}`}>{history.action}</p>
                                            <p className="text-xs text-gray-700 mt-1">By: {history.actor}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            )}
                            <div className="mt-5">
                                <p className="font-semibold tracking-wide uppercase text-gray-700">Verification Document</p>
                                <div className="mt-3 p-5 flex gap-3 border border-slate-100 rounded-md shadow-xl cursor-pointer">
                                    <div className="bg-red-200 w-10 h-10 rounded-md flex items-center justify-center">
                                        <FaFileAlt color="white" size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">{profileData.verificationDocument?.publicId?.split("/")[2].split("_")[0]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {profileData.recruiterType === 'corporate' && (<div className="p-5">
                            <p className="text-gray-700 font-semibold tracking-wide uppercase">Summary</p>
                            <p className="text-sm mt-2 font-normal text-gray-500 text-justify leading-relaxed mt-1">{profileData?.companyDetails?.description}</p>
                        </div>)}
                    </div>

                    <div className="my-5">
                        <p className="text-lg font-semibold text-gray-700 uppercase tracking-wide">Manage Jobs</p>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 xl:grid-cols-4">
                            <div className="border border-slate-100 shadow-xl bg-white p-5 flex gap-3 rounded-lg">
                                <div>
                                    <p className="text-sm uppercase font-medium text-slate-500">Active Jobs</p>
                                    <p className="mt-2 text-xl font-semibold text-gray-800">0</p>
                                </div>
                                <div className="flex-1 flex justify-end">
                                    <LuBriefcase className="text-blue-500" size={25} />
                                </div>
                            </div>

                            <div className="border border-slate-100 shadow-xl bg-white p-5 flex gap-3 rounded-lg">
                                <div>
                                    <p className="text-sm uppercase font-medium text-slate-500">average job views</p>
                                    <p className="mt-2 text-xl font-semibold text-gray-800">0</p>
                                </div>
                                <div className="flex-1 flex justify-end">
                                    <LuEye className="text-blue-500" size={25} />
                                </div>
                            </div>

                            <div className="border border-slate-100 shadow-xl bg-white p-5 flex gap-3 rounded-lg">
                                <div>
                                    <p className="text-sm uppercase font-medium text-slate-500">job expiring soon</p>
                                    <p className="mt-2 text-xl font-semibold text-gray-800">0</p>
                                </div>
                                <div className="flex-1 flex justify-end">
                                    <LuClock className="text-blue-500" size={25} />
                                </div>
                            </div>

                            <div className="border border-slate-100 shadow-xl bg-white p-5 flex gap-3 rounded-lg">
                                <div>
                                    <p className="text-sm uppercase font-medium text-slate-500">total hires</p>
                                    <p className="mt-2 text-xl font-semibold text-gray-800">0</p>
                                </div>
                                <div className="flex-1 flex justify-end">
                                    <LuUserCheck className="text-blue-500" size={25} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-5">
                        <div className="flex justify-between">
                            <p className="text-lg font-semibold uppercase tracking-wide text-gray-700">Recent Jobs</p>
                            <button onClick={() => navigateTo('/profile/recruiter/my-jobs')}>
                                <p className="text-sm text-blue-500 font-medium underline transition-color duration-300 hover:text-blue-700">See all</p>
                            </button>
                        </div>
                        <div className="mt-5 grid grid-cols-1 gap-3">
                            {
                                profileData?.jobs?.length > 0 && (
                                    profileData?.jobs.map((job: Job, index: number) => (
                                        <>
                                            <div key={index} className="bg-white rounded-md hover:border hover:border-blue-200 hover:shadow-lg p-5">
                                        <div className="flex justify-between gap-2">
                                            <div className="flex gap-3">
                                                <div>
                                                    <PiSuitcase />
                                                </div>
                                                <div>
                                                    <p>{job?.jobTitle}</p>
                                                    <div className="flex gap-3 items-center">
                                                        <span className="flex text-xs text-gray-500 gap-1 items-center"><IoLocation /> {job.workMode}</span>
                                                        <span className="flex text-xs text-gray-500 gap-1 items-center"><PiClock /> {getReminingDays(job.expiresAt)} Day left</span>
                                                    </div>
                                                    <div className="flex gap-2 items-center mt-2">
                                                        {getStatusPill(job?.status as Job['status'])}
                                                        <p className="text-xs">{job.applicationsCount || 0} Applications</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-between items-end">
                                                <button><BsThreeDotsVertical color="gray" size={15} /></button>
                                                <button onClick={() => goToApplicantManagePage(job._id as string)} className="bg-blue-500 text-white rounded-md text-xs py-2 px-3">Manage</button>
                                            </div>
                                        </div>
                                    </div>
                                        </>
                                    ))
                                )
                            }
                        </div>

                        <button onClick={() => navigateTo('/profile/recruiter/post-a-job')} className="border border-transparent p-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-full flex items-center gap-2 rounded-md shadow-[0_0_30px_2px_rgba(0,0,256,0.2)] transition-color duration-300 hover:!bg-blue-500 uppercase justify-center font-semibold text-sm">
                            <LuCirclePlus color="white" size={18} />
                            <p>Post new job</p>
                        </button>
                    </div>
                        </>
                    )
                }
            </section>
        )}
          </>
    )
}


const CooldownScreen = ({recruiterData}: {recruiterData: RecruiterProfileData}) => {
    const [currentDate, setCurrentDate] = useState<Moment>()
    const [bufferDate, setBufferDate] = useState<Moment>()
    
    useEffect(() => {
        setCurrentDate(moment(new Date()))
        setBufferDate(moment(new Date(recruiterData.applicationResendBufferDate)))
    }, [])
    
    return(
        <div className="max-w-2xl mx-auto py-12 px-4">
  {/* Header Section */}
  <div className="text-center mb-10">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 rounded-full mb-4">
      <FiAlertCircle className="text-amber-600" size={32} />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Application Status: Not Approved</h2>
    <p className="text-sm text-gray-500 mt-2">You can reapply once your cooldown period concludes.</p>
  </div>

  {/* Main Content Card */}
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
    
    {/* Cooldown Header */}
    <div className="bg-slate-50 border-b border-gray-100 p-6 flex justify-between items-center">
      <div>
        <h3 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Cooldown Period</h3>
        <p className="text-sm text-gray-600 mt-1 font-medium">Temporary restriction active</p>
      </div>
      <div className="text-right">
        <span className="text-2xl font-black text-slate-800">{bufferDate?.diff(currentDate, "days")}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">Days Left</span>
      </div>
    </div>

    <div className="p-8">
      {/* Feedback Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Reason</h4>
          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
            "{recruiterData.rejection?.reason}"
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Admin Feedback</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {recruiterData.rejection?.feedback}
          </p>
        </div>
      </div>

      {/* Progress Line Visual */}
      {/* <div className="relative h-2 w-full bg-gray-100 rounded-full mb-10 overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-amber-500 transition-all duration-700"
          style={{ width: `${(1 - (bufferDate?.diff(currentDate, "days") / 30)) * 100}%` }} 
        />
      </div> */}

      {/* Next Steps Section */}
      <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
        <h4 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
          <FiArrowRightCircle className="text-blue-500" />
          Next Steps & Recommendations
        </h4>
        <ul className="space-y-3">
          {[
            `Your account will automatically unlock in ${bufferDate?.diff(currentDate, "days")} days.`,
            "Review our updated Recruiter Profile Guidelines to ensure compliance.",
            "You'll receive an automated email notification when you're eligible to reapply."
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3 text-xs text-blue-800/80 leading-snug">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 flex-shrink-0" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>

  {/* Footer Help */}
  <p className="text-center mt-8 text-xs text-gray-400">
    Have questions? <a href="#" className="text-blue-600 font-semibold hover:underline">Contact Aspiro Support</a>
  </p>
</div>
    )
}
  // Mock target date: 30 days from now
//   const [targetDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0, hours: 0, minutes: 0, seconds: 0
//   });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date();
//       const difference = targetDate.getTime() - now.getTime();

//       if (difference <= 0) {
//         clearInterval(timer);
//       } else {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60),
//         });
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [targetDate]);

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
//       <div className="max-w-2xl w-full text-center">
        
//         <h1 className="text-3xl font-bold text-slate-900 mb-2">Application Not Approved</h1>
//         <p className="text-slate-500 text-sm mb-10">You can reapply after the cooldown period</p>

//         <div className="bg-white rounded-2xl border border-orange-200 shadow-sm overflow-hidden">
//           <div className="p-8 space-y-8">
            
//             <div>
//               <p className="text-orange-700 font-bold text-xs uppercase tracking-wider mb-3">Cooldown Period</p>
//               <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
//                 Your application does not meet our current requirements. You may reapply after the cooldown period.
//               </p>
//             </div>

//             <div className="bg-orange-50 rounded-xl p-8 border border-orange-100 relative group transition-all">
//               <p className="text-orange-800 text-[10px] font-bold uppercase mb-4 opacity-70">Time Remaining</p>
//               <div className="flex justify-center items-baseline gap-2">
//                 <span className="text-4xl md:text-5xl font-extrabold text-orange-900 tabular-nums">
//                   {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
//                 </span>
//               </div>
//               <p className="text-orange-700 text-xs font-medium mt-4">until you can reapply</p>
//             </div>

//             <div className="text-left bg-slate-50/50 rounded-xl p-6 border border-slate-100">
//               <h3 className="text-slate-900 font-bold text-sm mb-4">What happens next?</h3>
//               <ul className="space-y-3">
//                 <NextStepItem text="Your application will be automatically unlocked after 30 days" />
//                 <NextStepItem text="We recommend reviewing our recruiter guidelines before reapplying" />
//                 <NextStepItem text="You'll receive an email notification when you're eligible to reapply" />
//               </ul>
//             </div>

//           </div>
//         </div>

// l        <button className="mt-8 w-full py-4 bg-white border border-blue-200 rounded-xl text-blue-600 text-sm font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
//           In the meantime, continue building your professional network on Aspiro
//         </button>

//       </div>
//     </div>
//   );
// };

// const NextStepItem = ({ text }: { text: string }) => (
//   <li className="flex items-start gap-3">
//     <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
//     <span className="text-slate-600 text-xs font-medium leading-relaxed">{text}</span>
//   </li>
// );


/**
 * <section className="p-5 md:px-10 xl:px-20">
            <p>{JSON.stringify(profileData?.profileStatus)}</p>
              {profileData?.profileStatus === 'approved'
                ? <>
                    <p className="text-2xl font-light">Dashboard</p>
                    <p className="text-sm text-gray-500 mt-2">Welcome back!, Here is an overview of your recruiting activity</p>
                    <div className="mt-5 border border-gray-200 bg-white rounded-md p-5">
                        <div className="w-full flex jusityf-between">
                            <div className="flex gap-3">
                                <div className="w-13 bg-gradient-to-br text-white text-lg from-blue-500 to-indigo-600 h-13 flex items-center justify-center rounded-md">
                                    <p>{profileData?.userProfile?.name ? profileData?.userProfile?.name[0] : 'U'}</p>
                                </div>
                                <div>
                                    <p className="text-lg font-light">{profileData?.userProfile?.name}</p>
                                    <span className="text-xs bg-blue-200 text-violet-700 px-3 rounded-full">{profileData?.employerType} Recruiter</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-5">
                            {
                                profileData?.employerType === 'company' && (
                                    <>
                                        <div>
                                            <p className="text-xs text-gray-500">Business Name</p>
                                            <p className="text-sm text-gray-700">{profileData?.organizationDetails?.organizationName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Business Type</p>
                                            <p className="text-sm text-gray-700">{profileData?.organizationDetails?.organizationType}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Industry</p>
                                            <p className="text-sm text-gray-700">{profileData?.organizationDetails?.industry}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Team Strength</p>
                                            <p className="text-sm text-gray-700">{profileData?.organizationDetails?.industry}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Recruiting Experience</p>
                                            <p className="text-sm text-gray-700">{profileData?.recruitingExperience}</p>
                                        </div>
                                        {
                                            profileData?.organizationDetails?.linkedinUrl && (
                                                <div>
                                                <p className="text-xs text-gray-500">Linkedin Profile</p>
                                                <a href={profileData?.organizationDetails?.linkedinUrl} className="text-sm text-blue-700">Profile</a>
                                                </div>
                                            )
                                        }
                                        {
                                            profileData?.organizationDetails?.website && (
                                                <div>
                                                <p className="text-xs text-gray-500">Website</p>
                                                <a href={profileData?.organizationDetails?.website} className="text-sm text-blue-700">Go to Website</a>
                                                </div>
                                            )
                                        }
                                        <div>
                                                <p className="text-xs text-gray-500">Organization Email</p>
                                                <p className="text-sm text-gray-700">{profileData?.organizationDetails?.organizationEmail}</p>
                                                </div>
                                        <div>
                                                <p className="text-xs text-gray-500">Organization Contact</p>
                                                <p className="text-sm text-gray-700">{profileData?.organizationDetails?.organizationContactNumber}</p>
                                                </div>
                                    </>
                                )
                            }
                            {
                                profileData?.employerType === 'selft' && (
                                    <>
                                        <div>
                                            <p className="text-xs text-gray-500">Contact Email</p>
                                            <p className="text-sm text-gray-700">{profileData?.userProfile?.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Contact Number</p>
                                            <p className="text-sm text-gray-700">{profileData?.userProfile?.phone}</p>
                                        </div>
                                        
                                    </>
                                )
                            }
                        </div>
                        <div className="mt-5 border-t border-gray-200">
                            <p className="mt-5 text-sm">Summary</p>
                            <p className="text-xs text-gray-500 mt-2">{profileData?.summary}</p>
                        </div>
                    </div>

                    <div className="my-5">
                        <p className="text-lg">Manage Jobs</p>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 xl:grid-cols-4">
                            <div className="border border-blue-500 bg-blue-100 p-5 flex gap-3 rounded-md">
                                <div>
                                    <p className="text-sm text-blue-600">Active Jobs</p>
                                    <p className="mt-2 text-xl">0</p>
                                </div>
                                <div className="flex-1 flex justify-end">
                                    <PiSuitcase color="blue" size={25} />
                                </div>
                            </div>

                            <div className="border border-orange-500 bg-orange-100 p-5 flex gap-3 rounded-md">
                                <div>
                                    <p className="text-sm text-orange-600">Average Job Views</p>
                                    <p className="mt-2 text-xl">0</p>
                                </div>
                                <div className="flex-1 flex justify-end">
                                    <PiEye color="orange" size={25} />
                                </div>
                            </div>

                            <div className="border border-green-500 bg-green-100 p-5 flex gap-3 rounded-md">
                                <div>
                                    <p className="text-sm text-green-600">Jobs Expiring Soon</p>
                                    <p className="mt-2 text-xl">0</p>
                                </div>
                                <div className="flex-1 flex justify-end">
                                    <PiClock color="green" size={25} />
                                </div>
                            </div>

                            <div className="border border-violet-500 bg-violet-50 p-5 flex gap-3 rounded-md">
                                <div>
                                    <p className="text-sm text-violet-600">Total Hires</p>
                                    <p className="mt-2 text-xl">0</p>
                                </div>
                                <div className="flex-1 flex justify-end">
                                    <LuUserCheck color="violet" size={25} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-5">
                        <div className="flex justify-between">
                            <p className="text-lg">Recent Jobs</p>
                            <button>
                                <p className="text-xs text-blue-500">See all</p>
                            </button>
                        </div>
                        <div className="mt-5 grid grid-cols-1 gap-3">
                            {
                                profileData?.jobs?.length > 0 && (
                                    profileData?.jobs.map((job: Job, index: number) => (
                                        <>
                                            <div key={index} className="bg-white rounded-md hover:border hover:border-blue-200 hover:shadow-lg p-5">
                                        <div className="flex justify-between gap-2">
                                            <div className="flex gap-3">
                                                <div>
                                                    <PiSuitcase />
                                                </div>
                                                <div>
                                                    <p>{job?.jobTitle}</p>
                                                    <div className="flex gap-3 items-center">
                                                        <span className="flex text-xs text-gray-500 gap-1 items-center"><IoLocation /> {job.workMode}</span>
                                                        <span className="flex text-xs text-gray-500 gap-1 items-center"><PiClock /> {getReminingDays(job.expiresAt)} Day left</span>
                                                    </div>
                                                    <div className="flex gap-2 items-center mt-2">
                                                        {getStatusPill(job?.status as Job['status'])}
                                                        <p className="text-xs">{job.applicationsCount || 0} Applications</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-between items-end">
                                                <button><BsThreeDotsVertical color="gray" size={15} /></button>
                                                <button onClick={() => goToApplicantManagePage(job._id as string)} className="bg-blue-500 text-white rounded-md text-xs py-2 px-3">Manage</button>
                                            </div>
                                        </div>
                                    </div>
                                        </>
                                    ))
                                )
                            }
                        </div>

                        <button onClick={() => navigateTo('/profile/recruiter/post-a-job')} className="flex gap-2 items-center justify-center mt-5 text-white bg-blue-500 rounded-md w-full py-2">
                            <FaPlus color="white" size={14} />
                            <p>Post new job</p>
                        </button>
                    </div>
                </>
                  
              : <>
                  {
                    profileData?.profileStatus === 'pending' || profileData?.profileStatus === 'under-review' && (
                        <div className="border flex gap-5 border-orange-500 p-5 bg-orange-50 rounded-md">
                            <div>
                                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-orange-500">
                                    <PiClock color="white" size={25} />
                                </div>
                            </div>
                            <div>
                                <p className="text-xl">Application Under Review</p>
                                <p className="mt-2 text-xs text-gray-700 leading-relaxed">Thank you for submitting your recruiter application!. Our team is currently reviewing your
                                    Application. This process typically takes 2-3 business days.
                                </p>
                                <div className="mt-5 border border-orange-500 p-3 bg-white rounded-md">
                                    <div className="flex items-center gap-3">
                                        <BsQuestionCircle color="red" size={20} />
                                        <p className="text-sm">What happens next?</p>
                                    </div>
                                    <ul className="!list-disc space-y-2 ms-5 mt-3">
                                        <li className="text-xs text-gray-500">We will verify your application and your profile</li>
                                        <li className="text-xs text-gray-500">You will recive an email notification once the review is completed</li>
                                        <li className="text-xs text-gray-500">If approved you will gain immediate access to the recruiter dashboard</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                  }
                  {
                    profileData?.profileStatus === 'rejected' && (
                        <div className="border mt-10 flex gap-5 border-red-500 p-5 bg-red-50 rounded-md">
                            <div>
                                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-red-500">
                                    <FaCircleXmark color="white" size={25} />
                                </div>
                            </div>
                            <div>
                                <p className="text-xl">Application Not Approved</p>
                                <p className="mt-2 text-xs text-gray-700 leading-relaxed">
                                    Thank you for your interest in becoming an Aspiro recruiter. After careful review, we've determined
                                    that your application doesn't meet our current requirements at this time.
                                </p>
                                <div className="mt-5 border border-orange-500 p-3 bg-white rounded-md">
                                    <div className="flex items-center gap-3">
                                        <BsQuestionCircle color="red" size={20} />
                                        <p className="text-sm">Common reason for rejection?</p>
                                    </div>
                                    <ul className="!list-disc space-y-2 ms-5 mt-3">
                                        <li className="text-xs text-gray-500">Insufficient recruiting experience in specified industries</li>
                                        <li className="text-xs text-gray-500">Incomplete or inaccurate information provided</li>
                                        <li className="text-xs text-gray-500">Professional credentials could not be verified</li>
                                    </ul>
                                </div>
                                <div className="mt-3 w-full p-3 border border-blue-500 bg-blue-50 rounded-md">
                                    <p className="text-xs text-gray-700 leading-relaxed">
                                        <span className="font-semibold !text-black">You can apply again after 30 days.</span>
                                        We encourage you to gain more experience in your target industries and 
                                        ensure all information is accurate before resubmitting.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                  }
                  {
                    error && (
                        <div className="w-full h-screen flex items-center justify-center">
                            <p className="text-gray-500 text-xs">Oops! Something went wrong. Please try again later.</p>
                        </div>
                    )
                  }
                </>
            }
          </section>
 */