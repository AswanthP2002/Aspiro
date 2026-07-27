import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecruiters } from '../../../services/recruiterServices';
import { Notify } from 'notiflix';
import { AdminRecruiterListData } from '../../../types/entityTypes';
import { IoSearchOutline } from 'react-icons/io5';
import ReusableTable, { TableColumn } from '../../../components/admin/reusable/Table';
import { FaUsersSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Recruiters() {
  const [recruiters, setRecruiters] = useState<AdminRecruiterListData[]>([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [search, setSearch] = useState<string>('')
  const [recruiterType, setRecruiterType] = useState<'all' | 'corporate' | 'freelance'>('all')
  const [recruiterStatus, setRecruiterStatus] = useState<'all' | 'verified' | 'not-verified'>('all')

  const navigate = useNavigate()

  const navigateToDetailsPage = (e: React.MouseEvent<HTMLButtonElement>, recruiterId: string) => {
    e.stopPropagation()
    Notify.info('clicked')
    if(!recruiterId) return
    navigate(`${recruiterId}`, {state: {recruiterId}})
  }

  const recruiterTableColumn: TableColumn<AdminRecruiterListData>[] = [
    {
      header: 'RECRUITER NAME',
      key: 'fullName',
      render: (row: AdminRecruiterListData) => (
        <div className='flex gap-2'>
          <div className="w-10 h-10 flex items-center justify-center text-white bg-gradient-to-br from-blue-500 to-indigo-400 rounded-full">{row.fullName ? row.fullName[0] : 'U'}</div>
          <div>
            <p className='font-medium'>{row.fullName}</p>
            <p className='text-xs'>{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'RECRUITER TYPE',
      key: 'recruiterType',
      render: (row: AdminRecruiterListData) => (
        <span className={`${row.recruiterType === 'corporate' ? "bg-blue-200 text-blue-500" : 'bg-green-200 text-green-500'} px-2 rounded-md font-medium text-xs py-1 uppercase`}>{row.recruiterType}</span>
      )
    },
    {
      header: 'AFFILIATED COMPANY',
      key: 'companyName',
      render: (row: AdminRecruiterListData) => {
        if(row.recruiterType === 'corporate'){
          return <p className=''>{row.companyName}</p>
        }else{
          return <p className='text-gray-500'>N/A</p>
        }
      }
    },
    {
      header: 'VERIFICATION',
      key: 'isVerified',
      render: (row: AdminRecruiterListData) => {
        if(row.isVerified){
          return <span className='uppercase bg-green-200 text-green-500 px-2 py-1 text-xs font-medium rounded-md'>VERIFIED</span>
        }else{
          return <span className="uppercase bg-red-200 text-red-500 px-2 py-1 text-xs font-medium rounded-md">NOT VERIFIED</span>
        }
      }
    },
    {
      header: 'MORE',
      key: 'actions',
      render: (row: AdminRecruiterListData) => (
        <button onClick={(e) => navigateToDetailsPage(e, row._id as string)} className='text-sm font-medium text-blue-500'>View Details</button>
      )
    }
  ]
  
  function searchCandidates(event: React.ChangeEvent<HTMLInputElement>) { 
    setSearch(event.target.value);
  }

  
  
  const debouncedSearch = <T extends (...args: never[]) => void>(fn: T, delay: number) => {
      let timer: ReturnType<typeof setTimeout>;
      return function(...args: Parameters<T>) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn(...args);
        }, delay);
      };
  };

  const dSearch = debouncedSearch(searchCandidates, 600);

  useEffect(() => {
    async function fetchCompanyList(){

        try {
          const result = await getRecruiters(search, page, '', recruiterType, recruiterStatus)
          console.log('full result before successcheck', result)
           if(result.success){
             console.log('Data from the backend company list fetch result', result?.result)
            setRecruiters(result.result?.recruiters)
            // setselectedcompany(result?.result?.recruiters[0])
            // setpage(result?.result?.page)
            setTotalPage(result?.result?.totalPages)
            // setpagination(new Array(result?.result?.totalPages).fill(0))
            // setCurrentSort(result?.result?.currentSort) 
           }else{
            toast.error('Canot fetch recruiters')
           }
        } catch (error: unknown) {
          toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
        
    }

    fetchCompanyList()
  }, [search, page, recruiterType, recruiterStatus])

  return(
    <>
      <div className="w-full min-h-screen p-5 lg:p-10 bg-gray-100">
  <div className="flex justify-between items-start">
    <div>
    <p className='text-lg font-medium'>Recruiter Management</p>
  <p className='text-xs mt-1 mb-5 text-gray-500'>Manage all recruiters & permissions</p>
  </div>
  <div className="bg-white w-fit border border-slate-200 flex gap-2 rounded-md">
                            <button onClick={() => navigate('/admin/recruiters')} className={`text-xs p-1 rounded-md ${window.location.href.includes('recruiters') ? "bg-blue-500 text-white" : "bg-white text-black"}`}>Recruiters</button>
                            <button onClick={() => navigate('/admin/companies')} className={`text-xs p-1 rounded-md ${window.location.href.includes('companies') ? "bg-blue-500 text-white" : "bg-white text-black"}`}>Companies</button>
                        </div>
  </div>
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
            placeholder="Search users" 
          />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <div className="bg-gray-100 p-1 border border-gray-200 rounded-md grid grid-cols-3 font-medium" style={{fontSize:'0.65rem'}}>
          <button onClick={() => setRecruiterStatus('all')} className={`py-1 rounded-md ${recruiterStatus === 'all' ? "bg-white border border-gray-200 shadow-sm text-black" : "text-gray-400"}`}>All</button>
          <button onClick={() => setRecruiterStatus('verified')} className={`py-1 rounded-md ${recruiterStatus === 'verified' ? "bg-white border border-gray-200 shadow-sm text-black" : "text-gray-400"}`}>Verified</button>
          <button onClick={() => setRecruiterStatus('not-verified')} className={`py-1 rounded-md ${recruiterStatus === 'not-verified' ? "bg-white border border-gray-200 shadow-sm text-black" : "text-gray-400"}`}>Not Verified</button>
        </div>
      </div>
      {/* Filter Toggle - Occupies 4 columns on large screens */}
      <div className="col-span-12 lg:col-span-4">
        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 w-full justify-between">
          <button
            onClick={() => setRecruiterType('all')}
            className={`flex-1 py-1.5 text-[10px] lg:text-xs font-medium rounded-md transition-all ${
              recruiterType === 'all' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setRecruiterType('freelance')}
            className={`flex-1 py-1.5 text-[10px] lg:text-xs font-medium rounded-md transition-all ${
              recruiterType === 'freelance' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Freelance
          </button>
          <button
            onClick={() => setRecruiterType('corporate')}
            className={`flex-1 py-1.5 text-[10px] lg:text-xs font-medium rounded-md transition-all ${
              recruiterType === 'corporate' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Corporate
          </button>
        </div>
      </div>

    </div>
  </div>

  {recruiters.length > 0 && (
    <ReusableTable 
    columns={recruiterTableColumn}
    // data={recruiters as RecruiterProfileData[]}
    data={recruiters}
    currentPage={page}
    totalPages={totalPage}
    onPageChange={(page: number) => setPage(page)}
  />
  )}
  {recruiters.length === 0 && (
    <div className='flex flex-col items-center gap-2 mt-5'>
      <FaUsersSlash size={30} color='gray' />
      <p className='text-xs text-gray-500 text-center'>No Recruiters found</p>
    </div>
  )}
</div>
    </>
);
}
