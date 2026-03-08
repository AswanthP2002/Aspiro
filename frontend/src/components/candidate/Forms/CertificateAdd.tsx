import { Button, FormControl, FormHelperText, Modal } from "@mui/material";
import React, { useRef, useState } from "react";
import { addUserCertificate } from "../../../services/userServices";
import { Controller, useForm } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { BiUpload } from "react-icons/bi";
import { Notify } from "notiflix";
import { IoCloseCircle } from "react-icons/io5";
import { Certificates, Resumes } from "../../../types/entityTypes";

interface AddCertificateResponsePayload {
    success: boolean
    message: string
    result: Certificates
}

export default function AddCertificateForm({certificateModalOpen, closeCertificateModal, onCertificateAdd} : any) {

    const [certificate, setCertificate] = useState<any>(null)
    const [fileName, setFileName] = useState<string>('')
    const [certificateError, setCertificateError]  = useState('')
    const [loading, setLoading] = useState<boolean>(false)

    const fileRef = useRef<HTMLInputElement | null>(null)

    const openFileUpload = () => {
        if(fileRef){
            fileRef.current?.click()
        }
    }

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files[0]
        if(file){
            setCertificate(file)
            setFileName(file.name)
        }
    }

    const removeFileSelect = () => {
        setCertificate(null)
        setFileName('')
        fileRef.current.value = ''
    }

    type Inputs = {
       name: string,
       issuedOrganization: string,
       issuedDate: string
    }

    const {watch, control, handleSubmit, register, formState:{errors}} = useForm<Inputs>()

    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 'auto',
    //     minWidth: 250,
    //     bgcolor: 'background.paper',
    //     borderRadius: 2,
    //     boxShadow: 24,
    //     p: 4,
    // };

    function selectFile(event : any) {
        const file = event.target.files[0]
        if(file){
            setCertificate(file)
        }
    }

    async function dummySubmit(data: Inputs): Promise<void> {
        Notify.success('Success')
    }

    async function addCertificate(data : Inputs) : Promise<void> {
        
        if(!certificate){
            return
        }
        // closeCertificateModal()
        // console.log('This is from data property', data)
        // console.log('this is watch property', watch().date.format('DD-MM-YYYY'))
        // console.log('this is certificate', certificate)
        const {issuedOrganization, issuedDate, name} = data

        const formData = new FormData()

        formData.append('certificate', certificate)
        formData.append('issuedOrganization', issuedOrganization)
        formData.append('issuedDate', issuedDate)
        formData.append('name', name)

        //return
        try {
            setLoading(true)
            // const formData = new FormData()
            // formData.append('certificate', certificate)
            // formData.append('issuedOrganization', issuingOrganization)
            // formData.append('issuedDate', issuedDate)
            // formData.append('id', certificateId)

            const result: AddCertificateResponsePayload = await addUserCertificate(formData)

            if(result?.success){
                Notify.success(result?.message, {timeout: 3000})
                onCertificateAdd(result.result)
            }else{
                Notify.failure('Something went wrong', {timeout: 3000})
            }
        } catch (error : unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout: 3000})
        } finally {
            setLoading(false)
            closeCertificateModal()
        }
    }

    return (
        <Modal className="flex items-center justify-center" open={certificateModalOpen} onClose={closeCertificateModal}>
            <div className="bg-white p-3 rounded-md shadow-sm w-md">
                <div className="header flex justify-between">
                    <div>
                        <p>Upload Certificate</p>
                        <p className="text-xs text-gray-700">Upload your professional certification, supported format PDF only</p>
                    </div>
                    <div>
                        <button onClick={closeCertificateModal}><CgClose /></button>
                    </div>
                </div>
                <div className="mt-3">
                    <form onSubmit={handleSubmit(addCertificate)}>
                        {
                        !certificate && (
                            <div onClick={openFileUpload} className="border cursor-pointer border-gray-200 rounded-md flex flex-col py-10 justify-center items-center">
                                <BiUpload size={28} color="gray" />
                                <p  className="text-gray-700">Upload</p>
                            </div>
                        )
                        }
                        {
                            certificate && (
                                <div className="border border-gray-300 flex justify-between px-3 py-1 rounded-md">
                                    <p className="text-gray-700 text-sm font-light">{fileName}</p>
                                    <button onClick={removeFileSelect}><IoCloseCircle /></button>
                                </div>
                            )
                        }
                        <input onChange={(e) => onFileSelect(e)} className="hidden" ref={fileRef} type="file" accept="application/pdf" />
                        <FormControl fullWidth className="!mt-3" error={Boolean(errors.name)}>
                            <Controller
                                control={control}
                                name="name"
                                rules={{
                                    required:{value: true, message: 'Certificate name can not be empty'},
                                    maxLength:{value: 100, message: 'Certificate name can not be longer than 30 charecters'}
                                }}
                                render={({field}) => (
                                    <div>
                                        <label htmlFor="" className="font-light">Certificate Name</label>
                                        <input {...field} type="text" className="w-full bg-gray-100 border-3 rounded-md px-2 py-1 outline-none" placeholder="Eg : AWS Certified professional" />
                                    </div>
                                )}
                            />
                            <FormHelperText>{errors.name?.message}</FormHelperText>
                        </FormControl>

                        <FormControl fullWidth className="" error={Boolean(errors.issuedOrganization)}>
                            <Controller
                                control={control}
                                name="issuedOrganization"
                                rules={{
                                    required:{value: true, message: 'Issued organizatioin name can not be empty'},
                                    maxLength:{value: 50, message: 'Organization name can not be longer than 35 charecter'}
                                }}
                                render={({field}) => (
                                    <div>
                                        <label htmlFor="" className="font-light">Issued Organization</label>
                                        <input type="text" {...field} placeholder="Eg: AWS" className="w-full bg-gray-100 border-3 px-2 py-1 rounded-md" />
                                    </div>
                                )}
                            />
                            <FormHelperText>{errors.issuedOrganization?.message}</FormHelperText>
                        </FormControl>

                        <FormControl fullWidth error={Boolean(errors.issuedDate)}>
                            <Controller 
                                control={control}
                                name="issuedDate"
                                rules={{
                                    required:{value: true, message: 'Please select Date'}
                                }}
                                render={({field}) => (
                                    <div>
                                        <label htmlFor="" className="font-light">Issued Date</label>
                                        <input {...field} type="date" className="w-full bg-gray-100 px-2 py-1 rounded-md border-3" />
                                    </div>
                                )}
                            />
                            <FormHelperText>{errors.issuedDate?.message}</FormHelperText>
                        </FormControl>
                        <div>
                            <Button type="submit" variant="contained" loading={loading} fullWidth sx={{marginTop: '10px'}}>Add Certificate</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
