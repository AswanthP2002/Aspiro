import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import defaultProfile from '../../../../public/default-img-instagram.png'
import { finalizeShortList, getApplicationDetails, rejectJobApplication } from "../../../services/recruiterServices"
import ApplicantCard from "../../../components/recruiter/ApplicantCard"
import Swal from "sweetalert2"
import Loader from "../../../components/candidate/Loader"
import { Notify } from "notiflix"

interface Application {
    _id: string;
    applicantDetails: {
        _id: string;
        name: string;
        headline: string;
        profilePicture: { cloudinarySecureUrl: string };
    };
    // Add other application properties as needed
}

export default function ApplicantManagePage(){
    const [selectedCards, setSelectedCards] = useState<any[]>([])
    const [selectionMode, setSelectionMode] = useState(false)
    const [loading, setLoading] = useState(false);
    const [jobDetails, setJobDetails] = useState<any>(null);
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

                rejectJobApplication(candidateId, applicationId, reason, message)
                    .then((res) => {
                        if (!res?.success) return Notify.failure(res?.message);
                        Swal.fire({
                            icon:'success',
                            title:'Rejected',
                            text:'Application rejected successfully',
                            showConfirmButton:false,
                            showCancelButton:false,
                            timer:1500
                        });
                        setApplications(prev => prev.filter(app => app._id !== applicationId));
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
        const foundedApplication = applications.find((app) => app._id === id);

        setShortList((prev) => {
            if (prev.some((p) => p._id === id)) return prev;
            return [...prev, foundedApplication];
        })

        setApplications((prev) => {
            return prev.filter((app) => app._id !== id)
        })

    }

    const handleRemoveFromShortList = (id : string) => {
        const foundApplication = shortList.find((app) => app._id === id);

        setApplications((prev) => [...prev, foundApplication])
        setShortList((prev) => prev.filter((app) => app._id !== id))
    }

    const handleShortlistAll = () => {
        if (selectedCards.length === 0) return Notify.info('Please select candidates to shortlist.');
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

    const [applications, setApplications] = useState<Application[]>([])
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
            setLoading(true);
            try {
                const [appResult] = await Promise.all([
                    getApplicationDetails(jobId),
                    //getJobDetails(jobId)
                ]);

                if (appResult?.success) {
                    setApplications(appResult.result);
                } else {
                    Notify.failure(appResult?.message || "Could not fetch applications.");
                }

               // if (jobResult?.success) {
                    setJobDetails([]);
               // } else {
               //     Notify.failure(jobResult?.message || "Could not fetch job details.");
                //}
            } catch (error) {
                Notify.failure("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        })()
    }, [])

    return(
        <>
        {loading && <Loader />}
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">{jobDetails?.jobTitle || 'Loading...'}</h1>
                    <p className="text-gray-500">{jobDetails?.location}</p>
                    <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                        <span className="font-medium">Total Applicants: <span className="text-blue-600">{applications.length + shortList.length}</span></span>
                        <span className="font-medium">Shortlisted: <span className="text-green-600">{shortList.length}</span></span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* New Applications Column */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-700">New Applicants ({applications.length})</h2>
                            <div className="flex items-center gap-2">
                                <button onClick={selectAllCard} className="text-xs font-medium text-blue-600 hover:underline">Select All</button>
                                {selectionMode && <button onClick={unselectAllCard} className="text-xs font-medium text-red-600 hover:underline">Cancel</button>}
                            </div>
                        </div>
                        {selectionMode && (
                            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 flex items-center justify-between">
                                <p className="text-sm font-medium text-blue-800">{selectedCards.length} selected</p>
                                <button onClick={handleShortlistAll} className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-blue-700">
                                    Shortlist Selected
                                </button>
                            </div>
                        )}
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {applications.length > 0 ? applications.map((applicant, index) => (
                                <ApplicantCard 
                                    key={index} 
                                    isSelected={selectedCards.includes(applicant?._id)} 
                                    selectionMode={selectionMode} 
                                    applicationData={applicant} 
                                    defaultProfile={defaultProfile} 
                                    selectFromOption={() => selectFromOption(applicant?._id)}
                                    toggleCardSelection={() => toggleCardSelection(applicant?._id)}
                                    shortList={() => handleShortlistSingle(applicant._id)}
                                    buttonOptions={['Add to shortlist', 'Select tile', 'Reject application']}
                                    flag={'applicationList'}
                                    reject={() => rejectIndividualCandidate(applicant?.applicantDetails._id, applicant._id)} 
                                />
                            )) : (
                                <div className="text-center py-10">
                                    <i className="fa-solid fa-inbox text-3xl text-gray-400"></i>
                                    <p className="mt-2 text-sm text-gray-500">No new applications.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Shortlisted Column */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-700">Shortlisted ({shortList.length})</h2>
                            {shortList.length > 0 && (
                                <button onClick={finalizeShortlistMethod} className="bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-green-700">
                                    Finalize Shortlist
                                </button>
                            )}
                        </div>
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {shortList.length > 0 ? shortList.map((application, index) => (
                                <ApplicantCard 
                                    key={index} 
                                    applicationData={application} 
                                    defaultProfile={defaultProfile}
                                    buttonOptions={['Remove','Interview email', 'Reject']} 
                                    flag={'shortList'}
                                    removeFromShortlist={() => handleRemoveFromShortList(application._id)} 
                                />
                            )) : (
                                <div className="text-center py-10">
                                    <i className="fa-solid fa-star text-3xl text-gray-400"></i>
                                    <p className="mt-2 text-sm text-gray-500">No candidates shortlisted yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}