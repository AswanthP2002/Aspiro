import { useEffect, useState } from 'react'
import defaultProfileImage from '/default-img-instagram.png'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useRefreshToken from '../../../hooks/refreshToken'
import Swal from 'sweetalert2'
import { adminServices } from '../../../services/apiServices'


export default function CompanyDetails(){

    const [companyDetails, setcompanydetails] = useState<any>({})
    const params : any = useParams()
    const companyId = params.id
    const token = useSelector((state : any) => {
        return state.adminAuth.adminToken
    })
    const navigator = useNavigate()

    useEffect(() => {

        async function fetchCompanyDetails(){
            
            try {
                let fetchResponse = await adminServices.getCompanyDetails(token, companyId)

                if(fetchResponse.status === 401){
                    const newAccessToken = await adminServices.refreshToken()
                    fetchResponse = await adminServices.getCompanyDetails(newAccessToken, companyId)
                }

                const result = await fetchResponse.json()

                if(result?.success){
                    setcompanydetails(result?.companyDetails)
                    console.log('Company details from the server', result?.companyDetails)
                }else{
                    Swal.fire({
                        icon:'error',
                        title:'Oops!',
                        text:result.message,
                        showCancelButton:false,
                        showConfirmButton:true,
                        confirmButtonText:'Home',
                    }).then((result) => {
                        if(result.isConfirmed) navigator('/admin/dashboard')
                    })
                }
            } catch (error : unknown) {
                console.log('Erorr occured while fetching company details', error)
                if(error instanceof Error){
                    Swal.fire({
                        icon:'error',
                        title:'Error',
                        text:error.message,
                        showConfirmButton:true,
                        confirmButtonText:'Ok',
                        showCancelButton:false
                    }).then((result) => {
                        if(result.isConfirmed) navigator('/admin/dashboard')
                    })
                }
            }
        }
        console.log('Received company id', companyId)
        
        fetchCompanyDetails()

    }, [])

    function formatDate(createdAt : Date | string) : string {
        const joined = new Date(createdAt)
        return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
    }

    async function blockUnblockCompany(companyId : any, operation : string){
        
        try {
            let response = await adminServices.blockUnblockCompany(token, companyId, operation)

            if(response.status === 401){
                const newAccessToken = await adminServices.refreshToken()
                response = await adminServices.blockUnblockCompany(newAccessToken, companyId, operation)
            }

            const result = await response.json()

            if(result.success){
                Swal.fire({
                    icon:'success',
                    title:'Success',
                    text:result.message,
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:2000
                }).then(() => window.location.reload())
            }
        } catch (error : unknown) {
            console.log('Error occured while blocking / unblocking', error)
            if(error instanceof Error){
                Swal.fire({
                    icon:'error',
                    title:'Error',
                    text:error.message,
                    showCancelButton:false,
                    confirmButtonText:'Ok'
                })
            }
        }
    }

    async function closeCompany(companyId : string){
        

        Swal.fire({
            icon:'warning',
            title:'Confirm Company Closing?',
            text:'Closing a company will erase all details about company. Once you closed a company, it can not be redo. Do you want to continue?',
            showConfirmButton:true,
            confirmButtonText:'Close Company',
            showCancelButton:true,
            allowOutsideClick:false
        }).then(async (result) => {
            if(result.isConfirmed){
                try {
                    let response = await adminServices.closeCompany(token, companyId)

                    if(response.status === 401){
                        const newAccessToken = await adminServices.refreshToken()
                        response = await adminServices.closeCompany(newAccessToken, companyId)
                    }

                    const result = await response.json()

                    if(result.success){
                        Swal.fire({
                            icon:'success',
                            title:'Success',
                            text:result.message,
                            showConfirmButton:false,
                            showCancelButton:false,
                            allowOutsideClick:false,
                            timer:3500
                        }).then(() => navigator('/admin/companies'))
                    }else{
                        Swal.fire({
                            icon:'error',
                            title:'Oops!',
                            text:result.message
                        })
                    }
                } catch (error : unknown) {
                    console.log('Error occured while closing the company', error)
                    if(error instanceof Error){
                        Swal.fire({
                            icon:'error',
                            title:'Error',
                            text:error.message
                        })
                    }
                }
            }else{
                return
            }
        })

        
    }

    return(
        <>
        <h2 className="font-bold">Company Details</h2>
        <div className="p-6 bg-[#ffffff] min-h-screen w-full mt-5 rounded-2xl">
            {/* Company id / join date / found date :: details */}
            <div className="flex justify-between w-full">
                <div className="left">
                    <p className="text-gray-400 font-semibold">Company id</p>
                    <p className="text-sm font-semibold">{companyDetails?._id}</p>
                </div>
                <div className="right">
                    <p className="text-gray-400 font-semibold">Found In : <span className="ms-5 text-black font-semibold">{companyDetails?.foundIn}</span></p>
                    <p className="text-gray-400 font-semibold">Joined At : <span className="ms-5 text-black font-semibold">{formatDate(companyDetails?.createdAt)}</span></p>
                </div>
            </div>

            {/* Company manifest details */}
            <div className="flex w-full justify-between mt-15">
                {/* Div one */}
                <div className='flex items-center gap-2'> 
                    <img src={companyDetails?.logo ? companyDetails?.logo : defaultProfileImage} alt="" style={{width:'58px', height:'60px'}} />
                    <div>
                        <p className="text-sm font-semibold mb-2">{companyDetails?.companyName}</p>
                        <p className="text-xs font-normal text-gray-400 mb-1">{companyDetails?.industry}</p>
                        <p className="text-xs font-normal text-gray-400 mb-1">{companyDetails?.location?.city}, {companyDetails?.location?.country}</p>
                    </div>
                </div>

                {/* Div two */}
                <div>
                    <p className="text-sm font-semibold mb-2">Company Type</p>
                    <p className="text-xs font-normal text-gray-400 mb-1">{companyDetails?.companyType}</p>
                </div>

                {/* Div three */}
                <div>
                    <p className="text-sm font-semibold mb-2">Team Strength</p>
                    <p className="text-xs font-normal text-gray-400 mb-1">{companyDetails?.teamStrength} Employees</p>
                </div>

                {/* Div four */}
                <div>
                    <p className="text-sm font-semibold mb-2">Total Job Openings</p>
                    <p className="text-xs font-normal text-gray-400 mb-1">0</p>
                </div>

                {/* Div five */}
                <div>
                    <p className="text-sm font-semibold mb-2">Average salary offering</p>
                    <p className="text-xs font-normal text-gray-400 mb-1">Rs.33,000</p>
                </div>
            </div>

            {/* Company about details */}
            <div className="w-full mt-15">
                <p className="text-sm font-semibold mb-2">About</p>
                <p className="text-xs font-normal text-gray-400 mb-1">{companyDetails?.about}</p>
            </div>

            {/* Company benefit details */}
            <div className="w-full mt-10">
                <p className="text-sm font-semibold mb-2">Benefits</p>
                <p className="text-xs font-normal text-gray-400 mb-1">{companyDetails?.benefit}</p>
            </div>

            {/* company contact details */}
            <div className="w-full mt-10">
                <p className="text-sm font-semibold mb-2">Contact Informations</p>
                <ul>
                    <li className='text-xs font-normal text-gray-400 mb-1'>Email : sample@gmail.company</li>
                    <li className='text-xs font-normal text-gray-400 mb-1'>Phone : {companyDetails?.phone}</li>
                    {
                        companyDetails?.website
                            ? <li className='text-xs font-normal text-gray-400 mb-1'>Website : www.sample.in</li>
                            : null
                    }
                </ul>
            </div>
            <hr className="mt-3" />
            <div className="activities w-full mt-5">
                <p className="font-bold">Activities</p>
                <div className="mt-3 flex w-full justify-between mt-10">
                    <div className='contents flex gap-20'>
                        <div>
                            <p className="text-sm text-gray-400 font-semibold mb-2">Total Hirings</p>
                            <p className="text-xs font-normal">0</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-semibold mb-2">Total Amount Spendings</p>
                            <p className="text-xs font-normal">Rs.5,700</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-semibold mb-2">Current plan</p>
                            <p className="text-xs font-normal">Standard</p>
                            <p className="text-xs font-normal">plan id</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-semibold mb-2">Company status</p>
                            {
                                companyDetails?.isBlocked 
                                    ? <p className="text-xs font-normal text-red-400">Blocked</p>
                                    : <p className="text-xs font-normal text-green-400">Active</p>
                            }
                            
                        </div>
                    </div>
                    <div className='actions'>
                        <button type="button" className="btn-export bg-gray-400 text-white text-xs px-4 py-1 rounded-full">Export</button>
                        <button onClick={() => closeCompany(companyDetails?._id)} type="button" className="btn-close-company bg-red-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Close Company</button>
                        {
                            companyDetails?.isBlocked
                                ? <button onClick={() => blockUnblockCompany(companyDetails?._id, 'Unblock')} type="button" className="btn-block bg-orange-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Unblock</button>
                                : <button onClick={() => blockUnblockCompany(companyDetails?._id, 'Block')} type="button" className="btn-block bg-orange-400 text-white text-xs px-4 py-1 ms-3 rounded-full">Block</button>    
                        }
                    </div>
                </div>
            </div>

            <hr className="mt-3" />
            <div className="job-listing w-full mt-5">
                <p className="font-bold mb-10">Listed Jobs</p>
                <p className="text-gray-300 font-semibold text-center mt-10">No Jobs posted yet</p>
                {/* <table className='table w-full mt-10'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Salary</th>
                            <th>Opening Date</th>
                            <th>Closing Date</th>
                            <th>Vacancies</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                </table> */}
            </div>
        </div>
        </>
    )
}