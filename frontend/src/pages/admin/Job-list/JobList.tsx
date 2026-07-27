import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJobs } from '../../../services/adminServices';
import { IoSearchOutline } from 'react-icons/io5';
import { AdminJobListsData } from '../../../types/entityTypes';
import ReusableTable, { TableColumn } from '../../../components/admin/reusable/Table';
import { formatRelativeTime } from '../../../services/util/formatDate';
import { TbBriefcaseOff } from 'react-icons/tb';
import { CiWarning } from 'react-icons/ci';
import { BiUserX } from 'react-icons/bi';

interface filterType {
  industry:string[]
  jobType:string[]
  locationType:string[]
  minSalary: string
  maxSalary: string
}

export default function Jobs() {
  
  const [jobs, setjobs] = useState<AdminJobListsData[]>([])
  const [search, setsearch] = useState("")
  const [page, setpage] = useState(1)
  const [totalPages, settotalpages] = useState(1)
  const [reportsCount, setReportsCount] = useState(0)
  const [statusFilter, setStatusFilter] = useState<'all' | 'expired' | 'active'>('all')
  
  // const [sort, setsort] = useState('job-latest')
  // const [sortVisibility, setSortVisibility] = useState(false)
  // const [currentSort, setCurrentSort] = useState('job-latest')
  
  const [filter, setFilter] = useState<filterType>({
    industry:[],
    locationType:[],
    jobType:[],
    minSalary:'',
    maxSalary:''
  })

  console.log(typeof setFilter)

  const jobsTableColumn: TableColumn<AdminJobListsData>[] = [
    {
      header: 'JOB TITLE',
      key: 'jobTitle',
      render: (row: AdminJobListsData) => (
        <p className='font-semibold text-xs'>{row.jobTitle}</p>
      )
    },
    {
      header: 'RECRUITER',
      key: 'recruiterName',
      render: (row: AdminJobListsData) => {
        if(row.recruiterName){
          return <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full flex items-center justify-center text-white font-semibold'>{'R'}</div>
          <p className='font-medium text-xs'>{row.recruiterName}</p>
        </div>
        }else{
          return <div className='flex items-center gap-2'>
            <BiUserX />
            <p className='text-xs font-medium'>No Recruiter exist</p>
          </div>
        }
      }
    },
    {
      header: 'COMPANY',
      key: 'companyName',
      render: (row: AdminJobListsData) => (
        <div><p className='font-semibold text-xs'>{row.companyName ? row.companyName : 'N/A'}</p></div>
      )
    },
    {
      header: 'DATE POSTED',
      key: 'createdAt',
      render: (row: AdminJobListsData) => (
        <div><p className='text-xs'>{formatRelativeTime(row.createdAt ?? new Date())}</p></div>
      )
    },
    {
      header:'JOB TYPE',
      key: 'jobType',
      render: (row: AdminJobListsData) => (
        <span className='text-xs bg-blue-200 text-blue-700 font-medium px-2 rounded-md'>{row.jobType}</span>
      )
    },
    {
      header: 'REPORTS',
      key: 'reportsCount',
      render: (row: AdminJobListsData) => (
        <div>
          {row.reportsCount && row?.reportsCount > 0 ? <span>{row.reportsCount}</span> : "-"}
        </div>
      )
    },
    {
      header: 'STATUS',
      key: 'status',
      render: (row: AdminJobListsData) => {
        if(row.status === 'active'){
          return <span className='bg-green-200 text-green-700 text-xs font-medium rounded-md px-2'>{row.status}</span>
        }else if(row.status === 'expired'){
          return <span className='bg-gray-200 text-gray-700 text-xs font-medium rounded-md px-2'>{row.status}</span>
        }else if(row.status === 'blocked'){
          return <span className='bg-red-200 text-red-700 text-xs font-medium rounded-md px-2'>{row.status}</span>
        }
      }
    },
    {
      header: 'ACTIONS',
      key: 'actions',
      render: (row: AdminJobListsData) => (
        <button onClick={() => viewJobDetails(row._id as string)} className='text-blue-500 font-medium'>View Details</button>
      )
    }
  ]

  // const [filterVisibility, setFilterVisibility] = useState(false)

  // const openFilter = () => setFilterVisibility(true)
  // const closeFilter = () => setFilterVisibility(false)


  console.log('This is updated state', filter)

  // function toggleSortVisibility(){
  //   setSortVisibility(prev => !prev)
  // }

  const navigator = useNavigate()

  useEffect(() => {

    async function fetchJobDetails(){
      
        const result = await getJobs(search, page, 5, statusFilter, '', reportsCount)
        console.log('--checking job list from the backend--', result)
        setjobs(result?.result?.jobs)
        settotalpages(result?.result.totalPages)
          
    }

    fetchJobDetails()
  }, [search, page, reportsCount, statusFilter])

  function viewJobDetails(jobId : string){
    navigator(`/admin/job/details/${jobId}`)
  }

  function searchJobs(event : React.ChangeEvent<HTMLInputElement>){
    setsearch(event.target.value)
  }

  function debouncedSearchJobs <T extends (...args: never[]) => void>(fn : T, delay : number){
    let timer : ReturnType<typeof setTimeout>
    return function(...args : Parameters<T>){
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, delay);
    }
  }

  const dSearch = debouncedSearchJobs(searchJobs, 600)

  const toggleReportsCount = () => {
    setReportsCount((prv) => {
      if(prv === 0){
        return 3
      }else{
        return 0
      }
    })
  }

  return (
    <>
      <div className="w-full min-h-screen p-5 lg:p-10 bg-gray-100">
        <p className='text-lg font-medium'>Jobs Management</p>
        <p className='text-xs mt-1 mb-5 text-gray-500'>Monitor & Manage all job postings</p>
        
        <div className="p-3 border border-gray-200 bg-white rounded-md mb-3">
          {/* Main Grid Container */}
          <div className="grid grid-cols-12 gap-4 items-center">
            
            {/* Search Input - Occupies 8 columns on large screens */}
            <div className="col-span-12 lg:col-span-4">
              <div className="border border-gray-200 rounded-md px-3 py-1.5 flex items-center gap-2 bg-white">
                <IoSearchOutline className="text-gray-400" />
                <input 
                  onChange={(event) => dSearch(event)} 
                  type="text" 
                  className="text-xs w-full outline-none bg-transparent" 
                  placeholder="Search jobs" 
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-gray-100 p-1 border border-gray-200 rounded-md grid grid-cols-3 font-medium" style={{fontSize:'0.65rem'}}>
                <button onClick={() => setStatusFilter('all')}  className={`py-1 rounded-md ${statusFilter === 'all' ? "bg-white border border-gray-200 shadow-sm text-black" : "text-gray-400"}`}>All</button>
                <button onClick={() => setStatusFilter('expired')}  className={`py-1 rounded-md ${statusFilter === 'expired' ? "bg-white border border-gray-200 shadow-sm text-black" : "text-gray-400"}`}>Expired</button>
                <button onClick={() => setStatusFilter('active')}  className={`py-1 rounded-md ${statusFilter === 'active' ? "bg-white border border-gray-200 shadow-sm text-black" : "text-gray-400"}`}>Active</button>
              </div>
            </div>
            {/* Filter Toggle - Occupies 4 columns on large screens */}
            <div className="col-span-12 lg:col-span-4">
              <button onClick={toggleReportsCount} className={`flex items-center gap-2 text-xs ${reportsCount >= 3 ? "text-white borde hover:bg-red-800 border-slate-300 bg-red-500" : "text-gray-700 bg-white border border-slate-300 hover:bg-slate-100"} p-2 w-full justify-center rounded-md`}>
                <CiWarning size={20} />
                <p>High risk (3+ Reports)</p>
              </button>
            </div>
      
          </div>
        </div>

        {jobs.length > 0 && (
          <ReusableTable 
          columns={jobsTableColumn}
          data={jobs}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => setpage(page)}
        />
        )}
        {jobs.length === 0 && (
          <div className='flex flex-col items-center gap-2'>
            <TbBriefcaseOff size={40} color='gray' />
            <p className='text-xs text-gray-500'>No Jobs found</p>
          </div>
        )}
      </div>
    </>
  )
}
