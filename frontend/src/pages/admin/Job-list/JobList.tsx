import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import defautImage from '../../../../public/default-img-instagram.png'
import { useNavigate } from 'react-router-dom';
import useRefreshToken from '../../../hooks/refreshToken';


export default function Jobs() {
  
  const [jobs, setjobs] = useState<any[]>([])
  const [selectedjob, setselectedjob] = useState<any>({})
  const [search, setsearch] = useState("")
  const [limit, setlimit] = useState(3)
  const [page, setpage] = useState(1)
  const [totalPages, settotalpages] = useState(0)
  const [pagination, setpagination] = useState<any[]>([])

  const token = useSelector((state : any) => {
    return state.adminAuth.adminToken
  })

  const navigator = useNavigate()

  useEffect(() => {

    async function fetchJobDetails(){
        async function makeRequest(accessToken : string){
            return fetch(`http://localhost:5000/admin/jobs/data?search=${search}&page=${page}`, {
                        method:'GET',
                        headers:{
                            authorization:`Bearer ${accessToken}`
                        },
                        credentials:'include'
                    })
        }

        try {
            let response = await makeRequest(token)

            if(response.status === 401){
                const newAccessToken = await useRefreshToken('http://localhost:5000/admin/token/refresh')
                response = await makeRequest(newAccessToken)
            }

            const result = await response.json()

            if(result.success){
                console.log('job result from the backend', result.jobList.jobs)
                setjobs(result.jobList.jobs)
                setselectedjob(result.jobList.jobs[0])
                setpage(result.jobList.page)
                settotalpages(result.jobList.totalPages)
                setpagination(new Array(result.jobList.totalPages).fill(0))
            }else{
                Swal.fire({
                    icon:'error',
                    title:'Oops',
                    text:result.message
                })
            }
        } catch (error : unknown) {
            console.log('Error occured while geting jobs', error)
            if(error instanceof Error){
                Swal.fire({
                    icon:'error',
                    title:'Error',
                    text:error.message
                })
            }
        }
    }

    fetchJobDetails()
  }, [search, page])

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
    let timer : number
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
          <div className="flex gap-3">
            <button className="text-sm text-gray-500">Filter</button>
            <button className="text-sm text-gray-500">Sort</button>
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
