import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getJobApplicationDetails } from "../../../services/recruiterServices"
import Swal from "sweetalert2"
import defaultPicture from '/default-img-instagram.png'
import ViewPDFDocument from "../../../components/common/PdfViewer"
import RejectApplicationComponent from "../../../components/recruiter/RejectComponent"
import GeneralModal from "../../../components/common/Modal"

export default function ViewApplicationDetailsPage(){
    const [applicationDetails, setApplicationDetails] = useState<any>({})
    const location = useLocation()
    const navigateTo = useNavigate()

    const [rejectModalOpen, setRejectModalOpen] = useState(false)

    const closeRejectModal = () => setRejectModalOpen(false)

    const navigateToCandidatePublicProfile = (candidateId : string) => {
        navigateTo(`/candidates/${candidateId}`, {state:{candidateId}})
        return
    }

    const {applicationId}  = location.state || {}

    async function rejectApplication(){

    }

    useEffect(() => {
        (async function() {
            const result = await getJobApplicationDetails(applicationId)

            if(result?.success){
                console.log('application specific details', result?.result)
                setApplicationDetails(result?.result)
            }else{
                Swal.fire({
                    icon:'error',
                    title:'Oops!',
                    text:result?.message
                })
            }
        })()
    }, [])
    return(
        <>
        <div>
            <p className="font-semibold">Application Details</p>
            <div className="mt-10">
                <div className="candidate-card shadow-lg rounded">
                    <div className="px-10 py-5 flex justify-between items-center">
                    <div onClick={() => navigateToCandidatePublicProfile(applicationDetails?.candidateDetails?._id)} className="cursor-pointer flex gap-5 items-center">
                        <img className="w-[60px]" src={defaultPicture} alt="" />
                        <div>
                            <p className="font-semibold text-sm">{applicationDetails?.candidateDetails?.name}</p>
                            <p className="text-xs mt-1 text-gray-500">{applicationDetails?.candidateDetails?.role}</p>
                        </div>
                    </div>
                    <div className="details">
                        <p className="text-xs text-blue-500"><i className="fa-solid fa-phone !text-xs me-1 !text-gray-500"></i> {applicationDetails?.candidateDetails?.phone}</p>
                        <p className="text-xs text-blue-500 mt-2"><i className="fa-solid fa-envelope !text-xs me-1 !text-gray-500"></i> {applicationDetails?.candidateDetails?.email}</p>
                    </div>
                    </div>
                    <div className="flex justify-end gap-5 px-10 py-5">
                        {
                            applicationDetails?.status === 'rejected'
                                ?  <button disabled={true} className="text-sm text-gray-500">Rejected</button>
                                : <button onClick={() => setRejectModalOpen(true)} className="text-sm border border-blue-500 rounded-full px-4 py-1 text-blue-500">Reject</button>
                        }
                    </div>
                </div>
                
                <p className="font-semibold text-sm mt-10">Description</p>
                <div className="covering-letter-content mt-5">
                    <pre>
                        <p className="text-xs text-gray-500">{applicationDetails?.coverLetterContent}</p>
                    </pre>
                </div>

                <p className="mt-10 font-semibold text-sm">Resume / CV</p>
                <ViewPDFDocument fileUrl={applicationDetails?.resumeDetails?.resumeUrlCoudinary} />
            </div>
        </div>
        <GeneralModal
            openModal={rejectModalOpen}
            closeModal={closeRejectModal}
            children={<RejectApplicationComponent closeRejectModal={closeRejectModal} applicationDetails={applicationDetails} />}
            size="small"
        />
        </>
    )
}