import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { candidateService } from "../../../services/apiServices";
import { addCandidateCertificates } from "../../../services/candidateServices";

export default function AddCertificateForm({certificateModalOpen, closeCertificateModal, token} : any) {

    const [issuingOrganization, setIssuingOrganization] = useState('')
    const [issuingOrganizationError, setIssuingOrganizationError] = useState('')
    const [issuedDate, setIssuedDate] = useState('')
    const [issueDateError, setIssueDateError] = useState('')
    const [certificateId, setCertificateId] = useState('') //optional
    const [certificateIdError, setCertificateErrorIdError] = useState('')
    const [certificate, setCertificate] = useState<any>(null)
    const [certificateError, setCertificateError]  = useState('')


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        minWidth: 250,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
    };

    function selectFile(event : any) {
        const file = event.target.files[0]
        if(file){
            setCertificate(file)
        }
    }

    function validateExperienceForm() : boolean{
        const issuingorganizationerror = !issuingOrganization || !/^(?=.{2,100}$)[A-Za-z0-9][A-Za-z0-9&.,'’\-() ]*[A-Za-z0-9)]$/.test(issuingOrganization) || false
        const issuedateerrror = !issuedDate || false
        let certificateiderror = false
        if(certificateId){
            certificateiderror = !/^[A-Za-z0-9][A-Za-z0-9_\-\/]{3,48}[A-Za-z0-9]$/.test(certificateId) || false
        }
        const fileerror = !certificate

        issuingorganizationerror ? setIssuingOrganizationError('Provide valid issued organization') : setIssuingOrganizationError('')
        issuedateerrror ? setIssueDateError('Provide issued date') : setIssueDateError('')
        certificateiderror ? setCertificateErrorIdError('Provide a valid id') : setCertificateErrorIdError('')
        fileerror ? setCertificateError('Please select file') : setCertificateError('')

        if(issuingorganizationerror || issuedateerrror || certificateiderror || fileerror){
            return false
        }
        return true
    }

    async function addCertificate() : Promise<void> {
        const isValidated = validateExperienceForm()
        if(!isValidated){
            alert('validate fails')
            return
        }
        closeCertificateModal()
        
        try {
            const formData = new FormData()
            formData.append('certificate', certificate)
            formData.append('issuedOrganization', issuingOrganization)
            formData.append('issuedDate', issuedDate)
            formData.append('id', certificateId)

            // let response = await candidateService.addCertificate(token, formData)

            // if(response.status === 401) {
            //     const newAccessToken = await candidateService.refreshToken()
            //     response = await candidateService.addCertificate(newAccessToken, formData)
            // }

            const result = await addCandidateCertificates(formData)

            if(result?.success){
                Swal.fire({
                    icon:'success',
                    title:'Added',
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:1300
                }).then(() => window.location.reload())
            }else{
                Swal.fire({
                    icon:'error',
                    title:'Oops!',
                    text:result?.message
                })
            }
        } catch (error : unknown) {
            if(error instanceof Error){
                console.log('Error occured while adding the certificate', error)
                Swal.fire({
                    icon:'error',
                    title:'Error',
                    text:error?.message
                })
            }
        }
    }

    return (
        <Modal open={certificateModalOpen} onClose={closeCertificateModal}>
            <Box sx={style}>
                <div className='w-full flex justify-end'>
                    <button onClick={closeCertificateModal} type="button" className=""><i className="fa-solid fa-close"></i></button>
                </div>
                <Typography variant="h6" component="h2" sx={{ textAlign: 'center' }}>Add Certificate</Typography>
                <Box sx={{ width: '100%' }}>
                    <label htmlFor="">Issuing Organization</label>
                    <input value={issuingOrganization} onChange={(event) => setIssuingOrganization(event.target.value)} type="text" name="role" id="role" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
                    <label className='error-label'>{issuingOrganizationError}</label>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <label htmlFor="">Issued Date</label>
                    <input value={issuedDate} onChange={(event) => setIssuedDate(event.target.value)} type="date" name="name" id="name" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
                    <label className='error-label'>{issueDateError}</label>
                </Box>
                <Box sx={{ width: '100%'}}>
                    <div className="w-full">
                        <label htmlFor="">Certificate ID</label>
                        <input value={certificateId} onChange={(event) => setCertificateId(event.target.value)} type="text" name="name" id="name" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                        <label className='error-label'>{certificateIdError}</label>
                    </div>
                </Box>

                <Box sx={{width:'100%'}}>
                    <div className="w-full">
                        <label htmlFor="">File</label>
                        <input accept="application/pdf" onChange={(event) => selectFile(event)} type="file" name="name" id="name" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                        <label className='error-label'>{certificateError}</label>
                    </div>
                </Box>

                <Box sx={{ width: '100%', marginTop: '10px' }}>
                    <button onClick={addCertificate} className="bg-blue-400 rounded w-full p-1 text-white">Add</button>
                </Box>
            </Box>
        </Modal>
    )
}