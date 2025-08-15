import { Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import useRefreshToken from "../../../hooks/refreshToken";
import Swal from "sweetalert2";
import { candidateService } from "../../../services/commonServices";
import { addCandidateExperience } from "../../../services/candidateServices";

export default function AddExperienceForm({token, experiencemodalopen, closeModal} : any){
    const [role, setrole] = useState("")
    const [jobtype, setjobtype] = useState("")
    const [organization, setorganization] = useState("")
    const [ispresent, setispresent] = useState(false)
    const [startdate, setstartdate] = useState("")
    const [enddate, setendate] = useState("")
    const [location, setlocation] = useState("")
    const [locationtype, setlocationtype] = useState("")
    const [roleError, setrolerror] = useState("")
    const [jobeTypeError, setjobtypeerror] = useState("")
    const [startdateError, setstartdateerror] = useState("")
    const [endDateError, setenddateerror] = useState("")
    const [organizationError, setorganizationerror] = useState("")
    const [locationError, setlocationerror] = useState("")
    const [locationTypeError, setlocationtyperror] = useState("")

    async function validateExperienceAddingForm(){
            const roleerror = !role || !/^[a-zA-Z\s]{2,50}$/.test(role) || false
            const organizationerror = !organization || !/^[a-zA-Z0-9\s\.,&-]{2,100}$/.test(organization) || false
            const jobtypeerror = !jobtype || false
            const startdateerror = !startdate || false
            let enddateerror = false
            const locationerror = !location || !/^[a-zA-Z\s,]{2,100}$/.test(location) || false
            const locationtypeerror = !locationtype
    
            if(!ispresent){
                enddateerror = !enddate || false
            }
    
            roleerror ? setrolerror('Please enter a valid job role') : setrolerror("")
            jobtypeerror ? setjobtypeerror('Please select job type') : setjobtypeerror("")
            organizationerror ? setorganizationerror('Please enter a valid organization name') : setorganizationerror("")
            startdateerror ? setstartdateerror('Please provide a starting date') : setstartdateerror("")
            enddateerror ? setenddateerror('Please provide a ending date') : setenddateerror("")
            locationerror ? setlocationerror('Please provide company location') : setlocationerror("")
            locationtypeerror ? setlocationtyperror('Please select location type') : setlocationtyperror("")

            if(roleerror || jobtypeerror || organizationerror || startdateerror || enddateerror || locationerror || locationTypeError){
                closeModal() //close form before sweet alert
                Swal.fire({
                    icon:'error',
                    title:'Test',
                    text:'Validation fails'
                }).then(() => window.location.reload())


                return
            }

            await addExperience()
    }
    
        async function addExperience(){
    
            //try {
                // let response = await candidateService.addExperience(token, role, jobtype, location, locationtype, organization, ispresent, startdate, enddate)
    
                // if(response.status === 401){
                //     const newAccessToken = await candidateService.refreshToken()
                //     response = await candidateService.addExperience(newAccessToken, role, jobtype, location, locationtype, organization, ispresent, startdate, enddate)
                // }
    
                const result = await addCandidateExperience(role, jobtype, location, locationtype, organization, ispresent, startdate, enddate)
                closeModal() //closing form
                // if(result?.success){
                    Swal.fire({
                        icon:'success',
                        title:'Added',
                        text:result?.message,
                        showConfirmButton:false,
                        showCancelButton:false,
                        timer:3000
                    }).then(() => window.location.reload())
                // }else{
                //     Swal.fire({
                //         icon:'error',
                //         title:'Oops',
                //         text:result?.message,
                //         showConfirmButton:true,
                //         allowOutsideClick:false,
                //     })
                // }
                
            // } catch (error : unknown) {
            //     console.log('Error occured while adding candidate experience', error)
            //     if(error instanceof Error){
            //         Swal.fire({
            //             icon:'error',
            //             title:'Error',
            //             text:error?.message
            //         })
            //     }
            // }
        }

    function toggleIsPresent(){
        setispresent(prevState => !prevState)
    }
    
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

    return(
        <Modal open={experiencemodalopen} onClose={closeModal}>
        <Box sx={style}>
            <div className='w-full flex justify-end'>
                <button onClick={closeModal} type="button" className=""><i className="fa-solid fa-close"></i></button>
            </div>
          <Typography variant="h6" component="h2" sx={{textAlign:'center'}}>Add Experience</Typography>
          <Box sx={{width:'100%'}}>
            <label htmlFor="">Role</label>
            <input value={role} onChange={(event) => setrole(event.target.value)} type="text" name="role" id="role" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
            <label className='error-label'>{roleError}</label>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <label htmlFor="">Type</label>
            <select value={jobtype} onChange={(event) => setjobtype(event.target.value)} name="" id="" className="border border-gray-400 w-full rounded p-2">
                <option value="">--Select Type--</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
            </select>
            <label htmlFor="" className="error-label">{jobeTypeError}</label>
          </Box>
          <Box sx={{width:'100%'}}>
            <label htmlFor="">Organization</label>
            <input value={organization} onChange={(event) => setorganization(event.target.value)} type="text" name="name" id="name" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
            <label className='error-label'>{organizationError}</label>
          </Box>
          <Box sx={{width:'100%'}}>
            <div className="flex items-center mt-2">
                <input onChange={toggleIsPresent} checked={ispresent ? true : false} type="checkbox" name="name" id="name" className="outline-none border border-gray-400 me-2 rounded" />
                <label htmlFor="">I am currently working in this role</label>
            
            </div>
            <label className='error-label'></label>
          </Box>
          <Box sx={{width:'100%', display:'flex', justifyContent:'between', gap:'100px'}}>
            <div className="w-full">
                <label htmlFor="">Start Date</label>
                <input value={startdate} onChange={(event) => setstartdate(event.target.value)} type="date" name="name" id="name" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label className='error-label'>{startdateError}</label>
            </div>

            <div className="w-full">
                <label htmlFor="">End Date</label>
                <input disabled={ispresent ? true : false} value={enddate} onChange={(event) => setendate(event.target.value)} type="date" name="name" id="name" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label className='error-label'>{endDateError}</label>
            </div>
          </Box>

          <Box sx={{width:'100%'}}>
            <label htmlFor="">Location</label>
            <input value={location} onChange={(event) => setlocation(event.target.value)} type="text" name="name" id="name" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
            <label className='error-label'>{locationError}</label>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <label htmlFor="">Location Type</label>
            <select value={locationtype} onChange={(event) => setlocationtype(event.target.value)} name="" id="" className="border border-gray-400 w-full rounded p-2">
                <option value="">--Select Type--</option>
                <option value="In-office">In-office</option>
                <option value="Remote">Remote</option>
            </select>
            <label htmlFor="" className="error-label">{locationTypeError}</label>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <button onClick={validateExperienceAddingForm} className="bg-blue-400 rounded w-full p-1 text-white">Add</button>
          </Box>
        </Box>
      </Modal>
    )
}