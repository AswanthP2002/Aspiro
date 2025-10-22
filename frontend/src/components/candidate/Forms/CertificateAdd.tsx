import { Box, FormControl, FormHelperText, Modal, TextField, Typography } from "@mui/material";
import { DateField } from '@mui/x-date-pickers/DateField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import Swal from "sweetalert2";
import { addCandidateCertificates } from "../../../services/userServices";
import { Controller, useForm } from "react-hook-form";

export default function AddCertificateForm({certificateModalOpen, closeCertificateModal} : any) {

    const [issuingOrganization, setIssuingOrganization] = useState('')
    const [issuingOrganizationError, setIssuingOrganizationError] = useState('')
    const [issuedDate, setIssuedDate] = useState('')
    const [issueDateError, setIssueDateError] = useState('')
    const [certificateId, setCertificateId] = useState('') //optional
    const [certificateIdError, setCertificateErrorIdError] = useState('')
    const [certificate, setCertificate] = useState<any>(null)
    const [certificateError, setCertificateError]  = useState('')

    type Inputs = {
        organization:string,
        date:any,
        certificateId:string,
        //certificate:any
    }

    const {watch, control, handleSubmit, register, formState:{errors}} = useForm<Inputs>()

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
        // const issuingorganizationerror = !issuingOrganization || !/^(?=.{2,100}$)[A-Za-z0-9][A-Za-z0-9&.,'’\-() ]*[A-Za-z0-9)]$/.test(issuingOrganization) || false
        // const issuedateerrror = !issuedDate || false
        // let certificateiderror = false
        // if(certificateId){
        //     certificateiderror = !/^[A-Za-z0-9][A-Za-z0-9_\-\/]{3,48}[A-Za-z0-9]$/.test(certificateId) || false
        // }
        const fileerror = !certificate

        // issuingorganizationerror ? setIssuingOrganizationError('Provide valid issued organization') : setIssuingOrganizationError('')
        // issuedateerrror ? setIssueDateError('Provide issued date') : setIssueDateError('')
        // certificateiderror ? setCertificateErrorIdError('Provide a valid id') : setCertificateErrorIdError('')
        fileerror ? setCertificateError('Please select file') : setCertificateError('')

        if(fileerror){
            return false
        }
        return true
    }

    async function addCertificate(data : any) : Promise<void> {
        const isValidated = validateExperienceForm()
        if(!isValidated){
            return
        }
        closeCertificateModal()
        console.log('This is from data property', data)
        console.log('this is watch property', watch().date.format('DD-MM-YYYY'))
        console.log('this is certificate', certificate)
        const {organization, date, certificateId} = watch()

        const formData = new FormData()

        formData.append('certificate', certificate)
        formData.append('issuedOrganization', organization)
        formData.append('issuedDate', date.format('DD-MM-YYYY'))
        formData.append('id', certificateId)

        //return
        try {
            // const formData = new FormData()
            // formData.append('certificate', certificate)
            // formData.append('issuedOrganization', issuingOrganization)
            // formData.append('issuedDate', issuedDate)
            // formData.append('id', certificateId)

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
                <form onSubmit={handleSubmit(addCertificate)}>
                <Box sx={{ width: '100%', marginTop:'10px' }}>
                    <TextField
                        variant="outlined" fullWidth label="Issuing Organization" 
                        {...register('organization', {
                            required:{value:true, message:'Please enter orgnaization name'},
                            minLength:{value:3, message:'Minimum 3 charecters'},
                            maxLength:{value:50, message:'Maximum 30 charecters'},
                            pattern:{value:/^[a-zA-Z0-9 .,'&()-]+$/, message:'Please enter a valid name'}
                        })}
                        error={Boolean(errors.organization)}
                        helperText={errors.organization?.message}
                    />
                    {/* <input value={issuingOrganization} onChange={(event) => setIssuingOrganization(event.target.value)} type="text" name="role" id="role" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" /> */}
                </Box>

                <Box sx={{ width: '100%', marginTop:'10px'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField']}>
                            <FormControl error={Boolean(errors.date)}>
                                <Controller
                                    name="date"
                                    control={control}
                                    render={({field}) => (
                                        <DateField fullWidth error={Boolean(errors.date)} {...field} onChange={(pickerValue) => field.onChange(pickerValue)} value={field.value} label="Issued Date"/>
                                    )}
                                    
                                    rules={{
                                        required:{value:true, message:'Date can not be empty'}
                                    }}
                                />
                                <FormHelperText>{errors.date?.message as string}</FormHelperText>
                            </FormControl>
                        </DemoContainer>
                    </LocalizationProvider>
                    
                    {/* <label htmlFor="" className="block">Issued Date</label>
                    <input value={issuedDate} onChange={(event) => setIssuedDate(event.target.value)} type="date" name="name" id="name" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
                    <label className='error-label'>{issueDateError}</label> */}
                </Box>
                <Box sx={{ width: '100%', marginTop:'10px'}}>
                    <div className="w-full">
                        <TextField  fullWidth variant="outlined" label="Certificate ID"
                            {...register("certificateId", {
                                required:{value:true, message:'Certificate ID Can not be empty'},
                                minLength:{value:3,message:"Minimum 3 charecter"},
                                maxLength:{value:30, message:'Maximum 30 charecter'},
                                pattern:{value:/^[a-zA-Z0-9\s/-]{4,50}$/, message:'Enter a valid id'}
                            })}
                            error={Boolean(errors.certificateId)}
                            helperText={errors.certificateId?.message}
                        />

                        {/* <label htmlFor="" className="block">Certificate ID</label>
                        <input value={certificateId} onChange={(event) => setCertificateId(event.target.value)} type="text" name="name" id="name" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                        <label className='error-label'>{certificateIdError}</label> */}
                    </div>
                </Box>
                

                <Box sx={{width:'100%', marginTop:'10px'}}>
                    <div className="w-full">
                        <label htmlFor="">File</label>
                        <input accept="application/pdf" onChange={(event) => selectFile(event)} type="file" name="name" id="name" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                        <label className='error-label'>{certificateError}</label>
                    </div>
                </Box>

                <Box sx={{ width: '100%', marginTop: '10px' }}>
                    <button type="submit" onClick={addCertificate} className="bg-blue-400 rounded w-full p-1 text-white">Add</button>
                </Box>
                </form>
            </Box>
        </Modal>
    )
}