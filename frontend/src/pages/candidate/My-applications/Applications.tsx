import { useEffect, useState } from "react"
import { getMyApplications } from "../../../services/userServices"
import moment from 'moment'
import Swal from "sweetalert2"

export default function MyApplications() {
    const [applications, setApplications] = useState<any[]>([])

    function formatLocalDateTime(date? : string){
        const formatedDate = moment(date).format('DD MMM YYYY h:mm a')
        return formatedDate
    }

    

    useEffect(() => {
        (async function () {
            const result = await getMyApplications()

            if (result.success) {
                setApplications(result?.applications)
                console.log('applications', result?.applications)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops',
                    text: result?.message
                })
            }
        })()
    }, [])
    return (
        <div className="container px-10 py-5">
            <p className="font-bold">My Applications ({applications.length})</p>

            {
                applications?.length > 0
                    ? <>
                        <table className="w-full mt-10">
                            <thead>
                                <tr className="bg-gray-200 text-gray-500 text-sm">
                                    <td className="p-1">Role</td>
                                    <td className="p-1">Date Applied</td>
                                    <td className="p-1">Status</td>
                                    <td className="p-1">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    applications.map((appl: any, index: number) => {
                                        return (
                                            <tr key={index} className="!mt-2 border-b border-gray-300 hover:border hover:border-blue-500">
                                                <td className="p-2">
                                                    <div className="flex gap-2">
                                                        <div className="w-[50px] h-[50px] bg-blue-200 flex justify-center items-center rounded">
                                                            <i className="fa-solid fa-briefcase !text-blue-500 !text-xl"></i>
                                                        </div>
                                                        <div className="flex flex-col justify-between">
                                                            <p className="font-semibold text-xs">{appl?.jobDetails?.jobTitle} <span className="bg-blue-300 text-white font-normal px-2 rounded-full ms-2">{appl?.jobDetails?.locationType}</span></p>
                                                            <p><span className="text-xs text-gray-400">{appl?.companyDetails?.companyName}</span><span className="ms-5 text-xs text-gray-400"><i className="fa-solid fa-location-dot !text-xs !text-gray-400 me-1"></i>{appl?.companyDetails?.location?.city}, {appl?.companyDetails?.location?.state}</span></p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-xs text-gray-400">{formatLocalDateTime(appl?.createdAt)}</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs text-green-500">{appl?.status}</p>
                                                </td>
                                                <td>
                                                    <button type="button" className="text-xs text-white bg-blue-500 px-3 py-1 rounded cursor-pointer">Details</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </>
                    : <p className="text-xs text-gray-400 mt-10">No applications</p>
            }
        </div>
    )
}