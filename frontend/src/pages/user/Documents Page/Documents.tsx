import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import AddCertificateForm from "../../../components/candidate/Forms/CertificateAdd"
import { loadUserCertificates, deleteUserCertificate } from "../../../services/certificateServices"
// import {  } from "../../../services/userServices"
import { deleteUserResume, loadUserResumes, setUserResumePrimary } from "../../../services/resumeServices"
import { BiMedal, BiStar, BiTrash } from "react-icons/bi"
import { BsArrowLeft, BsThreeDotsVertical } from "react-icons/bs"
import { FiFileText } from "react-icons/fi"
import { Certificates, Resumes } from "../../../types/entityTypes"
import { formattedDateMoment } from "../../../services/util/formatDate"
import { Modal, Skeleton } from "@mui/material"
import ViewPDFDocument from "../../../components/common/PdfViewer"
import { CgClose } from "react-icons/cg"
import { Notify } from "notiflix"
import ResumeAddForm from "../../../components/candidate/Forms/ResumeAddForm"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

interface CertificateCardProps {
    certificate: Certificates,
    deleteCertificate: () => void
}

const CertificateCard = ({certificate, deleteCertificate}: CertificateCardProps) => {
    const [isCertificateMenuOpened, setIsCertificateMenuOpened] = useState<boolean>(false)
    const toggleCertificateMenu = () => setIsCertificateMenuOpened(prv => !prv)
    const [showCertificatePreview, setShowCertificatePreview] = useState<boolean>(false)
    const openCertificatePreview = () => setShowCertificatePreview(true)
    const closeCertificatePreview = () => setShowCertificatePreview(false)

    return(
        <>
            <div className="p-4 bg-white border border-gray-100 rounded-xl flex gap-4 hover:shadow-md transition-shadow duration-200">
  <div className="flex gap-4 flex-1">
    <div className="bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center w-12 h-12 flex-shrink-0">
      <BiMedal size={24} />
    </div>
    <div className="flex flex-col justify-center">
      <p className="text-gray-900 font-semibold text-base leading-none">{certificate.name}</p>
      <p className="text-sm mt-1.5 text-gray-500 font-medium">{certificate.issuedOrganization}</p>
      
      <div className="flex items-center gap-3 mt-3">
        <span className="bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-600 rounded uppercase tracking-wider">PDF</span>
        <span className="text-gray-400 text-xs">{'1 MB'}</span>
        <span className="text-gray-300">•</span>
        <p className="text-xs text-gray-500">Issued {formattedDateMoment(certificate.issuedDate as string, "MMM DD YYYY")}</p>
      </div>
    </div>
  </div>

  <div className="relative">
    <button onClick={toggleCertificateMenu} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
      <BsThreeDotsVertical className="text-gray-400" />
    </button>
    {isCertificateMenuOpened && (
      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 shadow-xl rounded-lg z-10">
        <button onClick={() => {openCertificatePreview(); setIsCertificateMenuOpened(false)}} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50">Preview</button>
        <a href={certificate.certificateUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50">Download</a>
        <button onClick={() => {deleteCertificate(); setIsCertificateMenuOpened(false)}} className="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-50 flex items-center gap-2">
          <BiTrash size={14} /> Delete
        </button>
      </div>
    )}
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
                                        fileUrl={certificate.certificateUrl as string}
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

interface ResumeCardProps {
    resume: Resumes,
    setResumes: Function
}

const ResumeCard = ({resume, setResumes}: ResumeCardProps) => {
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
                        toast.success(result?.success)
                        setResumes((prv: Resumes[]) => {
                            return prv.map((res: Resumes) => {
                                return {...res, isPrimary: res._id === result.result._id}
                            })
                        })
                        setIsResumeMenuOpen(false)
                        return
                    }else{
                        toast.warn('Can not set resume as primary, try after some time')
                        return
                    }
                } catch (error: unknown) {
                   toast.error(error instanceof Error ? error.message : 'Something went wrong')
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
                    const result = await toast.promise(
                        deleteUserResume(resumeId, cloudinaryPublicId),
                        {
                            pending: 'Deleting resume...',
                            success: 'Resume deleted',
                            error:{
                                render(props) {
                                    const data = props.data as AxiosError<{message: string}>
                                    return data.message
                                },
                            }
                        }
                    )

                    if(result?.success){
                        setResumes((prv: Resumes[]) => {
                            return prv.filter((res: Resumes) => res._id !== resumeId)
                        })
                        return
                    }
                } catch (error: unknown) {
                    toast.error(error instanceof Error ? error.message : 'Something went wrong')
                } finally {
                    setIsResumeMenuOpen(false)
                }
            }else{
                return
            }
        })
    }

    return (
        <>
        <div className="p-4 bg-white border border-gray-100 rounded-xl flex gap-4 hover:shadow-md transition-shadow duration-200">
  <div className="flex gap-4 flex-1">
    <div className="bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center w-12 h-12 flex-shrink-0">
      <FiFileText size={24} />
    </div>
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-3">
        <p className="text-gray-900 font-semibold text-base leading-none">{resume.name}</p>
        {resume.isPrimary && (
          <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100 text-[10px] font-bold flex items-center gap-1">
            <BiStar size={12} /> PRIMARY
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 mt-3">
        <span className="bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-600 rounded uppercase tracking-wider">PDF</span>
        <span className="text-gray-400 text-xs">{resume.size || '1 MB'}</span>
        <span className="text-gray-300">•</span>
        <p className="text-xs text-gray-500 font-light italic">Uploaded {formattedDateMoment(resume.createdAt as string, "MMM DD YYYY")}</p>
      </div>
    </div>
  </div>

  <div className="relative">
    <button onClick={toggleResumeMenu} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
      <BsThreeDotsVertical className="text-gray-400" />
    </button>
    {isResumeMenuOpen && (
      <div className="absolute right-4 top-0 w-44 bg-white border border-gray-100 shadow-xl rounded-lg z-10">
        <button onClick={() => {showResumePreview(); setIsResumeMenuOpen(false)}} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50">Preview</button>
        <a href={resume.resumeUrlCoudinary} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50">Download</a>
        {!resume.isPrimary && (
          <button onClick={() => {setResumePrimary(resume._id as string); setIsResumeMenuOpen(false)}} className="w-full text-left px-4 py-2 text-xs text-blue-600 hover:bg-blue-50">Set as Primary</button>
        )}
        <button onClick={() => {deleteResume(resume._id as string, resume.resumePublicIdCloudinary as string); setIsResumeMenuOpen(false)}} className="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-50 flex items-center gap-2">
          <BiTrash size={14} /> Delete
        </button>
      </div>
    )}
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
                                        fileUrl={resume.resumeUrlCoudinary as string}
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
    const [certificateModalOpen, setCertificateModalOpen] = useState(false)
    const [resumeModalOpen, setResumeModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const openCertificateAddModal = () => setCertificateModalOpen(true)
    const closeCertificateAddModal = () => setCertificateModalOpen(false)

    const openResumeModal = () => setResumeModalOpen(true)
    const closeResumeModal = () => setResumeModalOpen(false)

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
            const result = await toast.promise(
                deleteUserCertificate(certificateId, publicId),
                {
                    pending: 'Deleting certificate...',
                    success: 'Certificate deleted',
                    error:{
                        render(props) {
                            const data = props.data as AxiosError<{message: string}>
                            return data.message
                        },
                    }
                }
            )

            if(result?.success){
                setCertificates((prv: Certificates[]) => {
                    return prv.filter((certificate: Certificates) => certificate._id !== certificateId)
                })
                return
            }
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
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
                setLoading(true)
               try {
                const [resumePromiseResult, certificatePromiseResult] = await Promise.all([loadUserResumes(), loadUserCertificates()])
    
                setResumes(resumePromiseResult.resumes)
                setCertificates(certificatePromiseResult.certificates)
                
               } catch (error: unknown) {
                    console.log('--error--', error)
                    toast.error(error instanceof Error ? error.message : 'Something went wrong')
               } finally {
                setLoading(false)
               }
       })()
    }, [])

    return(
        <>
<div className="px-6 pt-15 pb-20 lg:px-24 lg:py-10 max-w-6xl mx-auto">
    <header className="mb-10">
        <button onClick={() => navigate(-1)} className="flex mb-2 gap-3 items-center text-xs text-gray-500 p-2 rounded-md hover:bg-gray-200">
            <BsArrowLeft />
            Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Documents</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">Manage your professional assets, including resumes and certifications.</p>
    </header>

    <div className="space-y-12">
        <section>
            <div className="flex items-end justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Certifications</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Showcase your professional achievements and verified skills.</p>
                </div>
                <button 
                    onClick={openCertificateAddModal} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm active:scale-95"
                >
                    + Add Certificate
                </button>
            </div>

            {loading
                ? <>
                    <div className="flex gap-3">
                        <div>
                            <Skeleton variant="circular" height={40} width={40} />
                        </div>
                        <div>
                            <Skeleton width={300} />
                            <Skeleton height={10} />
                        </div>
                    </div>
                </>
                : <div className="grid grid-cols-1 gap-4">
                {certificates.length > 0 ? (
                    certificates.map((certificate, index) => (
                        <>
                            <CertificateCard 
                            key={index} 
                            deleteCertificate={() => deleteCertificate(certificate._id as string, certificate.certificatePublicId as string)} 
                            certificate={certificate}
                        />
                        </>
                    ))
                ) : (
                    <div className="w-full py-12 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center bg-gray-50/50">
                        <p className="text-xs text-gray-400 font-medium">No certificates added yet.</p>
                    </div>
                )}
            </div>
            }
        </section>

        <hr className="border-gray-100" />

        <section>
            <div className="flex items-end justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Resume / CV</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Manage multiple versions of your resume for different roles.</p>
                </div>
                <button 
                    onClick={openResumeModal} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm active:scale-95"
                >
                    + Add Resume
                </button>
            </div>

            {loading
                ? <>
                    <div className="flex gap-3">
                        <div>
                            <Skeleton variant="circular" height={40} width={40} />
                        </div>
                        <div>
                            <Skeleton width={300} />
                            <Skeleton height={10} />
                        </div>
                    </div>
                  </>
                : <div className="grid grid-cols-1 gap-4">
                {resumes.length > 0 ? (
                    resumes.map((resume, index) => (
                        <ResumeCard key={index} setResumes={setResumes} resume={resume} />
                    ))
                ) : (
                    <div className="w-full py-12 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center bg-gray-50/50">
                        <p className="text-xs text-gray-400 font-medium">No resumes uploaded yet.</p>
                    </div>
                )}
            </div>
            }
        </section>
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
