import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import defautImage from '../../../../public/default-img-instagram.png'
import { useNavigate } from 'react-router-dom';


export default function Companies() {
  
  const [company, setcompany] = useState<any[]>([])
  const [selectedcompany, setselectedcompany] = useState<any>({})

  const token = useSelector((state : any) => {
    return state.adminAuth.adminToken
  })

  const navigator = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5000/admin/companies/data', {
        method:'GET',
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    .then((response) => {
        if(response.status === 500) throw new Error('Internal srever error, please try again after some time')
        return response.json()
    })
    .then((result) => {
        if(result.success){
            console.log('data from the backend', result.result)
            setcompany(result.result)
            setselectedcompany(result?.result[0])
        }else{
            throw new Error('no data')
        }
    })
    .catch((error : any) => {
        Swal.fire({
            icon:'error',
            title:'Oops',
            text:error.message
        })
    })
  }, [])

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
        <input type="text" name="" id="" className="outline-none border-none px-3 py-2" placeholder='Search company' />
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
            <button className="px-2 py-1 bg-gray-100 rounded">Prev</button>
            <button className="px-3 py-1 bg-orange-500 text-white rounded">1</button>
            <button className="px-2 py-1 bg-gray-100 rounded">2</button>
            <button className="px-2 py-1 bg-gray-100 rounded">Next</button>
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
