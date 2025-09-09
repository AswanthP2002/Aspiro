import { useState } from "react"
import formatDate from "../../services/util/formatDate"
import ApplicantCardOptions from "./ApplicantOptionsCard"
import { useNavigate } from "react-router-dom"

export default function ApplicantCard({reject, removeFromShortlist, flag, buttonOptions, applicationData, isSelected, shortList, defaultProfile, selectionMode, selectFromOption, toggleCardSelection }: any) {
    const [showOptions, setShowOptions] = useState(false)

    const navigateTo = useNavigate()
    
    const selectMethod = () => {
        selectFromOption()
        setShowOptions(false)
    }
    const addToShortlistMethod = () => {
        shortList()
        setShowOptions(false)
    }

    const rejectMethod = () => {
        reject()
        setShowOptions(false)
    }

    const openApplication = (applicationId : string) => {
        if(applicationId){
            navigateTo(`/recruiter/profile/application/details/${applicationId}`, {state:{applicationId}})
            return
        }
    }
    
    return (
        <div className={`col border ${applicationData?.status === 'rejected' ? 'pointer-events-none' : ""} border-gray-300 rounded bg-white p-3 relative`}>
            <ApplicantCardOptions reject={rejectMethod} removeFromShortlist={removeFromShortlist} flag={flag} buttonOptions={buttonOptions} showCard={showOptions} selectMethod={selectMethod} addToShortListMethod={addToShortlistMethod} rejectMethod={rejectMethod} />
            <i onClick={() => setShowOptions(prev => !prev)} className="fa-solid fa-ellipsis !text-sm cursor-pointer absolute right-1 top-0"></i>
            <div className="flex metadata-candidate gap-3">
                <div className="profile rounded-full w-[40px] h-[40px]">
                    <img src={defaultProfile} className="w-full h-full" alt="" />
                </div>
                <div>
                    <p className="text-xs">{applicationData?.applicantDetails?.name}</p>
                    <p className="text-gray-300 font-normal text-xs">{applicationData?.applicantDetails?.role}</p>
                </div>
            </div>
            <hr className="mt-2 mb-2" />
            <div>
                <ul>
                    <li><p className="text-gray-400 text-sm">Applied on : {formatDate(applicationData?.createdAt)}</p></li>
                    {/* <li><p className="text-gray-400">Education : {applicant?.qualification}</p></li> */}
                </ul>
                <p className="cursor-pointer text-blue-500 text-xs font-semibold mt-2">Inspect Candidate</p>
                <button onClick={() => openApplication(applicationData?._id)}>
                    <p className="cursor-pointer text-blue-500 text-xs font-semibold mt-2">Open Application</p>
                </button>
                <p className="cursor-pointer text-blue-500 text-xs font-semibold mt-2">View Resume</p>
            </div>
            <div>
                {
                    applicationData.status === 'opened' && (<p className="text-xs mt-3 text-blue-400">{applicationData?.status}</p>)
                }
                {
                    applicationData.status === 'rejected' && (<p className="text-xs mt-3 text-red-400">{applicationData?.status}</p>)
                }
                {
                    applicationData.status === 'shortlisted' && (<p className="text-xs mt-3 text-green-400">{applicationData?.status}</p>)
                }
            </div>
            {
                selectionMode && (
                    <div className="flex justify-end">
                        <input type="checkBox" checked={isSelected} onChange={toggleCardSelection} />
                    </div>
                )
            }
        </div>
    )
}