import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import defaultProfile from '../../../../public/default-img-instagram.png'
import { finalizeShortList, getApplicationDetails, rejectJobApplication } from "../../../services/recruiterServices"
import ApplicantCard from "../../../components/recruiter/ApplicantCard"
import Swal from "sweetalert2"

export default function ApplicantManagePage(){
    const [selectedCards, setSelectedCards] = useState<any[]>([])
    const [selectionMode, setSelectionMode] = useState(false)
    
    const params : any = useParams()
    const jobId = params.jobId
    const navigator = useNavigate()

    function rejectIndividualCandidate(candidateId : string, applicationId : string){
        Swal.fire({
            title: 'Reject Candidate',
            html: `
      <label class="text-sm">Reason</label>
      <select id="reasonSelect" class="">
        <option value="">-- Select reason --</option>
        <option value="Does not meet basic qualification">Does not meet basic qualification</option>
        <option value="Insufficient experience">Insufficient experience</option>
        <option value="Skill mismatch">Skill mismatch</option>
        <option value="Education criteria not met">Education criteria not met</option>
      
        </select>
      <textarea id="rejectionMessage" class="w-full swal2-textarea" placeholder="Write rejection message"></textarea>
    `,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                const reason = (document.getElementById('reasonSelect') as HTMLSelectElement).value;
                const message = (document.getElementById('rejectionMessage') as HTMLTextAreaElement).value;

                if (!reason) {
                    Swal.showValidationMessage('Please select a reason');
                }
                return { reason, message };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { reason, message } = result.value as { reason: string; message: string };

                await rejectJobApplication(candidateId, applicationId, reason, message)
                    .then((result) => {
                        Swal.fire({
                            icon:'success',
                            title:'Rejected',
                            text:'Application rejected successfully',
                            showConfirmButton:false,
                            showCancelButton:false,
                            timer:3000
                        }).then(() => window.location.reload())
                    })
                
            }
        });
    }

    const toggleCardSelection = (id : string) => { //toggle individual cards
        if(selectedCards.includes(id)){
            setSelectedCards(prev => prev.filter(x => x !== id))
        }else{
            setSelectedCards(prev => [...prev, id])
        }
    }

    const handleShortlistSingle = (id : string) => {
        const foundedApplication = applications.find((app) => app._id === id)

        setShortList((prev) => {
            if (prev.some((p) => p._id === id)) return prev;
            return [...prev, foundedApplication];
        })

        setApplications((prev) => {
            return prev.filter((app) => app._id !== id)
        })

    }

    const handleRemoveFromShortList = (id : string) => {
        const foundApplication = shortList.find((app) => app._id === id)

        setApplications((prev) => [...prev, foundApplication])
        setShortList((prev) => prev.filter((app) => app._id !== id))
    }

    const handleShortlistAll = () => {
        const allSelectedApplications = applications.filter((item) => selectedCards.includes(item._id))
        setShortList(allSelectedApplications);

        setApplications(prev => prev.filter(app => !selectedCards.includes(app._id)));
    }

    const selectFromOption = (id : string) => {
        setSelectionMode(true)
        setSelectedCards([id])
    }

    const selectAllCard = () => {
        setSelectionMode(true)
        setSelectedCards(applications.map((application : any) => application?._id))
    }

    const unselectAllCard = () => {
        setSelectionMode(false)
        setSelectedCards([])
    }

    
    const [applications, setApplications] = useState<any[]>([])
    const [shortList, setShortList] = useState<any[]>([])

    async function finalizeShortlistMethod(){
        const shortlistedIds = shortList.map((app) => {
            return app._id
        })

        const result = await finalizeShortList(jobId, shortlistedIds)
        if(result?.success){
            Swal.fire({
                icon:'success',
                title:'Finalized',
                text:'You will redirected to the details page',
                showConfirmButton:false,
                showCancelButton:false,
                timer:2400
            }).then(() => {
                navigator('finalized', {state:{jobId}})
            })
        }else{
            Swal.fire({
                icon:'error',
                title:'Oops',
                text:result?.message
            })
        }
    }


    useEffect(() => {
        (async () => {
          
                const result = await getApplicationDetails(jobId)
                
                    console.log('Application details from the backen', result?.result)
                    setApplications(result?.result)
                    //setApplicants(result.result[0].candidateDetails)
                
        })()
    }, [])
    return(
        <div className="container px-5 py-10">
            <p className="font-semibold tex-sm">Applications ({applications.length})</p>
            <section className="total-application mt-5">
                    {
                        applications?.length > 0
                            ? <>
                              <div className="actions gap-5 flex justify-end mb-2">
                                <button onClick={selectAllCard} className="text-sm">Select All</button>
                                {
                                    selectionMode && (
                                        <button onClick={unselectAllCard} className="text-sm">Cancel</button>
                                    )
                                }
                                <button onClick={handleShortlistAll} className="text-sm">Shortlist All</button>
                                <button className="text-sm">Reject All</button>
                                <button className="text-sm">Filter</button>
                                <button className="bg-blue-500 rounded text-sm text-white px-3">sort</button>
                              </div>
                              <div className="w-full grid grid-cols-5 gap-2 border border-gray-300 rounded bg-gray p-3">
                                {
                                    applications.map((applicant, index) => {
                                        return <ApplicantCard 
                                        key={index} isSelected={selectedCards.includes(applicant?._id)} 
                                        selectionMode={selectionMode} applicationData={applicant} 
                                        defaultProfile={defaultProfile} selectFromOption={() => selectFromOption(applicant?._id)}
                                        toggleCardSelection={() => toggleCardSelection(applicant?._id)}
                                        shortList={() => handleShortlistSingle(applicant._id)}
                                        buttonOptions={['Add to shortlist', 'Select tile', 'Reject application']}
                                        flag={'applicationList'}
                                        reject={() => rejectIndividualCandidate(applicant?.applicantDetails._id, applicant._id)} />
                                        
                                    })
                                }
                              </div>
                              </>
                            : <p className="text-sm text-center text-gray-400 mt-3">No Applications received</p>
                    }
            </section>

            <section className="shortlist-applications mt-10">
                <div className="flex justify-between">
                    <p className="text-sm font-semibold">Shortlist ({shortList.length})</p>
                    {
                    shortList.length > 0 && (<button onClick={finalizeShortlistMethod} className="bg-blue-300 text-sm rounded px-2 mb-2">Finalize</button>)
                }
                </div>
                
                {
                    shortList.length > 0 && (
                        <div className="w-full grid grid-cols-5 gap-2 border border-gray-300 rounded bg-gray p-3">
                            {
                                shortList.map((application : any, index : number) => {
                                    return <ApplicantCard key={index} applicationData={application} defaultProfile={defaultProfile}
                                    buttonOptions={['Remove','Interview email', 'Reject']} flag={'shortList'}
                                    removeFromShortlist={() => handleRemoveFromShortList(application._id)} />
                                })
                            }
                        </div>
                    )
                }
            </section>
        </div>
    )
}