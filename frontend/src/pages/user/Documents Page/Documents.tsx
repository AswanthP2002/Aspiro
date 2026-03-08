import { useEffect, useRef, useState } from "react"
import Swal from "sweetalert2"
import AddCertificateForm from "../../../components/candidate/Forms/CertificateAdd"
import { deleteUserCertificate, deleteUserResume, loadUserCertificates, loadUserResumes, setUserResumePrimary } from "../../../services/userServices"
import { BiMedal, BiStar, BiTrash } from "react-icons/bi"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiFileText } from "react-icons/fi"
import { Certificates, Resumes } from "../../../types/entityTypes"
import { formattedDateMoment } from "../../../services/util/formatDate"
import { Modal } from "@mui/material"
import ViewPDFDocument from "../../../components/common/PdfViewer"
import { CgClose } from "react-icons/cg"
import { Notify } from "notiflix"
import ResumeAddForm from "../../../components/candidate/Forms/ResumeAddForm"

const CertificateCard = ({certificate, deleteCertificate}: {certificate: Certificates, deleteCertificate: any}) => {
    const [isCertificateMenuOpened, setIsCertificateMenuOpened] = useState<boolean>(false)
    const toggleCertificateMenu = () => setIsCertificateMenuOpened(prv => !prv)
    const [showCertificatePreview, setShowCertificatePreview] = useState<boolean>(true)
    const openCertificatePreview = () => setShowCertificatePreview(true)
    const closeCertificatePreview = () => setShowCertificatePreview(false)

    return(
        <>
            <div className="p-3 bg-white border border-gray-200 rounded-md flex gap-3">
                                <div className="flex gap-3 flex-1">
                                    <div className="bg-pink-200 rounded-md flex items-center justify-center w-10 h-10">
                                    <BiMedal />
                                </div>
                                <div>
                                    <p className="text-gray-900">{certificate.name}</p>
                                    <p className="text-sm mt-1 text-gray-700 font-light">{certificate.issuedOrganization}</p>
                                    <div className="flex gap-3 text-xs mt-2">
                                        <span className="border px-2 text-gray-500 border-gray-200 rounded-full">PDF</span>
                                        <p className="text-gray-500">{'1 MB'}</p>
                                    </div>
                                    <p className="text-xs mt-2 text-gray-500">Issued Date: {formattedDateMoment(certificate.issuedDate as string, "MMM DD YYYY")}</p>
                                </div>
                                </div>
                                <div className="relative">
                                    <button onClick={toggleCertificateMenu}><BsThreeDotsVertical color="gray" /></button>
                                    {
                                        isCertificateMenuOpened && (
                                            <div className="certificate-menu space-y-2 border border-gray-200 shadow-sm px-5 py-3 bg-white absolute right-0 text-xs">
                                        <div className="">
                                            <button onClick={openCertificatePreview}>Preview</button>
                                        </div>
                                        <div className="">
                                            <a 
                                                href={certificate.certificateUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download={certificate.name}
                                            >Download</a>
                                        </div>
                                        <div className="">
                                            <button onClick={deleteCertificate} className="flex items-center text-red-500 gap-2"><BiTrash color="red" /> Delete</button>
                                        </div>
                                    </div>
                                        )
                                    }
                                </div>
                            </div>

                {
                    showCertificatePreview && (
                        <Modal className="flex items-center justify-center" open={showCertificatePreview}>
                            <div className="bg-white rounded-lg max-h-[90vh] overflow-auto outline-none p-4 w-full max-w-4xl">
                                <div className="flex justify-end sticky top-0 z-50 mb-2">
                                    <button onClick={closeCertificatePreview} className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100"><CgClose /></button>
                                </div>
                                <div className="flex justify-center">
                                    <ViewPDFDocument
                                        fileUrl={certificate.certificateUrl}
                                        docWidth={700}
                                    />
                                </div>
                            </div>
                        </Modal>
                    )
                }
        </>
    )
}

interface EditResumeResponsePayload {
    success: boolean
    message: string
    result: Resumes
}

const ResumeCard = ({resume, setResumes}: {resume: Resumes, setResumes: Function}) => {
    const [isResumeMenuOpen, setIsResumeMenuOpen] = useState<boolean>(false)
    const toggleResumeMenu = () => setIsResumeMenuOpen(prv => !prv)
    const [isResumePreviewOpen, setIsResumePreviewOpen] = useState<boolean>(false)

    const showResumePreview = () => setIsResumePreviewOpen(true)
    const closeResumePreview = () => setIsResumePreviewOpen(false)

    const setResumePrimary = async (resumeId: string) => {
        if(!resumeId) return

        Swal.fire({
            icon: 'question',
            title: 'Set as primary ?',
            text: 'Do you want to set this resume as primary?. This will be your main resume for job applications',
            showConfirmButton: true, 
            showCancelButton: true,
            confirmButtonText: 'Set as primary',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(async (result) => {
            if(result.isConfirmed){
                try {
                    const result: EditResumeResponsePayload = await setUserResumePrimary(resumeId)
                    
                    if(result?.success){
                        Notify.success(result?.message, {timeout: 3000})
                        setResumes((prv: Resumes[]) => {
                            return prv.map((res: Resumes) => {
                                return {...res, isPrimary: res._id === result.result._id}
                            })
                        })
                        setIsResumeMenuOpen(false)
                        return
                    }else{
                        Notify.warning('Can not set resume primary, please try again after some time', {timeout: 3000})
                        return
                    }
                } catch (error: unknown) {
                    Notify.failure(error instanceof Error ? error.message: 'Something went wrong', {timeout: 3000})
                }
            }else{
                return
            }
        })
    }

    const deleteResume = async (resumeId: string, cloudinaryPublicId: string) => {
        if(!resumeId) return

        Swal.fire({
            icon: 'question',
            title: 'Delete Resume ?',
            text: 'Do you want to delete this resume?, this action can not be re do',
            showConfirmButton: true, 
            showCancelButton: true,
            confirmButtonText: 'Delete',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(async (result) => {
            if(result.isConfirmed){
                try {
                    const result = await deleteUserResume(resumeId, cloudinaryPublicId)

                    if(result?.success){
                        Notify.success(result?.message, {timeout: 3000})
                        setResumes((prv: Resumes[]) => {
                            return prv.filter((res: Resumes) => res._id !== resumeId)
                        })
                        setIsResumeMenuOpen(false)
                        return
                    }else{
                        Notify.warning('Can not set resume primary, please try again after some time', {timeout: 3000})
                        return
                    }
                } catch (error: unknown) {
                    Notify.failure(error instanceof Error ? error.message: 'Something went wrong', {timeout: 3000})
                }
            }else{
                return
            }
        })
    }

    return (
        <>
        <div className="p-3 bg-white border border-gray-200 rounded-md flex gap-3">
                                <div className="flex gap-3 flex-1">
                                    <div className="bg-red-300 rounded-md flex items-center justify-center w-10 h-10">
                                    <FiFileText />
                                </div>
                                <div>
                                    <p className="text-gray-900">{resume.name}</p>
                                    <div className="flex gap-3 items-center text-xs mt-2">
                                        <span className="border px-2 text-gray-500 border-gray-200 rounded-full">PDF</span>
                                        <p className="text-gray-500">{resume.size || '1 MB'}</p>
                                        {
                                            resume.isPrimary && (
                                                <span className="bg-blue-200 px-2 text-blue-700 rounded-full border-2 border-blue-500 flex items-center gap-1"><BiStar /> Primary</span>
                                            )
                                        }
                                    </div>
                                    <p className="text-xs mt-2 text-gray-500">Uploaded on: {formattedDateMoment(resume.createdAt, "MMM DD YYYY")}</p>
                                </div>
                                </div>
                                <div className="relative">
                                    <button onClick={toggleResumeMenu}><BsThreeDotsVertical color="gray" /></button>
                                    {
                                        isResumeMenuOpen && (
                                            <div className="certificate-menu space-y-2 border border-gray-200 shadow-sm px-5 py-3 bg-white absolute right-0 w-[120px] text-xs">
                                        <div className="">
                                            <button onClick={showResumePreview}>Preview</button>
                                        </div>
                                        <div className="">
                                            <a
                                                href={resume.resumeUrlCoudinary}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download={resume.name}
                                            >Download</a>
                                        </div>
                                        {
                                            !resume.isPrimary && (
                                                <div>
                                                    <button onClick={() => setResumePrimary(resume._id as string)}>Set Primary</button>
                                                </div>
                                            )
                                        }
                                        <div className="">
                                            <button onClick={() => deleteResume(resume._id as string, resume.resumePublicIdCloudinary as string)} className="flex items-center text-red-500 gap-2"><BiTrash color="red" /> Delete</button>
                                        </div>
                                    </div>
                                        )
                                    }
                                </div>
                            </div>

                            {
                    isResumePreviewOpen && (
                        <Modal className="flex items-center justify-center" open={isResumePreviewOpen}>
                            <div className="bg-white rounded-lg max-h-[90vh] overflow-auto outline-none p-4 w-full max-w-4xl">
                                <div className="flex justify-end sticky top-0 z-50 mb-2">
                                    <button onClick={closeResumePreview} className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100"><CgClose /></button>
                                </div>
                                <div className="flex justify-center">
                                    <ViewPDFDocument
                                        fileUrl={resume.resumeUrlCoudinary}
                                        docWidth={700}
                                    />
                                </div>
                            </div>
                        </Modal>
                    )
                }
        </>
    )
}

export default function DocumentsPage(){
    const [certificates, setCertificates] = useState<Certificates[]>([])
    const [resumes, setResumes] = useState<Resumes[]>([])
    const [pdfile, setpdffile] = useState<any>("")
    const [loading, setloading] = useState(false)
    const [certificateModalOpen, setCertificateModalOpen] = useState(false)
    const [resumeModalOpen, setResumeModalOpen] = useState(false)

    const openCertificateAddModal = () => setCertificateModalOpen(true)
    const closeCertificateAddModal = () => setCertificateModalOpen(false)

    const openResumeModal = () => setResumeModalOpen(true)
    const closeResumeModal = () => setResumeModalOpen(false)

    const fileFieldRef : any = useRef(null)

    const deleteCertificate = async (certificateId : string, publicId : string) => {
        if(!certificateId || !publicId)return

        Swal.fire({
            icon: 'question',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            allowOutsideClick: false,
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if(result.isConfirmed){
                try {
            const result = await deleteUserCertificate(certificateId, publicId)
            if(result?.success){
                Notify.success(result?.message, {timeout: 3000})
                //local state updation
                setCertificates((prv: Certificates[]) => {
                    return prv.filter((certificate: Certificates) => certificate._id !== certificateId)
                })
                return
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout: 3000})
            console.log(error)
        }
            }else{
                return
            }
        })
    }

    const onResumeAdd = (newResume: Resumes) => {
        if(!newResume) return
        setResumes((prv: Resumes[]) => {
            return [...prv, newResume]
        })
    }

    const onCertificateAdd = (newCertificate: Certificates) => {
        if(!newCertificate) return
        setCertificates((prv: Certificates[]) => {
            return [...prv, newCertificate]
        })
    }
    
    useEffect(() => {
       (async function(){

               try {
                const resumeResult = await loadUserResumes()
                console.log('--checking resume result from the backend--', resumeResult)
                const certificateResult = await loadUserCertificates()
 
                if (resumeResult?.success && certificateResult.success) {
                 
                setResumes(resumeResult?.resumes)
                setCertificates(certificateResult?.certificates)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops',
                        text: 'Sorry!, something went wrong'
                    })
                }
               } catch (error: unknown) {
                    console.log('--error--', error)
                    Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout: 3000})
               }
       })()
    }, [])

    return(
        <>
        <div className="px-5 py-10 lg:px-20">
            <p className="text-xl font-medium">Documents</p>
            <p className="font-light text-sm mt-1">Manage your Resume, CV, Certificates</p>
            <div className="mt-10 w-full">
                <div className="flex justify-between">
                    <div>
                        <p className="font-light">Your Certifications</p>
                        <p className="text-xs text-gray-700">Showcase your professional certifications</p>
                    </div>
                    <div>
                        <button onClick={openCertificateAddModal} className="bg-blue-500 text-white px-3 py-2 rounded-md text-xs">Add Certificate</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 mt-3">
                    {   certificates.length > 0 &&
                        certificates.map((certificate, index: number) => (
                            <CertificateCard key={index} deleteCertificate={() => deleteCertificate(certificate._id as string, certificate.certificatePublicId as string)} certificate={certificate}/>
                        ))
                    }
                    {
                        certificates.length === 0 && (
                            <div className="w-full flex items-center justify-center text-xs text-gray-500 mt-5">
                                <p>No Certificates Added</p>
                            </div>
                        )
                    }
                </div>
            </div>
            
            <div className="border border-gray-300 w-full mt-8"></div>

            <div className="mt-10 w-full">
                <div className="flex justify-between">
                    <div>
                        <p className="font-light">Your Resume / CV</p>
                        <p className="text-xs text-gray-700">Upload and manage yoru Resume documents</p>
                    </div>
                    <div>
                        <button onClick={openResumeModal} className="bg-blue-500 text-white px-3 py-2 rounded-md text-xs">Add Resume</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 mt-3">
                    {   resumes.length > 0 &&
                        resumes.map((resume: Resumes, index: number) => (
                            <ResumeCard key={index} setResumes={setResumes} resume={resume} />
                        ))
                    }
                    {
                        resumes.length === 0 && (
                            <div className="w-full flex items-center justify-center mt-5">
                                <p className="text-gray-500 text-xs">No Resumes Added</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        {
            certificateModalOpen && (
                <AddCertificateForm certificateModalOpen={certificateModalOpen} closeCertificateModal={closeCertificateAddModal} onCertificateAdd={onCertificateAdd} />
            )
        }

        {
            resumeModalOpen && (
                <ResumeAddForm resumeModalOpen={resumeModalOpen} closeResumeModal={closeResumeModal} onResumeAdd={onResumeAdd} />
            )
        }
        </>
    )
}
