import { Button, FormControl, FormHelperText, Modal } from "@mui/material";
import React, { useRef, useState } from "react";
import { addUserCertificate } from "../../../services/certificateServices";
import { Controller, useForm } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { BiUpload } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import { Certificates } from "../../../types/entityTypes";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

// interface AddCertificateResponsePayload {
//     success: boolean
//     message: string
//     result: Certificates
// }

interface AddCertificateModalProps {
    certificateModalOpen: boolean
    closeCertificateModal: () => void
    onCertificateAdd: (data: Certificates) => void
}

export default function AddCertificateForm({certificateModalOpen, closeCertificateModal, onCertificateAdd} : AddCertificateModalProps) {

    const [certificate, setCertificate] = useState<File | null>(null)
    const [fileName, setFileName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const fileRef = useRef<HTMLInputElement | null>(null)

    const openFileUpload = () => {
        if(fileRef){
            fileRef.current?.click()
        }
    }

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null
        if(file){
            setCertificate(file)
            setFileName(file.name || '')
        }
    }

    const removeFileSelect = () => {
        setCertificate(null)
        setFileName('')
        if(fileRef.current){
            fileRef.current.value = ''
        }
    }

    type Inputs = {
       name: string,
       issuedOrganization: string,
       issuedDate: string
    }

    const {control, handleSubmit, formState:{errors}} = useForm<Inputs>()

    async function addCertificate(data : Inputs) : Promise<void> {
        
        if(!certificate){
            return
        }

        const {issuedOrganization, issuedDate, name} = data

        const formData = new FormData()

        formData.append('certificate', certificate)
        formData.append('issuedOrganization', issuedOrganization)
        formData.append('issuedDate', issuedDate)
        formData.append('name', name)
        
        try {
            const response = await toast.promise(
                addUserCertificate(formData),
                {
                    pending:'Adding certificate...',
                    success: 'Certificate added succesfully',
                    error:{
                        render(props) {
                            const data = props.data as AxiosError<{message: string}>
                            return data.message || 'Something went wrong'
                        },
                    }
                }
            )

            console.log('- checking certificate add result -', response)
            if(response.success){
                
                onCertificateAdd(response.result)
            }
        } catch (error: unknown) {
            console.log('Error occured', error)
        } finally {
            setLoading(false)
            closeCertificateModal()
        }
        
        return
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
