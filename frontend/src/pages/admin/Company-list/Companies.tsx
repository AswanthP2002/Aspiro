import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { getRecruiters } from '../../../services/adminServices';
import { getRecruiters } from '../../../services/recruiterServices';
import { Notify } from 'notiflix';
import { AdminRecruiterListData, RecruiterProfileData } from '../../../types/entityTypes';
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
          <div className="w-10 h-10 flex items-center justify-center text-white bg-gradient-to-br from-blue-500 to-indigo-400 rounded-full">{row.name ? row.name[0] : 'U'}</div>
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
          const result = await getRecruiters(search, page, '', recruiterType, '')
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
  <p className='text-lg font-medium'>Recruiter Management</p>
  <p className='text-xs mt-1 mb-5 text-gray-500'>Manage all recruiters & permissions</p>
  
  <div className="p-3 border border-gray-200 bg-white rounded-md mb-3">
    {/* Main Grid Container */}
    <div className="grid grid-cols-12 gap-4 items-center">
      
      {/* Search Input - Occupies 8 columns on large screens */}
      <div className="col-span-12 lg:col-span-4">
        <div className="border border-gray-200 rounded-md px-3 py-1.5 flex items-center gap-2 bg-white">
          <IoSearchOutline className="text-gray-400" />
          <input 
            onKeyUp={(event) => dSearch(event)} 
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
    data={recruiters as RecruiterProfileData[]}
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
  
  // const [recruiters, setRecruiters] = useState<RecruiterProfileData[]>([])
  // const [selectedcompany, setselectedcompany] = useState<RecruiterProfileData | null | undefined>(null)
  // const [employerTypeFilter, setEmployerTypeFilter] = useState<string>('All')
  // const [employerStatusFilter, setEmployerStatusFilter] = useState<string>('All')
  // const [page, setpage] = useState(1)
  // const [totalPage, settotalpage] = useState(0)
  // const [search, setsearch] = useState("")
  // const [limit, setlimit] = useState(10)
  // const [pagination, setpagination] = useState<any[]>([])
  // const [sortVisibility, setSortVisibility] = useState(false)
  // const [sort, setSort] = useState('')
  // const [currentSort, setCurrentSort] = useState('joined-latest')
  // const [selectedRecruiter, setSelectedRecruiter] = useState<RecruiterProfileData | null>(null)
  // const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false)
  // const toggleOptionsMenu = () => setIsOptionsMenuOpen(prv => !prv)
  // const [recruiterOverviewModalOpen, setRecruiterOverviewModalOpen] = useState<boolean>(false)
  // const openRecruiterOverviewModal = (id: string) => {
  //   const recruiter = recruiters.find((recruiter: RecruiterProfileData) => recruiter._id === id)
  //   setSelectedRecruiter(recruiter as RecruiterProfileData)
  //   setRecruiterOverviewModalOpen(true)
  // }
  // const closeRecruiterOverviewModal = () => setRecruiterOverviewModalOpen(false)

  // const openSort = () => setSortVisibility(true)
  // const closeSort = () => setSortVisibility(false)

  // const nextPage = () => setpage(prev => prev + 1)
  // const previousPage = () => setpage(prev => prev - 1)

  // const changePage = (pageNumber : number) => {
  //   setpage(pageNumber)
  // }

  // const navigator = useNavigate()

  // useEffect(() => {
  //   async function fetchCompanyList(){

  //       try {
  //         const result = await getCompanies(search, page, sort, employerTypeFilter, employerStatusFilter)
          
  //           console.log('Data from the backend company list fetch result', result?.result)
  //           setRecruiters(result.result?.recruiters)
  //           setselectedcompany(result?.result?.recruiters[0])
  //           setpage(result?.result?.page)
  //           settotalpage(result?.result?.totalPages)
  //           setpagination(new Array(result?.result?.totalPages).fill(0))
  //           setCurrentSort(result?.result?.currentSort) 
  //       } catch (error: unknown) {
  //         Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout: 3000})
  //       }
        
  //   }

  //   // fetchCompanyList()
  // }, [search, page, sort, employerTypeFilter, employerStatusFilter])

  // function searchCompany(event : any){
  //   setsearch(event.target.value)
  //   //Notify.info(event.target.value, {timeout: 3000})
  // }

  // function debouncedSearch(fn : Function, delay : number){
  //   let timer : any
  //   return function(...args : any){
  //     clearTimeout(timer)
  //     timer = setTimeout(() => {
  //       fn(...args)
  //     }, delay)
  //   }
  // }

  // const dSearch = debouncedSearch(searchCompany, 600)

  // function formatDate(createdAt : Date | string) : string {
  //   const joined = new Date(createdAt)
  //   return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
  // }

  // function selctCompany(company : any){
  //   setselectedcompany(company)
  //   console.log('Selected company ', selectedcompany)
  // }

  // function viewCompanyDetails(companyId : any){
  //   navigator(`/admin/company/details/${companyId}`)
  // }

  // return (
  //   <>
  //   <div className="w-full p-3 lg:p-10">
  //     <div className="bg-white p-3 rounded-md bg-white">
  //       <div className="border px-2 border-gray-300 rounded-md flex items-center">
  //         <BiSearch color='gray' />
  //         <input
  //           onKeyUp={(e) => dSearch(e)}
  //           type="text"
  //           placeholder='Search recruiter name, company name, email'
  //           className='p-2 text-xs font-light w-full'
  //         />
  //       </div>

  //       <div className="mt-5 flex flex-col lg:flex-row lg:gap-20 gap-5">
  //         <div>
  //           <p className='text-xs font-light text-gray-500'>Employer Type</p>
  //           <div className='mt-2 flex gap-2'>
  //             <button onClick={() => setEmployerTypeFilter('All')} className={`${employerTypeFilter === 'All' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>All</button>
  //             <button onClick={() => setEmployerTypeFilter('Self')} className={`${employerTypeFilter === 'Self' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>Self</button>
  //             <button onClick={() => setEmployerTypeFilter('Company')} className={`${employerTypeFilter === 'Company' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>Company</button>
  //           </div>
  //         </div>
  //         <div>
  //           <p className='text-xs font-light text-gray-500'>Status</p>
  //           <div className='mt-2 flex gap-2'>
  //             <button onClick={() => setEmployerStatusFilter('All')} className={`${employerStatusFilter === 'All' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>All</button>
  //             <button onClick={() => setEmployerStatusFilter('Active')} className={`${employerStatusFilter === 'Active' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>Active</button>
  //             <button onClick={() => setEmployerStatusFilter('Suspended')} className={`${employerStatusFilter === 'Suspended' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>Suspended</button>
  //             <button onClick={() => setEmployerStatusFilter('Closed')} className={`${employerStatusFilter === 'Closed' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>Closed</button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="bg-white mt-5 rounded-md">
  //       <div className="overflow-y-auto mt-3">
                      
  //                     <table className="text-sm w-full text-left overflow-x-auto">
  //                      <thead className="text-gray-500 font-medium border-t border-gray-300">
  //                        <tr className='border-b border-gray-300'> 
  //                          <td className='!p-2'>Recruiter</td>
  //                          <td className='!p-2'>Type</td>
  //                          <td className='!p-2'>Company</td>
  //                          <td className='!p-2'>Status</td>
  //                          <td className='!p-2'>Action</td>
  //                        </tr>
  //                      </thead>
  //                      <tbody>
  //                       {
  //                         recruiters.length > 0 && (
  //                           recruiters.map((recruiter: RecruiterProfileData) => (
  //                             <tr className='border-b border-gray-300' key={recruiter._id}>
  //                               <td className='p-1'>
  //                                 <div className="flex items-center gap-2">
  //                                   <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-500">
  //                                     <p>{recruiter.userProfile.name[0]}</p>
  //                                   </div>
  //                                   <p className='text-xs'>{recruiter.userProfile.name}</p>
  //                                 </div>
  //                               </td>
  //                               <td>
  //                                 <p className="text-xs">{recruiter.employerType}</p>
  //                               </td>
  //                               <td>
  //                                 <p className="text-xs">
  //                                   {
  //                                     recruiter.employerType === 'company'
  //                                       ? recruiter.organizationDetails?.organizationName
  //                                       : 'NA'
  //                                   }
  //                                 </p>
  //                               </td>
  //                               <td>
  //                                 <p className={`text-xs ${recruiter.isDeleted ? 'text-gray-500' : recruiter.isSuspended ? 'text-red-500' : 'text-green-500'}`}>
  //                                   {recruiter.isDeleted ? 'Closed' : recruiter.isSuspended ? 'Suspended' : 'Active'}
  //                                 </p>
  //                               </td>
  //                               <td className='p-1'>
  //                                 <div className="flex gap-3">
  //                                   <button onClick={() => openRecruiterOverviewModal(recruiter._id as string)}><BsEye color='blue' /></button>
  //                                   <button><BsThreeDotsVertical /></button>
  //                                 </div>
  //                               </td>
  //                             </tr>
  //                           ))
  //                         )
  //                       }
                        
  //                     </tbody>
  //                 </table>

  //                       {
  //                         recruiters.length === 0 && (
  //                           <div className='w-full flex mt-3 justify-center'>
  //                             <p className='text-xs text-gray-500 text-center'>No Recruiters found</p>
  //                           </div>
  //                         )
  //                       }
  //                   </div>
  //                   <div className="flex items-center justify-between text-xs p-3">
  //                  <span>Showing {page} of {totalPage} Page</span>
  //                  <div className="flex gap-2">
  //                    {
  //                     page > 1 && <button onClick={previousPage} className="px-2 py-1 bg-gray-100 rounded">Prev</button>
  //                   }
  //                   {
  //                     pagination.map((pageNumber, pageIndex: number) => { 
  //                       return(
  //                           <button onClick={() => changePage(pageIndex + 1)} key={pageIndex} className={pageIndex + 1 === page ? 'px-3 py-1 bg-orange-500 text-white rounded' : 'px-3 py-1 bg-gray-100 rounded'}>{pageIndex + 1}</button>
  //                       )
  //                     })
  //                   }
  //                   {
  //                     page < totalPage && <button onClick={nextPage} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500">Next</button>
  //                   }
  //                 </div>
  //               </div>
  //     </div>
  //   </div>



  //   {/* Recruiter overview modal */}
  //   {
  //     recruiterOverviewModalOpen &&
  //     selectedRecruiter && (
  //       <RecruiterOverviewModal 
  //       open={recruiterOverviewModalOpen} 
  //       onclose={closeRecruiterOverviewModal}
  //       data={selectedRecruiter}
  //       setRecruiters={setRecruiters}
  //       setSelectedRecruiter={setSelectedRecruiter}
  //   />
  //     )
  //   }
  //   </>
  );
}
