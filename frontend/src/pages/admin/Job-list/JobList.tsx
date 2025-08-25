import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import defautImage from '../../../../public/default-img-instagram.png'
import { useNavigate } from 'react-router-dom';
import { industryTypes } from '../../../assets/data/companyDetailsArrayData';
import { getJobs } from '../../../services/adminServices';

interface filterType {
  industry:string[]
  jobType:string[]
  locationType:string[]
  minSalary: string
  maxSalary: string
}

export default function Jobs() {
  
  const [jobs, setjobs] = useState<any[]>([])
  const [selectedjob, setselectedjob] = useState<any>({})
  const [search, setsearch] = useState("")
  const [limit, setlimit] = useState(3)
  const [page, setpage] = useState(1)
  const [totalPages, settotalpages] = useState(0)
  const [pagination, setpagination] = useState<any[]>([])
  
  const [sort, setsort] = useState('job-latest')
  const [sortVisibility, setSortVisibility] = useState(false)
  const [currentSort, setCurrentSort] = useState('job-latest')
  
  const [filter, setFilter] = useState<filterType>({
    industry:[],
    locationType:[],
    jobType:[],
    minSalary:'',
    maxSalary:''
  })

  const [filterVisibility, setFilterVisibility] = useState(false)

  const openFilter = () => setFilterVisibility(true)
  const closeFilter = () => setFilterVisibility(false)

  function handleIndustrySelect(industry : string, isChecked : boolean){
    setFilter((prevState : any) => {
      if(isChecked){
        return {...prevState, industry:[...prevState.industry, industry]}
      }else {
        return {...prevState, industry:prevState.industry.filter((ind : string) => industry !== ind)}
      }
    })
  }

  function handleJobTypeSelect(jobType : string, isChecked : boolean) {
    setFilter((prevState : any) => {
      if(isChecked){
        return {...prevState, jobType:[...prevState.jobType, jobType]}
      }else {
        return {...prevState, jobType:prevState.jobType.filter((jt : string) => jt !== jobType)}
      }
    })
  }

  function handleLocationTypeSelect(locationType : string, isChecked : boolean) {
    setFilter((prevState : any) => {
      if(isChecked){
        return {...prevState, locationType:[...prevState.locationType, locationType]}
      }else{
        return {...prevState, locationType:prevState.locationType.filter((location : string) => location !== locationType)}
      }
    })
  }

  function handleMinSalary(salary : string){
    setFilter((prevState : any) => {
      return {...prevState, minSalary:salary}
    })
  }

  function handleMaxSalary(salary : string) {
    setFilter((prevState : any) => {
      return {...prevState, maxSalary:salary}
    })
  }

  console.log('This is updated state', filter)

  function toggleSortVisibility(){
    setSortVisibility(prev => !prev)
  }

  const navigator = useNavigate()

  useEffect(() => {

    async function fetchJobDetails(){
      
        const result = await getJobs(search, page, sort, filter)

        setjobs(result.jobList.jobs)
        setselectedjob(result.jobList.jobs[0])
        setpage(result.jobList.page)
        settotalpages(result.jobList.totalPages)
        setCurrentSort(result?.jobList.currentSort)
        setpagination(new Array(result.jobList.totalPages).fill(0))
          
    }

    fetchJobDetails()
  }, [search, page, sort, filter])

  function formatDate(createdAt : Date | string) : string {
    const joined = new Date(createdAt)
    return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
  }

  function selectjob(job : any){
    setselectedjob(job)
    console.log('Selected company ', selectedjob)
  }

  function viewJobDetails(jobId : any){
    navigator(`/admin/job/details/${jobId}`)
  }

  function searchJobs(event : any){
    setsearch(event.target.value)
  }

  function debouncedSearchJobs(fn : Function, delay : number){
    let timer : any
    return function(...args : any){
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, delay);
    }
  }

  const dSearch = debouncedSearchJobs(searchJobs, 600)

  const changePage = (pagenumber : number) => {
    setpage(pagenumber)
  }

  const nextPage = () => setpage(prev => prev + 1)
  const previousPage = () => setpage(prev => prev - 1)

  return (
    <>
    {
      filterVisibility && (
          <div className="filter absolute bg-white shadow h-screen top-0 left-0 w-[270px]">
            <div className="flex justify-between p-3 items-center">
              <p className="text-blue-500">Filter</p>
              <i onClick={closeFilter} className="fa-solid fa-circle-xmark cursor-pointer"></i>
            </div>
            <div className="industries p-3 max-h-[300px] overflow-y-scroll">
              <p className="text-sm font-normal-text-gray-500">Industry</p>
              <ul>
                {
                  industryTypes.map((industry : string, index : number) => {
                    return(
                      <li key={index}><input checked={filter?.industry.includes(industry) ? true : false} onChange={(event) => handleIndustrySelect(industry, event.target.checked)} type="checkbox" /><label htmlFor="" className="ms-2 text-xs">{industry}</label></li>
                    )
                  })
                }
              </ul>
            </div>

            <div className="job-type p-3">
              <p className="text-sm font-normal text-gray-500">Job Type</p>
              <div>
                <li className="list-none"><input type="checkbox" checked={filter.jobType.includes('Full-Time')} onChange={(event) => handleJobTypeSelect('Full-Time', event.target.checked)} name="" id="" /><label htmlFor="" className="ms-2 !text-xs">Full-Time</label></li>
                <li className="list-none"><input type="checkbox" checked={filter.jobType.includes('Part-Time')} onChange={(event) => handleJobTypeSelect('Part-Time', event.target.checked)} name="" id="" /><label htmlFor="" className="ms-2 !text-xs">Part-Time</label></li>
                <li className="list-none"><input type="checkbox" checked={filter.jobType.includes('Internship')} onChange={(event) => handleJobTypeSelect('Internship', event.target.checked)} name="" id="" /><label htmlFor="" className="ms-2 !text-xs">Internship</label></li>
              </div>
            </div>

            <div className="lcoation-type p-3">
              <p className="text-sm font-normal text-gray-500">Location Type</p>
              <div>
                <li className="list-none"><input type="checkbox" checked={filter.locationType.includes('In-Office')} onChange={(event) => handleLocationTypeSelect('In-Office', event.target.checked)} name="" id="" /><label htmlFor="" className="ms-2 !text-xs">In-Office</label></li>
                <li className="list-none"><input type="checkbox" checked={filter.locationType.includes('Remote')} onChange={(event) => handleLocationTypeSelect('Remote', event.target.checked)} name="" id="" /><label htmlFor="" className="ms-2 !text-xs">Remote</label></li>
              </div>
            </div>

            <div className="salary p-3">
              <p className="text-sm font-normal text-gray-500">Salary (Monthly)</p>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <label htmlFor="" className="!text-xs">Min Salary</label>
                  <input value={filter.minSalary} onChange={(event) => handleMinSalary(event.target.value)} type="number" className="border border-gray-300 w-full" name="" id="" />
                </div>

                <div className="w-1/2">
                  <label htmlFor="" className="!text-xs">Max Salary</label>
                  <input value={filter.maxSalary} onChange={(event) => handleMaxSalary(event.target.value)} type="number" className="border border-gray-300 w-full" name="" id="" />
                </div>
              </div>
            </div>
          </div>
      )
    }
    <div className="px-6 flex gap-20">
      <h2 className='font-bold'>Listed Jobs</h2>
      <div className="bg-white search-wrapper rounded-full w-[400px] relative">
        <input onKeyUp={(event) => dSearch(event)} type="text" name="" id="" className="outline-none border-none px-3 py-2" placeholder='Search company' />
        <i className="fa-solid fa-search absolute right-5 bottom-2 !text-sm"></i>
      </div>
    </div>
    {
      jobs.length > 0
          ? <div className="flex gap-6 p-6 bg-[#fff7f1] min-h-screen">
      {/* Company List Section */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow">
        <div className="flex justify-end items-center mb-4">
          <div className="flex gap-3 relative">
            <button onClick={openFilter} className="text-sm text-gray-500">Filter</button>
            <button onClick={toggleSortVisibility} className="text-sm text-gray-500">Sort</button>

            {
              sortVisibility
                      ? <div className="sort shadow absolute w-[200px] bg-white p-3">
                        <div className="flex justify-end p-2">
                          <i onClick={toggleSortVisibility} className="cursor-pointer fa-solid fa-circle-xmark"></i>
                        </div>
                        <ul>
                          <li><input checked={currentSort === 'job-latest' ? true : false} onChange={() => setsort('job-latest')} type="radio" name="job-sort" id="" /> <label htmlFor="" className="text-xs">Job latest</label></li>
                          <li><input checked={currentSort === 'job-oldest' ? true : false} onChange={() => setsort('job-oldest')} type="radio" name="job-sort" id="" /> <label htmlFor="" className="text-xs">Job oldest</label></li>
                          <li><input checked={currentSort === 'salary-high' ? true : false} onChange={() => setsort('salary-high')} type="radio" name="job-sort" id="" /> <label htmlFor="" className="text-xs">Highest Paying</label></li>
                          <li><input checked={currentSort === 'salary-low' ? true : false} onChange={() => setsort('salary-low')} type="radio" name="job-sort" id="" /> <label htmlFor="" className="text-xs">Lowest Paying</label></li>
                        </ul>
                      </div>
                      : null
            }
          </div>
        </div>

        <div className="overflow-auto max-h-[400px]">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 font-medium border-t">
              <tr>
                <th className="p-3">Title</th>
                <th>Company</th>
                <th>Industry</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job : any, idx : number) => (
                <tr
                  key={idx}
                  onClick={() => selectjob(job)}
                  className={`${selectedjob?._id === job?._id ? "bg-orange-300" : "bg-white"} rounded rounded-sm`}
                >
                  <td className="p-3 flex items-center gap-2">
                    <img src={job?.companyDetails?.logo ? job?.companyDetails?.logo : defautImage} alt="logo" className="w-8 h-8 rounded-full" />
                    {job?.jobTitle}
                  </td>
                  <td>{job?.companyDetails?.companyName}</td>
                  <td>{job?.companyDetails?.industry}</td>
                  <td>{formatDate(job?.createdAt)}</td>
                  <td>
                    blocked
                    {/* <span className="text-green-500 font-medium">{job.isBlocked ? <label>Blocked</label> : <label>Active</label>}</span> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>Showing {page} of {totalPages} pages</span>
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
              page < totalPages ? <button onClick={nextPage} className="px-2 py-1 bg-gray-100 rounded">Next</button> : null
            }
          </div>
        </div>
      </div>

    
      <div className="w-[300px] bg-white p-5 rounded-xl shadow flex flex-col gap-3">
        <div className="text-sm text-gray-400 text-center">{selectedjob?.companyDetails?.industry ? selectedjob?.companyDetails?.industry : "Not specified"}</div>
        <img src={selectedjob?.companyDetails?.logo ? selectedjob?.companyDetails?.logo : defautImage} alt="logo" className="w-16 h-16 rounded-full mx-auto" />
        <div className="text-center">
          <h3 className="font-semibold">{selectedjob?.companyDetails?.companyName}</h3>
          <p className="text-sm text-gray-500">{selectedjob?.location}</p>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-sm text-gray-600 mb-1">Job Description</h4>
          <p className="text-xs text-gray-500">
            {selectedjob?.description}
          </p>
        </div>

        <div className="grid grid-cols-2 text-xs gap-2 mt-2 text-gray-600">
          <div>
            <span className="font-medium">Experience</span>
            <p>{selectedjob?.experience}</p>
          </div>
          <div>
            <span className="font-medium">Level</span>
            <p>{selectedjob?.jobLevel ? selectedjob?.jobLevel : "not specified"}</p>
          </div>
          <div>
            <span className="font-medium">Salary</span>
            <p>{selectedjob.minSalary} - {selectedjob?.maxSalary}</p>
          </div>
          <div>
            <span className="font-medium">Location</span>
            <p>{selectedjob?.location}</p>
          </div>
        </div>

        <div className="mt-4">
          <iframe
          width="100%"
          height="200"
          style={{ borderRadius: "10px" }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodeURIComponent(`${selectedjob.location}`)}&output=embed`}
          ></iframe>
          </div>

        <button onClick={() => viewJobDetails(selectedjob?._id)} className="mt-auto bg-orange-500 text-white rounded py-2">View</button>
      </div>
    </div>
      : <p className='text-center mt-10 font-normal text-sm'>No Jobs found</p>
    }
    </>
  );
}
