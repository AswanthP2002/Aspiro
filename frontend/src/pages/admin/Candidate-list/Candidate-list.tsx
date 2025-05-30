import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { adminLogout } from '../../../redux-toolkit/adminAuthSlice';
import defaultUser from '../../../../public/default-img-instagram.png'
import defaultUserAspiro from '../../../../public/default-user-aspiro-removebg-preview.png'



export default function Candidates() {
  
  const [candidates, setCandidates] = useState<any[]>([])
  // const [page, setpage] = useState(1)
  // const [limit, setlimit] = useState(10)
  // const [totalPage, settotalpage] = useState(1)
  // const [search, setsearch] = useState("")
  const [selectedCandidate, setselectedcandidate] = useState<any>({})

  const dispatcher = useDispatch()
  const navigator = useNavigate()

  const token = useSelector((state : any) => {
    return state.adminAuth.adminToken
  })

  useEffect(() => {
    fetch('http://localhost:5000/admin/candidates/data', {
        method:'GET',
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((result) => {
        if(result.success){
            console.log('candidate data from the backend data from the backend', result.candidates)
            setCandidates(result.candidates)
            setselectedcandidate(result?.candidates[0])
        }else{
            Swal.fire({
              icon:'error',
              title:'Error',
              text:result.message
            })
        }
    })
    .catch((error : any) => {
        Swal.fire({
            icon:'error',
            title:'Oops',
            text:error.message
        }).then((result) => {
          if(result.isConfirmed) {
            dispatcher(adminLogout())
            navigator('/admin/login')
          }
        })
    })
  }, [])

  function formatDate(createdAt : Date | string) : string {
    const joined = new Date(createdAt)
    return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
  }

  return (
    <>
    <div className="px-6 flex gap-20">
      <h2 className='font-bold'>Candidates</h2>
      <div className="bg-white search-wrapper rounded-full w-[400px] relative">
        <input type="text" name="" id="" className="outline-none border-none px-3 py-2" placeholder='Search candidates' />
        <i className="fa-solid fa-search absolute right-5 bottom-2 !text-sm"></i>
      </div>
    </div>

    <div className="flex gap-6 p-6 bg-[#fff7f1] min-h-screen">
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
          <span>Showing 1 to 10 jobs</span>
          <div className="flex gap-2">
            <button className="px-2 py-1 bg-gray-100 rounded">Prev</button>
            <button className="px-3 py-1 bg-orange-500 text-white rounded">1</button>
            <button className="px-2 py-1 bg-gray-100 rounded">2</button>
            <button className="px-2 py-1 bg-gray-100 rounded">Next</button>
          </div>
        </div>
      </div>

    vv
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
    </>
  );
}
