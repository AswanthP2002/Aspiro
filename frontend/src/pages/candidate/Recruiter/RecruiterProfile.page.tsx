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
import { PiClock } from "react-icons/pi";
import { BsQuestionCircle } from "react-icons/bs";
import { FaCircleXmark } from "react-icons/fa6";


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
                    <div>
                      <RecruiterInfoCard 
                        recruiterDetails={profileData} 
                      />
                      <div className="mt-8">
                          <h3 className="text-xl font-semibold mb-4">Manage Jobs</h3>
                          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-6">
                              {/* Recruiter Metrics Section */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                  {/* Active Jobs */}
                                  <div className="bg-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all ease-in-out border border-blue-200 p-4 rounded-lg flex items-center justify-between">
                                      <div>
                                          <p className="text-sm text-blue-800 font-semibold">Active Jobs</p>
                                          <p className="text-2xl font-bold text-blue-900">{profileData?.jobs?.length}</p>
                                      </div>
                                      <div className="bg-blue-500 text-white p-3 rounded-full"><i className="fa-solid fa-briefcase !text-white"></i></div>
                                  </div>
                                  {/* Total Job Views */}
                                  <div className="bg-orange-100 hover:shadow-lg hover:-translate-y-1 transition-all ease-in-out border border-orange-200 p-4 rounded-lg flex items-center justify-between">
                                      <div>
                                          <p className="text-sm text-orange-800 font-semibold">Total Job Views</p>
                                          <p className="text-2xl font-bold text-orange-900">0</p>
                                      </div>
                                      <div className="bg-orange-500 text-white p-3 rounded-full"><i className="fa-solid fa-eye !text-white"></i></div>
                                  </div>
                                  {/* Jobs Expiring Soon */}
                                  <div className="bg-green-100 hover:shadow-lg hover:-translate-y-1 transition-all ease-in-out border border-green-200 p-4 rounded-lg flex items-center justify-between">
                                      <div>
                                          <p className="text-sm text-green-800 font-semibold">Jobs Expiring Soon</p>
                                          <p className="text-2xl font-bold text-green-900">0</p>
                                      </div>
                                      <div className="bg-green-500 text-white p-3 rounded-full"><i className="fa-solid fa-clock !text-white"></i></div>
                                  </div>
                                  {/* Total Hires */}
                                  <div className="bg-indigo-100 hover:shadow-lg hover:-translate-y-1 transition-all ease-in-out border border-indigo-200 p-4 rounded-lg flex items-center justify-between">
                                      <div>
                                          <p className="text-sm text-indigo-800 font-semibold">Total Hires</p>
                                          <p className="text-2xl font-bold text-indigo-900">0</p>
                                      </div>
                                      <div className="bg-indigo-500 text-white p-3 rounded-full"><i className="fa-solid fa-handshake !text-white"></i></div>
                                    </div>
                              </div>

                              <div className=" mt-6">
                                {profileData?.jobs?.length === 0 && (<p className="text-gray-600 mb-4 text-center">You haven't posted any jobs yet.</p>)}
                                
                                <div className="border-t border-gray-200 pt-4 mt-4 !mb-4">
                                    <p className="mt-2 mb-1 font-semibold text-base">Recently Posted Jobs</p>
                                  {
                                    profileData?.jobs.map((job: Job, index: number) => {
                                      return (
                                        <div key={index} className="grid grid-cols-12 items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                                      {/* Job Title and Info */}
                                      <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                                          <img src={defaultProfile} className="w-12 h-12 rounded-lg object-cover" alt="Company Logo" />
                                          <div>
                                              <p className="font-semibold text-gray-800 text-lg">{job?.jobTitle}</p>
                                              <div className="flex items-center text-sm text-gray-500 gap-3 mt-1">
                                                  <span className="inline-flex items-center gap-1">
                                                      <i className="fa-solid fa-location-dot text-xs"></i> {job?.workMode}
                                                  </span>
                                                  <span className="inline-flex items-center gap-1">
                                                      <i className="fa-solid fa-clock text-xs"></i> {getReminingDays(job?.expiresAt as string)} Days left
                                                  </span>
                                              </div>
                                          </div>
                                      </div>
                                      {/* Status */}
                                      <div className="col-span-6 md:col-span-2 flex items-center justify-start md:justify-center mt-2 md:mt-0">
                                          {getStatusPill(job?.status as Job['status'])}
                                      </div>
                                      {/* Applicants */}
                                      <div className="col-span-6 md:col-span-2 flex items-center justify-start md:justify-center mt-2 md:mt-0">
                                          <p className="text-gray-700 font-medium text-sm">{job?.applicationsCount || 0} Applicants</p>
                                      </div>
                                      {/* Action Button */}
                                      <div className="col-span-12 md:col-span-3 flex justify-end mt-4 md:mt-0">
                                          <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto">View Applicants</button>
                                      </div>
                                  </div>
                                      )
                                    })
                                  }
                                  <Link to='/profile/recruiter/my-jobs'>
                                    <p className="mt-1 text-sm font-semibold text-blue-500 text-end">See all Jobs</p>
                                  </Link>
                                </div>
                                
                                <button onClick={() => navigateTo('/profile/recruiter/post-a-job')} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                                  Post a New Job
                                </button>
                              </div>
                          </div>
                      </div>
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