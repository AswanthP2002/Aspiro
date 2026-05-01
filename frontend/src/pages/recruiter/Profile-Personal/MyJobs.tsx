import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteJob, getJobs, getPostedJobDetails } from "../../../services/recruiterServices";
import { Notify } from "notiflix";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { BiBriefcase, BiMapPin, BiTrash } from "react-icons/bi";
import { BsClock, BsEye, BsPencilSquare } from "react-icons/bs";
import { MyJobData, RecruiterJobDetailsData } from "../../../types/entityTypes";
import moment from "moment";
import getReminingDays from "../../../helpers/DateTime.helper";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Box, IconButton, Modal, Skeleton } from "@mui/material";
import { FiAward, FiCalendar, FiClock, FiEye, FiLayers, FiMapPin, FiUserCheck, FiX } from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { LuCirclePlus } from "react-icons/lu";



function debouncedSearch <T extends (...args: never[]) => void>(fn: T, delay: number) {
    let timer: ReturnType<typeof setTimeout>
    return function (...args: Parameters<T>) {
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
    const [isJobViewModalOpened, setIsJobViewModalOpened] = useState(false)
    const [selectedJobId, setSelectedJobId] = useState('')

    const openJobViewModal = (jobId: string) => {
      setSelectedJobId(jobId)
      setIsJobViewModalOpened(true)
    }
    const closeJobViewModal = () => {
      setIsJobViewModalOpened(false)
      setSelectedJobId('')
    }

    const searchByJobTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('the value being entered', e.target.value)
        setSearch(e.target.value)
    }

    const navigate = useNavigate()

    const searchWhileTyping = useCallback(debouncedSearch(searchByJobTitle, 500), []);

    async function deleteJobByRecruiter(jobId: string){
        Swal.fire({
            title: 'Delete this job?',
            text: "Are you sure to delete this job. This action can not be redo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText:'Delete Job',
            allowOutsideClick:false,
            allowEscapeKey:false
        }).then(async (response) => {
            if(response.isConfirmed){
                try {
                    const result = await toast.promise(
                      deleteJob(jobId),
                      {
                        pending: 'Deleting job...',
                        success: 'Job Deleted',
                        error:{
                          render(props){
                            const data = props.data as AxiosError<{message: string}>
                            return data.message
                          }
                        }
                      }
                    )
                    if(result?.success){
                        setMyJobs((prv: MyJobData[]) => prv.filter((job: MyJobData) => job._id !== jobId))
                    }
                } catch (error: unknown) {
                    toast.error(error instanceof Error ? error.message : 'Something went wrong')
                }
            }else{
                return
            }
        })
    }

    function navigateToJobEditPage(jobId: string){
        const editableJob = myJobs.find(job => job._id === jobId)
        navigate('/profile/recruiter/edit-job', {state:{jobData:editableJob}})
    }

      
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
    <>
    <div className="min-h-screen bg-gray-50 px-5 py-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-gray-900 tracking-wide">My Job Postings</h1>
          <button onClick={() => navigate('/profile/recruiter/post-a-job')} className="border border-transparent shadow-[0_0_30px_2px_rgba(0,0,200,0.1)] px-5 py-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 text-white font-semibold text-sm">
            <LuCirclePlus size={20} /> Post a new job
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <JobCard key={job._id} job={job} deleteJob={deleteJobByRecruiter} viewJob={() => openJobViewModal(job._id as string)} editJob={() => navigateToJobEditPage(job._id as string)} />
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

    {isJobViewModalOpened && (<TestJobModal open={isJobViewModalOpened} onClose={closeJobViewModal} jobId={selectedJobId} />)}
    </>
  );
}


const JobCard = ({ job, deleteJob, viewJob, editJob }: {job: MyJobData, deleteJob: (jobId: string) => void, viewJob: () => void, editJob: () => void}) => {
  const isExpired = job.status === 'expired';
  const navigate = useNavigate()


  const navigateToApplicantsManagePage = (jobId: string) => {
      navigate(`/profile/recruiter/applications/${jobId}`, {state: {jobId}})
    }

  return (
    <div className="bg-white rounded-lg p-6 mb-4 shadow-[0_0_30px_2px_rgba(0,0,200,0.1)] hover:shadow-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-start space-x-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <BiBriefcase className="w-6 h-6 text-gray-400" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-semibold text-gray-800 tracking-wide">{job.jobTitle}</h3>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              isExpired ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
            }`}>
              {job.status}
            </span>
            <span className="text-sm text-gray-500 font-medium">{job.applicationsCount} Applicants</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span className="flex items-center gap-1"><BiMapPin size={14} /> {job.location ? job.location : job.workMode}</span>
            <span className="flex items-center gap-1"><BsClock size={14} /> {getReminingDays(job.expiresAt)} days left</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button onClick={() => navigateToApplicantsManagePage(job._id as string)} className="border text-sm font-medium bg-gradient-to-br from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-lg shadow-[0_0_30px_2px_rgba(0,0,230,0.1)] transition-colors duration-300">
              View Applications
            </button>
            <button onClick={editJob} className="p-2 border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50"><BsPencilSquare size={16} /></button>
            <button onClick={() => deleteJob(job._id as string)} className="p-2 border border-gray-200 rounded-md text-red-400 hover:bg-red-50"><BiTrash size={16} /></button>
            <button onClick={viewJob} className="p-2 border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50"><BsEye size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};


function TestJobModal({open, onClose, jobId}: {open: boolean, onClose: () => void, jobId: string}){
  const [loading, setLoading] = useState(false)
  const [jobDetails, setJobDetails] = useState<RecruiterJobDetailsData | null >(null)

  useEffect(() => {
    setLoading(true)
    async function fetchJobDetails(){
      try {
        const result = await getPostedJobDetails(jobId)
        if(result.success){
          console.log('resul')
          setTimeout(() => {
            setJobDetails(result?.result)
            setLoading(false)
          }, 2000)
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      } 
    }

    fetchJobDetails()
  }, [])
  return(
    <Modal open={open} onClose={onClose} className="flex items-center justify-center p-4">
      <Box className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl outline-none overflow-hidden flex flex-col">
        
        {/* Header Section */}
        <div className="relative p-6 border-b border-gray-100 bg-slate-50/50">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {loading
                  ? <Skeleton width={100} />
                  : <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                      {jobDetails?.jobLevel}
                    </span>
                }
                {loading
                  ? null
                  : <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider">
                      {jobDetails?.jobType}
                    </span>
                }
              </div>
              {loading ? <Skeleton width={300} /> : <h2 className="text-2xl font-black text-gray-900 leading-tight mt-2 italic">{jobDetails?.jobTitle}</h2>}
              {loading
                ? <Skeleton height={12} />
                : <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5"><FiMapPin className="text-blue-500" /> {jobDetails?.workMode} {jobDetails?.location && `• ${jobDetails.location}`}</span>
                    <span className="flex items-center gap-1.5"><FaIndianRupeeSign className="text-emerald-500" /> {jobDetails?.minSalary}/{jobDetails?.salaryPeriod}</span>
                    <span className="flex items-center gap-1.5"><FiClock className="text-amber-500" /> {jobDetails?.duration || 'N/A'}</span>
                  </div>
              }
            </div>
            <IconButton onClick={onClose} className="hover:bg-gray-200 transition-colors">
              <FiX size={20} />
            </IconButton>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Body (Left 2/3) */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              {loading
                ? <Skeleton width={150} />
                : <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-blue-600 rounded-full" /> Job Description
                  </h4>
              }
              {loading
                ? <Skeleton />
                : <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{jobDetails?.description}</p>
              }
            </section>

            <section>
              {loading
                ? <Skeleton width={150} />
                : <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-blue-600 rounded-full" /> Key Responsibilities
                  </h4>
              }
              {loading
                ? <Skeleton />
                : <ul className="grid grid-cols-1 gap-2">
                {jobDetails?.responsibilities.split(".").map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600">
                    <span className="text-blue-500 font-bold">•</span> {item}
                  </li>
                ))}
              </ul>
              }
            </section>

            <section>
              {loading
                ? <Skeleton width={150} />
                : <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-blue-600 rounded-full" /> Required Skills
                  </h4>
              }
              {loading
                ? <Skeleton />
                : <div className="flex flex-wrap gap-2">
                {jobDetails?.requiredSkills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-900 text-white text-[11px] font-bold rounded-md">
                    {skill}
                  </span>
                ))}
                {jobDetails?.optionalSkills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] font-medium rounded-md">
                    {skill} (Optional)
                  </span>
                ))}
              </div>
              }
            </section>
          </div>

          {/* Sidebar (Right 1/3) */}
          <div className="space-y-6">
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
              {loading
                ? <Skeleton width={150} />
                : <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">Candidate Profile</h4>
              }
              
              {loading
                ? <Skeleton />
                : <div className="flex items-center gap-3">
                <FiAward className="text-blue-500" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Qualification</p>
                  <p className="text-xs font-bold text-gray-700">{jobDetails?.qualification}</p>
                </div>
              </div>
              }

              {loading
                ? <Skeleton />
                : <div className="flex items-center gap-3">
                <FiLayers className="text-blue-500" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Experience</p>
                  <p className="text-xs font-bold text-gray-700">{jobDetails?.experienceInYears} Years</p>
                </div>
              </div>
              }

              {loading
                ? <Skeleton />
                : <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <FiCalendar className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Posted On</p>
                  <p className="text-xs font-medium text-gray-600">{moment(jobDetails?.createdAt).format('MMM DD, YYYY')}</p>
                </div>
              </div>
              }

              {loading
                ? <Skeleton />
                : <div className="flex items-center gap-3">
                <FiCalendar className="text-red-400" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold text-red-400">Expires At</p>
                  <p className="text-xs font-bold text-red-600">{moment(jobDetails?.expiresAt).format('MMM DD, YYYY')}</p>
                </div>
              </div>
              }
            </div>
            {loading
              ? <Skeleton />
              : <>
                  <div className="flex items-center gap-4 py-3 px-4 bg-slate-50/80 rounded-xl border border-slate-100 w-fit">
  {/* Views Count */}
  <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
    <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
      <FiEye size={16} />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">
        Views
      </span>
      <span className="text-sm font-bold text-slate-700">{jobDetails?.views || 0}</span>
    </div>
  </div>

  {/* Applications Count */}
  <div className="flex items-center gap-2">
    <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600">
      <FiUserCheck size={16} />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">
        Applications
      </span>
      <span className="text-sm font-bold text-slate-700">{jobDetails?.applicationsCount || 0}</span>
    </div>
  </div>
</div>
                </>
            }
          </div>
        </div>
      </Box>
    </Modal>
  )
}