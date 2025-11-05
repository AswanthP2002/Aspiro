import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteJob, getJobs } from "../../../services/recruiterServices";
import defaultProfile from '/default-img-instagram.png';
import { Notify } from "notiflix";
import Loader from "../../../components/candidate/Loader";
import Swal from "sweetalert2";

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
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('Newest');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterWorkMode, setFilterWorkMode] = useState('all');
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();

    const searchByJobTitle = (e: any) => {
        console.log('the value being entered', e.target.value)
        setSearchTerm(e.target.value)
    }

    const searchWhileTyping = useCallback(debouncedSearch(searchByJobTitle, 500), []);

    useEffect(() => {

        async function fetchRecruiterJobs() {
            setLoading(true);
            try {
                const result = await getJobs(searchTerm, page, 3, sortBy, filterStatus, filterWorkMode)
                if (result?.success) {
                    console.log('jobs paginated', result.result)
                    setJobs(result.result?.jobs);
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

        fetchRecruiterJobs();
    }, [searchTerm, sortBy, filterStatus, filterWorkMode, page]);

    // useEffect(() => {
    //     let processedJobs = [...jobs];

    //     // Filtering
    //     if (searchTerm) {
    //         processedJobs = processedJobs.filter(job =>
    //             job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    //         );
    //     }
    //     if (filterStatus !== 'all') {
    //         processedJobs = processedJobs.filter(job => job.status === filterStatus);
    //     }
    //     if (filterWorkMode !== 'all') {
    //         processedJobs = processedJobs.filter(job => job.workMode === filterWorkMode);
    //     }

    //     // Sorting
    //     processedJobs.sort((a, b) => {
    //         switch (sortBy) {
    //             case 'newest':
    //                 return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    //             case 'oldest':
    //                 return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    //             case 'expiry':
    //                 return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
    //             case 'applicants-most':
    //                 return (b.applicationsCount || 0) - (a.applicationsCount || 0);
    //             case 'applicants-least':
    //                 return (a.applicationsCount || 0) - (b.applicationsCount || 0);
    //             default:
    //                 return 0;
    //         }
    //     });

    //     setFilteredJobs(processedJobs);
    // }, [jobs, searchTerm, sortBy, filterStatus, filterWorkMode]);

    const handleResetFilters = () => {
        setSearchTerm('');
        setSortBy('newest');
        setFilterStatus('all');
        setFilterWorkMode('all');
    };


    function getRemainingDays(expDate: Date | string): number {
        const expiryDate = new Date(expDate);
        const currentDate = new Date();
        const millSec = expiryDate.getTime() - currentDate.getTime();
        const days = Math.ceil(millSec / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 0;
    }

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

    function navigateToJobEditPage(jobId: string){
        const editableJob = jobs.find(job => job._id === jobId)
        navigator('/profile/recruiter/edit-job', {state:{jobData:editableJob}})
    }

    async function deleteJobByRecruiter(jobId: string){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText:'Delete Job',
            allowOutsideClick:false,
            allowEscapeKey:false
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result = await deleteJob(jobId)
                    if(result?.success){
                        Notify.success(result?.message, {timeout:2000})
                        setJobs(prv => prv.filter(job => job._id !== jobId))
                    }else{
                        Notify.failure(result?.message, {timeout:2000})
                    }
                } catch (error: unknown) {
                    Notify.failure('Something went wrong', {timeout:2000})
                }
            }else{
                return
            }
        })
        
    }

    return (
        <>
            {loading && <Loader />}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">My Job Postings</h1>
                    <button onClick={() => navigator('/profile/recruiter/post-a-job')} className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Post a New Job
                    </button>
                </div>

                {/* Filter and Sort Controls */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <label htmlFor="search-job" className="block text-sm font-medium text-gray-700 mb-1">Search by Title</label>
                            <input
                                type="text"
                                id="search-job"
                                onKeyUp={(event) => searchWhileTyping(event)}
                                placeholder="e.g., Software Engineer"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                        </div>
                        {/* Filter by Status */}
                        <div>
                            <label htmlFor="filter-status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select id="filter-status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
                                <option value="all">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="draft">Draft</option>
                                <option value="expired">Expired</option>
                                <option value="closed">Closed</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>
                        {/* Filter by Work Mode */}
                        <div>
                            <label htmlFor="filter-work-mode" className="block text-sm font-medium text-gray-700 mb-1">Work Mode</label>
                            <select id="filter-work-mode" value={filterWorkMode} onChange={(e) => setFilterWorkMode(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
                                <option value="all">All Modes</option>
                                <option value="On-site">On-site</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                        {/* Sort By */}
                        <div>
                            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                            <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
                                <option value="Newest">Date Posted (Newest)</option>
                                <option value="Oldest">Date Posted (Oldest)</option>
                                <option value="Expiry">Expiry Date</option>
                                <option value="Application-most">Applicants (Most)</option>
                                <option value="Application-least">Applicants (Least)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    {jobs.length > 0 ? (
                        <div className="space-y-4">
                            {jobs.map((job) => (
                                <div key={job._id} className="grid grid-cols-12 items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                    <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                                        <img src={job.logo || defaultProfile} className="w-12 h-12 rounded-lg object-cover" alt="Company Logo" />
                                        <div>
                                            <p className="font-semibold text-gray-800 text-lg">{job.jobTitle}</p>
                                            <div className="flex items-center text-sm text-gray-500 gap-3 mt-1">
                                                <span className="inline-flex items-center gap-1"><i className="fa-solid fa-location-dot text-xs"></i> {job.workMode === 'Remote' ? 'Remote' : job.location}</span>
                                                <span className="inline-flex items-center gap-1"><i className="fa-solid fa-clock text-xs"></i> {getRemainingDays(job.expiresAt)} days left</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-2 flex items-center justify-start md:justify-center mt-3 md:mt-0">
                                        {getStatusPill(job.status)}
                                    </div>
                                    <div className="col-span-6 md:col-span-2 flex items-center justify-start md:justify-center mt-3 md:mt-0">
                                        <p className="text-gray-700 font-medium text-sm">{job.applicationsCount || 0} Applicants</p>
                                    </div>
                                    <div className="col-span-12 md:col-span-3 flex justify-end items-center gap-2 mt-4 md:mt-0">
                                        <button onClick={() => navigator(`/recruiter/profile/applications/${job._id}`)} className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
                                            View Applicants
                                        </button>
                                        <button onClick={() => navigateToJobEditPage(job?._id)} className="text-gray-500 hover:text-gray-700 p-2"><i className="fa-solid fa-pen-to-square"></i></button>
                                        <button onClick={() => deleteJobByRecruiter(job?._id)} className="text-red-500 hover:text-red-700 p-2"><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <i className="fa-solid fa-folder-open text-4xl text-gray-400 mb-4"></i>
                            <h3 className="text-xl font-semibold text-gray-700">No Jobs Posted Yet</h3>
                            <p className="text-gray-500 mt-2">Start by posting a new job to find your next great hire.</p>
                            {jobs.length > 0 && (
                                <button onClick={handleResetFilters} className="mt-4 text-sm text-blue-600 hover:underline">Clear filters and try again</button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
