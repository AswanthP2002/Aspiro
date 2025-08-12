import { useEffect, useRef, useState } from "react"
import pdf from 'pdf-parse'
import Swal from "sweetalert2"
import Loader from "../../../components/candidate/Loader"
import { candidateService, commonService } from "../../../services/apiServices"
import { useSelector } from "react-redux"
import AddCertificateForm from "../../../components/candidate/Forms/CertificateAdd"
import { addCandidateResume, deleteCandidateResume, loadCandidateCertificates, loadCandidateResumes } from "../../../services/candidateServices"
import ResumeCard from "../../../components/candidate/ResumeCard"

export default function DocumentsPage(){
    const [resumes, setResumes] = useState<any[]>([])
    const [certificates, setCertificates] = useState<any[]>([])
    const [pdfile, setpdffile] = useState<any>("")
    const [loading, setloading] = useState(false)
    const [certificateModalOpen, setCertificateModalOpen] = useState(false)

    const openCertificateAddModal = () => setCertificateModalOpen(true)
    const closeCertificateAddModal = () => setCertificateModalOpen(false)

    const fileFieldRef : any = useRef(null)
    const token = useSelector((state : any) => {
        return state.candidateAuth.token
    })

    const clickUpload = () => {
        if(fileFieldRef.current){
            fileFieldRef.current?.click()
        } 
    }

    async function uploadResume(event : any){
        setloading(true)
        const file = event.target?.files[0]
        setpdffile(file)
        const formData = new FormData()
        formData.append('resume', pdfile || file)
        //try {
            // let response = await commonService.parsePdf(token, formData)
            // if(response.status === 401){
            //     const newAccessToken = await candidateService.refreshToken()
            //     response = await commonService.parsePdf(newAccessToken, formData)
            // }
            const result = await addCandidateResume(formData)
            setloading(false)
            if(result?.success){
                Swal.fire({
                    icon:'success',
                    title:'Added',
                    text:'Resume uploaded successfully',
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:3000
                }).then(() => window.location.reload())
            }else{
                Swal.fire({
                    icon:'warning',
                    title:'Oops',
                    text:result?.message,
                    showConfirmButton:true,
                    showCancelButton:false
                })
            }
        //} catch (error : unknown) {
            
        //} finally{
            fileFieldRef.current.value = ''
        //}
    }

    async function deleteResume(resumeId : string, publicId : string) {
        //try {
            // let response = await candidateService.deleteResume(token, resumeId, publicId)

            // if(response.status === 401){
            //     const newAccessToken = await candidateService.refreshToken()
            //     response = await candidateService.deleteResume(newAccessToken, resumeId, publicId)
            // }

            await deleteCandidateResume(resumeId, publicId)

            //if(result?.success){
                Swal.fire({
                    icon:'success',
                    title:'Deleted',
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:1300
                }).then(() => window.location.reload())
            //}
        // } catch (error : unknown) {
        //     if(error instanceof Error){
        //         console.log('Error occured while deleting resume', error)
        //         Swal.fire({
        //             icon:'error',
        //             title:'Error',
        //             text:error?.message
        //         })
        //     }
        // }
    }

    function makeInlinePdfUrl(originalUrl: string): string {
        if (!originalUrl.includes('/upload/')) return originalUrl;

        // Insert fl_attachment:false after /upload and before version
        return originalUrl.replace('/upload/', '/upload/fl_attachment:false/');
    }
    
    useEffect(() => {
       (async function(){
          // try {
            //    let resumeResponse = await candidateService.loadResumes(token)
            //    let certificateResponse = await candidateService.loadCertificates(token)

            //    if (resumeResponse.status === 401) {
            //        const newAccessToken = await candidateService.refreshToken()
            //        resumeResponse = await candidateService.loadResumes(newAccessToken)
            //    }

            //    if(certificateResponse.status === 401) {
            //         const newAccessToken = await candidateService.refreshToken()
            //         certificateResponse = await candidateService.loadCertificates(newAccessToken)
            //    }

               const resumeResult = await loadCandidateResumes()
               const certificateResult = await loadCandidateCertificates()

               if (resumeResult?.success && certificateResult?.success) {
                
                   setResumes(resumeResult?.resumes)
                   setCertificates(certificateResult?.certificates)
               } else {
                   Swal.fire({
                       icon: 'error',
                       title: 'Oops',
                       text: 'Sorry!, something went wrong'
                   })
               }
        //    } catch (error : unknown) {
        //         if(error instanceof Error) {
        //             console.log('Error occured while geting resumes', error)
        //             Swal.fire({
        //                 icon:'error',
        //                 title:'Error',
        //                 text:error?.message
        //             })
        //         }
        //    }
       })()
    }, [])

    return(
        <>
        {
            loading && (<Loader />)
        }
        <div className="container px-10 py-5">
            <section className="resume">
                <p className="font-semibold">Your CV / Resume</p>
                <div className="resume-list mb-5 mt-5">
                    {
                        resumes?.length > 0
                            ? <div className="grid grid-cols-5">
                                {
                                    resumes?.map((resume, index) => {
                                        return <ResumeCard key={index} resumeData={resume} deleteResume={deleteResume} />

                                            {/* <div key={index} className="col bg-gray-100 p-5 flex justify-between items-center">
                                                <div className="item flex gap-3 items-center">
                                                    <i className="fa-solid fa-file"></i>
                                                    <p className="text-sm">Resume</p>
                                                </div>
                                                <div className="relative group">
                                                    <button type="button" className="group btn cursor-pointer"><i className="fa-solid fa-grip-vertical"></i></button>
                                                    <div className="hidden group-hover:block absolute bg-white shadow bottom-0 right-0">
                                                        <div className="px-5 py-2"><p className="text-xs">View</p></div>
                                                        <div className="px-5 py-2"><p onClick={() => deleteResume(resume?._id, resume?. resumePublicIdCloudinary)} className="text-xs">Delete</p></div>
                                                    </div>
                                                </div>
                                            </div> */}
                                    })
                                }
                              </div>
                            : <p className="text-center text-gray-300 mt-3">No Resumes added</p>
                    }
                </div>
                <div>
                    <input ref={fileFieldRef} onChange={(event : any) => uploadResume(event)} type="file" accept="application/pdf" className="hidden" name="" id="" />
                    <button onClick={clickUpload} type="button" className="btn-add-resume border border-2 border-gray-400 flex items-center justify-center gap-2 px-4 py-2">
                        <i className="fa-solid fa-circle-plus"></i>
                        <div>
                            <p className="text-sm">Add new resume</p>
                            <p className="text-xs text-gray-300">Browse file. Only pdf</p>
                        </div>
                    </button>
                </div>

            </section>
            <hr className="mt-3 mb-3"/>
            <section className="certifications">
                <p className="font-semibold">Your Certifications</p>
                <div className="lists">
                    {
                        certificates.length > 0
                            ? <div>
                                <p>Certificates available</p>
                                <div>
                                    {
                                        certificates.map((certificate, index) => {
                                            return <iframe key={index} src={certificate?.certificateUrl}></iframe>
                                        })
                                    }
                                </div>
                              </div>
                            : <div className="w-full">
                                    <p className="text-center text-gray-300 mt-3">No certificates added</p>
                                    <>
                                        <div className="flex mt-3 justify-center items-center w-full">
                                            <button onClick={openCertificateAddModal} type="button" className="btn-add-resume">
                                                <i className="fa-solid fa-circle-plus me-3"></i>
                                                <span className="text-sm text-gray-400 font-semibold">Add Certicicate</span>
                                            </button>
                                        </div>
                                    </>
                              </div>
                    }
                </div>
            </section>
        </div>

        <AddCertificateForm token={token} certificateModalOpen={certificateModalOpen} closeCertificateModal={closeCertificateAddModal} />
        </>
    )
}