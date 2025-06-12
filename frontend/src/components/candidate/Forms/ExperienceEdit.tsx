import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useRefreshToken from "../../../hooks/refreshToken";
import Swal from "sweetalert2";
import { candidateService } from "../../../services/apiServices";

export default function EditExperienceForm({ experience, editExperienceModalOpen, closeExpEditModal, token }: any) {

    const [editableRole, setEditableRole] = useState("")
    const [editableRoleError, setEditableRoleError] = useState("")
    const [editableJobType, setEditableJobType] = useState("")
    const [editableJobTypeError, setEditableJobTypeError] = useState("")
    const [editableOrganization, setEditableOrganization] = useState("")
    const [editableOrganizationError, setEditableOrganizationError] = useState("")
    const [editableIsPresent, setEditableIsPresent] = useState(false)
    const [editableStartDate, setEditableStartDate] = useState("")
    const [editableStartDateError, setEditableStartDateError] = useState("")
    const [editableEndDate, setEditableEndDate] = useState("")
    const [editableEndDateError, setEditableEndDateError] = useState("")
    const [editableLocation, setEditableLocation] = useState("")
    const [editableLocationError, setEditableLocationError] = useState("")
    const [editableLocationType, setEditableLocationType] = useState("")
    const [editableLocationTypeError, setEditableLocationTypeError] = useState("")

    useEffect(() => {
        if (experience) {
            setEditableRole(experience.role)
            setEditableJobType(experience.jobtype)
            setEditableOrganization(experience.organization)
            setEditableIsPresent(experience.ispresent)
            setEditableStartDate(experience.startdate)
            setEditableEndDate(experience.enddate)
            setEditableLocation(experience.location)
            setEditableLocationType(experience.locationtype)
        }

    }, [experience])



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:'auto',
        minWidth:400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
    };

    function toggleIsPresent(){
        setEditableIsPresent(prevState => !prevState)
    }

    async function validateEditExperience(experienceId : string){
        alert('validation starts')
            const roleerror = !editableRole || !/^[a-zA-Z\s]{2,50}$/.test(editableRole) || false
            const organizationerror = !editableOrganization || !/^[a-zA-Z0-9\s\.,&-]{2,100}$/.test(editableOrganization) || false
            const jobtypeerror = !editableJobType || false
            const startdateerror = !editableStartDate || false
            let enddateerror = false
            const locationerror = !location || !/^[a-zA-Z\s,]{2,100}$/.test(editableLocation) || false
            const locationtypeerror = !editableLocationType
    
            if(!editableIsPresent){
                enddateerror = !editableEndDate || false
            }
    
            roleerror ? setEditableRoleError('Please enter a valid job role') : setEditableRoleError("")
            jobtypeerror ? setEditableJobTypeError('Please select job type') : setEditableJobTypeError("")
            organizationerror ? setEditableOrganizationError('Please enter a valid organization name') : setEditableOrganizationError("")
            startdateerror ? setEditableStartDateError('Please provide a starting date') : setEditableStartDateError("")
            enddateerror ? setEditableEndDateError('Please provide a ending date') : setEditableEndDateError("")
            locationerror ? setEditableLocationError('Please provide company location') : setEditableLocationError("")
            locationtypeerror ? setEditableLocationTypeError('Please select location type') : setEditableLocationTypeError("")

            if(roleerror || organizationerror || jobtypeerror || startdateerror || enddateerror || locationerror || locationtypeerror){
                console.log('checking booleans', 
                    roleerror, organizationerror, jobtypeerror, locationerror, locationtypeerror, startdateerror, enddateerror
                )
                alert('validation failed')
                return
            }

            alert('validation success going to call sending function')
            await editExperience(experienceId)

    }

    async function editExperience(experienceId : string) {
        
        try {
            
            let response = await candidateService.editExperience(token, experienceId, editableRole, editableJobType, editableOrganization, editableIsPresent, editableStartDate, editableEndDate, editableLocation, editableLocationType)

            if(response.status === 401){
                const newAccessToken = await candidateService.refreshToken()
                response = await candidateService.editExperience(newAccessToken, experienceId, editableRole, editableJobType, editableOrganization, editableIsPresent, editableStartDate, editableEndDate, editableLocation, editableLocationType)
            }

            const result = await response.json()
            closeExpEditModal()
            
            if(result.success){
                Swal.fire({
                    icon:'success',
                    title:'Edited',
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:2000
                }).then(() => window.location.reload())
            }else{
                Swal.fire({
                    icon:'error',
                    title:"Oops!",
                    text:result?.message
                })
            }
        } catch (error : unknown) {
            console.log('Error occured while editing the experience', error)
            if(error instanceof Error){
                Swal.fire({
                    icon:'error',
                    title:'Error',
                    text:error.message
                })
            }
        }
    }


    return (
        <Modal open={editExperienceModalOpen} onClose={closeExpEditModal}>
            <Box sx={style}>
                <div className='w-full flex justify-end'>
                    <button onClick={closeExpEditModal} type="button" className=""><i className="fa-solid fa-close"></i></button>
                </div>
                <Typography variant="h6" component="h2" sx={{ textAlign: ' center' }}>Edit Experience</Typography>
                <Box sx={{ width: '100%' }}>
                    <label htmlFor="">Role</label>
                    <input value={editableRole} onChange={(event) => setEditableRole(event.target.value)} type="text" name="role" id="role" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
                    <label className='error-label'>{editableRoleError}</label>
                </Box>
                <Box sx={{ width: '100%', marginTop: '10px' }}>
                    <label htmlFor="">Type</label>
                    <select onChange={(event) => setEditableJobType(event.target.value)} value={editableJobType} name="" id="" className="border border-gray-400 w-full rounded p-2">
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                    </select>
                    <label htmlFor="" className="error-label">{editableJobTypeError}</label>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <label htmlFor="">Organization</label>
                    <input value={editableOrganization} onChange={(event) => setEditableOrganization(event.target.value)} type="text" name="name" id="name" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
                    <label className='error-label'>{editableOrganizationError}</label>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <div className="flex items-center mt-2">
                        <input onChange={toggleIsPresent} checked={editableIsPresent ? true : false} type="checkbox" name="name" id="name" className="outline-none border border-gray-400 me-2 rounded" />
                        <label htmlFor="">I am currently working in this role</label>

                    </div>
                    <label className='error-label'></label>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'between', gap: '100px' }}>
                    <div className="w-full">
                        <label htmlFor="">Start Date</label>
                        <input value={editableStartDate ? editableStartDate.split("T")[0] : ""} onChange={(event) => setEditableStartDate(event.target.value)} type="date" name="name" id="name" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                        <label className='error-label'>{editableStartDateError}</label>
                    </div>

                    <div className="w-full">
                        <label htmlFor="">End Date</label>
                        <input disabled={editableIsPresent ? true : false} value={editableEndDate ? editableEndDate.split("T")[0] : ""} onChange={(event) => setEditableEndDate(event.target.value)} type="date" name="name" id="name" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                        <label className='error-label'>{editableEndDateError}</label>
                    </div>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <label htmlFor="">Location</label>
                    <input value={editableLocation} onChange={(event) => setEditableLocation(event.target.value)} type="text" name="name" id="name" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
                    <label className='error-label'>{editableLocationError}</label>
                </Box>
                <Box sx={{ width: '100%', marginTop: '10px' }}>
                    <label htmlFor="">Location Type</label>
                    <select value={editableLocationType} onChange={(event) => setEditableLocationType(event.target.value)} name="" id="" className="border border-gray-400 w-full rounded p-2">
                        <option value="In-office">In-office</option>
                        <option value="Remote">Remote</option>
                    </select>
                    <label htmlFor="" className="error-label">{editableLocationTypeError}</label>
                </Box>
                <Box sx={{ width: '100%', marginTop: '10px' }}>
                    <button onClick={() => validateEditExperience(experience?._id)} className="bg-blue-400 rounded w-full p-1 text-white">Edit</button>
                </Box>
            </Box>
        </Modal>
    )
}