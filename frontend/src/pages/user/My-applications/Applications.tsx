import React, { useEffect, useState } from 'react';
import { getMyApplications } from '../../../services/userServices';
import moment from 'moment';
import Swal from 'sweetalert2';
import { MyApplications as Application, MyApplicationsListData } from '../../../types/entityTypes';
import { Link, useNavigate } from 'react-router-dom';
import { PiBriefcase, PiMapPin } from 'react-icons/pi';
import CircularSpinner from '../../../components/common/CircularSpinner';
import { BiChevronDown, BiChevronUp, BiSearch } from 'react-icons/bi';
import { BsArrowLeft, BsSuitcase } from 'react-icons/bs';
import { formattedDateMoment } from '../../../services/util/formatDate';
import { LuFileUser, LuSearch } from 'react-icons/lu';
import { currencyFormatter } from '../../../helpers/Currency.helper';
import { FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const dummyJobs = [
  {
    id: 1,
    title: 'React Native Developer',
    minSalary: 12000,
    maxSalary: 18000,
    jobType: 'Internship',
    createdAt: new Date(),
    status: 'Applied',
    recruiter:{
      company: 'Luma',
      recruiter: 'Unai Emery'
    }
  }
]

export default function MyApplications() {
  const [applications, setApplications] = useState<MyApplicationsListData[]>([]);
  const [totalDocs, setTotalDocs] = useState(0)
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit, setLimit] = useState(5)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'>('all')
  const [sort, setSotr] = useState<'recently-applied' | 'oldest-applied'>('recently-applied')
  const [isFilterMenuOpened, setIsFilterMenuOpened] = useState(false)
  const [isSortMenuOpened, setIsSortMenuOpened] = useState(false)

  const toggleFilterMenuOpen = () => setIsFilterMenuOpened(prv => !prv)
  const toggleSortMenuOpen = () => setIsSortMenuOpened(prv => !prv)

  const navigate = useNavigate()

  const navigatetoJobDetailsPage = (jobId: string) => {
    if(!jobId) return

    navigate(`/jobs/${jobId}`)
  }

  const searchJobApplication = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
  }

  const dbouncedSearch = <T extends (...args: never[]) => void>(fn: T, delay: number) => {
    let timer: ReturnType<typeof setTimeout>
    return function(...args: Parameters<T>){
      clearTimeout(timer)
      timer = setTimeout(() => {
          fn(...args)
      }, delay);
    }
  }

  const dSearch = dbouncedSearch(searchJobApplication, 500)

  const navigateToApplicationDetailsPage = (applicationId: string) => {
    toast.info('redirecting to application tracking page')
    if(!applicationId) return
    navigate(`/profile/my-application/${applicationId}`, {state:{applicationId: applicationId}})
  }
  // function formatLocalDateTime(date?: string) {
  //   return moment(date).format('DD MMM YYYY, h:mm a');
  // }

  useEffect(() => {
    (async function () {
      try {
        const result = await getMyApplications(search, sort, page, limit, status)
        if (result.success) {
          console.log('--checking my application results from backed --', result)
          setApplications(result?.result?.applications)
          setTotalDocs(result?.result?.totalDocs)
          setTotalPages(result?.result?.totalPages)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result?.message || 'Failed to fetch applications.',
          });
          setApplications([]);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred.',
        });
        setApplications([]);
      } finally {
        setLoading(false);
      }
    })()
  }, [search, page, status, sort, limit]);

  const getStatusPhills = (status: string): React.ReactNode => {
    switch(status){
      case 'applied':
        return <span className='bg-blue-200 rounded-full text-xs text-blue-600 px-2'>{status}</span>
      case 'screening':
        return <span className='bg-yellow-200 rounded-full text-xs text-yellow-600 px-2'>{status}</span>
      case 'interview':
        return <span className='bg-orange-200 rounded-full text-xs text-orange-600 px-2'>{status}</span>
      case 'offer':
        return <span className='bg-indigo-200 rounded-full text-xs text-indigo-600 px-2'>{status}</span>
      case 'hired':
        return <span className='bg-green-200 rounded-full text-xs text-green-600 px-2'>{status}</span>
      case 'rejected':
        return <span className='bg-red-200 rounded-full text-xs text-red-600 px-2'>{status}</span>
      default:
        return
    }
  }

  return (
    <>
      <div className='px-5 py-12 lg:px-10'>
        <div>
          <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-xs text-gray p-2 hover:bg-gray-200 rounded-md'>
            <BsArrowLeft size={18} />
            <p>Back</p>
          </button>
          <div>
            <p className='font-semibold text-xl'>My Applications</p>
            <p className='text-xs text-gray-500'>Track and manage your applications</p>
            <p></p>
          </div>
          <div className="mt-5 bg-white w-full grid gap-2 grid-cols-12 rounded-md p-2 border border-slate-200">
            <div className="col-span-12 rounded-md flex items-center gap-2 p-2 bg-gray-100">
              <LuSearch />
              <input onChange={(e) => dSearch(e)} type="text" className='!text-xs w-full' placeholder='Search job title' />
            </div>
            <div className="col-span-6 bg-gray-100 p-2 relative rounded-md">
                <div className="flex items-center justify-between">
                  <p className='text-xs font-medium'>{status}</p>
                  {isFilterMenuOpened
                    ? <button onClick={toggleFilterMenuOpen}><BiChevronUp /></button>
                    : <button onClick={toggleFilterMenuOpen}><BiChevronDown /></button>
                  }
                </div>
                {isFilterMenuOpened && (
                  <div className="absolute w-full bg-white left-0 rounded-md border border-slate-200 rounded shadow">
                      {Array.from(['all', 'applied', 'screening', 'interview', 'offer', 'hired', 'rejected']).map((status) => (
                        <button onClick={() => {setStatus(status); setIsFilterMenuOpened(false)}} className='w-full p-2 text-xs font-medium hover:bg-gray-100'>{status}</button>
                      ))}
                  </div>
                )}
            </div>
            <div className="col-span-6 bg-gray-100 p-2 relative rounded-md">
                <div className="flex items-center justify-between">
                  <p className='text-xs font-medium'>{sort}</p>
                  {isSortMenuOpened
                    ? <button onClick={toggleSortMenuOpen}><BiChevronUp /></button>
                    : <button onClick={toggleSortMenuOpen}><BiChevronDown /></button>
                  }
                </div>
                {isSortMenuOpened && (
                  <div className="absolute w-full bg-white left-0 rounded-md border border-slate-200 rounded shadow">
                      {Array.from(['recently-applied', 'oldest-applied']).map((sort) => (
                        <button onClick={() => {setSotr(sort); setIsSortMenuOpened(false)}} className='w-full p-2 text-xs font-medium hover:bg-gray-100'>{sort}</button>
                      ))}
                  </div>
                )}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2">
              {applications && applications.length > 0 && (
                applications.map((application: MyApplicationsListData) => (
                  <div key={application._id} className='bg-white p-5 flex gap-2 rounded-md border border-slate-200 hover:ring-1 hover:ring-blue-500'>
                    <div>
                      <div className="bg-blue-500 w-13 h-13 rounded-md flex items-center justify-center">
                        <LuFileUser color='white' size={25} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className='font-semibold'>{application.jobDetails?.jobTitle}</p>
                      <p className='text-xs text-gray-700'>{application.companyDetails?.name} | Posted by {application.recruiterDetails?.name}</p>
                      <p className='mt-2 font-semibold'>{currencyFormatter(application.jobDetails?.minSalary, "INR")}</p>
                      <p className='mt-3 text-xs text-gray-500 flex items-center gap-1'><FaClock /> Applied on {formattedDateMoment(application.createdAt, "MMM DD YYYY")}</p>
                      <div className="flex justify-between items-center mt-3">
                        <div>
                          {getStatusPhills(application.status as string)}
                        </div>
                        <div className='space-x-2'>
                          <button onClick={() => navigatetoJobDetailsPage(application.jobDetails?._id as string)} className='px-3 py-2 text-xs font-medium rounded-md border border-slate-300'>View Job</button>
                          <button onClick={() => navigateToApplicationDetailsPage(application._id as string)} className='px-3 py-2 bg-blue-500 text-white text-xs font-medium rounded-md'>View Application</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                
              )}
              {applications.length > 0 && (
                <div className='flex items-center justify-between'>
                  <p className='text-xs text-gray-500'>Showing page {page} of {totalPages} pages</p>
                  <div className='space-x-2'>
                    <button onClick={() => setPage(prv => prv - 1)} disabled={page === 1} className='text-xs bg-white border border-slate-300 px-3 py-1 rounded-md'>Prev</button>
                    <button onClick={() => setPage(prv => prv + 1)} disabled={page >= totalPages} className='text-xs bg-blue-500 text-white px-3 py-1 rounded-md'>Next</button>
                  </div>
                </div>
              )}
          </div>
          {applications.length === 0 && (
            <div className='flex flex-col items-center gap-2'>
              <LuFileUser size={25} color='gray' />
              <p className='text-xs text-gray-500'>No job applications</p>
            </div>
          )}
        </div>
        {/* <p className='font-medium text-lg'>My Applications (3)</p>
        <p className='mt-1 text-xs text-gray-700'>Track and manage your job applications</p>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-3 rounded-md">
          <div className='bg-gray-100 !flex-1 rounded-md flex items-center gap-2 px-3 py-2'>
            <BiSearch color='gray' />
            <input type="text" placeholder='Search by job name, recruiter name' className='w-full' />
          </div>
          <div className='bg-gray-100 px-3 py-2 rounded-md '>
            <select name="" id="" className='w-full outline-none'>
              <option value="All">All</option>
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Screening">Screening</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="mt-5 w-full grid grid-cols-1 gap-3">
          {
            dummyJobs.map((application) => (
              <div key={application.id} className='p-3 border border-gray-200 bg-white rounded-md flex gap-3'>
                <div>
                  <div className="bg-blue-300 rounded-md w-12 h-12 flex items-center justify-center">
                    <PiBriefcase color='white' size={24} />
                  </div>
                </div>
                <div className='flex-1'>
                  
                    <p className='font-medium'>{application.title}</p>
                    <p className="text-sm font-light text-gray-700 ">Posted by {application.recruiter.company} | {application.recruiter.recruiter}</p>
                    <p className="mt-2 text-xs text-gray-500 font-light">{application.minSalary} - {application.maxSalary}</p>
                    <p className="mt-2 mb-2 text-xs text-gray-500 font-medium">Applied on {formattedDateMoment(application.createdAt, "MMM DD YYYY")}</p>
                    

                    <div className='flex items-end justify-between text-xs gap-2'>
                      {getStatusPhills(application.status)}
                    <div className='space-x-2'>
                      <button className='bg-white border border-gray-300 px-2 py-1 rounded-md text-gray-700'>View Job</button>
                    <button className='bg-blue-500 py-1 text-white px-2 rounded-md'>View Application</button>
                    </div>
                  </div>
                  
                </div>
              </div>
            ))
          }
        </div>
        <div className="mt-4 pagination w-full flex justify-center gap-2 items-center">
            <button disabled={page <= 1 ? true : false} className={`text-xs ${page > 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'} w-8 h-7 rounded-md`}>Prev</button>
            <div className="space-x-2">
              {
              pagination.map((p: number, index: number) => (
                <button className={`text-xs ${page === index + 1 ? 'bg-white text-blue-500 border border-gray-200' : 'bg-blue-500 text-white'} rounded-md w-8 h-7`}>{index + 1}</button>
              ))
            }
            </div>
            <button disabled={page >= totalPages ? true : false} className={`text-xs ${page < totalPages ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'} w-8 h-7 rounded-md`}>Next</button>
        </div> */}
      </div>
    </>
    // <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
    //   <h1 className="text-2xl font-bold text-gray-800">My Applications ({applications?.length || 0})</h1>

    //   {loading ? (
    //     <div className="flex justify-center items-center h-64">
    //       <CircularSpinner size={50} color="blue" />
    //     </div>
    //   ) : applications && applications.length > 0 ? (
    //     <div className="mt-6 overflow-x-auto">
    //       <table className="min-w-full bg-white border border-gray-200">
    //         <thead className="bg-gray-50">
    //           <tr>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
    //           </tr>
    //         </thead>
    //         <tbody className="divide-y divide-gray-200">
    //           {applications.map((app: Application) => (
    //             <tr key={app._id} className="hover:bg-gray-50 transition-colors duration-200">
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <div className="flex items-center gap-4">
    //                   <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-blue-100 rounded-lg">
    //                     <PiBriefcase className="h-6 w-6 text-blue-600" />
    //                   </div>
    //                   <div>
    //                     <div className="text-sm font-medium text-gray-900">{app.jobDetails?.jobTitle}</div>
    //                     <div className="text-sm text-gray-500">
    //                         <span>Posted by {app.recruiterUserProfile.name} | {app.recruiterProfile.organizationDetails?.organizationName}</span>
    //                         <div className='flex items-center gap-2'>
    //                             <PiMapPin />
    //                             <p>{app.jobDetails.workMode} {app.jobDetails.workMode === 'On-site' ? `- ${app.jobDetails.location}` : ''}</p>
    //                         </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatLocalDateTime(app.createdAt)}</td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(app.status)}`}>
    //                   {app.status}
    //                 </span>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
    //                 <Link to={`/jobs/${app.jobDetails?._id}`} className="text-blue-600 hover:text-blue-900">
    //                   View Job
    //                 </Link>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   ) : (
    //     <div className="text-center py-16 px-4">
    //       <PiBriefcase className="mx-auto h-12 w-12 text-gray-400" />
    //       <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
    //       <p className="mt-1 text-sm text-gray-500">You have not applied for any jobs yet.</p>
    //       <div className="mt-6">
    //         <Link
    //           to="/jobs"
    //           className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    //         >
    //           Find Jobs
    //         </Link>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}