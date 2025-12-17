import { useEffect, useState } from "react";
import RecruiterInfoCard from "../../../components/recruiter/RecruiterInfoCard"
import defaultProfile from '/default-img-instagram.png';
import { Link, useNavigate } from "react-router-dom";
import { Job, RecruiterProfileData } from "../../../types/entityTypes";
import { getProfileOverview } from "../../../services/recruiterServices";
import { Notify } from "notiflix";
import getReminingDays from "../../../helpers/DateTime.helper";
import InfinitySpinner from "../../../components/common/InfinitySpinner";
import ThreeDotLoading from "../../../components/common/ThreeDotLoading";
import { PiClock, PiEye, PiSuitcase } from "react-icons/pi";
import { BsQuestionCircle, BsThreeDotsVertical } from "react-icons/bs";
import { FaCircleXmark } from "react-icons/fa6";
import { LuUserCheck } from "react-icons/lu";
import { IoLocation } from "react-icons/io5";
import { formatRelativeTime } from "../../../services/util/formatDate";
import { FaPlus } from "react-icons/fa";


const dummyUserWithRecruiterDetails = {
    isRecruiter: true,
    recruiterDetails: {
         _id: '12',
        userId: '11',
        employerType: 'company',
        organizationDetails: {
        organizationName: 'Aspiro',
        organizationType: 'Startup',
        industry: 'Information Technology',
        organizationContactNumber: '7560856614',
        organizationEmail: 'aspiro.hiring@gmail.com',
        socialLinks: [],
        teamStrength: '1-3',
        aboutCompany: 'Innovate Inc. is a leading provider of cutting-edge software solutions, dedicated to pushing the boundaries of technology and innovation. We foster a collaborative and creative environment.',
        website: 'https://www.aspiro.com',
        vision: 'To be the global leader in next-generation software solutions that empower businesses and individuals.',
    },
    }
};

const showDummyRecruiterProfile = true;


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
        <section className="p-5 md:px-10 xl:px-20">
            
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
                    profileData?.profileStatus === 'pending' && (
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
                  {/* <div className="text-center bg-white p-8 rounded-lg shadow-md border border-gray-200">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Unlock Your Recruiting Potential</h3>
                      <p className="text-gray-600 mb-6">
                          Join our network to find top-tier talent, post job openings, and manage applications seamlessly.
                      </p>
                      <Link to="/profile/recruiter/register">
                          <button className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                              Become a Recruiter Now
                          </button>
                      </Link>
                  </div> */}
                </>
            }
          </section>
        )}
          </>
    )
}