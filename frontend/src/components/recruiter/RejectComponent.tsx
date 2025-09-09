import { useState } from "react"
import { rejectCandidateJobApplication } from "../../services/recruiterServices"
import Swal from "sweetalert2"

export default function RejectApplicationComponent({applicationDetails, closeRejectModal} : any){
    const [title, settitle] = useState('Rejected')
    const [reason, setReason] = useState("")
    const [description, setDescripiton] = useState("")
    const [reasonError, setReasonError] = useState("")
    
    async function rejectJobApplication(){
        const reasoerror = !reason || false
        reasoerror ? setReasonError('Select Reason') : setReasonError('')
        if(reasoerror) return

        const messaage = `
            Your application for the ${applicationDetails?.jobDetails?.jobTitle} at ${applicationDetails?.companyDetails?.companyName}
            has rejected due to ${reason}
        `
        
        const result = await rejectCandidateJobApplication(title, messaage, 'Job-Application-Rejection', applicationDetails.jobId, applicationDetails._id, applicationDetails.candidateId)
        closeRejectModal()
        if(result.success){
            Swal.fire({
            icon:'success',
            title:'Rejected',
            text:'Job application rejected successfully',
            showCancelButton:false,
            showConfirmButton:false,
            timer:2000
        }).then(() => window.location.reload())
        }else{
            Swal.fire({
                icon:'error',
                title:"Oops",
                text:result.message
            })
        }
    }
    return(
        <div>
            <h3 className="text-center">Reject Application ?</h3>
            <div>
                <label htmlFor="">Title</label>
                <input type="text" value="Rejected" className="border border-gray-300 block w-full rounded !px-3 !py-1" readOnly  />
            </div>
            <div>
                <label htmlFor="">Reason</label>
                <select value={reason} onChange={(event) => setReason(event.target.value)} className="border text-sm !py-1 outline-none border-gray-300 rounded block w-full" name="" id="">
                    <option value="">Select</option>
                    <option value="lack of qualification">Lack of Qualification</option>
                    <option value="lack of skills">Lack of Skills</option>
                    <option value="lack of experience">Lack of experience</option>
                    <option value="Bad Resume">Bad Resume</option>
                </select>
                <label htmlFor="" className="text-xs text-red-500 block">{reasonError}</label>
            </div>
            <div>
                <button onClick={rejectJobApplication} className="!mt-5 bg-blue-500 text-white w-full rounded text-sm !p-2">Reject Application</button>
            </div>
        </div>
    )
}