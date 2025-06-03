import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import defautImage from '../../../../public/default-img-instagram.png'
import { useNavigate } from 'react-router-dom';
import useRefreshToken from '../../../hooks/refreshToken';


export default function Companies() {
  
  const [company, setcompany] = useState<any[]>([])
  const [selectedcompany, setselectedcompany] = useState<any>({})
  const [page, setpage] = useState(1)
  const [totalPage, settotalpage] = useState(0)
  const [search, setsearch] = useState("")
  const [limit, setlimit] = useState(10)
  const [pagination, setpagination] = useState<any[]>([])

  const token = useSelector((state : any) => {
    return state.adminAuth.adminToken
  })

  const nextPage = () => setpage(prev => prev + 1)
  const previousPage = () => setpage(prev => prev - 1)

  const changePage = (pageNumber : number) => {
    setpage(pageNumber)
  }

  const navigator = useNavigate()

  useEffect(() => {
    async function fetchCompanyList(){
      async function makeRequest(accessToken : string, search : string, page : number){
        return fetch(`http://localhost:5000/admin/companies/data?search${search}&page=${page}`, {
          method:'GET',
          headers:{
            authorization:`bearer ${accessToken}`
          },
          credentials:'include'
        })
      }

      try {
        let response = await makeRequest(token, search, page)

        if(response.status === 401){
          const newAccessToken = await useRefreshToken('http://localhost:5000/admin/token/refresh')
          response = await makeRequest(newAccessToken, search, page)
        }

        const result = await response.json()

        if(result.success){
          console.log('Data from the backend company list fetch result', result?.result)
          setcompany(result.result?.recruiters)
          setselectedcompany(result?.result?.recruiters[0])
          setpage(result?.result?.page)
          settotalpage(result?.result?.totalPages)
        }else{
          Swal.fire({
            icon:'error',
            title:'Oops!',
            text:result?.message
          })
        }
      } catch (error : unknown) {
        if(error instanceof Error){
          Swal.fire({
            icon:'error',
            title:'Error',
            text:error?.message
          })
        }
      }
    }

    fetchCompanyList()
  }, [search, page])

  function searchCompany(event : any){
    setsearch(event.target.value)
  }

  function debouncedSearch(fn : Function, delay : number){
    let timer : number
    return function(...args : any){
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }

  const dSearch = debouncedSearch(searchCompany, 1000)

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
    <div className="px-6 flex gap-20">
      <h2 className='font-bold'>Comapnies</h2>
      <div className="bg-white search-wrapper rounded-full w-[400px] relative">
        <input onKeyUp={(event) => dSearch(event)} type="text" name="" id="" className="outline-none border-none px-3 py-2" placeholder='Search company' />
        <i className="fa-solid fa-search absolute right-5 bottom-2 !text-sm"></i>
      </div>
    </div>
    {
      company.length > 0
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
                <th className="p-3">Name</th>
                <th>Based</th>
                <th>No. Employees</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {company.map((company : any, idx : number) => (
                <tr
                  key={idx}
                  onClick={() => setselectedcompany(company)}
                  className={`${selectedcompany?._id === company?._id ? "bg-orange-300" : "bg-white"} rounded rounded-sm`}
                >
                  <td className="p-3 flex items-center gap-2">
                    <img src={company.logo ? company.logo : defautImage} alt="logo" className="w-8 h-8 rounded-full" />
                    {company.companyName}
                  </td>
                  <td>{company.location.city}</td>
                  <td>{company.teamStrength} Employees</td>
                  <td>{formatDate(company.createdAt)}</td>
                  <td>
                    <span className="text-green-500 font-medium">{company.isBlocked ? <label>Blocked</label> : <label>Active</label>}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>Showing 1 to 10 jobs</span>
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
        <div className="text-sm text-gray-400 text-center">{selectedcompany.industryType ? selectedcompany.industryType : "Not specified"}</div>
        <img src={selectedcompany.logo ? selectedcompany.logo : defautImage} alt="logo" className="w-16 h-16 rounded-full mx-auto" />
        <div className="text-center">
          <h3 className="font-semibold">{selectedcompany.companyName}</h3>
          <p className="text-sm text-gray-500">{selectedcompany.location?.city}, {selectedcompany.localhost?.state}</p>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-sm text-gray-600 mb-1">About</h4>
          <p className="text-xs text-gray-500">
            {selectedcompany.about}
          </p>
        </div>

        <div className="grid grid-cols-2 text-xs gap-2 mt-2 text-gray-600">
          <div>
            <span className="font-medium">Found In</span>
            <p>{selectedcompany.foundIn}</p>
          </div>
          <div>
            <span className="font-medium">Type</span>
            <p>{selectedcompany.companyType}</p>
          </div>
          <div>
            <span className="font-medium">Size</span>
            <p>{selectedcompany.teamStrength} Employees</p>
          </div>
          <div>
            <span className="font-medium">Location</span>
            <p>{selectedcompany?.location?.city}, {selectedcompany?.location?.state}, {selectedcompany?.location?.country}</p>
          </div>
        </div>

        <div className="mt-4">
          <iframe
          width="100%"
          height="200"
          style={{ borderRadius: "10px" }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodeURIComponent(`${selectedcompany.location?.city}, ${selectedcompany.location?.state}, ${selectedcompany.location?.country}`)}&output=embed`}
          ></iframe>
          </div>

        <button onClick={() => viewCompanyDetails(selectedcompany?._id)} className="mt-auto bg-orange-500 text-white rounded py-2">View</button>
      </div>
    </div>
      : <p>No Companies Registered</p>
    }
    </>
  );
}
