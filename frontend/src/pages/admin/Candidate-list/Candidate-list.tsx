import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultUser from '../../../../public/default-img-instagram.png'
import { jobRoles } from '../../../assets/data/dummyJobRole';
import FilterComponent from '../../../components/common/FilterComponent';
import { getCandidates } from '../../../services/adminServices';

interface FilterType {
  status:boolean[]
  jobRole:string[]
}



export default function Candidates() {
  
  const [candidates, setCandidates] = useState<any[]>([])
  const [page, setpage] = useState(1)
  const [limit, setlimit] = useState(10)
  const [totalPage, settotalpage] = useState(0)
  const [search, setsearch] = useState("")
  const [pagination, setpagination] = useState<any[]>([])
  const [selectedCandidate, setselectedcandidate] = useState<any>({})

  const [sortVisible, setSortVisible] = useState(false)
  const [sort, setsort] = useState('joined-latest')
  const [currentSort, setCurrentSort] = useState('joined-latest')

  const [filterVisible, setFilterVisible] = useState(false)
  const [filter, setFilter] = useState<FilterType>({
    status:[],
    jobRole:[]
  })

  function handleCandidateStatusSelect(status : boolean, isChecked : boolean) {
    setFilter((prevState : any) => {
      if(isChecked){
        return {...prevState, status:[...prevState.status, status]}
      }else {
        return {...prevState, status:prevState.status.filter((sts : boolean) => status !== sts)}
      }
    })
  }

  function handleJobRoleSelect(jobRole : string, isChecked : boolean) {
    setFilter((prevState : any) => {
      if(isChecked){
        return {...prevState, jobRole:[...prevState.jobRole, jobRole]}
      }else {
        return {...prevState, jobRole:prevState.jobRole.filter((role : string) => role !== jobRole)}
      }
    })
  }

  // Testing filter values
  console.log('FilterValues', filter)

  const openSort = () => setSortVisible(true)
  const closeSort = () => setSortVisible(false)

  const openFilter = () => setFilterVisible(true)
  const closeFilter = () => setFilterVisible(false)

  const dispatcher = useDispatch()
  const navigator = useNavigate()

  const token = useSelector((state : any) => {
    return state.adminAuth.adminToken
  })

  useEffect(() => {
    async function fetchCandidateLists(){
      
      
        const result = await getCandidates(search, page, sort, filter)
       
            console.log('candidate data from the backend data from the backend', result.result)
            setCandidates(result.result?.candidates)
            setpage(result.result?.currentPage)
            settotalpage(result?.result?.totalPages)
            setpagination(new Array(result?.result?.totalPages).fill(result?.result?.totalPages))
            if(result?.result?.candidates.length > 0){
              setselectedcandidate(result?.result?.candidates[0])
            }
            setCurrentSort(result?.result?.currentSort)
       
    }

    fetchCandidateLists()
      
  }, [search, page, sort, filter])

  function formatDate(createdAt : Date | string) : string {
    const joined = new Date(createdAt)
    return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
  }

  function changePage(pageNumber : number){
    setpage(pageNumber)
  }

  const nextPage = () => setpage(prev => prev + 1)
  const previousPage = () => setpage(prev => prev - 1)

  function searchCandidates(event : any) {
    setsearch(event.target.value)
  }

  function debouncedSearch(fn : Function, delay : number) : Function {
      let timer : any
      return function(...args : any){
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn(...args)
        }, delay)
      }
  }

  const dSearch = debouncedSearch(searchCandidates, 600)

  return (
    <>
    {
      filterVisible && ( <FilterComponent 
        handleCandidateStatusSelect={handleCandidateStatusSelect}
        handleJobRoleSelect={handleJobRoleSelect}
        candidateFilter={filter}
        closeFilter={closeFilter} 
        filterType={'candidate'} 
        jobRole={jobRoles} 
      />)
    }
    <div className="px-6 flex gap-20">
      <h2 className='font-bold'>Candidates</h2>
      <div className="bg-white search-wrapper rounded-full w-[400px] relative">
        <input onKeyUp={(event) => dSearch(event)} type="text" name="" id="" className="outline-none border-none px-3 py-2" placeholder='Search candidates' />
        <i className="fa-solid fa-search absolute right-5 bottom-2 !text-sm"></i>
      </div>
    </div>
    <>
    {
      candidates?.length > 0
        ?
    <div className="flex gap-6 p-6 bg-[#fff7f1] min-h-screen">
      {/* Company List Section */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow">
        <div className="flex justify-end items-center mb-4 relative">
          <div className="flex gap-3">
            <button onClick={openFilter} className="text-sm text-gray-500">Filter</button>
            <button onClick={openSort} className="text-sm text-gray-500">Sort</button>
            {/* Sort */}
            {sortVisible && (
                <div className="absolute sort bg-white shadow p-3 right-0">
                  <div className="flex justify-end"><i onClick={closeSort} className="cursor-pointer fa-solid fa-circle-xmark"></i></div>
                  <ul>
                    <li className="list-none"><input onChange={() => setsort('joined-latest')} type="radio" checked={currentSort === 'joined-latest' ? true : false} name="sort-group" id="" /> <label htmlFor="">Joined Latest</label></li>
                    <li className="list-none"><input onChange={() => setsort('joined-oldest')} type="radio" checked={currentSort === 'joined-oldest'} name="sort-group" id="" /> <label htmlFor="">Joined Oldest</label></li>
                    <li className="list-none"><input onChange={() => setsort('name-a-z')} type="radio" checked={currentSort === 'name-a-z'} name="sort-group" id="" /> <label htmlFor="">Name A - Z</label></li>
                    <li className="list-none"><input onChange={() => setsort('name-z-a')} type="radio" checked={currentSort === 'name-z-a'} name="sort-group" id="" /> <label htmlFor="">Name Z - A</label></li>
                  </ul>
                </div>
            )}
          </div>
        </div>

        <div className="overflow-auto max-h-[400px]">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 font-medium border-t">
              <tr> 
                <th className="p-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate : any, index : number) => (
                <tr
                  key={index}
                  onClick={() => setselectedcandidate(candidate)}
                  className={`${selectedCandidate?._id === candidate?._id ? "bg-orange-300" : "bg-white"} rounded-lg`}
                >
                  <td className="p-3 flex items-center gap-2">
                    <img src={candidate?.profilePicture ? candidate?.profilePicture : defaultUser} alt="logo" className="w-8 h-8 rounded-full" />
                    {candidate.name}
                  </td>
                  <td>{candidate.email}</td>
                  <td>{candidate?.role ? candidate?.role : "Not specified"}</td>
                  <td>{formatDate(candidate.createdAt)}</td>
                  <td>
                    {
                      candidate?.isBlocked
                          ? <p className="text-red-400">Blocked</p>
                          : <p className='text-green-400'>Active</p>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>Showing {page} of {totalPage} Page</span>
          <div className="flex gap-2">
            {
              page > 1 ? <button onClick={previousPage} className="px-2 py-1 bg-gray-100 rounded">Prev</button> : null
            }
            {
              pagination.map((_, index) => {
                return(
                    <button onClick={() => changePage(index + 1)} key={index} className={index + 1 === page ? 'px-3 py-1 bg-orange-500 text-white rounded' : 'px-3 py-1 bg-gray-100 rounded'}>{index + 1}</button>
                )
              })
            }
            {
              page < totalPage ? <button onClick={nextPage} className="px-2 py-1 bg-gray-100 rounded">Next</button> : null
            }
          </div>
        </div>
      </div>

      <div className="w-[300px] bg-white p-5 rounded-xl shadow flex flex-col gap-3">
        <div className="text-sm text-center text-gray-400">{selectedCandidate?.role ? selectedCandidate.role : "Not Specified" }</div>
        <img src={selectedCandidate.profilePicture ? selectedCandidate.profilePicture : defaultUser} alt="logo" className="w-16 h-16 rounded-full mx-auto" />
        <div className="text-center">
          <h3 className="font-semibold">{selectedCandidate.name}</h3>
          <p className="text-sm text-gray-500">{selectedCandidate?.username}</p>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-sm text-gray-600 mb-1">About</h4>
          <p className="text-xs text-gray-500">
            {selectedCandidate.about ? selectedCandidate.about : "Not Added Yet"}
          </p>
        </div>

        <div className="grid grid-cols-2 text-xs gap-2 mt-2 text-gray-600">
          <div>
            <span className="font-medium">Age</span>
            <p>Not Added</p>
          </div>
          <div>
            <span className="font-medium">Gender</span>
            <p>Not Added</p>
          </div>
          <div>
            <span className="font-medium">Joined</span>
            <p>{formatDate(selectedCandidate.createdAt)}</p>
          </div>
          <div>
            <span className="font-medium">Location</span>
            <p>{selectedCandidate?.location?.city ? selectedCandidate.location.city : "Not Added"}</p>
          </div>
        </div>

        <div className="mt-4">
          <iframe
          width="100%"
          height="200"
          style={{ borderRadius: "10px" }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodeURIComponent(`${selectedCandidate.location?.city}, ${selectedCandidate.location?.state}, ${selectedCandidate.location?.country}`)}&output=embed`}
          ></iframe>
        </div>

        <button onClick={() => navigator(`/admin/candidate/details/${selectedCandidate._id}`)} className="mt-auto bg-orange-500 text-white rounded py-2">View</button>
      </div>
    </div>
    : <p className='text-center font-gray-400 mt-3'>No Candidates</p>
    }
    </>
    </>
  );
}
