import { useEffect, useState } from 'react';
import defautImage from '../../../../public/default-img-instagram.png'
import { useNavigate } from 'react-router-dom';
import { getCompanies } from '../../../services/adminServices';
import { BiSearch } from 'react-icons/bi';
import { Notify } from 'notiflix';
import { RecruiterProfileData } from '../../../types/entityTypes';
import { BsEye, BsThreeDotsVertical } from 'react-icons/bs';
import RecruiterOverviewModal from './RecruiterOverviewModal';


export default function Companies() {
  
  const [recruiters, setRecruiters] = useState<RecruiterProfileData[]>([])
  const [selectedcompany, setselectedcompany] = useState<RecruiterProfileData | null | undefined>(null)
  const [employerTypeFilter, setEmployerTypeFilter] = useState<string>('All')
  const [employerStatusFilter, setEmployerStatusFilter] = useState<string>('All')
  const [page, setpage] = useState(1)
  const [totalPage, settotalpage] = useState(0)
  const [search, setsearch] = useState("")
  const [limit, setlimit] = useState(10)
  const [pagination, setpagination] = useState<any[]>([])
  const [sortVisibility, setSortVisibility] = useState(false)
  const [sort, setSort] = useState('')
  const [currentSort, setCurrentSort] = useState('joined-latest')
  const [selectedRecruiter, setSelectedRecruiter] = useState<RecruiterProfileData | null>(null)
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false)
  const toggleOptionsMenu = () => setIsOptionsMenuOpen(prv => !prv)
  const [recruiterOverviewModalOpen, setRecruiterOverviewModalOpen] = useState<boolean>(false)
  const openRecruiterOverviewModal = (id: string) => {
    const recruiter = recruiters.find((recruiter: RecruiterProfileData) => recruiter._id === id)
    setSelectedRecruiter(recruiter as RecruiterProfileData)
    setRecruiterOverviewModalOpen(true)
  }
  const closeRecruiterOverviewModal = () => setRecruiterOverviewModalOpen(false)

  const openSort = () => setSortVisibility(true)
  const closeSort = () => setSortVisibility(false)

  const nextPage = () => setpage(prev => prev + 1)
  const previousPage = () => setpage(prev => prev - 1)

  const changePage = (pageNumber : number) => {
    setpage(pageNumber)
  }

  const navigator = useNavigate()

  useEffect(() => {
    async function fetchCompanyList(){

        try {
          const result = await getCompanies(search, page, sort, employerTypeFilter, employerStatusFilter)
          
            console.log('Data from the backend company list fetch result', result?.result)
            setRecruiters(result.result?.recruiters)
            setselectedcompany(result?.result?.recruiters[0])
            setpage(result?.result?.page)
            settotalpage(result?.result?.totalPages)
            setpagination(new Array(result?.result?.totalPages).fill(0))
            setCurrentSort(result?.result?.currentSort) 
        } catch (error: unknown) {
          Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout: 3000})
        }
        
    }

    fetchCompanyList()
  }, [search, page, sort, employerTypeFilter, employerStatusFilter])

  function searchCompany(event : any){
    setsearch(event.target.value)
    //Notify.info(event.target.value, {timeout: 3000})
  }

  function debouncedSearch(fn : Function, delay : number){
    let timer : any
    return function(...args : any){
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }

  const dSearch = debouncedSearch(searchCompany, 600)

  function formatDate(createdAt : Date | string) : string {
    const joined = new Date(createdAt)
    return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
  }

  function selctCompany(company : any){
    setselectedcompany(company)
    console.log('Selected company ', selectedcompany)
  }

  function viewCompanyDetails(companyId : any){
    navigator(`/admin/company/details/${companyId}`)
  }

  return (
    <>
    <div className="w-full p-3 lg:p-10">
      <div className="bg-white p-3 rounded-md bg-white">
        <div className="border px-2 border-gray-300 rounded-md flex items-center">
          <BiSearch color='gray' />
          <input
            onKeyUp={(e) => dSearch(e)}
            type="text"
            placeholder='Search recruiter name, company name, email'
            className='p-2 text-xs font-light w-full'
          />
        </div>

        <div className="mt-5 flex flex-col lg:flex-row lg:gap-20 gap-5">
          <div>
            <p className='text-xs font-light text-gray-500'>Employer Type</p>
            <div className='mt-2 flex gap-2'>
              <button onClick={() => setEmployerTypeFilter('All')} className={`${employerTypeFilter === 'All' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>All</button>
              <button onClick={() => setEmployerTypeFilter('Self')} className={`${employerTypeFilter === 'Self' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>Self</button>
              <button onClick={() => setEmployerTypeFilter('Company')} className={`${employerTypeFilter === 'Company' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>Company</button>
            </div>
          </div>
          <div>
            <p className='text-xs font-light text-gray-500'>Status</p>
            <div className='mt-2 flex gap-2'>
              <button onClick={() => setEmployerStatusFilter('All')} className={`${employerStatusFilter === 'All' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>All</button>
              <button onClick={() => setEmployerStatusFilter('Active')} className={`${employerStatusFilter === 'Active' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>Active</button>
              <button onClick={() => setEmployerStatusFilter('Suspended')} className={`${employerStatusFilter === 'Suspended' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>Suspended</button>
              <button onClick={() => setEmployerStatusFilter('Closed')} className={`${employerStatusFilter === 'Closed' ? 'bg-black text-white' : 'bg-white text-gray-600'} text-sm rounded-md px-3 py-2 border border-gray-300`}>Closed</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white mt-5 rounded-md">
        <div className="overflow-y-auto mt-3">
                      
                      <table className="text-sm w-full text-left overflow-x-auto">
                       <thead className="text-gray-500 font-medium border-t border-gray-300">
                         <tr className='border-b border-gray-300'> 
                           <td className='!p-2'>Recruiter</td>
                           <td className='!p-2'>Type</td>
                           <td className='!p-2'>Company</td>
                           <td className='!p-2'>Status</td>
                           <td className='!p-2'>Action</td>
                         </tr>
                       </thead>
                       <tbody>
                        {
                          recruiters.length > 0 && (
                            recruiters.map((recruiter: RecruiterProfileData) => (
                              <tr className='border-b border-gray-300' key={recruiter._id}>
                                <td className='p-1'>
                                  <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-500">
                                      <p>{recruiter.userProfile.name[0]}</p>
                                    </div>
                                    <p className='text-xs'>{recruiter.userProfile.name}</p>
                                  </div>
                                </td>
                                <td>
                                  <p className="text-xs">{recruiter.employerType}</p>
                                </td>
                                <td>
                                  <p className="text-xs">
                                    {
                                      recruiter.employerType === 'company'
                                        ? recruiter.organizationDetails?.organizationName
                                        : 'NA'
                                    }
                                  </p>
                                </td>
                                <td>
                                  <p className={`text-xs ${recruiter.isDeleted ? 'text-gray-500' : recruiter.isSuspended ? 'text-red-500' : 'text-green-500'}`}>
                                    {recruiter.isDeleted ? 'Closed' : recruiter.isSuspended ? 'Suspended' : 'Active'}
                                  </p>
                                </td>
                                <td className='p-1'>
                                  <div className="flex gap-3">
                                    <button onClick={() => openRecruiterOverviewModal(recruiter._id as string)}><BsEye color='blue' /></button>
                                    <button><BsThreeDotsVertical /></button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )
                        }
                        
                      </tbody>
                  </table>

                        {
                          recruiters.length === 0 && (
                            <div className='w-full flex mt-3 justify-center'>
                              <p className='text-xs text-gray-500 text-center'>No Recruiters found</p>
                            </div>
                          )
                        }
                    </div>
                    <div className="flex items-center justify-between text-xs p-3">
                   <span>Showing {page} of {totalPage} Page</span>
                   <div className="flex gap-2">
                     {
                      page > 1 && <button onClick={previousPage} className="px-2 py-1 bg-gray-100 rounded">Prev</button>
                    }
                    {
                      pagination.map((pageNumber, pageIndex: number) => { 
                        return(
                            <button onClick={() => changePage(pageIndex + 1)} key={pageIndex} className={pageIndex + 1 === page ? 'px-3 py-1 bg-orange-500 text-white rounded' : 'px-3 py-1 bg-gray-100 rounded'}>{pageIndex + 1}</button>
                        )
                      })
                    }
                    {
                      page < totalPage && <button onClick={nextPage} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500">Next</button>
                    }
                  </div>
                </div>
      </div>
    </div>



    {/* Recruiter overview modal */}
    {
      recruiterOverviewModalOpen &&
      selectedRecruiter && (
        <RecruiterOverviewModal 
        open={recruiterOverviewModalOpen} 
        onclose={closeRecruiterOverviewModal}
        data={selectedRecruiter}
        setRecruiters={setRecruiters}
        setSelectedRecruiter={setSelectedRecruiter}
    />
      )
    }
    </>
  );
}
