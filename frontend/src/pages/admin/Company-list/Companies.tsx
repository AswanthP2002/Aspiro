import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import defautImage from '../../../../public/default-img-instagram.png'
import { useNavigate } from 'react-router-dom';
import useRefreshToken from '../../../hooks/refreshToken';
import { adminServices } from '../../../services/commonServices';
import { getCompanies } from '../../../services/adminServices';


export default function Companies() {
  
  const [company, setcompany] = useState<any[]>([])
  const [selectedcompany, setselectedcompany] = useState<any>({})
  const [page, setpage] = useState(1)
  const [totalPage, settotalpage] = useState(0)
  const [search, setsearch] = useState("")
  const [limit, setlimit] = useState(10)
  const [pagination, setpagination] = useState<any[]>([])
  const [sortVisibility, setSortVisibility] = useState(false)
  const [sort, setSort] = useState('')
  const [currentSort, setCurrentSort] = useState('joined-latest')

  const openSort = () => setSortVisibility(true)
  const closeSort = () => setSortVisibility(false)


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

        const result = await getCompanies(search, page, sort)
        
          console.log('Data from the backend company list fetch result', result?.result)
          setcompany(result.result?.recruiters)
          setselectedcompany(result?.result?.recruiters[0])
          setpage(result?.result?.page)
          settotalpage(result?.result?.totalPages)
          setpagination(new Array(result?.result?.totalPages).fill(0))
          setCurrentSort(result?.result?.currentSort)
        
    }

    fetchCompanyList()
  }, [search, page, sort])

  function searchCompany(event : any){
    setsearch(event.target.value)
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
        <div className="flex justify-end items-center mb-4 relative">
          <div className="flex gap-3">
            <button className="text-sm text-gray-500">Filter</button>
            <button onClick={openSort} className="text-sm text-gray-500">Sort</button>
          </div>
          {
            sortVisibility && (
              <div className="absolute sort !p-3 shadow rounded right-0 top-0 bg-white w-[200px]">
                <div className='flex justify-end'>
                  <i onClick={closeSort} className="fa-solid fa-circle-xmark cursor-pointer"></i>
                </div>
                <ul>
                  <li><input type="radio" onChange={() => setSort('name-a-z')} name="sort" id="" checked={currentSort === 'name-a-z' ? true : false} /><label htmlFor="" className="ms-2">Name A - Z</label></li>
                  <li><input type="radio" onChange={() => setSort('name-z-a')} name="sort" id="" checked={currentSort === 'name-z-a' ? true : false} /><label htmlFor="" className="ms-2">Name Z - A</label></li>
                  <li><input type="radio" onChange={() => setSort('joined-latest')} name="sort" id="" checked={currentSort === 'joined-latest' ? true : false} /><label htmlFor="" className="ms-2">Joined latest</label></li>
                  <li><input type="radio" onChange={() => setSort('joined-oldest')} name="sort" id="" checked={currentSort === 'joined-oldest' ? true : false} /><label htmlFor="" className="ms-2">Joined oldest</label></li>
                </ul>
              </div>
            )
          }
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
          <span>Showing {page} of {totalPage} pages</span>
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
      : <p className='text-center mt-10 font-normal text-sm'>No Companies found</p>
    }
    </>
  );
}
