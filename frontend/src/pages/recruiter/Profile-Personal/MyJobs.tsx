import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteJob, getJobs } from "../../../services/recruiterServices";
import defaultProfile from '/default-img-instagram.png';
import { Notify } from "notiflix";
import Loader from "../../../components/candidate/Loader";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { BiBriefcase, BiMapPin, BiTrash } from "react-icons/bi";
import { BsClock, BsEye, BsPencilSquare } from "react-icons/bs";
import { MyJobData } from "../../../types/entityTypes";
import moment from "moment";
import getReminingDays from "../../../helpers/DateTime.helper";

///Experimental
interface Job {
    _id: string;
    jobTitle: string;
    workMode: 'On-site' | 'Remote' | 'Hybrid';
    location?: string;
    status: 'draft' | 'active' | 'expired' | 'closed' | 'rejected' | 'blocked';
    applicationsCount: number;
    expiresAt: string;
    logo?: string;
    createdAt: string;
}

function debouncedSearch(fn: Function, delay: number) {
    let timer: NodeJS.Timeout;
    return function (...args: any) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    }
}

export default function MyJobs() {

    const [myJobs, setMyJobs] = useState<MyJobData[]>([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [statusFilter, setStatusFilter] = useState<'all' | 'expired' | 'active'>('all')
    const [workModeFilter, setWorkModeFilter] = useState<'all' | 'On-site' | 'Remote' | 'Hybrid'>('all')

    const searchByJobTitle = (e: any) => {
        console.log('the value being entered', e.target.value)
        setSearch(e.target.value)
    }

    const navigate = useNavigate()

    const searchWhileTyping = useCallback(debouncedSearch(searchByJobTitle, 500), []);

      
  useEffect(() => {
    async function fetchRecruiterJobs() {
            setLoading(true);
            try {
                const result = await getJobs(search, page, limit, '', statusFilter, workModeFilter)
                if (result?.success) {
                    console.log('jobs paginated', result.result)
                    setMyJobs(result.result?.jobs);
                    setTotalPages(result.result?.totalPages)
                    //setPage(result?.result?.page)
                } else {
                    Notify.failure(result?.message || "Could not fetch jobs.");
                }
            } catch (error: unknown) {
                Notify.failure("An error occurred while fetching jobs.");
            } finally {
                setLoading(false);
            }
        }

        fetchRecruiterJobs()

  }, [search, page, statusFilter, workModeFilter])

  

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Job Postings</h1>
          <button onClick={() => navigate('/profile/recruiter/post-a-job')} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm">
            <FaPlus size={20} /> Post a new job
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search by Title</label>
            <input onKeyUp={(e) => searchWhileTyping(e)} type="text" placeholder="e.g. Software Engineer" className="w-full bg-gray-100 border-none rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full bg-gray-100 border-none rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500">
              <option value={'all'}>All Statuses</option>
              <option value={'active'}>Active</option>
              <option value={'expired'}>Expired</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work mode</label>
            <select onChange={(e) => setWorkModeFilter(e.target.value)} className="w-full bg-gray-100 border-none rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500">
              <option value={'all'}>All Modes</option>
              <option value={'Remote'}>Remote</option>
              <option value={'On-site'}>On-site</option>
              <option value={'Hybrid'}>Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
            <select className="w-full bg-gray-100 border-none rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500">
              <option>Date Posted (Newest)</option>
              <option>Most Applicants</option>
            </select>
          </div>
        </div>

        {/* Job List */}
        <div className="space-y-4">
          {myJobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>Showing {page} of {totalPages} pages</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(prv => prv - 1)} disabled={page === 1} className={`px-3 py-1 border rounded-md hover:bg-white flex items-center gap-1`}><CgChevronLeft size={16}/> Previous</button>
            <button onClick={() => setPage(prv => prv + 1)} disabled={page >= totalPages} className={`px-3 py-1 border rounded-md hover:bg-white flex items-center gap-1`}>Next <CgChevronRight size={16}/></button>
          </div>
        </div>
      </div>
    </div>
  );

  
    // const [jobs, setJobs] = useState<Job[]>([]);
    // const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    // const [searchTerm, setSearchTerm] = useState('');
    // const [sortBy, setSortBy] = useState('Newest');
    // const [filterStatus, setFilterStatus] = useState('all');
    // const [filterWorkMode, setFilterWorkMode] = useState('all');
    // const [page, setPage] = useState(1)
    // const [totalPages, setTotalPages] = useState(1)
    // const [loading, setLoading] = useState(false);
    // const navigator = useNavigate();

    // const searchByJobTitle = (e: any) => {
    //     console.log('the value being entered', e.target.value)
    //     setSearchTerm(e.target.value)
    // }

    // const searchWhileTyping = useCallback(debouncedSearch(searchByJobTitle, 500), []);

    // useEffect(() => {

    //     async function fetchRecruiterJobs() {
    //         setLoading(true);
    //         try {
    //             const result = await getJobs(searchTerm, page, 3, sortBy, filterStatus, filterWorkMode)
    //             if (result?.success) {
    //                 console.log('jobs paginated', result.result)
    //                 setJobs(result.result?.jobs);
    //                 setTotalPages(result.result?.totalPages)
    //                 //setPage(result?.result?.page)
    //             } else {
    //                 Notify.failure(result?.message || "Could not fetch jobs.");
    //             }
    //         } catch (error: unknown) {
    //             Notify.failure("An error occurred while fetching jobs.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     fetchRecruiterJobs();
    // }, [searchTerm, sortBy, filterStatus, filterWorkMode, page]);

    // // useEffect(() => {
    // //     let processedJobs = [...jobs];

    // //     // Filtering
    // //     if (searchTerm) {
    // //         processedJobs = processedJobs.filter(job =>
    // //             job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    // //         );
    // //     }
    // //     if (filterStatus !== 'all') {
    // //         processedJobs = processedJobs.filter(job => job.status === filterStatus);
    // //     }
    // //     if (filterWorkMode !== 'all') {
    // //         processedJobs = processedJobs.filter(job => job.workMode === filterWorkMode);
    // //     }

    // //     // Sorting
    // //     processedJobs.sort((a, b) => {
    // //         switch (sortBy) {
    // //             case 'newest':
    // //                 return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    // //             case 'oldest':
    // //                 return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    // //             case 'expiry':
    // //                 return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
    // //             case 'applicants-most':
    // //                 return (b.applicationsCount || 0) - (a.applicationsCount || 0);
    // //             case 'applicants-least':
    // //                 return (a.applicationsCount || 0) - (b.applicationsCount || 0);
    // //             default:
    // //                 return 0;
    // //         }
    // //     });

    // //     setFilteredJobs(processedJobs);
    // // }, [jobs, searchTerm, sortBy, filterStatus, filterWorkMode]);

    // const handleResetFilters = () => {
    //     setSearchTerm('');
    //     setSortBy('newest');
    //     setFilterStatus('all');
    //     setFilterWorkMode('all');
    // };


    // function getRemainingDays(expDate: Date | string): number {
    //     const expiryDate = new Date(expDate);
    //     const currentDate = new Date();
    //     const millSec = expiryDate.getTime() - currentDate.getTime();
    //     const days = Math.ceil(millSec / (1000 * 60 * 60 * 24));
    //     return days > 0 ? days : 0;
    // }

    // const getStatusPill = (status: Job['status']) => {
    //     switch (status) {
    //         case 'active':
    //             return <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Active</span>;
    //         case 'expired':
    //             return <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 text-xs font-medium px-2.5 py-1 rounded-full"><span className="w-2 h-2 bg-yellow-500 rounded-full"></span>Expired</span>;
    //         case 'closed':
    //             return <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full"><span className="w-2 h-2 bg-gray-500 rounded-full"></span>Closed</span>;
    //         case 'blocked':
    //         case 'rejected':
    //             return <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-medium px-2.5 py-1 rounded-full"><span className="w-2 h-2 bg-red-500 rounded-full"></span>Blocked</span>;
    //         default:
    //             return <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full"><span className="w-2 h-2 bg-purple-500 rounded-full"></span>Draft</span>;
    //     }
    // };

    // function navigateToJobEditPage(jobId: string){
    //     const editableJob = jobs.find(job => job._id === jobId)
    //     navigator('/profile/recruiter/edit-job', {state:{jobData:editableJob}})
    // }

    // async function deleteJobByRecruiter(jobId: string){
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText:'Delete Job',
    //         allowOutsideClick:false,
    //         allowEscapeKey:false
    //     }).then(async (response) => {
    //         if(response.isConfirmed){
    //             try {
    //                 const result = await deleteJob(jobId)
    //                 if(result?.success){
    //                     Notify.success(result?.message, {timeout:2000})
    //                     setJobs(prv => prv.filter(job => job._id !== jobId))
    //                 }else{
    //                     Notify.failure(result?.message, {timeout:2000})
    //                 }
    //             } catch (error: unknown) {
    //                 Notify.failure('Something went wrong', {timeout:2000})
    //             }
    //         }else{
    //             return
    //         }
    //     })
        
    // }

    // return (
    //     <>
    //         {loading && <Loader />}
    //         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    //             <div className="flex justify-between items-center mb-6">
    //                 <h1 className="text-2xl font-bold text-gray-800">My Job Postings</h1>
    //                 <button onClick={() => navigator('/profile/recruiter/post-a-job')} className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
    //                     Post a New Job
    //                 </button>
    //             </div>

    //             {/* Filter and Sort Controls */}
    //             <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
    //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
    //                     {/* Search */}
    //                     <div className="lg:col-span-2">
    //                         <label htmlFor="search-job" className="block text-sm font-medium text-gray-700 mb-1">Search by Title</label>
    //                         <input
    //                             type="text"
    //                             id="search-job"
    //                             onKeyUp={(event) => searchWhileTyping(event)}
    //                             placeholder="e.g., Software Engineer"
    //                             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
    //                         />
    //                     </div>
    //                     {/* Filter by Status */}
    //                     <div>
    //                         <label htmlFor="filter-status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
    //                         <select id="filter-status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
    //                             <option value="all">All Statuses</option>
    //                             <option value="active">Active</option>
    //                             <option value="draft">Draft</option>
    //                             <option value="expired">Expired</option>
    //                             <option value="closed">Closed</option>
    //                             <option value="blocked">Blocked</option>
    //                         </select>
    //                     </div>
    //                     {/* Filter by Work Mode */}
    //                     <div>
    //                         <label htmlFor="filter-work-mode" className="block text-sm font-medium text-gray-700 mb-1">Work Mode</label>
    //                         <select id="filter-work-mode" value={filterWorkMode} onChange={(e) => setFilterWorkMode(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
    //                             <option value="all">All Modes</option>
    //                             <option value="On-site">On-site</option>
    //                             <option value="Remote">Remote</option>
    //                             <option value="Hybrid">Hybrid</option>
    //                         </select>
    //                     </div>
    //                     {/* Sort By */}
    //                     <div>
    //                         <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
    //                         <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
    //                             <option value="Newest">Date Posted (Newest)</option>
    //                             <option value="Oldest">Date Posted (Oldest)</option>
    //                             <option value="Expiry">Expiry Date</option>
    //                             <option value="Application-most">Applicants (Most)</option>
    //                             <option value="Application-least">Applicants (Least)</option>
    //                         </select>
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    //                 {jobs.length > 0 ? (
    //                     <div className="space-y-4">
    //                         {jobs.map((job) => (
    //                             <div key={job._id} className="grid grid-cols-12 items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
    //                                 <div className="col-span-12 md:col-span-5 flex items-center gap-4">
    //                                     <img src={job.logo || defaultProfile} className="w-12 h-12 rounded-lg object-cover" alt="Company Logo" />
    //                                     <div>
    //                                         <p className="font-semibold text-gray-800 text-lg">{job.jobTitle}</p>
    //                                         <div className="flex items-center text-sm text-gray-500 gap-3 mt-1">
    //                                             <span className="inline-flex items-center gap-1"><i className="fa-solid fa-location-dot text-xs"></i> {job.workMode === 'Remote' ? 'Remote' : job.location}</span>
    //                                             <span className="inline-flex items-center gap-1"><i className="fa-solid fa-clock text-xs"></i> {getRemainingDays(job.expiresAt)} days left</span>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                                 <div className="col-span-6 md:col-span-2 flex items-center justify-start md:justify-center mt-3 md:mt-0">
    //                                     {getStatusPill(job.status)}
    //                                 </div>
    //                                 <div className="col-span-6 md:col-span-2 flex items-center justify-start md:justify-center mt-3 md:mt-0">
    //                                     <p className="text-gray-700 font-medium text-sm">{job.applicationsCount || 0} Applicants</p>
    //                                 </div>
    //                                 <div className="col-span-12 md:col-span-3 flex justify-end items-center gap-2 mt-4 md:mt-0">
    //                                     <button onClick={() => navigator(`/recruiter/profile/applications/${job._id}`)} className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
    //                                         View Applicants
    //                                     </button>
    //                                     <button onClick={() => navigateToJobEditPage(job?._id)} className="text-gray-500 hover:text-gray-700 p-2"><i className="fa-solid fa-pen-to-square"></i></button>
    //                                     <button onClick={() => deleteJobByRecruiter(job?._id)} className="text-red-500 hover:text-red-700 p-2"><i className="fa-solid fa-trash"></i></button>
    //                                 </div>
    //                             </div>
    //                         ))}
    //                     </div>
    //                 ) : (
    //                     <div className="text-center py-12">
    //                         <i className="fa-solid fa-folder-open text-4xl text-gray-400 mb-4"></i>
    //                         <h3 className="text-xl font-semibold text-gray-700">No Jobs Posted Yet</h3>
    //                         <p className="text-gray-500 mt-2">Start by posting a new job to find your next great hire.</p>
    //                         {jobs.length > 0 && (
    //                             <button onClick={handleResetFilters} className="mt-4 text-sm text-blue-600 hover:underline">Clear filters and try again</button>
    //                         )}
    //                     </div>
    //                 )}
    //             </div>
    //         </div>
    //     </>
    // );
}


const JobCard = ({ job }: {job: MyJobData}) => {
  const isExpired = job.status === 'expired';

  return (
    <div className="bg-white rounded-xl p-6 mb-4 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-start space-x-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <BiBriefcase className="w-6 h-6 text-gray-400" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-semibold text-gray-800">{job.jobTitle}</h3>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              isExpired ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
            }`}>
              {job.status}
            </span>
            <span className="text-sm text-gray-500 font-medium">{job.applicationsCount} Applicants</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span className="flex items-center gap-1"><BiMapPin size={14} /> {job.location}</span>
            <span className="flex items-center gap-1"><BsClock size={14} /> {getReminingDays(job.expiresAt)} days left</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              View Applications
            </button>
            <button className="p-2 border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50"><BsPencilSquare size={16} /></button>
            <button className="p-2 border border-gray-200 rounded-md text-red-400 hover:bg-red-50"><BiTrash size={16} /></button>
            <button className="p-2 border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50"><BsEye size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};